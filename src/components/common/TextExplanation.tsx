import React, { useState, useRef, useEffect } from 'react';
import { Info, X, ExternalLink } from 'lucide-react';
import { explanationsDatabase, type Explanation } from '../../data/explanations';

export interface TextExplanationProps {
  children: React.ReactNode;
  explanationId: string;
  className?: string;
  variant?: 'hover' | 'click';
  theme?: 'light' | 'dark' | 'medical';
  showIcon?: boolean;
  maxWidth?: number;
  delay?: number;
}

const getExplanation = (id: string): Explanation | null => {
  return explanationsDatabase[id] || null;
};

export const TextExplanation: React.FC<TextExplanationProps> = ({
  children,
  explanationId,
  className = '',
  variant = 'hover',
  theme = 'light',
  showIcon = false,
  maxWidth = 300,
  delay = 300
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringTrigger, setIsHoveringTrigger] = useState(false);
  const [isHoveringTooltip, setIsHoveringTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);
  const hideTimeoutRef = useRef<number | null>(null);

  const explanation = getExplanation(explanationId);

  // Função para ocultar outros tooltips (controle singleton)
  const hideOtherTooltips = () => {
    const existingTooltips = document.querySelectorAll('[data-tooltip-active="true"]');
    existingTooltips.forEach(tooltip => {
      const element = tooltip as HTMLElement;
      if (element !== tooltipRef.current) {
        element.style.display = 'none';
        element.setAttribute('data-tooltip-active', 'false');
      }
    });
  };

  const calculatePosition = () => {
    if (!triggerRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipElement = tooltipRef.current;
    if (!tooltipElement) return;

    // Encontrar o container da questão mais próximo
    const questionContainer = triggerRef.current.closest('.question-container, [data-question-container]') || 
                             triggerRef.current.closest('.bg-slate-800') ||
                             document.body;
    
    const containerRect = questionContainer.getBoundingClientRect();
    
    // Dimensões do tooltip (mais compactas)
    const tooltipWidth = Math.min(maxWidth, containerRect.width - 40);
    const tooltipHeight = 180; // Estimativa menor
    
    // Posição relativa ao trigger
    const triggerCenterX = triggerRect.left + triggerRect.width / 2;
    
    // Calcular posição inicial (centralizada horizontalmente no trigger)
    let left = triggerCenterX - tooltipWidth / 2;
    let top = triggerRect.bottom + 8;
    
    // Ajustar para não sair do container horizontalmente
    const containerLeft = containerRect.left + 20;
    const containerRight = containerRect.right - 20;
    
    if (left < containerLeft) {
      left = containerLeft;
    } else if (left + tooltipWidth > containerRight) {
      left = containerRight - tooltipWidth;
    }
    
    // Ajustar verticalmente se não couber abaixo
    const containerBottom = containerRect.bottom - 20;
    if (top + tooltipHeight > containerBottom) {
      // Colocar acima do trigger
      top = triggerRect.top - tooltipHeight - 8;
      
      // Se ainda não couber, ajustar para dentro do container
      if (top < containerRect.top + 20) {
        top = containerRect.top + 20;
      }
    }

    setTooltipPosition({ top, left });
  };

  const showTooltip = () => {
    if (!explanation) return;
    
    hideOtherTooltips();
    calculatePosition();
    setIsVisible(true);
    
    if (tooltipRef.current) {
      tooltipRef.current.setAttribute('data-tooltip-active', 'true');
    }
  };

  const hideTooltip = () => {
    setIsVisible(false);
    if (tooltipRef.current) {
      tooltipRef.current.setAttribute('data-tooltip-active', 'false');
    }
  };

  const handleMouseEnter = () => {
    if (variant === 'hover') {
      setIsHoveringTrigger(true);
      
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        showTooltip();
      }, delay);
    }
  };

  const handleMouseLeave = () => {
    if (variant === 'hover') {
      setIsHoveringTrigger(false);
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      hideTimeoutRef.current = setTimeout(() => {
        if (!isHoveringTooltip) {
          hideTooltip();
        }
      }, 150);
    }
  };

  const handleTooltipMouseEnter = () => {
    if (variant === 'hover') {
      setIsHoveringTooltip(true);
      
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }
    }
  };

  const handleTooltipMouseLeave = () => {
    if (variant === 'hover') {
      setIsHoveringTooltip(false);
      
      hideTimeoutRef.current = setTimeout(() => {
        if (!isHoveringTrigger) {
          hideTooltip();
        }
      }, 150);
    }
  };

  const handleClick = () => {
    if (variant === 'click') {
      if (isVisible) {
        hideTooltip();
      } else {
        showTooltip();
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isVisible) {
        calculatePosition();
      }
    };

    const handleResize = () => {
      if (isVisible) {
        calculatePosition();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (variant === 'click' && 
          tooltipRef.current && 
          triggerRef.current &&
          !tooltipRef.current.contains(event.target as Node) &&
          !triggerRef.current.contains(event.target as Node)) {
        hideTooltip();
      }
    };

    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [isVisible, variant]);

  if (!explanation) {
    return <span className={className}>{children}</span>;
  }

  // Estilos baseados no tema
  const getThemeStyles = () => {
    switch (theme) {
      case 'dark':
        return {
          trigger: 'text-blue-400 border-b border-dashed border-blue-400 cursor-help hover:text-blue-300',
          tooltip: 'bg-gray-800 text-white border border-gray-600 shadow-lg'
        };
      case 'medical':
        return {
          trigger: 'text-blue-600 border-b border-dashed border-blue-300 cursor-help hover:text-blue-700 hover:border-blue-400 transition-colors duration-200',
          tooltip: 'bg-white text-gray-900 border border-blue-200 shadow-xl'
        };
      default:
        return {
          trigger: 'text-blue-600 border-b border-dashed border-blue-300 cursor-help hover:text-blue-700',
          tooltip: 'bg-white text-gray-900 border border-gray-200 shadow-lg'
        };
    }
  };

  const themeStyles = getThemeStyles();

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'basic': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'medical': return '🏥';
      case 'emergency': return '🚨';
      case 'procedure': return '🔧';
      case 'exam': return '🔬';
      case 'finding': return '🔍';
      case 'medication': return '💊';
      case 'concept': return '💡';
      default: return '📚';
    }
  };

  return (
    <>
      <span
        ref={triggerRef}
        className={`${themeStyles.trigger} ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {children}
        {showIcon && <Info className="inline w-3 h-3 ml-1" />}
      </span>

      {isVisible && (
        <div
          ref={tooltipRef}
          className={`fixed z-[60] p-3 rounded-lg ${themeStyles.tooltip} transition-all duration-200 transform shadow-xl border-2`}
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
            maxWidth: `280px`,
            minWidth: '200px',
            maxHeight: '300px',
            overflow: 'auto'
          }}
          onMouseEnter={handleTooltipMouseEnter}
          onMouseLeave={handleTooltipMouseLeave}
          data-tooltip-active="true"
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm">{getTypeIcon(explanation.type)}</span>
              <h3 className="font-semibold text-xs leading-tight">{explanation.title}</h3>
            </div>
            <button
              onClick={hideTooltip}
              className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 ml-2"
            >
              <X className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-2">
            <p className="text-xs leading-relaxed">{explanation.content}</p>

            {explanation.examples && explanation.examples.length > 0 && (
              <div>
                <h4 className="font-medium text-xs text-gray-600 mb-1">Exemplos:</h4>
                <ul className="text-xs space-y-1 max-h-20 overflow-y-auto">
                  {explanation.examples.slice(0, 3).map((example, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-500 mr-1 flex-shrink-0">•</span>
                      <span className="break-words">{example}</span>
                    </li>
                  ))}
                  {explanation.examples.length > 3 && (
                    <li className="text-gray-500 italic">+{explanation.examples.length - 3} mais...</li>
                  )}
                </ul>
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-gray-200">
              <div className="flex items-center gap-1 flex-wrap">
                {explanation.category && (
                  <span className="px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded text-xs">
                    {explanation.category}
                  </span>
                )}
                {explanation.difficulty && (
                  <span className={`px-1.5 py-0.5 rounded text-xs ${getDifficultyColor(explanation.difficulty)}`}>
                    {explanation.difficulty}
                  </span>
                )}
              </div>
              
              {explanation.relatedLinks && explanation.relatedLinks.length > 0 && (
                <button className="text-blue-600 hover:text-blue-700 transition-colors flex-shrink-0">
                  <ExternalLink className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TextExplanation;