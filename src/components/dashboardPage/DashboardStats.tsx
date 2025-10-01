import { Clock, BookOpen, HelpCircle, Stethoscope, Star, Zap, Trophy, TrendingUp } from 'lucide-react';

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* XP and Level Card */}
      <div className="theme-card rounded-lg p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium theme-text-secondary">XP Total</p>
            <p className="text-3xl font-bold theme-text-primary">2,350</p>
            <div className="flex items-center space-x-2 mt-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Nível 12</span>
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-3">
            <Zap className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>

      {/* Study Streak Card */}
      <div className="theme-card rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium theme-text-secondary">Sequência de Estudo</p>
            <div className="flex items-center space-x-2">
              <p className="text-3xl font-bold theme-text-primary">7</p>
              <span className="text-2xl">🔥</span>
            </div>
            <p className="text-sm text-orange-600 dark:text-orange-400">+2 vs ontem</p>
          </div>
          <div className="bg-orange-100/20 dark:bg-orange-900/40 backdrop-blur-sm rounded-full p-3 border border-orange-200/30 dark:border-orange-800/30">
            <Clock className="h-6 w-6 text-orange-600 dark:text-orange-400" />
          </div>
        </div>
      </div>

      {/* Accuracy Card */}
      <div className="theme-card rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium theme-text-secondary">Taxa de Acerto</p>
            <p className="text-3xl font-bold theme-text-primary">87%</p>
            <p className="text-sm text-green-600 dark:text-green-400">+5% esta semana</p>
          </div>
          <div className="bg-green-100/20 dark:bg-green-900/40 backdrop-blur-sm rounded-full p-3 border border-green-200/30 dark:border-green-800/30">
            <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
        </div>
      </div>

      {/* Achievements Card */}
      <div className="theme-card rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium theme-text-secondary">Conquistas</p>
            <p className="text-3xl font-bold theme-text-primary">15</p>
            <p className="text-sm text-yellow-600 dark:text-yellow-400">3 desbloqueadas hoje</p>
          </div>
          <div className="bg-yellow-100/20 dark:bg-yellow-900/40 backdrop-blur-sm rounded-full p-3 border border-yellow-200/30 dark:border-yellow-800/30">
            <Trophy className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Secondary Stats Row */}
      <div className="theme-card rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium theme-text-secondary">Horas de Estudo</p>
            <p className="text-3xl font-bold theme-text-primary">24.5h</p>
            <p className="text-sm text-blue-600 dark:text-blue-400">Meta: 30h/semana</p>
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