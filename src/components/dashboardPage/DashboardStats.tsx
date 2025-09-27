import { Clock, BookOpen, Trophy, TrendingUp } from 'lucide-react';

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="theme-card rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium theme-text-secondary">Horas de Estudo</p>
            <p className="text-3xl font-bold theme-text-primary">24.5h</p>
            <p className="text-sm text-green-600 dark:text-green-400">+12% vs semana passada</p>
          </div>
          <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-3">
            <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </div>

      <div className="theme-card rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium theme-text-secondary">Casos Clínicos</p>
            <p className="text-3xl font-bold theme-text-primary">18</p>
            <p className="text-sm text-green-600 dark:text-green-400">3 concluídos hoje</p>
          </div>
          <div className="bg-green-100 dark:bg-green-900 rounded-full p-3">
            <BookOpen className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
        </div>
      </div>

      <div className="theme-card rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium theme-text-secondary">Pontuação</p>
            <p className="text-3xl font-bold theme-text-primary">1,247</p>
            <p className="text-sm text-yellow-600 dark:text-yellow-400">+85 pontos hoje</p>
          </div>
          <div className="bg-yellow-100 dark:bg-yellow-900 rounded-full p-3">
            <Trophy className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
          </div>
        </div>
      </div>

      <div className="theme-card rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium theme-text-secondary">Progresso Mensal</p>
            <p className="text-3xl font-bold theme-text-primary">78%</p>
            <p className="text-sm text-blue-600 dark:text-blue-400">Meta: 80%</p>
          </div>
          <div className="bg-purple-100 dark:bg-purple-900 rounded-full p-3">
            <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
        </div>
      </div>
    </div>
  );
}