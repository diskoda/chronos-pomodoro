import { useState, useEffect } from 'react';
import { User, Mail, Calendar, Award, Clock, Star, Trophy } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { XPService } from '../../services/xpService';
import type { UserLevel } from '../../types/xp';

interface UserProfileData {
  currentLevel: number;
  totalXP: number;
  xpToNextLevel: number;
  totalActivities: number;
  studyTimeMinutes: number;
  memberSince: Date;
  completedAchievements: number;
  recentActivitiesCount: number;
}

export default function UserProfile() {
  const { currentUser } = useAuth();
  const [profileData, setProfileData] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfileData = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }
      
      try {
        console.log('👤 Carregando perfil do usuário:', currentUser.uid);
        
        // Carregar dados do sistema XP simples
        const userLevel: UserLevel = await XPService.getUserLevel(currentUser.uid);
        const userHistory = await XPService.getUserXPHistory(currentUser.uid, 50);
        const userStats = await XPService.getUserXPStats(currentUser.uid);
        
        console.log('✅ Dados do perfil carregados:', { userLevel, userHistory, userStats });

        const profileData: UserProfileData = {
          currentLevel: userLevel.currentLevel,
          totalXP: userLevel.totalXP,
          xpToNextLevel: userLevel.xpToNextLevel,
          totalActivities: userStats.totalActivities,
          studyTimeMinutes: userStats.xpThisMonth * 2, // Estimativa: 2 min por XP
          memberSince: currentUser.metadata.creationTime ? new Date(currentUser.metadata.creationTime) : new Date(),
          completedAchievements: Math.floor(userLevel.currentLevel / 2), // 1 achievement por 2 níveis
          recentActivitiesCount: userHistory.length
        };

        setProfileData(profileData);
        
      } catch (error) {
        console.error('❌ Erro ao carregar dados do perfil:', error);
        // Fallback com dados básicos do usuário
        setProfileData({
          currentLevel: 1,
          totalXP: 0,
          xpToNextLevel: 100,
          totalActivities: 0,
          studyTimeMinutes: 0,
          memberSince: currentUser?.metadata.creationTime ? new Date(currentUser.metadata.creationTime) : new Date(),
          completedAchievements: 0,
          recentActivitiesCount: 0
        });
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();
    
    // Escutar eventos de XP para atualizar em tempo real
    const handleXPGained = () => {
      console.log('🎉 Perfil detectou XP ganho - recarregando...');
      loadProfileData();
    };

    window.addEventListener('xpGained', handleXPGained);
    
    return () => {
      window.removeEventListener('xpGained', handleXPGained);
    };
  }, [currentUser]);

  const formatStudyTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    return hours > 0 ? `${hours}h` : `${minutes}min`;
  };

  const formatMemberSince = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { 
      month: 'short', 
      year: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="theme-card rounded-lg">
        <div className="p-6 border-b theme-border">
          <div className="animate-pulse h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
        </div>
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
              <div className="space-y-2">
                <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-32"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
              </div>
            </div>
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="theme-card rounded-lg">
      <div className="p-6 border-b theme-border">
        <h3 className="font-semibold theme-text-primary">Perfil do Usuário</h3>
      </div>
      <div className="p-6">
        {/* Avatar and Basic Info */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center relative">
            <User className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            {/* Level badge */}
            <div className="absolute -bottom-1 -right-1 bg-yellow-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {profileData?.currentLevel}
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold theme-text-primary">
              {currentUser?.displayName || 'Samuel Pereira da Silva'}
            </h4>
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-sm theme-text-secondary">
                Nível {profileData?.currentLevel} • {profileData?.totalXP} XP
              </span>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center space-x-3">
            <Mail className="w-4 h-4 theme-text-tertiary" />
            <span className="text-sm theme-text-secondary">
              {currentUser?.email || 'samuel20.ps@gmail.com'}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <Calendar className="w-4 h-4 theme-text-tertiary" />
            <span className="text-sm theme-text-secondary">
              Membro desde {profileData && formatMemberSince(profileData.memberSince)}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-3 theme-bg-secondary rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-2xl font-bold theme-text-primary">
              {profileData && formatStudyTime(profileData.studyTimeMinutes)}
            </p>
            <p className="text-xs theme-text-secondary">Tempo de Estudo</p>
          </div>
          <div className="text-center p-3 theme-bg-secondary rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <Award className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
            </div>
            <p className="text-2xl font-bold theme-text-primary">
              {profileData?.completedAchievements}
            </p>
            <p className="text-xs theme-text-secondary">Conquistas</p>
          </div>
        </div>

        {/* Progresso XP */}
        {profileData && (
          <div className="space-y-4 mb-6">
            <h5 className="font-medium theme-text-primary text-sm flex items-center">
              <Trophy className="h-4 w-4 mr-2 text-blue-500" />
              Progresso XP
            </h5>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs theme-text-secondary">
                  Progresso para Nível {profileData.currentLevel + 1}
                </span>
                <span className="text-xs font-medium theme-text-primary">
                  {profileData.totalXP % 100}/{profileData.xpToNextLevel} XP
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                    style={{ width: `${Math.min(((profileData.totalXP % 100) / profileData.xpToNextLevel) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-xs theme-text-tertiary text-center">
                {profileData.recentActivitiesCount} atividades recentes
              </div>
            </div>
          </div>
        )}

        {/* Additional Stats */}
        <div className="bg-gradient-to-r from-blue-50/30 to-purple-50/30 dark:from-blue-900/10 dark:to-purple-900/10 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-lg font-bold theme-text-primary">
                {profileData?.totalActivities}
              </p>
              <p className="text-xs theme-text-secondary">Atividades Totais</p>
            </div>
            <div>
              <p className="text-lg font-bold theme-text-primary">
                {profileData?.totalXP}
              </p>
              <p className="text-xs theme-text-secondary">XP Total</p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="border-t theme-border pt-4">
          <button className="w-full theme-bg-secondary theme-text-primary py-2 px-4 rounded-lg font-medium hover:theme-bg-tertiary transition-colors text-sm">
            Editar Perfil
          </button>
        </div>
      </div>
    </div>
  );
}