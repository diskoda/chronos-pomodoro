import { Calendar, Lock } from 'lucide-react';
import type { UserAchievement } from '../../types/xp';
import { ACHIEVEMENTS } from '../../data/levels';

interface AchievementCardProps {
  achievement: typeof ACHIEVEMENTS[0];
  userAchievement?: UserAchievement;
  size?: 'sm' | 'md' | 'lg';
}

export default function AchievementCard({ 
  achievement, 
  userAchievement, 
  size = 'md' 
}: AchievementCardProps) {
  const isUnlocked = !!userAchievement;
  
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-300 bg-gray-50';
      case 'rare': return 'border-blue-300 bg-blue-50';
      case 'epic': return 'border-purple-300 bg-purple-50';
      case 'legendary': return 'border-yellow-300 bg-yellow-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const getRarityTextColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-700';
      case 'rare': return 'text-blue-700';
      case 'epic': return 'text-purple-700';
      case 'legendary': return 'text-yellow-700';
      default: return 'text-gray-700';
    }
  };

  const sizeClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };

  const iconSizes = {
    sm: 'text-2xl',
    md: 'text-3xl',
    lg: 'text-4xl'
  };

  return (
    <div 
      className={`
        ${sizeClasses[size]}
        ${isUnlocked 
          ? `${getRarityColor(achievement.rarity)} border-2` 
          : 'border border-gray-200 bg-gray-100 dark:bg-gray-800 dark:border-gray-700'
        }
        rounded-lg transition-all duration-200 hover:shadow-md
        ${!isUnlocked ? 'opacity-60' : ''}
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`${iconSizes[size]} ${!isUnlocked ? 'grayscale' : ''}`}>
            {isUnlocked ? achievement.icon : '🔒'}
          </div>
          <div>
            <h3 className={`font-semibold ${isUnlocked ? getRarityTextColor(achievement.rarity) : 'text-gray-500'}`}>
              {achievement.name}
            </h3>
            <p className={`text-sm ${isUnlocked ? 'text-gray-600' : 'text-gray-400'}`}>
              {achievement.description}
            </p>
          </div>
        </div>
        
        {!isUnlocked && (
          <Lock className="w-4 h-4 text-gray-400" />
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* XP Reward */}
          <div className="flex items-center space-x-1">
            <span className="text-xs font-medium text-yellow-600">+{achievement.xpReward} XP</span>
          </div>
          
          {/* Rarity */}
          <span className={`
            px-2 py-1 text-xs font-medium rounded-full
            ${getRarityTextColor(achievement.rarity)}
            ${getRarityColor(achievement.rarity)}
          `}>
            {achievement.rarity.charAt(0).toUpperCase() + achievement.rarity.slice(1)}
          </span>
        </div>

        {/* Unlock Date */}
        {isUnlocked && userAchievement && (
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <Calendar className="w-3 h-3" />
            <span>{userAchievement.unlockedAt.toDate().toLocaleDateString()}</span>
          </div>
        )}
      </div>
    </div>
  );
}

interface AchievementGridProps {
  userAchievements: UserAchievement[];
  showLocked?: boolean;
  category?: string;
}

export function AchievementGrid({ 
  userAchievements, 
  showLocked = true, 
  category 
}: AchievementGridProps) {
  const filteredAchievements = category 
    ? ACHIEVEMENTS.filter(a => a.category === category)
    : ACHIEVEMENTS;

  const unlockedIds = new Set(userAchievements.map(ua => ua.achievementId));

  const achievementsToShow = showLocked 
    ? filteredAchievements 
    : filteredAchievements.filter(a => unlockedIds.has(a.id));

  const categories = ['study', 'streak', 'milestone', 'special'];
  const categoryNames = {
    study: 'Estudos',
    streak: 'Consistência',
    milestone: 'Marcos',
    special: 'Especiais'
  };

  if (category) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievementsToShow.map(achievement => {
          const userAchievement = userAchievements.find(ua => ua.achievementId === achievement.id);
          return (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              userAchievement={userAchievement}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {categories.map(cat => {
        const categoryAchievements = filteredAchievements.filter(a => a.category === cat);
        const visibleAchievements = showLocked 
          ? categoryAchievements 
          : categoryAchievements.filter(a => unlockedIds.has(a.id));

        if (visibleAchievements.length === 0) return null;

        return (
          <div key={cat}>
            <h3 className="text-lg font-semibold theme-text-primary mb-4">
              {categoryNames[cat as keyof typeof categoryNames]}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {visibleAchievements.map(achievement => {
                const userAchievement = userAchievements.find(ua => ua.achievementId === achievement.id);
                return (
                  <AchievementCard
                    key={achievement.id}
                    achievement={achievement}
                    userAchievement={userAchievement}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}