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
    <div className={`relative ${className}`}>
      {/* Cyber Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/20 via-purple-900/20 to-teal-900/20 rounded-xl blur-sm opacity-60"></div>
      
      {/* Main Container */}
      <div className="relative bg-gradient-to-r from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-lg border border-purple-500/30 rounded-xl p-4 shadow-xl">
        {/* Animated Border Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 via-orange-600/20 to-teal-600/20 rounded-xl blur opacity-75 animate-pulse"></div>
        
        <div className="relative">
          {/* Neural Progress Bar */}
          <div className="relative mb-4">
            {/* Background Track */}
            <div className="w-full bg-slate-700/60 rounded-full h-3 border border-slate-600/40 overflow-hidden">
              {/* Progress Fill */}
              <div 
                className="h-full bg-gradient-to-r from-orange-500 via-purple-500 via-teal-500 to-pink-500 transition-all duration-1000 ease-out relative overflow-hidden" 
                style={{ width: `${progress}%` }}
              >
                {/* Animated Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/60 to-white/30 transform -skew-x-12 animate-pulse"></div>
                
                {/* Neural Pulse */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform translate-x-[-100%] animate-slide"></div>
              </div>
            </div>

            {/* Progress Labels */}
            <div className="flex justify-between mt-2 text-xs text-slate-400">
              <span>0%</span>
              <span className="text-slate-300 font-medium">Progresso da Questão</span>
              <span>100%</span>
            </div>
          </div>

          {/* Neural Stage Indicators */}
          {showDetails && (
            <div className="relative">
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
    </div>
  );
}