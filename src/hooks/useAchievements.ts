import { useState, useEffect, useCallback } from 'react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  condition: (stats: UserStats) => boolean;
  xpReward: number;
  type: 'levelUp' | 'badge' | 'streak' | 'achievement' | 'xp';
  icon: string;
  color: string;
  bgColor: string;
}

interface UserStats {
  questionsCompleted: number;
  correctAnswers: number;
  studyStreak: number;
  totalStudyTime: number; // em minutos
  level: number;
  xp: number;
  lastStudyDate?: Date;
}

interface UnlockedAchievement extends Achievement {
  unlockedAt: Date;
  shown: boolean;
}

const ACHIEVEMENTS_STORAGE_KEY = 'user_achievements';
const USER_STATS_STORAGE_KEY = 'user_stats';

// Definição das conquistas
const availableAchievements: Achievement[] = [
  {
    id: 'first_question',
    title: 'Primeiro Passo',
    description: 'Complete sua primeira questão',
    condition: (stats) => stats.questionsCompleted >= 1,
    xpReward: 50,
    type: 'achievement',
    icon: '🎯',
    color: 'text-green-600',
    bgColor: 'bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30'
  },
  {
    id: 'perfect_start',
    title: 'Início Perfeito',
    description: 'Acerte as primeiras 5 questões',
    condition: (stats) => stats.questionsCompleted >= 5 && stats.correctAnswers >= 5,
    xpReward: 100,
    type: 'badge',
    icon: '⭐',
    color: 'text-yellow-600',
    bgColor: 'bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30'
  },
  {
    id: 'dedicated_student',
    title: 'Estudante Dedicado',
    description: 'Estude por 3 dias consecutivos',
    condition: (stats) => stats.studyStreak >= 3,
    xpReward: 200,
    type: 'streak',
    icon: '🔥',
    color: 'text-orange-600',
    bgColor: 'bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30'
  },
  {
    id: 'question_master',
    title: 'Mestre das Questões',
    description: 'Complete 50 questões',
    condition: (stats) => stats.questionsCompleted >= 50,
    xpReward: 300,
    type: 'achievement',
    icon: '📚',
    color: 'text-blue-600',
    bgColor: 'bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30'
  },
  {
    id: 'speed_demon',
    title: 'Demônio da Velocidade',
    description: 'Complete 10 questões em uma sessão',
    condition: (stats) => stats.questionsCompleted >= 10, // Isso seria verificado por sessão
    xpReward: 150,
    type: 'achievement',
    icon: '⚡',
    color: 'text-purple-600',
    bgColor: 'bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30'
  },
  {
    id: 'level_5',
    title: 'Nível 5 Alcançado!',
    description: 'Alcance o nível 5',
    condition: (stats) => stats.level >= 5,
    xpReward: 250,
    type: 'levelUp',
    icon: '🏆',
    color: 'text-yellow-600',
    bgColor: 'bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30'
  }
];

export function useAchievements() {
  const [userStats, setUserStats] = useState<UserStats>({
    questionsCompleted: 0,
    correctAnswers: 0,
    studyStreak: 0,
    totalStudyTime: 0,
    level: 1,
    xp: 0
  });

  const [unlockedAchievements, setUnlockedAchievements] = useState<UnlockedAchievement[]>([]);
  const [newAchievements, setNewAchievements] = useState<UnlockedAchievement[]>([]);

  // Carregar dados do localStorage
  useEffect(() => {
    try {
      const savedStats = localStorage.getItem(USER_STATS_STORAGE_KEY);
      if (savedStats) {
        setUserStats(JSON.parse(savedStats));
      }

      const savedAchievements = localStorage.getItem(ACHIEVEMENTS_STORAGE_KEY);
      if (savedAchievements) {
        setUnlockedAchievements(JSON.parse(savedAchievements));
      }
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
    }
  }, []);

  // Salvar dados no localStorage
  const saveData = useCallback((stats: UserStats, achievements: UnlockedAchievement[]) => {
    try {
      localStorage.setItem(USER_STATS_STORAGE_KEY, JSON.stringify(stats));
      localStorage.setItem(ACHIEVEMENTS_STORAGE_KEY, JSON.stringify(achievements));
    } catch (error) {
      console.error('Erro ao salvar dados do usuário:', error);
    }
  }, []);

  // Verificar novas conquistas
  const checkAchievements = useCallback((newStats: UserStats) => {
    const currentAchievementIds = unlockedAchievements.map(a => a.id);
    const newlyUnlocked: UnlockedAchievement[] = [];

    availableAchievements.forEach(achievement => {
      if (!currentAchievementIds.includes(achievement.id) && achievement.condition(newStats)) {
        const unlockedAchievement: UnlockedAchievement = {
          ...achievement,
          unlockedAt: new Date(),
          shown: false
        };
        newlyUnlocked.push(unlockedAchievement);
      }
    });

    if (newlyUnlocked.length > 0) {
      const updatedAchievements = [...unlockedAchievements, ...newlyUnlocked];
      setUnlockedAchievements(updatedAchievements);
      setNewAchievements(prev => [...prev, ...newlyUnlocked]);
      saveData(newStats, updatedAchievements);
    }
  }, [unlockedAchievements, saveData]);

  // Atualizar estatísticas do usuário
  const updateStats = useCallback((updates: Partial<UserStats>) => {
    setUserStats(currentStats => {
      const newStats = { ...currentStats, ...updates };
      
      // Calcular nível baseado no XP
      if (updates.xp !== undefined) {
        newStats.level = Math.floor(newStats.xp / 100) + 1;
      }

      // Verificar conquistas
      setTimeout(() => checkAchievements(newStats), 100);
      
      return newStats;
    });
  }, [checkAchievements]);

  // Registrar questão completada
  const completeQuestion = useCallback((isCorrect: boolean, xpGained: number = 10) => {
    updateStats({
      questionsCompleted: userStats.questionsCompleted + 1,
      correctAnswers: userStats.correctAnswers + (isCorrect ? 1 : 0),
      xp: userStats.xp + xpGained
    });
  }, [userStats, updateStats]);

  // Registrar tempo de estudo
  const addStudyTime = useCallback((minutes: number) => {
    updateStats({
      totalStudyTime: userStats.totalStudyTime + minutes
    });
  }, [userStats, updateStats]);

  // Marcar conquista como vista
  const markAchievementAsShown = useCallback((achievementId: string) => {
    setUnlockedAchievements(prev => 
      prev.map(achievement => 
        achievement.id === achievementId 
          ? { ...achievement, shown: true }
          : achievement
      )
    );
    setNewAchievements(prev => prev.filter(a => a.id !== achievementId));
  }, []);

  // Resetar dados (para desenvolvimento/debug)
  const resetAllData = useCallback(() => {
    const initialStats: UserStats = {
      questionsCompleted: 0,
      correctAnswers: 0,
      studyStreak: 0,
      totalStudyTime: 0,
      level: 1,
      xp: 0
    };
    
    setUserStats(initialStats);
    setUnlockedAchievements([]);
    setNewAchievements([]);
    
    localStorage.removeItem(USER_STATS_STORAGE_KEY);
    localStorage.removeItem(ACHIEVEMENTS_STORAGE_KEY);
  }, []);

  return {
    userStats,
    unlockedAchievements,
    newAchievements,
    availableAchievements,
    updateStats,
    completeQuestion,
    addStudyTime,
    markAchievementAsShown,
    resetAllData
  };
}