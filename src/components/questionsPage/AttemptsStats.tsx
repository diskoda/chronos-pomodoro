import { useUserProgressStats } from '../../hooks/useUserQuestionAttempts';
import { CheckCircle, XCircle, Clock, TrendingUp } from 'lucide-react';

// ==========================================
// COMPONENTE DE ESTATÍSTICAS DAS TENTATIVAS (FIREBASE)
// ==========================================

export default function AttemptsStats() {
  const { stats, loading, error, isAuthenticated } = useUserProgressStats();
  
  // Se não estiver autenticado, não mostrar estatísticas
  if (!isAuthenticated) {
    return (
      <div className="theme-card rounded-lg p-6 mb-6">
        <div className="text-center">
          <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
            <TrendingUp className="h-6 w-6 theme-text-tertiary" />
          </div>
          <h3 className="text-lg font-semibold theme-text-primary mb-2">
            Estatísticas de Progresso
          </h3>
          <p className="theme-text-secondary text-sm">
            Faça login para ver suas estatísticas detalhadas de progresso
          </p>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="theme-card rounded-lg p-6 mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <TrendingUp className="h-5 w-5 theme-text-primary" />
          <h3 className="text-lg font-semibold theme-text-primary">
            Suas Estatísticas
          </h3>
        </div>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="theme-text-secondary">Carregando estatísticas...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="theme-card rounded-lg p-6 mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <TrendingUp className="h-5 w-5 theme-text-primary" />
          <h3 className="text-lg font-semibold theme-text-primary">
            Suas Estatísticas
          </h3>
        </div>
        <div className="text-center py-8">
          <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="theme-text-secondary">Erro ao carregar estatísticas</p>
          <p className="text-sm theme-text-tertiary mt-1">{error}</p>
        </div>
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${Math.round(seconds)}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${Math.round(remainingSeconds)}s`;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="theme-card rounded-lg p-6 mb-6">
      <div className="flex items-center space-x-3 mb-6">
        <TrendingUp className="h-5 w-5 theme-text-primary" />
        <h3 className="text-lg font-semibold theme-text-primary">
          Suas Estatísticas
        </h3>
      </div>

      {/* Grid de estatísticas principais */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Total de questões tentadas */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                Tentadas
              </p>
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                {stats.totalQuestionsAttempted}
              </p>
            </div>
            <Clock className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        {/* Total de questões corretas */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-700 dark:text-green-300">
                Corretas
              </p>
              <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                {stats.totalQuestionsCorrect}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>

        {/* Taxa de sucesso */}
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-700 dark:text-purple-300">
                Taxa de Sucesso
              </p>
              <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                {Math.round(stats.averageSuccessRate)}%
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        {/* Streak atual */}
        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-700 dark:text-orange-300">
                Sequência
              </p>
              <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                {stats.streakCurrent}
              </p>
            </div>
            <span className="text-2xl">🔥</span>
          </div>
        </div>
      </div>

      {/* Tempo total estudado */}
      {stats.totalTimeSpent > 0 && (
        <div className="mb-6">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium theme-text-secondary mb-1">
                  Tempo Total de Estudo
                </p>
                <p className="text-xl font-bold theme-text-primary">
                  {formatTime(stats.totalTimeSpent)}
                </p>
              </div>
              <Clock className="h-6 w-6 theme-text-tertiary" />
            </div>
          </div>
        </div>
      )}

      {/* Atividade recente */}
      {stats.recentActivity.length > 0 && (
        <div>
          <h4 className="font-medium theme-text-primary mb-3">Atividade Recente</h4>
          <div className="space-y-2">
            {stats.recentActivity.slice(0, 5).map((attempt) => (
              <div
                key={`${attempt.questionId}-${attempt.timestamp.toMillis()}`}
                className="flex items-center justify-between py-2 px-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  {attempt.isCorrect ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                  <div>
                    <p className="text-sm font-medium theme-text-primary">
                      Questão {attempt.questionId}
                    </p>
                    {attempt.selectedAlternative && (
                      <p className="text-xs theme-text-tertiary">
                        Escolheu: {attempt.selectedAlternative}
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs theme-text-tertiary">
                    {formatDate(attempt.timestamp.toDate())}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Estado vazio */}
      {stats.totalQuestionsAttempted === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="h-8 w-8 theme-text-tertiary" />
          </div>
          <h4 className="text-lg font-medium theme-text-primary mb-2">
            Comece a Estudar!
          </h4>
          <p className="theme-text-secondary">
            Resolva questões para ver suas estatísticas de progresso aqui.
          </p>
        </div>
      )}
    </div>
  );
}