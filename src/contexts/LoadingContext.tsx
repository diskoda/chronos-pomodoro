import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import PageLoading from '../components/common/PageLoading';

interface LoadingContextType {
  isLoading: boolean;
  message: string;
  variant: 'default' | 'minimal' | 'branded';
  showLoading: (message?: string, variant?: 'default' | 'minimal' | 'branded') => void;
  hideLoading: () => void;
  updateMessage: (message: string) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('Carregando...');
  const [variant, setVariant] = useState<'default' | 'minimal' | 'branded'>('default');
  const [timeoutId, setTimeoutId] = useState<number | null>(null);

  const showLoading = (
    loadingMessage: string = 'Carregando...', 
    loadingVariant: 'default' | 'minimal' | 'branded' = 'default'
  ) => {
    // Limpar timeout anterior se existir
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    setMessage(loadingMessage);
    setVariant(loadingVariant);
    setIsLoading(true);

    // Failsafe: automaticamente esconder loading após 10 segundos
    const newTimeoutId = setTimeout(() => {
      console.warn('Loading timeout - escondendo automaticamente após 10s');
      setIsLoading(false);
    }, 10000);
    
    setTimeoutId(newTimeoutId);
  };

  const hideLoading = () => {
    // Limpar timeout se existir
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsLoading(false);
  };

  const updateMessage = (newMessage: string) => {
    setMessage(newMessage);
  };

  const value: LoadingContextType = {
    isLoading,
    message,
    variant,
    showLoading,
    hideLoading,
    updateMessage
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
      {isLoading && (
        <PageLoading 
          message={message}
          variant={variant}
          fullScreen={true}
        />
      )}
    </LoadingContext.Provider>
  );
};

// Hook específico para navegação com loading automático
export const useNavigationWithLoading = () => {
  const { showLoading, hideLoading } = useLoading();

  const navigateWithLoading = (
    navigationFn: () => void | Promise<void>,
    message: string = 'Navegando...'
  ) => {
    showLoading(message, 'minimal');
    
    const execute = async () => {
      try {
        await navigationFn();
        // Aguardar um pouco para mostrar o loading
        setTimeout(() => {
          hideLoading();
        }, 300);
      } catch (error) {
        hideLoading();
        console.error('Erro na navegação:', error);
      }
    };

    execute();
  };

  return { navigateWithLoading };
};