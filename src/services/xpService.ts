// XP Service - Versao simplificada
import { collection, doc, getDoc, setDoc, Timestamp, runTransaction } from 'firebase/firestore';
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
  ): Promise<{ xpGained: number; leveledUp: boolean; newLevel?: number }> {
    
    console.log('🎯 XPService.recordActivity:', { userId, type });
    
    return await runTransaction(db, async (transaction) => {
      // LEITURAS PRIMEIRO
      const userLevelRef = doc(db, COLLECTIONS.userLevels, userId);
      const userLevelDoc = await transaction.get(userLevelRef);

      // PROCESSAR
      const xpGained = this.calculateXP(type);
      
      let currentLevel: UserLevel;
      if (userLevelDoc.exists()) {
        currentLevel = { userId, ...userLevelDoc.data() } as UserLevel;
      } else {
        currentLevel = {
          userId,
          currentLevel: 1,
          currentXP: 0,
          totalXP: 0,
          xpToNextLevel: 100,
          updatedAt: Timestamp.now()
        };
      }

      const newTotalXP = currentLevel.totalXP + xpGained;
      const newLevelData = getLevelFromXP(newTotalXP);
      const leveledUp = newLevelData.level > currentLevel.currentLevel;

      // ESCRITAS DEPOIS
      const activityData: Omit<XPActivity, 'id'> = {
        userId,
        type,
        xpGained,
        description: this.getActivityDescription(type),
        metadata,
        createdAt: Timestamp.now()
      };

      const activityRef = doc(collection(db, COLLECTIONS.xpActivities));
      transaction.set(activityRef, activityData);

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

      console.log('✅ XP registrado:', xpGained);
      return { xpGained, leveledUp, newLevel: leveledUp ? newLevelData.level : undefined };
    });
  }

  private static calculateXP(type: ActivityType): number {
    const config = XP_CONFIG[type];
    if (!config) return 0;
    return config.base;
  }

  private static getActivityDescription(type: ActivityType): string {
    switch (type) {
      case 'quiz_completed': return 'Quiz completado';
      case 'question_correct': return 'Resposta correta';
      default: return 'Atividade';
    }
  }

  static async getUserLevel(userId: string): Promise<UserLevel> {
    const userLevelRef = doc(db, COLLECTIONS.userLevels, userId);
    const userLevelDoc = await getDoc(userLevelRef);

    if (userLevelDoc.exists()) {
      return { userId, ...userLevelDoc.data() } as UserLevel;
    }

    const initialLevel: UserLevel = {
      userId,
      currentLevel: 1,
      currentXP: 0,
      totalXP: 0,
      xpToNextLevel: 100,
      updatedAt: Timestamp.now()
    };

    await setDoc(userLevelRef, initialLevel);
    return initialLevel;
  }
}