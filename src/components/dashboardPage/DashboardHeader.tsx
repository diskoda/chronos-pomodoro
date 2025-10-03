import { useState, useEffect } from 'react';
import { Calendar, Star, Trophy } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { MethodologyXPService } from '../../services/methodologyXPService';
import ThemeSelector from '../common/ThemeSelector';
import UserMenu from '../common/UserMenu';
import logoPenaped from '../../assets/images/logos/logo_penaped.png';

interface UserHeaderStats {
  overallLevel: number;
  totalXP: number;
  xpForNextLevel: number;
  currentLevelXP: number;
  progressToNextLevel: number;
}

export default function DashboardHeader() {
  const { currentUser } = useAuth();
  const [userStats, setUserStats] = useState<UserHeaderStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserStats = async () => {
      if (!currentUser) return;
      
      try {
        const overallLevel = await MethodologyXPService.getUserOverallLevel(currentUser.uid);
        
        // Calcular progresso para o próximo nível (simulado para exemplo)
        const currentLevelBaseXP = Math.pow(overallLevel.overallLevel - 1, 2) * 100;
        const nextLevelRequiredXP = Math.pow(overallLevel.overallLevel, 2) * 100;
        const progressXP = overallLevel.totalXP - currentLevelBaseXP;
        const neededXP = nextLevelRequiredXP - currentLevelBaseXP;
        const progressPercentage = neededXP > 0 ? (progressXP / neededXP) * 100 : 100;

        setUserStats({
          overallLevel: overallLevel.overallLevel,
          totalXP: overallLevel.totalXP,
          xpForNextLevel: nextLevelRequiredXP,
          currentLevelXP: currentLevelBaseXP,
          progressToNextLevel: Math.min(progressPercentage, 100)
        });
      } catch (error) {
        console.error('Erro ao carregar stats do header:', error);
        // Fallback simples
        setUserStats({
          overallLevel: 1,
          totalXP: 100,
          xpForNextLevel: 200,
          currentLevelXP: 0,
          progressToNextLevel: 50
        });
      } finally {
        setLoading(false);
      }
    };

    loadUserStats();
  }, [currentUser]);

  const formatDate = () => {
    const today = new Date();
    return today.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <header className="theme-bg-primary theme-border border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <img 
              src={logoPenaped} 
              alt="PéNaPED Logo" 
              className="h-45 w-auto"
            />
            
            {/* User XP Display */}
            {!loading && userStats && (
              <div className="hidden md:flex items-center space-x-4 ml-8">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                    <Trophy className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div className="text-sm">
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      <span className="font-bold theme-text-primary">Nível {userStats.overallLevel}</span>
                    </div>
                    <div className="text-xs theme-text-secondary">
                      {userStats.totalXP} XP total
                    </div>
                  </div>
                </div>
                
                {/* XP Progress Bar */}
                <div className="hidden lg:flex flex-col space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="theme-text-secondary">Progresso</span>
                    <span className="theme-text-primary font-medium">
                      {Math.round(userStats.progressToNextLevel)}%
                    </span>
                  </div>
                  <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${userStats.progressToNextLevel}%` }}
                    ></div>
                  </div>
                  <div className="text-xs theme-text-tertiary text-center">
                    Próximo nível: {userStats.xpForNextLevel - userStats.totalXP} XP
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm theme-text-secondary">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">{formatDate()}</span>
              <span className="sm:hidden">Hoje</span>
            </div>
            
            {/* Mobile XP Display */}
            {!loading && userStats && (
              <div className="md:hidden flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-bold theme-text-primary">
                  Nv.{userStats.overallLevel}
                </span>
              </div>
            )}
            
            <ThemeSelector />
            <UserMenu />
          </div>
        </div>
        
        {/* Mobile XP Progress - Below main header */}
        {!loading && userStats && (
          <div className="md:hidden pb-3 -mt-1">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="theme-text-secondary">
                Nível {userStats.overallLevel} • {userStats.totalXP} XP
              </span>
              <span className="theme-text-primary font-medium">
                {Math.round(userStats.progressToNextLevel)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${userStats.progressToNextLevel}%` }}
              ></div>
            </div>
            <div className="text-xs theme-text-tertiary mt-1">
              {userStats.xpForNextLevel - userStats.totalXP} XP para próximo nível
            </div>
          </div>
        )}
      </div>
    </header>
  );
}