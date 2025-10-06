import { ChevronLeft, ChevronRight, BookOpen, LogOut, Sparkles, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '../../contexts/LoadingContext';
import { useAuth } from '../../contexts/AuthContext';

interface QuickActionsProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function QuickActions({ isCollapsed, onToggle }: QuickActionsProps) {
  const navigate = useNavigate();
  const { showLoading } = useLoading();
  const { logout } = useAuth();

  const handleNavigation = (path: string, message: string) => {
    showLoading(message, 'minimal');
    setTimeout(() => {
      navigate(path);
    }, 300);
  };

  const handleLogout = async () => {
    showLoading('Fazendo logout...', 'minimal');
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <div className={`fixed right-0 top-20 h-full transition-all duration-300 z-40 ${
      isCollapsed ? 'w-16' : 'w-80'
    }`}>
      {/* Background with gradient and blur */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl border-l border-slate-700/50"></div>
      
      {/* Animated border */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 via-purple-500/20 to-blue-500/20 blur-sm opacity-50"></div>
      
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute -left-4 top-6 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg border border-blue-400/30 z-10"
      >
        {isCollapsed ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </button>

      {/* Content */}
      <div className="relative h-full p-6 overflow-y-auto">
        {!isCollapsed ? (
          // Expanded View
          <>
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <h3 className="font-bold text-white text-lg">Ações Rápidas</h3>
                <Sparkles className="h-4 w-4 text-yellow-400" />
              </div>
              <p className="text-slate-300 text-sm">Seu painel de controle de estudos</p>
            </div>
            
            {/* Action Buttons */}
            <div className="space-y-4">
              {/* Start Study Button */}
              <button 
                onClick={() => handleNavigation('/study', 'Iniciando estudos...')}
                className="group relative w-full overflow-hidden rounded-xl transition-all duration-300 hover:scale-105"
              >
                {/* Button Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 opacity-90 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur group-hover:blur-sm"></div>
                
                {/* Button Content */}
                <div className="relative px-6 py-4 flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-white">Iniciar Estudos</div>
                    <div className="text-xs text-blue-100">Banco de questões USP</div>
                  </div>
                  <Target className="h-4 w-4 text-white/80 group-hover:text-white transition-colors" />
                </div>
                
                {/* Animated border */}
                <div className="absolute inset-0 rounded-xl border border-white/20 group-hover:border-white/40 transition-colors"></div>
              </button>
              
              {/* Logout Button */}
              <button 
                onClick={handleLogout}
                className="group relative w-full overflow-hidden rounded-xl transition-all duration-300 hover:scale-105"
              >
                {/* Button Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-pink-600 opacity-90 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-pink-400/20 blur group-hover:blur-sm"></div>
                
                {/* Button Content */}
                <div className="relative px-6 py-4 flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <LogOut className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-white">Sair</div>
                    <div className="text-xs text-red-100">Finalizar sessão</div>
                  </div>
                </div>
                
                {/* Animated border */}
                <div className="absolute inset-0 rounded-xl border border-white/20 group-hover:border-white/40 transition-colors"></div>
              </button>
            </div>

            {/* Stats Section */}
            <div className="mt-8 pt-6 border-t border-slate-600/50">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-sm font-semibold text-white">35</div>
                  <div className="text-xs text-slate-400">Questões</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-sm font-semibold text-white">80%</div>
                  <div className="text-xs text-slate-400">Precisão</div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-4 border-t border-slate-600/50">
              <div className="text-center">
                <div className="text-xs text-slate-400 mb-1">Última sessão</div>
                <div className="text-sm font-medium text-slate-300">Há 2 horas</div>
              </div>
            </div>
          </>
        ) : (
          // Collapsed View
          <div className="flex flex-col items-center space-y-6 pt-4">
            {/* Start Study Button */}
            <button
              onClick={() => handleNavigation('/study', 'Iniciando estudos...')}
              className="group relative w-12 h-12 overflow-hidden rounded-xl transition-all duration-300 hover:scale-110"
              title="Iniciar Estudos"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:from-blue-500 group-hover:to-purple-500"></div>
              <div className="relative flex items-center justify-center h-full">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div className="absolute inset-0 rounded-xl border border-white/20 group-hover:border-white/40 transition-colors"></div>
            </button>
            
            {/* Stats Dots */}
            <div className="flex flex-col space-y-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" title="35 questões respondidas"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} title="80% de precisão"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} title="Última sessão há 2h"></div>
            </div>
            
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="group relative w-12 h-12 overflow-hidden rounded-xl transition-all duration-300 hover:scale-110 mt-auto"
              title="Sair"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 group-hover:from-red-500 group-hover:to-pink-500"></div>
              <div className="relative flex items-center justify-center h-full">
                <LogOut className="h-6 w-6 text-white" />
              </div>
              <div className="absolute inset-0 rounded-xl border border-white/20 group-hover:border-white/40 transition-colors"></div>
            </button>
          </div>
        )}
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-60" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-pink-400 rounded-full animate-pulse opacity-60" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
}