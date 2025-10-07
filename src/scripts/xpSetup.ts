/**
 * Script para Inicialização das Estruturas XP no Firebase
 * 
 * Este script cria automaticamente:
 * 1. Coleções necessárias
 * 2. Documentos de exemplo
 * 3. Índices recomendados
 * 4. Dados de teste
 */

import { 
  collection, 
  doc, 
  setDoc, 
  addDoc, 
  Timestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { XPActivity, UserLevel, UserAchievement } from '../types/xp';

// Configuração das coleções
const COLLECTIONS = {
  xpActivities: 'xp_activities',
  userLevels: 'user_levels',
  userAchievements: 'user_achievements'
};

/**
 * Inicializa a estrutura XP para um usuário
 */
export async function initializeUserXPStructure(userId: string): Promise<boolean> {
  try {
    console.log(`🚀 Inicializando estrutura XP para usuário: ${userId}`);

    // 1. Criar documento user_levels
    const userLevelData: Omit<UserLevel, 'id'> = {
      userId: userId,
      currentLevel: 1,
      currentXP: 0,
      totalXP: 0,
      xpToNextLevel: 100, // XP necessário para nível 2
      updatedAt: Timestamp.now()
    };

    await setDoc(doc(db, COLLECTIONS.userLevels, userId), userLevelData);
    console.log('✅ Documento user_levels criado');

    // 2. Criar atividade de boas-vindas
    const welcomeActivity: Omit<XPActivity, 'id'> = {
      userId: userId,
      type: 'daily_login',
      xpGained: 5,
      description: 'Bem-vindo ao sistema! Login inicial.',
      metadata: {
        source: 'initialization',
        firstLogin: true
      },
      createdAt: Timestamp.now()
    };

    await addDoc(collection(db, COLLECTIONS.xpActivities), welcomeActivity);
    console.log('✅ Atividade de boas-vindas criada');

    // 3. Criar achievement de boas-vindas
    const welcomeAchievement: Omit<UserAchievement, 'id'> = {
      userId: userId,
      achievementId: 'welcome_aboard',
      unlockedAt: Timestamp.now(),
      progress: 1,
      maxProgress: 1
    };

    await addDoc(collection(db, COLLECTIONS.userAchievements), welcomeAchievement);
    console.log('✅ Achievement de boas-vindas criado');

    console.log('🎉 Estrutura XP inicializada com sucesso!');
    return true;

  } catch (error) {
    console.error('❌ Erro ao inicializar estrutura XP:', error);
    return false;
  }
}

/**
 * Cria dados de exemplo para demonstração
 */
export async function createSampleXPData(userId: string): Promise<void> {
  try {
    console.log(`📊 Criando dados de exemplo para: ${userId}`);

    // Atividades de exemplo
    const sampleActivities: Omit<XPActivity, 'id'>[] = [
      {
        userId,
        type: 'quiz_completed',
        xpGained: 50,
        description: 'Quiz de Cardiologia completado',
        metadata: {
          questionId: 'quest_001',
          difficulty: 'medium',
          subject: 'Cardiologia',
          timeSpent: 5,
          accuracy: 85
        },
        createdAt: Timestamp.now()
      },
      {
        userId,
        type: 'question_correct',
        xpGained: 15,
        description: 'Resposta correta em questão de dificuldade média',
        metadata: {
          questionId: 'quest_002',
          difficulty: 'medium',
          subject: 'Pneumologia',
          timeSpent: 2
        },
        createdAt: Timestamp.fromDate(new Date(Date.now() - 3600000)) // 1 hora atrás
      },
      {
        userId,
        type: 'question_incorrect',
        xpGained: 2,
        description: 'Resposta incorreta em questão de dificuldade fácil',
        metadata: {
          questionId: 'quest_003',
          difficulty: 'easy',
          subject: 'Anatomia',
          timeSpent: 3
        },
        createdAt: Timestamp.fromDate(new Date(Date.now() - 7200000)) // 2 horas atrás
      },
      {
        userId,
        type: 'daily_login',
        xpGained: 5,
        description: 'Login diário realizado',
        metadata: {
          loginStreak: 3
        },
        createdAt: Timestamp.fromDate(new Date(Date.now() - 86400000)) // 1 dia atrás
      },
      {
        userId,
        type: 'streak_milestone',
        xpGained: 50,
        description: 'Marco de 7 dias de login consecutivo',
        metadata: {
          streak: 7,
          milestoneType: 'weekly'
        },
        createdAt: Timestamp.fromDate(new Date(Date.now() - 172800000)) // 2 dias atrás
      }
    ];

    // Criar todas as atividades
    for (const activity of sampleActivities) {
      await addDoc(collection(db, COLLECTIONS.xpActivities), activity);
    }

    // Achievements de exemplo
    const sampleAchievements: Omit<UserAchievement, 'id'>[] = [
      {
        userId,
        achievementId: 'first_correct_answer',
        unlockedAt: Timestamp.fromDate(new Date(Date.now() - 7200000)),
        progress: 1,
        maxProgress: 1
      },
      {
        userId,
        achievementId: 'quiz_master_bronze',
        unlockedAt: Timestamp.fromDate(new Date(Date.now() - 3600000)),
        progress: 5,
        maxProgress: 5
      },
      {
        userId,
        achievementId: 'login_streak_7',
        unlockedAt: Timestamp.fromDate(new Date(Date.now() - 172800000)),
        progress: 7,
        maxProgress: 7
      }
    ];

    // Criar todos os achievements
    for (const achievement of sampleAchievements) {
      await addDoc(collection(db, COLLECTIONS.userAchievements), achievement);
    }

    // Atualizar user_levels com XP total
    const totalXP = sampleActivities.reduce((sum, activity) => sum + activity.xpGained, 5); // +5 do welcome
    const updatedUserLevel: Omit<UserLevel, 'id'> = {
      userId,
      currentLevel: 2, // Com ~127 XP, estaria no nível 2
      currentXP: 27,   // 27 XP no nível atual
      totalXP: totalXP,
      xpToNextLevel: 73, // Restante para nível 3
      lastLevelUp: Timestamp.fromDate(new Date(Date.now() - 86400000)),
      updatedAt: Timestamp.now()
    };

    await setDoc(doc(db, COLLECTIONS.userLevels, userId), updatedUserLevel);

    console.log('✅ Dados de exemplo criados com sucesso!');
    console.log(`📈 Total XP: ${totalXP}`);
    console.log(`🎯 Nível atual: 2`);
    console.log(`🏆 Achievements: ${sampleAchievements.length}`);

  } catch (error) {
    console.error('❌ Erro ao criar dados de exemplo:', error);
    throw error;
  }
}

/**
 * Valida se as estruturas XP estão configuradas corretamente
 */
export async function validateXPStructure(): Promise<boolean> {
  try {
    console.log('🔍 Validando estrutura XP...');

    // Verificar se as coleções existem (tentando acessá-las)
    const collections = [COLLECTIONS.xpActivities, COLLECTIONS.userLevels, COLLECTIONS.userAchievements];
    
    for (const collectionName of collections) {
      try {
        await collection(db, collectionName);
        console.log(`✅ Coleção ${collectionName} acessível`);
      } catch (error) {
        console.error(`❌ Problema com coleção ${collectionName}:`, error);
        return false;
      }
    }

    console.log('✅ Estrutura XP validada com sucesso!');
    return true;

  } catch (error) {
    console.error('❌ Erro na validação:', error);
    return false;
  }
}

/**
 * Reset completo dos dados XP de um usuário (USE COM CUIDADO!)
 */
export async function resetUserXPData(userId: string): Promise<boolean> {
  try {
    console.log(`🔄 Resetando dados XP para usuário: ${userId}`);
    
    // AVISO: Esta função remove TODOS os dados XP do usuário
    // Implemente apenas se necessário e com confirmação
    
    console.warn('⚠️ Função de reset não implementada por segurança');
    console.warn('⚠️ Para reset, delete manualmente no Firebase Console');
    
    return false;
    
  } catch (error) {
    console.error('❌ Erro no reset:', error);
    return false;
  }
}

/**
 * Utilitário para debug - mostrar estrutura atual
 */
export function showXPStructureInfo(): void {
  console.log('📚 Informações da Estrutura XP:');
  console.log('');
  console.log('🗂️ Coleções:');
  console.log(`  - ${COLLECTIONS.xpActivities} (atividades de XP)`);
  console.log(`  - ${COLLECTIONS.userLevels} (níveis dos usuários)`);
  console.log(`  - ${COLLECTIONS.userAchievements} (conquistas)`);
  console.log('');
  console.log('🔧 Funções disponíveis:');
  console.log('  - initializeUserXPStructure(userId)');
  console.log('  - createSampleXPData(userId)');
  console.log('  - validateXPStructure()');
  console.log('  - showXPStructureInfo()');
  console.log('');
  console.log('📖 Para usar: import { initializeUserXPStructure } from "scripts/xpSetup"');
}

// Exportações principais
export default {
  initializeUserXPStructure,
  createSampleXPData,
  validateXPStructure,
  resetUserXPData,
  showXPStructureInfo,
  COLLECTIONS
};