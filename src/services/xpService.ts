// XP Service - Versao simplificada
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs,
  setDoc, 
  query,
  where,
  orderBy,
  limit as limitFunc,
  Timestamp, 
  runTransaction 
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { XPActivity, UserLevel, ActivityType } from '../types/xp';
import { getLevelFromXP, getXPToNextLevel } from '../data/levels';
import { XP_CONFIG } from '../types/xp';

const COLLECTIONS = {
  xpActivities: 'xp_activities',
  userLevels: 'user_levels',
  userAchievements: 'user_achievements'
};

export class XPService {
  static async recordActivity(
    userId: string, 
    type: ActivityType, 
    metadata: any = {}
  ): Promise<{ xpGained: number; leveledUp: boolean; newLevel?: number; totalXP: number }> {
    
    console.log('🎯 XPService.recordActivity iniciado:', { userId, type, metadata });
    
    return await runTransaction(db, async (transaction) => {
      try {
        // FASE 1: LEITURAS PRIMEIRO (obrigatório para transações)
        const userLevelRef = doc(db, COLLECTIONS.userLevels, userId);
        const userLevelDoc = await transaction.get(userLevelRef);

        console.log('📖 Lendo dados do usuário...', { userId, exists: userLevelDoc.exists() });

        // FASE 2: PROCESSAR DADOS
        const xpGained = this.calculateXP(type, metadata);
        console.log('💎 XP calculado:', xpGained);
        
        let currentLevel: UserLevel;
        if (userLevelDoc.exists()) {
          const userData = userLevelDoc.data();
          currentLevel = { 
            userId, 
            ...userData,
            // Garantir que campos obrigatórios existam
            totalXP: userData.totalXP || 0,
            currentLevel: userData.currentLevel || 1,
            currentXP: userData.currentXP || 0,
            xpToNextLevel: userData.xpToNextLevel || 100
          } as UserLevel;
          console.log('👤 Usuário existente:', currentLevel);
        } else {
          currentLevel = {
            userId,
            currentLevel: 1,
            currentXP: 0,
            totalXP: 0,
            xpToNextLevel: 100,
            updatedAt: Timestamp.now()
          };
          console.log('🆕 Novo usuário criado:', currentLevel);
        }

        // Calcular novo total de XP (SOMA ao existente)
        const newTotalXP = currentLevel.totalXP + xpGained;
        const newLevelData = getLevelFromXP(newTotalXP);
        const leveledUp = newLevelData.level > currentLevel.currentLevel;

        console.log('🔢 Cálculos:', {
          xpAnterior: currentLevel.totalXP,
          xpGanho: xpGained,
          xpTotal: newTotalXP,
          levelAnterior: currentLevel.currentLevel,
          novoLevel: newLevelData.level,
          levelUp: leveledUp
        });

        // FASE 3: ESCRITAS (após todas as leituras)
        
        // 3.1 - Salvar atividade no histórico
        const activityData: Omit<XPActivity, 'id'> = {
          userId,
          type,
          xpGained,
          description: this.getActivityDescription(type, metadata),
          metadata: {
            ...metadata,
            previousXP: currentLevel.totalXP,
            newTotalXP: newTotalXP,
            timestamp: new Date().toISOString()
          },
          createdAt: Timestamp.now()
        };

        const activityRef = doc(collection(db, COLLECTIONS.xpActivities));
        transaction.set(activityRef, activityData);
        console.log('💾 Atividade salva no histórico');

        // 3.2 - Atualizar nível do usuário
        const updatedLevel: UserLevel = {
          ...currentLevel,
          currentLevel: newLevelData.level,
          totalXP: newTotalXP,
          currentXP: newTotalXP, // XP total acumulado
          xpToNextLevel: getXPToNextLevel(newLevelData.level, newTotalXP),
          updatedAt: Timestamp.now()
        };

        if (leveledUp) {
          updatedLevel.lastLevelUp = Timestamp.now();
          console.log('🎊 LEVEL UP! Novo nível:', newLevelData.level);
        }

        transaction.set(userLevelRef, updatedLevel);
        console.log('💾 Nível do usuário atualizado:', updatedLevel);

        const result = {
          xpGained,
          leveledUp,
          newLevel: leveledUp ? newLevelData.level : undefined,
          totalXP: newTotalXP
        };

        console.log('✅ XP registrado com sucesso:', result);
        return result;

      } catch (error) {
        console.error('❌ Erro na transação XP:', error);
        throw error;
      }
    });
  }

