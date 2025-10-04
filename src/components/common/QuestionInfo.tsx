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
      'Endocrinologia': { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/30', glow: 'from-yellow-400 to-yellow-600' },
      'Pneumologia': { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/30', glow: 'from-cyan-400 to-cyan-600' },
      'Neurologia': { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/30', glow: 'from-purple-400 to-purple-600' },
      'Dermatologia': { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/30', glow: 'from-orange-400 to-orange-600' },
      'Infectologia': { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30', glow: 'from-green-400 to-green-600' },
      'Emergência': { bg: 'bg-red-600/20', text: 'text-red-400', border: 'border-red-600/30', glow: 'from-red-400 to-red-600' },
      'Gastroenterologia': { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/30', glow: 'from-emerald-400 to-emerald-600' },
      'Nefrologia': { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30', glow: 'from-blue-400 to-blue-600' },
      'Hematologia': { bg: 'bg-rose-500/20', text: 'text-rose-400', border: 'border-rose-500/30', glow: 'from-rose-400 to-rose-600' },
      'Oftalmologia': { bg: 'bg-indigo-500/20', text: 'text-indigo-400', border: 'border-indigo-500/30', glow: 'from-indigo-400 to-indigo-600' },
      'Pediatria Geral': { bg: 'bg-pink-500/20', text: 'text-pink-400', border: 'border-pink-500/30', glow: 'from-pink-400 to-pink-600' },
    };
    return colors[categoryStr] || { bg: 'bg-slate-500/20', text: 'text-slate-400', border: 'border-slate-500/30', glow: 'from-slate-400 to-slate-600' };
  };

  const categoryColors = getCategoryColor(getCategoryDisplay(question.category));

  return (
    <div className={`relative ${className}`}>
      {/* Cyber Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/20 via-purple-900/20 to-teal-900/20 rounded-2xl blur-sm opacity-60"></div>
      
      {/* Main Container */}
      <div className="relative bg-gradient-to-r from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-lg border border-purple-500/30 rounded-2xl p-8 shadow-2xl">
        {/* Animated Border Glow */}
        <div className={`absolute -inset-1 bg-gradient-to-r ${categoryColors.glow} opacity-30 rounded-2xl blur animate-pulse`}></div>
        
        <div className="relative">
          {/* Neural Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              {/* Question Title with enhanced styling */}
              <div className="relative mb-4">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-300 bg-clip-text text-transparent leading-tight">
                  {question.title}
                </h1>
                {/* Underline effect */}
                <div className={`mt-2 h-1 bg-gradient-to-r ${categoryColors.glow} rounded-full w-20 opacity-60`}></div>
              </div>

              {/* Enhanced Info Tags */}
              <div className="flex items-center flex-wrap gap-4">
                {/* Category Badge */}
                <div className="relative group">
                  <div className={`absolute -inset-1 bg-gradient-to-r ${categoryColors.glow} rounded-xl blur opacity-0 group-hover:opacity-60 transition-opacity duration-300`}></div>
                  <div className={`relative ${categoryColors.bg} ${categoryColors.text} border ${categoryColors.border} px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 group-hover:scale-105 transition-transform duration-200`}>
                    <Target className="w-4 h-4" />
                    {getCategoryDisplay(question.category)}
                  </div>
                </div>

                {/* Enhanced Difficulty Badge */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-xl blur opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                  <div className="relative">
                    <DifficultyBadge difficulty={question.difficulty} />
                  </div>
                </div>

                {/* Exam Badge */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-purple-600 rounded-xl blur opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                  <div className="relative bg-purple-500/20 border border-purple-500/40 text-purple-300 px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 group-hover:scale-105 transition-transform duration-200">
                    <Database className="w-4 h-4" />
                    {question.exam}
                  </div>
                </div>

                {/* Time Estimate */}
                {showTimeEstimate && (
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-teal-600 rounded-xl blur opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                    <div className="relative bg-teal-500/20 border border-teal-500/40 text-teal-300 px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 group-hover:scale-105 transition-transform duration-200">
                      <Clock className="w-4 h-4 animate-pulse" />
                      {question.timeEstimate} min
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Neural Activity Indicator */}
            <div className="flex flex-col items-center gap-2 ml-6">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-orange-400 to-teal-400 rounded-full blur opacity-60 animate-pulse"></div>
                <div className="relative w-12 h-12 bg-gradient-to-r from-orange-500 to-teal-500 rounded-full flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white animate-pulse" />
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-slate-400 font-medium">NEURAL</div>
                <div className="text-xs text-slate-500 font-medium">ACTIVE</div>
              </div>
            </div>
          </div>

          {/* Enhanced Tags Section */}
          {showTags && question.tags.length > 0 && (
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-slate-700/20 via-slate-600/10 to-slate-700/20 rounded-xl blur opacity-50"></div>
              <div className="relative bg-slate-800/40 border border-slate-700/50 rounded-xl p-4">
                <QuestionTags tags={question.tags} className="mb-0" />
              </div>
            </div>
          )}

          {/* Neural Connection Dots */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30">
            <div className="absolute top-6 left-8 w-1 h-1 bg-orange-400 rounded-full animate-ping"></div>
            <div className="absolute top-12 right-12 w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-8 left-1/3 w-1 h-1 bg-teal-400 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-6 right-1/4 w-1 h-1 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}