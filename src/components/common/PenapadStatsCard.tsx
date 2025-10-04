import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

interface PenapadStatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color?: 'blue' | 'purple' | 'emerald' | 'orange' | 'yellow' | 'pink' | 'teal';
  showProgress?: boolean;
  progressPercentage?: number;
  children?: ReactNode;
  onClick?: () => void;
}

const colorVariants = {
  blue: {
    border: 'hover:border-blue-400/50',
    shadow: 'hover:shadow-blue-400/20',
    gradient: 'from-blue-500/10',
    glowGradient: 'from-blue-400 to-cyan-400',
    iconBg: 'bg-blue-500/20 group-hover:bg-blue-500/30',
    iconColor: 'text-blue-400 group-hover:text-blue-300',
    textColor: 'group-hover:text-blue-300',
    subtitleColor: 'text-blue-400 group-hover:text-blue-300',
    progressGradient: 'from-blue-400 to-cyan-400'
  },
  purple: {
    border: 'hover:border-purple-400/50',
    shadow: 'hover:shadow-purple-400/20',
    gradient: 'from-purple-500/10',
    glowGradient: 'from-purple-400 to-violet-400',
    iconBg: 'bg-purple-500/20 group-hover:bg-purple-500/30',
    iconColor: 'text-purple-400 group-hover:text-purple-300',
    textColor: 'group-hover:text-purple-300',
    subtitleColor: 'text-purple-400 group-hover:text-purple-300',
    progressGradient: 'from-purple-400 to-violet-400'
  },
  emerald: {
    border: 'hover:border-emerald-400/50',
    shadow: 'hover:shadow-emerald-400/20',
    gradient: 'from-emerald-500/10',
    glowGradient: 'from-emerald-400 to-teal-400',
    iconBg: 'bg-emerald-500/20 group-hover:bg-emerald-500/30',
    iconColor: 'text-emerald-400 group-hover:text-emerald-300',
    textColor: 'group-hover:text-emerald-300',
    subtitleColor: 'text-emerald-400 group-hover:text-emerald-300',
    progressGradient: 'from-emerald-400 to-teal-400'
  },
  orange: {
    border: 'hover:border-orange-400/50',
    shadow: 'hover:shadow-orange-400/20',
    gradient: 'from-orange-500/10',
    glowGradient: 'from-orange-400 to-amber-400',
    iconBg: 'bg-orange-500/20 group-hover:bg-orange-500/30',
    iconColor: 'text-orange-400 group-hover:text-orange-300',
    textColor: 'group-hover:text-orange-300',
    subtitleColor: 'text-orange-400 group-hover:text-orange-300',
    progressGradient: 'from-orange-400 to-amber-400'
  },
  yellow: {
    border: 'hover:border-yellow-400/50',
    shadow: 'hover:shadow-yellow-400/20',
    gradient: 'from-yellow-500/10',
    glowGradient: 'from-yellow-400 to-amber-400',
    iconBg: 'bg-yellow-500/20 group-hover:bg-yellow-500/30',
    iconColor: 'text-yellow-400 group-hover:text-yellow-300',
    textColor: 'group-hover:text-yellow-300',
    subtitleColor: 'text-yellow-400 group-hover:text-yellow-300',
    progressGradient: 'from-yellow-400 to-amber-400'
  },
  pink: {
    border: 'hover:border-pink-400/50',
    shadow: 'hover:shadow-pink-400/20',
    gradient: 'from-pink-500/10',
    glowGradient: 'from-pink-400 to-rose-400',
    iconBg: 'bg-pink-500/20 group-hover:bg-pink-500/30',
    iconColor: 'text-pink-400 group-hover:text-pink-300',
    textColor: 'group-hover:text-pink-300',
    subtitleColor: 'text-pink-400 group-hover:text-pink-300',
    progressGradient: 'from-pink-400 to-rose-400'
  },
  teal: {
    border: 'hover:border-teal-400/50',
    shadow: 'hover:shadow-teal-400/20',
    gradient: 'from-teal-500/10',
    glowGradient: 'from-teal-400 to-cyan-400',
    iconBg: 'bg-teal-500/20 group-hover:bg-teal-500/30',
    iconColor: 'text-teal-400 group-hover:text-teal-300',
    textColor: 'group-hover:text-teal-300',
    subtitleColor: 'text-teal-400 group-hover:text-teal-300',
    progressGradient: 'from-teal-400 to-cyan-400'
  }
};

export default function PenapadStatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color = 'blue',
  showProgress = false,
  progressPercentage = 0,
  children,
  onClick
}: PenapadStatsCardProps) {
  const colors = colorVariants[color];
  const isClickable = !!onClick;

  return (
    <div 
      className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 p-6 transition-all duration-500 hover:shadow-2xl hover:scale-105 transform ${colors.border} ${colors.shadow} ${isClickable ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      {/* Background Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="relative">
            {/* Glow Effect */}
            <div className={`absolute -inset-1 bg-gradient-to-r ${colors.glowGradient} rounded-full blur opacity-0 group-hover:opacity-75 transition duration-500`}></div>
            {/* Icon Container */}
            <div className={`relative ${colors.iconBg} rounded-xl p-3 transition-colors duration-300`}>
              <Icon className={`h-7 w-7 ${colors.iconColor} transition-colors duration-300`} />
            </div>
          </div>
        </div>
        
        <div>
          {/* Title */}
          <p className="text-sm font-medium text-slate-400 group-hover:text-slate-300 transition-colors duration-300 mb-2">
            {title}
          </p>
          
          {/* Value */}
          <p className={`text-4xl font-bold text-white transition-colors duration-300 tracking-tight ${colors.textColor}`}>
            {value}
          </p>
          
          {/* Progress Bar */}
          {showProgress && (
            <div className="mt-3 mb-2">
              <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${colors.progressGradient} rounded-full transition-all duration-700 ease-out transform`}
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          )}
          
          {/* Subtitle */}
          {subtitle && (
            <p className={`text-sm font-semibold transition-colors duration-300 mt-1 ${colors.subtitleColor}`}>
              {subtitle}
            </p>
          )}
          
          {/* Additional Content */}
          {children && (
            <div className="mt-3">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}