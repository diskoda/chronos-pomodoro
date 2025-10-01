import { useState } from 'react';
import { Crown, Trophy, Medal, Star, TrendingUp, User } from 'lucide-react';

interface LeaderboardUser {
  id: string;
  name: string;
  avatar?: string;
  level: number;
  xp: number;
  weeklyXP: number;
  specialty: string;
  rank: number;
  isCurrentUser: boolean;
}

export default function Leaderboard() {
  const [selectedPeriod, setSelectedPeriod] = useState<'weekly' | 'monthly' | 'allTime'>('weekly');

  const leaderboardData: LeaderboardUser[] = [
    {
      id: '1',
      name: 'Dr. Ana Costa',
      level: 18,
      xp: 4250,
      weeklyXP: 850,
      specialty: 'Cardiologia',
      rank: 1,
      isCurrentUser: false
    },
    {
      id: '2',
      name: 'Dr. Pedro Silva',
      level: 16,
      xp: 3890,
      weeklyXP: 720,
      specialty: 'Neurologia',
      rank: 2,
      isCurrentUser: false
    },
    {
      id: '3',
      name: 'Dr. Maria Santos',
      level: 15,
      xp: 3650,
      weeklyXP: 680,
      specialty: 'Emergência',
      rank: 3,
      isCurrentUser: false
    },
    {
      id: '4',
      name: 'Dr. João Oliveira',
      level: 14,
      xp: 3200,
      weeklyXP: 620,
      specialty: 'Ortopedia',
      rank: 4,
      isCurrentUser: false
    },
    {
      id: '5',
      name: 'Dr. Samuel Silva',
      level: 12,
      xp: 2350,
      weeklyXP: 580,
      specialty: 'Pediatria',
      rank: 5,
      isCurrentUser: true
    },
    {
      id: '6',
      name: 'Dr. Lucas Mendes',
      level: 11,
      xp: 2180,
      weeklyXP: 450,
      specialty: 'Psiquiatria',
      rank: 6,
      isCurrentUser: false
    },
    {
      id: '7',
      name: 'Dr. Fernanda Lima',
      level: 10,
      xp: 1950,
      weeklyXP: 420,
      specialty: 'Dermatologia',
      rank: 7,
      isCurrentUser: false
    }
  ];

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

  const periods = [
    { id: 'weekly' as const, name: 'Semanal', description: 'Top da semana' },
    { id: 'monthly' as const, name: 'Mensal', description: 'Top do mês' },
    { id: 'allTime' as const, name: 'Geral', description: 'Hall da fama' }
  ];

  const currentUser = leaderboardData.find(user => user.isCurrentUser);

  return (
    <div className="theme-card rounded-lg">
      {/* Header */}
      <div className="p-6 border-b theme-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold theme-text-primary flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-blue-500" />
            Ranking de Estudantes
          </h3>
          <div className="flex items-center space-x-2">
            <Star className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium theme-text-primary">
              Sua posição: #{currentUser?.rank}
            </span>
          </div>
        </div>

        {/* Period Selector */}
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          {periods.map((period) => (
            <button
              key={period.id}
              onClick={() => setSelectedPeriod(period.id)}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                selectedPeriod === period.id
                  ? 'bg-white dark:bg-gray-700 theme-text-primary shadow-sm'
                  : 'theme-text-secondary hover:theme-text-primary'
              }`}
            >
              <div className="text-center">
                <div className="font-medium">{period.name}</div>
                <div className="text-xs opacity-75">{period.description}</div>
              </div>
            </button>
          ))}
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
                    <span className="text-xs theme-text-secondary">{user.specialty}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      <span className="text-xs font-medium theme-text-primary">Nível {user.level}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - XP */}
              <div className="text-right flex-shrink-0">
                <div className="font-bold theme-text-primary">
                  {selectedPeriod === 'weekly' ? user.weeklyXP : user.xp} XP
                </div>
                <div className="text-xs theme-text-secondary">
                  {selectedPeriod === 'weekly' ? 'Esta semana' : 'Total'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Your Progress Summary */}
        {currentUser && (
          <div className="mt-6 pt-4 border-t theme-border">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4">
              <h5 className="font-medium theme-text-primary mb-2">Seu Progresso</h5>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-lg font-bold theme-text-primary">{currentUser.weeklyXP}</p>
                  <p className="text-xs theme-text-secondary">XP esta semana</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold theme-text-primary">#{currentUser.rank}</p>
                  <p className="text-xs theme-text-secondary">Posição atual</p>
                </div>
              </div>
              <div className="mt-3 text-center">
                <p className="text-xs theme-text-secondary">
                  Você precisa de{' '}
                  <span className="font-medium theme-text-primary">
                    {leaderboardData[currentUser.rank - 2]?.weeklyXP - currentUser.weeklyXP} XP
                  </span>{' '}
                  para alcançar a {currentUser.rank - 1}ª posição
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}