  private static calculateXP(type: ActivityType, metadata: any = {}): number {
    const config = XP_CONFIG[type];
    if (!config) return 0;
    
    let baseXP = config.base;
    
    // Aplicar multiplicadores se existirem
    if (config.multipliers && metadata.difficulty) {
      const multiplier = config.multipliers[metadata.difficulty];
      if (multiplier) {
        baseXP = Math.floor(baseXP * multiplier);
      }
    }
    
    console.log('🔢 XP calculado:', { type, baseXP, metadata });
    return baseXP;
  }

  private static getActivityDescription(type: ActivityType, metadata: any = {}): string {
    const descriptions = {
      quiz_completed: 'Quiz completado',
      question_correct: 'Resposta correta',
      question_incorrect: 'Tentativa de resposta',
      daily_login: 'Login diário',
      streak_milestone: 'Marco de sequência',
      study_session: 'Sessão de estudo',
      clinical_case_completed: 'Caso clínico completado',
      achievement_unlocked: 'Conquista desbloqueada'
    };
    
    let description = descriptions[type] || 'Atividade';
    
    // Adicionar detalhes do metadata se disponível
    if (metadata.questionId) {
      description += ` (Questão ${metadata.questionId})`;
    }
    if (metadata.difficulty) {
      description += ` - ${metadata.difficulty}`;
    }
    
    return description;
  }

  static async getUserLevel(userId: string): Promise<UserLevel> {
    try {
      console.log('🔍 Buscando nível do usuário:', userId);
      
      const userLevelRef = doc(db, COLLECTIONS.userLevels, userId);
      const userLevelDoc = await getDoc(userLevelRef);

      if (userLevelDoc.exists()) {
        const userData = userLevelDoc.data();
        const userLevel = { 
          userId, 
          ...userData,
          // Garantir campos obrigatórios
          totalXP: userData.totalXP || 0,
          currentLevel: userData.currentLevel || 1,
          currentXP: userData.currentXP || 0,
          xpToNextLevel: userData.xpToNextLevel || 100
        } as UserLevel;
        
        console.log('✅ Nível encontrado:', userLevel);
        return userLevel;
      }

      // Criar nível inicial se não existir
      const initialLevel: UserLevel = {
        userId,
        currentLevel: 1,
        currentXP: 0,
        totalXP: 0,
        xpToNextLevel: 100,
        updatedAt: Timestamp.now()
      };

      await setDoc(userLevelRef, initialLevel);
      console.log('🆕 Nível inicial criado:', initialLevel);
      return initialLevel;
      
    } catch (error) {
      console.error('❌ Erro ao buscar nível do usuário:', error);
      throw error;
    }
  }

  /**
   * Buscar histórico de atividades XP do usuário
   */
  static async getUserXPHistory(userId: string, limit: number = 10): Promise<XPActivity[]> {
    try {
      const activitiesRef = collection(db, COLLECTIONS.xpActivities);
      const q = query(
        activitiesRef,
        where('userId', '==', userId),
        orderBy('createdAt', 'desc'),
        limitFunc(limit)
      );
      
      const snapshot = await getDocs(q);
      const activities = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as XPActivity[];
      
      console.log('📋 Histórico XP encontrado:', activities.length, 'atividades');
      return activities;
      
    } catch (error) {
      console.error('❌ Erro ao buscar histórico XP:', error);
      return [];
    }
  }

  /**
   * Calcular estatísticas do usuário
   */
  static async getUserXPStats(userId: string): Promise<{
    totalActivities: number;
    xpThisWeek: number;
    xpThisMonth: number;
    averageXPPerDay: number;
  }> {
    try {
      const now = new Date();
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      
      const activitiesRef = collection(db, COLLECTIONS.xpActivities);
      const allActivitiesQuery = query(
        activitiesRef,
        where('userId', '==', userId)
      );
      
      const allSnapshot = await getDocs(allActivitiesQuery);
      const allActivities = allSnapshot.docs.map(doc => doc.data()) as XPActivity[];
      
      const weekActivities = allActivities.filter(activity => 
        activity.createdAt.toDate() >= weekAgo
      );
      
      const monthActivities = allActivities.filter(activity => 
        activity.createdAt.toDate() >= monthAgo
      );
      
      const xpThisWeek = weekActivities.reduce((sum, activity) => sum + activity.xpGained, 0);
      const xpThisMonth = monthActivities.reduce((sum, activity) => sum + activity.xpGained, 0);
      const averageXPPerDay = monthActivities.length > 0 ? Math.floor(xpThisMonth / 30) : 0;
      
      return {
        totalActivities: allActivities.length,
        xpThisWeek,
        xpThisMonth,
        averageXPPerDay
      };
      
    } catch (error) {
      console.error('❌ Erro ao calcular estatísticas:', error);
      return {
        totalActivities: 0,
        xpThisWeek: 0,
        xpThisMonth: 0,
        averageXPPerDay: 0
      };
    }
  }
}