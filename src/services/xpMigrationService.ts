import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where,
  writeBatch,
  Timestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { MethodologyXPService } from '../services/methodologyXPService';
import type { 
  XPActivity, 
  UserLevel as OldUserLevel,
  ActivityType as OldActivityType 
} from '../types/xp';
import type { 
  StudyMethodology,
  MethodologyActivityType,
  MethodologyLevel,
  UserOverallLevel
} from '../types/xpMethodologies';

/**
 * Serviço para migrar dados do sistema XP antigo para o novo sistema por metodologias
 */
export class XPMigrationService {
  
  /**
   * Mapeia atividades antigas para as novas metodologias
   */
  private static mapOldActivityToMethodology(
    oldActivityType: OldActivityType
  ): { methodology: StudyMethodology; newActivityType: MethodologyActivityType } | null {
    const mappings: Record<OldActivityType, { methodology: StudyMethodology; newActivityType: MethodologyActivityType } | null> = {
      // Questões
      'question_correct': { methodology: 'questions', newActivityType: 'question_correct' },
      'question_incorrect': { methodology: 'questions', newActivityType: 'question_incorrect' },
      'quiz_completed': { methodology: 'questions', newActivityType: 'quiz_completed' },
      
      // Casos clínicos
      'clinical_case_completed': { methodology: 'clinical_cases', newActivityType: 'case_completed' },
      
      // Atividades gerais (distribuir para a metodologia mais apropriada)
      'daily_login': null, // Não migrar - muito genérico
      'study_session': { methodology: 'questions', newActivityType: 'question_correct' }, // Assumir como questões
      'streak_milestone': { methodology: 'questions', newActivityType: 'question_streak' },
      'achievement_unlocked': null // Não migrar - muito genérico
    };
    
    return mappings[oldActivityType] || null;
  }
  
  /**
   * Migra todas as atividades de um usuário para o novo sistema
   */
  static async migrateUserActivities(userId: string): Promise<{
    migrated: number;
    skipped: number;
    errors: string[];
  }> {
    const results = {
      migrated: 0,
      skipped: 0,
      errors: [] as string[]
    };
    
    try {
      // 1. Buscar todas as atividades antigas do usuário
      console.log(`🔄 Buscando atividades antigas do usuário ${userId}...`);
      
      const oldActivitiesQuery = query(
        collection(db, 'xp_activities'),
        where('userId', '==', userId)
      );
      
      const oldActivitiesSnapshot = await getDocs(oldActivitiesQuery);
      const oldActivities = oldActivitiesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as XPActivity));
      
      console.log(`📊 Encontradas ${oldActivities.length} atividades antigas`);
      
      // 2. Processar cada atividade antiga
      for (const oldActivity of oldActivities) {
        try {
          const mapping = this.mapOldActivityToMethodology(oldActivity.type);
          
          if (!mapping) {
            results.skipped++;
            console.log(`⏭️ Pulando atividade: ${oldActivity.type} (não mapeável)`);
            continue;
          }
          
          // Registrar a atividade no novo sistema
          await MethodologyXPService.recordMethodologyActivity(
            userId,
            mapping.methodology,
            mapping.newActivityType,
            {
              ...oldActivity.metadata,
              migratedFrom: oldActivity.id,
              originalType: oldActivity.type,
              migrationDate: new Date().toISOString()
            }
          );
          
          results.migrated++;
          console.log(`✅ Migrada: ${oldActivity.type} → ${mapping.methodology}:${mapping.newActivityType}`);
          
        } catch (error) {
          results.errors.push(`Erro ao migrar atividade ${oldActivity.id}: ${error}`);
          console.error(`❌ Erro ao migrar atividade ${oldActivity.id}:`, error);
        }
      }
      
