import { useState, useEffect } from 'react';
import { Crown, Trophy, Medal, Star, TrendingUp, User, Stethoscope, HelpCircle, BookOpen } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { MethodologyXPService } from '../../services/methodologyXPService';
import type { StudyMethodology } from '../../types/xpMethodologies';

interface LeaderboardUser {
  id: string;
  name: string;
  avatar?: string;
  overallLevel: number;
  totalXP: number;
  weeklyXP: number;
  methodology?: StudyMethodology;
  methodologyLevel?: number;
  rank: number;
  isCurrentUser: boolean;
}

export default function Leaderboard() {
  const { currentUser } = useAuth();
  const [selectedView, setSelectedView] = useState<'overall' | StudyMethodology>('overall');
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLeaderboard = async () => {
      if (!currentUser) return;
      
      try {
        // Por enquanto, vamos criar dados mock baseados no usuário atual
        // TODO: Implementar sistema real de leaderboard com todos os usuários
        
        const userOverallLevel = await MethodologyXPService.getUserOverallLevel(currentUser.uid);
        
        // Criar dados mock para demonstração
        const mockUsers: LeaderboardUser[] = [
          {
            id: '1',
            name: 'Dr. Ana Costa',
            overallLevel: 18,
            totalXP: 4250,
            weeklyXP: 850,
            rank: 1,
            isCurrentUser: false
          },
          {
            id: '2',
            name: 'Dr. Pedro Silva',
            overallLevel: 16,
            totalXP: 3890,
            weeklyXP: 720,
            rank: 2,
            isCurrentUser: false
          },
          {
            id: currentUser.uid,
            name: currentUser.displayName || 'Você',
            overallLevel: userOverallLevel.overallLevel,
            totalXP: userOverallLevel.totalXP,
            weeklyXP: 580, // TODO: Calcular XP semanal real
            rank: 3,
            isCurrentUser: true
          },
          {
            id: '4',
            name: 'Dr. João Oliveira',
            overallLevel: 14,
            totalXP: 3200,
            weeklyXP: 620,
            rank: 4,
            isCurrentUser: false
          },
          {
            id: '5',
            name: 'Dr. Lucas Mendes',
            overallLevel: 11,
            totalXP: 2180,
            weeklyXP: 450,
            rank: 5,
            isCurrentUser: false
          }
        ];

        // Ordenar por XP total
        mockUsers.sort((a, b) => b.totalXP - a.totalXP);
        
        // Atualizar ranks
        mockUsers.forEach((user, index) => {
          user.rank = index + 1;
        });

        setLeaderboardData(mockUsers);
      } catch (error) {
        console.error('Erro ao carregar leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, [currentUser]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Trophy className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Medal className="h-5 w-5 text-amber-600" />;
      default:
        return (
          <div className="w-5 h-5 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
            <span className="text-xs font-bold theme-text-primary">{rank}</span>
          </div>
        );
    }
  };

  const getRankBg = (rank: number, isCurrentUser: boolean) => {
    if (isCurrentUser) {
      return 'bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-200 dark:border-blue-700';
    }
    
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20';
      case 2:
        return 'bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20';
      case 3:
        return 'bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20';
      default:
        return 'theme-bg-secondary';
    }
  };

  const getMethodologyIcon = (methodology: StudyMethodology) => {
    switch (methodology) {
      case 'clinical_cases':
        return <Stethoscope className="h-4 w-4" />;
      case 'questions':
        return <HelpCircle className="h-4 w-4" />;
      case 'flashcards':
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const getMethodologyColor = (methodology: StudyMethodology) => {
    switch (methodology) {
      case 'clinical_cases':
        return 'text-purple-500 bg-purple-100 dark:bg-purple-900/30';
      case 'questions':
        return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30';
      case 'flashcards':
        return 'text-green-500 bg-green-100 dark:bg-green-900/30';
    }
  };

  const getMethodologyTitle = (methodology: StudyMethodology) => {
    switch (methodology) {
      case 'clinical_cases':
        return 'Casos Clínicos';
      case 'questions':
        return 'Questões';
      case 'flashcards':
        return 'Flashcards';
    }
  };

  const views = [
    { id: 'overall' as const, name: 'Geral', description: 'Ranking geral', icon: TrendingUp },
    { id: 'clinical_cases' as const, name: 'Casos', description: 'Casos clínicos', icon: Stethoscope },
    { id: 'questions' as const, name: 'Questões', description: 'Banco de questões', icon: HelpCircle },
    { id: 'flashcards' as const, name: 'Cards', description: 'Flashcards', icon: BookOpen }
  ];

  const currentUser_data = leaderboardData.find(user => user.isCurrentUser);

  if (loading) {
    return (
      <div className="theme-card rounded-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                </div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="theme-card rounded-lg">
      {/* Header */}
      <div className="p-6 border-b theme-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold theme-text-primary flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-blue-500" />
            Ranking por Metodologia
          </h3>
          {currentUser_data && (
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium theme-text-primary">
                Sua posição: #{currentUser_data.rank}
              </span>
            </div>
          )}
        </div>

        {/* View Selector */}
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          {views.map((view) => {
            const IconComponent = view.icon;
            return (
              <button
                key={view.id}
                onClick={() => setSelectedView(view.id)}
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  selectedView === view.id
                    ? 'bg-white dark:bg-gray-700 theme-text-primary shadow-sm'
                    : 'theme-text-secondary hover:theme-text-primary'
                }`}
              >
                <div className="flex items-center justify-center space-x-1">
                  <IconComponent className="h-4 w-4" />
                  <span className="hidden sm:inline">{view.name}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Leaderboard List */}
      <div className="p-6">
        <div className="space-y-3">
          {leaderboardData.map((user) => (
            <div
              key={user.id}
              className={`flex items-center justify-between p-4 rounded-lg transition-all duration-200 ${getRankBg(
                user.rank,
                user.isCurrentUser
              )} ${user.isCurrentUser ? 'scale-[1.02]' : 'hover:scale-[1.01]'}`}
            >
              {/* Left Side - Rank, Avatar, Info */}
              <div className="flex items-center space-x-4">
                {/* Rank Icon */}
                <div className="flex-shrink-0">
                  {getRankIcon(user.rank)}
                </div>

                {/* Avatar */}
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>

                {/* User Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className={`font-medium truncate ${
                      user.isCurrentUser ? 'text-blue-600 dark:text-blue-400' : 'theme-text-primary'
                    }`}>
                      {user.name}
                      {user.isCurrentUser && <span className="ml-2 text-xs">(Você)</span>}
                    </h4>
                  </div>
                  <div className="flex items-center space-x-3 mt-1">
                    {selectedView !== 'overall' && (
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getMethodologyColor(selectedView)}`}>
                        <div className="flex items-center space-x-1">
                          {getMethodologyIcon(selectedView)}
                          <span>Nv. {user.methodologyLevel || 1}</span>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      <span className="text-xs font-medium theme-text-primary">Nível {user.overallLevel}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - XP */}
              <div className="text-right flex-shrink-0">
                <div className="font-bold theme-text-primary">
                  {user.totalXP.toLocaleString()} XP
                </div>
                <div className="text-xs theme-text-secondary">
                  Total acumulado
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Your Progress Summary */}
        {currentUser_data && (
          <div className="mt-6 pt-4 border-t theme-border">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4">
              <h5 className="font-medium theme-text-primary mb-2">Seu Progresso</h5>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-lg font-bold theme-text-primary">{currentUser_data.totalXP.toLocaleString()}</p>
                  <p className="text-xs theme-text-secondary">XP Total</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold theme-text-primary">#{currentUser_data.rank}</p>
                  <p className="text-xs theme-text-secondary">Posição atual</p>
                </div>
              </div>
              {selectedView !== 'overall' && (
                <div className="mt-3 text-center">
                  <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getMethodologyColor(selectedView)}`}>
                    {getMethodologyIcon(selectedView)}
                    <span>{getMethodologyTitle(selectedView)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}