import { useState, useEffect } from 'react';
import { BookOpen, Target, TrendingUp, Clock, CheckCircle, XCircle, BarChart3 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface QuestionBankProgress {
  totalQuestions: number;
  answeredQuestions: number;
  correctAnswers: number;
  accuracy: number;
  totalStudyTime: number; // em minutos
  averageTimePerQuestion: number; // em segundos
  streakDays: number;
  lastStudyDate: Date | null;
  specialtyProgress: {
    specialty: string;
    total: number;
    answered: number;
    correct: number;
    accuracy: number;
  }[];
}

export default function QuestionBankProgress() {
  const { currentUser } = useAuth();
  const [progress, setProgress] = useState<QuestionBankProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProgress = async () => {
      if (!currentUser) return;
      
      try {
        // TODO: Implementar busca real do progresso do usuário
        // Por agora, usando dados mockados baseados no banco de questões USP
        const mockProgress: QuestionBankProgress = {
          totalQuestions: 120, // Total de questões USP-2025 Especialidades Pediátricas
          answeredQuestions: 35,
          correctAnswers: 28,
          accuracy: 80,
          totalStudyTime: 180, // 3 horas
          averageTimePerQuestion: 95, // 1 min 35s
          streakDays: 5,
          lastStudyDate: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2h atrás
          specialtyProgress: [
            {
              specialty: 'Imunizações',
              total: 8,
              answered: 6,
              correct: 5,
              accuracy: 83
            },
            {
              specialty: 'Infectologia',
              total: 12,
              answered: 8,
              correct: 6,
              accuracy: 75
            },
            {
              specialty: 'Nefrologia',
              total: 10,
              answered: 5,
              correct: 4,
              accuracy: 80
            },
            {
              specialty: 'Pneumologia',
              total: 8,
              answered: 4,
              correct: 3,
              accuracy: 75
            },
            {
              specialty: 'Cardiologia',
              total: 6,
              answered: 3,
              correct: 3,
              accuracy: 100
            },
            {
              specialty: 'Neurologia',
              total: 8,
              answered: 2,
              correct: 2,
              accuracy: 100
            },
            {
              specialty: 'Endocrinologia',
              total: 7,
              answered: 2,
              correct: 1,
              accuracy: 50
            },
            {
              specialty: 'Desenvolvimento',
              total: 9,
              answered: 3,
              correct: 2,
              accuracy: 67
            },
            {
              specialty: 'Dermatologia',
              total: 6,
              answered: 2,
              correct: 2,
              accuracy: 100
            }
          ]
        };

        setProgress(mockProgress);
      } catch (error) {
        console.error('Erro ao carregar progresso:', error);
        setProgress(null);
      } finally {
        setLoading(false);
      }
    };

    loadProgress();
  }, [currentUser]);

  const formatStudyTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return hours > 0 ? `${hours}h ${remainingMinutes}m` : `${remainingMinutes}m`;
  };

  const formatAverageTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return minutes > 0 ? `${minutes}m ${remainingSeconds}s` : `${remainingSeconds}s`;
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 80) return 'text-green-600 bg-green-100 dark:bg-green-900/30';
    if (accuracy >= 60) return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
    return 'text-red-600 bg-red-100 dark:bg-red-900/30';
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="theme-card rounded-lg p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Chart */}
        <div className="theme-card rounded-lg p-6">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mb-4"></div>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!progress) {
    return (
      <div className="theme-card rounded-lg p-8 text-center">
        <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="theme-text-secondary">Erro ao carregar progresso</p>
        <p className="text-sm theme-text-tertiary">Tente recarregar a página</p>
      </div>
    );
  }

  const completionPercentage = Math.round((progress.answeredQuestions / progress.totalQuestions) * 100);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Progress */}
        <div className="theme-card rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm theme-text-secondary">Progresso Geral</p>
              <p className="text-2xl font-bold theme-text-primary">
                {progress.answeredQuestions}/{progress.totalQuestions}
              </p>
              <p className="text-sm theme-text-tertiary">{completionPercentage}% completo</p>
            </div>
            <BookOpen className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        {/* Accuracy */}
        <div className="theme-card rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm theme-text-secondary">Precisão</p>
              <p className="text-2xl font-bold theme-text-primary">
                {progress.accuracy}%
              </p>
              <p className="text-sm theme-text-tertiary">
                {progress.correctAnswers}/{progress.answeredQuestions} corretas
              </p>
            </div>
            <Target className="h-8 w-8 text-green-500" />
          </div>
        </div>

        {/* Study Time */}
        <div className="theme-card rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm theme-text-secondary">Tempo de Estudo</p>
              <p className="text-2xl font-bold theme-text-primary">
                {formatStudyTime(progress.totalStudyTime)}
              </p>
              <p className="text-sm theme-text-tertiary">
                Média: {formatAverageTime(progress.averageTimePerQuestion)}
              </p>
            </div>
            <Clock className="h-8 w-8 text-purple-500" />
          </div>
        </div>

        {/* Streak */}
        <div className="theme-card rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm theme-text-secondary">Sequência</p>
              <p className="text-2xl font-bold theme-text-primary">
                {progress.streakDays}
              </p>
              <p className="text-sm theme-text-tertiary">dias seguidos</p>
            </div>
            <TrendingUp className="h-8 w-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Overall Progress Bar */}
      <div className="theme-card rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold theme-text-primary">Progresso no Banco de Questões</h3>
          <span className="text-sm theme-text-secondary">{completionPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
          <div 
            className="bg-blue-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-sm theme-text-tertiary">
          <span>{progress.answeredQuestions} questões respondidas</span>
          <span>{progress.totalQuestions - progress.answeredQuestions} restantes</span>
        </div>
      </div>

      {/* Specialty Progress */}
      <div className="theme-card rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold theme-text-primary flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-blue-500" />
            Progresso por Especialidade
          </h3>
        </div>
        
        <div className="space-y-4">
          {progress.specialtyProgress
            .sort((a, b) => (b.answered / b.total) - (a.answered / a.total))
            .map((specialty) => {
              const progressPercentage = Math.round((specialty.answered / specialty.total) * 100);
              
              return (
                <div key={specialty.specialty} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium theme-text-primary">
                        {specialty.specialty}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getAccuracyColor(specialty.accuracy)}`}>
                        {specialty.accuracy}%
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm theme-text-secondary">
                      <span>{specialty.answered}/{specialty.total}</span>
                      <span className="text-xs theme-text-tertiary">({progressPercentage}%)</span>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs theme-text-tertiary">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center">
                        <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                        {specialty.correct} corretas
                      </span>
                      {specialty.answered > specialty.correct && (
                        <span className="flex items-center">
                          <XCircle className="h-3 w-3 text-red-500 mr-1" />
                          {specialty.answered - specialty.correct} incorretas
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button className="theme-bg-primary text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity">
          Continuar Estudando
        </button>
        <button className="theme-bg-secondary theme-text-primary py-3 px-6 rounded-lg font-medium hover:theme-bg-tertiary transition-colors">
          Revisar Erros
        </button>
      </div>
    </div>
  );
}