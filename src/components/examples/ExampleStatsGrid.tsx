import { Star, Flame, Target, TrendingUp } from 'lucide-react';
import { PenapadStatsCard } from '../common';

interface ExampleStatsGridProps {
  userStats: {
    totalXP: number;
    streak: number;
    accuracy: number;
    level: number;
  };
}

export default function ExampleStatsGrid({ userStats }: ExampleStatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* XP com gradiente especial */}
      <PenapadStatsCard
        title="Experiência Total"
        value={userStats.totalXP.toLocaleString()}
        subtitle={`Nível ${userStats.level}`}
        icon={Star}
        color="purple"
      >
        <div className="flex items-center space-x-2 mt-2">
          <div className="w-12 h-1 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full w-3/4"></div>
          </div>
          <span className="text-xs text-purple-400">750/1000 XP</span>
        </div>
      </PenapadStatsCard>

      {/* Streak com emoji animado */}
      <PenapadStatsCard
        title="Sequência de Estudos"
        value={userStats.streak}
        subtitle="dias consecutivos"
        icon={Flame}
        color="orange"
      >
        <div className="flex items-center space-x-1 mt-2">
          <span className="text-2xl animate-pulse">🔥</span>
          <span className="text-xs text-orange-400">Melhor: 15 dias</span>
        </div>
      </PenapadStatsCard>

      {/* Precisão com barra de progresso */}
      <PenapadStatsCard
        title="Precisão Geral"
        value={`${userStats.accuracy}%`}
        subtitle="+3% esta semana"
        icon={Target}
        color="emerald"
        showProgress={true}
        progressPercentage={userStats.accuracy}
      />

      {/* Performance com indicador de tendência */}
      <PenapadStatsCard
        title="Performance"
        value="Excelente"
        subtitle="Top 5% da turma"
        icon={TrendingUp}
        color="teal"
      >
        <div className="flex items-center space-x-2 mt-2">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-3 w-3 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}`} 
              />
            ))}
          </div>
          <span className="text-xs text-teal-400">4.2/5.0</span>
        </div>
      </PenapadStatsCard>
    </div>
  );
}