import { Clock, Zap, Target, Database } from 'lucide-react';
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

  // Função para obter cores por categoria
  const getCategoryColor = (category: string) => {
    const categoryStr = Array.isArray(category) ? category[0] : category;
    const colors: Record<string, { bg: string; text: string; border: string; glow: string }> = {
      'Neonatologia': { bg: 'bg-pink-500/20', text: 'text-pink-400', border: 'border-pink-500/30', glow: 'from-pink-400 to-pink-600' },
      'Cardiologia': { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30', glow: 'from-red-400 to-red-600' },
      'Pneumologia': { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30', glow: 'from-blue-400 to-blue-600' },
      'Neurologia': { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/30', glow: 'from-purple-400 to-purple-600' },
      'Pediatria': { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30', glow: 'from-green-400 to-green-600' },
      'default': { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/30', glow: 'from-cyan-400 to-cyan-600' }
    };
    
    return colors[categoryStr] || colors.default;
  };

  const categoryColors = getCategoryColor(Array.isArray(question.category) ? question.category[0] : question.category);

  return (
    <div className={`relative ${className}`}>
      {/* Minimal Container */}
      <div className="bg-slate-800/40 border border-slate-700/30 rounded-lg p-3 backdrop-blur-sm">
        {/* Header Row */}
        <div className="flex items-center justify-between gap-3 mb-2">
          <h3 className="text-sm font-medium text-slate-200 line-clamp-1 flex-1">
            {question.title}
          </h3>
          
          {/* Compact Neural Indicator */}
          <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
            <Zap className="w-3 h-3 text-white" />
          </div>
        </div>

        {/* Compact Tags Row */}
        <div className="flex items-center flex-wrap gap-2 text-xs">
          {/* Category */}
          <span className={`${categoryColors.bg} ${categoryColors.text} border ${categoryColors.border} px-2 py-1 rounded-md font-medium flex items-center gap-1`}>
            <Target className="w-3 h-3" />
            {getCategoryDisplay(question.category)}
          </span>

          {/* Difficulty */}
          <div className="scale-75 origin-left -ml-1">
            <DifficultyBadge difficulty={question.difficulty} />
          </div>

          {/* Exam */}
          <span className="bg-purple-500/20 border border-purple-500/30 text-purple-300 px-2 py-1 rounded-md font-medium flex items-center gap-1">
            <Database className="w-3 h-3" />
            {question.exam}
          </span>

          {/* Time */}
          {showTimeEstimate && (
            <span className="bg-teal-500/20 border border-teal-500/30 text-teal-300 px-2 py-1 rounded-md font-medium flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {question.timeEstimate}min
            </span>
          )}
        </div>

        {/* Tags Section */}
        {showTags && question.tags && question.tags.length > 0 && (
          <div className="mt-2 pt-2 border-t border-slate-700/30">
            <QuestionTags tags={question.tags} />
          </div>
        )}
      </div>
    </div>
  );
}