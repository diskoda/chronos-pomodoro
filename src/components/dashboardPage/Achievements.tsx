import { Trophy, Star, Target } from 'lucide-react';

export default function Achievements() {
  return (
    <div className="theme-card rounded-lg">
      <div className="p-6 border-b theme-border">
        <h3 className="font-semibold theme-text-primary">Conquistas Recentes</h3>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="bg-yellow-100 dark:bg-yellow-900 rounded-full p-2">
            <Trophy className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div>
            <p className="text-sm font-medium theme-text-primary">Expert em Emergências</p>
            <p className="text-xs theme-text-secondary">10 casos consecutivos</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-2">
            <Star className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm font-medium theme-text-primary">Estudante Dedicado</p>
            <p className="text-xs theme-text-secondary">20h de estudo esta semana</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="bg-green-100 dark:bg-green-900 rounded-full p-2">
            <Target className="h-4 w-4 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-sm font-medium theme-text-primary">Meta Mensal</p>
            <p className="text-xs theme-text-secondary">78% concluído</p>
          </div>
        </div>
      </div>
    </div>
  );
}