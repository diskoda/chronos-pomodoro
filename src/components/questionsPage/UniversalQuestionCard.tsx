import { useNavigate } from 'react-router-dom';
import { Clock, BookOpen, Target, Star, Timer, Tag } from 'lucide-react';
import type { Question } from '../../data/types/Question';
import { useQuestionCooldown } from '../../hooks/useQuestionCooldown';
import { useLoading } from '../../contexts/LoadingContext';

interface UniversalQuestionCardProps {
  question: Question;
  className?: string;
  showActions?: boolean;
  compact?: boolean;
}

export default function UniversalQuestionCard({ 
  question, 
  className = '',
  showActions = true,
  compact = false
}: UniversalQuestionCardProps) {
  
  // Hooks de cooldown para ambos os modos
  const drSkodaCooldown = useQuestionCooldown(question.id, 'dr-skoda');
  const examCooldown = useQuestionCooldown(question.id, 'exam');
  const { showLoading } = useLoading();
  const navigate = useNavigate();
  
  // Função para obter cores por categoria
  const getCategoryColor = (category: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
      'Neonatologia': { bg: 'bg-pink-500/20', text: 'text-pink-400', border: 'border-pink-500/30' },
      'Cardiologia': { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30' },
      'Endocrinologia': { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/30' },
      'Pneumologia': { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/30' },
      'Neurologia': { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/30' },
      'Dermatologia': { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/30' },
      'Infectologia': { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30' },
      'Emergência': { bg: 'bg-red-600/20', text: 'text-red-400', border: 'border-red-600/30' },
      'Gastroenterologia': { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/30' },
      'Nefrologia': { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30' },
      'Hematologia': { bg: 'bg-rose-500/20', text: 'text-rose-400', border: 'border-rose-500/30' },
      'Oftalmologia': { bg: 'bg-indigo-500/20', text: 'text-indigo-400', border: 'border-indigo-500/30' },
    };
    return colors[category] || { bg: 'bg-slate-500/20', text: 'text-slate-400', border: 'border-slate-500/30' };
  };

  // Função para obter cores por dificuldade
  const getDifficultyColor = (difficulty: string) => {
    const colors: Record<string, { bg: string; text: string; icon: string }> = {
      'Fácil': { bg: 'bg-emerald-500/20', text: 'text-emerald-400', icon: '🟢' },
      'Médio': { bg: 'bg-yellow-500/20', text: 'text-yellow-400', icon: '🟡' },
      'Difícil': { bg: 'bg-red-500/20', text: 'text-red-400', icon: '🔴' },
    };
    return colors[difficulty] || colors['Médio'];
  };

  // Função para obter a categoria de exibição mais específica
  const getDisplayCategory = () => {
    if (Array.isArray(question.category)) {
      const priorities = [
        'Neonatologia', 'Cardiologia', 'Endocrinologia', 'Pneumologia',
        'Dermatologia', 'Infectologia', 'Neurologia', 'Emergência',
        'Gastroenterologia', 'Nefrologia', 'Hematologia', 'Oftalmologia'
      ];
      
      for (const priority of priorities) {
        const found = question.category.find(cat => cat.includes(priority));
        if (found) return found;
      }
      return question.category[0];
    }
    return question.category;
  };
  // Função para renderizar botão com status de cooldown - Enhanced PéNaPED Design
  const renderActionButton = (
    mode: 'dr-skoda' | 'exam',
    label: string,
    cooldown: typeof drSkodaCooldown,
    isCompact = false
  ) => {
    const route = mode === 'dr-skoda' ? `/question/dr-skoda/${question.id}` : `/exam/question/${question.id}`;
    const sizeClasses = isCompact ? 'px-3 py-2 text-xs' : 'px-6 py-3 text-sm';
    
    // Enhanced colors for each mode
    const modeColors = {
      'dr-skoda': {
        bg: 'bg-gradient-to-r from-orange-500 to-orange-600',
        hover: 'hover:from-orange-600 hover:to-orange-700',
        shadow: 'shadow-orange-500/25',
        glow: 'from-orange-400 to-orange-600',
        icon: <BookOpen className="w-4 h-4" />
      },
      'exam': {
        bg: 'bg-gradient-to-r from-purple-500 to-purple-600',
        hover: 'hover:from-purple-600 hover:to-purple-700',
        shadow: 'shadow-purple-500/25',
        glow: 'from-purple-400 to-purple-600',
        icon: <Target className="w-4 h-4" />
      }
    };
    
    const colors = modeColors[mode];
    
    // Função para navegar com loading
    const handleNavigation = (e: React.MouseEvent) => {
      e.preventDefault();
      showLoading(`Preparando questão ${question.id}...`, 'default');
      setTimeout(() => navigate(route), 300);
    };
    
    if (cooldown.loading) {
      return (
        <div className={`group relative overflow-hidden rounded-xl ${colors.bg} opacity-50 text-white ${sizeClasses} font-bold cursor-not-allowed transition-all duration-300`}>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative flex items-center justify-center gap-2">
            <Clock className="w-4 h-4 animate-spin" />
            {label}
          </div>
        </div>
      );
    }
    
    if (!cooldown.canAttempt) {
      return (
        <div 
          className={`group relative overflow-hidden rounded-xl bg-gradient-to-r from-slate-600 to-slate-700 text-slate-300 ${sizeClasses} font-bold cursor-not-allowed transition-all duration-300 border border-slate-600/40`}
          title={`Aguarde ${cooldown.timeUntilAvailable} para tentar novamente`}
        >
          <div className="absolute inset-0 bg-slate-800/30"></div>
          <div className="relative flex items-center justify-center gap-2">
            <Clock className="w-4 h-4 animate-pulse" />
            {label}
          </div>
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-slate-600 shadow-lg">
            {cooldown.timeUntilAvailable}
          </div>
        </div>
      );
    }
    
    return (
      <button
        onClick={handleNavigation}
        className={`group relative overflow-hidden rounded-xl ${colors.bg} ${colors.hover} text-white ${sizeClasses} font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl ${colors.shadow} transform border border-white/10 hover:border-white/20`}
      >
        {/* Animated Glow Effect */}
        <div className={`absolute -inset-1 bg-gradient-to-r ${colors.glow} rounded-xl blur opacity-0 group-hover:opacity-60 transition-opacity duration-300`}></div>
        
        {/* Shimmer Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
        
        {/* Button Content */}
        <div className="relative flex items-center justify-center gap-2 z-10">
          {colors.icon}
          <span>{label}</span>
        </div>
        
        {/* Border Highlight */}
        <div className="absolute inset-0 rounded-xl border border-white/0 group-hover:border-white/30 transition-colors duration-300"></div>
      </button>
    );
  };

  const displayCategory = getDisplayCategory();
  const categoryColors = getCategoryColor(displayCategory);
  const difficultyColors = getDifficultyColor(question.difficulty || 'Médio');

  // Modo compacto para visualização em lista
  if (compact) {
    return (
      <div className={`group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600/70 transition-all duration-300 hover:scale-102 transform ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative z-10 p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 pr-4">
              <div className="flex items-start gap-4">
                {/* Número da questão */}
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg blur opacity-0 group-hover:opacity-50 transition duration-300"></div>
                  <div className="relative bg-slate-700/50 rounded-lg px-3 py-1.5 border border-slate-600/50">
                    <span className="text-sm font-bold text-white">#{question.id}</span>
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-white mb-2 line-clamp-1 group-hover:text-blue-300 transition-colors duration-300">
                    {question.title}
                  </h3>
                  
                  {/* Tags e informações */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`${categoryColors.bg} ${categoryColors.text} border ${categoryColors.border} px-2 py-1 rounded-lg text-xs font-medium`}>
                      {displayCategory}
                    </div>
                    <div className={`${difficultyColors.bg} ${difficultyColors.text} px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1`}>
                      <span className="text-xs">{difficultyColors.icon}</span>
                      {question.difficulty || 'Médio'}
                    </div>
                    <div className="flex items-center gap-1 text-slate-400 text-xs">
                      <Timer className="w-3 h-3" />
                      {question.timeEstimate}min
                    </div>
                  </div>
                  
                  {/* Preview do statement */}
                  {question.statement && (
                    <p className="text-xs text-slate-400 line-clamp-1 group-hover:text-slate-300 transition-colors duration-300">
                      {question.statement.length > 60 
                        ? `${question.statement.substring(0, 60)}...`
                        : question.statement
                      }
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            {showActions && (
              <div className="flex gap-2 ml-4">
                {renderActionButton('dr-skoda', 'Dr. Skoda', drSkodaCooldown, true)}
                {renderActionButton('exam', 'Simulado', examCooldown, true)}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-lg border transition-all duration-500 hover:scale-105 transform ${className}`}>
      {/* Dynamic Border Based on Category */}
      <div className={`absolute inset-0 rounded-2xl border-2 ${categoryColors.border} opacity-30 group-hover:opacity-60 transition-opacity duration-500`}></div>
      
      {/* Neural Network Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-4 left-6 w-1 h-1 bg-orange-400 rounded-full animate-ping"></div>
        <div className="absolute top-8 right-8 w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-6 left-1/3 w-1 h-1 bg-teal-400 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-4 right-1/4 w-1 h-1 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
      </div>
      
      {/* Animated Glow Effect */}
      <div className={`absolute -inset-1 bg-gradient-to-r ${categoryColors.border.replace('border-', 'from-').replace('/30', '/20')} via-purple-500/10 ${categoryColors.border.replace('border-', 'to-').replace('/30', '/20')} rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
      
      {/* Header Section */}
      <div className="relative z-10 p-6 pb-4">
        <div className="flex justify-between items-start mb-4">
          {/* Question ID Badge */}
          <div className="relative">
            <div className={`absolute -inset-1 bg-gradient-to-r ${categoryColors.border.replace('border-', 'from-').replace('/30', '/40')} to-purple-500/40 rounded-xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-500`}></div>
            <div className={`relative bg-gradient-to-r from-slate-800/80 to-slate-700/80 rounded-xl px-4 py-2.5 border ${categoryColors.border} group-hover:border-opacity-80 transition-all duration-300`}>
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 ${categoryColors.bg.replace('/20', '')} rounded-full animate-pulse`}></div>
                <span className="text-lg font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">#{question.id}</span>
                <Star className="w-4 h-4 text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300" />
              </div>
            </div>
          </div>
          
          {/* Exam badge with glow */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/30 to-purple-600/30 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-purple-500/20 border border-purple-500/40 text-purple-300 px-4 py-1.5 rounded-lg text-sm font-bold group-hover:text-purple-200 transition-colors duration-300">
              {question.exam}
            </div>
          </div>
        </div>
        
        {/* Title with gradient */}
        <h3 className="text-xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-300 bg-clip-text text-transparent mb-4 line-clamp-2 leading-tight group-hover:from-blue-200 group-hover:via-purple-200 group-hover:to-teal-200 transition-all duration-500">
          {question.title}
        </h3>
        
        {/* Enhanced Tags Section */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          {/* Category Tag */}
          <div className={`relative group/tag`}>
            <div className={`absolute -inset-1 bg-gradient-to-r ${categoryColors.border.replace('border-', 'from-').replace('/30', '/30')} ${categoryColors.border.replace('border-', 'to-').replace('/30', '/40')} rounded-lg blur opacity-0 group-hover/tag:opacity-100 transition-opacity duration-300`}></div>
            <div className={`relative ${categoryColors.bg} ${categoryColors.text} border ${categoryColors.border} px-3 py-2 rounded-lg text-sm font-bold flex items-center gap-2 group-hover/tag:scale-105 transition-transform duration-200`}>
              <Tag className="w-3 h-3" />
              {displayCategory}
            </div>
          </div>
          
          {/* Difficulty Tag */}
          <div className={`relative group/diff`}>
            <div className={`absolute -inset-1 bg-gradient-to-r ${difficultyColors.bg.replace('/20', '/30')} ${difficultyColors.bg.replace('/20', '/40')} rounded-lg blur opacity-0 group-hover/diff:opacity-100 transition-opacity duration-300`}></div>
            <div className={`relative ${difficultyColors.bg} ${difficultyColors.text} border border-current/30 px-3 py-2 rounded-lg text-sm font-bold flex items-center gap-2 group-hover/diff:scale-105 transition-transform duration-200`}>
              <span className="text-sm animate-pulse">{difficultyColors.icon}</span>
              {question.difficulty || 'Médio'}
            </div>
          </div>
          
          {/* Time Estimate */}
          <div className="relative group/time">
            <div className="absolute -inset-1 bg-gradient-to-r from-slate-500/30 to-slate-600/30 rounded-lg blur opacity-0 group-hover/time:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-slate-700/60 border border-slate-600/50 text-slate-300 px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 group-hover/time:text-slate-200 group-hover/time:scale-105 transition-all duration-200">
              <Timer className="w-4 h-4 animate-pulse" />
              <span>~{question.timeEstimate}min</span>
            </div>
          </div>
        </div>
        
        {/* Secondary Tags with improved design */}
        {question.tags && question.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {question.tags.slice(0, 3).map((tag, index) => (
              <div key={index} className="relative group/secondary">
                <div className="absolute -inset-1 bg-gradient-to-r from-slate-600/20 to-slate-500/20 rounded-lg blur opacity-0 group-hover/secondary:opacity-100 transition-opacity duration-200"></div>
                <span className="relative bg-slate-800/60 border border-slate-600/40 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-medium hover:text-slate-200 hover:border-slate-500/60 transition-all duration-200 cursor-default">
                  {tag}
                </span>
              </div>
            ))}
            {question.tags.length > 3 && (
              <div className="flex items-center">
                <span className="text-slate-400 text-xs font-medium bg-slate-800/40 px-2 py-1 rounded-lg border border-slate-600/30">
                  +{question.tags.length - 3} mais
                </span>
              </div>
            )}
          </div>
        )}
        
        {/* Enhanced Statement Preview */}
        {question.statement && (
          <div className="mb-4 relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-slate-700/10 via-slate-600/5 to-slate-700/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-slate-800/30 border border-slate-700/50 rounded-lg p-4 group-hover:border-slate-600/60 transition-colors duration-300">
              <p className="text-sm text-slate-300 line-clamp-3 leading-relaxed group-hover:text-slate-200 transition-colors duration-300 font-medium">
                {question.statement.length > 150 
                  ? `${question.statement.substring(0, 150)}...`
                  : question.statement
                }
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Actions Section */}
      {showActions && (
        <div className="relative z-10 px-6 pb-6">
          <div className="grid grid-cols-2 gap-4">
            {renderActionButton('dr-skoda', 'Dr. Skoda', drSkodaCooldown)}
            {renderActionButton('exam', 'Simulado', examCooldown)}
          </div>
        </div>
      )}
    </div>
  );
}