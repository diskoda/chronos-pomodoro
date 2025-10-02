import { useQuestionAttempts } from '../../hooks/useQuestionAttempts';
import { CheckCircle, XCircle, Clock, TrendingUp } from 'lucide-react';

// ==========================================
// COMPONENTE DE ESTATÍSTICAS DAS TENTATIVAS
// ==========================================

export default function AttemptsStats() {
  const { attempts } = useQuestionAttempts();
  
  // Calcular estatísticas
  const totalAttempts = Object.keys(attempts).length;
  const correctAttempts = Object.values(attempts).filter(attempt => attempt.isCorrect).length;
  const incorrectAttempts = totalAttempts - correctAttempts;
  const successRate = totalAttempts > 0 ? Math.round((correctAttempts / totalAttempts) * 100) : 0;
  
  // Últimas tentativas (últimas 5)
  const recentAttempts = Object.values(attempts)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 5);

  if (totalAttempts === 0) {
    return (
      <div className="theme-card rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold theme-text-primary mb-2">
          📊 Suas Estatísticas
        </h3>
        <p className="theme-text-secondary">
          Ainda não há tentativas registradas. Resolva algumas questões para ver suas estatísticas!
        </p>
      </div>
    );
  }

  return (
    <div className="theme-card rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold theme-text-primary mb-4 flex items-center">
        <TrendingUp className="h-5 w-5 mr-2" />
        Suas Estatísticas
      </h3>
      
      {/* Grid de estatísticas principais */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {totalAttempts}
          </div>
          <div className="text-sm text-blue-700 dark:text-blue-300 font-medium">
            Total de Tentativas
          </div>
        </div>
        
        <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400 flex items-center justify-center">
            <CheckCircle className="h-6 w-6 mr-1" />
            {correctAttempts}
          </div>
          <div className="text-sm text-green-700 dark:text-green-300 font-medium">
            Acertos
          </div>
        </div>
        
        <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-700">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400 flex items-center justify-center">
            <XCircle className="h-6 w-6 mr-1" />
            {incorrectAttempts}
          </div>
          <div className="text-sm text-red-700 dark:text-red-300 font-medium">
            Erros
          </div>
        </div>
        
        <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-700">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {successRate}%
          </div>
          <div className="text-sm text-purple-700 dark:text-purple-300 font-medium">
            Taxa de Acerto
          </div>
        </div>
      </div>

      {/* Últimas tentativas */}
      {recentAttempts.length > 0 && (
        <div>
          <h4 className="text-md font-medium theme-text-primary mb-3 flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            Últimas Tentativas
          </h4>
          <div className="space-y-2">
            {recentAttempts.map((attempt) => (
              <div 
                key={`${attempt.questionId}-${attempt.timestamp}`}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  {attempt.isCorrect ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                  <span className="text-sm font-medium theme-text-primary">
                    Questão {attempt.questionId}
                  </span>
                  {attempt.selectedAlternative && (
                    <span className="text-xs theme-text-tertiary bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">
                      Escolheu: {attempt.selectedAlternative}
                    </span>
                  )}
                </div>
                <div className="text-xs theme-text-tertiary">
                  {new Date(attempt.timestamp).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}