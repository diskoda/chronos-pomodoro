import { Star, Trophy } from 'lucide-react';
import type { UserLevel } from '../../types/xp';
import { LEVEL_DEFINITIONS, getLevelProgress } from '../../data/levels';

interface XPBarProps {
  userLevel: UserLevel;
  showDetails?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function XPBar({ userLevel, showDetails = false, size = 'md' }: XPBarProps) {
  const currentLevelDef = LEVEL_DEFINITIONS.find(l => l.level === userLevel.currentLevel);
  const nextLevelDef = LEVEL_DEFINITIONS.find(l => l.level === userLevel.currentLevel + 1);
  const progress = getLevelProgress(userLevel.currentLevel, userLevel.totalXP);
  
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <div 
            className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
            style={{ backgroundColor: currentLevelDef?.color }}
          >
            {userLevel.currentLevel}
          </div>
          <span className={`font-semibold theme-text-primary ${textSizeClasses[size]}`}>
            {currentLevelDef?.name || 'Iniciante'}
          </span>
        </div>
        
        <div className="flex items-center space-x-1 text-yellow-500">
          <Star className={`${size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : 'w-5 h-5'}`} fill="currentColor" />
          <span className={`font-bold ${textSizeClasses[size]}`}>
            {userLevel.totalXP.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full ${sizeClasses[size]}`}>
          <div 
            className={`bg-gradient-to-r from-blue-500 to-purple-600 ${sizeClasses[size]} rounded-full transition-all duration-300 ease-out`}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        
        {/* Progress Text */}
        <div className="flex justify-between mt-1">
          <span className={`theme-text-tertiary ${textSizeClasses[size]}`}>
            {progress}%
          </span>
          {nextLevelDef && (
            <span className={`theme-text-tertiary ${textSizeClasses[size]}`}>
              {userLevel.xpToNextLevel} XP para nível {nextLevelDef.level}
            </span>
          )}
        </div>
      </div>

      {/* Details */}
      {showDetails && currentLevelDef && (
        <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="theme-text-tertiary">Nível Atual</p>
              <p className="font-semibold theme-text-primary">
                {userLevel.currentLevel} - {currentLevelDef.name}
              </p>
            </div>
            <div>
              <p className="theme-text-tertiary">XP Total</p>
              <p className="font-semibold theme-text-primary">
                {userLevel.totalXP.toLocaleString()}
              </p>
            </div>
            {nextLevelDef && (
              <>
                <div>
                  <p className="theme-text-tertiary">Próximo Nível</p>
                  <p className="font-semibold theme-text-primary">
                    {nextLevelDef.level} - {nextLevelDef.name}
                  </p>
                </div>
                <div>
                  <p className="theme-text-tertiary">XP Necessário</p>
                  <p className="font-semibold theme-text-primary">
                    {userLevel.xpToNextLevel.toLocaleString()}
                  </p>
                </div>
              </>
            )}
          </div>
          
          {/* Level Rewards */}
          {currentLevelDef.rewards?.title && (
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium theme-text-primary">
                  {currentLevelDef.rewards.title}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}