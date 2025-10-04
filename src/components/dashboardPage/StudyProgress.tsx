import { useState, useEffect } from 'react';
import { TrendingUp, Clock, Target, Stethoscope, HelpCircle, BookOpen, Star, Award } from 'lucide-react';
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
    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Header */}
      <div className="relative z-10 p-6 border-b border-slate-700/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur opacity-0 group-hover:opacity-75 transition duration-500"></div>
              <div className="relative bg-blue-500/20 rounded-xl p-3 group-hover:bg-blue-500/30 transition-colors duration-300">
                <TrendingUp className="h-6 w-6 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                Progresso por Metodologia
              </h2>
              <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                Acompanhe seu desenvolvimento em cada área
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
              Nível {Math.round(progressData.reduce((acc, p) => acc + p.currentLevel, 0) / progressData.length)}
            </p>
            <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
              {progressData.reduce((acc, p) => acc + p.totalActivities, 0)} atividades totais
            </p>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 p-6">
        <div className="space-y-8">
          {progressData.map((methodology) => (
            <div key={methodology.methodology} className="space-y-4">
              {/* Header da metodologia */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className={`absolute -inset-1 rounded-full blur opacity-0 group-hover:opacity-50 transition duration-500 ${
                      methodology.methodology === 'clinical_cases' 
                        ? 'bg-gradient-to-r from-purple-400 to-violet-400'
                        : methodology.methodology === 'questions'
                        ? 'bg-gradient-to-r from-orange-400 to-amber-400'
                        : 'bg-gradient-to-r from-emerald-400 to-teal-400'
                    }`}></div>
                    <div className={`relative p-3 rounded-xl transition-colors duration-300 ${
                      methodology.methodology === 'clinical_cases'
                        ? 'bg-purple-500/20 group-hover:bg-purple-500/30'
                        : methodology.methodology === 'questions'
                        ? 'bg-orange-500/20 group-hover:bg-orange-500/30'
                        : 'bg-emerald-500/20 group-hover:bg-emerald-500/30'
                    }`}>
                      <span className={`transition-colors duration-300 ${
                        methodology.methodology === 'clinical_cases'
                          ? 'text-purple-400 group-hover:text-purple-300'
                          : methodology.methodology === 'questions'
                          ? 'text-orange-400 group-hover:text-orange-300'
                          : 'text-emerald-400 group-hover:text-emerald-300'
                      }`}>
                        {methodology.icon}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-slate-200 transition-colors duration-300">
                      {methodology.name}
                    </h3>
                    <div className="flex items-center space-x-3 text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <span>Nível {methodology.currentLevel}</span>
                      </div>
                      {methodology.streak > 0 && (
                        <div className="flex items-center space-x-1">
                          <span className="text-orange-400">🔥</span>
                          <span>{methodology.streak} dias seguidos</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-bold transition-colors duration-300 ${
                    methodology.methodology === 'clinical_cases'
                      ? 'text-purple-400 group-hover:text-purple-300'
                      : methodology.methodology === 'questions'
                      ? 'text-orange-400 group-hover:text-orange-300'
                      : 'text-emerald-400 group-hover:text-emerald-300'
                  }`}>
                    {Math.round(methodology.progress)}%
                  </p>
                  <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                    {methodology.currentXP} / {methodology.xpForNextLevel} XP
                  </p>
                </div>
              </div>
              
              {/* Barra de progresso */}
              <div className="relative">
                <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-700 ease-out ${
                      methodology.methodology === 'clinical_cases'
                        ? 'bg-gradient-to-r from-purple-400 to-violet-400'
                        : methodology.methodology === 'questions'
                        ? 'bg-gradient-to-r from-orange-400 to-amber-400'
                        : 'bg-gradient-to-r from-emerald-400 to-teal-400'
                    }`}
                    style={{ width: `${Math.min(methodology.progress, 100)}%` }}
                  ></div>
                </div>
                
                {/* Indicador de nível próximo */}
                {methodology.progress < 100 && (
                  <div className="mt-2 flex justify-between text-xs text-slate-400">
                    <span>Nível {methodology.currentLevel}</span>
                    <span>Nível {methodology.currentLevel + 1}</span>
                  </div>
                )}
              </div>

              {/* Estatísticas adicionais */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
                <div className="flex items-center space-x-6 text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                  <div className="flex items-center space-x-2">
                    <Target className="h-4 w-4" />
                    <span>{methodology.totalActivities} atividades</span>
                  </div>
                  {methodology.streak > 0 && (
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{methodology.streak} dias consecutivos</span>
                    </div>
                  )}
                </div>
                
                {methodology.progress >= 100 ? (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-emerald-400">
                      ✓ Próximo nível desbloqueado!
                    </span>
                  </div>
                ) : (
                  <span className="text-sm text-slate-400">
                    {methodology.xpForNextLevel - methodology.currentXP} XP para próximo nível
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Resumo geral */}
        <div className="mt-8 pt-6 border-t border-slate-700/50">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-700/30 to-slate-800/30 backdrop-blur-sm p-6 border border-slate-600/30">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-teal-500/5"></div>
            <div className="relative z-10">
              <h4 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                <Award className="h-5 w-5 text-yellow-400" />
                <span>Resumo Semanal</span>
              </h4>
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <p className="text-3xl font-bold text-white mb-1">
                    {progressData.reduce((acc, p) => acc + p.totalActivities, 0)}
                  </p>
                  <p className="text-sm text-slate-400">Atividades completas</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white mb-1">
                    {Math.max(...progressData.map(p => p.streak))}
                  </p>
                  <p className="text-sm text-slate-400">Maior sequência</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}