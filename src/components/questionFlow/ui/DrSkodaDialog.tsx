import { useState } from 'react';
import AudioPlayer from '../ui/AudioPlayer';
import TextContent from '../ui/TextContent';
import DrSkodaPortrait from '../ui/DrSkodaPortrait';
import type { DialogProps } from '../core/types';

// ==========================================
// CLEAN DR. SKODA DIALOG COMPONENT
// ==========================================

export default function DrSkodaDialog({
  title,
  content,
  continueButtonText = "Próximo",
  onContinue,
  audioConfig,
  className = ""
}: DialogProps) {
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [audioCompleted, setAudioCompleted] = useState(false);

  const canContinue = !audioConfig?.requireCompletion || audioCompleted;

  const handleContinue = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      onContinue?.();
    }, 300);
  };

  const handleAudioComplete = () => {
    setAudioCompleted(true);
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 pointer-events-none ${className}`}>
      {/* Neural Dr. Skoda Dialog Container */}
      <div className={`dr-skoda-dialog bg-gradient-to-br from-slate-900/95 via-blue-900/30 to-slate-900/95 backdrop-blur-xl border border-orange-500/40 rounded-xl shadow-2xl w-96 max-w-[calc(100vw-2rem)] max-h-[calc(100vh-8rem)] overflow-hidden transform transition-all duration-300 pointer-events-auto flex flex-col relative group ${
        isAnimatingOut ? 'animate-out slide-out-to-bottom-4 fade-out duration-300' : 'animate-in slide-in-from-bottom-4 fade-in duration-500'
      }`}>
        
        {/* Neural Activity Indicators */}
        <NeuralActivityIndicators />

        {/* Enhanced Neural Header */}
        <DialogHeader />
        
        {/* Neural Content Area */}
        <div className="flex-1 overflow-y-auto min-h-0 scrollbar-custom relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
          
          {/* Enhanced Title Section */}
          <div className="px-4 pt-4 pb-2 relative">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-1 h-4 bg-gradient-to-b from-orange-400 to-teal-400 rounded-full"></div>
              <h2 className="text-white font-bold text-lg bg-gradient-to-r from-orange-200 to-teal-200 bg-clip-text text-transparent">
                {title}
              </h2>
            </div>
            <div className="h-px bg-gradient-to-r from-orange-500/20 via-teal-500/20 to-transparent mb-3"></div>
          </div>
          
          {/* Enhanced Content Layout */}
          <div className="px-4 pb-4 relative">
            <TextContent content={content} className="pl-2" />
          </div>
        </div>
        
        {/* Enhanced Neural Footer */}
        <DialogFooter 
          audioConfig={audioConfig}
          onAudioComplete={handleAudioComplete}
          canContinue={canContinue}
          continueButtonText={continueButtonText}
          onContinue={handleContinue}
        />
      </div>
    </div>
  );
}

// ==========================================
// DIALOG SUB-COMPONENTS
// ==========================================

function NeuralActivityIndicators() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-30">
      <div className="absolute top-2 left-2 w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
      <div className="absolute top-4 right-4 w-1 h-1 bg-teal-400 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute bottom-3 left-6 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse delay-500"></div>
      <div className="absolute top-1/2 right-2 w-0.5 h-0.5 bg-cyan-400 rounded-full animate-pulse delay-700"></div>
    </div>
  );
}

function DialogHeader() {
  return (
    <div className="bg-gradient-to-r from-orange-900/50 to-blue-900/50 border-b border-orange-500/30 px-4 py-3 flex-shrink-0 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-blue-500/5"></div>
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-teal-400 rounded-full animate-pulse"></div>
          <h3 className="text-white font-bold text-sm bg-gradient-to-r from-orange-300 to-teal-300 bg-clip-text text-transparent">
            Dr. Skoda Neural Interface
          </h3>
        </div>
        
        <div className="flex items-center space-x-2 relative z-50">
          <DrSkodaPortrait size="medium" />
          <div className="text-slate-300 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-medium">Online</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
    </div>
  );
}

interface DialogFooterProps {
  audioConfig?: DialogProps['audioConfig'];
  onAudioComplete: () => void;
  canContinue: boolean;
  continueButtonText: string;
  onContinue: () => void;
}

function DialogFooter({ 
  audioConfig, 
  onAudioComplete, 
  canContinue, 
  continueButtonText, 
  onContinue 
}: DialogFooterProps) {
  return (
    <div className="flex justify-between items-center px-4 py-3 border-t border-orange-500/30 bg-gradient-to-r from-slate-900/80 to-blue-900/40 flex-shrink-0 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-teal-500/5"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
      
      {/* Progress Indicator */}
      <div className="flex items-center space-x-2 relative z-10">
        <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
        <span className="text-slate-300 text-xs font-medium">Neural Session</span>
      </div>
      
      {/* Audio Player */}
      {audioConfig && (
        <AudioPlayer 
          config={audioConfig} 
          onComplete={onAudioComplete}
          className="mr-4 relative z-10"
        />
      )}
      
      {/* Navigation Buttons */}
      <div className="flex items-center space-x-3 relative z-10">
        <button
          onClick={onContinue}
          disabled={!canContinue}
          className={`group relative transition-all duration-200 ${
            canContinue 
              ? 'bg-gradient-to-r from-orange-600 to-teal-600 hover:from-orange-700 hover:to-teal-700 text-white shadow-lg border border-orange-500/30' 
              : 'bg-slate-700 text-slate-500 cursor-not-allowed border border-slate-600'
          } px-4 py-1.5 rounded-lg font-medium text-xs flex items-center space-x-2`}
        >
          <span>{continueButtonText}</span>
          <div className={`w-4 h-4 relative transition-transform duration-200 ${canContinue ? 'group-hover:translate-x-0.5' : ''}`}>
            {canContinue && (
              <>
                <div className="absolute inset-0 bg-white rounded transition-opacity group-hover:opacity-80"></div>
                <div className="absolute inset-0.5 bg-gradient-to-r from-orange-600 to-teal-600 rounded"></div>
                <div className="absolute inset-1 bg-white rounded flex items-center justify-center">
                  <div className="w-1 h-1 bg-gradient-to-r from-orange-600 to-teal-600 rounded-full"></div>
                </div>
              </>
            )}
          </div>
          
          {canContinue && (
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-teal-600 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-200 blur-sm"></div>
          )}
        </button>
      </div>
      
      {/* Neural activity dots */}
      <div className="absolute bottom-1 right-4 flex space-x-1">
        <div className="w-0.5 h-0.5 bg-orange-400 rounded-full animate-pulse"></div>
        <div className="w-0.5 h-0.5 bg-teal-400 rounded-full animate-pulse delay-300"></div>
        <div className="w-0.5 h-0.5 bg-purple-400 rounded-full animate-pulse delay-600"></div>
      </div>
    </div>
  );
}