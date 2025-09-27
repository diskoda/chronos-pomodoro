import { BookOpen, CheckCircle, BarChart3 } from 'lucide-react';

interface QuestionsStatsProps {
  stats: {
    total: number;
    completed: number;
    avgCorrectRate: number;
  };
}

export default function QuestionsStats({ stats }: QuestionsStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="theme-card rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium theme-text-secondary">Total de Questões</p>
            <p className="text-3xl font-bold theme-text-primary">{stats.total}</p>
          </div>
          <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-3">
            <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </div>

      <div className="theme-card rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium theme-text-secondary">Questões Resolvidas</p>
            <p className="text-3xl font-bold theme-text-primary">{stats.completed}</p>
            <p className="text-sm text-green-600 dark:text-green-400">
              {Math.round((stats.completed / stats.total) * 100)}% completo
            </p>
          </div>
          <div className="bg-green-100 dark:bg-green-900 rounded-full p-3">
            <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
        </div>
      </div>

      <div className="theme-card rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium theme-text-secondary">Taxa de Acerto Média</p>
            <p className="text-3xl font-bold theme-text-primary">{stats.avgCorrectRate}%</p>
          </div>
          <div className="bg-yellow-100 dark:bg-yellow-900 rounded-full p-3">
            <BarChart3 className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
          </div>
        </div>
      </div>
    </div>
  );
}