import { useState, useEffect, useRef } from 'react';
import DoctorSkoda from '../images/DoctorSkoda';
import { useQuestionFlow } from './FlowContext';

interface DrSkodaDialogProps {
  title: string;
  content: string;
  showContinueButton?: boolean;
  continueButtonText?: string;
  onContinue?: () => void;
  className?: string;
  audioSrc?: string;
  audioSequence?: string[];
  requireAudioCompletion?: boolean;
}

export default function DrSkodaDialog({
  title,
  content,
  showContinueButton = true,
  continueButtonText = "Próximo",
  onContinue,
  className = "",
  audioSrc,
  audioSequence,
  requireAudioCompletion = false
}: DrSkodaDialogProps) {
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioCompleted, setAudioCompleted] = useState(false);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Get questionId from context if available
  const { questionId, currentStage } = useQuestionFlow();
  
  // Auto-configure audio for question 1
  const getAudioConfig = () => {
    if (audioSrc || audioSequence) {
      return { src: audioSrc, sequence: audioSequence };
    }
    
    if (questionId === 1) {
      if (currentStage === 'begin') {
        return { src: '/question1.1.mp3', sequence: undefined };
      } else if (currentStage === 'explanation') {
        return { 
          src: undefined, 
          sequence: ['/question1.2.mp3', '/question1.3.mp3', '/question1.4.mp3'] 
        };
      }
    }
    
    return { src: undefined, sequence: undefined };
  };

  const { src: finalAudioSrc, sequence: finalAudioSequence } = getAudioConfig();
  const finalRequireAudioCompletion = requireAudioCompletion || (questionId === 1 && (currentStage === 'begin' || currentStage === 'explanation'));

  // Determine current audio to play
  const currentAudioSrc = finalAudioSequence ? finalAudioSequence[currentAudioIndex] : finalAudioSrc;
  const isSequenceMode = !!finalAudioSequence;
  const totalAudios = finalAudioSequence?.length || 1;

  useEffect(() => {
    if (currentAudioSrc && audioRef.current) {
      const audio = audioRef.current;
      
      const handlePlay = () => {
        setIsAudioPlaying(true);
        setShowPlayButton(false);
      };
      
      const handlePause = () => setIsAudioPlaying(false);
      
      const handleEnded = () => {
        setIsAudioPlaying(false);
        
        if (isSequenceMode && currentAudioIndex < totalAudios - 1) {
          // Play next audio in sequence
          setCurrentAudioIndex(prev => prev + 1);
        } else {
          // Sequence completed or single audio finished
          setAudioCompleted(true);
        }
      };

      const handleError = () => {
        setIsAudioPlaying(false);
      };

      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);
      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('error', handleError);

      // Try to auto play, but handle autoplay restrictions
      const playAudio = async () => {
        try {
          await audio.play();
        } catch (error) {
          setShowPlayButton(true);
        }
      };
      
      if (!showPlayButton) {
        playAudio();
      }

      return () => {
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('error', handleError);
      };
    }
  }, [currentAudioSrc, showPlayButton, isSequenceMode, currentAudioIndex, totalAudios]);

  const handlePlayAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        // Audio play failed
      });
    }
  };

  const canContinue = !finalRequireAudioCompletion || audioCompleted;

  const handleContinue = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      if (onContinue) {
        onContinue();
      }
    }, 300);
  };

  // Função para processar negrito com neural styling
  const processTextWithBold = (text: string) => {
    if (!text.includes('**')) return text;
    
    const parts = text.split(/(\*\*[^*]+\*\*)/);
    return parts.map((part, partIndex) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={partIndex} className="text-orange-300 font-semibold bg-gradient-to-r from-orange-300 to-teal-300 bg-clip-text text-transparent">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 pointer-events-none ${className}`}>
      {/* Neural Dr. Skoda Dialog Container */}
      <div className={`dr-skoda-dialog bg-gradient-to-br from-slate-900/95 via-blue-900/30 to-slate-900/95 backdrop-blur-xl border border-orange-500/40 rounded-xl shadow-2xl w-96 max-w-[calc(100vw-2rem)] max-h-[calc(100vh-8rem)] overflow-hidden transform transition-all duration-300 pointer-events-auto flex flex-col relative group ${
        isAnimatingOut ? 'animate-out slide-out-to-bottom-4 fade-out duration-300' : 'animate-in slide-in-from-bottom-4 fade-in duration-500'
      }`}>
        
        {/* Neural Activity Indicators */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-2 left-2 w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
          <div className="absolute top-4 right-4 w-1 h-1 bg-teal-400 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-3 left-6 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse delay-500"></div>
          <div className="absolute top-1/2 right-2 w-0.5 h-0.5 bg-cyan-400 rounded-full animate-pulse delay-700"></div>
        </div>

        {/* Enhanced Neural Header */}
        <div className="bg-gradient-to-r from-orange-900/50 to-blue-900/50 border-b border-orange-500/30 px-4 py-3 flex-shrink-0 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-blue-500/5"></div>
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-teal-400 rounded-full animate-pulse"></div>
              <h3 className="text-white font-bold text-sm bg-gradient-to-r from-orange-300 to-teal-300 bg-clip-text text-transparent">
                Dr. Skoda Neural Interface
              </h3>
            </div>
            
            {/* Dr. Skoda Portrait - Enlarged with Overflow */}
            <div className="flex items-center space-x-2 relative z-50">
              <div className="relative group">
                {/* Enlarged neural frame - overflows header */}
                <div className="w-20 h-20 -mt-4 -mb-4 bg-gradient-to-br from-slate-800/90 to-blue-900/60 rounded-xl p-1 border border-orange-500/50 relative overflow-hidden shadow-2xl">
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
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full border-2 border-slate-900 flex items-center justify-center shadow-2xl z-50">
                  <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-ping opacity-75"></div>
                </div>
                
                {/* Neural connection indicators */}
                <div className="absolute -top-1 -left-1 w-3 h-3 bg-purple-500/80 rounded-full border border-purple-300/50 animate-pulse delay-300"></div>
                <div className="absolute top-2 -right-1 w-2 h-2 bg-cyan-500/80 rounded-full border border-cyan-300/50 animate-pulse delay-700"></div>
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-orange-500/80 rounded-full border border-orange-300/50 animate-pulse delay-1000"></div>
              </div>
              
              <div className="text-slate-300 text-xs">
                <div className="flex items-center space-x-1">
                  <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="font-medium">Online</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Neural connection lines */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
        </div>
        
        {/* Neural Content Area with Enhanced Scroll */}
        <div className="flex-1 overflow-y-auto min-h-0 scrollbar-custom relative">
          {/* Neural processing overlay */}
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
            {/* Neural Text Content */}
            <div className="relative">
              <div className="dr-skoda-content relative">
                {/* Neural processing indicator */}
                <div className="absolute -left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500/30 via-teal-500/30 to-purple-500/30 rounded-full"></div>
                
                <div className="text-slate-200 leading-relaxed text-sm space-y-3 pl-2">
                  {content.split('\n').map((paragraph, index) => {
                    // Pular parágrafos vazios
                    if (!paragraph.trim()) return null;

                    // Enhanced titles with neural styling
                    if (paragraph.trim().startsWith('**') && paragraph.trim().endsWith('**') && !paragraph.includes(':')) {
                      const cleanTitle = paragraph.replace(/^\*\*/, '').replace(/\*\*$/, '').trim();
                      return (
                        <div key={index} className="relative mb-3 mt-4 first:mt-0">
                          <div className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse"></div>
                            <h4 className="text-teal-300 font-bold text-sm bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">
                              {processTextWithBold(cleanTitle)}
                            </h4>
                          </div>
                          <div className="ml-3.5 h-px bg-gradient-to-r from-teal-500/30 to-transparent mt-1"></div>
                        </div>
                      );
                    }
                    
                    // Enhanced list items with neural bullets
                    if (paragraph.trim().match(/^[•\-\*→]\s/) || paragraph.trim().match(/^\d+\.\s/)) {
                      const content = paragraph.trim().replace(/^[•\-\*→]\s/, '').replace(/^\d+\.\s/, '');
                      return (
                        <div key={index} className="flex items-start space-x-3 text-sm relative">
                          <div className="mt-1.5 relative">
                            <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-teal-400 rounded-full relative">
                              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-teal-400 rounded-full animate-pulse opacity-50"></div>
                            </div>
                          </div>
                          <span className="text-slate-200 leading-relaxed">{processTextWithBold(content)}</span>
                        </div>
                      );
                    }
                    
                    // Enhanced paragraphs with subtle glow
                    return (
                      <div key={index} className="relative">
                        <p className="text-slate-200 leading-relaxed text-sm relative z-10">
                          {processTextWithBold(paragraph)}
                        </p>
                      </div>
                    );
                  }).filter(Boolean)}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Neural Footer */}
        {showContinueButton && (
          <div className="flex justify-between items-center px-4 py-3 border-t border-orange-500/30 bg-gradient-to-r from-slate-900/80 to-blue-900/40 flex-shrink-0 relative overflow-hidden">
            
            {/* Background neural effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-teal-500/5"></div>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
            
            {/* Enhanced Progress Indicator */}
            <div className="flex items-center space-x-2 relative z-10">
              <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
              <span className="text-slate-300 text-xs font-medium">Neural Session 1/13</span>
            </div>
            
            {/* Audio player (hidden) */}
            {currentAudioSrc && (
              <audio 
                ref={audioRef} 
                src={currentAudioSrc}
                className="hidden"
                preload="auto"
              />
            )}
            
            {/* Enhanced Audio Status */}
            {currentAudioSrc && finalRequireAudioCompletion && (
              <div className="flex items-center mr-4 text-sm relative z-10">
                {showPlayButton ? (
                  <button
                    onClick={handlePlayAudio}
                    className="flex items-center px-3 py-1.5 bg-gradient-to-r from-orange-600 to-teal-600 text-white rounded-lg hover:from-orange-700 hover:to-teal-700 transition-all duration-200 text-xs font-medium shadow-lg border border-orange-500/30"
                  >
                    <div className="w-3 h-3 mr-1.5 relative">
                      <div className="absolute inset-0 bg-white rounded-full"></div>
                      <div className="absolute inset-0.5 bg-gradient-to-r from-orange-600 to-teal-600 rounded-full"></div>
                      <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center">
                        <div className="w-1 h-1 bg-gradient-to-r from-orange-600 to-teal-600 rounded-full"></div>
                      </div>
                    </div>
                    {isSequenceMode ? `Neural Audio (${totalAudios})` : 'Neural Audio'}
                  </button>
                ) : isAudioPlaying ? (
                  <div className="flex items-center text-orange-400 text-xs">
                    <div className="relative w-2 h-2 mr-2">
                      <div className="absolute inset-0 bg-orange-400 rounded-full animate-pulse"></div>
                      <div className="absolute inset-0 bg-orange-400 rounded-full animate-ping opacity-75"></div>
                    </div>
                    <span className="font-medium">Neural Processing...</span>
                  </div>
                ) : audioCompleted ? (
                  <div className="flex items-center text-green-400 text-xs">
                    <div className="relative w-2 h-2 mr-2">
                      <div className="absolute inset-0 bg-green-400 rounded-full"></div>
                      <div className="absolute inset-0 bg-green-400 rounded-full animate-pulse opacity-75"></div>
                    </div>
                    <span className="font-medium">Neural Complete</span>
                  </div>
                ) : null}
              </div>
            )}
            
            {/* Enhanced Navigation Buttons */}
            <div className="flex items-center space-x-3 relative z-10">
              <button className="text-slate-400 hover:text-orange-300 transition-colors text-xs flex items-center font-medium group">
                <div className="w-4 h-4 mr-1 relative">
                  <div className="absolute inset-0 border border-slate-400 group-hover:border-orange-300 rounded transition-colors transform rotate-45"></div>
                  <div className="absolute inset-1 bg-slate-400 group-hover:bg-orange-300 rounded transition-colors transform -rotate-45"></div>
                </div>
                Previous
              </button>
              
              <button
                onClick={handleContinue}
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
                
                {/* Glow effect on hover */}
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
        )}
      </div>
    </div>
  );
}