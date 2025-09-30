import { Clock } from 'lucide-react';
import type { Question } from '../../data/types/Question';
import DifficultyBadge from '../common/DifficultyBadge';
import QuestionTags from '../common/QuestionTags';

interface QuestionInfoProps {
  question: Question;
  showTags?: boolean;
  showTimeEstimate?: boolean;
  className?: string;
}

export default function QuestionInfo({ 
  question, 
  showTags = true, 
  showTimeEstimate = true,
  className = ""
}: QuestionInfoProps) {
  const getCategoryDisplay = (category: string | string[]) => {
    if (Array.isArray(category)) {
      return category.join(' • ');
    }
    return category;
  };

  return (
    <div className={`theme-card rounded-lg p-6 ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h1 className="text-2xl font-bold theme-text-primary mb-2">
            {question.title}
          </h1>
          <div className="flex items-center space-x-4 flex-wrap gap-2">
            <span className="text-sm theme-text-secondary">{getCategoryDisplay(question.category)}</span>
            <DifficultyBadge difficulty={question.difficulty} />
            <span className="text-sm theme-text-secondary">{question.exam}</span>
            {showTimeEstimate && (
              <div className="flex items-center text-sm theme-text-tertiary">
                <Clock className="h-4 w-4 mr-1" />
                {question.timeEstimate} min
              </div>
            )}
          </div>
        </div>
      </div>

      {showTags && question.tags.length > 0 && (
        <QuestionTags tags={question.tags} className="mb-4" />
      )}
    </div>
  );
}