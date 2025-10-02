import React, { useState, useRef, useEffect } from 'react';
import { Info, X, ExternalLink } from 'lucide-react';
// Removendo TooltipContext - funcionará sem contexto global

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

// Base das explicações
const explanations = {
  asma: {
    title: 'Asma',
    content: 'Doença inflamatória crônica das vias aéreas caracterizada por obstrução reversível do fluxo aéreo.',
    type: 'medical',
    category: 'Pneumologia',
    source: 'GINA 2023'
  },
  broncoespasmo: {
    title: 'Broncoespasmo',
    content: 'Contração súbita e involuntária dos músculos lisos dos brônquios, causando estreitamento das vias aéreas.',
    type: 'medical',
    category: 'Pneumologia',
    source: 'Literatura Médica'
  },
  dispneia: {
    title: 'Dispneia',
    content: 'Sensação subjetiva de dificuldade respiratória ou falta de ar.',
    type: 'symptom',
    category: 'Semiologia',
    source: 'Semiologia Médica'
  },
  sibilos: {
    title: 'Sibilos',
    content: 'Sons respiratórios adventícios agudos e musicais, audíveis durante a expiração.',
    type: 'finding',
    category: 'Semiologia',
    source: 'Ausculta Pulmonar'
  },
  beta2agonista: {
    title: 'Beta-2 Agonista',
    content: 'Medicamentos broncodilatadores que atuam nos receptores beta-2 adrenérgicos.',
    type: 'medication',
    category: 'Farmacologia',
    source: 'Farmacologia Clínica'
  },
  corticoide: {
    title: 'Corticoide',
    content: 'Anti-inflamatórios esteroides utilizados no controle da inflamação nas vias aéreas.',
    type: 'medication',
    category: 'Farmacologia',
    source: 'Farmacologia Clínica'
  },
  pneumotorax: {
    title: 'Pneumotórax',
    content: 'Presença de ar na cavidade pleural, causando colapso pulmonar.',
    type: 'medical',
    category: 'Pneumologia',
    source: 'Emergências Médicas'
  },
  taquicardia: {
    title: 'Taquicardia',
    content: 'Frequência cardíaca acima de 100 batimentos por minuto em adultos.',
    type: 'finding',
    category: 'Cardiologia',
    source: 'Cardiologia Clínica'
  },
  hipoxemia: {
    title: 'Hipoxemia',
    content: 'Diminuição da concentração de oxigênio no sangue arterial.',
    type: 'finding',
    category: 'Gasometria',
    source: 'Medicina Intensiva'
  },
  Peak_flow: {
    title: 'Peak Flow',
    content: 'Medida do pico de fluxo expiratório máximo, usado para monitorar a função pulmonar.',
    type: 'exam',
    category: 'Pneumologia',
    source: 'Espirometria'
  },
  VEF1: {
    title: 'VEF1',
    content: 'Volume Expiratório Forçado no primeiro segundo - medida da função pulmonar.',
    type: 'exam',
    category: 'Pneumologia',
    source: 'Espirometria'
  },
  CVF: {
    title: 'CVF',
    content: 'Capacidade Vital Forçada - volume máximo de ar que pode ser expirado após inspiração máxima.',
    type: 'exam',
    category: 'Pneumologia',
    source: 'Espirometria'
  },
  status_asmaticus: {
    title: 'Status Asmático',
    content: 'Crise asmática grave e prolongada que não responde ao tratamento convencional.',
    type: 'emergency',
    category: 'Emergência',
    source: 'Medicina de Emergência'
  },
  salbutamol: {
    title: 'Salbutamol',
    content: 'Beta-2 agonista de curta duração usado como broncodilatador de alívio rápido.',
    type: 'medication',
    category: 'Farmacologia',
    source: 'RENAME'
  },
  prednisolona: {
    title: 'Prednisolona',
    content: 'Corticosteroide oral usado no tratamento anti-inflamatório da asma.',
    type: 'medication',
    category: 'Farmacologia',
    source: 'RENAME'
  },
  oximetria: {
    title: 'Oximetria',
    content: 'Método não invasivo para medir a saturação de oxigênio no sangue.',
    type: 'exam',
    category: 'Monitorização',
    source: 'Medicina Intensiva'
  },
  cianose: {
    title: 'Cianose',
    content: 'Coloração azulada da pele e mucosas devido à hipoxemia.',
    type: 'finding',
    category: 'Semiologia',
    source: 'Semiologia Médica'
  },
  tiragem: {
    title: 'Tiragem',
    content: 'Retração dos músculos acessórios da respiração, indicando esforço respiratório.',
    type: 'finding',
    category: 'Semiologia',
    source: 'Semiologia Médica'
  },
  hiperreatividade: {
    title: 'Hiperreatividade Brônquica',
    content: 'Resposta exagerada dos brônquios a estímulos que normalmente não causariam broncoconstrição.',
    type: 'pathophysiology',
    category: 'Fisiopatologia',
    source: 'Pneumologia'
  },
  atopia: {
    title: 'Atopia',
    content: 'Tendência hereditária a desenvolver reações alérgicas mediadas por IgE.',
    type: 'pathophysiology',
    category: 'Imunologia',
    source: 'Alergia e Imunologia'
  },
  eosinofilia: {
    title: 'Eosinofilia',
    content: 'Aumento do número de eosinófilos no sangue, comum em doenças alérgicas.',
    type: 'finding',
    category: 'Hematologia',
    source: 'Laboratório Clínico'
  },
  IgE: {
    title: 'IgE',
    content: 'Imunoglobulina E - anticorpo envolvido em reações alérgicas e resposta a parasitas.',
    type: 'biomarker',
    category: 'Imunologia',
    source: 'Laboratório Clínico'
  },
  nebulizacao: {
    title: 'Nebulização',
    content: 'Administração de medicamentos por via inalatória através de partículas em suspensão.',
    type: 'procedure',
    category: 'Terapêutica',
    source: 'Pneumologia'
  },
  spacer: {
    title: 'Espaçador (Spacer)',
    content: 'Dispositivo que melhora a deposição pulmonar de medicamentos inalatórios.',
    type: 'device',
    category: 'Terapêutica',
    source: 'Pneumologia'
  }
};

