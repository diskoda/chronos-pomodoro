import { Suspense } from 'react';
import type { ReactNode } from 'react';
import PageLoading, { QuestionLoading, DataLoading } from './PageLoading';

interface LoadingWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  type?: 'default' | 'question' | 'data' | 'minimal';
  message?: string;
}

// Wrapper genérico para Suspense com diferentes tipos de loading
export default function LoadingWrapper({ 
  children, 
  fallback, 
  type = 'default',
  message = 'Carregando...' 
}: LoadingWrapperProps) {
  
  const getLoadingComponent = () => {
    if (fallback) return fallback;
    
    switch (type) {
      case 'question':
        return <QuestionLoading />;
      case 'data':
        return <DataLoading type="dados" />;
      case 'minimal':
        return <PageLoading message={message} variant="minimal" />;
      default:
        return <PageLoading message={message} variant="default" />;
    }
  };

  return (
    <Suspense fallback={getLoadingComponent()}>
      {children}
    </Suspense>
  );
}

// Wrapper específico para páginas de questões
export function QuestionPageWrapper({ children }: { children: ReactNode }) {
  return (
    <LoadingWrapper type="question" message="Preparando questão...">
      {children}
    </LoadingWrapper>
  );
}

// Wrapper para carregamento de dados
export function DataPageWrapper({ 
  children, 
  dataType = 'conteúdo' 
}: { 
  children: ReactNode;
  dataType?: string;
}) {
  return (
    <LoadingWrapper type="data" message={`Carregando ${dataType}...`}>
      {children}
    </LoadingWrapper>
  );
}

// Wrapper para navegação rápida
export function NavigationWrapper({ children }: { children: ReactNode }) {
  return (
    <LoadingWrapper type="minimal" message="Navegando...">
      {children}
    </LoadingWrapper>
  );
}