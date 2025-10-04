import { forwardRef } from 'react';
import type { ReactNode } from 'react';
import { useGlowEffect } from '../../hooks/useGlowEffect';

interface GlowWrapperProps {
  children: ReactNode;
  color?: 'blue' | 'purple' | 'green' | 'orange';
  intensity?: 'normal' | 'intense';
  pulse?: boolean;
  triggerOn?: 'hover' | 'focus' | 'active' | 'manual';
  autoTrigger?: boolean;
  className?: string;
  as?: string;
  [key: string]: any;
}

const GlowWrapper = forwardRef<HTMLElement, GlowWrapperProps>(({
  children,
  color = 'blue',
  intensity = 'normal',
  pulse = false,
  triggerOn = 'hover',
  autoTrigger = false,
  className = '',
  as: Component = 'div',
  ...props
}, ref) => {
  const { glowProps } = useGlowEffect({
    color,
    intensity,
    pulse,
    triggerOn,
    autoTrigger
  });

  return (
    <Component
      {...props}
      {...glowProps}
      ref={ref}
      className={`${glowProps.className} ${className}`}
    >
      {children}
    </Component>
  );
});

GlowWrapper.displayName = 'GlowWrapper';

export default GlowWrapper;