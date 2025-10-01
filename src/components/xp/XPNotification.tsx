import { useState, useEffect } from 'react';
import { Star, Trophy, Zap, X } from 'lucide-react';
import type { ActivityType } from '../../types/xp';

interface XPNotificationProps {
  show: boolean;
  onClose: () => void;
  xpGained: number;
  activityType: ActivityType;
  description: string;
  leveledUp?: boolean;
  newLevel?: number;
  achievementUnlocked?: string;
}

export default function XPNotification({
  show,
  onClose,
  xpGained,
  activityType,
  description,
  leveledUp,
  newLevel,
  achievementUnlocked
}: XPNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      // Auto close after 5 seconds
      const timer = setTimeout(() => {
        handleClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for animation
  };

  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case 'question_correct':
        return <Zap className="w-5 h-5 text-green-500" />;
      case 'quiz_completed':
        return <Trophy className="w-5 h-5 text-blue-500" />;
      case 'streak_milestone':
        return <span className="text-lg">🔥</span>;
      case 'achievement_unlocked':
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      default:
        return <Star className="w-5 h-5 text-purple-500" />;
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-20" 
        onClick={handleClose}
      />
      
      {/* Notification */}
      <div className={`
        relative bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 
        max-w-md w-full transform transition-all duration-300 ease-out
        ${isVisible ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-10 opacity-0 scale-95'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            {getActivityIcon(activityType)}
            <div>
              <h3 className="font-semibold theme-text-primary">
                {leveledUp ? '🎉 Level Up!' : '⭐ XP Ganho!'}
              </h3>
              <p className="text-sm theme-text-secondary">{description}</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <X className="w-4 h-4 theme-text-tertiary" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* XP Gained */}
          <div className="flex items-center justify-center p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Star className="w-6 h-6 text-yellow-500" fill="currentColor" />
                <span className="text-2xl font-bold text-yellow-600">+{xpGained}</span>
                <span className="text-lg font-medium theme-text-primary">XP</span>
              </div>
              <p className="text-sm theme-text-secondary">Experiência ganha</p>
            </div>
          </div>

          {/* Level Up */}
          {leveledUp && newLevel && (
            <div className="flex items-center justify-center p-4 bg-gradient-to-r from-gold-50 to-yellow-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border-2 border-yellow-200 dark:border-yellow-700">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Trophy className="w-6 h-6 text-yellow-500" />
                  <span className="text-2xl font-bold text-yellow-600">Nível {newLevel}</span>
                </div>
                <p className="text-sm theme-text-secondary">Novo nível alcançado!</p>
              </div>
            </div>
          )}

          {/* Achievement Unlocked */}
          {achievementUnlocked && (
            <div className="flex items-center justify-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border-2 border-purple-200 dark:border-purple-700">
              <div className="text-center">
                <div className="text-2xl mb-2">🏆</div>
                <p className="font-semibold theme-text-primary">Conquista Desbloqueada!</p>
                <p className="text-sm theme-text-secondary">{achievementUnlocked}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 pb-4">
          <button
            onClick={handleClose}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}

// Hook para gerenciar notificações de XP
export function useXPNotification() {
  const [notification, setNotification] = useState<{
    show: boolean;
    xpGained: number;
    activityType: ActivityType;
    description: string;
    leveledUp?: boolean;
    newLevel?: number;
    achievementUnlocked?: string;
  }>({
    show: false,
    xpGained: 0,
    activityType: 'question_correct',
    description: ''
  });

  const showNotification = (data: Omit<typeof notification, 'show'>) => {
    setNotification({ ...data, show: true });
  };

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, show: false }));
  };

  return {
    notification,
    showNotification,
    hideNotification
  };
}