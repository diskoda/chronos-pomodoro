import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { MethodologyXPService } from '../services/methodologyXPService';
import type { 
  StudyMethodology,
  MethodologyLevel,
  UserOverallLevel,
  MethodologyXPActivity,
  MethodologyActivityType,
  UserMethodologyStats
} from '../types/xpMethodologies';

export function useMethodologyXP() {
  const { currentUser } = useAuth();
  const [overallLevel, setOverallLevel] = useState<UserOverallLevel | null>(null);
  const [methodologyLevels, setMethodologyLevels] = useState<Record<StudyMethodology, MethodologyLevel> | null>(null);
  const [userStats, setUserStats] = useState<UserMethodologyStats | null>(null);
  const [recentActivities, setRecentActivities] = useState<MethodologyXPActivity[]>([]);
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

      const [overall, levels, stats, activities] = await Promise.all([
        MethodologyXPService.getUserOverallLevel(currentUser.uid),
        MethodologyXPService.getAllMethodologyLevels(currentUser.uid),
        MethodologyXPService.getUserMethodologyStats(currentUser.uid),
        MethodologyXPService.getMethodologyActivities(currentUser.uid, undefined, 20)
      ]);

      setOverallLevel(overall);
      setMethodologyLevels(levels);
      setUserStats(stats);
      setRecentActivities(activities);
    } catch (err) {
      console.error('Erro ao carregar dados de XP por metodologia:', err);
      setError('Erro ao carregar dados de experiência');
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  // Carregar dados quando o usuário muda
  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  // ============================================
  // MÉTODOS PARA REGISTRAR ATIVIDADES
  // ============================================

  /**
   * Registra atividade genérica
   */
  const recordActivity = async (
    methodology: StudyMethodology,
    activityType: MethodologyActivityType,
    metadata: any = {}
  ): Promise<{ xpGained: number; leveledUp: boolean; newLevel?: number; overallLevelUp?: boolean } | null> => {
    if (!currentUser) return null;

    try {
      const result = await MethodologyXPService.recordMethodologyActivity(
        currentUser.uid,
        methodology,
        activityType,
        metadata
      );
      
      // Recarregar dados após registrar atividade
      await loadUserData();
      
      return result;
    } catch (err) {
      console.error('Erro ao registrar atividade:', err);
      setError('Erro ao registrar atividade');
      return null;
    }
  };

  /**
   * Registra atividades de casos clínicos
   */
  const recordClinicalCaseActivity = async (
    activityType: 'case_started' | 'case_completed' | 'case_perfect_score' | 'case_time_bonus',
    metadata: {
      caseId?: string;
      difficulty?: 'easy' | 'medium' | 'hard';
      timeSpent?: number;
      accuracy?: number;
      stepsCompleted?: number;
      totalSteps?: number;
    } = {}
  ) => {
    return recordActivity('clinical_cases', activityType, metadata);
  };

  /**
   * Registra atividades de questões
   */
  const recordQuestionActivity = async (
    activityType: 'question_correct' | 'question_incorrect' | 'question_streak' | 'quiz_completed' | 'perfect_quiz',
    metadata: {
      questionId?: string;
      difficulty?: 'easy' | 'medium' | 'hard';
      subject?: string;
      timeSpent?: number;
      streakCount?: number;
      examType?: string;
    } = {}
  ) => {
    return recordActivity('questions', activityType, metadata);
  };

  /**
   * Registra atividades de flashcards
   */
  const recordFlashcardActivity = async (
    activityType: 'card_reviewed' | 'card_mastered' | 'deck_completed' | 'review_streak',
    metadata: {
      cardId?: string;
      deckId?: string;
      reviewQuality?: 1 | 2 | 3 | 4 | 5;
      timeSpent?: number;
      intervalDays?: number;
      streakCount?: number;
    } = {}
  ) => {
    return recordActivity('flashcards', activityType, metadata);
  };

  // ============================================
  // MÉTODOS UTILITÁRIOS
  // ============================================

  /**
   * Obtém XP total por metodologia
   */
  const getXPByMethodology = (methodology: StudyMethodology): number => {
    return methodologyLevels?.[methodology]?.totalXP || 0;
  };

  /**
   * Obtém nível por metodologia
   */
  const getLevelByMethodology = (methodology: StudyMethodology): number => {
    return methodologyLevels?.[methodology]?.currentLevel || 1;
  };

  /**
   * Obtém título por metodologia
   */
  const getTitleByMethodology = (methodology: StudyMethodology): string => {
    const level = getLevelByMethodology(methodology);
    return MethodologyXPService.getMethodologyTitle(methodology, level);
  };

  /**
   * Obtém XP total do dia por metodologia
   */
  const getTotalXPToday = (methodology?: StudyMethodology): number => {
    if (!recentActivities.length) return 0;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return recentActivities
      .filter(activity => {
        const activityDate = activity.createdAt.toDate();
        activityDate.setHours(0, 0, 0, 0);
        const isToday = activityDate.getTime() === today.getTime();
        
        return methodology ? (isToday && activity.methodology === methodology) : isToday;
      })
      .reduce((total, activity) => total + activity.xpGained, 0);
  };

  /**
   * Obtém contagem de atividades por tipo
   */
  const getActivityCount = (methodology: StudyMethodology, activityType?: MethodologyActivityType): number => {
    const activities = recentActivities.filter(a => a.methodology === methodology);
    
    return activityType 
      ? activities.filter(a => a.activityType === activityType).length
      : activities.length;
  };

  /**
   * Obtém streak atual por metodologia
   */
  const getCurrentStreak = (methodology: StudyMethodology): number => {
    return userStats?.methodologyStats[methodology]?.currentStreak || 0;
  };

  /**
   * Obtém melhor streak por metodologia
   */
  const getBestStreak = (methodology: StudyMethodology): number => {
    return userStats?.methodologyStats[methodology]?.bestStreak || 0;
  };

  /**
   * Obtém performance média por metodologia
   */
  const getAveragePerformance = (methodology: StudyMethodology): number => {
    return userStats?.methodologyStats[methodology]?.averagePerformance || 0;
  };

  /**
   * Obtém tempo total gasto por metodologia
   */
  const getTotalTimeSpent = (methodology: StudyMethodology): number => {
    return userStats?.methodologyStats[methodology]?.timeSpent || 0;
  };

  /**
   * Obtém metodologia favorita
   */
  const getFavoriteMethodology = (): StudyMethodology => {
    return userStats?.overallStats.favoriteMethodology || 'questions';
  };

  /**
   * Verifica se subiu de nível recentemente
   */
  const checkRecentLevelUp = (methodology: StudyMethodology): boolean => {
    const level = methodologyLevels?.[methodology];
    if (!level?.lastLevelUp) return false;
    
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    return level.lastLevelUp.toDate() > oneHourAgo;
  };

  return {
    // Estado
    overallLevel,
    methodologyLevels,
    userStats,
    recentActivities,
    loading,
    error,

    // Ações principais
    recordActivity,
    recordClinicalCaseActivity,
    recordQuestionActivity,
    recordFlashcardActivity,
    loadUserData,

    // Utilitários
    getXPByMethodology,
    getLevelByMethodology,
    getTitleByMethodology,
    getTotalXPToday,
    getActivityCount,
    getCurrentStreak,
    getBestStreak,
    getAveragePerformance,
    getTotalTimeSpent,
    getFavoriteMethodology,
    checkRecentLevelUp
  };
}