      console.log(`🎉 Migração concluída: ${results.migrated} migradas, ${results.skipped} puladas, ${results.errors.length} erros`);
      
    } catch (error) {
      results.errors.push(`Erro geral na migração: ${error}`);
      console.error('❌ Erro geral na migração:', error);
    }
    
    return results;
  }
  
  /**
   * Migra o nível geral do usuário
   */
  static async migrateUserLevel(userId: string): Promise<{
    success: boolean;
    error?: string;
    oldLevel?: OldUserLevel;
    newOverallLevel?: UserOverallLevel;
  }> {
    try {
      console.log(`🔄 Migrando nível do usuário ${userId}...`);
      
      // 1. Buscar nível antigo
      const oldLevelDoc = await getDoc(doc(db, 'user_levels', userId));
      
      if (!oldLevelDoc.exists()) {
        return {
          success: false,
          error: 'Nível antigo não encontrado'
        };
      }
      
      const oldLevel = oldLevelDoc.data() as OldUserLevel;
      console.log(`📊 Nível antigo encontrado: Nível ${oldLevel.currentLevel}, ${oldLevel.totalXP} XP`);
      
      // 2. Distribuir XP do sistema antigo entre as metodologias
      // Estratégia: distribuir igualmente entre as 3 metodologias
      const xpPerMethodology = Math.floor(oldLevel.totalXP / 3);
      
      const batch = writeBatch(db);
      
      // Criar níveis por metodologia
      const methodologies: StudyMethodology[] = ['clinical_cases', 'questions', 'flashcards'];
      const methodologyLevels: Record<StudyMethodology, number> = {
        clinical_cases: 1,
        questions: 1,
        flashcards: 1
      };
      
      for (const methodology of methodologies) {
        const levelData = this.calculateLevelFromXP(xpPerMethodology, methodology);
        methodologyLevels[methodology] = levelData.level;
        
        const methodologyLevel: MethodologyLevel = {
          userId,
          methodology,
          currentLevel: levelData.level,
          currentXP: levelData.currentXP,
          totalXP: xpPerMethodology,
          xpToNextLevel: levelData.xpToNextLevel,
          updatedAt: Timestamp.now()
        };
        
        batch.set(
          doc(db, 'methodology_levels', `${userId}_${methodology}`),
          methodologyLevel
        );
        
        console.log(`📈 ${methodology}: Nível ${levelData.level}, ${xpPerMethodology} XP`);
      }
      
      // Criar nível geral
      const averageLevel = Math.floor(
        Object.values(methodologyLevels).reduce((sum, level) => sum + level, 0) / 3
      );
      
      const newOverallLevel: UserOverallLevel = {
        userId,
        overallLevel: averageLevel,
        totalXP: oldLevel.totalXP,
        methodologyLevels,
        updatedAt: Timestamp.now()
      };
      
      batch.set(
        doc(db, 'user_overall_levels', userId),
        newOverallLevel
      );
      
      // Executar batch
      await batch.commit();
      
      console.log(`✅ Migração de nível concluída: Nível geral ${averageLevel}`);
      
      return {
        success: true,
        oldLevel,
        newOverallLevel
      };
      
    } catch (error) {
      console.error('❌ Erro ao migrar nível:', error);
      return {
        success: false,
        error: `Erro ao migrar nível: ${error}`
      };
    }
  }
  
  /**
   * Calcula nível baseado no XP (usando lógica similar ao novo sistema)
   */
  private static calculateLevelFromXP(
    totalXP: number, 
    methodology: StudyMethodology
  ): { level: number; currentXP: number; xpToNextLevel: number } {
    const baseMultipliers = {
      clinical_cases: 1.2,
      questions: 1.15,
      flashcards: 1.1
    };
    
    const multiplier = baseMultipliers[methodology];
    let level = 1;
    let accumulatedXP = 0;
    
    while (level < 50) {
      const xpForNextLevel = Math.floor(100 * Math.pow(multiplier, level));
      if (accumulatedXP + xpForNextLevel > totalXP) {
        break;
      }
      accumulatedXP += xpForNextLevel;
      level++;
    }
    
    const currentXP = totalXP - accumulatedXP;
    const xpToNextLevel = level < 50 
      ? Math.floor(100 * Math.pow(multiplier, level)) - currentXP 
      : 0;
    
    return { level, currentXP, xpToNextLevel };
  }
  
  /**
   * Migração completa de um usuário
   */
  static async migrateCompleteUser(userId: string): Promise<{
    success: boolean;
    activitiesResult: {
      migrated: number;
      skipped: number;
      errors: string[];
    };
    levelResult: {
      success: boolean;
      error?: string;
    };
  }> {
    console.log(`🚀 Iniciando migração completa do usuário ${userId}...`);
    
    // 1. Migrar nível primeiro
    const levelResult = await this.migrateUserLevel(userId);
    
    // 2. Migrar atividades
    const activitiesResult = await this.migrateUserActivities(userId);
    
    const success = levelResult.success && activitiesResult.errors.length === 0;
    
    console.log(`${success ? '🎉' : '⚠️'} Migração ${success ? 'concluída com sucesso' : 'concluída com problemas'}`);
    
    return {
      success,
      activitiesResult,
      levelResult
    };
  }
  
  /**
   * Verifica se um usuário já foi migrado
   */
  static async isUserMigrated(userId: string): Promise<boolean> {
    try {
      const overallLevelDoc = await getDoc(doc(db, 'user_overall_levels', userId));
      return overallLevelDoc.exists();
    } catch (error) {
      console.error('Erro ao verificar migração:', error);
      return false;
    }
  }
  
  /**
   * Migra todos os usuários do sistema antigo
   */
  static async migrateAllUsers(): Promise<{
    totalUsers: number;
    migratedUsers: number;
    skippedUsers: number;
    errors: string[];
  }> {
    const results = {
      totalUsers: 0,
      migratedUsers: 0,
      skippedUsers: 0,
      errors: [] as string[]
    };
    
    try {
      console.log('🚀 Iniciando migração de todos os usuários...');
      
      // Buscar todos os níveis de usuários antigos
      const oldLevelsSnapshot = await getDocs(collection(db, 'user_levels'));
      results.totalUsers = oldLevelsSnapshot.size;
      
      console.log(`📊 Encontrados ${results.totalUsers} usuários para migrar`);
      
      for (const levelDoc of oldLevelsSnapshot.docs) {
        const userId = levelDoc.id;
        
        try {
          // Verificar se já foi migrado
          if (await this.isUserMigrated(userId)) {
            results.skippedUsers++;
            console.log(`⏭️ Usuário ${userId} já migrado, pulando...`);
            continue;
          }
          
          // Migrar usuário
          const migrationResult = await this.migrateCompleteUser(userId);
          
          if (migrationResult.success) {
            results.migratedUsers++;
          } else {
            results.errors.push(`Falha na migração do usuário ${userId}`);
          }
          
        } catch (error) {
          results.errors.push(`Erro ao migrar usuário ${userId}: ${error}`);
          console.error(`❌ Erro ao migrar usuário ${userId}:`, error);
        }
      }
      
      console.log(`🎉 Migração global concluída:`);
      console.log(`   Total: ${results.totalUsers}`);
      console.log(`   Migrados: ${results.migratedUsers}`);
      console.log(`   Pulados: ${results.skippedUsers}`);
      console.log(`   Erros: ${results.errors.length}`);
      
    } catch (error) {
      results.errors.push(`Erro geral na migração: ${error}`);
      console.error('❌ Erro geral na migração:', error);
    }
    
    return results;
  }
  
  /**
   * Cria estatísticas de comparação entre sistemas
   */
  static async getComparisonStats(): Promise<{
    oldSystem: {
      totalUsers: number;
      totalActivities: number;
      totalXP: number;
    };
    newSystem: {
      totalUsers: number;
      totalActivities: number;
      totalXP: number;
      methodologiesData: Record<StudyMethodology, {
        users: number;
        activities: number;
        totalXP: number;
      }>;
    };
  }> {
    try {
      // Estatísticas do sistema antigo
      const [oldLevels, oldActivities] = await Promise.all([
        getDocs(collection(db, 'user_levels')),
        getDocs(collection(db, 'xp_activities'))
      ]);
      
      const oldSystemStats = {
        totalUsers: oldLevels.size,
        totalActivities: oldActivities.size,
        totalXP: oldLevels.docs.reduce((sum, doc) => {
          const data = doc.data() as OldUserLevel;
          return sum + (data.totalXP || 0);
        }, 0)
      };
      
      // Estatísticas do novo sistema
      const [newOverallLevels, newActivities] = await Promise.all([
        getDocs(collection(db, 'user_overall_levels')),
        getDocs(collection(db, 'methodology_xp_activities'))
      ]);
      
      const methodologiesData: Record<StudyMethodology, { users: number; activities: number; totalXP: number }> = {
        clinical_cases: { users: 0, activities: 0, totalXP: 0 },
        questions: { users: 0, activities: 0, totalXP: 0 },
        flashcards: { users: 0, activities: 0, totalXP: 0 }
      };
      
      // Contar atividades por metodologia
      newActivities.docs.forEach(doc => {
        const activity = doc.data();
        const methodology = activity.methodology as StudyMethodology;
        if (methodologiesData[methodology]) {
          methodologiesData[methodology].activities++;
          methodologiesData[methodology].totalXP += activity.xpGained || 0;
        }
      });
      
      // Contar usuários por metodologia (aproximação baseada em níveis)
      const methodologyLevels = await getDocs(collection(db, 'methodology_levels'));
      methodologyLevels.docs.forEach(doc => {
        const level = doc.data();
        const methodology = level.methodology as StudyMethodology;
        if (methodologiesData[methodology]) {
          methodologiesData[methodology].users++;
        }
      });
      
      const newSystemStats = {
        totalUsers: newOverallLevels.size,
        totalActivities: newActivities.size,
        totalXP: newOverallLevels.docs.reduce((sum, doc) => {
          const data = doc.data() as UserOverallLevel;
          return sum + (data.totalXP || 0);
        }, 0),
        methodologiesData
      };
      
      return {
        oldSystem: oldSystemStats,
        newSystem: newSystemStats
      };
      
    } catch (error) {
      console.error('Erro ao gerar estatísticas:', error);
      throw error;
    }
  }
}