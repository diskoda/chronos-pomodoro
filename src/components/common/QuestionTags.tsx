interface QuestionTagsProps {
  tags: string[];
  className?: string;
  maxTags?: number;
}

export default function QuestionTags({ tags, className = "", maxTags }: QuestionTagsProps) {
  const displayTags = maxTags ? tags.slice(0, maxTags) : tags;
  const hasMore = maxTags && tags.length > maxTags;

  // Função para obter cores variadas para as tags
  const getTagColor = (index: number) => {
    const colors = [
      { bg: 'bg-purple-500/20', text: 'text-purple-300', border: 'border-purple-500/40', glow: 'from-purple-400 to-purple-600' },
      { bg: 'bg-orange-500/20', text: 'text-orange-300', border: 'border-orange-500/40', glow: 'from-orange-400 to-orange-600' },
      { bg: 'bg-teal-500/20', text: 'text-teal-300', border: 'border-teal-500/40', glow: 'from-teal-400 to-teal-600' },
      { bg: 'bg-pink-500/20', text: 'text-pink-300', border: 'border-pink-500/40', glow: 'from-pink-400 to-pink-600' },
      { bg: 'bg-cyan-500/20', text: 'text-cyan-300', border: 'border-cyan-500/40', glow: 'from-cyan-400 to-cyan-600' },
      { bg: 'bg-yellow-500/20', text: 'text-yellow-300', border: 'border-yellow-500/40', glow: 'from-yellow-400 to-yellow-600' },
      { bg: 'bg-emerald-500/20', text: 'text-emerald-300', border: 'border-emerald-500/40', glow: 'from-emerald-400 to-emerald-600' },
      { bg: 'bg-indigo-500/20', text: 'text-indigo-300', border: 'border-indigo-500/40', glow: 'from-indigo-400 to-indigo-600' },
    ];
    return colors[index % colors.length];
  };

  return (
    <div className={`flex items-center flex-wrap gap-3 ${className}`}>
      {displayTags.map((tag, index) => {
        const tagColor = getTagColor(index);
        return (
          <div key={index} className="relative group">
            {/* Animated Glow Effect */}
            <div className={`absolute -inset-1 bg-gradient-to-r ${tagColor.glow} rounded-lg blur opacity-0 group-hover:opacity-60 transition-opacity duration-300`}></div>
            
            {/* Tag Container */}
            <span className={`relative ${tagColor.bg} ${tagColor.text} border ${tagColor.border} px-3 py-1.5 rounded-lg text-xs font-bold cursor-default transform transition-all duration-200 hover:scale-105 flex items-center gap-1.5`}>
              {/* Neural Dot */}
              <div className={`w-1.5 h-1.5 rounded-full ${tagColor.text.replace('text-', 'bg-')} animate-pulse`}></div>
              
              {/* Tag Text */}
              <span>{tag}</span>
            </span>
          </div>
        );
      })}
      
      {hasMore && (
        <div className="relative group">
          {/* Glow for "more" indicator */}
          <div className="absolute -inset-1 bg-gradient-to-r from-slate-400 to-slate-600 rounded-lg blur opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
          
          {/* More Tags Indicator */}
          <span className="relative bg-slate-700/60 border border-slate-600/50 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-bold cursor-default transform transition-all duration-200 hover:scale-105 flex items-center gap-1.5">
            {/* Neural Dots Animation */}
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-slate-400 rounded-full animate-ping"></div>
              <div className="w-1 h-1 bg-slate-400 rounded-full animate-ping" style={{ animationDelay: '0.3s' }}></div>
              <div className="w-1 h-1 bg-slate-400 rounded-full animate-ping" style={{ animationDelay: '0.6s' }}></div>
            </div>
            <span>+{tags.length - maxTags!} mais</span>
          </span>
        </div>
      )}
    </div>
  );
}