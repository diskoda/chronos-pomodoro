import { useState, useEffect } from 'react';
import { User, Mail, Calendar, Award, Clock, Star, Trophy, Stethoscope, HelpCircle, BookOpen } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { MethodologyXPService } from '../../services/methodologyXPService';
import type { StudyMethodology } from '../../types/xpMethodologies';

interface UserProfileData {
  overallLevel: number;
  totalXP: number;
  totalActivities: number;
  studyTimeMinutes: number;
  memberSince: Date;
  favoriteMethodology: StudyMethodology;
  completedAchievements: number;
  methodologyStats: {
    clinical_cases: { level: number; xp: number; activities: number };
    questions: { level: number; xp: number; activities: number };
    flashcards: { level: number; xp: number; activities: number };
  };
}

export default function UserProfile() {
  const { currentUser } = useAuth();
  const [profileData, setProfileData] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfileData = async () => {
      if (!currentUser) return;
      
      try {
        const [userStats, overallLevel] = await Promise.all([
          MethodologyXPService.getUserMethodologyStats(currentUser.uid),
          MethodologyXPService.getUserOverallLevel(currentUser.uid)
        ]);

        const profileData: UserProfileData = {
          overallLevel: overallLevel.overallLevel,
          totalXP: overallLevel.totalXP,
          totalActivities: userStats.overallStats.totalActivities,
          studyTimeMinutes: userStats.overallStats.totalTimeSpent,
          memberSince: currentUser.metadata.creationTime ? new Date(currentUser.metadata.creationTime) : new Date(),
          favoriteMethodology: userStats.overallStats.favoriteMethodology,
          completedAchievements: 3, // Mock - TODO: calcular conquistas reais
          methodologyStats: {
            clinical_cases: {
              level: userStats.methodologyStats.clinical_cases.currentLevel,
              xp: userStats.methodologyStats.clinical_cases.totalXP,
              activities: userStats.methodologyStats.clinical_cases.totalActivities
            },
            questions: {
              level: userStats.methodologyStats.questions.currentLevel,
              xp: userStats.methodologyStats.questions.totalXP,
              activities: userStats.methodologyStats.questions.totalActivities
            },
            flashcards: {
              level: userStats.methodologyStats.flashcards.currentLevel,
              xp: userStats.methodologyStats.flashcards.totalXP,
              activities: userStats.methodologyStats.flashcards.totalActivities
            }
          }
        };

        setProfileData(profileData);
      } catch (error) {
        console.error('Erro ao carregar dados do perfil:', error);
        // Fallback com dados básicos do usuário
        setProfileData({
          overallLevel: 1,
          totalXP: 100,
          totalActivities: 5,
          studyTimeMinutes: 120,
          memberSince: currentUser?.metadata.creationTime ? new Date(currentUser.metadata.creationTime) : new Date(),
          favoriteMethodology: 'clinical_cases',
          completedAchievements: 1,
          methodologyStats: {
            clinical_cases: { level: 1, xp: 50, activities: 2 },
            questions: { level: 1, xp: 30, activities: 2 },
            flashcards: { level: 1, xp: 20, activities: 1 }
          }
        });
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, [currentUser]);

  const getMethodologyIcon = (methodology: StudyMethodology) => {
    switch (methodology) {
      case 'clinical_cases':
        return <Stethoscope className="h-4 w-4 text-purple-500" />;
      case 'questions':
        return <HelpCircle className="h-4 w-4 text-yellow-500" />;
      case 'flashcards':
        return <BookOpen className="h-4 w-4 text-green-500" />;
    }
  };

  const getMethodologyName = (methodology: StudyMethodology) => {
    switch (methodology) {
      case 'clinical_cases':
        return 'Casos Clínicos';
      case 'questions':
        return 'Questões';
      case 'flashcards':
        return 'Flashcards';
    }
  };

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
              {profileData?.overallLevel}
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold theme-text-primary">
              {currentUser?.displayName || 'Usuário'}
            </h4>
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-sm theme-text-secondary">
                Nível {profileData?.overallLevel} • {profileData?.totalXP} XP
              </span>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center space-x-3">
            <Mail className="w-4 h-4 theme-text-tertiary" />
            <span className="text-sm theme-text-secondary">
              {currentUser?.email || 'email@exemplo.com'}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <Calendar className="w-4 h-4 theme-text-tertiary" />
            <span className="text-sm theme-text-secondary">
              Membro desde {profileData && formatMemberSince(profileData.memberSince)}
            </span>
          </div>
          {profileData && (
            <div className="flex items-center space-x-3">
              {getMethodologyIcon(profileData.favoriteMethodology)}
              <span className="text-sm theme-text-secondary">
                Metodologia favorita: {getMethodologyName(profileData.favoriteMethodology)}
              </span>
            </div>
          )}
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

        {/* Methodology Progress */}
        {profileData && (
          <div className="space-y-4 mb-6">
            <h5 className="font-medium theme-text-primary text-sm flex items-center">
              <Trophy className="h-4 w-4 mr-2 text-blue-500" />
              Progresso por Metodologia
            </h5>
            
            {Object.entries(profileData.methodologyStats).map(([methodology, stats]) => {
              const methodologyKey = methodology as StudyMethodology;
              return (
                <div key={methodology} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      {getMethodologyIcon(methodologyKey)}
                      <span className="text-xs theme-text-secondary">
                        {getMethodologyName(methodologyKey)}
                      </span>
                    </div>
                    <span className="text-xs font-medium theme-text-primary">
                      Nível {stats.level} • {stats.xp} XP
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full ${
                          methodologyKey === 'clinical_cases' ? 'bg-purple-500' :
                          methodologyKey === 'questions' ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}
                        style={{ width: `${Math.min((stats.level / 10) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-xs theme-text-tertiary">
                      {stats.activities} atividades
                    </span>
                  </div>
                </div>
              );
            })}
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