// Hook específico para estatísticas simplificadas
export function useMethodologyXPStats() {
  const { 
    overallLevel, 
    methodologyLevels, 
    userStats, 
    loading 
  } = useMethodologyXP();
  
  const stats = {
    // Nível geral
    overallLevel: overallLevel?.overallLevel || 1,
    totalXP: overallLevel?.totalXP || 0,
    
    // Níveis por metodologia
    clinicalCasesLevel: methodologyLevels?.clinical_cases?.currentLevel || 1,
    questionsLevel: methodologyLevels?.questions?.currentLevel || 1,
    flashcardsLevel: methodologyLevels?.flashcards?.currentLevel || 1,
    
    // XP por metodologia
    clinicalCasesXP: methodologyLevels?.clinical_cases?.totalXP || 0,
    questionsXP: methodologyLevels?.questions?.totalXP || 0,
    flashcardsXP: methodologyLevels?.flashcards?.totalXP || 0,
    
    // Estatísticas gerais
    totalActivities: userStats?.overallStats?.totalActivities || 0,
    totalTimeSpent: userStats?.overallStats?.totalTimeSpent || 0,
    favoriteMethodology: userStats?.overallStats?.favoriteMethodology || 'questions',
    
    loading
  };

  return stats;
}

// Hook para uma metodologia específica
export function useSpecificMethodologyXP(methodology: StudyMethodology) {
  const { 
    methodologyLevels, 
    userStats, 
    recordActivity,
    getXPByMethodology,
    getLevelByMethodology,
    getTitleByMethodology,
    getCurrentStreak,
    getBestStreak,
    getAveragePerformance,
    getTotalTimeSpent,
    loading 
  } = useMethodologyXP();
  
  const methodologyData = {
    level: getLevelByMethodology(methodology),
    totalXP: getXPByMethodology(methodology),
    currentXP: methodologyLevels?.[methodology]?.currentXP || 0,
    xpToNextLevel: methodologyLevels?.[methodology]?.xpToNextLevel || 0,
    title: getTitleByMethodology(methodology),
    currentStreak: getCurrentStreak(methodology),
    bestStreak: getBestStreak(methodology),
    averagePerformance: getAveragePerformance(methodology),
    totalTimeSpent: getTotalTimeSpent(methodology),
    stats: userStats?.methodologyStats[methodology],
    loading
  };

  const recordSpecificActivity = (activityType: MethodologyActivityType, metadata: any = {}) => {
    return recordActivity(methodology, activityType, metadata);
  };

  return {
    ...methodologyData,
    recordActivity: recordSpecificActivity
  };
}