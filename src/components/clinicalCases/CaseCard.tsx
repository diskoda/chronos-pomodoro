import { Clock } from 'lucide-react';
import { DifficultyBadge, TopicTags } from '../common';
import type { CaseBase } from './types';

interface CaseCardProps {
  case: CaseBase;
  onSelect: (id: number) => void;
  variant?: 'basic' | 'clinical' | 'specialty';
  className?: string;
}

export default function CaseCard({ 
  case: clinicalCase, 
  onSelect, 
  variant = 'basic',
  className = ""
}: CaseCardProps) {
  const getTopicVariant = (variant: string) => {
    switch (variant) {
      case 'basic': return 'blue';
      case 'clinical': return 'purple';
      case 'specialty': return 'orange';
      default: return 'blue';
    }
  };

  return (
    <div
      onClick={() => onSelect(clinicalCase.id)}
      className={`
        theme-card rounded-lg p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:theme-shadow-lg border hover:border-blue-500
        ${clinicalCase.completed ? 'border-green-500 bg-green-50 dark:bg-green-950' : ''}
        ${className}
      `}
    >
      
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold theme-text-primary mb-2">
            {clinicalCase.title}
          </h3>
          <div className="flex items-center space-x-2">
            <DifficultyBadge 
              difficulty={clinicalCase.difficulty as any}
            />
            <span className="text-xs theme-text-tertiary flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {clinicalCase.duration}
            </span>
          </div>
        </div>
        
        {clinicalCase.completed && (
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">✓</span>
          </div>
        )}
      </div>

      {/* Description */}
      <p className="theme-text-secondary text-sm leading-relaxed mb-4">
        {clinicalCase.description}
      </p>

      {/* Topics */}
      <TopicTags 
        topics={clinicalCase.topics}
        variant={getTopicVariant(variant) as any}
      />
    </div>
  );
}