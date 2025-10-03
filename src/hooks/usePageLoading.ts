import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useLoading } from '../contexts/LoadingContext';

/**
 * Hook para gerenciar loading em páginas
 * Automaticamente esconde o loading quando a página monta
 */
export function usePageLoading() {
  const { hideLoading, showLoading } = useLoading();
  const location = useLocation();

  // Esconder loading quando a página monta
  useEffect(() => {
    hideLoading();
  }, [location.pathname, hideLoading]);

  return { hideLoading, showLoading };
}

/**
 * Hook específico para navegação com loading
 */
export function useNavigationLoading() {
  const { showLoading } = useLoading();
  
  const navigateWithLoading = useCallback((
    navigationFn: () => void,
    message: string = 'Navegando...',
    variant: 'default' | 'minimal' | 'branded' = 'minimal'
  ) => {
    showLoading(message, variant);
    setTimeout(() => {
      navigationFn();
    }, 300);
  }, [showLoading]);

  return { navigateWithLoading };
}

/**
 * Hook para loading de questões específicas
 */
export function useQuestionLoading() {
  const { showLoading } = useLoading();
  
  const loadQuestion = useCallback((
    questionId: number,
    navigationFn: () => void,
    mode: 'dr-skoda' | 'exam' = 'dr-skoda'
  ) => {
    const message = mode === 'dr-skoda' 
      ? `Preparando questão ${questionId} com Dr. Skoda...`
      : `Carregando questão ${questionId}...`;
    
    showLoading(message, 'default');
    setTimeout(() => {
      navigationFn();
    }, 300);
  }, [showLoading]);

  return { loadQuestion };
}

/**
 * Hook para loading de dados/API
 */
export function useDataLoading() {
  const { showLoading, hideLoading } = useLoading();
  
  const loadData = useCallback(async (
    dataFn: () => Promise<any>,
    message: string = 'Carregando dados...'
  ) => {
    try {
      showLoading(message, 'minimal');
      const result = await dataFn();
      return result;
    } finally {
      hideLoading();
    }
  }, [showLoading, hideLoading]);

  return { loadData };
}