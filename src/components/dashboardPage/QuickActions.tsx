import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus, GitBranch, ShoppingBag, LogOut, Brain, Stethoscope, HelpCircle, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '../../contexts/LoadingContext';
import { useAuth } from '../../contexts/AuthContext';
import { MethodologyXPService } from '../../services/methodologyXPService';

interface QuickActionsProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

interface MethodologyQuickStat {
  name: string;
  icon: React.ReactNode;
  progress: number;
  color: string;
  route: string;
}

export default function QuickActions({ isCollapsed, onToggle }: QuickActionsProps) {
  const navigate = useNavigate();
  const { showLoading } = useLoading();
  const { currentUser } = useAuth();
  const [quickStats, setQuickStats] = useState<MethodologyQuickStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuickStats = async () => {
      if (!currentUser) return;
      
      try {
        const userStats = await MethodologyXPService.getUserMethodologyStats(currentUser.uid);
        
        const stats: MethodologyQuickStat[] = [
          {
            name: 'Casos Clínicos',
            icon: <Stethoscope className="h-3 w-3" />,
            progress: Math.min((userStats.methodologyStats.clinical_cases.currentLevel / 10) * 100, 100),
            color: 'text-purple-600 dark:text-purple-400',
            route: '/clinical-cases'
          },
          {
            name: 'Questões',
            icon: <HelpCircle className="h-3 w-3" />,
            progress: Math.min((userStats.methodologyStats.questions.currentLevel / 10) * 100, 100),
            color: 'text-yellow-600 dark:text-yellow-400',
            route: '/questions'
          },
          {
            name: 'Flashcards',
            icon: <BookOpen className="h-3 w-3" />,
            progress: Math.min((userStats.methodologyStats.flashcards.currentLevel / 10) * 100, 100),
            color: 'text-green-600 dark:text-green-400',
            route: '/flashcards'
          }
        ];

        setQuickStats(stats);
      } catch (error) {
        console.error('Erro ao carregar stats rápidas:', error);
        // Fallback com dados estáticos
        setQuickStats([
          {
            name: 'Casos Clínicos',
            icon: <Stethoscope className="h-3 w-3" />,
            progress: 25,
            color: 'text-purple-600 dark:text-purple-400',
            route: '/clinical-cases'
          },
          {
            name: 'Questões',
            icon: <HelpCircle className="h-3 w-3" />,
            progress: 15,
            color: 'text-yellow-600 dark:text-yellow-400',
            route: '/questions'
          },
          {
            name: 'Flashcards',
            icon: <BookOpen className="h-3 w-3" />,
            progress: 10,
            color: 'text-green-600 dark:text-green-400',
            route: '/flashcards'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadQuickStats();
  }, [currentUser]);

  const handleNavigation = (path: string, message: string) => {
    showLoading(message, 'minimal');
    setTimeout(() => {
      navigate(path);
    }, 300);
  };

  const handleMethodologyNavigation = (stat: MethodologyQuickStat) => {
    handleNavigation(stat.route, `Carregando ${stat.name}...`);
  };

  return (
    <div className={`fixed right-0 top-20 h-full theme-bg-primary theme-shadow-lg theme-border-secondary border-l transition-all duration-300 z-40 ${
      isCollapsed ? 'w-16' : 'w-80'
    }`}>
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute -left-3 top-4 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors shadow-md"
      >
        {isCollapsed ? (
          <ChevronLeft className="h-3 w-3" />
        ) : (
          <ChevronRight className="h-3 w-3" />
        )}
      </button>

      {/* Content */}
      <div className="p-4 h-full overflow-y-auto">
        {!isCollapsed ? (
          // Expanded View
          <>
            <div className="border-b theme-border pb-4 mb-4">
              <h3 className="font-semibold theme-text-primary">Ações Rápidas</h3>
              <p className="text-xs theme-text-tertiary mt-1">Acesso rápido às principais funcionalidades</p>
            </div>
            
            <div className="space-y-3">
              <button 
                onClick={() => handleNavigation('/study', 'Iniciando estudos...')}
                className="w-full theme-button-primary py-3 px-4 rounded-lg font-medium flex items-center space-x-3"
              >
                <Plus className="h-5 w-5" />
                <span>Iniciar Estudos</span>
              </button>
              
              {/* Methodology Quick Access */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium theme-text-primary">Metodologias</h4>
                {quickStats.map((stat) => (
                  <button
                    key={stat.name}
                    onClick={() => handleMethodologyNavigation(stat)}
                    className="w-full theme-bg-secondary theme-text-primary py-2 px-3 rounded-lg font-medium hover:theme-bg-tertiary transition-colors flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center space-x-2">
                      <span className={stat.color}>{stat.icon}</span>
                      <span>{stat.name}</span>
                    </div>
                    <span className="text-xs theme-text-secondary">
                      {Math.round(stat.progress)}%
                    </span>
                  </button>
                ))}
              </div>
              
              <button 
                onClick={() => handleNavigation('/test/flow', 'Carregando teste...')}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center space-x-3"
              >
                <Brain className="h-5 w-5" />
                <span>🧪 Testar Fluxo Dr. Skoda</span>
              </button>
              
              <button 
                onClick={() => handleNavigation('/question/1', 'Carregando questão...')}
                className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center space-x-3"
              >
                <Brain className="h-5 w-5" />
                <span>🚀 Questão 1 Direta</span>
              </button>
              
              <button className="w-full theme-bg-secondary theme-text-primary py-3 px-4 rounded-lg font-medium hover:theme-bg-tertiary transition-colors flex items-center space-x-3">
                <GitBranch className="h-5 w-5" />
                <span>Árvore de Conhecimento</span>
              </button>
              
              <button className="w-full theme-bg-secondary theme-text-primary py-3 px-4 rounded-lg font-medium hover:theme-bg-tertiary transition-colors flex items-center space-x-3">
                <ShoppingBag className="h-5 w-5" />
                <span>Lojinha #PéNaPED</span>
              </button>
              
              <button className="w-full theme-bg-secondary theme-text-primary py-3 px-4 rounded-lg font-medium hover:theme-bg-tertiary transition-colors flex items-center space-x-3">
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>

            {/* Enhanced Quick Stats */}
            {!loading && (
              <div className="mt-6 pt-4 border-t theme-border">
                <h4 className="font-medium theme-text-primary text-sm mb-3">Progresso por Metodologia</h4>
                <div className="space-y-3">
                  {quickStats.map((stat) => (
                    <div key={stat.name} className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center space-x-1">
                          <span className={stat.color}>{stat.icon}</span>
                          <span className="theme-text-secondary">{stat.name}</span>
                        </div>
                        <span className={`font-medium ${stat.color}`}>
                          {Math.round(stat.progress)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                        <div 
                          className={`h-1 rounded-full transition-all duration-500 ${
                            stat.color.includes('purple') ? 'bg-purple-500' :
                            stat.color.includes('yellow') ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`}
                          style={{ width: `${stat.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          // Collapsed View
          <div className="flex flex-col items-center space-y-4 pt-4">
            <button
              onClick={() => handleNavigation('/study', 'Iniciando estudos...')}
              className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
              title="Iniciar Estudos"
            >
              <Plus className="h-5 w-5" />
            </button>
            
            {/* Methodology Quick Icons */}
            {quickStats.map((stat) => (
              <button
                key={stat.name}
                onClick={() => handleMethodologyNavigation(stat)}
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors relative ${
                  stat.color.includes('purple') ? 'bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/30 dark:hover:bg-purple-900/50' :
                  stat.color.includes('yellow') ? 'bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:hover:bg-yellow-900/50' :
                  'bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-900/50'
                }`}
                title={`${stat.name} - ${Math.round(stat.progress)}%`}
              >
                <span className={stat.color}>{stat.icon}</span>
                {/* Progress indicator */}
                <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center text-[8px] font-bold" 
                     style={{ 
                       backgroundColor: stat.color.includes('purple') ? '#8b5cf6' :
                                       stat.color.includes('yellow') ? '#eab308' : '#10b981',
                       color: 'white'
                     }}>
                  {Math.round(stat.progress / 10)}
                </div>
              </button>
            ))}
            
            <button
              onClick={() => handleNavigation('/test/flow', 'Carregando teste...')}
              className="w-10 h-10 bg-green-600 text-white rounded-lg flex items-center justify-center hover:bg-green-700 transition-colors"
              title="🧪 Testar Fluxo Dr. Skoda"
            >
              <Brain className="h-5 w-5" />
            </button>
            
            <button
              onClick={() => handleNavigation('/question/1', 'Carregando questão...')}
              className="w-10 h-10 bg-orange-600 text-white rounded-lg flex items-center justify-center hover:bg-orange-700 transition-colors"
              title="🚀 Questão 1 Direta"
            >
              <Brain className="h-5 w-5" />
            </button>
            
            <button
              className="w-10 h-10 theme-bg-secondary theme-text-primary rounded-lg flex items-center justify-center hover:theme-bg-tertiary transition-colors"
              title="Árvore de Conhecimento"
            >
              <GitBranch className="h-5 w-5" />
            </button>
            
            <button
              className="w-10 h-10 theme-bg-secondary theme-text-primary rounded-lg flex items-center justify-center hover:theme-bg-tertiary transition-colors"
              title="Lojinha #PéNaPED"
            >
              <ShoppingBag className="h-5 w-5" />
            </button>
            
            <button
              className="w-10 h-10 theme-bg-secondary theme-text-primary rounded-lg flex items-center justify-center hover:theme-bg-tertiary transition-colors"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}