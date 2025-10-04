import { useUserProgressStats } from '../../hooks/useUserQuestionAttempts';
import { CheckCircle, XCircle, TrendingUp, Zap, Target, Award } from 'lucide-react';

// ==========================================
// COMPONENTE DE ESTATÍSTICAS DAS TENTATIVAS (FIREBASE)
// ==========================================

export default function AttemptsStats() {
  const { stats, loading, error, isAuthenticated } = useUserProgressStats();
  
  // Se não estiver autenticado, não mostrar estatísticas
  if (!isAuthenticated) {
    return (
      <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 p-6 mb-8">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-50"></div>
        <div className="relative z-10 text-center">
          <div className="relative mx-auto mb-4">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur opacity-75"></div>
            <div className="relative w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
              <TrendingUp className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-white mb-3">
            Estatísticas de Progresso
          </h3>
          <p className="text-slate-300 text-sm">
            Faça login para ver suas estatísticas detalhadas de progresso
          </p>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 p-6 mb-8">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-50"></div>
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-6">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full blur opacity-75"></div>
              <div className="relative bg-purple-500/20 rounded-xl p-2">
                <TrendingUp className="h-6 w-6 text-purple-400" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white">Suas Estatísticas</h3>
          </div>
          <div className="text-center py-8">
            <div className="relative mx-auto mb-4">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur opacity-75 animate-pulse"></div>
              <div className="relative w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-400"></div>
              </div>
            </div>
            <p className="text-slate-300">Carregando estatísticas...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-red-700/50 p-6 mb-8">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-50"></div>
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-6">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-400 to-orange-400 rounded-full blur opacity-75"></div>
              <div className="relative bg-red-500/20 rounded-xl p-2">
                <TrendingUp className="h-6 w-6 text-red-400" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white">Suas Estatísticas</h3>
          </div>
          <div className="text-center py-8">
            <XCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <p className="text-slate-300 mb-2">Erro ao carregar estatísticas</p>
            <p className="text-sm text-red-400">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 mb-6">
      {/* Header com título - compacto */}
      <div className="flex items-center space-x-3">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 rounded-full blur opacity-75"></div>
          <div className="relative bg-blue-500/20 rounded-lg p-2">
            <TrendingUp className="h-6 w-6 text-blue-400" />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Suas Estatísticas</h2>
          <p className="text-sm text-slate-400">Progresso e desempenho</p>
        </div>
      </div>

      {/* Grid de estatísticas principais - mais compacto */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 p-3 hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/10 hover:scale-102 transform">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-400 group-hover:text-slate-300 transition-colors duration-300 mb-1">
                  Tentadas
                </p>
                <p className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                  {stats.totalQuestionsAttempted}
                </p>
              </div>
              <TrendingUp className="h-5 w-5 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 p-3 hover:border-emerald-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-400/10 hover:scale-102 transform">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-400 group-hover:text-slate-300 transition-colors duration-300 mb-1">
                  Corretas
                </p>
                <p className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors duration-300">
                  {stats.totalQuestionsCorrect}
                </p>
              </div>
              <CheckCircle className="h-5 w-5 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300" />
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 p-3 hover:border-purple-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-400/10 hover:scale-102 transform">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-400 group-hover:text-slate-300 transition-colors duration-300 mb-1">
                  Taxa
                </p>
                <p className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                  {Math.round(stats.averageSuccessRate)}%
                </p>
              </div>
              <Target className="h-5 w-5 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" />
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 p-3 hover:border-orange-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-400/10 hover:scale-102 transform">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-400 group-hover:text-slate-300 transition-colors duration-300 mb-1">
                  Sequência
                </p>
                <div className="flex items-center space-x-1">
                  <p className="text-xl font-bold text-white group-hover:text-orange-300 transition-colors duration-300">
                    {stats.streakCurrent}
                  </p>
                  <span className="text-sm animate-pulse">🔥</span>
                </div>
              </div>
              <Zap className="h-5 w-5 text-orange-400 group-hover:text-orange-300 transition-colors duration-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Estado vazio - mais compacto */}
      {stats.totalQuestionsAttempted === 0 && (
        <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 p-6">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10 text-center">
            <div className="relative mx-auto mb-4">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur opacity-0 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center group-hover:bg-yellow-500/30 transition-colors duration-300">
                <Award className="h-6 w-6 text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300" />
              </div>
            </div>
            <h4 className="text-lg font-bold text-white group-hover:text-yellow-300 transition-colors duration-300 mb-2">
              Comece a Estudar!
            </h4>
            <p className="text-sm text-slate-300 group-hover:text-slate-200 transition-colors duration-300">
              Resolva questões para ver suas estatísticas
            </p>
          </div>
        </div>
      )}
    </div>
  );
}