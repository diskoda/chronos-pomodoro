import type { Timestamp } from 'firebase/firestore';

// Metodologias de estudo disponíveis
export type StudyMethodology = 
  | 'clinical_cases'    // Casos Clínicos
  | 'questions'         // Banco de Questões  
  | 'flashcards';       // Flashcards

// Tipos de atividades específicas por metodologia
export type ClinicalCaseActivityType = 
  | 'case_started'
  | 'case_completed'
  | 'case_perfect_score'
  | 'case_time_bonus'
  | 'case_difficulty_bonus';

export type QuestionActivityType = 
  | 'question_correct'
  | 'question_incorrect'
  | 'question_streak'
  | 'quiz_completed'
  | 'perfect_quiz'
  | 'speed_bonus';

export type FlashcardActivityType = 
  | 'card_reviewed'
  | 'card_mastered'
  | 'deck_completed'
  | 'review_streak'
  | 'spaced_repetition_bonus';

// Union type para todas as atividades
export type MethodologyActivityType = 
  | ClinicalCaseActivityType 
  | QuestionActivityType 
  | FlashcardActivityType;

// Interface para nível de uma metodologia específica
export interface MethodologyLevel {
  userId: string;
  methodology: StudyMethodology;
  currentLevel: number;
  currentXP: number;
  totalXP: number;
  xpToNextLevel: number;
  lastLevelUp?: Timestamp;
  updatedAt: Timestamp;
}

// Interface para nível geral do usuário (soma de todas as metodologias)
export interface UserOverallLevel {
  userId: string;
  overallLevel: number;
  totalXP: number; // Soma de todas as metodologias
  methodologyLevels: {
    clinical_cases: number;
    questions: number;
    flashcards: number;
  };
  updatedAt: Timestamp;
}

// Interface para uma atividade de XP específica por metodologia
export interface MethodologyXPActivity {
  id?: string;
  userId: string;
  methodology: StudyMethodology;
  activityType: MethodologyActivityType;
  xpGained: number;
  description: string;
  metadata?: {
    // Metadados gerais
    difficulty?: 'easy' | 'medium' | 'hard';
    timeSpent?: number;
    
    // Metadados específicos de casos clínicos
    caseId?: string;
    stepsCompleted?: number;
    totalSteps?: number;
    accuracy?: number;
    
    // Metadados específicos de questões
    questionId?: string;
    subject?: string;
    examType?: string;
    streakCount?: number;
    
    // Metadados específicos de flashcards
    cardId?: string;
    deckId?: string;
    reviewQuality?: 1 | 2 | 3 | 4 | 5; // Qualidade da revisão (1=ruim, 5=perfeito)
    intervalDays?: number; // Dias até próxima revisão
    
    [key: string]: any;
  };
  createdAt: Timestamp;
}

// Estatísticas detalhadas por metodologia
export interface MethodologyStats {
  methodology: StudyMethodology;
  currentLevel: number;
  totalXP: number;
  totalActivities: number;
  currentStreak: number;
  bestStreak: number;
  averagePerformance: number;
  timeSpent: number; // em minutos
  lastActivity?: Timestamp;
  
  // Estatísticas específicas por metodologia
  specific: {
    // Casos clínicos
    casesCompleted?: number;
    perfectCases?: number;
    averageAccuracy?: number;
    
    // Questões
    questionsAnswered?: number;
    correctAnswers?: number;
    incorrectAnswers?: number;
    quizzesCompleted?: number;
    
    // Flashcards
    cardsReviewed?: number;
    cardsMastered?: number;
    decksCompleted?: number;
    averageReviewQuality?: number;
  };
}

// Interface para estatísticas completas do usuário
export interface UserMethodologyStats {
  userId: string;
  overallStats: {
    totalLevel: number;
    totalXP: number;
    totalActivities: number;
    totalTimeSpent: number;
    favoriteMethodology: StudyMethodology;
  };
  methodologyStats: {
    clinical_cases: MethodologyStats;
    questions: MethodologyStats;
    flashcards: MethodologyStats;
  };
  updatedAt: Timestamp;
}

// Configuração de XP por metodologia e atividade
export const METHODOLOGY_XP_CONFIG: Record<StudyMethodology, Record<string, { base: number; multipliers?: Record<string, number> }>> = {
  clinical_cases: {
    case_started: { base: 5 },
    case_completed: { 
      base: 25, 
      multipliers: { 
        easy: 1, 
        medium: 1.5, 
        hard: 2 
      } 
    },
    case_perfect_score: { base: 50 },
    case_time_bonus: { base: 10 },
    case_difficulty_bonus: { 
      base: 15,
      multipliers: { 
        easy: 1, 
        medium: 1.5, 
        hard: 2.5 
      }
    }
  },
  questions: {
    question_correct: { 
      base: 10, 
      multipliers: { 
        easy: 1, 
        medium: 1.5, 
        hard: 2 
      } 
    },
    question_incorrect: { base: 2 },
    question_streak: { 
      base: 5,
      multipliers: {
        '5': 1.2,
        '10': 1.5,
        '20': 2,
        '50': 3
      }
    },
    quiz_completed: { base: 30 },
    perfect_quiz: { base: 75 },
    speed_bonus: { base: 15 }
  },
  flashcards: {
    card_reviewed: { base: 3 },
    card_mastered: { 
      base: 15,
      multipliers: {
        '1': 0.8,  // Qualidade baixa
        '2': 0.9,
        '3': 1,
        '4': 1.2,
        '5': 1.5   // Qualidade perfeita
      }
    },
    deck_completed: { base: 40 },
    review_streak: { 
      base: 8,
      multipliers: {
        '7': 1.2,   // 1 semana
        '14': 1.5,  // 2 semanas
        '30': 2     // 1 mês
      }
    },
    spaced_repetition_bonus: { base: 20 }
  }
};

// Definição de níveis por metodologia (cada uma pode ter progressão diferente)
export interface MethodologyLevelDefinition {
  methodology: StudyMethodology;
  level: number;
  name: string;
  xpRequired: number;
  totalXPRequired: number;
  rewards: {
    title?: string;
    badge?: string;
    unlockFeatures?: string[];
    description?: string;
  };
  color: string;
}

// Títulos específicos por metodologia
export const METHODOLOGY_TITLES: Record<StudyMethodology, Record<number, string>> = {
  clinical_cases: {
    1: 'Estudante Iniciante',
    5: 'Analista de Casos',
    10: 'Diagnosticador',
    15: 'Clínico Competente',
    20: 'Especialista em Casos',
    25: 'Mestre Diagnosticador',
    30: 'Médico Experiente',
    40: 'Lenda dos Casos Clínicos',
    50: 'Guru do Diagnóstico'
  },
  questions: {
    1: 'Questionador Novato',
    5: 'Estudante Aplicado',
    10: 'Solucionador',
    15: 'Expert em Questões',
    20: 'Mestre das Provas',
    25: 'Conhecimento Sólido',
    30: 'Banco de Dados Vivo',
    40: 'Lenda das Questões',
    50: 'Oráculo do Conhecimento'
  },
  flashcards: {
    1: 'Memorizador Iniciante',
    5: 'Revisor Dedicado',
    10: 'Mestre da Repetição',
    15: 'Especialista em Memória',
    20: 'Guru da Retenção',
    25: 'Memória Fotográfica',
    30: 'Bibliotecário Mental',
    40: 'Lenda da Memorização',
    50: 'Arquivo Humano'
  }
};