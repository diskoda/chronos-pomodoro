import { CheckCircle, Clock, Play, RotateCcw, BookOpen, XCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useQuestionAttempts } from '../../hooks/useQuestionAttempts';
import type { Question } from '../../data/types/Question';

interface QuestionsListProps {
  filteredQuestions: Question[];
  getDifficultyColor: (difficulty: string) => string;
}

export default function QuestionsList({ filteredQuestions, getDifficultyColor }: QuestionsListProps) {
  const navigate = useNavigate();
  const { getQuestionSummary } = useQuestionAttempts();

  // Garantir que filteredQuestions é sempre um array
  const questions = filteredQuestions || [];

  const handleSolveQuestion = (questionId: number) => {
    navigate(`/question/${questionId}`);
  };

  const handleRedoQuestion = (questionId: number) => {
    navigate(`/question/${questionId}`);
  };

  const getCategoryDisplay = (category: string | string[]) => {
    if (Array.isArray(category)) {
      return category.join(' • ');
    }
    return category;
  };

  // Formatar data da última tentativa
  const formatLastAttemptDate = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} min atrás`;
    } else if (diffInMinutes < 1440) { // 24 horas
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours}h atrás`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days}d atrás`;
    }
  };

  return (
    <div className="theme-card rounded-lg">
      <div className="p-6 border-b theme-border">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold theme-text-primary">
            Questões ({questions.length})
          </h3>
        </div>
      </div>

      <div className="divide-y theme-border">
        {questions.map((question) => {
          const attemptSummary = getQuestionSummary(question.id);
          
          return (
            <div key={question.id} className="p-6 hover:theme-bg-secondary transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-lg font-medium theme-text-primary">
                      {question.title}
                    </h4>
                    
                    {/* Status da tentativa */}
                    {attemptSummary.hasAttempted && (
                      <div className="flex items-center space-x-2">
                        {attemptSummary.isCorrect ? (
                          <div className="flex items-center space-x-1 text-green-500 dark:text-green-400">
                            <CheckCircle className="h-5 w-5" />
                            <span className="text-xs font-medium">Acertou</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-1 text-red-500 dark:text-red-400">
                            <XCircle className="h-5 w-5" />
                            <span className="text-xs font-medium">Errou</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Compatibilidade com sistema antigo */}
                    {!attemptSummary.hasAttempted && question.completed && (
                      <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
                    )}
                  </div>

                  <div className="flex items-center space-x-4 mb-3">
                    <span className="text-sm theme-text-secondary">{getCategoryDisplay(question.category)}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(question.difficulty)}`}>
                      {question.difficulty}
                    </span>
                    <div className="flex items-center text-sm theme-text-tertiary">
                      <Clock className="h-4 w-4 mr-1" />
                      {question.timeEstimate} min
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mb-3">
                    {(question.tags || []).map((tag, index) => (
                      <span
                        key={`${question.id}-tag-${index}`}
                        className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-2 py-1 rounded font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Informações da última tentativa */}
                  {attemptSummary.hasAttempted && attemptSummary.lastAttemptDate && (
                    <div className="text-sm theme-text-tertiary mb-2">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="h-4 w-4" />
                        <span>
                          Última tentativa: {formatLastAttemptDate(attemptSummary.lastAttemptDate)}
                          {attemptSummary.lastAttempt?.selectedAlternative && (
                            <span className="ml-2">
                              (Escolheu: {attemptSummary.lastAttempt.selectedAlternative})
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Sistema antigo de taxa de acerto */}
                  {!attemptSummary.hasAttempted && question.completed && (
                    <div className="text-sm text-green-600 dark:text-green-400">
                      Taxa de acerto: {question.correctRate}%
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  {attemptSummary.hasAttempted || question.completed ? (
                    <button 
                      onClick={() => handleRedoQuestion(question.id)}
                      className="flex items-center space-x-2 theme-bg-secondary theme-text-primary px-4 py-2 rounded-lg font-medium hover:theme-bg-tertiary transition-colors"
                    >
                      <RotateCcw className="h-4 w-4" />
                      <span>Tentar novamente</span>
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleSolveQuestion(question.id)}
                      className="flex items-center space-x-2 theme-button-primary px-4 py-2 rounded-lg font-medium"
                    >
                      <Play className="h-4 w-4" />
                      <span>Resolver</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {questions.length === 0 && (
        <div className="p-12 text-center">
          <BookOpen className="h-12 w-12 theme-text-tertiary mx-auto mb-4" />
          <h3 className="text-lg font-medium theme-text-primary mb-2">
            Nenhuma questão encontrada
          </h3>
          <p className="theme-text-secondary">
            Tente ajustar os filtros para encontrar questões relevantes.
          </p>
        </div>
      )}
    </div>
  );
}