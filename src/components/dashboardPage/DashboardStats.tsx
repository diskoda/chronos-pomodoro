import { Clock, BookOpen, HelpCircle, Stethoscope } from 'lucide-react';

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
          <div className="bg-blue-100/20 dark:bg-blue-900/40 backdrop-blur-sm rounded-full p-3 border border-blue-200/30 dark:border-blue-800/30">
            <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </div>

      <div className="theme-card rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium theme-text-secondary">Flashcards Estudados</p>
            <p className="text-3xl font-bold theme-text-primary">124</p>
            <p className="text-sm text-green-600 dark:text-green-400">15 revisados hoje</p>
          </div>
          <div className="bg-green-100/20 dark:bg-green-900/40 backdrop-blur-sm rounded-full p-3 border border-green-200/30 dark:border-green-800/30">
            <BookOpen className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
        </div>
      </div>

      <div className="theme-card rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium theme-text-secondary">Questões Respondidas</p>
            <p className="text-3xl font-bold theme-text-primary">89</p>
            <p className="text-sm text-yellow-600 dark:text-yellow-400">12 corretas hoje</p>
          </div>
          <div className="bg-yellow-100/20 dark:bg-yellow-900/40 backdrop-blur-sm rounded-full p-3 border border-yellow-200/30 dark:border-yellow-800/30">
            <HelpCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
          </div>
        </div>
      </div>

      <div className="theme-card rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium theme-text-secondary">Casos Clínicos</p>
            <p className="text-3xl font-bold theme-text-primary">18</p>
            <p className="text-sm text-blue-600 dark:text-blue-400">3 concluídos hoje</p>
          </div>
          <div className="bg-purple-100/20 dark:bg-purple-900/40 backdrop-blur-sm rounded-full p-3 border border-purple-200/30 dark:border-purple-800/30">
            <Stethoscope className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
        </div>
      </div>
    </div>
  );
}