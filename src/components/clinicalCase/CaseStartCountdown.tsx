import { useState, useEffect } from 'react';
import { Play } from 'lucide-react';

interface CaseStartCountdownProps {
  caseTitle: string;
  onComplete: () => void;
}

export function CaseStartCountdown({ caseTitle, onComplete }: CaseStartCountdownProps) {
  const [countdown, setCountdown] = useState(3);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsVisible(false);
          setTimeout(onComplete, 500);
          return 0;
        }
        return prev - 1;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xl transition-all duration-500 ${
      isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
    }`}
    style={{
      background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)'
    }}>
      <div className="text-center max-w-md mx-auto px-6 relative z-10">
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 bg-blue-400 rounded-full opacity-40 animate-pulse"
              style={{
                left: `${25 + (i * 8)}%`,
                top: `${35 + (i % 2) * 30}%`,
                animationDelay: `${i * 0.4}s`,
                animationDuration: `${2 + (i % 2)}s`
              }}
            />
          ))}
        </div>

        {/* Case Icon */}
        <div className="mb-6 animate-bounce">
          <div className="w-24 h-24 mx-auto bg-blue-500/20 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-2xl border border-blue-400/40">
            <Play className="w-12 h-12 text-blue-400" />
          </div>
        </div>
        
        {/* Title */}
        <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
          Iniciando Caso
        </h1>
        
        <h2 className="text-xl font-semibold text-blue-200 mb-6">
          {caseTitle}
        </h2>
        
        {/* Progress */}
        <div className="mb-6">
          <div className="w-40 h-1 bg-white/30 rounded-full mx-auto">
            <div 
              className="h-1 bg-blue-400 rounded-full transition-all duration-800 ease-out"
              style={{ width: `${((3 - countdown) / 3) * 100}%` }}
            />
          </div>
        </div>
        
        {/* Countdown */}
        <div className="text-6xl font-bold text-blue-400 mb-3 animate-pulse">
          {countdown}
        </div>
        
        {/* Status */}
        <p className="text-blue-200 text-sm font-medium">
          {countdown > 1 ? 'Preparando...' : 'Vamos começar!'}
        </p>
      </div>
    </div>
  );
}