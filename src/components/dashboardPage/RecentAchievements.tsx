import { useState, useEffect } from 'react';
import { Trophy, Star, Target, Calendar, Zap, BookOpen } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface RecentAchievement {
  id: string;
  title: string;
  description: string;
  icon: 'trophy' | 'star' | 'target' | 'calendar' | 'zap' | 'book';
  type: 'milestone' | 'streak' | 'accuracy' | 'speed' | 'completion';
  unlockedAt: Date;
  progress?: {
    current: number;
    total: number;
  };
}

export default function RecentAchievements() {
  const { currentUser } = useAuth();
  const [recentAchievements, setRecentAchievements] = useState<RecentAchievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecentAchievements = async () => {
      if (!currentUser) return;
      
      try {
        // TODO: Implementar busca real das conquistas recentes do usuário
        // Por agora, usando dados mockados
        const mockAchievements: RecentAchievement[] = [
          {
            id: 'first_correct',
            title: 'Primeira Acertada!',
            description: 'Respondeu sua primeira questão corretamente',
            icon: 'star',
            type: 'milestone',
            unlockedAt: new Date(Date.now() - 6 * 60 * 60 * 1000) // 6h atrás
          },
          {
            id: 'streak_5',
            title: 'Sequência de 5',
            description: 'Manteve uma sequência de 5 dias estudando',
            icon: 'calendar',
            type: 'streak',
            unlockedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 dia atrás
            progress: {
              current: 5,
              total: 5
            }
          },
          {
            id: 'specialty_master_immuno',
            title: 'Especialista em Imunizações',
            description: 'Acertou 80% das questões de Imunizações',
            icon: 'trophy',
            type: 'accuracy',
            unlockedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 dias atrás
            progress: {
              current: 4,
              total: 5
            }
          }
        ];

        setRecentAchievements(mockAchievements);
      } catch (error) {
        console.error('Erro ao carregar conquistas recentes:', error);
        setRecentAchievements([]);
      } finally {
        setLoading(false);
      }
    };

    loadRecentAchievements();
  }, [currentUser]);

  const getIconComponent = (iconType: string) => {
    switch (iconType) {
      case 'trophy':
        return Trophy;
      case 'star':
        return Star;
      case 'target':
        return Target;
      case 'calendar':
        return Calendar;
      case 'zap':
        return Zap;
      case 'book':
        return BookOpen;
      default:
        return Trophy;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'milestone':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'streak':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
      case 'accuracy':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'speed':
        return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30';
      case 'completion':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return `${diffInMinutes}min atrás`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h atrás`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d atrás`;
    }
  };

  if (loading) {
    return (
      <div className="theme-card rounded-lg">
        <div className="p-6 border-b theme-border">
          <div className="animate-pulse h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="theme-card rounded-lg">
      <div className="p-6 border-b theme-border">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold theme-text-primary flex items-center">
            <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
            Conquistas Recentes
          </h3>
          <span className="text-sm theme-text-secondary">
            {recentAchievements.length} desbloqueadas
          </span>
        </div>
      </div>
      
      <div className="p-6">
        {recentAchievements.length === 0 ? (
          <div className="text-center py-8">
            <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="theme-text-secondary">Nenhuma conquista ainda</p>
            <p className="text-sm theme-text-tertiary">Continue estudando para desbloquear conquistas!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentAchievements.map((achievement) => {
              const IconComponent = getIconComponent(achievement.icon);
              
              return (
                <div
                  key={achievement.id}
                  className="flex items-start space-x-4 p-4 rounded-lg theme-bg-secondary hover:theme-bg-tertiary transition-colors"
                >
                  {/* Achievement Icon */}
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${getTypeColor(achievement.type)}`}>
                    <IconComponent className="h-6 w-6" />
                  </div>

                  {/* Achievement Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold theme-text-primary">
                          {achievement.title}
                        </h4>
                        <p className="text-sm theme-text-secondary mt-1">
                          {achievement.description}
                        </p>
                        
                        {/* Progress Bar (if applicable) */}
                        {achievement.progress && (
                          <div className="mt-2">
                            <div className="flex items-center justify-between text-xs theme-text-tertiary mb-1">
                              <span>Progresso</span>
                              <span>{achievement.progress.current}/{achievement.progress.total}</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                              <div 
                                className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                                style={{ 
                                  width: `${(achievement.progress.current / achievement.progress.total) * 100}%` 
                                }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Time */}
                      <div className="text-right ml-4">
                        <span className="text-xs theme-text-tertiary">
                          {formatTimeAgo(achievement.unlockedAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Action Button */}
        {recentAchievements.length > 0 && (
          <div className="mt-6 pt-4 border-t theme-border">
            <button className="w-full theme-bg-secondary theme-text-primary py-2 px-4 rounded-lg font-medium hover:theme-bg-tertiary transition-colors text-sm">
              Ver Todas as Conquistas
            </button>
          </div>
        )}
      </div>
    </div>
  );
}