import { Link } from 'react-router-dom';
import type { Question } from '../../data/types/Question';

interface UniversalQuestionCardProps {
  question: Question;
  className?: string;
  showActions?: boolean;
  compact?: boolean;
}

export default function UniversalQuestionCard({ 
  question, 
  className = '',
  showActions = true,
  compact = false
}: UniversalQuestionCardProps) {
  
  // Modo compacto para visualização em lista
  if (compact) {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 ${className}`}>
        <div className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex-1 pr-4">
              <div className="flex items-start gap-3">
                <div className="text-sm font-bold theme-text-secondary bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded min-w-[3rem] text-center">
                  #{question.id}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold theme-text-primary mb-1 line-clamp-1">
                    {question.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-2 text-xs">
                    <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded">
                      {Array.isArray(question.category) ? question.category[0] : question.category}
                    </span>
                    <span className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-0.5 rounded">
                      {question.difficulty || 'Médio'}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">⏱️ ~5min</span>
                  </div>
                  
                  {question.statement && (
                    <p className="theme-text-secondary text-xs line-clamp-1">
                      {question.statement.length > 80 
                        ? `${question.statement.substring(0, 80)}...`
                        : question.statement
                      }
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            {showActions && (
              <div className="flex gap-1">
                <Link
                  to={`/question/dr-skoda/${question.id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-xs font-medium transition-colors"
                  title="Dr. Skoda"
                >
                  🧑‍⚕️
                </Link>
                <Link
                  to={`/question/study/${question.id}`}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded text-xs font-medium transition-colors"
                  title="Estudar"
                >
                  📚
                </Link>
                <Link
                  to={`/question/simple/${question.id}`}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1.5 rounded text-xs font-medium transition-colors"
                  title="Rápido"
                >
                  ⚡
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700 ${className}`}>
      {/* Header Compacto */}
      <div className="p-4 pb-3">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1 pr-3">
            <h3 className="text-base font-semibold theme-text-primary mb-2 line-clamp-2 leading-tight">
              {question.title}
            </h3>
            
            <div className="flex items-center gap-2 text-xs">
              <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded text-xs font-medium">
                {Array.isArray(question.category) ? question.category[0] : question.category}
              </span>
              
              <span className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded text-xs font-medium">
                {question.difficulty || 'Médio'}
              </span>
              
              <span className="text-gray-500 dark:text-gray-400 text-xs">
                ⏱️ ~5min
              </span>
            </div>
          </div>
          
          <div className="text-lg font-bold theme-text-secondary bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded">
            #{question.id}
          </div>
        </div>

        {/* Preview Compacto do Enunciado */}
        {question.statement && (
          <div className="mb-3">
            <p className="theme-text-secondary text-xs line-clamp-2 leading-relaxed">
              {question.statement.length > 120 
                ? `${question.statement.substring(0, 120)}...`
                : question.statement
              }
            </p>
          </div>
        )}
      </div>

      {/* Ações Otimizadas */}
      {showActions && (
        <div className="px-4 pb-3">
          <div className="grid grid-cols-2 gap-2 mb-3">
            {/* Botão Principal - Dr. Skoda */}
            <Link
              to={`/question/dr-skoda/${question.id}`}
              className="flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-xs font-medium transition-colors"
            >
              🧑‍⚕️ Dr. Skoda
            </Link>

            {/* Botão Estudo */}
            <Link
              to={`/question/study/${question.id}`}
              className="flex items-center justify-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-xs font-medium transition-colors"
            >
              📚 Estudar
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-1">
            {/* Botão Rápido */}
            <Link
              to={`/question/simple/${question.id}`}
              className="flex items-center justify-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 theme-text-secondary px-2 py-1.5 rounded text-xs transition-colors"
            >
              ⚡ Rápido
            </Link>

            {/* Botão Revisão */}
            <Link
              to={`/question/review/${question.id}`}
              className="flex items-center justify-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 theme-text-secondary px-2 py-1.5 rounded text-xs transition-colors"
            >
              🔄 Revisar
            </Link>

            {/* Botão Simulado */}
            <Link
              to={`/exam/question/${question.id}`}
              className="flex items-center justify-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 theme-text-secondary px-2 py-1.5 rounded text-xs transition-colors"
            >
              � Simulado
            </Link>
          </div>
        </div>
      )}

      {/* Footer Compacto */}
      <div className="px-4 pb-3 pt-1 border-t border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-center text-xs theme-text-secondary">
          <div className="flex gap-3">
            <span className="text-purple-600 dark:text-purple-400">{question.exam}</span>
          </div>
          
          <div className="flex gap-1">
            <span title="Sistema universal ativo" className="text-green-500">✅</span>
            <span title="Dr. Skoda configurado" className="text-blue-500">🧑‍⚕️</span>
            <span title="Dados carregados" className="text-gray-500">📋</span>
          </div>
        </div>
      </div>
    </div>
  );
}