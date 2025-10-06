import { Loader2 } from 'lucide-react';

interface PageLoadingProps {
  message?: string;
  className?: string;
  fullScreen?: boolean;
  showLogo?: boolean;
  variant?: 'default' | 'minimal' | 'branded';
}

export default function PageLoading({ 
  message = 'Carregando...', 
  className = '',
  fullScreen = true,
  showLogo = true,
  variant = 'default'
}: PageLoadingProps) {

  // Variante minimal - apenas spinner pequeno
  if (variant === 'minimal') {
    return (
      <div className={`flex items-center justify-center p-4 ${className}`}>
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm">{message}</span>
        </div>
      </div>
    );
  }

  // Variante branded - com logo e identidade visual
  if (variant === 'branded') {
    return (
      <div className={`${fullScreen ? 'fixed inset-0 z-50' : ''} bg-white dark:bg-gray-900 flex items-center justify-center ${className}`}>
        <div className="text-center">
          {/* Logo/Ícone */}
          <div className="mb-6">
            <div className="mx-auto mb-4 flex items-center justify-center">
              <img 
                src="/logos/penaped_shadow.png" 
                alt="Logo Pénaped" 
                className="w-20 h-20 object-contain"
              />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              #PéNaPED
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Plataforma de Estudos em Pediatria
            </p>
          </div>

          {/* Loading Animation */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600 dark:text-blue-400" />
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              {message}
            </span>
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center gap-1">
            <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
            <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
          </div>
        </div>
      </div>
    );
  }

  // Variante default - padrão equilibrado
  return (
    <div className={`${fullScreen ? 'fixed inset-0 z-50' : ''} bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center ${className}`}>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 text-center max-w-sm w-full mx-4">
        
        {/* Logo/Ícone (se habilitado) */}
        {showLogo && (
          <div className="mb-6">
            <div className="mx-auto mb-3 flex items-center justify-center">
              <img 
                src="/logos/penaped_shadow.png" 
                alt="Logo Pénaped" 
                className="w-16 h-16 object-contain"
              />
            </div>
          </div>
        )}

        {/* Spinner e Mensagem */}
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 dark:text-blue-400" />
          
          <div>
            <p className="text-gray-900 dark:text-white font-medium mb-1">
              {message}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Aguarde um momento...
            </p>
          </div>
        </div>

        {/* Barra de Progresso Indeterminada */}
        <div className="mt-6">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente específico para loading de questões
export function QuestionLoading({ questionId }: { questionId?: number }) {
  return (
    <PageLoading 
      message={questionId ? `Preparando questão ${questionId}...` : 'Carregando questão...'}
      variant="default"
      showLogo={true}
    />
  );
}

// Componente para loading de navegação
export function NavigationLoading() {
  return (
    <PageLoading 
      message="Navegando..."
      variant="minimal"
      fullScreen={false}
      showLogo={false}
    />
  );
}

// Componente para loading de autenticação
export function AuthLoading() {
  return (
    <PageLoading 
      message="Verificando autenticação..."
      variant="branded"
      showLogo={true}
    />
  );
}

// Componente para loading de dados
export function DataLoading({ type = 'dados' }: { type?: string }) {
  return (
    <PageLoading 
      message={`Carregando ${type}...`}
      variant="default"
      showLogo={false}
    />
  );
}