import type { StudyModeOption } from './types';

interface StudyModeCardProps {
  mode: StudyModeOption;
  onSelect: (mode: StudyModeOption) => void;
  className?: string;
}

export default function StudyModeCard({ mode, onSelect, className = "" }: StudyModeCardProps) {
  const IconComponent = mode.icon;

  return (
    <div
      onClick={() => onSelect(mode)}
      className={`
        penaped-card transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 overflow-hidden group relative
        ${mode.isActive 
          ? 'cursor-pointer hover:shadow-2xl' 
          : 'cursor-not-allowed opacity-60'
        }
        ${className}
      `}
      style={mode.isActive ? {
        background: `linear-gradient(135deg, var(--penaped-${
          mode.id === 'clinical-cases' ? 'teal' :
          mode.id === 'question-bank' ? 'orange' :
          mode.id === 'flashcards' ? 'purple' : 'pink'
        }), var(--penaped-${
          mode.id === 'clinical-cases' ? 'teal-dark' :
          mode.id === 'question-bank' ? 'orange-dark' :
          mode.id === 'flashcards' ? 'purple-dark' : 'pink-dark'
        }))`
      } : {}}
    >
      {/* Subtle overlay for better text readability */}
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-all duration-300" />
      
      {/* Decorative elements for visual interest */}
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl" />
      <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
      
      {/* Decorative image positioned in the background */}
      {mode.image && mode.isActive && (
        <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-30 transition-all duration-300">
          <img 
            src={mode.image} 
            alt=""
            className="w-16 h-16 object-cover rounded-lg rotate-12 group-hover:rotate-6 transition-all duration-500"
          />
        </div>
      )}

      {/* Content Container */}
      <div className="relative z-10">
        {/* Icon */}
        <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 mx-auto transition-all duration-300 ${
          mode.isActive 
            ? 'bg-white/20 backdrop-blur-sm border border-white/30 group-hover:bg-white/30' 
            : 'bg-gray-300/50 dark:bg-gray-600/50 border border-gray-400/30 dark:border-gray-500/30'
        }`}>
          <IconComponent className={`h-8 w-8 drop-shadow-lg transition-all duration-300 ${
            mode.isActive 
              ? 'text-white group-hover:scale-110' 
              : 'text-gray-600 dark:text-gray-300'
          }`} />
        </div>

        {/* Content */}
        <div className="text-center">
          <h3 className={`text-xl font-bold mb-3 drop-shadow-lg ${
            mode.isActive 
              ? 'text-white' 
              : 'text-gray-700 dark:text-gray-200'
          }`}>
            {mode.title}
          </h3>
          <p className={`text-sm leading-relaxed mb-4 drop-shadow-md ${
            mode.isActive 
              ? 'text-white/90' 
              : 'text-gray-600 dark:text-gray-300'
          }`}>
            {mode.description}
          </p>
        </div>

        {/* Status Badge */}
        <div className="flex justify-center">
          <div className={`rounded-full px-4 py-2 transition-all duration-300 ${
            mode.isActive 
              ? 'bg-white/20 backdrop-blur-sm border border-white/30' 
              : 'bg-gray-300/30 dark:bg-gray-600/30 border border-gray-400/30 dark:border-gray-500/30'
          }`}>
            <span className={`text-xs font-medium ${
              mode.isActive 
                ? 'text-white' 
                : 'text-gray-600 dark:text-gray-300'
            }`}>
              {mode.isActive ? 'Disponível' : 'Em breve'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}