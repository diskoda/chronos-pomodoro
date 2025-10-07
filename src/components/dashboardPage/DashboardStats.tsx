import { useState, useEffect } from 'react';
import { Clock, HelpCircle, Star, Zap, Trophy } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { XPService } from '../../services/xpService';
import type { UserLevel } from '../../types/xp';

interface DashboardStatsData {
  currentLevel: number;
  totalXP: number;
  xpToNextLevel: number;
  studyStreak: number;
  achievements: number;
  questionsAnswered: number;
}

export default function DashboardStats() {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState<DashboardStatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }
      
      try {
        console.log('📊 Carregando estatísticas do dashboard para:', currentUser.uid);
        
        // Carregar dados do sistema XP simples
        const userLevel: UserLevel = await XPService.getUserLevel(currentUser.uid);
        const userHistory = await XPService.getUserXPHistory(currentUser.uid, 50);
        const userStats = await XPService.getUserXPStats(currentUser.uid);
        
        console.log('✅ Dados carregados:', { userLevel, userHistory, userStats });
        
        setStats({
          currentLevel: userLevel.currentLevel,
          totalXP: userLevel.totalXP,
          xpToNextLevel: userLevel.xpToNextLevel,
          studyStreak: 7, // TODO: Implementar sistema de streaks baseado no histórico
          achievements: 15, // TODO: Contar achievements reais
          questionsAnswered: userHistory.length, // Baseado no histórico de atividades
        });
        
      } catch (error) {
        console.error('❌ Erro ao carregar estatísticas:', error);
        // Se houver erro, usar valores padrão
        setStats({
          currentLevel: 1,
          totalXP: 0,
          xpToNextLevel: 100,
          studyStreak: 0,
          achievements: 0,
          questionsAnswered: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    loadStats();
    
    // Escutar eventos de XP para atualizar em tempo real
    const handleXPGained = () => {
      console.log('🎉 Dashboard detectou XP ganho - recarregando stats...');
      loadStats();
    };

    window.addEventListener('xpGained', handleXPGained);
    
    return () => {
      window.removeEventListener('xpGained', handleXPGained);
    };
  }, [currentUser]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="theme-card rounded-lg p-4 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
                <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-12"></div>
                <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
              </div>
              <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* XP Total e Nível Geral */}
      <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 p-4 hover:border-purple-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-400/20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400 mb-1">XP Total</p>
              <p className="text-xl font-bold text-white tracking-tight">{stats.totalXP}</p>
              <div className="flex items-center space-x-1 mt-1">
                <Star className="h-3 w-3 text-yellow-400" />
                <span className="text-xs font-medium text-purple-400">
                  Nível {stats.currentLevel}
                </span>
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-lg p-2">
              <Zap className="h-5 w-5 text-purple-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Questões */}
      <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 p-4 hover:border-orange-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-400/20">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400 mb-1">Questões</p>
              <div className="flex items-center space-x-2">
                <p className="text-xl font-bold text-white tracking-tight">
                  {Math.floor(stats.questionsAnswered)}
                </p>
                <span className="text-xs font-medium text-orange-400">
                  Nv.{stats.currentLevel}
                </span>
              </div>
              <p className="text-xs text-orange-400 mt-1">
                {stats.totalXP} XP
              </p>
            </div>
            <div className="bg-orange-500/20 rounded-lg p-2">
              <HelpCircle className="h-5 w-5 text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Sequência de Estudo */}
      <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 p-4 hover:border-orange-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-400/20">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400 mb-1">Sequência de Estudo</p>
              <div className="flex items-center space-x-1">
                <p className="text-xl font-bold text-white tracking-tight">{stats.studyStreak}</p>
                <span className="text-lg">🔥</span>
              </div>
              <p className="text-xs text-orange-400 mt-1">+2 vs ontem</p>
            </div>
            <div className="bg-orange-500/20 rounded-lg p-2">
              <Clock className="h-5 w-5 text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Conquistas */}
      <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 p-4 hover:border-yellow-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/20">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400 mb-1">Conquistas</p>
              <p className="text-xl font-bold text-white tracking-tight">{stats.achievements}</p>
              <p className="text-xs text-yellow-400 mt-1">3 desbloqueadas hoje</p>
            </div>
            <div className="bg-yellow-500/20 rounded-lg p-2">
              <Trophy className="h-5 w-5 text-yellow-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}