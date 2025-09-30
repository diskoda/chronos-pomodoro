import { BookOpen, User, Clock } from 'lucide-react';
import type { CaseBase, StatItem } from './types';

interface StatsOverviewProps {
  cases: CaseBase[];
  customStats?: StatItem[];
  className?: string;
}

export default function StatsOverview({ cases, customStats, className = "" }: StatsOverviewProps) {
  const completedCases = cases.filter(c => c.completed).length;
  const averageTime = cases.length > 0 
    ? Math.round(cases.reduce((acc, c) => acc + parseInt(c.duration), 0) / cases.length)
    : 0;
  const progressPercentage = cases.length > 0 
    ? Math.round((completedCases / cases.length) * 100)
    : 0;

  const defaultStats: StatItem[] = [
    {
      icon: BookOpen,
      iconColor: 'text-blue-600',
      value: cases.length,
      label: 'Total de Casos'
    },
    {
      icon: User,
      iconColor: 'text-green-600',
      value: completedCases,
      label: 'Concluídos'
    },
    {
      icon: Clock,
      iconColor: 'text-orange-600',
      value: `${averageTime}min`,
      label: 'Tempo Médio'
    },
    {
      icon: () => (
        <div className="h-8 w-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
          <span className="text-purple-600 dark:text-purple-400 font-bold">%</span>
        </div>
      ),
      iconColor: '',
      value: `${progressPercentage}%`,
      label: 'Progresso'
    }
  ];

  const statsToShow = customStats || defaultStats;

  return (
    <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 ${className}`}>
      {statsToShow.map((stat, index) => {
        const IconComponent = stat.icon;
        
        return (
          <div key={index} className="theme-card rounded-lg p-4">
            <div className="flex items-center">
              {stat.iconColor ? (
                <IconComponent className={`h-8 w-8 ${stat.iconColor} mr-3`} />
              ) : (
                <div className="mr-3">
                  <IconComponent />
                </div>
              )}
              <div>
                <p className="text-2xl font-bold theme-text-primary">{stat.value}</p>
                <p className="text-sm theme-text-secondary">{stat.label}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}