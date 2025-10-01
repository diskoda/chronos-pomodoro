import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where,
  orderBy,
  limit,
  Timestamp,
  runTransaction
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { 
  XPActivity, 
  UserLevel, 
  UserAchievement, 
  UserXPStats, 
  ActivityType 
} from '../types/xp';
import { 
  LEVEL_DEFINITIONS, 
  ACHIEVEMENTS, 
  getLevelFromXP, 
  getXPToNextLevel 
} from '../data/levels';
import { XP_CONFIG } from '../types/xp';

// Coleções do Firestore
const COLLECTIONS = {
  xpActivities: 'xp_activities',
  userLevels: 'user_levels',
  userAchievements: 'user_achievements'
};

export class XPService {
  // Registrar uma atividade de XP
  static async recordActivity(
    userId: string, 
    type: ActivityType, 
    metadata: any = {}
  ): Promise<{ xpGained: number; leveledUp: boolean; newLevel?: number }> {
    return await runTransaction(db, async (transaction) => {
      // Calcular XP ganho
      const xpGained = this.calculateXP(type, metadata);
      
      // Criar atividade
      const activityData: Omit<XPActivity, 'id'> = {
        userId,
        type,
        xpGained,
        description: this.getActivityDescription(type, metadata),
        metadata,
        createdAt: Timestamp.now()
      };

      // Adicionar atividade
      const activityRef = doc(collection(db, COLLECTIONS.xpActivities));
      transaction.set(activityRef, activityData);

      // Atualizar nível do usuário
      const userLevelRef = doc(db, COLLECTIONS.userLevels, userId);
      const userLevelDoc = await transaction.get(userLevelRef);

      let currentLevel: UserLevel;
      if (userLevelDoc.exists()) {
        currentLevel = { userId, ...userLevelDoc.data() } as UserLevel;
      } else {
        currentLevel = {
          userId,
          currentLevel: 1,
          currentXP: 0,
          totalXP: 0,
          xpToNextLevel: LEVEL_DEFINITIONS[1].xpRequired,
          updatedAt: Timestamp.now()
        };
      }

      // Atualizar XP
      const newTotalXP = currentLevel.totalXP + xpGained;
      const newLevelData = getLevelFromXP(newTotalXP);
      const leveledUp = newLevelData.level > currentLevel.currentLevel;

      const updatedLevel: UserLevel = {
        ...currentLevel,
        currentLevel: newLevelData.level,
        totalXP: newTotalXP,
        currentXP: newTotalXP,
        xpToNextLevel: getXPToNextLevel(newLevelData.level, newTotalXP),
        updatedAt: Timestamp.now()
      };

      if (leveledUp) {
        updatedLevel.lastLevelUp = Timestamp.now();
      }

      transaction.set(userLevelRef, updatedLevel);

      // Verificar conquistas
      await this.checkAchievements(userId, type, metadata, transaction);

      return {
        xpGained,
        leveledUp,
        newLevel: leveledUp ? newLevelData.level : undefined
      };
    });
  }

  // Calcular XP baseado no tipo e metadados
  private static calculateXP(type: ActivityType, metadata: any = {}): number {
    const config = XP_CONFIG[type];
    if (!config) return 0;

    let xp = config.base;

    // Aplicar multiplicadores
    if (config.multipliers && metadata.difficulty) {
      const multiplier = config.multipliers[metadata.difficulty];
      if (multiplier) xp *= multiplier;
    }

    // Multiplicadores especiais para streak
    if (type === 'streak_milestone' && config.multipliers && metadata.streak) {
      const multiplier = config.multipliers[metadata.streak];
      if (multiplier) xp *= multiplier;
    }

    return Math.floor(xp);
  }

