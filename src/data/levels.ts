import type { LevelDefinition, Achievement } from '../types/xp';

// Função para calcular XP necessário para um nível (progressão exponencial)
const calculateXPForLevel = (level: number): number => {
  if (level <= 1) return 0;
  return Math.floor(100 * Math.pow(1.15, level - 1));
};

// Função para calcular XP total necessário até um nível
const calculateTotalXPForLevel = (level: number): number => {
  let total = 0;
  for (let i = 2; i <= level; i++) {
    total += calculateXPForLevel(i);
  }
  return total;
};

// Definições de níveis (1-50)
export const LEVEL_DEFINITIONS: LevelDefinition[] = Array.from({ length: 50 }, (_, i) => {
  const level = i + 1;
  const xpRequired = calculateXPForLevel(level);
  const totalXPRequired = calculateTotalXPForLevel(level);

  // Definir nomes e cores baseados no nível
  let name = 'Iniciante';
  let color = '#6B7280'; // gray-500

  if (level >= 40) {
    name = 'Lenda';
    color = '#7C3AED'; // violet-600
  } else if (level >= 30) {
    name = 'Mestre';
    color = '#DC2626'; // red-600
  } else if (level >= 20) {
    name = 'Especialista';
    color = '#EA580C'; // orange-600
  } else if (level >= 15) {
    name = 'Avançado';
    color = '#D97706'; // amber-600
  } else if (level >= 10) {
    name = 'Competente';
    color = '#059669'; // emerald-600
  } else if (level >= 5) {
    name = 'Aprendiz';
    color = '#2563EB'; // blue-600
  }

  // Recompensas especiais para marcos importantes
  let rewards: LevelDefinition['rewards'] = {};
  
  if (level === 5) {
    rewards = {
      title: 'Primeiro Aprendiz',
      badge: 'student',
      unlockFeatures: ['custom_themes']
    };
  } else if (level === 10) {
    rewards = {
      title: 'Estudante Dedicado',
      badge: 'book',
      unlockFeatures: ['advanced_stats']
    };
  } else if (level === 20) {
    rewards = {
      title: 'Especialista Médico',
      badge: 'medical',
      unlockFeatures: ['expert_mode']
    };
  } else if (level === 30) {
    rewards = {
      title: 'Mestre da Medicina',
      badge: 'master',
      unlockFeatures: ['mentor_mode']
    };
  } else if (level === 50) {
    rewards = {
      title: 'Lenda Médica',
      badge: 'legend',
      unlockFeatures: ['all_features']
    };
  }

  return {
    level,
    name,
    xpRequired,
    totalXPRequired,
    rewards,
    color
  };
});

