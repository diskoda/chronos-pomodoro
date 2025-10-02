import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useExplanations } from '../hooks/useExplanations';
import type { Explanation } from '../data/explanations';

interface ExplanationsContextType {
  explanations: Record<string, Explanation>;
  loading: boolean;
  error: string | null;
  isReady: boolean;
  useFirebase: boolean;
  setUseFirebase: (use: boolean) => void;
  getExplanation: (id: string) => Explanation | null;
  searchExplanations: (query: string) => Explanation[];
  refreshExplanations: () => Promise<void>;
}

const ExplanationsContext = createContext<ExplanationsContextType | undefined>(undefined);

interface ExplanationsProviderProps {
  children: ReactNode;
}

export const ExplanationsProvider: React.FC<ExplanationsProviderProps> = ({ children }) => {
  const explanationsData = useExplanations();

  return (
    <ExplanationsContext.Provider value={explanationsData}>
      {children}
    </ExplanationsContext.Provider>
  );
};

export const useExplanationsContext = () => {
  const context = useContext(ExplanationsContext);
  if (context === undefined) {
    throw new Error('useExplanationsContext must be used within an ExplanationsProvider');
  }
  return context;
};

// Hook para obter explicação específica com fallback
export const useExplanationById = (id: string): Explanation | null => {
  const { getExplanation, isReady } = useExplanationsContext();
  
  if (!isReady) {
    return null;
  }
  
  return getExplanation(id);
};