  // Gerar descrição da atividade
  private static getActivityDescription(type: ActivityType, metadata: any = {}): string {
    switch (type) {
      case 'question_correct':
        return `Questão correta ${metadata.difficulty ? `(${metadata.difficulty})` : ''}`;
      case 'question_incorrect':
        return 'Questão incorreta (tentativa vale pontos)';
      case 'daily_login':
        return 'Login diário';
      case 'streak_milestone':
        return `Marco de ${metadata.streak} dias consecutivos`;
      case 'quiz_completed':
        return 'Quiz concluído';
      case 'study_session':
        return `Sessão de estudo (${metadata.timeSpent || 0}min)`;
      case 'clinical_case_completed':
        return `Caso clínico concluído ${metadata.difficulty ? `(${metadata.difficulty})` : ''}`;
      case 'achievement_unlocked':
        return `Conquista desbloqueada: ${metadata.achievementName}`;
      default:
        return 'Atividade de estudo';
    }
  }

  // Verificar e desbloquear conquistas
  private static async checkAchievements(
    userId: string, 
    activityType: ActivityType, 
    metadata: any,
    transaction: any
  ): Promise<void> {
    // Buscar conquistas relevantes
    const relevantAchievements = ACHIEVEMENTS.filter(
      achievement => achievement.requirements.type === activityType || 
                    achievement.requirements.type === 'multiple'
    );

    for (const achievement of relevantAchievements) {
      const hasAchievement = await this.userHasAchievement(userId, achievement.id);
      if (hasAchievement) continue;

      const meetsRequirements = await this.checkAchievementRequirements(
        userId, 
        achievement, 
        activityType, 
        metadata
      );

      if (meetsRequirements) {
        await this.unlockAchievement(userId, achievement.id, transaction);
      }
    }
  }

