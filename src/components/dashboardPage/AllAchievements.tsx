import { useState, useEffect } from 'react';
import { Trophy, Star, Target, Calendar, Zap, BookOpen, Award, Medal, Crown, Lock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: 'trophy' | 'star' | 'target' | 'calendar' | 'zap' | 'book' | 'award' | 'medal' | 'crown';
  type: 'milestone' | 'streak' | 'accuracy' | 'speed' | 'completion' | 'special';
  category: 'progress' | 'expertise' | 'dedication' | 'achievement' | 'rare';
  isUnlocked: boolean;
  unlockedAt?: Date;
  progress?: {
    current: number;
    total: number;
  };
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  xpReward: number;
}

export default function AllAchievements() {
  const { currentUser } = useAuth();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  useEffect(() => {
    const loadAchievements = async () => {
      if (!currentUser) return;
      
      try {
        // TODO: Implementar busca real das conquistas do usuário
        // Por agora, usando dados mockados
        const mockAchievements: Achievement[] = [
          // Conquistas Desbloqueadas
          {
            id: 'first_correct',
            title: 'Primeira Acertada!',
            description: 'Respondeu sua primeira questão corretamente',
            icon: 'star',
            type: 'milestone',
            category: 'progress',
            isUnlocked: true,
            unlockedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
            rarity: 'common',
            xpReward: 10
          },
          {
            id: 'streak_5',
            title: 'Sequência de 5',
            description: 'Manteve uma sequência de 5 dias estudando',
            icon: 'calendar',
            type: 'streak',
            category: 'dedication',
            isUnlocked: true,
            unlockedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
            progress: { current: 5, total: 5 },
            rarity: 'common',
            xpReward: 50
          },
          {
            id: 'specialty_master_immuno',
            title: 'Especialista em Imunizações',
            description: 'Acertou 80% das questões de Imunizações',
            icon: 'trophy',
            type: 'accuracy',
            category: 'expertise',
            isUnlocked: true,
            unlockedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
            progress: { current: 4, total: 5 },
            rarity: 'rare',
            xpReward: 100
          },
          {
            id: 'questions_25',
            title: 'Estudante Dedicado',
            description: 'Respondeu 25 questões',
            icon: 'book',
            type: 'completion',
            category: 'progress',
            isUnlocked: true,
            unlockedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
            progress: { current: 35, total: 25 },
            rarity: 'common',
            xpReward: 25
          },

          // Conquistas Bloqueadas
          {
            id: 'questions_50',
            title: 'Meio Caminho',
            description: 'Responda 50 questões',
            icon: 'target',
            type: 'completion',
            category: 'progress',
            isUnlocked: false,
            progress: { current: 35, total: 50 },
            rarity: 'common',
            xpReward: 75
          },
          {
            id: 'questions_100',
            title: 'Quase Lá!',
            description: 'Responda 100 questões',
            icon: 'medal',
            type: 'completion',
            category: 'progress',
            isUnlocked: false,
            progress: { current: 35, total: 100 },
            rarity: 'rare',
            xpReward: 150
          },
          {
            id: 'all_questions',
            title: 'Mestre do Conhecimento',
            description: 'Complete todas as 120 questões',
            icon: 'crown',
            type: 'completion',
            category: 'achievement',
            isUnlocked: false,
            progress: { current: 35, total: 120 },
            rarity: 'legendary',
            xpReward: 500
          },
          {
            id: 'streak_10',
            title: 'Persistente',
            description: 'Mantenha uma sequência de 10 dias',
            icon: 'calendar',
            type: 'streak',
            category: 'dedication',
            isUnlocked: false,
            progress: { current: 5, total: 10 },
            rarity: 'rare',
            xpReward: 100
          },
          {
            id: 'streak_30',
            title: 'Incansável',
            description: 'Mantenha uma sequência de 30 dias',
            icon: 'zap',
            type: 'streak',
            category: 'dedication',
            isUnlocked: false,
            progress: { current: 5, total: 30 },
            rarity: 'epic',
            xpReward: 300
          },
          {
            id: 'perfect_accuracy',
            title: 'Perfeição Absoluta',
            description: 'Acerte 20 questões seguidas',
            icon: 'crown',
            type: 'accuracy',
            category: 'rare',
            isUnlocked: false,
            progress: { current: 8, total: 20 },
            rarity: 'legendary',
            xpReward: 400
          },
          {
            id: 'speed_demon',
            title: 'Velocidade da Luz',
            description: 'Responda uma questão em menos de 30 segundos',
            icon: 'zap',
            type: 'speed',
            category: 'achievement',
            isUnlocked: false,
            rarity: 'epic',
            xpReward: 200
          },
          {
            id: 'all_specialties',
            title: 'Polivalente',
            description: 'Acerte pelo menos uma questão de cada especialidade',
            icon: 'award',
            type: 'completion',
            category: 'expertise',
            isUnlocked: false,
            progress: { current: 9, total: 15 },
            rarity: 'rare',
            xpReward: 150
          }
        ];

        setAchievements(mockAchievements);
      } catch (error) {
        console.error('Erro ao carregar conquistas:', error);
        setAchievements([]);
      } finally {
        setLoading(false);
      }
    };

    loadAchievements();
  }, [currentUser]);

  const getIconComponent = (iconType: string) => {
    switch (iconType) {
      case 'trophy': return Trophy;
      case 'star': return Star;
      case 'target': return Target;
      case 'calendar': return Calendar;
      case 'zap': return Zap;
      case 'book': return BookOpen;
      case 'award': return Award;
      case 'medal': return Medal;
      case 'crown': return Crown;
      default: return Trophy;
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30 border-gray-300';
      case 'rare':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 border-blue-300';
      case 'epic':
        return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30 border-purple-300';
      case 'legendary':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30 border-gray-300';
    }
  };

  const getRarityLabel = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'Comum';
      case 'rare': return 'Raro';
      case 'epic': return 'Épico';
      case 'legendary': return 'Lendário';
      default: return 'Comum';
    }
  };

  const categories = [
    { id: 'all', label: 'Todas' },
    { id: 'progress', label: 'Progresso' },
    { id: 'expertise', label: 'Especialização' },
    { id: 'dedication', label: 'Dedicação' },
    { id: 'achievement', label: 'Conquistas' },
    { id: 'rare', label: 'Especiais' }
  ];

  const filteredAchievements = achievements.filter(achievement => {
    if (filter === 'unlocked' && !achievement.isUnlocked) return false;
    if (filter === 'locked' && achievement.isUnlocked) return false;
    if (categoryFilter !== 'all' && achievement.category !== categoryFilter) return false;
    return true;
  });

  const unlockedCount = achievements.filter(a => a.isUnlocked).length;
  const totalXP = achievements.filter(a => a.isUnlocked).reduce((sum, a) => sum + a.xpReward, 0);

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="theme-card rounded-lg p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="theme-card rounded-lg p-6">
              <div className="animate-pulse">
                <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-4"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="theme-card rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm theme-text-secondary">Conquistas Desbloqueadas</p>
              <p className="text-2xl font-bold theme-text-primary">
                {unlockedCount}/{achievements.length}
              </p>
              <p className="text-sm theme-text-tertiary">
                {Math.round((unlockedCount / achievements.length) * 100)}% completo
              </p>
            </div>
            <Trophy className="h-8 w-8 text-yellow-500" />
          </div>
        </div>

        <div className="theme-card rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm theme-text-secondary">XP Total das Conquistas</p>
              <p className="text-2xl font-bold theme-text-primary">{totalXP}</p>
              <p className="text-sm theme-text-tertiary">pontos ganhos</p>
            </div>
            <Star className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="theme-card rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm theme-text-secondary">Próxima Conquista</p>
              <p className="text-lg font-bold theme-text-primary">Meio Caminho</p>
              <p className="text-sm theme-text-tertiary">15 questões restantes</p>
            </div>
            <Target className="h-8 w-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="theme-card rounded-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'theme-bg-primary text-white'
                  : 'theme-bg-secondary theme-text-primary hover:theme-bg-tertiary'
              }`}
            >
              Todas ({achievements.length})
            </button>
            <button
              onClick={() => setFilter('unlocked')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === 'unlocked'
                  ? 'theme-bg-primary text-white'
                  : 'theme-bg-secondary theme-text-primary hover:theme-bg-tertiary'
              }`}
            >
              Desbloqueadas ({unlockedCount})
            </button>
            <button
              onClick={() => setFilter('locked')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === 'locked'
                  ? 'theme-bg-primary text-white'
                  : 'theme-bg-secondary theme-text-primary hover:theme-bg-tertiary'
              }`}
            >
              Bloqueadas ({achievements.length - unlockedCount})
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setCategoryFilter(category.id)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  categoryFilter === category.id
                    ? 'theme-bg-primary text-white'
                    : 'theme-bg-secondary theme-text-primary hover:theme-bg-tertiary'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAchievements.map((achievement) => {
          const IconComponent = getIconComponent(achievement.icon);
          const rarityColors = getRarityColor(achievement.rarity);
          const progressPercentage = achievement.progress 
            ? Math.round((achievement.progress.current / achievement.progress.total) * 100)
            : 100;

          return (
            <div
              key={achievement.id}
              className={`theme-card rounded-lg p-6 border-2 transition-all duration-300 ${
                achievement.isUnlocked 
                  ? `${rarityColors} hover:scale-105` 
                  : 'border-gray-200 dark:border-gray-700 opacity-70'
              }`}
            >
              {/* Achievement Icon */}
              <div className="relative mb-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${
                  achievement.isUnlocked ? rarityColors : 'bg-gray-200 dark:bg-gray-700'
                }`}>
                  {achievement.isUnlocked ? (
                    <IconComponent className="h-8 w-8" />
                  ) : (
                    <Lock className="h-8 w-8 text-gray-500" />
                  )}
                </div>
                
                {/* Rarity Badge */}
                <div className={`absolute -top-1 -right-1 px-2 py-1 rounded-full text-xs font-bold ${rarityColors}`}>
                  {getRarityLabel(achievement.rarity)}
                </div>
              </div>

              {/* Achievement Info */}
              <div className="text-center">
                <h3 className={`font-semibold mb-2 ${
                  achievement.isUnlocked ? 'theme-text-primary' : 'theme-text-secondary'
                }`}>
                  {achievement.title}
                </h3>
                <p className={`text-sm mb-4 ${
                  achievement.isUnlocked ? 'theme-text-secondary' : 'theme-text-tertiary'
                }`}>
                  {achievement.description}
                </p>

                {/* Progress Bar */}
                {achievement.progress && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs theme-text-tertiary mb-1">
                      <span>Progresso</span>
                      <span>{achievement.progress.current}/{achievement.progress.total}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          achievement.isUnlocked ? 'bg-green-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* XP Reward */}
                <div className="flex items-center justify-center space-x-2">
                  <Star className={`h-4 w-4 ${
                    achievement.isUnlocked ? 'text-yellow-500' : 'text-gray-400'
                  }`} />
                  <span className={`text-sm font-medium ${
                    achievement.isUnlocked ? 'theme-text-primary' : 'theme-text-tertiary'
                  }`}>
                    {achievement.xpReward} XP
                  </span>
                </div>

                {/* Unlock Date */}
                {achievement.isUnlocked && achievement.unlockedAt && (
                  <p className="text-xs theme-text-tertiary mt-2">
                    Desbloqueada {achievement.unlockedAt.toLocaleDateString('pt-BR')}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredAchievements.length === 0 && (
        <div className="theme-card rounded-lg p-12 text-center">
          <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="theme-text-secondary">Nenhuma conquista encontrada</p>
          <p className="text-sm theme-text-tertiary">Ajuste os filtros para ver outras conquistas</p>
        </div>
      )}
    </div>
  );
}