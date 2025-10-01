import { Trophy, Star, Target, BookOpen, Zap, Crown } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  progress?: {
    current: number;
    total: number;
  };
  completed: boolean;
  completedAt?: string;
  xpReward: number;
}

export default function Achievements() {
  const achievements: Achievement[] = [
    {
      id: 'expert-emergency',
      title: 'Expert em Emergências',
      description: '10 casos consecutivos corretos',
      icon: <Trophy className="h-4 w-4" />,
      color: 'text-yellow-600 dark:text-yellow-400',
      bgColor: 'bg-yellow-100/20 dark:bg-yellow-900/40',
      completed: true,
      completedAt: 'Hoje',
      xpReward: 300
    },
    {
      id: 'dedicated-student',
      title: 'Estudante Dedicado',
      description: '20h de estudo esta semana',
      icon: <Star className="h-4 w-4" />,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100/20 dark:bg-blue-900/40',
      completed: true,
      completedAt: 'Ontem',
      xpReward: 200
    },
    {
      id: 'monthly-goal',
      title: 'Meta Mensal',
      description: 'Complete 500 questões este mês',
      icon: <Target className="h-4 w-4" />,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100/20 dark:bg-green-900/40',
      progress: {
        current: 387,
        total: 500
      },
      completed: false,
      xpReward: 400
    },
    {
      id: 'study-streak',
      title: 'Sequência Imparável',
      description: 'Estude 30 dias consecutivos',
      icon: <Zap className="h-4 w-4" />,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100/20 dark:bg-orange-900/40',
      progress: {
        current: 12,
        total: 30
      },
      completed: false,
      xpReward: 600
    },
    {
      id: 'speed-reader',
      title: 'Leitor Veloz',
      description: 'Complete 50 flashcards em 10 minutos',
      icon: <BookOpen className="h-4 w-4" />,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100/20 dark:bg-purple-900/40',
      progress: {
        current: 23,
        total: 50
      },
      completed: false,
      xpReward: 250
    }
  ];

  const completedCount = achievements.filter(a => a.completed).length;
  const totalXP = achievements.filter(a => a.completed).reduce((sum, a) => sum + a.xpReward, 0);

  return (
    <div className="theme-card rounded-lg">
      <div className="p-6 border-b theme-border">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold theme-text-primary">Conquistas</h3>
          <div className="flex items-center space-x-3">
            <div className="text-center">
              <p className="text-sm font-bold theme-text-primary">{completedCount}/{achievements.length}</p>
              <p className="text-xs theme-text-secondary">Completas</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-yellow-600 dark:text-yellow-400">{totalXP}</p>
              <p className="text-xs theme-text-secondary">XP Ganho</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
        {achievements.map((achievement) => (
          <div 
            key={achievement.id}
            className={`flex items-start space-x-3 p-3 rounded-lg transition-all duration-200 hover:scale-[1.02] ${
              achievement.completed 
                ? `${achievement.bgColor} backdrop-blur-sm border border-opacity-30` 
                : 'theme-bg-secondary opacity-75'
            }`}
          >
            {/* Icon */}
            <div className={`${achievement.bgColor} backdrop-blur-sm rounded-full p-2 border border-opacity-30 flex-shrink-0`}>
              <div className={achievement.color}>{achievement.icon}</div>
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className={`text-sm font-medium ${
                    achievement.completed ? 'theme-text-primary' : 'theme-text-secondary'
                  }`}>
                    {achievement.title}
                    {achievement.completed && (
                      <Crown className="inline h-3 w-3 ml-1 text-yellow-500" />
                    )}
                  </p>
                  <p className="text-xs theme-text-secondary mt-1">
                    {achievement.description}
                  </p>
                  
                  {/* Progress bar for incomplete achievements */}
                  {!achievement.completed && achievement.progress && (
                    <div className="mt-2">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs theme-text-secondary">Progresso</span>
                        <span className="text-xs font-medium theme-text-primary">
                          {achievement.progress.current}/{achievement.progress.total}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full transition-all duration-500 ${
                            achievement.color.includes('yellow') ? 'bg-yellow-500' :
                            achievement.color.includes('blue') ? 'bg-blue-500' :
                            achievement.color.includes('green') ? 'bg-green-500' :
                            achievement.color.includes('orange') ? 'bg-orange-500' :
                            achievement.color.includes('purple') ? 'bg-purple-500' :
                            'bg-gray-500'
                          }`}
                          style={{ 
                            width: `${(achievement.progress.current / achievement.progress.total) * 100}%` 
                          }}
                        ></div>
                      </div>
                      <p className="text-xs theme-text-tertiary mt-1">
                        {((achievement.progress.current / achievement.progress.total) * 100).toFixed(1)}% concluído
                      </p>
                    </div>
                  )}

                  {/* Completion info */}
                  {achievement.completed && achievement.completedAt && (
                    <p className="text-xs theme-text-tertiary mt-1">
                      Concluído {achievement.completedAt}
                    </p>
                  )}
                </div>
                
                {/* XP Reward */}
                <div className="flex-shrink-0 text-right">
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 text-yellow-500" />
                    <span className="text-xs font-medium text-yellow-600 dark:text-yellow-400">
                      {achievement.xpReward}
                    </span>
                  </div>
                  {achievement.completed && (
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                      ✓ Ganho
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Quick Stats Footer */}
      <div className="p-4 border-t theme-border bg-gradient-to-r from-blue-50/30 to-purple-50/30 dark:from-blue-900/10 dark:to-purple-900/10">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-lg font-bold theme-text-primary">{completedCount}</p>
            <p className="text-xs theme-text-secondary">Conquistas</p>
          </div>
          <div>
            <p className="text-lg font-bold text-yellow-600 dark:text-yellow-400">{totalXP}</p>
            <p className="text-xs theme-text-secondary">XP Total</p>
          </div>
          <div>
            <p className="text-lg font-bold theme-text-primary">
              {achievements.filter(a => !a.completed).length}
            </p>
            <p className="text-xs theme-text-secondary">Pendentes</p>
          </div>
        </div>
      </div>
    </div>
  );
}