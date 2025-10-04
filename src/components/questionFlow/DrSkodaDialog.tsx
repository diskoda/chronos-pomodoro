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
  continueButtonText = "Prosseguir",
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
  const [audioError, setAudioError] = useState(false);
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
        setAudioError(false);
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
        setAudioError(true);
        setIsAudioPlaying(false);
      };

      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);
      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('error', handleError);

      // Try to auto play, but handle autoplay restrictions
      const tryAutoPlay = async () => {
        try {
          await audio.play();
        } catch (error) {
          console.log('Autoplay blocked, showing play button');
          setShowPlayButton(true);
          setAudioError(false);
        }
      };

      tryAutoPlay();

      return () => {
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('error', handleError);
      };
    }
  }, [currentAudioSrc, isSequenceMode, currentAudioIndex, totalAudios]);

  const handlePlayAudio = async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
      } catch (error) {
        console.error('Error playing audio:', error);
        setAudioError(true);
      }
    }
  };

  const canContinue = !finalRequireAudioCompletion || audioCompleted;

  const handleContinue = () => {
    setIsAnimatingOut(true);
    // Aguarda a animação de saída antes de chamar onContinue
    setTimeout(() => {
      if (onContinue) {
        onContinue();
      }
    }, 300);
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 pointer-events-none ${className}`}>
      {/* Efeito de glow pulsante - aparece depois do componente */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-glow-pulse blur-xl scale-125 animate-in fade-in duration-700 delay-1000"></div>
      
      {/* Borda animada rainbow - aparece depois do componente */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-600 via-pink-500 via-red-500 via-yellow-500 via-green-500 to-blue-500 animate-rainbow-border p-0.5 animate-in fade-in duration-700 delay-800">
        <div className="w-full h-full bg-transparent rounded-2xl"></div>
      </div>
      
      {/* Partículas flutuantes - aparecem depois */}
      <div className="absolute -top-2 -right-2 w-3 h-3 bg-yellow-400 rounded-full animate-bounce opacity-80 animate-in fade-in scale-in duration-500 delay-1200"></div>
      <div className="absolute -top-1 -left-1 w-2 h-2 bg-pink-400 rounded-full animate-ping opacity-60 animate-in fade-in scale-in duration-500 delay-1400"></div>
      <div className="absolute -bottom-1 -right-3 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-70 animate-in fade-in scale-in duration-500 delay-1600"></div>
      
      {/* Sparkles - aparecem por último */}
      <div className="absolute top-2 right-2 text-yellow-300 animate-pulse animate-in fade-in scale-in duration-300 delay-1800">✨</div>
      <div className="absolute bottom-3 left-2 text-purple-300 animate-bounce animate-in fade-in scale-in duration-300 delay-2000">💫</div>
      
      <div className={`dr-skoda-dialog bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-96 max-w-[calc(100vw-2rem)] overflow-hidden transform transition-all duration-500 max-h-[70vh] flex flex-col pointer-events-auto relative z-10 ring-4 ring-blue-400 ring-opacity-60 shadow-blue-500/50 animate-in slide-in-from-bottom-4 fade-in duration-700 ${
        isAnimatingOut ? 'animate-out slide-out-to-bottom-4 fade-out duration-300' : ''
      }`}>
        {/* Header com gradiente */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white p-4 flex-shrink-0 animate-in fade-in slide-in-from-top-2 duration-500 delay-300">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <span className="text-lg">👨‍⚕️</span>
            </div>
            <div>
              <h3 className="text-lg font-bold">{title}</h3>
              <p className="text-blue-100 text-xs">Dr. Skoda - Seu mentor</p>
            </div>
          </div>
        </div>
        
        {/* Conteúdo principal com scroll */}
        <div className="p-4 flex-1 overflow-y-auto animate-in fade-in slide-in-from-left-2 duration-500 delay-500">
          <div className="flex items-start gap-3">
            {/* Avatar do Dr. Skoda */}
            <div className="flex-shrink-0 sticky top-0">
              <div className="relative">
                {/* Glow do avatar */}
                <div className="absolute inset-0 w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse blur-md opacity-60"></div>
                
                <div className="relative w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-900 rounded-full p-1 shadow-lg ring-2 ring-blue-300 ring-opacity-50">
                  <DoctorSkoda 
                    width="100%"
                    height="100%"
                    className="rounded-full object-cover"
                  />
                </div>
                {/* Indicador de "falando" com efeito vibrante */}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center speaking-indicator shadow-lg ring-2 ring-green-300 ring-opacity-60">
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                </div>
                
                {/* Efeito de "energia" */}
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
              </div>
            </div>
            
            {/* Balão de fala */}
            <div className="flex-1 min-h-0">
              <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-4 shadow-md">
                {/* Seta do balão */}
                <div className="absolute -left-2 top-4 w-0 h-0 border-t-6 border-t-transparent border-b-6 border-b-transparent border-r-8 border-r-blue-50 dark:border-r-gray-700"></div>
                
                {/* Conteúdo com animação de digitação */}
                <div className="dr-skoda-content animate-in fade-in slide-in-from-top-2 duration-700 delay-700">
                  <div className="prose prose-blue dark:prose-invert max-w-none prose-sm">
                    {content.split('\n').map((paragraph, index) => {
                      // Pular parágrafos vazios
                      if (!paragraph.trim()) return null;
                      
                      // Função para processar negrito em qualquer texto
                      const processTextWithBold = (text: string) => {
                        if (!text.includes('**')) return text;
                        
                        const parts = text.split(/(\*\*[^*]+\*\*)/);
                        return parts.map((part, partIndex) => {
                          if (part.startsWith('**') && part.endsWith('**')) {
                            return (
                              <strong key={partIndex} className="text-blue-700 dark:text-blue-300 font-semibold">
                                {part.slice(2, -2)}
                              </strong>
                            );
                          }
                          return part;
                        });
                      };
                      
                      // Títulos com **texto**
                      if (paragraph.includes('**') && paragraph.trim().startsWith('**')) {
                        const cleanTitle = paragraph.replace(/^\*\*/, '').replace(/\*\*$/, '').trim();
                        return (
                          <h4 key={index} className="text-blue-700 dark:text-blue-300 font-bold text-sm mb-2 mt-3 first:mt-0">
                            {processTextWithBold(cleanTitle)}
                          </h4>
                        );
                      }
                      
                      // Itens de lista com •, -, →, ou números
                      if (paragraph.trim().match(/^[•\-\*→]\s/) || paragraph.trim().match(/^\d+\.\s/)) {
                        const isSubtopic = paragraph.includes('→');
                        const content = paragraph.trim().replace(/^[•\-\*→]\s/, '').replace(/^\d+\.\s/, '');
                        
                        return (
                          <li key={index} className={`text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-1 ${
                            isSubtopic ? 'ml-8 text-gray-600 dark:text-gray-400' : 'ml-4'
                          }`}>
                            {isSubtopic && <span className="text-blue-500 mr-2">→</span>}
                            {processTextWithBold(content)}
                          </li>
                        );
                      }

                      // Alternativas com indicadores visuais
                      if (paragraph.includes('✅') || paragraph.includes('❌') || paragraph.includes('⚠️') || paragraph.includes('🚨')) {
                        let bgColor, borderColor, textColor;
                        
                        if (paragraph.includes('✅')) {
                          bgColor = 'bg-green-50 dark:bg-green-900/20';
                          borderColor = 'border-green-500';
                          textColor = 'text-green-800 dark:text-green-200';
                        } else if (paragraph.includes('⚠️')) {
                          bgColor = 'bg-yellow-50 dark:bg-yellow-900/20';
                          borderColor = 'border-yellow-500';
                          textColor = 'text-yellow-800 dark:text-yellow-200';
                        } else if (paragraph.includes('🚨')) {
                          bgColor = 'bg-purple-50 dark:bg-purple-900/20';
                          borderColor = 'border-purple-500';
                          textColor = 'text-purple-800 dark:text-purple-200';
                        } else {
                          bgColor = 'bg-red-50 dark:bg-red-900/20';
                          borderColor = 'border-red-500';
                          textColor = 'text-red-800 dark:text-red-200';
                        }
                        
                        return (
                          <div key={index} className={`p-3 rounded-lg mb-3 border-l-4 ${bgColor} ${borderColor} ${textColor}`}>
                            <div className="text-sm font-medium">
                              {processTextWithBold(paragraph)}
                            </div>
                          </div>
                        );
                      }
                      
                      // Separadores ---
                      if (paragraph.trim() === '---') {
                        return (
                          <hr key={index} className="my-3 border-gray-300 dark:border-gray-600" />
                        );
                      }
                      
                      // Parágrafos normais
                      return (
                        <p key={index} className="text-gray-800 dark:text-gray-200 leading-relaxed text-sm mb-2">
                          {processTextWithBold(paragraph)}
                        </p>
                      );
                    }).filter(Boolean)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Botão de continuar fixo no bottom */}
        {showContinueButton && (
          <div className="flex justify-end p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex-shrink-0 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-900">
            {/* Audio player (hidden) */}
            {currentAudioSrc && (
              <audio 
                ref={audioRef} 
                src={currentAudioSrc}
                className="hidden"
                preload="auto"
              />
            )}
            
            {/* Status do áudio */}
            {currentAudioSrc && finalRequireAudioCompletion && (
              <div className="flex items-center mr-4 text-sm">
                {showPlayButton ? (
                  <button
                    onClick={handlePlayAudio}
                    className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    {isSequenceMode ? `Iniciar áudios (${totalAudios})` : 'Reproduzir áudio'}
                  </button>
                ) : isAudioPlaying ? (
                  <div className="flex items-center text-blue-600">
                    <div className="animate-pulse w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    {isSequenceMode ? (
                      <span>Reproduzindo áudio {currentAudioIndex + 1}/{totalAudios}...</span>
                    ) : (
                      <span>Reproduzindo áudio...</span>
                    )}
                  </div>
                ) : audioCompleted ? (
                  <div className="flex items-center text-green-600">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    {isSequenceMode ? (
                      <span>Sequência de áudios concluída ({totalAudios}/{totalAudios})</span>
                    ) : (
                      <span>Áudio concluído</span>
                    )}
                  </div>
                ) : audioError ? (
                  <div className="flex items-center text-red-600">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <span>Erro ao carregar áudio</span>
                  </div>
                ) : (
                  <div className="flex items-center text-yellow-600">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                    <span>Aguardando áudio...</span>
                  </div>
                )}
                
                {/* Progress bar for sequence */}
                {isSequenceMode && !showPlayButton && (
                  <div className="ml-3 flex items-center">
                    <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 transition-all duration-300"
                        style={{ 
                          width: `${((currentAudioIndex + (audioCompleted ? 1 : 0)) / totalAudios) * 100}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            <button
              onClick={handleContinue}
              disabled={!canContinue}
              className={`group relative ${
                canContinue 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white' 
                  : 'bg-gray-400 text-gray-200 cursor-not-allowed'
              } px-4 py-2 rounded-lg font-medium transition-all duration-300 transform ${
                canContinue ? 'hover:scale-105 hover:shadow-lg' : ''
              } flex items-center space-x-2 text-sm shadow-blue-500/50 ring-2 ring-blue-400 ring-opacity-50 ${
                canContinue ? 'animate-pulse' : ''
              }`}
            >
              {/* Glow do botão */}
              {canContinue && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg blur-md opacity-30 group-hover:opacity-50 transition-opacity"></div>
              )}
              
              <span className="relative z-10">
                {!canContinue && finalRequireAudioCompletion ? 
                  (showPlayButton ? 
                    'Clique em reproduzir para continuar' :
                    isSequenceMode ? 
                      `Ouça todos os áudios para continuar (${currentAudioIndex + 1}/${totalAudios})` : 
                      'Ouça o áudio para continuar'
                  ) : 
                  continueButtonText
                }
              </span>
              {canContinue && (
                <svg 
                  className="relative z-10 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}