import { useState, useEffect, useRef } from 'react';
import type { AudioConfig } from '../core/types';

// ==========================================
// CLEAN AUDIO PLAYER COMPONENT
// ==========================================

interface AudioPlayerProps {
  config: AudioConfig;
  onComplete?: () => void;
  className?: string;
}

export default function AudioPlayer({ config, onComplete, className = "" }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const isSequenceMode = !!config.sequence;
  const currentAudioSrc = isSequenceMode ? config.sequence![currentIndex] : config.src;
  const totalAudios = config.sequence?.length || 1;

  useEffect(() => {
    if (!currentAudioSrc || !audioRef.current) return;

    const audio = audioRef.current;
    
    const handlePlay = () => {
      setIsPlaying(true);
      setShowPlayButton(false);
    };
    
    const handlePause = () => setIsPlaying(false);
    
    const handleEnded = () => {
      setIsPlaying(false);
      
      if (isSequenceMode && currentIndex < totalAudios - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setIsCompleted(true);
        onComplete?.();
      }
    };

    const handleError = () => {
      setIsPlaying(false);
      setShowPlayButton(true);
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    // Auto play if enabled
    if (config.autoPlay && !showPlayButton) {
      audio.play().catch(() => {
        setShowPlayButton(true);
      });
    }

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [currentAudioSrc, config.autoPlay, showPlayButton, isSequenceMode, currentIndex, totalAudios, onComplete]);

  const handlePlayAudio = () => {
    audioRef.current?.play().catch(() => {
      // Audio play failed
    });
  };

  if (!currentAudioSrc) return null;

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <audio 
        ref={audioRef} 
        src={currentAudioSrc}
        className="hidden"
        preload="auto"
      />
      
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
      ) : isPlaying ? (
        <div className="flex items-center text-orange-400 text-xs">
          <div className="relative w-2 h-2 mr-2">
            <div className="absolute inset-0 bg-orange-400 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 bg-orange-400 rounded-full animate-ping opacity-75"></div>
          </div>
          <span className="font-medium">Neural Processing...</span>
        </div>
      ) : isCompleted ? (
        <div className="flex items-center text-green-400 text-xs">
          <div className="relative w-2 h-2 mr-2">
            <div className="absolute inset-0 bg-green-400 rounded-full"></div>
            <div className="absolute inset-0 bg-green-400 rounded-full animate-pulse opacity-75"></div>
          </div>
          <span className="font-medium">Neural Complete</span>
        </div>
      ) : null}
    </div>
  );
}