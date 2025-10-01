import type { Timestamp } from 'firebase/firestore';

// Tipos de atividades que geram XP
export type ActivityType = 
  | 'question_correct'
  | 'question_incorrect'
  | 'daily_login'
  | 'streak_milestone'
  | 'quiz_completed'
  | 'study_session'
  | 'clinical_case_completed'
  | 'achievement_unlocked';

// Interface para uma atividade de XP
export interface XPActivity {
  id?: string;
  userId: string;
  type: ActivityType;
  xpGained: number;
  description: string;
  metadata?: {
    questionId?: string;
    difficulty?: 'easy' | 'medium' | 'hard';
    subject?: string;
    timeSpent?: number;
    streak?: number;
    [key: string]: any;
  };
  createdAt: Timestamp;
}

// Interface para o sistema de níveis
export interface UserLevel {
  userId: string;
  currentLevel: number;
  currentXP: number;
  totalXP: number;
  xpToNextLevel: number;
  lastLevelUp?: Timestamp;
  updatedAt: Timestamp;
}

// Interface para definição de níveis
export interface LevelDefinition {
  level: number;
  name: string;
  xpRequired: number;
  totalXPRequired: number;
  rewards: {
    title?: string;
    badge?: string;
    unlockFeatures?: string[];
  };
  color: string;
}

// Interface para conquistas/achievements
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  xpReward: number;
  category: 'study' | 'streak' | 'milestone' | 'special';
  requirements: {
    type: ActivityType | 'multiple';
    conditions: {
      [key: string]: any;
    };
  };
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

// Interface para conquistas do usuário
export interface UserAchievement {
  id?: string;
  userId: string;
  achievementId: string;
  unlockedAt: Timestamp;
  progress?: number;
  maxProgress?: number;
}

// Interface para estatísticas detalhadas
export interface UserXPStats {
  userId: string;
  level: UserLevel;
  totalActivities: number;
  activitiesByType: Record<ActivityType, number>;
  xpBySubject: Record<string, number>;
  bestStreak: number;
  currentStreak: number;
  lastActivity?: Timestamp;
  achievements: UserAchievement[];
}

// Configuração de XP por atividade
export const XP_CONFIG: Record<ActivityType, { base: number; multipliers?: Record<string, number> }> = {
  question_correct: {
    base: 10,
    multipliers: {
      easy: 1,
      medium: 1.5,
      hard: 2
    }
  },
  question_incorrect: {
    base: 2
  },
  daily_login: {
    base: 5
  },
  streak_milestone: {
    base: 50,
    multipliers: {
      7: 1,    // 7 dias
      14: 2,   // 14 dias
      30: 3,   // 30 dias
      60: 5,   // 60 dias
      100: 10  // 100 dias
    }
  },
  quiz_completed: {
    base: 25
  },
  study_session: {
    base: 15
  },
  clinical_case_completed: {
    base: 30,
    multipliers: {
      easy: 1,
      medium: 1.5,
      hard: 2
    }
  },
  achievement_unlocked: {
    base: 0 // XP definido individualmente por achievement
  }
};