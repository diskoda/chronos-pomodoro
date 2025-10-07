import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { XPService } from '../../services/xpService';

interface UserXPDisplayProps {
  className?: string;
  showLevel?: boolean;
  showProgress?: boolean;
  variant?: 'compact' | 'full';
}

export default function UserXPDisplay({ 
  className = "",
  showLevel = true,
  showProgress = true,
  variant = 'compact'
}: UserXPDisplayProps) {
  const { currentUser } = useAuth();
  const [userLevel, setUserLevel] = useState<{
    currentLevel: number;
    totalXP: number;
    xpToNextLevel: number;
    currentXP: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserXP = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        const levelData = await XPService.getUserLevel(currentUser.uid);
        setUserLevel(levelData);
      } catch (error) {
        console.error('Erro ao carregar XP do usuário:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserXP();
  }, [currentUser]);

  if (loading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="bg-gray-300 dark:bg-gray-600 h-6 w-20 rounded"></div>
      </div>
    );
  }

  if (!userLevel || !currentUser) {
    return (
      <div className={className}>
        <div className="text-gray-500 text-sm">
          {variant === 'compact' ? 'XP: 0' : 'XP Total: 0 • Nível 1'}
        </div>
      </div>
    );
  }

  const progressPercentage = userLevel.xpToNextLevel > 0 
    ? Math.min((userLevel.currentXP / userLevel.xpToNextLevel) * 100, 100)
    : 100;

  if (variant === 'compact') {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div className="flex items-center space-x-1">
          <span className="text-purple-500">⚡</span>
          <span className="font-semibold text-gray-800 dark:text-gray-200">
            {userLevel.totalXP}
          </span>
        </div>
        {showLevel && (
          <div className="flex items-center space-x-1">
            <span className="text-blue-500">⭐</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Nível {userLevel.currentLevel}
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
            ⚡
          </div>
          <div>
            {showLevel && (
              <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-200">
                Nível {userLevel.currentLevel}
              </h3>
            )}
            <p className="text-xs text-gray-600 dark:text-gray-400">
              XP Total: {userLevel.totalXP}
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
            {userLevel.currentXP}/{userLevel.xpToNextLevel} XP
          </div>
          
          {showProgress && userLevel.xpToNextLevel > 0 && (
            <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
              <div 
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}