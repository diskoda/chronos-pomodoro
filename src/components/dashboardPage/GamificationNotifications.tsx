import { useState, useEffect } from 'react';
import { X, Trophy, Star, Zap, Crown, Target, BookOpen } from 'lucide-react';

interface GamificationNotification {
  id: string;
  type: 'levelUp' | 'badge' | 'streak' | 'achievement' | 'xp';
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  xpReward?: number;
  timestamp: Date;
}

export default function GamificationNotifications() {
  const [notifications, setNotifications] = useState<GamificationNotification[]>([]);
  const [visibleNotifications, setVisibleNotifications] = useState<GamificationNotification[]>([]);

  // Simular notificações de exemplo
  useEffect(() => {
    const mockNotifications: GamificationNotification[] = [
      {
        id: '1',
        type: 'levelUp',
        title: 'Nível Aumentado!',
        description: 'Parabéns! Você alcançou o nível 12!',
        icon: <Crown className="h-6 w-6" />,
        color: 'text-yellow-600',
        bgColor: 'bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30',
        xpReward: 500,
        timestamp: new Date()
      },
      {
        id: '2',
        type: 'badge',
        title: 'Nova Conquista!',
        description: 'Você desbloqueou "Estudante Dedicado"',
        icon: <Trophy className="h-6 w-6" />,
        color: 'text-blue-600',
        bgColor: 'bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30',
        xpReward: 200,
        timestamp: new Date(Date.now() - 30000)
      },
      {
        id: '3',
        type: 'streak',
        title: 'Sequência Mantida!',
        description: '7 dias consecutivos de estudo! 🔥',
        icon: <Zap className="h-6 w-6" />,
        color: 'text-orange-600',
        bgColor: 'bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30',
        xpReward: 100,
        timestamp: new Date(Date.now() - 60000)
      }
    ];

    // Simular chegada de notificações com delay
    mockNotifications.forEach((notification, index) => {
      setTimeout(() => {
        setNotifications(prev => [...prev, notification]);
        setVisibleNotifications(prev => [...prev, notification]);
        
        // Auto-remove após 5 segundos
        setTimeout(() => {
          setVisibleNotifications(prev => prev.filter(n => n.id !== notification.id));
        }, 5000);
      }, index * 2000);
    });
  }, []);

  const dismissNotification = (id: string) => {
    setVisibleNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'levelUp':
        return <Crown className="h-6 w-6" />;
      case 'badge':
        return <Trophy className="h-6 w-6" />;
      case 'streak':
        return <Zap className="h-6 w-6" />;
      case 'achievement':
        return <Target className="h-6 w-6" />;
      case 'xp':
        return <Star className="h-6 w-6" />;
      default:
        return <BookOpen className="h-6 w-6" />;
    }
  };

  if (visibleNotifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-sm">
      {visibleNotifications.map((notification) => (
        <div
          key={notification.id}
          className={`${notification.bgColor} backdrop-blur-sm border border-white/20 dark:border-gray-700/30 rounded-lg p-4 shadow-lg animate-slide-in-right`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              {/* Icon */}
              <div className={`${notification.color} bg-white/50 dark:bg-gray-800/50 rounded-full p-2 flex-shrink-0`}>
                {getNotificationIcon(notification.type)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold theme-text-primary text-sm">
                  {notification.title}
                </h4>
                <p className="text-sm theme-text-secondary mt-1">
                  {notification.description}
                </p>
                
                {/* XP Reward */}
                {notification.xpReward && (
                  <div className="flex items-center space-x-1 mt-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                      +{notification.xpReward} XP
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => dismissNotification(notification.id)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors flex-shrink-0"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Progress Bar (Auto-dismiss indicator) */}
          <div className="mt-3 w-full bg-white/30 dark:bg-gray-700/30 rounded-full h-1 overflow-hidden">
            <div 
              className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-shrink-width"
              style={{ animationDuration: '5s' }}
            ></div>
          </div>
        </div>
      ))}

      {/* Notification History Button */}
      {notifications.length > 0 && (
        <div className="text-center">
          <button className="text-sm theme-text-secondary hover:theme-text-primary transition-colors">
            Ver todas as notificações ({notifications.length})
          </button>
        </div>
      )}
    </div>
  );
}