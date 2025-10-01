import { useState } from 'react';
import { 
  Trophy, 
  Star, 
  Crown, 
  Shield, 
  Zap, 
  Clock, 
  Target,
  BookOpen,
  Stethoscope,
  Brain,
  Heart,
  Lock
} from 'lucide-react';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  category: 'study' | 'achievement' | 'special' | 'streak';
  unlocked: boolean;
  unlockedAt?: string;
  progress?: {
    current: number;
    total: number;
  };
  xpReward: number;
}

export default function RewardsSystem() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'study' | 'achievement' | 'special' | 'streak'>('all');

  const badges: Badge[] = [
    // Study Badges
    {
      id: 'first-study',
      name: 'Primeira Sessão',
      description: 'Complete sua primeira sessão de estudos',
      icon: <BookOpen className="h-6 w-6" />,
      rarity: 'common',
      category: 'study',
      unlocked: true,
      unlockedAt: '15 Jan 2024',
      xpReward: 50
    },
    {
      id: 'study-marathon',
      name: 'Maratonista',
      description: 'Estude por 5 horas consecutivas',
      icon: <Clock className="h-6 w-6" />,
      rarity: 'rare',
      category: 'study',
      unlocked: true,
      unlockedAt: '22 Jan 2024',
      xpReward: 200
    },
    {
      id: 'night-owl',
      name: 'Coruja Noturna',
      description: 'Estude entre 22h e 6h',
      icon: <Star className="h-6 w-6" />,
      rarity: 'common',
      category: 'study',
      unlocked: true,
      unlockedAt: '18 Jan 2024',
      xpReward: 75
    },

    // Achievement Badges
    {
      id: 'question-master',
      name: 'Mestre das Questões',
      description: 'Acerte 100 questões consecutivas',
      icon: <Target className="h-6 w-6" />,
      rarity: 'epic',
      category: 'achievement',
      unlocked: false,
      progress: { current: 67, total: 100 },
      xpReward: 500
    },
    {
      id: 'perfect-week',
      name: 'Semana Perfeita',
      description: 'Complete todas as metas diárias por 7 dias',
      icon: <Trophy className="h-6 w-6" />,
      rarity: 'rare',
      category: 'achievement',
      unlocked: true,
      unlockedAt: '28 Jan 2024',
      xpReward: 300
    },
    {
      id: 'case-detective',
      name: 'Detetive Clínico',
      description: 'Resolva 50 casos clínicos complexos',
      icon: <Stethoscope className="h-6 w-6" />,
      rarity: 'epic',
      category: 'achievement',
      unlocked: false,
      progress: { current: 23, total: 50 },
      xpReward: 400
    },

    // Streak Badges
    {
      id: 'fire-starter',
      name: 'Acendedor',
      description: 'Mantenha uma sequência de 7 dias',
      icon: <Zap className="h-6 w-6" />,
      rarity: 'common',
      category: 'streak',
      unlocked: true,
      unlockedAt: '20 Jan 2024',
      xpReward: 100
    },
    {
      id: 'unstoppable',
      name: 'Imparável',
      description: 'Mantenha uma sequência de 30 dias',
      icon: <Shield className="h-6 w-6" />,
      rarity: 'legendary',
      category: 'streak',
      unlocked: false,
      progress: { current: 12, total: 30 },
      xpReward: 1000
    },

    // Special Badges
    {
      id: 'genius',
      name: 'Gênio Médico',
      description: 'Alcance 95% de acerto em uma especialidade',
      icon: <Brain className="h-6 w-6" />,
      rarity: 'legendary',
      category: 'special',
      unlocked: false,
      progress: { current: 87, total: 95 },
      xpReward: 800
    },
    {
      id: 'helping-hand',
      name: 'Mão Amiga',
      description: 'Ajude 10 colegas com dúvidas',
      icon: <Heart className="h-6 w-6" />,
      rarity: 'rare',
      category: 'special',
      unlocked: false,
      progress: { current: 3, total: 10 },
      xpReward: 250
    },
    {
      id: 'early-adopter',
      name: 'Pioneiro',
      description: 'Seja um dos primeiros 100 usuários',
      icon: <Crown className="h-6 w-6" />,
      rarity: 'legendary',
      category: 'special',
      unlocked: true,
      unlockedAt: '10 Jan 2024',
      xpReward: 1500
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-600';
      case 'rare': return 'from-blue-400 to-blue-600';
      case 'epic': return 'from-purple-400 to-purple-600';
      case 'legendary': return 'from-yellow-400 to-orange-500';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getRarityBg = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 dark:bg-gray-800';
      case 'rare': return 'bg-blue-100 dark:bg-blue-900';
      case 'epic': return 'bg-purple-100 dark:bg-purple-900';
      case 'legendary': return 'bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900 dark:to-orange-900';
      default: return 'bg-gray-100 dark:bg-gray-800';
    }
  };

  const categories = [
    { id: 'all' as const, name: 'Todos', count: badges.length },
    { id: 'study' as const, name: 'Estudo', count: badges.filter(b => b.category === 'study').length },
    { id: 'achievement' as const, name: 'Conquistas', count: badges.filter(b => b.category === 'achievement').length },
    { id: 'streak' as const, name: 'Sequências', count: badges.filter(b => b.category === 'streak').length },
    { id: 'special' as const, name: 'Especiais', count: badges.filter(b => b.category === 'special').length }
  ];

  const filteredBadges = selectedCategory === 'all' 
    ? badges 
    : badges.filter(badge => badge.category === selectedCategory);

  const unlockedCount = badges.filter(badge => badge.unlocked).length;
  const totalXP = badges.filter(badge => badge.unlocked).reduce((sum, badge) => sum + badge.xpReward, 0);

  return (
    <div className="theme-card rounded-lg">
      {/* Header */}
      <div className="p-6 border-b theme-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold theme-text-primary">Sistema de Recompensas</h3>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <p className="text-lg font-bold theme-text-primary">{unlockedCount}/{badges.length}</p>
              <p className="text-xs theme-text-secondary">Badges</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-yellow-600 dark:text-yellow-400">{totalXP}</p>
              <p className="text-xs theme-text-secondary">XP Total</p>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex space-x-2 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-500 text-white'
                  : 'theme-bg-secondary theme-text-secondary hover:theme-text-primary'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* Badges Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBadges.map((badge) => (
            <div
              key={badge.id}
              className={`relative p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                badge.unlocked
                  ? `${getRarityBg(badge.rarity)} border-transparent`
                  : 'theme-bg-secondary border-dashed border-gray-300 dark:border-gray-600 opacity-75'
              }`}
            >
              {/* Rarity Border for Legendary */}
              {badge.unlocked && badge.rarity === 'legendary' && (
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-lg animate-pulse"></div>
              )}

              <div className="relative">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 ${
                  badge.unlocked
                    ? `bg-gradient-to-r ${getRarityColor(badge.rarity)} text-white`
                    : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                }`}>
                  {badge.unlocked ? badge.icon : <Lock className="h-6 w-6" />}
                </div>

                {/* Badge Info */}
                <div>
                  <h4 className={`font-medium mb-1 ${
                    badge.unlocked ? 'theme-text-primary' : 'theme-text-secondary'
                  }`}>
                    {badge.name}
                  </h4>
                  <p className="text-xs theme-text-secondary mb-2 line-clamp-2">
                    {badge.description}
                  </p>

                  {/* Progress Bar (if not unlocked) */}
                  {!badge.unlocked && badge.progress && (
                    <div className="mb-2">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs theme-text-secondary">Progresso</span>
                        <span className="text-xs font-medium theme-text-primary">
                          {badge.progress.current}/{badge.progress.total}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div 
                          className="bg-blue-500 h-1.5 rounded-full"
                          style={{ width: `${(badge.progress.current / badge.progress.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Unlock Date */}
                  {badge.unlocked && badge.unlockedAt && (
                    <p className="text-xs theme-text-tertiary mb-2">
                      Desbloqueado em {badge.unlockedAt}
                    </p>
                  )}

                  {/* XP Reward */}
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      badge.rarity === 'legendary' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      badge.rarity === 'epic' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                      badge.rarity === 'rare' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                    }`}>
                      {badge.rarity}
                    </span>
                    <span className="text-xs font-medium text-yellow-600 dark:text-yellow-400">
                      +{badge.xpReward} XP
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}