import { BookOpen, CheckCircle, BarChart3 } from 'lucide-react';

interface QuestionsStatsProps {
  stats: {
    total: number;
    completed: number;
    avgCorrectRate: number;
  };
}

export default function QuestionsStats({ stats }: QuestionsStatsProps) {
  const completionPercentage = Math.round((stats.completed / stats.total) * 100);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Total de Questões */}
      <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 p-4 hover:border-blue-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-400/10 hover:scale-102 transform">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400 group-hover:text-slate-300 transition-colors duration-300 mb-1">
                Total de Questões
              </p>
              <p className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300 tracking-tight">
                {stats.total}
              </p>
            </div>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur opacity-0 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative bg-blue-500/20 rounded-lg p-2 group-hover:bg-blue-500/30 transition-colors duration-300">
                <BookOpen className="h-5 w-5 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Questões Resolvidas */}
      <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 p-4 hover:border-emerald-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-400/10 hover:scale-102 transform">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-xs font-medium text-slate-400 group-hover:text-slate-300 transition-colors duration-300 mb-1">
                Questões Resolvidas
              </p>
              <p className="text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors duration-300 tracking-tight">
                {stats.completed}
              </p>
            </div>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full blur opacity-0 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative bg-emerald-500/20 rounded-lg p-2 group-hover:bg-emerald-500/30 transition-colors duration-300">
                <CheckCircle className="h-5 w-5 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300" />
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-12 h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-emerald-400 font-medium group-hover:text-emerald-300 transition-colors duration-300">
              {completionPercentage}%
            </p>
          </div>
        </div>
      </div>

      {/* Taxa de Acerto Média */}
      <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 p-4 hover:border-orange-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-orange-400/10 hover:scale-102 transform">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400 group-hover:text-slate-300 transition-colors duration-300 mb-1">
                Taxa de Acerto
              </p>
              <div className="flex items-baseline space-x-1">
                <p className="text-2xl font-bold text-white group-hover:text-orange-300 transition-colors duration-300 tracking-tight">
                  {stats.avgCorrectRate}
                </p>
                <span className="text-sm font-semibold text-orange-400 group-hover:text-orange-300 transition-colors duration-300">%</span>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full blur opacity-0 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative bg-orange-500/20 rounded-lg p-2 group-hover:bg-orange-500/30 transition-colors duration-300">
                <BarChart3 className="h-5 w-5 text-orange-400 group-hover:text-orange-300 transition-colors duration-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}