import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface TooltipContextType {
  activeTooltipId: string | null;
  setActiveTooltip: (id: string | null) => void;
  isTooltipActive: (id: string) => boolean;
}

const TooltipContext = createContext<TooltipContextType | undefined>(undefined);

export const useTooltip = () => {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error('useTooltip must be used within a TooltipProvider');
  }
  return context;
};

interface TooltipProviderProps {
  children: ReactNode;
}

export const TooltipProvider: React.FC<TooltipProviderProps> = ({ children }) => {
  const [activeTooltipId, setActiveTooltipId] = useState<string | null>(null);

  const setActiveTooltip = (id: string | null) => {
    setActiveTooltipId(id);
  };

  const isTooltipActive = (id: string) => {
    return activeTooltipId === id;
  };

  return (
    <TooltipContext.Provider value={{
      activeTooltipId,
      setActiveTooltip,
      isTooltipActive
    }}>
      {children}
    </TooltipContext.Provider>
  );
};