import { useState, useEffect } from 'react';
import { Clock, BookOpen, HelpCircle, Stethoscope, Star, Zap, Trophy, TrendingUp } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { MethodologyXPService } from '../../services/methodologyXPService';

interface DashboardStatsData {
  overallLevel: number;
  totalXP: number;
  methodologyLevels: {
    clinical_cases: { level: number; xp: number };
    questions: { level: number; xp: number };
    flashcards: { level: number; xp: number };
  };
  studyStreak: number;
  accuracy: number;
  achievements: number;
  studyHours: number;
  questionsAnswered: number;
  casesCompleted: number;
  flashcardsStudied: number;
}

export default function DashboardStats() {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState<DashboardStatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      if (!currentUser) return;
      
      try {
        // Carregar dados do usuário
        const overallLevel = await MethodologyXPService.getUserOverallLevel(currentUser.uid);
        const clinicalLevels = await MethodologyXPService.getMethodologyLevel(currentUser.uid, 'clinical_cases');
        const questionsLevels = await MethodologyXPService.getMethodologyLevel(currentUser.uid, 'questions');
        const flashcardsLevels = await MethodologyXPService.getMethodologyLevel(currentUser.uid, 'flashcards');
        
        setStats({
          overallLevel: overallLevel.overallLevel,
          totalXP: overallLevel.totalXP,
          methodologyLevels: {
            clinical_cases: { 
              level: clinicalLevels.currentLevel, 
              xp: clinicalLevels.totalXP 
            },
            questions: { 
              level: questionsLevels.currentLevel, 
              xp: questionsLevels.totalXP 
            },
            flashcards: { 
              level: flashcardsLevels.currentLevel, 
              xp: flashcardsLevels.totalXP 
            }
          },
          studyStreak: 7, // TODO: Implementar sistema de streaks
          accuracy: 87,   // TODO: Calcular da base de dados
          achievements: 15, // TODO: Contar achievements reais
          studyHours: 24.5, // TODO: Calcular das sessões de estudo
          questionsAnswered: questionsLevels.totalXP / 10, // Estimativa baseada no XP
          casesCompleted: clinicalLevels.totalXP / 25, // Estimativa baseada no XP
          flashcardsStudied: flashcardsLevels.totalXP / 5 // Estimativa baseada no XP
        });
      } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);
        // Se houver erro, usar valores padrão
        setStats({
          overallLevel: 1,
          totalXP: 0,
          methodologyLevels: {
            clinical_cases: { level: 1, xp: 0 },
            questions: { level: 1, xp: 0 },
            flashcards: { level: 1, xp: 0 }
          },
          studyStreak: 0,
          accuracy: 0,
          achievements: 0,
          studyHours: 0,
          questionsAnswered: 0,
          casesCompleted: 0,
          flashcardsStudied: 0
        });
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="theme-card rounded-lg p-6 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
                <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
              </div>
              <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* XP Total e Nível Geral */}
      <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 p-6 hover:border-purple-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-400/20 hover:scale-105 transform">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400 group-hover:text-slate-300 transition-colors duration-300 mb-2">XP Total</p>
              <p className="text-3xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300 tracking-tight">{stats.totalXP.toLocaleString()}</p>
              <div className="flex items-center space-x-2 mt-2">
                <Star className="h-4 w-4 text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300" />
                <span className="text-sm font-medium text-purple-400 group-hover:text-purple-300 transition-colors duration-300">
                  Nível {stats.overallLevel}
                </span>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 rounded-full blur opacity-0 group-hover:opacity-75 transition duration-500"></div>
              <div className="relative bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-xl p-3 group-hover:from-purple-500/40 group-hover:to-blue-500/40 transition-all duration-300">
                <Zap className="h-7 w-7 text-purple-300 group-hover:text-purple-200 transition-colors duration-300" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Casos Clínicos */}
      <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 p-6 hover:border-purple-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-400/20 hover:scale-105 transform">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400 group-hover:text-slate-300 transition-colors duration-300 mb-2">Casos Clínicos</p>
              <div className="flex items-center space-x-2">
                <p className="text-3xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300 tracking-tight">
                  {Math.floor(stats.casesCompleted)}
                </p>
                <span className="text-sm font-medium text-purple-400 group-hover:text-purple-300 transition-colors duration-300">
                  Nv.{stats.methodologyLevels.clinical_cases.level}
                </span>
              </div>
              <p className="text-sm text-purple-400 group-hover:text-purple-300 transition-colors duration-300 mt-1">
                {stats.methodologyLevels.clinical_cases.xp} XP
              </p>
            </div>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-violet-400 rounded-full blur opacity-0 group-hover:opacity-75 transition duration-500"></div>
              <div className="relative bg-purple-500/20 rounded-xl p-3 group-hover:bg-purple-500/30 transition-colors duration-300">
                <Stethoscope className="h-7 w-7 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Questões */}
      <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 p-6 hover:border-orange-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-400/20 hover:scale-105 transform">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400 group-hover:text-slate-300 transition-colors duration-300 mb-2">Questões</p>
              <div className="flex items-center space-x-2">
                <p className="text-3xl font-bold text-white group-hover:text-orange-300 transition-colors duration-300 tracking-tight">
                  {Math.floor(stats.questionsAnswered)}
                </p>
                <span className="text-sm font-medium text-orange-400 group-hover:text-orange-300 transition-colors duration-300">
                  Nv.{stats.methodologyLevels.questions.level}
                </span>
              </div>
              <p className="text-sm text-orange-400 group-hover:text-orange-300 transition-colors duration-300 mt-1">
                {stats.methodologyLevels.questions.xp} XP
              </p>
            </div>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full blur opacity-0 group-hover:opacity-75 transition duration-500"></div>
              <div className="relative bg-orange-500/20 rounded-xl p-3 group-hover:bg-orange-500/30 transition-colors duration-300">
                <HelpCircle className="h-7 w-7 text-orange-400 group-hover:text-orange-300 transition-colors duration-300" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Flashcards */}
      <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 p-6 hover:border-emerald-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-400/20 hover:scale-105 transform">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400 group-hover:text-slate-300 transition-colors duration-300 mb-2">Flashcards</p>
              <div className="flex items-center space-x-2">
                <p className="text-3xl font-bold text-white group-hover:text-emerald-300 transition-colors duration-300 tracking-tight">
                  {Math.floor(stats.flashcardsStudied)}
                </p>
                <span className="text-sm font-medium text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300">
                  Nv.{stats.methodologyLevels.flashcards.level}
                </span>
              </div>
              <p className="text-sm text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300 mt-1">
                {stats.methodologyLevels.flashcards.xp} XP
              </p>
            </div>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full blur opacity-0 group-hover:opacity-75 transition duration-500"></div>
              <div className="relative bg-emerald-500/20 rounded-xl p-3 group-hover:bg-emerald-500/30 transition-colors duration-300">
                <BookOpen className="h-7 w-7 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sequência de Estudo */}
      <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 p-6 hover:border-orange-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-400/20 hover:scale-105 transform">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400 group-hover:text-slate-300 transition-colors duration-300 mb-2">Sequência de Estudo</p>
              <div className="flex items-center space-x-2">
                <p className="text-3xl font-bold text-white group-hover:text-orange-300 transition-colors duration-300 tracking-tight">{stats.studyStreak}</p>
                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">🔥</span>
              </div>
              <p className="text-sm text-orange-400 group-hover:text-orange-300 transition-colors duration-300 mt-1">+2 vs ontem</p>
            </div>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-red-400 rounded-full blur opacity-0 group-hover:opacity-75 transition duration-500"></div>
              <div className="relative bg-orange-500/20 rounded-xl p-3 group-hover:bg-orange-500/30 transition-colors duration-300">
                <Clock className="h-7 w-7 text-orange-400 group-hover:text-orange-300 transition-colors duration-300" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Taxa de Acerto */}
      <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 p-6 hover:border-emerald-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-400/20 hover:scale-105 transform">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400 group-hover:text-slate-300 transition-colors duration-300 mb-2">Taxa de Acerto</p>
              <div className="flex items-baseline space-x-1">
                <p className="text-3xl font-bold text-white group-hover:text-emerald-300 transition-colors duration-300 tracking-tight">{stats.accuracy}</p>
                <span className="text-xl font-semibold text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300">%</span>
              </div>
              <p className="text-sm text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300 mt-1">+5% esta semana</p>
            </div>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full blur opacity-0 group-hover:opacity-75 transition duration-500"></div>
              <div className="relative bg-emerald-500/20 rounded-xl p-3 group-hover:bg-emerald-500/30 transition-colors duration-300">
                <TrendingUp className="h-7 w-7 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Horas de Estudo */}
      <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 p-6 hover:border-blue-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-400/20 hover:scale-105 transform">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400 group-hover:text-slate-300 transition-colors duration-300 mb-2">Horas de Estudo</p>
              <div className="flex items-baseline space-x-1">
                <p className="text-3xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300 tracking-tight">{stats.studyHours}</p>
                <span className="text-lg font-semibold text-blue-400 group-hover:text-blue-300 transition-colors duration-300">h</span>
              </div>
              <p className="text-sm text-blue-400 group-hover:text-blue-300 transition-colors duration-300 mt-1">Meta: 30h/semana</p>
            </div>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur opacity-0 group-hover:opacity-75 transition duration-500"></div>
              <div className="relative bg-blue-500/20 rounded-xl p-3 group-hover:bg-blue-500/30 transition-colors duration-300">
                <Clock className="h-7 w-7 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Conquistas */}
      <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 p-6 hover:border-yellow-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-400/20 hover:scale-105 transform">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400 group-hover:text-slate-300 transition-colors duration-300 mb-2">Conquistas</p>
              <p className="text-3xl font-bold text-white group-hover:text-yellow-300 transition-colors duration-300 tracking-tight">{stats.achievements}</p>
              <p className="text-sm text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300 mt-1">3 desbloqueadas hoje</p>
            </div>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full blur opacity-0 group-hover:opacity-75 transition duration-500"></div>
              <div className="relative bg-yellow-500/20 rounded-xl p-3 group-hover:bg-yellow-500/30 transition-colors duration-300">
                <Trophy className="h-7 w-7 text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}