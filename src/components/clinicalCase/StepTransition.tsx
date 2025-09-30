import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

interface StepTransitionProps {
  fromStep: string;
  toStep: string;
  onComplete: () => void;
}

const steps = [
  { id: 'presentation', title: 'Apresentação do Caso', description: 'Leitura e compreensão do cenário clínico', icon: '📋' },
  { id: 'diagnosis', title: 'Diagnóstico de Conhecimento', description: 'Avaliação inicial do seu conhecimento', icon: '🧠' },
  { id: 'questions', title: 'Questões de Aprendizagem', description: 'Identificação de lacunas de aprendizado', icon: '❓' },
  { id: 'study', title: 'Estudo Ativo', description: 'Material didático direcionado', icon: '📚' },
  { id: 'conclusion', title: 'Conclusão do Caso', description: 'Síntese e avaliação final', icon: '🎯' }
];

export function StepTransition({ fromStep, toStep, onComplete }: StepTransitionProps) {
  const [countdown, setCountdown] = useState(2);
  const [isVisible, setIsVisible] = useState(true);

  const getStepInfo = (stepId: string) => {
    const step = steps.find(s => s.id === stepId);
    return step || { title: 'Próxima Etapa', description: 'Avançando...', icon: '⭐' };
  };

  const getStepColor = (stepId: string) => {
    switch(stepId) {
      case 'presentation': return 'from-blue-500 to-cyan-500';
      case 'diagnosis': return 'from-purple-500 to-indigo-500';
      case 'questions': return 'from-red-500 to-pink-500';
      case 'study': return 'from-green-500 to-emerald-500';
      case 'conclusion': return 'from-yellow-500 to-orange-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const fromStepInfo = getStepInfo(fromStep);
  const toStepInfo = getStepInfo(toStep);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsVisible(false);
          setTimeout(onComplete, 400);
          return 0;
        }
        return prev - 1;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md transition-all duration-400 ${
      isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
    }`} 
    style={{
      background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)'
    }}>
      <div className="absolute inset-0 bg-gray-900/90 backdrop-blur-sm"></div>
      <div className="text-center max-w-lg mx-auto px-6 relative z-10">
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-60 animate-pulse"
              style={{
                left: `${20 + (i * 10)}%`,
                top: `${30 + (i % 3) * 20}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${1.5 + (i % 2)}s`
              }}
            />
          ))}
        </div>

        {/* Step Flow */}
        <div className="mb-6 flex items-center justify-center space-x-6">
          {/* From Step */}
          <div className="flex flex-col items-center opacity-70 transform scale-90">
            <div className={`w-14 h-14 bg-gradient-to-br ${getStepColor(fromStep)} rounded-2xl flex items-center justify-center shadow-lg border border-white/20 backdrop-blur-sm`}>
              <span className="text-2xl">{fromStepInfo.icon}</span>
            </div>
            <p className="text-white text-xs mt-2 font-medium">{fromStepInfo.title}</p>
          </div>

          {/* Arrow */}
          <div className="flex items-center space-x-1 animate-pulse">
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <ArrowRight className="w-6 h-6 text-white mx-1" />
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>

          {/* To Step */}
          <div className="flex flex-col items-center animate-bounce">
            <div className={`w-16 h-16 bg-gradient-to-br ${getStepColor(toStep)} rounded-2xl flex items-center justify-center shadow-2xl border-2 border-white/40 backdrop-blur-sm`}>
              <span className="text-3xl">{toStepInfo.icon}</span>
            </div>
            <p className="text-white text-sm mt-2 font-bold">{toStepInfo.title}</p>
          </div>
        </div>
        
        {/* Progress */}
        <div className="mb-4">
          <div className="w-32 h-1 bg-white/20 rounded-full mx-auto">
            <div 
              className="h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-800 ease-out"
              style={{ width: `${((2 - countdown) / 2) * 100}%` }}
            />
          </div>
        </div>
        
        {/* Countdown */}
        <div className="text-5xl font-bold text-white mb-3 animate-pulse">
          {countdown}
        </div>
        
        {/* Status */}
        <p className="text-white/80 text-sm font-medium">
          {countdown > 1 ? 'Preparando...' : 'Iniciando!'}
        </p>
      </div>
    </div>
  );
}