const getExplanation = (id: string) => {
  return explanations[id as keyof typeof explanations] || null;
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
  const [actualPosition, setActualPosition] = useState<'top' | 'bottom'>('top');
  const elementRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<number | null>(null);
  const hideTimeoutRef = useRef<number | null>(null);

  // Solução simples sem TooltipContext
  const tooltipId = `tooltip-${explanationId}-${Math.random().toString(36).substr(2, 9)}`;
  
  // Controle singleton simples usando eventos DOM
  const hideOtherTooltips = () => {
    // Esconder todos os outros tooltips
    const allTooltips = document.querySelectorAll('[data-tooltip]');
    allTooltips.forEach((tooltip) => {
      if (tooltip.getAttribute('data-tooltip') !== tooltipId) {
        const tooltipElement = tooltip as HTMLElement;
        tooltipElement.style.display = 'none';
      }
    });
  };

  const showThisTooltip = () => {
    hideOtherTooltips();
    setIsVisible(true);
  };

  // Funções simplificadas
  const setActiveTooltip = (_id: string | null) => {
    // Implementação usando DOM events
  };
  
  const isTooltipActive = (_id: string) => {
    return isVisible;
  };

  // Buscar explicação
  const explanation = getExplanation(explanationId);

  if (!explanation) {
    return <span className={className}>{children}</span>;
  }

  // Função para calcular posição do tooltip
  const calculatePosition = (mouseX: number, mouseY: number) => {
    const tooltipWidth = 320;
    const tooltipHeight = 200;
    const offset = 10;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let left = mouseX + offset;
    let top = mouseY - tooltipHeight - offset;

    // Ajustar horizontalmente se sair da tela
    if (left + tooltipWidth > viewportWidth) {
      left = mouseX - tooltipWidth - offset;
    }

    // Ajustar verticalmente se sair da tela
    if (top < 0) {
      top = mouseY + offset;
      setActualPosition('bottom');
    } else {
      setActualPosition('top');
    }

    // Garantir que não saia das bordas
    left = Math.max(10, Math.min(left, viewportWidth - tooltipWidth - 10));
    top = Math.max(10, Math.min(top, viewportHeight - tooltipHeight - 10));

    return { top, left };
  };

  // Função para esconder tooltip imediatamente
  const hideTooltipImmediately = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    setIsVisible(false);
    setActiveTooltip(null);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }

    setIsHoveringTrigger(false);
    
    if (variant === 'hover' && !isHoveringTooltip) {
      setIsVisible(false);
      setActiveTooltip(null);
    }
  };

  const scheduleHide = () => {
    hideTimeoutRef.current = setTimeout(() => {
      // Verificar se ainda não está hover em nenhum elemento
      if (!isHoveringTrigger && !isHoveringTooltip) {
        setIsVisible(false);
        setActiveTooltip(null);
      }
    }, 100);
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    // Limpar outros tooltips ativos
    setActiveTooltip(null);
    
    setIsHoveringTrigger(true);
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }

    if (variant === 'hover') {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }

      hoverTimeoutRef.current = setTimeout(() => {
        const position = calculatePosition(e.clientX, e.clientY);
        setTooltipPosition(position);
        showThisTooltip();
        setActiveTooltip(tooltipId);
      }, delay);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isVisible) {
      const position = calculatePosition(e.clientX, e.clientY);
      setTooltipPosition(position);
    }
  };

  const handleTooltipMouseEnter = () => {
    setIsHoveringTooltip(true);
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
  };

  const handleTooltipMouseLeave = () => {
    setIsHoveringTooltip(false);
    scheduleHide();
  };

  const handleClick = (e: React.MouseEvent) => {
    if (variant === 'click') {
      e.preventDefault();
      const position = calculatePosition(e.clientX, e.clientY);
      setTooltipPosition(position);
      
      if (isTooltipActive(tooltipId)) {
        setIsVisible(false);
        setActiveTooltip(null);
      } else {
        setActiveTooltip(null); // Limpar outros tooltips
        setIsVisible(true);
        setActiveTooltip(tooltipId);
      }
    }
  };

  // Limpar timeouts quando componente desmonta
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  // Verificar se este tooltip deve estar visível
  const shouldShowTooltip = isVisible && isTooltipActive(tooltipId);

  // Função para obter o ícone baseado no tipo
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'medical':
      case 'pathophysiology':
        return '🏥';
      case 'symptom':
      case 'finding':
        return '🔍';
      case 'medication':
        return '💊';
      case 'exam':
      case 'procedure':
        return '📋';
      case 'emergency':
        return '🚨';
      case 'biomarker':
        return '🧪';
      case 'device':
        return '🔧';
      default:
        return '📚';
    }
  };

  // Função para obter rótulo do tipo
  const getTypeLabel = (type: string) => {
    const labels = {
      medical: 'Condição Médica',
      symptom: 'Sintoma',
      finding: 'Achado Clínico',
      medication: 'Medicamento',
      exam: 'Exame',
      procedure: 'Procedimento',
      emergency: 'Emergência',
      pathophysiology: 'Fisiopatologia',
      biomarker: 'Biomarcador',
      device: 'Dispositivo'
    };
    return labels[type as keyof typeof labels] || 'Explicação';
  };

  return (
    <>
      <span
        ref={elementRef}
        className={`
          relative inline-block cursor-help transition-all duration-200 font-medium
          text-blue-600 hover:text-blue-800 
          border-b border-dashed border-blue-400 hover:border-blue-600
          hover:bg-blue-50 rounded-sm px-0.5
          ${variant === 'click' ? 'bg-blue-50' : ''}
          ${className}
        `}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
        title={variant === 'click' ? 'Clique para ver explicação' : undefined}
      >
        {children}
        {showIcon && (
          <Info className="inline w-3 h-3 ml-1 opacity-60" />
        )}
      </span>

      {shouldShowTooltip && (
        <div
          ref={tooltipRef}
          data-tooltip={tooltipId}
          className={`
            fixed z-[9999] p-4 rounded-lg shadow-2xl border max-w-sm
            transform transition-all duration-300 ease-out
            ${actualPosition === 'bottom' ? 'animate-slideInDown' : 'animate-slideInUp'}
            ${theme === 'dark' ? 'bg-gray-800 text-white border-gray-600' : 
              theme === 'medical' ? 'bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-800 border-blue-200' :
              'bg-white text-gray-800 border-gray-200'}
          `}
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
            maxWidth: `${maxWidth}px`,
            pointerEvents: 'auto'
          }}
          onMouseEnter={handleTooltipMouseEnter}
          onMouseLeave={handleTooltipMouseLeave}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">{getTypeIcon(explanation.type)}</span>
              <h3 className={`font-semibold text-sm ${
                theme === 'medical' ? 'text-blue-800' : 
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>
                {explanation.title}
              </h3>
            </div>
            <button
              onClick={hideTooltipImmediately}
              className={`p-1 rounded hover:bg-opacity-20 transition-colors ${
                theme === 'dark' ? 'hover:bg-white' : 'hover:bg-gray-500'
              }`}
            >
              <X className="w-3 h-3" />
            </button>
          </div>

          {/* Tipo */}
          <div className={`inline-block px-2 py-1 text-xs rounded-full mb-2 ${
            theme === 'medical' ? 'bg-blue-100 text-blue-700' :
            theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
          }`}>
            {getTypeLabel(explanation.type)}
          </div>

          {/* Conteúdo */}
          <p className={`text-sm leading-relaxed mb-3 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {explanation.content}
          </p>

          {/* Footer */}
          <div className={`flex items-center justify-between text-xs ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <span className="flex items-center gap-1">
              <span className="font-medium">{explanation.category}</span>
            </span>
            <span className="flex items-center gap-1">
              <ExternalLink className="w-3 h-3" />
              {explanation.source}
            </span>
          </div>

          {/* Seta indicadora */}
          <div 
            className={`absolute w-0 h-0 ${
              actualPosition === 'bottom' 
                ? 'top-[-6px] border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent' 
                : 'bottom-[-6px] border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent'
            } ${
              theme === 'dark' ? 
                (actualPosition === 'bottom' ? 'border-b-gray-800' : 'border-t-gray-800') :
              theme === 'medical' ? 
                (actualPosition === 'bottom' ? 'border-b-blue-50' : 'border-t-blue-50') :
                (actualPosition === 'bottom' ? 'border-b-white' : 'border-t-white')
            }`}
            style={{ left: '20px' }}
          />
        </div>
      )}
    </>
  );
};

export default TextExplanation;