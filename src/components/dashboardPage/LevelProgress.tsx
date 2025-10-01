import { Trophy, Star, Zap } from 'lucide-react';

interface LevelProgressProps {
  currentXP: number;
  currentLevel: number;
  xpToNextLevel: number;
  totalXPForNextLevel: number;
}

export default function LevelProgress({ 
  currentXP = 2350, 
  currentLevel = 12, 
  xpToNextLevel = 650, 
  totalXPForNextLevel = 3000 
}: Partial<LevelProgressProps>) {
  const progressPercentage = ((totalXPForNextLevel - xpToNextLevel) / totalXPForNextLevel) * 100;

  const getLevelBadgeColor = (level: number) => {
    if (level >= 20) return 'from-purple-500 to-pink-500';
    if (level >= 15) return 'from-blue-500 to-cyan-500';
    if (level >= 10) return 'from-green-500 to-emerald-500';
    if (level >= 5) return 'from-yellow-500 to-orange-500';
    return 'from-gray-500 to-gray-600';
  };

  const getRankTitle = (level: number) => {
    if (level >= 25) return 'Especialista Legendary';
    if (level >= 20) return 'Mestre Médico';
    if (level >= 15) return 'Doutor Experiente';
    if (level >= 10) return 'Residente Avançado';
    if (level >= 5) return 'Estudante Dedicado';
    return 'Iniciante Promissor';
  };

  return (
    <div className="theme-card rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold theme-text-primary">Progresso de Nível</h3>
        <div className={`bg-gradient-to-r ${getLevelBadgeColor(currentLevel)} text-white px-3 py-1 rounded-full flex items-center space-x-1`}>
          <Star className="h-4 w-4" />
          <span className="font-bold text-sm">Nível {currentLevel}</span>
        </div>
      </div>

      {/* Rank Title */}
      <div className="text-center mb-4">
        <h4 className="text-lg font-bold theme-text-primary mb-1">{getRankTitle(currentLevel)}</h4>
        <p className="text-sm theme-text-secondary">Continue estudando para evoluir!</p>
      </div>

      {/* XP Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-2">
            <Zap className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium theme-text-primary">{currentXP.toLocaleString()} XP</span>
          </div>
          <span className="text-sm theme-text-secondary">{xpToNextLevel} XP para próximo nível</span>
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500 ease-out relative"
            style={{ width: `${progressPercentage}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Level Benefits Preview */}
      <div className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4">
        <h5 className="font-medium theme-text-primary mb-2 flex items-center">
          <Trophy className="h-4 w-4 mr-2 text-yellow-500" />
          Próximas Recompensas (Nível {currentLevel + 1})
        </h5>
        <ul className="space-y-1 text-sm theme-text-secondary">
          <li>• Novo avatar médico exclusivo</li>
          <li>• +5% bônus de XP em questões</li>
          <li>• Acesso a casos clínicos premium</li>
        </ul>
      </div>
    </div>
  );
}