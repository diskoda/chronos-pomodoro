import { useEffect, useState } from 'react';
import { Star, TrendingUp, Award } from 'lucide-react';

interface XPNotificationProps {
  xpGained: number;
  isCorrect: boolean;
  leveledUp?: boolean;
  newLevel?: number;
  onClose: () => void;
  duration?: number;
}

export default function XPNotification({
  xpGained,
  isCorrect,
  leveledUp,
  newLevel,
  onClose,
  duration = 4000
}: XPNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    console.log('🎊 XPNotification montado:', {
      xpGained,
      isCorrect,
      leveledUp,
      newLevel,
      duration
    });
    
    // Animação de entrada
    setTimeout(() => setIsVisible(true), 100);
    
    // Auto fechar
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration, xpGained, isCorrect, leveledUp, newLevel]);

  const getXPColor = () => {
    if (leveledUp) return 'from-purple-500 to-pink-500';
    if (isCorrect) return 'from-green-500 to-emerald-500';
    return 'from-blue-500 to-indigo-500';
  };

  const getXPIcon = () => {
    if (leveledUp) return Award;
    if (isCorrect) return Star;
    return TrendingUp;
  };

  const Icon = getXPIcon();

  return (
    <div className={`fixed top-4 right-4 z-50 transition-all duration-300 transform ${
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <div className={`bg-gradient-to-r ${getXPColor()} text-white p-4 rounded-lg shadow-lg max-w-sm`}>
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <Icon className="w-8 h-8" />
          </div>
          
          <div className="flex-1">
            {leveledUp ? (
              <div>
                <h3 className="font-bold text-lg">🎉 Level Up!</h3>
                <p className="text-sm opacity-90">Você alcançou o nível {newLevel}!</p>
                <p className="text-xs opacity-75">+{xpGained} XP</p>
              </div>
            ) : (
              <div>
                <h3 className="font-semibold">
                  {isCorrect ? '✅ Resposta Correta!' : '📝 Tentativa Válida!'}
                </h3>
                <p className="text-sm opacity-90">+{xpGained} XP ganho</p>
                {isCorrect && (
                  <p className="text-xs opacity-75">Continue assim! 🚀</p>
                )}
              </div>
            )}
          </div>
          
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 300);
            }}
            className="text-white/70 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
        
        {/* Barra de progresso animada */}
        <div className="mt-3 bg-white/20 rounded-full h-1 overflow-hidden">
          <div 
            className={`bg-white h-full rounded-full transition-all duration-${duration} ease-out ${
              isVisible ? 'w-0' : 'w-full'
            }`}
          />
        </div>
      </div>
    </div>
  );
}

// Componente para mostrar XP atual do usuário
interface XPDisplayProps {
  currentXP: number;
  xpToNextLevel: number;
  level: number;
  title?: string;
  methodology?: string;
  compact?: boolean;
}

export function XPDisplay({
  currentXP,
  xpToNextLevel,
  level,
  title,
  methodology = 'Geral',
  compact = false
}: XPDisplayProps) {
  const progressPercentage = Math.min((currentXP / xpToNextLevel) * 100, 100);

  if (compact) {
    return (
      <div className="flex items-center space-x-2 text-sm">
        <span className="font-medium text-blue-600 dark:text-blue-400">
          Nível {level}
        </span>
        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 min-w-[80px]">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <span className="text-xs text-gray-600 dark:text-gray-400">
          {currentXP}/{xpToNextLevel}
        </span>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
            {level}
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">
              {methodology} - Nível {level}
            </h3>
            {title && (
              <p className="text-xs text-gray-600 dark:text-gray-400">{title}</p>
            )}
          </div>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {currentXP}/{xpToNextLevel} XP
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Progresso atual</span>
          <span>{Math.round(progressPercentage)}% para o próximo nível</span>
        </div>
      </div>
    </div>
  );
}