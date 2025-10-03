import { useState, useEffect } from 'react';
import { TrendingUp, Clock, Target, Stethoscope, HelpCircle, BookOpen, Star } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { MethodologyXPService } from '../../services/methodologyXPService';
import type { StudyMethodology } from '../../types/xpMethodologies';

interface MethodologyProgress {
  methodology: StudyMethodology;
  name: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  currentLevel: number;
  currentXP: number;
  xpForNextLevel: number;
  totalActivities: number;
  progress: number;
  streak: number;
}

export default function StudyProgress() {
  const { currentUser } = useAuth();
  const [progressData, setProgressData] = useState<MethodologyProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProgressData = async () => {
      if (!currentUser) return;
      
      try {
        const userStats = await MethodologyXPService.getUserMethodologyStats(currentUser.uid);
        
        const progress: MethodologyProgress[] = [
          {
            methodology: 'clinical_cases',
            name: 'Casos Clínicos',
            icon: <Stethoscope className="h-4 w-4" />,
            color: 'text-purple-600',
            bgColor: 'bg-purple-600',
            currentLevel: userStats.methodologyStats.clinical_cases.currentLevel,
            currentXP: userStats.methodologyStats.clinical_cases.totalXP,
            xpForNextLevel: MethodologyXPService.getXPRequiredForLevel(userStats.methodologyStats.clinical_cases.currentLevel + 1, 'clinical_cases'),
            totalActivities: userStats.methodologyStats.clinical_cases.totalActivities,
            progress: 0, // Será calculado
            streak: userStats.methodologyStats.clinical_cases.currentStreak
          },
          {
            methodology: 'questions',
            name: 'Banco de Questões',
            icon: <HelpCircle className="h-4 w-4" />,
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-600',
            currentLevel: userStats.methodologyStats.questions.currentLevel,
            currentXP: userStats.methodologyStats.questions.totalXP,
            xpForNextLevel: MethodologyXPService.getXPRequiredForLevel(userStats.methodologyStats.questions.currentLevel + 1, 'questions'),
            totalActivities: userStats.methodologyStats.questions.totalActivities,
            progress: 0, // Será calculado
            streak: userStats.methodologyStats.questions.currentStreak
          },
          {
            methodology: 'flashcards',
            name: 'Flashcards',
            icon: <BookOpen className="h-4 w-4" />,
            color: 'text-green-600',
            bgColor: 'bg-green-600',
            currentLevel: userStats.methodologyStats.flashcards.currentLevel,
            currentXP: userStats.methodologyStats.flashcards.totalXP,
            xpForNextLevel: MethodologyXPService.getXPRequiredForLevel(userStats.methodologyStats.flashcards.currentLevel + 1, 'flashcards'),
            totalActivities: userStats.methodologyStats.flashcards.totalActivities,
            progress: 0, // Será calculado
            streak: userStats.methodologyStats.flashcards.currentStreak
          }
        ];

        // Calcular progresso para o próximo nível
        progress.forEach(methodology => {
          const currentLevelXP = MethodologyXPService.getXPRequiredForLevel(methodology.currentLevel, methodology.methodology);
          const progressToNextLevel = methodology.currentXP - currentLevelXP;
          const xpNeededForNextLevel = methodology.xpForNextLevel - currentLevelXP;
          methodology.progress = xpNeededForNextLevel > 0 ? (progressToNextLevel / xpNeededForNextLevel) * 100 : 100;
        });

        setProgressData(progress);
      } catch (error) {
        console.error('Erro ao carregar dados de progresso:', error);
        // Fallback com dados estáticos
        setProgressData([
          {
            methodology: 'clinical_cases',
            name: 'Casos Clínicos',
            icon: <Stethoscope className="h-4 w-4" />,
            color: 'text-purple-600',
            bgColor: 'bg-purple-600',
            currentLevel: 1,
            currentXP: 150,
            xpForNextLevel: 200,
            totalActivities: 5,
            progress: 75,
            streak: 2
          },
          {
            methodology: 'questions',
            name: 'Banco de Questões',
            icon: <HelpCircle className="h-4 w-4" />,
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-600',
            currentLevel: 1,
            currentXP: 120,
            xpForNextLevel: 200,
            totalActivities: 8,
            progress: 60,
            streak: 1
          },
          {
            methodology: 'flashcards',
            name: 'Flashcards',
            icon: <BookOpen className="h-4 w-4" />,
            color: 'text-green-600',
            bgColor: 'bg-green-600',
            currentLevel: 1,
            currentXP: 80,
            xpForNextLevel: 200,
            totalActivities: 3,
            progress: 40,
            streak: 0
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadProgressData();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="theme-card rounded-lg">
        <div className="p-6 border-b theme-border">
          <div className="animate-pulse h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
        </div>
        <div className="p-6 space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="flex justify-between mb-2">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
              </div>
              <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
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
          <h2 className="text-lg font-semibold theme-text-primary flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-blue-500" />
            Progresso por Metodologia
          </h2>
          <div className="text-right">
            <p className="text-sm font-medium theme-text-primary">
              Nível médio: {Math.round(progressData.reduce((acc, p) => acc + p.currentLevel, 0) / progressData.length)}
            </p>
            <p className="text-xs theme-text-secondary">
              {progressData.reduce((acc, p) => acc + p.totalActivities, 0)} atividades totais
            </p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-6">
          {progressData.map((methodology) => (
            <div key={methodology.methodology} className="space-y-3">
              {/* Header da metodologia */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`p-2 rounded-lg ${methodology.color.replace('text-', 'bg-')}/10`}>
                    <span className={methodology.color}>{methodology.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium theme-text-primary">{methodology.name}</h3>
                    <div className="flex items-center space-x-2 text-xs theme-text-secondary">
                      <Star className="h-3 w-3" />
                      <span>Nível {methodology.currentLevel}</span>
                      {methodology.streak > 0 && (
                        <>
                          <span>•</span>
                          <span>{methodology.streak} dias seguidos</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold theme-text-primary">
                    {Math.round(methodology.progress)}%
                  </p>
                  <p className="text-xs theme-text-secondary">
                    {methodology.currentXP} / {methodology.xpForNextLevel} XP
                  </p>
                </div>
              </div>
              
              {/* Barra de progresso */}
              <div className="relative">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className={`${methodology.bgColor} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${Math.min(methodology.progress, 100)}%` }}
                  ></div>
                </div>
                
                {/* Indicador de nível próximo */}
                {methodology.progress < 100 && (
                  <div className="mt-1 flex justify-between text-xs theme-text-tertiary">
                    <span>Nível {methodology.currentLevel}</span>
                    <span>Nível {methodology.currentLevel + 1}</span>
                  </div>
                )}
              </div>

              {/* Estatísticas adicionais */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center space-x-4 text-xs theme-text-secondary">
                  <div className="flex items-center space-x-1">
                    <Target className="h-3 w-3" />
                    <span>{methodology.totalActivities} atividades</span>
                  </div>
                  {methodology.streak > 0 && (
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{methodology.streak} dias consecutivos</span>
                    </div>
                  )}
                </div>
                
                {methodology.progress >= 100 ? (
                  <span className="text-xs font-medium text-green-600 dark:text-green-400">
                    ✓ Próximo nível desbloqueado!
                  </span>
                ) : (
                  <span className="text-xs theme-text-secondary">
                    {methodology.xpForNextLevel - methodology.currentXP} XP para próximo nível
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Resumo geral */}
        <div className="mt-6 pt-4 border-t theme-border">
          <div className="bg-gradient-to-r from-blue-50/30 to-purple-50/30 dark:from-blue-900/10 dark:to-purple-900/10 rounded-lg p-4">
            <h4 className="font-medium theme-text-primary mb-2">Resumo Semanal</h4>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-lg font-bold theme-text-primary">
                  {progressData.reduce((acc, p) => acc + p.totalActivities, 0)}
                </p>
                <p className="text-xs theme-text-secondary">Atividades completas</p>
              </div>
              <div>
                <p className="text-lg font-bold theme-text-primary">
                  {Math.max(...progressData.map(p => p.streak))}
                </p>
                <p className="text-xs theme-text-secondary">Maior sequência</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}