import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { XPService } from '../services/xpService';
import type { 
  UserLevel, 
  UserXPStats, 
  ActivityType, 
  XPActivity, 
  UserAchievement 
} from '../types/xp';

export function useXP() {
  const { currentUser } = useAuth();
  const [userLevel, setUserLevel] = useState<UserLevel | null>(null);
  const [userStats, setUserStats] = useState<UserXPStats | null>(null);
  const [recentActivities, setRecentActivities] = useState<XPActivity[]>([]);
  const [userAchievements, setUserAchievements] = useState<UserAchievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carregar dados do usuário
  const loadUserData = useCallback(async () => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const [level, stats, activities, achievements] = await Promise.all([
        XPService.getUserLevel(currentUser.uid),
        XPService.getUserStats(currentUser.uid),
        XPService.getUserActivities(currentUser.uid, undefined, 20),
        XPService.getUserAchievements(currentUser.uid)
      ]);

      setUserLevel(level);
      setUserStats(stats);
      setRecentActivities(activities);
      setUserAchievements(achievements);
    } catch (err) {
      console.error('Erro ao carregar dados de XP:', err);
      setError('Erro ao carregar dados de experiência');
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  // Carregar dados quando o usuário muda
  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  // Registrar atividade de XP
  const recordActivity = async (
    type: ActivityType, 
    metadata: any = {}
  ): Promise<{ xpGained: number; leveledUp: boolean; newLevel?: number } | null> => {
    if (!currentUser) return null;

    try {
      const result = await XPService.recordActivity(currentUser.uid, type, metadata);
      
      // Recarregar dados após registrar atividade
      await loadUserData();
      
      return result;
    } catch (err) {
      console.error('Erro ao registrar atividade de XP:', err);
      setError('Erro ao registrar experiência');
      return null;
    }
  };

  // Funções de conveniência para atividades comuns
  const recordQuestionAnswer = async (
    correct: boolean, 
    difficulty: 'easy' | 'medium' | 'hard' = 'medium',
    timeSpent?: number,
    subject?: string
  ) => {
    return await recordActivity(
      correct ? 'question_correct' : 'question_incorrect',
      { difficulty, timeSpent, subject }
    );
  };

  const recordDailyLogin = async () => {
    return await recordActivity('daily_login');
  };

  const recordStudySession = async (timeSpent: number, subject?: string) => {
    return await recordActivity('study_session', { timeSpent, subject });
  };

  const recordQuizCompletion = async (
    score: number, 
    totalQuestions: number, 
    difficulty: 'easy' | 'medium' | 'hard' = 'medium'
  ) => {
    return await recordActivity('quiz_completed', { 
      score, 
      totalQuestions, 
      difficulty,
      accuracy: (score / totalQuestions) * 100
    });
  };

  const recordClinicalCaseCompletion = async (
    difficulty: 'easy' | 'medium' | 'hard' = 'medium',
    timeSpent?: number,
    subject?: string
  ) => {
    return await recordActivity('clinical_case_completed', {
      difficulty,
      timeSpent,
      subject
    });
  };

  const recordStreakMilestone = async (streak: number) => {
    return await recordActivity('streak_milestone', { streak });
  };

  // Estatísticas úteis
  const getXPBySubject = (subject: string): number => {
    return userStats?.xpBySubject[subject] || 0;
  };

  const getTotalXPToday = (): number => {
    if (!recentActivities.length) return 0;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return recentActivities
      .filter(activity => {
        const activityDate = activity.createdAt.toDate();
        activityDate.setHours(0, 0, 0, 0);
        return activityDate.getTime() === today.getTime();
      })
      .reduce((total, activity) => total + activity.xpGained, 0);
  };

  const getActivityCount = (type: ActivityType): number => {
    return userStats?.activitiesByType[type] || 0;
  };

  const getAchievementProgress = (achievementId: string): number => {
    const userAchievement = userAchievements.find(ua => ua.achievementId === achievementId);
    if (!userAchievement) return 0;
    
    if (userAchievement.progress && userAchievement.maxProgress) {
      return (userAchievement.progress / userAchievement.maxProgress) * 100;
    }
    
    return userAchievement ? 100 : 0;
  };

  const hasAchievement = (achievementId: string): boolean => {
    return userAchievements.some(ua => ua.achievementId === achievementId);
  };

  return {
    // Estado
    userLevel,
    userStats,
    recentActivities,
    userAchievements,
    loading,
    error,

    // Ações
    recordActivity,
    recordQuestionAnswer,
    recordDailyLogin,
    recordStudySession,
    recordQuizCompletion,
    recordClinicalCaseCompletion,
    recordStreakMilestone,
    loadUserData,

    // Utilitários
    getXPBySubject,
    getTotalXPToday,
    getActivityCount,
    getAchievementProgress,
    hasAchievement
  };
}

// Hook para estatísticas de XP em tempo real
export function useXPStats() {
  const { userStats, userLevel, loading } = useXP();
  
  const stats = {
    currentLevel: userLevel?.currentLevel || 1,
    totalXP: userLevel?.totalXP || 0,
    xpToNextLevel: userLevel?.xpToNextLevel || 0,
    totalActivities: userStats?.totalActivities || 0,
    currentStreak: userStats?.currentStreak || 0,
    bestStreak: userStats?.bestStreak || 0,
    achievementCount: userStats?.achievements.length || 0,
    loading
  };

  return stats;
}