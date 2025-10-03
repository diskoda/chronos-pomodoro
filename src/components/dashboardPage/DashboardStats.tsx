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
      <div className="theme-card rounded-lg p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium theme-text-secondary">XP Total</p>
            <p className="text-3xl font-bold theme-text-primary">{stats.totalXP.toLocaleString()}</p>
            <div className="flex items-center space-x-2 mt-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                Nível {stats.overallLevel}
              </span>
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-3">
            <Zap className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>

      {/* Casos Clínicos */}
      <div className="theme-card rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium theme-text-secondary">Casos Clínicos</p>
            <div className="flex items-center space-x-2">
              <p className="text-3xl font-bold theme-text-primary">
                {Math.floor(stats.casesCompleted)}
              </p>
              <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                Nv.{stats.methodologyLevels.clinical_cases.level}
              </span>
            </div>
            <p className="text-sm text-purple-600 dark:text-purple-400">
              {stats.methodologyLevels.clinical_cases.xp} XP
            </p>
          </div>
          <div className="bg-purple-100/20 dark:bg-purple-900/40 backdrop-blur-sm rounded-full p-3 border border-purple-200/30 dark:border-purple-800/30">
            <Stethoscope className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
        </div>
      </div>

      {/* Questões */}
      <div className="theme-card rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium theme-text-secondary">Questões</p>
            <div className="flex items-center space-x-2">
              <p className="text-3xl font-bold theme-text-primary">
                {Math.floor(stats.questionsAnswered)}
              </p>
              <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                Nv.{stats.methodologyLevels.questions.level}
              </span>
            </div>
            <p className="text-sm text-yellow-600 dark:text-yellow-400">
              {stats.methodologyLevels.questions.xp} XP
            </p>
          </div>
          <div className="bg-yellow-100/20 dark:bg-yellow-900/40 backdrop-blur-sm rounded-full p-3 border border-yellow-200/30 dark:border-yellow-800/30">
            <HelpCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Flashcards */}
      <div className="theme-card rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium theme-text-secondary">Flashcards</p>
            <div className="flex items-center space-x-2">
              <p className="text-3xl font-bold theme-text-primary">
                {Math.floor(stats.flashcardsStudied)}
              </p>
              <span className="text-sm font-medium text-green-600 dark:text-green-400">
                Nv.{stats.methodologyLevels.flashcards.level}
              </span>
            </div>
            <p className="text-sm text-green-600 dark:text-green-400">
              {stats.methodologyLevels.flashcards.xp} XP
            </p>
          </div>
          <div className="bg-green-100/20 dark:bg-green-900/40 backdrop-blur-sm rounded-full p-3 border border-green-200/30 dark:border-green-800/30">
            <BookOpen className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
        </div>
      </div>

      {/* Sequência de Estudo */}
      <div className="theme-card rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium theme-text-secondary">Sequência de Estudo</p>
            <div className="flex items-center space-x-2">
              <p className="text-3xl font-bold theme-text-primary">{stats.studyStreak}</p>
              <span className="text-2xl">🔥</span>
            </div>
            <p className="text-sm text-orange-600 dark:text-orange-400">+2 vs ontem</p>
          </div>
          <div className="bg-orange-100/20 dark:bg-orange-900/40 backdrop-blur-sm rounded-full p-3 border border-orange-200/30 dark:border-orange-800/30">
            <Clock className="h-6 w-6 text-orange-600 dark:text-orange-400" />
          </div>
        </div>
      </div>

      {/* Taxa de Acerto */}
      <div className="theme-card rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium theme-text-secondary">Taxa de Acerto</p>
            <p className="text-3xl font-bold theme-text-primary">{stats.accuracy}%</p>
            <p className="text-sm text-green-600 dark:text-green-400">+5% esta semana</p>
          </div>
          <div className="bg-green-100/20 dark:bg-green-900/40 backdrop-blur-sm rounded-full p-3 border border-green-200/30 dark:border-green-800/30">
            <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
        </div>
      </div>

      {/* Horas de Estudo */}
      <div className="theme-card rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium theme-text-secondary">Horas de Estudo</p>
            <p className="text-3xl font-bold theme-text-primary">{stats.studyHours}h</p>
            <p className="text-sm text-blue-600 dark:text-blue-400">Meta: 30h/semana</p>
          </div>
          <div className="bg-blue-100/20 dark:bg-blue-900/40 backdrop-blur-sm rounded-full p-3 border border-blue-200/30 dark:border-blue-800/30">
            <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </div>

      {/* Conquistas */}
      <div className="theme-card rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium theme-text-secondary">Conquistas</p>
            <p className="text-3xl font-bold theme-text-primary">{stats.achievements}</p>
            <p className="text-sm text-yellow-600 dark:text-yellow-400">3 desbloqueadas hoje</p>
          </div>
          <div className="bg-yellow-100/20 dark:bg-yellow-900/40 backdrop-blur-sm rounded-full p-3 border border-yellow-200/30 dark:border-yellow-800/30">
            <Trophy className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
          </div>
        </div>
      </div>
    </div>
  );
}