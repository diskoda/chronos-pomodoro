import { useQuestionFlow } from './FlowContext';
import type { FlowStage } from './types';

// ==========================================
// COMPONENTE DE PROGRESSO DO FLUXO
// ==========================================

interface FlowProgressIndicatorProps {
  className?: string;
  showDetails?: boolean;
}

export default function FlowProgressIndicator({ 
  className = "",
  showDetails = true 
}: FlowProgressIndicatorProps) {
  const { currentStage, progress } = useQuestionFlow();

  // Dados dos estágios
  const stages = [
    {
      key: 'begin' as FlowStage,
      label: 'Introdução',
      description: 'Contexto da questão',
      icon: '🎯',
      threshold: 25
    },
    {
      key: 'question' as FlowStage,
      label: 'Resolução',
      description: 'Analisando alternativas',
      icon: '📝',
      threshold: 50
    },
    {
      key: 'explanation' as FlowStage,
      label: 'Explicação',
      description: 'Base teórica',
      icon: '🧠',
      threshold: 75
    },
    {
      key: 'analysis' as FlowStage,
      label: 'Análise',
      description: 'Feedback detalhado',
      icon: '🔍',
      threshold: 100
    }
  ];

  // Obter estágio atual
  const currentStageData = stages.find(stage => stage.key === currentStage);
  
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-blue-200 dark:border-blue-700 ${className}`}>
      {/* Header do progresso */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-lg">{currentStageData?.icon}</span>
          <div>
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              {currentStageData?.label || 'Progresso'}
            </span>
            {showDetails && currentStageData && (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {currentStageData.description}
              </p>
            )}
          </div>
        </div>
        <div className="text-right">
          <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
            {progress}%
          </span>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            completo
          </p>
        </div>
      </div>

      {/* Barra de progresso */}
      <div className="relative">
        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 mb-3">
          <div 
            className="bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 h-3 rounded-full transition-all duration-700 ease-out relative overflow-hidden" 
            style={{ width: `${progress}%` }}
          >
            {/* Efeito de brilho animado */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Indicadores dos estágios */}
      {showDetails && (
        <div className="flex justify-between relative">
          {stages.map((stage) => {
            const isCompleted = progress >= stage.threshold;
            const isCurrent = currentStage === stage.key;
            const isActive = isCompleted || isCurrent;

            return (
              <div 
                key={stage.key}
                className={`flex flex-col items-center transition-all duration-300 ${
                  isActive 
                    ? 'text-blue-600 dark:text-blue-400 scale-110' 
                    : 'text-gray-400 dark:text-gray-500'
                }`}
              >
                {/* Ícone do estágio */}
                <div className={`relative flex items-center justify-center w-8 h-8 rounded-full border-2 mb-1 transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : isCurrent
                    ? 'bg-blue-100 border-blue-600 text-blue-600 animate-pulse'
                    : 'bg-gray-100 border-gray-300 text-gray-400'
                }`}>
                  {isCompleted ? (
                    <span className="text-sm">✅</span>
                  ) : isCurrent ? (
                    <span className="text-sm animate-bounce">{stage.icon}</span>
                  ) : (
                    <span className="text-sm">⭕</span>
                  )}
                  
                  {/* Efeito de pulso para estágio atual */}
                  {isCurrent && (
                    <div className="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping opacity-75"></div>
                  )}
                </div>
                
                {/* Label do estágio */}
                <span className={`text-xs text-center font-medium transition-all duration-300 ${
                  isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500'
                }`}>
                  {stage.label}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Linha conectora entre estágios */}
      {showDetails && (
        <div className="absolute top-[72px] left-[10%] right-[10%] h-0.5 bg-gray-200 dark:bg-gray-600 -z-10">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-700 ease-out"
            style={{ width: `${Math.min(progress * 1.2, 100)}%` }}
          ></div>
        </div>
      )}
    </div>
  );
}