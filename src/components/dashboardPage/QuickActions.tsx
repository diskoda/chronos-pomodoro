import { ChevronLeft, ChevronRight, Plus, Clock, BookOpen, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

interface QuickActionsProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function QuickActions({ isCollapsed, onToggle }: QuickActionsProps) {
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
              <Link 
                to="/questions"
                className="w-full theme-button-primary py-3 px-4 rounded-lg font-medium flex items-center space-x-3"
              >
                <Plus className="h-5 w-5" />
                <span>Banco de Questões</span>
              </Link>
              
              <button className="w-full theme-bg-secondary theme-text-primary py-3 px-4 rounded-lg font-medium hover:theme-bg-tertiary transition-colors flex items-center space-x-3">
                <Clock className="h-5 w-5" />
                <span>Cronômetro de Estudo</span>
              </button>
              
              <button className="w-full theme-bg-secondary theme-text-primary py-3 px-4 rounded-lg font-medium hover:theme-bg-tertiary transition-colors flex items-center space-x-3">
                <BookOpen className="h-5 w-5" />
                <span>Material de Apoio</span>
              </button>
              
              <button className="w-full theme-bg-secondary theme-text-primary py-3 px-4 rounded-lg font-medium hover:theme-bg-tertiary transition-colors flex items-center space-x-3">
                <MessageSquare className="h-5 w-5" />
                <span>Fórum de Discussão</span>
              </button>
            </div>

            {/* Additional Quick Stats */}
            <div className="mt-6 pt-4 border-t theme-border">
              <h4 className="font-medium theme-text-primary text-sm mb-3">Status Rápido</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="theme-text-secondary">Casos pendentes</span>
                  <span className="font-medium text-red-600 dark:text-red-400">3</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="theme-text-secondary">Tempo de estudo hoje</span>
                  <span className="font-medium text-blue-600 dark:text-blue-400">2.5h</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="theme-text-secondary">Próxima meta</span>
                  <span className="font-medium text-green-600 dark:text-green-400">78%</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          // Collapsed View
          <div className="flex flex-col items-center space-y-4 pt-4">
            <Link
              to="/questions"
              className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
              title="Banco de Questões"
            >
              <Plus className="h-5 w-5" />
            </Link>
            
            <button
              className="w-10 h-10 theme-bg-secondary theme-text-primary rounded-lg flex items-center justify-center hover:theme-bg-tertiary transition-colors"
              title="Cronômetro de Estudo"
            >
              <Clock className="h-5 w-5" />
            </button>
            
            <button
              className="w-10 h-10 theme-bg-secondary theme-text-primary rounded-lg flex items-center justify-center hover:theme-bg-tertiary transition-colors"
              title="Material de Apoio"
            >
              <BookOpen className="h-5 w-5" />
            </button>
            
            <button
              className="w-10 h-10 theme-bg-secondary theme-text-primary rounded-lg flex items-center justify-center hover:theme-bg-tertiary transition-colors"
              title="Fórum de Discussão"
            >
              <MessageSquare className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}