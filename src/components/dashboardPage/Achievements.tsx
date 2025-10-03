import { useState, useEffect } from 'react';
import { Trophy, Star, Target, BookOpen, Zap, Crown, Stethoscope, HelpCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { MethodologyXPService } from '../../services/methodologyXPService';
import type { StudyMethodology } from '../../types/xpMethodologies';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  methodology?: StudyMethodology;
  progress?: {
    current: number;
    total: number;
  };
  completed: boolean;
  completedAt?: string;
  xpReward: number;
}

export default function Achievements() {
  const { currentUser } = useAuth();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAchievements = async () => {
      if (!currentUser) return;
      
      try {
        const userStats = await MethodologyXPService.getUserMethodologyStats(currentUser.uid);
        const userOverallLevel = await MethodologyXPService.getUserOverallLevel(currentUser.uid);
        
        // Definir conquistas baseadas no sistema de metodologias
        const methodologyAchievements: Achievement[] = [
          // Conquistas de Casos Clínicos
          {
            id: 'clinical-expert',
            title: 'Expert em Casos Clínicos',
            description: 'Alcance o nível 5 em casos clínicos',
            icon: <Stethoscope className="h-4 w-4" />,
            color: 'text-purple-600 dark:text-purple-400',
            bgColor: 'bg-purple-100/20 dark:bg-purple-900/40',
            methodology: 'clinical_cases',
            progress: {
              current: userStats.methodologyStats.clinical_cases.currentLevel,
              total: 5
            },
            completed: userStats.methodologyStats.clinical_cases.currentLevel >= 5,
            completedAt: userStats.methodologyStats.clinical_cases.currentLevel >= 5 ? 'Recente' : undefined,
            xpReward: 500
          },
          {
            id: 'clinical-master',
            title: 'Mestre dos Casos',
            description: 'Acumule 1000 XP em casos clínicos',
            icon: <Trophy className="h-4 w-4" />,
            color: 'text-purple-600 dark:text-purple-400',
            bgColor: 'bg-purple-100/20 dark:bg-purple-900/40',
            methodology: 'clinical_cases',
            progress: {
              current: Math.min(userStats.methodologyStats.clinical_cases.totalXP, 1000),
              total: 1000
            },
            completed: userStats.methodologyStats.clinical_cases.totalXP >= 1000,
            completedAt: userStats.methodologyStats.clinical_cases.totalXP >= 1000 ? 'Recente' : undefined,
            xpReward: 300
          },
          
          // Conquistas de Questões
          {
            id: 'questions-champion',
            title: 'Campeão das Questões',
            description: 'Alcance o nível 5 em questões',
            icon: <HelpCircle className="h-4 w-4" />,
            color: 'text-yellow-600 dark:text-yellow-400',
            bgColor: 'bg-yellow-100/20 dark:bg-yellow-900/40',
            methodology: 'questions',
            progress: {
              current: userStats.methodologyStats.questions.currentLevel,
              total: 5
            },
            completed: userStats.methodologyStats.questions.currentLevel >= 5,
            completedAt: userStats.methodologyStats.questions.currentLevel >= 5 ? 'Recente' : undefined,
            xpReward: 500
          },
          {
            id: 'questions-master',
            title: 'Mestre das Questões',
            description: 'Acumule 1000 XP em questões',
            icon: <Target className="h-4 w-4" />,
            color: 'text-yellow-600 dark:text-yellow-400',
            bgColor: 'bg-yellow-100/20 dark:bg-yellow-900/40',
            methodology: 'questions',
            progress: {
              current: Math.min(userStats.methodologyStats.questions.totalXP, 1000),
              total: 1000
            },
            completed: userStats.methodologyStats.questions.totalXP >= 1000,
            completedAt: userStats.methodologyStats.questions.totalXP >= 1000 ? 'Recente' : undefined,
            xpReward: 300
          },
          
          // Conquistas de Flashcards
          {
            id: 'flashcards-expert',
            title: 'Expert em Flashcards',
            description: 'Alcance o nível 5 em flashcards',
            icon: <BookOpen className="h-4 w-4" />,
            color: 'text-green-600 dark:text-green-400',
            bgColor: 'bg-green-100/20 dark:bg-green-900/40',
            methodology: 'flashcards',
            progress: {
              current: userStats.methodologyStats.flashcards.currentLevel,
              total: 5
            },
            completed: userStats.methodologyStats.flashcards.currentLevel >= 5,
            completedAt: userStats.methodologyStats.flashcards.currentLevel >= 5 ? 'Recente' : undefined,
            xpReward: 500
          },
          {
            id: 'speed-learner',
            title: 'Aprendiz Veloz',
            description: 'Acumule 1000 XP em flashcards',
            icon: <Zap className="h-4 w-4" />,
            color: 'text-green-600 dark:text-green-400',
            bgColor: 'bg-green-100/20 dark:bg-green-900/40',
            methodology: 'flashcards',
            progress: {
              current: Math.min(userStats.methodologyStats.flashcards.totalXP, 1000),
              total: 1000
            },
            completed: userStats.methodologyStats.flashcards.totalXP >= 1000,
            completedAt: userStats.methodologyStats.flashcards.totalXP >= 1000 ? 'Recente' : undefined,
            xpReward: 300
          },
          
          // Conquistas Gerais
          {
            id: 'overall-expert',
            title: 'Especialista Geral',
            description: 'Alcance o nível 10 geral',
            icon: <Crown className="h-4 w-4" />,
            color: 'text-blue-600 dark:text-blue-400',
            bgColor: 'bg-blue-100/20 dark:bg-blue-900/40',
            progress: {
              current: userOverallLevel.overallLevel,
              total: 10
            },
            completed: userOverallLevel.overallLevel >= 10,
            completedAt: userOverallLevel.overallLevel >= 10 ? 'Recente' : undefined,
            xpReward: 1000
          },
          {
            id: 'balanced-learner',
            title: 'Aprendiz Equilibrado',
            description: 'Tenha pelo menos nível 3 em todas as metodologias',
            icon: <Star className="h-4 w-4" />,
            color: 'text-orange-600 dark:text-orange-400',
            bgColor: 'bg-orange-100/20 dark:bg-orange-900/40',
            progress: {
              current: Math.min(
                userStats.methodologyStats.clinical_cases.currentLevel,
                userStats.methodologyStats.questions.currentLevel,
                userStats.methodologyStats.flashcards.currentLevel
              ),
              total: 3
            },
            completed: userStats.methodologyStats.clinical_cases.currentLevel >= 3 && 
                      userStats.methodologyStats.questions.currentLevel >= 3 && 
                      userStats.methodologyStats.flashcards.currentLevel >= 3,
            completedAt: (userStats.methodologyStats.clinical_cases.currentLevel >= 3 && 
                         userStats.methodologyStats.questions.currentLevel >= 3 && 
                         userStats.methodologyStats.flashcards.currentLevel >= 3) ? 'Recente' : undefined,
            xpReward: 750
          }
        ];

        setAchievements(methodologyAchievements);
      } catch (error) {
        console.error('Erro ao carregar conquistas:', error);
        // Fallback com conquistas estáticas em caso de erro
        setAchievements([
          {
            id: 'fallback-achievement',
            title: 'Primeiro Passo',
            description: 'Comece sua jornada de estudos',
            icon: <Star className="h-4 w-4" />,
            color: 'text-blue-600 dark:text-blue-400',
            bgColor: 'bg-blue-100/20 dark:bg-blue-900/40',
            completed: true,
            completedAt: 'Hoje',
            xpReward: 100
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadAchievements();
  }, [currentUser]);

  const completedCount = achievements.filter(a => a.completed).length;
  const totalXP = achievements.filter(a => a.completed).reduce((sum, a) => sum + a.xpReward, 0);

  const getMethodologyColor = (methodology?: StudyMethodology) => {
    if (!methodology) return '';
    
    switch (methodology) {
      case 'clinical_cases':
        return 'border-l-4 border-purple-500';
      case 'questions':
        return 'border-l-4 border-yellow-500';
      case 'flashcards':
        return 'border-l-4 border-green-500';
      default:
        return '';
    }
  };

  if (loading) {
    return (
      <div className="theme-card rounded-lg">
        <div className="p-6 border-b theme-border">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mb-4"></div>
            <div className="flex space-x-4">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse flex items-start space-x-3 p-3 theme-bg-secondary rounded-lg">
              <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
              </div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-12"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="theme-card rounded-lg">
      <div className="p-6 border-b theme-border">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold theme-text-primary">Conquistas por Metodologia</h3>
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
            } ${getMethodologyColor(achievement.methodology)}`}
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
                  
                  {/* Methodology Tag */}
                  {achievement.methodology && (
                    <div className="mt-2">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                        achievement.methodology === 'clinical_cases' ? 'text-purple-600 bg-purple-100 dark:bg-purple-900/30' :
                        achievement.methodology === 'questions' ? 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30' :
                        achievement.methodology === 'flashcards' ? 'text-green-600 bg-green-100 dark:bg-green-900/30' :
                        'text-gray-600 bg-gray-100 dark:bg-gray-900/30'
                      }`}>
                        {achievement.methodology === 'clinical_cases' ? 'Casos Clínicos' :
                         achievement.methodology === 'questions' ? 'Questões' :
                         achievement.methodology === 'flashcards' ? 'Flashcards' : 'Geral'}
                      </span>
                    </div>
                  )}
                  
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
            <p className="text-xs theme-text-secondary">XP Bônus</p>
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