import { useUserProgressStats } from '../../../hooks/useUserQuestionAttempts';
import { CheckCircle, TrendingUp, Target, Zap } from 'lucide-react';

export default function AttemptsStats() {
  const { stats, loading, error, isAuthenticated } = useUserProgressStats();
  
  // Se não estiver autenticado, não mostrar nada
  if (!isAuthenticated) {
    return null;
  }

  // Loading state - compacto
  if (loading) {
    return (
      <div className="bg-slate-800/50 rounded-xl p-4 mb-6 border border-slate-700/30">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-400"></div>
          <span className="text-sm text-slate-300">Carregando suas estatísticas...</span>
        </div>
      </div>
    );
  }

  // Error state - compacto
  if (error) {
    return (
      <div className="bg-red-900/20 rounded-xl p-4 mb-6 border border-red-500/30">
        <p className="text-sm text-red-400">Erro ao carregar estatísticas pessoais</p>
      </div>
    );
  }

  // Estado vazio - compacto
  if (stats.totalQuestionsAttempted === 0) {
    return (
      <div className="bg-slate-800/50 rounded-xl p-4 mb-6 border border-slate-700/30">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
            <TrendingUp className="h-4 w-4 text-blue-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">Suas Estatísticas</p>
            <p className="text-xs text-slate-400">Resolva questões para ver seu progresso</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      {/* Header compacto */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <TrendingUp className="h-4 w-4 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Suas Estatísticas</h3>
          <p className="text-xs text-slate-400">Progresso pessoal</p>
        </div>
      </div>

      {/* Grid compacto */}
      <div className="grid grid-cols-4 gap-3">
        <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/30 hover:border-blue-400/30 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="h-4 w-4 text-blue-400" />
            <span className="text-xs text-slate-400">Tentadas</span>
          </div>
          <p className="text-lg font-bold text-white">{stats.totalQuestionsAttempted}</p>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/30 hover:border-emerald-400/30 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="h-4 w-4 text-emerald-400" />
            <span className="text-xs text-slate-400">Corretas</span>
          </div>
          <p className="text-lg font-bold text-white">{stats.totalQuestionsCorrect}</p>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/30 hover:border-purple-400/30 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <Target className="h-4 w-4 text-purple-400" />
            <span className="text-xs text-slate-400">Taxa</span>
          </div>
          <p className="text-lg font-bold text-white">{Math.round(stats.averageSuccessRate)}%</p>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/30 hover:border-orange-400/30 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <Zap className="h-4 w-4 text-orange-400" />
            <span className="text-xs text-slate-400">Sequência</span>
          </div>
          <div className="flex items-center space-x-1">
            <p className="text-lg font-bold text-white">{stats.streakCurrent}</p>
            {stats.streakCurrent > 0 && <span className="text-xs">🔥</span>}
          </div>
        </div>
      </div>
    </div>
  );
}