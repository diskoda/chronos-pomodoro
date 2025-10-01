import { useState } from 'react';
import { 
  Flame, 
  Target, 
  Award, 
  CheckCircle,
  Clock,
  Book
} from 'lucide-react';

interface Streak {
  type: 'study' | 'questions' | 'cases';
  icon: React.ReactNode;
  title: string;
  current: number;
  best: number;
  color: string;
  bgColor: string;
  description: string;
}

export default function StreaksAndGoals() {
  const [selectedTab, setSelectedTab] = useState<'streaks' | 'goals'>('streaks');

  const streaks: Streak[] = [
    {
      type: 'study',
      icon: <Flame className="h-5 w-5" />,
      title: 'Dias de Estudo',
      current: 7,
      best: 15,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100/20 dark:bg-orange-900/40',
      description: 'Estudou por pelo menos 30min'
    },
    {
      type: 'questions',
      icon: <Target className="h-5 w-5" />,
      title: 'Questões Diárias',
      current: 3,
      best: 12,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100/20 dark:bg-blue-900/40',
      description: 'Respondeu pelo menos 10 questões'
    },
    {
      type: 'cases',
      icon: <Award className="h-5 w-5" />,
      title: 'Casos Clínicos',
      current: 2,
      best: 8,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100/20 dark:bg-purple-900/40',
      description: 'Completou pelo menos 1 caso'
    }
  ];

  const goals = [
    {
      id: 1,
      title: 'Meta Semanal de Estudo',
      description: '20 horas de estudo esta semana',
      current: 14.5,
      target: 20,
      unit: 'horas',
      icon: <Clock className="h-5 w-5" />,
      color: 'text-blue-600 dark:text-blue-400',
      deadline: '2 dias restantes',
      completed: false
    },
    {
      id: 2,
      title: 'Questões do Mês',
      description: '500 questões respondidas este mês',
      current: 347,
      target: 500,
      unit: 'questões',
      icon: <Target className="h-5 w-5" />,
      color: 'text-green-600 dark:text-green-400',
      deadline: '8 dias restantes',
      completed: false
    },
    {
      id: 3,
      title: 'Especialização Completada',
      description: 'Pediatria Básica - Módulo 3',
      current: 8,
      target: 10,
      unit: 'tópicos',
      icon: <Book className="h-5 w-5" />,
      color: 'text-purple-600 dark:text-purple-400',
      deadline: 'Sem prazo',
      completed: false
    }
  ];

  const getStreakEmoji = (days: number) => {
    if (days >= 30) return '🔥🔥🔥';
    if (days >= 14) return '🔥🔥';
    if (days >= 7) return '🔥';
    if (days >= 3) return '⚡';
    return '💪';
  };

  return (
    <div className="theme-card rounded-lg">
      {/* Header with Tabs */}
      <div className="p-6 border-b theme-border">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold theme-text-primary">Sequências & Metas</h3>
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setSelectedTab('streaks')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                selectedTab === 'streaks'
                  ? 'bg-white dark:bg-gray-700 theme-text-primary shadow-sm'
                  : 'theme-text-secondary hover:theme-text-primary'
              }`}
            >
              Sequências
            </button>
            <button
              onClick={() => setSelectedTab('goals')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                selectedTab === 'goals'
                  ? 'bg-white dark:bg-gray-700 theme-text-primary shadow-sm'
                  : 'theme-text-secondary hover:theme-text-primary'
              }`}
            >
              Metas
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {selectedTab === 'streaks' ? (
          <div className="space-y-4">
            {streaks.map((streak) => (
              <div key={streak.type} className="flex items-center justify-between p-4 theme-bg-secondary rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`${streak.bgColor} backdrop-blur-sm rounded-full p-2 border border-opacity-30`}>
                    <div className={streak.color}>{streak.icon}</div>
                  </div>
                  <div>
                    <h4 className="font-medium theme-text-primary">{streak.title}</h4>
                    <p className="text-xs theme-text-secondary">{streak.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{getStreakEmoji(streak.current)}</span>
                    <div>
                      <p className="text-xl font-bold theme-text-primary">{streak.current}</p>
                      <p className="text-xs theme-text-secondary">Melhor: {streak.best}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {goals.map((goal) => {
              const progressPercentage = (goal.current / goal.target) * 100;
              const isCompleted = goal.current >= goal.target;
              
              return (
                <div key={goal.id} className="p-4 theme-bg-secondary rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start space-x-3">
                      <div className={`bg-gray-100 dark:bg-gray-800 rounded-full p-2`}>
                        <div className={goal.color}>{goal.icon}</div>
                      </div>
                      <div>
                        <h4 className="font-medium theme-text-primary flex items-center">
                          {goal.title}
                          {isCompleted && <CheckCircle className="h-4 w-4 text-green-500 ml-2" />}
                        </h4>
                        <p className="text-xs theme-text-secondary">{goal.description}</p>
                        <p className="text-xs theme-text-tertiary mt-1">{goal.deadline}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold theme-text-primary">
                        {goal.current}/{goal.target}
                      </p>
                      <p className="text-xs theme-text-secondary">{goal.unit}</p>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        isCompleted 
                          ? 'bg-green-500' 
                          : 'bg-gradient-to-r from-blue-500 to-purple-500'
                      }`}
                      style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs theme-text-secondary">
                      {progressPercentage.toFixed(1)}% concluído
                    </span>
                    {!isCompleted && (
                      <span className="text-xs theme-text-secondary">
                        {(goal.target - goal.current).toFixed(1)} {goal.unit} restantes
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}