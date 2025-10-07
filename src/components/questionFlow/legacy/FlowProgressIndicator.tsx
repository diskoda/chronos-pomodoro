import { useQuestionFlow } from './FlowContext';
import type { FlowStage } from './types';

// ==========================================
// NEURAL FLOW PROGRESS INDICATOR - PéNaPED
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

  // Dados dos estágios neurais
  const stages = [
    {
      key: 'begin' as FlowStage,
      label: 'Leitura',
      description: 'Análise do enunciado',
      icon: '',
      color: 'from-orange-500 to-orange-600',
      glowColor: 'orange-500',
      threshold: 25
    },
    {
      key: 'question' as FlowStage,
      label: 'Contextualização',
      description: 'Interpretação clínica',
      icon: '',
      color: 'from-purple-500 to-purple-600',
      glowColor: 'purple-500',
      threshold: 50
    },
    {
      key: 'explanation' as FlowStage,
      label: 'Análise',
      description: 'Avaliação das alternativas',
      icon: '',
      color: 'from-teal-500 to-teal-600',
      glowColor: 'teal-500',
      threshold: 75
    },
    {
      key: 'analysis' as FlowStage,
      label: 'Conclusão',
      description: 'Resultado final',
      icon: '',
      color: 'from-pink-500 to-pink-600',
      glowColor: 'pink-500',
      threshold: 100
    }
  ];

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 ${className}`}>
      {/* Main Container */}
      <div className="bg-slate-900/95 backdrop-blur-lg border-b border-slate-700/50 p-3 shadow-lg">
        {/* Neural Stage Indicators */}
        {showDetails && (
          <div className="relative max-w-4xl mx-auto">
            {/* Connection Lines */}
            <div className="absolute top-4 left-6 right-6 h-0.5 bg-slate-600/40">
              <div 
                className="h-full bg-gradient-to-r from-orange-500 via-purple-500 to-teal-500 transition-all duration-1000 ease-out"
                style={{ width: `${Math.min(progress * 1.1, 100)}%` }}
              ></div>
            </div>

            {/* Stage Nodes */}
            <div className="flex justify-between">
              {stages.map((stage) => {
                const isCompleted = progress >= stage.threshold;
                const isCurrent = currentStage === stage.key;
                const isActive = isCompleted || isCurrent;

                return (
                  <div 
                    key={stage.key}
                    className={`flex flex-col items-center transition-all duration-500 ${
                      isActive ? 'scale-110' : 'scale-100'
                    }`}
                  >
                    {/* Stage Node */}
                    <div className="relative mb-2">
                      {/* Glow Effect */}
                      {isActive && (
                        <div className={`absolute -inset-1 bg-gradient-to-r ${stage.color} rounded-full blur opacity-60 ${isCurrent ? 'animate-pulse' : ''}`}></div>
                      )}
                      
                      {/* Main Node */}
                      <div className={`relative flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-500 ${
                        isCompleted 
                          ? `bg-gradient-to-r ${stage.color} border-transparent text-white shadow-lg shadow-${stage.glowColor}/30`
                          : isCurrent
                          ? `bg-slate-800 border-${stage.glowColor} text-${stage.glowColor}`
                          : 'bg-slate-700/60 border-slate-600 text-slate-500'
                      }`}>
                        {isCompleted ? (
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        ) : isCurrent ? (
                          <div className={`w-2 h-2 bg-${stage.glowColor} rounded-full animate-pulse`}></div>
                        ) : (
                          <div className="w-2 h-2 bg-slate-500 rounded-full opacity-60"></div>
                        )}
                        
                        {/* Neural Pulse Ring */}
                        {isCurrent && (
                          <div className={`absolute inset-0 rounded-full border-2 border-${stage.glowColor} animate-ping opacity-75`}></div>
                        )}
                      </div>
                    </div>
                    
                    {/* Stage Label */}
                    <div className="text-center">
                      <span className={`text-xs font-medium transition-all duration-300 ${
                        isActive 
                          ? `bg-gradient-to-r ${stage.color} bg-clip-text text-transparent` 
                          : 'text-slate-500'
                      }`}>
                        {stage.label}
                      </span>
                      {showDetails && (
                        <p className={`text-xs mt-1 transition-all duration-300 ${
                          isActive ? 'text-slate-400' : 'text-slate-600'
                        }`}>
                          {stage.description}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}