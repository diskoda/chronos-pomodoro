import { Clock, Lock, User } from 'lucide-react';

interface QuestionCooldownBlockerProps {
  questionId: number;
  mode: 'dr-skoda' | 'exam';
  timeUntilAvailable: string;
  hoursRemaining: number;
  minutesRemaining: number;
  nextAvailableDate: Date;
  lastAttemptDate: Date | null;
  onBack?: () => void;
  className?: string;
}

export default function QuestionCooldownBlocker({
  questionId,
  mode,
  timeUntilAvailable,
  hoursRemaining,
  nextAvailableDate,
  lastAttemptDate,
  onBack,
  className = ''
}: QuestionCooldownBlockerProps) {
  
  const formatDate = (date: Date) => {
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getModeLabel = () => {
    return mode === 'dr-skoda' ? 'Dr. Skoda' : 'Simulado';
  };

  const getCooldownColor = () => {
    if (hoursRemaining >= 12) return 'text-red-600 dark:text-red-400';
    if (hoursRemaining >= 6) return 'text-orange-600 dark:text-orange-400';
    return 'text-yellow-600 dark:text-yellow-400';
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4 ${className}`}>
      <div className="max-w-md w-full">
        
        {/* Card Principal */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
          
          {/* Ícone e Status */}
          <div className="text-center mb-6">
            <div className="mx-auto w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            </div>
            
            <h1 className="text-xl font-bold theme-text-primary mb-2">
              Questão Temporariamente Indisponível
            </h1>
            
            <p className="theme-text-secondary text-sm">
              Você precisa aguardar antes de tentar esta questão novamente.
            </p>
          </div>

          {/* Informações da Questão */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="font-medium theme-text-primary">Questão #{questionId}</span>
                <span className="text-gray-400">•</span>
                <span className="theme-text-secondary">{getModeLabel()}</span>
              </div>
              <User className="w-4 h-4 theme-text-secondary" />
            </div>
          </div>

          {/* Tempo Restante */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Clock className={`w-5 h-5 ${getCooldownColor()}`} />
              <span className="text-sm theme-text-secondary">Tempo restante:</span>
            </div>
            
            <div className={`text-2xl font-bold ${getCooldownColor()} mb-2`}>
              {timeUntilAvailable}
            </div>
            
            <p className="text-xs theme-text-secondary">
              Disponível novamente em: {formatDate(nextAvailableDate)}
            </p>
          </div>

          {/* Detalhes do Cooldown */}
          <div className="border-t border-gray-200 dark:border-gray-600 pt-4 mb-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <div className="theme-text-secondary mb-1">Última tentativa</div>
                <div className="font-medium theme-text-primary">
                  {lastAttemptDate ? formatDate(lastAttemptDate) : 'N/A'}
                </div>
              </div>
              
              <div className="text-center">
                <div className="theme-text-secondary mb-1">Sistema de controle</div>
                <div className="font-medium theme-text-primary">24 horas</div>
              </div>
            </div>
          </div>

          {/* Explicação do Sistema */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
              Por que existe este limite?
            </h3>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• Promove estudo espaçado e retenção</li>
              <li>• Evita tentativas excessivas</li>
              <li>• Incentiva revisão de conteúdo</li>
            </ul>
          </div>

          {/* Ações */}
          <div className="space-y-3">
            {/* Botão Voltar */}
            {onBack && (
              <button
                onClick={onBack}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
              >
                Voltar às Questões
              </button>
            )}
            
            {/* Dica de Estudo */}
            <div className="text-center">
              <p className="text-xs theme-text-secondary">
                Enquanto aguarda, que tal revisar outras questões disponíveis?
              </p>
            </div>
          </div>
        </div>

        {/* Informação Adicional */}
        <div className="mt-4 text-center">
          <p className="text-xs theme-text-secondary">
            O tempo de cooldown é baseado em sua última tentativa nesta questão.
          </p>
        </div>
      </div>
    </div>
  );
}