  // Verificar se usuário tem conquista
  private static async userHasAchievement(userId: string, achievementId: string): Promise<boolean> {
    const q = query(
      collection(db, COLLECTIONS.userAchievements),
      where('userId', '==', userId),
      where('achievementId', '==', achievementId)
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  }

  // Verificar requisitos da conquista
  private static async checkAchievementRequirements(
    userId: string,
    achievement: any,
    currentActivityType: ActivityType,
    currentMetadata: any
  ): Promise<boolean> {
    const { requirements } = achievement;
    const { conditions } = requirements;

    // Verificar diferentes tipos de condições
    if (conditions.count && currentActivityType === requirements.type) {
      return true; // Primeira ocorrência
    }

    if (conditions.total) {
      const activities = await this.getUserActivities(userId, requirements.type);
      return activities.length >= conditions.total;
    }

    if (conditions.consecutive) {
      // Implementar lógica de consecutivos
      return await this.checkConsecutiveActivities(userId, requirements.type, conditions.consecutive);
    }

    if (conditions.level) {
      const userLevel = await this.getUserLevel(userId);
      return userLevel.currentLevel >= conditions.level;
    }

    // Condições especiais
    if (conditions.maxTime && currentMetadata.timeSpent) {
      return currentMetadata.timeSpent <= conditions.maxTime;
    }

    if (conditions.timeRange) {
      const hour = new Date().getHours();
      if (conditions.timeRange === 'night' && hour >= 0 && hour < 6) return true;
      if (conditions.timeRange === 'early' && hour >= 4 && hour < 8) return true;
    }

    return false;
  }

  // Desbloquear conquista
  private static async unlockAchievement(
    userId: string, 
    achievementId: string, 
    transaction: any
  ): Promise<void> {
    const achievement = ACHIEVEMENTS.find(a => a.id === achievementId);
    if (!achievement) return;

    // Adicionar conquista do usuário
    const userAchievementRef = doc(collection(db, COLLECTIONS.userAchievements));
    const userAchievementData: Omit<UserAchievement, 'id'> = {
      userId,
      achievementId,
      unlockedAt: Timestamp.now()
    };

    transaction.set(userAchievementRef, userAchievementData);

    // Registrar XP da conquista
    if (achievement.xpReward > 0) {
      const activityRef = doc(collection(db, COLLECTIONS.xpActivities));
      const activityData: Omit<XPActivity, 'id'> = {
        userId,
        type: 'achievement_unlocked',
        xpGained: achievement.xpReward,
        description: `Conquista desbloqueada: ${achievement.name}`,
        metadata: { achievementId, achievementName: achievement.name },
        createdAt: Timestamp.now()
      };

      transaction.set(activityRef, activityData);
    }
  }

  // Buscar nível do usuário
  static async getUserLevel(userId: string): Promise<UserLevel> {
    const docRef = doc(db, COLLECTIONS.userLevels, userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { userId, ...docSnap.data() } as UserLevel;
    }

    // Retornar nível inicial
    return {
      userId,
      currentLevel: 1,
      currentXP: 0,
      totalXP: 0,
      xpToNextLevel: LEVEL_DEFINITIONS[1].xpRequired,
      updatedAt: Timestamp.now()
    };
  }

  // Buscar atividades do usuário
  static async getUserActivities(
    userId: string, 
    type?: ActivityType, 
    limitCount = 50
  ): Promise<XPActivity[]> {
    let q = query(
      collection(db, COLLECTIONS.xpActivities),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );

    if (type) {
      q = query(
        collection(db, COLLECTIONS.xpActivities),
        where('userId', '==', userId),
        where('type', '==', type),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as XPActivity[];
  }

  // Buscar conquistas do usuário
  static async getUserAchievements(userId: string): Promise<UserAchievement[]> {
    const q = query(
      collection(db, COLLECTIONS.userAchievements),
      where('userId', '==', userId),
      orderBy('unlockedAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as UserAchievement[];
  }

  // Buscar estatísticas completas do usuário
  static async getUserStats(userId: string): Promise<UserXPStats> {
    const [level, activities, achievements] = await Promise.all([
      this.getUserLevel(userId),
      this.getUserActivities(userId, undefined, 1000),
      this.getUserAchievements(userId)
    ]);

    // Calcular estatísticas
    const activitiesByType = activities.reduce((acc, activity) => {
      acc[activity.type] = (acc[activity.type] || 0) + 1;
      return acc;
    }, {} as Record<ActivityType, number>);

    const xpBySubject = activities.reduce((acc, activity) => {
      const subject = activity.metadata?.subject || 'Geral';
      acc[subject] = (acc[subject] || 0) + activity.xpGained;
      return acc;
    }, {} as Record<string, number>);

    // Calcular streak atual e melhor
    const { currentStreak, bestStreak } = this.calculateStreaks(activities);

    return {
      userId,
      level,
      totalActivities: activities.length,
      activitiesByType,
      xpBySubject,
      bestStreak,
      currentStreak,
      lastActivity: activities[0]?.createdAt,
      achievements
    };
  }

  // Verificar atividades consecutivas
  private static async checkConsecutiveActivities(
    userId: string, 
    type: ActivityType, 
    requiredCount: number
  ): Promise<boolean> {
    const activities = await this.getUserActivities(userId, type, requiredCount);
    
    if (activities.length < requiredCount) return false;

    // Verificar se as últimas atividades são consecutivas
    // (implementação simplificada - pode ser refinada)
    return activities.length >= requiredCount;
  }

  // Calcular streaks
  private static calculateStreaks(activities: XPActivity[]): { currentStreak: number; bestStreak: number } {
    // Implementação simplificada de cálculo de streak
    // Pode ser refinada para considerar dias específicos
    let currentStreak = 0;
    let bestStreak = 0;
    let tempStreak = 0;

    for (let i = 0; i < activities.length; i++) {
      if (activities[i].type === 'daily_login') {
        tempStreak++;
        if (tempStreak > bestStreak) bestStreak = tempStreak;
      } else {
        if (i === 0) currentStreak = tempStreak;
        tempStreak = 0;
      }
    }

    return { currentStreak, bestStreak };
  }
}