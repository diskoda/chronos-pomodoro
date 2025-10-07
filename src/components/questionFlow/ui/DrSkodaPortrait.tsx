import DoctorSkoda from '../../images/DoctorSkoda';

// ==========================================
// NEURAL DR. SKODA PORTRAIT COMPONENT
// ==========================================

interface DrSkodaPortraitProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
  showStatus?: boolean;
}

export default function DrSkodaPortrait({ 
  className = "", 
  size = 'medium',
  showStatus = true 
}: DrSkodaPortraitProps) {
  const sizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-20 h-20',
    large: 'w-28 h-28'
  };

  const statusSize = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6', 
    large: 'w-8 h-8'
  };

  const neuralIndicatorSize = {
    small: 'w-2 h-2',
    medium: 'w-3 h-3',
    large: 'w-4 h-4'
  };

  return (
    <div className={`relative group ${className}`}>
      {/* Enlarged neural frame */}
      <div className={`${sizeClasses[size]} -mt-4 -mb-4 bg-gradient-to-br from-slate-800/90 to-blue-900/60 rounded-xl p-1 border border-orange-500/50 relative overflow-hidden shadow-2xl`}>
        {/* Animated border effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-orange-500/30 to-teal-500/30 opacity-50 group-hover:opacity-100 transition-all duration-300 animate-pulse"></div>
        
        <div className="relative z-10 w-full h-full rounded-lg overflow-hidden">
          <DoctorSkoda 
            width="100%"
            height="100%"
            className="rounded-lg object-cover scale-110"
          />
        </div>
        
        {/* Enhanced neural scanning lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1 left-1 right-1 h-px bg-gradient-to-r from-transparent via-orange-400/70 to-transparent animate-pulse"></div>
          <div className="absolute top-4 left-1 right-1 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent animate-pulse delay-300"></div>
          <div className="absolute bottom-4 left-1 right-1 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent animate-pulse delay-700"></div>
          <div className="absolute bottom-1 left-1 right-1 h-px bg-gradient-to-r from-transparent via-teal-400/70 to-transparent animate-pulse delay-500"></div>
        </div>
        
        {/* Neural grid overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px),
                             linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px)`,
            backgroundSize: '8px 8px'
          }}></div>
        </div>
      </div>
      
      {/* Enhanced status indicator */}
      {showStatus && (
        <div className={`absolute -bottom-1 -right-1 ${statusSize[size]} bg-gradient-to-r from-green-400 to-emerald-400 rounded-full border-2 border-slate-900 flex items-center justify-center shadow-2xl z-50`}>
          <div className={`${neuralIndicatorSize[size]} bg-white rounded-full animate-pulse`}></div>
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-ping opacity-75"></div>
        </div>
      )}
      
      {/* Neural connection indicators */}
      <div className="absolute -top-1 -left-1 w-3 h-3 bg-purple-500/80 rounded-full border border-purple-300/50 animate-pulse delay-300"></div>
      <div className="absolute top-2 -right-1 w-2 h-2 bg-cyan-500/80 rounded-full border border-cyan-300/50 animate-pulse delay-700"></div>
      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-orange-500/80 rounded-full border border-orange-300/50 animate-pulse delay-1000"></div>
    </div>
  );
}