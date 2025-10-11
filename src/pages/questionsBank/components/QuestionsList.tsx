import { CheckCircle, Clock, Play, RotateCcw, BookOpen, XCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUserQuestionAttempts } from '../../../hooks/useUserQuestionAttempts';
import type { Question } from '../../../data/types/Question';

interface QuestionsListProps {
  filteredQuestions: Question[];
}

export default function QuestionsList({ filteredQuestions }: QuestionsListProps) {
  const navigate = useNavigate();
  const { attempts, loading: attemptsLoading } = useUserQuestionAttempts();
  
  // Criar função helper para obter resumo da questão
  const getQuestionSummary = (questionId: number) => {
    const questionAttempts = attempts.filter(attempt => attempt.questionId === questionId);
    
    if (questionAttempts.length === 0) {
      return {
        hasAttempted: false,
        isCorrect: false,
        lastAttemptDate: null,
        lastAttempt: null
      };
    }

    // Pegar a tentativa mais recente
    const lastAttempt = questionAttempts[0]; // Array já vem ordenado por timestamp desc
    
    return {
      hasAttempted: true,
      isCorrect: lastAttempt.isCorrect,
      lastAttemptDate: lastAttempt.timestamp.toDate(),
      lastAttempt
    };
  };

  // Loading state
  if (attemptsLoading) {
    return (
      <div className="theme-card rounded-lg">
        <div className="p-6 border-b theme-border">
          <h3 className="font-semibold theme-text-primary">
            Questões ({filteredQuestions.length})
          </h3>
        </div>
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="theme-text-secondary">Carregando progresso...</p>
        </div>
      </div>
    );
  }

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
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">
          Questões ({questions.length})
        </h3>
      </div>

      {/* Cards Grid - Multiple columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {questions.map((question) => {
          const attemptSummary = getQuestionSummary(question.id);
          
          return (
            <div key={question.id} className="penaped-card group hover:scale-[1.02] transition-all duration-300 p-4 h-fit">
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              
              {/* Card Content */}
              <div className="relative">
                <div className="mb-3">
                  <h4 className="text-base font-bold text-white mb-2 leading-tight group-hover:text-blue-300 transition-colors line-clamp-2">
                    {question.title}
                  </h4>
                  
                  {/* Status Badge */}
                  <div className="flex items-center justify-center mb-3">
                    {attemptSummary.hasAttempted && (
                      <>
                        {attemptSummary.isCorrect ? (
                          <div className="penaped-badge-success flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-semibold w-full justify-center">
                            <CheckCircle className="h-3 w-3" />
                            <span>Correto</span>
                          </div>
                        ) : (
                          <div className="penaped-badge-error flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-semibold w-full justify-center">
                            <XCircle className="h-3 w-3" />
                            <span>Incorreto</span>
                          </div>
                        )}
                      </>
                    )}
                    
                    {!attemptSummary.hasAttempted && question.completed && (
                      <div className="penaped-badge-success flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-semibold w-full justify-center">
                        <CheckCircle className="h-3 w-3" />
                        <span>Completo</span>
                      </div>
                    )}
                    
                    {!attemptSummary.hasAttempted && !question.completed && (
                      <div className="bg-slate-600 text-slate-200 px-2 py-1 rounded-full text-xs font-semibold w-full text-center">
                        Não resolvido
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Question Meta */}
                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-center">
                    <span className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                      {getCategoryDisplay(question.category)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      question.difficulty === 'Fácil' ? 'bg-green-500 text-white' :
                      question.difficulty === 'Médio' ? 'bg-orange-500 text-white' :
                      'bg-red-500 text-white'
                    }`}>
                      {question.difficulty}
                    </span>
                    <div className="flex items-center text-slate-200 bg-slate-600 px-2 py-1 rounded-md">
                      <Clock className="h-3 w-3 mr-1" />
                      <span className="font-medium">{question.timeEstimate}min</span>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                {(question.tags || []).length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3 justify-center">
                    {(question.tags || []).slice(0, 3).map((tag, index) => (
                      <span
                        key={`${question.id}-tag-${index}`}
                        className="bg-teal-500 text-white text-xs font-medium px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {(question.tags || []).length > 3 && (
                      <span className="text-xs text-slate-200 bg-slate-600 px-2 py-1 rounded-full">+{(question.tags || []).length - 3}</span>
                    )}
                  </div>
                )}

                {/* Last Attempt Info - Compact */}
                {attemptSummary.hasAttempted && attemptSummary.lastAttemptDate && (
                  <div className="bg-slate-700/30 rounded-lg p-2 mb-3">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-3 w-3 text-slate-300 flex-shrink-0" />
                      <div className="text-xs text-slate-300">
                        <span className="font-medium">Última:</span> {formatLastAttemptDate(attemptSummary.lastAttemptDate)}
                        {attemptSummary.lastAttempt?.selectedAlternative && (
                          <div className="text-slate-400 mt-1">
                            Escolheu: <span className="font-medium text-slate-200">{attemptSummary.lastAttempt.selectedAlternative}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Legacy success rate - Compact */}
                {!attemptSummary.hasAttempted && question.completed && question.correctRate && (
                  <div className="bg-green-900/20 rounded-lg p-2 mb-3 border border-green-600/20">
                    <div className="flex items-center space-x-2 justify-center">
                      <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                      <div className="text-xs font-medium text-green-300">
                        {question.correctRate}% acerto
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Button - Full width */}
                <div className="pt-2 border-t border-slate-600">
                  {attemptSummary.hasAttempted || question.completed ? (
                    <button 
                      onClick={() => handleRedoQuestion(question.id)}
                      className="penaped-btn penaped-btn-outline group/btn text-xs px-3 py-2 w-full"
                    >
                      <RotateCcw className="h-3 w-3 group-hover/btn:rotate-180 transition-transform duration-300" />
                      <span>Tentar novamente</span>
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleSolveQuestion(question.id)}
                      className="penaped-btn penaped-btn-primary group/btn text-xs px-3 py-2 w-full"
                    >
                      <Play className="h-3 w-3 group-hover/btn:scale-110 transition-transform duration-200" />
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
        <div className="penaped-card text-center py-12">
          <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <BookOpen className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-white mb-3">
            Nenhuma questão encontrada
          </h3>
          <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
            Tente ajustar os filtros para encontrar questões relevantes.
          </p>
        </div>
      )}
    </div>
  );
}