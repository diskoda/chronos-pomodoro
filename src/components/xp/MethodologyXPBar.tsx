import { BookOpen, Heart, Zap, Star, Trophy, TrendingUp } from 'lucide-react';
import type { StudyMethodology, MethodologyLevel } from '../../types/xpMethodologies';

interface MethodologyXPBarProps {
  methodology: StudyMethodology;
  level: MethodologyLevel;
  title: string;
  showDetails?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const methodologyConfig = {
  clinical_cases: {
    name: 'Casos Clínicos',
    icon: Heart,
    color: 'bg-red-500',
    lightColor: 'bg-red-100',
    textColor: 'text-red-700',
    description: 'Diagnósticos e análises clínicas'
  },
  questions: {
    name: 'Banco de Questões',
    icon: BookOpen,
    color: 'bg-blue-500',
    lightColor: 'bg-blue-100',
    textColor: 'text-blue-700',
    description: 'Resolução de questões e provas'
  },
  flashcards: {
    name: 'Flashcards',
    icon: Zap,
    color: 'bg-purple-500',
    lightColor: 'bg-purple-100',
    textColor: 'text-purple-700',
    description: 'Revisão e memorização'
  }
};

export default function MethodologyXPBar({ 
  methodology, 
  level, 
  title,
  showDetails = false, 
  size = 'md',
  className = '' 
}: MethodologyXPBarProps) {
  const config = methodologyConfig[methodology];
  const Icon = config.icon;
  
  // Calcular progresso para próximo nível
  const progressPercentage = level.xpToNextLevel > 0 
    ? Math.min(100, (level.currentXP / (level.currentXP + level.xpToNextLevel)) * 100)
    : 100;

  // Definir tamanhos baseados na prop size
  const sizeClasses = {
    sm: {
      container: 'p-3',
      icon: 'w-6 h-6',
      title: 'text-sm',
      level: 'text-lg',
      progress: 'h-2',
      text: 'text-xs'
    },
    md: {
      container: 'p-4',
      icon: 'w-8 h-8',
      title: 'text-base',
      level: 'text-xl',
      progress: 'h-3',
      text: 'text-sm'
    },
    lg: {
      container: 'p-6',
      icon: 'w-10 h-10',
      title: 'text-lg',
      level: 'text-2xl',
      progress: 'h-4',
      text: 'text-base'
    }
  };

  const sizes = sizeClasses[size];

  return (
    <div className={`theme-bg-primary rounded-lg border theme-border shadow-sm ${sizes.container} ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`${config.lightColor} ${config.textColor} p-2 rounded-lg`}>
            <Icon className={sizes.icon} />
          </div>
          <div>
            <h3 className={`font-semibold theme-text-primary ${sizes.title}`}>
              {config.name}
            </h3>
            <p className={`theme-text-secondary ${sizes.text}`}>
              {config.description}
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <div className={`font-bold theme-text-primary ${sizes.level}`}>
            Nível {level.currentLevel}
          </div>
          <div className={`theme-text-secondary ${sizes.text}`}>
            {title}
          </div>
        </div>
      </div>

      {/* Barra de Progresso */}
      <div className="mb-3">
        <div className="flex justify-between mb-1">
          <span className={`${sizes.text} theme-text-secondary`}>
            {level.currentXP.toLocaleString()} XP
          </span>
          <span className={`${sizes.text} theme-text-secondary`}>
            {level.currentLevel < 50 ? `${level.xpToNextLevel.toLocaleString()} para próximo nível` : 'Nível Máximo'}
          </span>
        </div>
        
        <div className={`w-full ${config.lightColor} rounded-full ${sizes.progress}`}>
          <div
            className={`${config.color} ${sizes.progress} rounded-full transition-all duration-500 ease-out`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Detalhes Expandidos */}
      {showDetails && (
        <div className="pt-3 border-t theme-border">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className={`font-semibold theme-text-primary ${sizes.text}`}>
                {level.totalXP.toLocaleString()}
              </div>
              <div className={`theme-text-secondary ${sizes.text}`}>
                XP Total
              </div>
            </div>
            
            <div className="text-center">
              <div className={`font-semibold theme-text-primary ${sizes.text}`}>
                {Math.round(progressPercentage)}%
              </div>
              <div className={`theme-text-secondary ${sizes.text}`}>
                Progresso
              </div>
            </div>
          </div>
          
          {level.lastLevelUp && (
            <div className="mt-3 pt-3 border-t theme-border">
              <div className="flex items-center justify-center space-x-2">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span className={`theme-text-secondary ${sizes.text}`}>
                  Último aumento: {level.lastLevelUp.toDate().toLocaleDateString()}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Componente para exibir todas as metodologias
interface MethodologyXPOverviewProps {
  methodologyLevels: Record<StudyMethodology, MethodologyLevel>;
  methodologyTitles: Record<StudyMethodology, string>;
  overallLevel?: number;
  totalXP?: number;
  showDetails?: boolean;
  className?: string;
}

export function MethodologyXPOverview({ 
  methodologyLevels, 
  methodologyTitles,
  overallLevel = 1,
  totalXP = 0,
  showDetails = false,
  className = '' 
}: MethodologyXPOverviewProps) {
  const methodologies: StudyMethodology[] = ['clinical_cases', 'questions', 'flashcards'];
  
  return (
    <div className={className}>
      {/* Nível Geral */}
      <div className="theme-bg-primary rounded-lg border theme-border shadow-sm p-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-lg">
              <Star className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold theme-text-primary">
                Nível Geral {overallLevel}
              </h2>
              <p className="theme-text-secondary">
                Combinação de todas as metodologias
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold theme-text-primary">
              {totalXP.toLocaleString()}
            </div>
            <div className="theme-text-secondary text-sm">
              XP Total
            </div>
          </div>
        </div>
      </div>

      {/* Metodologias Individuais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {methodologies.map((methodology) => (
          <MethodologyXPBar
            key={methodology}
            methodology={methodology}
            level={methodologyLevels[methodology]}
            title={methodologyTitles[methodology]}
            showDetails={showDetails}
            size="md"
          />
        ))}
      </div>
    </div>
  );
}

// Componente compacto para dashboard
interface MethodologyXPCompactProps {
  methodologyLevels: Record<StudyMethodology, MethodologyLevel>;
  favoriteMethodology: StudyMethodology;
  className?: string;
}

export function MethodologyXPCompact({ 
  methodologyLevels, 
  favoriteMethodology,
  className = '' 
}: MethodologyXPCompactProps) {
  const methodologies: StudyMethodology[] = ['clinical_cases', 'questions', 'flashcards'];
  
  return (
    <div className={`theme-bg-primary rounded-lg border theme-border shadow-sm p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold theme-text-primary">Progresso por Metodologia</h3>
        <TrendingUp className="w-5 h-5 theme-text-secondary" />
      </div>
      
      <div className="space-y-3">
        {methodologies.map((methodology) => {
          const config = methodologyConfig[methodology];
          const level = methodologyLevels[methodology];
          const Icon = config.icon;
          const isFavorite = methodology === favoriteMethodology;
          
          const progressPercentage = level.xpToNextLevel > 0 
            ? Math.min(100, (level.currentXP / (level.currentXP + level.xpToNextLevel)) * 100)
            : 100;
          
          return (
            <div key={methodology} className="flex items-center space-x-3">
              <div className={`${config.lightColor} ${config.textColor} p-1.5 rounded`}>
                <Icon className="w-4 h-4" />
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium theme-text-primary flex items-center">
                    {config.name}
                    {isFavorite && (
                      <Star className="w-3 h-3 text-yellow-500 ml-1 fill-current" />
                    )}
                  </span>
                  <span className="text-xs theme-text-secondary">
                    Nível {level.currentLevel}
                  </span>
                </div>
                
                <div className={`w-full ${config.lightColor} rounded-full h-1.5`}>
                  <div
                    className={`${config.color} h-1.5 rounded-full transition-all duration-300`}
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}