import { useState, useRef, useEffect } from 'react';

interface GlowEffectOptions {
  color?: 'blue' | 'purple' | 'green' | 'orange';
  intensity?: 'normal' | 'intense';
  pulse?: boolean;
  triggerOn?: 'hover' | 'focus' | 'active' | 'manual';
  autoTrigger?: boolean;
}

export function useGlowEffect({
  color = 'blue',
  intensity = 'normal',
  pulse = false,
  triggerOn = 'hover',
  autoTrigger = false
}: GlowEffectOptions = {}) {
  const [isGlowing, setIsGlowing] = useState(autoTrigger);
  const elementRef = useRef<HTMLDivElement>(null);

  // Gera as classes CSS baseadas nas opções
  const getGlowClasses = () => {
    const classes = ['glow-border'];
    
    // Adiciona cor
    classes.push(`glow-border-${color}`);
    
    // Adiciona intensidade
    if (intensity === 'intense') {
      classes.push('glow-border-intense');
    }
    
    // Adiciona pulso
    if (pulse) {
      classes.push('glow-border-pulse');
    }
    
    // Adiciona estado ativo se necessário
    if (isGlowing || triggerOn === 'manual') {
      classes.push('active');
    }
    
    return classes.join(' ');
  };

  // Funções de controle manual
  const startGlow = () => setIsGlowing(true);
  const stopGlow = () => setIsGlowing(false);
  const toggleGlow = () => setIsGlowing(!isGlowing);

  // Props para adicionar ao elemento
  const glowProps = {
    ref: elementRef,
    className: getGlowClasses(),
    ...(triggerOn === 'hover' && {
      onMouseEnter: startGlow,
      onMouseLeave: stopGlow,
    }),
    ...(triggerOn === 'focus' && {
      onFocus: startGlow,
      onBlur: stopGlow,
    }),
  };

  // Auto trigger effect
  useEffect(() => {
    if (autoTrigger) {
      const timer = setTimeout(() => {
        setIsGlowing(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [autoTrigger]);

  return {
    glowProps,
    isGlowing,
    startGlow,
    stopGlow,
    toggleGlow,
    glowClasses: getGlowClasses()
  };
}

// Hook simplificado para uso rápido
export function useSimpleGlow(color: 'blue' | 'purple' | 'green' | 'orange' = 'blue') {
  return useGlowEffect({ color, triggerOn: 'hover' });
}

// Hook para componentes que devem sempre brilhar
export function useAlwaysGlow(color: 'blue' | 'purple' | 'green' | 'orange' = 'blue') {
  return useGlowEffect({ color, triggerOn: 'manual', autoTrigger: true, pulse: true });
}