// Conquistas disponíveis
export const ACHIEVEMENTS: Achievement[] = [
  // Conquistas de estudo
  {
    id: 'first_question',
    name: 'Primeira Resposta',
    description: 'Responda sua primeira questão',
    icon: '🎯',
    xpReward: 20,
    category: 'study',
    requirements: {
      type: 'question_correct',
      conditions: { count: 1 }
    },
    rarity: 'common'
  },
  {
    id: 'perfectionist',
    name: 'Perfeccionista',
    description: 'Acerte 10 questões seguidas',
    icon: '💎',
    xpReward: 100,
    category: 'study',
    requirements: {
      type: 'question_correct',
      conditions: { consecutive: 10 }
    },
    rarity: 'rare'
  },
  {
    id: 'hundred_correct',
    name: 'Centenário',
    description: 'Acerte 100 questões',
    icon: '💯',
    xpReward: 200,
    category: 'milestone',
    requirements: {
      type: 'question_correct',
      conditions: { total: 100 }
    },
    rarity: 'epic'
  },

  // Conquistas de streak
  {
    id: 'week_warrior',
    name: 'Guerreiro da Semana',
    description: 'Estude por 7 dias consecutivos',
    icon: '🔥',
    xpReward: 75,
    category: 'streak',
    requirements: {
      type: 'daily_login',
      conditions: { consecutive: 7 }
    },
    rarity: 'common'
  },
  {
    id: 'month_master',
    name: 'Mestre do Mês',
    description: 'Estude por 30 dias consecutivos',
    icon: '🏆',
    xpReward: 300,
    category: 'streak',
    requirements: {
      type: 'daily_login',
      conditions: { consecutive: 30 }
    },
    rarity: 'epic'
  },

  // Conquistas especiais
  {
    id: 'speed_demon',
    name: 'Demônio da Velocidade',
    description: 'Responda uma questão em menos de 10 segundos',
    icon: '⚡',
    xpReward: 50,
    category: 'special',
    requirements: {
      type: 'question_correct',
      conditions: { maxTime: 10 }
    },
    rarity: 'rare'
  },
  {
    id: 'night_owl',
    name: 'Coruja Noturna',
    description: 'Estude depois da meia-noite',
    icon: '🦉',
    xpReward: 25,
    category: 'special',
    requirements: {
      type: 'study_session',
      conditions: { timeRange: 'night' }
    },
    rarity: 'common'
  },
  {
    id: 'early_bird',
    name: 'Madrugador',
    description: 'Estude antes das 6h da manhã',
    icon: '🐦',
    xpReward: 30,
    category: 'special',
    requirements: {
      type: 'study_session',
      conditions: { timeRange: 'early' }
    },
    rarity: 'common'
  },

  // Conquistas de milestone
  {
    id: 'level_up_5',
    name: 'Ascensão',
    description: 'Alcance o nível 5',
    icon: '⬆️',
    xpReward: 100,
    category: 'milestone',
    requirements: {
      type: 'multiple',
      conditions: { level: 5 }
    },
    rarity: 'common'
  },
  {
    id: 'level_up_10',
    name: 'Determinação',
    description: 'Alcance o nível 10',
    icon: '🎖️',
    xpReward: 200,
    category: 'milestone',
    requirements: {
      type: 'multiple',
      conditions: { level: 10 }
    },
    rarity: 'rare'
  },
  {
    id: 'level_up_25',
    name: 'Lendário',
    description: 'Alcance o nível 25',
    icon: '👑',
    xpReward: 500,
    category: 'milestone',
    requirements: {
      type: 'multiple',
      conditions: { level: 25 }
    },
    rarity: 'legendary'
  }
];

// Função utilitária para encontrar nível baseado no XP total
export const getLevelFromXP = (totalXP: number): LevelDefinition => {
  for (let i = LEVEL_DEFINITIONS.length - 1; i >= 0; i--) {
    if (totalXP >= LEVEL_DEFINITIONS[i].totalXPRequired) {
      return LEVEL_DEFINITIONS[i];
    }
  }
  return LEVEL_DEFINITIONS[0]; // Nível 1
};

// Função para calcular XP para próximo nível
export const getXPToNextLevel = (currentLevel: number, currentXP: number): number => {
  const nextLevel = LEVEL_DEFINITIONS.find(l => l.level === currentLevel + 1);
  if (!nextLevel) return 0; // Já no nível máximo
  
  const currentLevelDef = LEVEL_DEFINITIONS.find(l => l.level === currentLevel);
  const currentLevelTotalXP = currentLevelDef?.totalXPRequired || 0;
  const xpInCurrentLevel = currentXP - currentLevelTotalXP;
  
  return nextLevel.xpRequired - xpInCurrentLevel;
};

// Função para calcular porcentagem de progresso no nível atual
export const getLevelProgress = (currentLevel: number, currentXP: number): number => {
  const currentLevelDef = LEVEL_DEFINITIONS.find(l => l.level === currentLevel);
  const nextLevelDef = LEVEL_DEFINITIONS.find(l => l.level === currentLevel + 1);
  
  if (!currentLevelDef || !nextLevelDef) return 100; // Nível máximo
  
  const currentLevelTotalXP = currentLevelDef.totalXPRequired;
  const xpInCurrentLevel = currentXP - currentLevelTotalXP;
  const xpNeededForNextLevel = nextLevelDef.xpRequired;
  
  return Math.floor((xpInCurrentLevel / xpNeededForNextLevel) * 100);
};