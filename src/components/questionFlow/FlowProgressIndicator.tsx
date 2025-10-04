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
      label: 'Inicialização',
      description: 'Neural bootstrap',
      icon: '🧠',
      color: 'from-orange-500 to-orange-600',
      glowColor: 'orange-500',
      threshold: 25
    },
    {
      key: 'question' as FlowStage,
      label: 'Processamento',
      description: 'Análise neural ativa',
      icon: '⚡',
      color: 'from-purple-500 to-purple-600',
      glowColor: 'purple-500',
      threshold: 50
    },
    {
      key: 'explanation' as FlowStage,
      label: 'Síntese',
      description: 'Compilação teórica',
      icon: '🔬',
      color: 'from-teal-500 to-teal-600',
      glowColor: 'teal-500',
      threshold: 75
    },
    {
      key: 'analysis' as FlowStage,
      label: 'Conclusão',
      description: 'Output neural final',
      icon: '🎯',
      color: 'from-pink-500 to-pink-600',
      glowColor: 'pink-500',
      threshold: 100
    }
  ];

  // Obter estágio atual
  const currentStageData = stages.find(stage => stage.key === currentStage);
  
  return (
    <div className={`relative ${className}`}>
      {/* Cyber Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/20 via-purple-900/20 to-teal-900/20 rounded-2xl blur-sm opacity-60"></div>
      
      {/* Main Container */}
      <div className="relative bg-gradient-to-r from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-lg border border-purple-500/30 rounded-2xl p-6 shadow-2xl">
        {/* Animated Border Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 via-orange-600/20 to-teal-600/20 rounded-2xl blur opacity-75 animate-pulse"></div>
        
        <div className="relative">
          {/* Neural Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              {/* Current Stage Icon */}
              <div className="relative">
                <div className={`absolute -inset-1 bg-gradient-to-r ${currentStageData?.color || 'from-purple-500 to-purple-600'} rounded-full blur opacity-60 animate-pulse`}></div>
                <div className={`relative w-12 h-12 bg-gradient-to-r ${currentStageData?.color || 'from-purple-500 to-purple-600'} rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                  {currentStageData?.icon || '🧠'}
                </div>
                {/* Pulse Ring */}
                <div className={`absolute inset-0 rounded-full border-2 border-${currentStageData?.glowColor || 'purple-500'} animate-ping opacity-60`}></div>
              </div>

              {/* Stage Info */}
              <div>
                <h3 className={`text-lg font-bold bg-gradient-to-r ${currentStageData?.color || 'from-purple-400 to-purple-600'} bg-clip-text text-transparent`}>
                  {currentStageData?.label || 'Neural Flow'}
                </h3>
                {showDetails && currentStageData && (
                  <p className="text-sm text-slate-400 font-medium">
                    {currentStageData.description}
                  </p>
                )}
              </div>
            </div>

            {/* Progress Percentage */}
            <div className="text-right">
              <div className="relative">
                <div className={`absolute -inset-1 bg-gradient-to-r ${currentStageData?.color || 'from-purple-500 to-purple-600'} rounded-lg blur opacity-40`}></div>
                <div className="relative bg-slate-800/80 border border-slate-600/40 rounded-lg px-4 py-2">
                  <span className={`text-2xl font-bold bg-gradient-to-r ${currentStageData?.color || 'from-purple-400 to-purple-600'} bg-clip-text text-transparent`}>
                    {progress}%
                  </span>
                  <p className="text-xs text-slate-400 font-medium">
                    neural sync
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Neural Progress Bar */}
          <div className="relative mb-6">
            {/* Background Track */}
            <div className="w-full bg-slate-700/60 rounded-full h-4 border border-slate-600/40 overflow-hidden">
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
              <span className="text-slate-300 font-medium">Neural Processing</span>
              <span>100%</span>
            </div>
          </div>

          {/* Neural Stage Indicators */}
          {showDetails && (
            <div className="relative">
              {/* Connection Lines */}
              <div className="absolute top-6 left-8 right-8 h-0.5 bg-slate-600/40">
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
                      <div className="relative mb-3">
                        {/* Glow Effect */}
                        {isActive && (
                          <div className={`absolute -inset-2 bg-gradient-to-r ${stage.color} rounded-full blur opacity-60 ${isCurrent ? 'animate-pulse' : ''}`}></div>
                        )}
                        
                        {/* Main Node */}
                        <div className={`relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-500 ${
                          isCompleted 
                            ? `bg-gradient-to-r ${stage.color} border-transparent text-white shadow-lg shadow-${stage.glowColor}/30`
                            : isCurrent
                            ? `bg-slate-800 border-${stage.glowColor} text-${stage.glowColor}`
                            : 'bg-slate-700/60 border-slate-600 text-slate-500'
                        }`}>
                          {isCompleted ? (
                            <span className="text-lg animate-bounce">✅</span>
                          ) : isCurrent ? (
                            <span className="text-lg animate-pulse">{stage.icon}</span>
                          ) : (
                            <span className="text-lg opacity-60">{stage.icon}</span>
                          )}
                          
                          {/* Neural Pulse Ring */}
                          {isCurrent && (
                            <div className={`absolute inset-0 rounded-full border-2 border-${stage.glowColor} animate-ping opacity-75`}></div>
                          )}
                        </div>

                        {/* Progress Indicator */}
                        {isCurrent && (
                          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                            <div className={`w-2 h-2 bg-${stage.glowColor} rounded-full animate-ping`}></div>
                          </div>
                        )}
                      </div>
                      
                      {/* Stage Label */}
                      <div className="text-center">
                        <span className={`text-sm font-bold transition-all duration-300 ${
                          isActive 
                            ? `bg-gradient-to-r ${stage.color} bg-clip-text text-transparent` 
                            : 'text-slate-500'
                        }`}>
                          {stage.label}
                        </span>
                        {showDetails && (
                          <p className={`text-xs mt-1 transition-all duration-300 ${
                            isActive ? 'text-slate-300' : 'text-slate-600'
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

          {/* Neural Activity Dots */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30">
            <div className="absolute top-4 left-8 w-1 h-1 bg-orange-400 rounded-full animate-ping"></div>
            <div className="absolute top-8 right-12 w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-6 left-1/3 w-1 h-1 bg-teal-400 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-4 right-1/4 w-1 h-1 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}