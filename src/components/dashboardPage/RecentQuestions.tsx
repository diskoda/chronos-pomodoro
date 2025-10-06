import { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, HelpCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface RecentQuestion {
  id: number;
  title: string;
  specialty: string;
  isCorrect: boolean;
  timeSpent: number; // em segundos
  completedAt: Date;
  difficulty: 'easy' | 'medium' | 'hard';
}

export default function RecentQuestions() {
  const { currentUser } = useAuth();
  const [recentQuestions, setRecentQuestions] = useState<RecentQuestion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecentQuestions = async () => {
      if (!currentUser) return;
      
      try {
        // TODO: Implementar busca real das últimas questões do usuário
        // Por agora, usando dados mockados
        const mockQuestions: RecentQuestion[] = [
          {
            id: 17,
            title: "Vacina pneumocócica em grupos de risco",
            specialty: "Imunizações",
            isCorrect: true,
            timeSpent: 120,
            completedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2h atrás
            difficulty: 'medium'
          },
          {
            id: 25,
            title: "ITU em lactente - métodos de coleta",
            specialty: "Nefrologia",
            isCorrect: false,
            timeSpent: 180,
            completedAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4h atrás
            difficulty: 'medium'
          },
          {
            id: 33,
            title: "Epiglotite aguda - emergência respiratória",
            specialty: "Infectologia",
            isCorrect: true,
            timeSpent: 95,
            completedAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6h atrás
            difficulty: 'hard'
          },
          {
            id: 29,
            title: "Varicela - diagnóstico e isolamento",
            specialty: "Dermatologia",
            isCorrect: true,
            timeSpent: 75,
            completedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 dia atrás
            difficulty: 'medium'
          },
          {
            id: 18,
            title: "Marcos do desenvolvimento neuromotor",
            specialty: "Desenvolvimento",
            isCorrect: false,
            timeSpent: 150,
            completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 dias atrás
            difficulty: 'easy'
          }
        ];

        setRecentQuestions(mockQuestions);
      } catch (error) {
        console.error('Erro ao carregar questões recentes:', error);
        setRecentQuestions([]);
      } finally {
        setLoading(false);
      }
    };

    loadRecentQuestions();
  }, [currentUser]);

  const formatTimeSpent = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return minutes > 0 ? `${minutes}m ${remainingSeconds}s` : `${remainingSeconds}s`;
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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'hard':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'Fácil';
      case 'medium':
        return 'Médio';
      case 'hard':
        return 'Difícil';
      default:
        return 'N/A';
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
                <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
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
            <HelpCircle className="h-5 w-5 mr-2 text-blue-500" />
            Últimas Questões
          </h3>
          <span className="text-sm theme-text-secondary">
            {recentQuestions.length} questões
          </span>
        </div>
      </div>
      
      <div className="p-6">
        {recentQuestions.length === 0 ? (
          <div className="text-center py-8">
            <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="theme-text-secondary">Nenhuma questão realizada ainda</p>
            <p className="text-sm theme-text-tertiary">Comece a estudar para ver seu histórico aqui!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentQuestions.map((question) => (
              <div
                key={question.id}
                className="flex items-start space-x-4 p-4 rounded-lg theme-bg-secondary hover:theme-bg-tertiary transition-colors cursor-pointer"
              >
                {/* Status Icon */}
                <div className="flex-shrink-0 mt-1">
                  {question.isCorrect ? (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  ) : (
                    <XCircle className="h-6 w-6 text-red-500" />
                  )}
                </div>

                {/* Question Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium theme-text-primary truncate">
                        {question.title}
                      </h4>
                      <div className="flex items-center space-x-3 mt-1">
                        <span className="text-xs theme-text-secondary">
                          {question.specialty}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(question.difficulty)}`}>
                          {getDifficultyLabel(question.difficulty)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-xs theme-text-tertiary">
                        #{question.id}
                      </p>
                    </div>
                  </div>

                  {/* Time and Date */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-2 text-xs theme-text-tertiary">
                      <Clock className="h-3 w-3" />
                      <span>{formatTimeSpent(question.timeSpent)}</span>
                    </div>
                    <span className="text-xs theme-text-tertiary">
                      {formatTimeAgo(question.completedAt)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Action Button */}
        {recentQuestions.length > 0 && (
          <div className="mt-6 pt-4 border-t theme-border">
            <button className="w-full theme-bg-secondary theme-text-primary py-2 px-4 rounded-lg font-medium hover:theme-bg-tertiary transition-colors text-sm">
              Ver Todas as Questões
            </button>
          </div>
        )}
      </div>
    </div>
  );
}