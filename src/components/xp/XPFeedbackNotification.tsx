import { useEffect, useState } from 'react';
import { X, Star, BookOpen, Trophy, Target } from 'lucide-react';

interface XPFeedbackData {
  questionId: number;
  xpGained: number;
  isCorrect: boolean;
  selectedAlternative: string;
  leveledUp?: boolean;
  newLevel?: number;
  timestamp: number;
}

interface XPFeedbackNotificationProps {
  onClose: () => void;
}

export default function XPFeedbackNotification({ onClose }: XPFeedbackNotificationProps) {
  const [xpData, setXpData] = useState<XPFeedbackData | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    console.log('🔍 XPFeedbackNotification montado - verificando localStorage...');
    
    // Verificar se há dados de XP no localStorage
    const storedXPFeedback = localStorage.getItem('xpFeedback');
    console.log('📦 localStorage xpFeedback:', storedXPFeedback);
    
    if (storedXPFeedback) {
      try {
        const data: XPFeedbackData = JSON.parse(storedXPFeedback);
        console.log('✅ Dados de XP encontrados:', data);
        
        // Verificar se a notificação não é muito antiga (máximo 30 minutos)
        const thirtyMinutesAgo = Date.now() - (30 * 60 * 1000);
        const isRecent = data.timestamp > thirtyMinutesAgo;
        console.log('⏰ Verificação de tempo:', {
          timestamp: data.timestamp,
          now: Date.now(),
          isRecent,
          ageInMinutes: (Date.now() - data.timestamp) / (60 * 1000)
        });
        
        if (isRecent) {
          console.log('🎉 Exibindo notificação de XP!');
          setXpData(data);
          setIsVisible(true);
          
          // Remover do localStorage após mostrar
          localStorage.removeItem('xpFeedback');
          console.log('🗑️ localStorage limpo após exibir');
          
          // Mostrar detalhes automaticamente após 1 segundo
          setTimeout(() => setShowDetails(true), 1000);
        } else {
          console.log('⏰ Dados muito antigos, removendo...');
          // Remover dados antigos
          localStorage.removeItem('xpFeedback');
        }
      } catch (error) {
        console.error('❌ Erro ao processar dados de XP:', error);
        localStorage.removeItem('xpFeedback');
      }
    } else {
      console.log('📭 Nenhum dado de XP encontrado no localStorage');
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setXpData(null); // Limpar dados internamente
      if (onClose) onClose(); // Chamar callback se fornecido
    }, 300);
  };

  const handleContinue = () => {
    handleClose();
  };

  // Se não há dados, não renderizar nada
  if (!xpData) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`
        transform transition-all duration-500 ease-out
        ${isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'}
        bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden
        border border-gray-200 dark:border-gray-700
      `}>
        {/* Header com gradiente */}
        <div className={`
          relative p-6 text-white
          ${xpData.isCorrect 
            ? 'bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600' 
            : 'bg-gradient-to-br from-amber-500 via-orange-600 to-red-500'
          }
        `}>
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-2 right-2 w-20 h-20 border border-white/30 rounded-full"></div>
            <div className="absolute bottom-2 left-2 w-16 h-16 border border-white/20 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 w-8 h-8 border border-white/40 rounded-full"></div>
          </div>
          
          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                {xpData.isCorrect ? (
                  <Star className="w-7 h-7 text-white" />
                ) : (
                  <Target className="w-7 h-7 text-white" />
                )}
              </div>
              <div>
                <h3 className="text-xl font-bold">
                  {xpData.isCorrect ? 'Excelente!' : 'Continue Praticando!'}
                </h3>
                <p className="text-white/80 text-sm">
                  Questão #{xpData.questionId} • Alternativa {xpData.selectedAlternative}
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* XP Display */}
        <div className="p-6">
          <div className="text-center mb-6">
            <div className={`
              inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-4 text-3xl font-bold
              ${xpData.isCorrect 
                ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                : 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
              }
            `}>
              +{xpData.xpGained}
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              XP Ganho
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              {xpData.isCorrect 
                ? 'Resposta correta! Continue assim!' 
                : 'Praticar é o caminho para o sucesso!'
              }
            </p>
          </div>

          {/* Level Up Notification */}
          {xpData.leveledUp && xpData.newLevel && (
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl p-6 mb-6 text-center">
              <Trophy className="w-8 h-8 mx-auto mb-3" />
              <p className="font-bold text-xl mb-1">LEVEL UP!</p>
              <p className="text-purple-100">Nível {xpData.newLevel} alcançado</p>
            </div>
          )}

          {/* Details */}
          <div className={`
            transition-all duration-300 overflow-hidden
            ${showDetails ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}
          `}>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600 dark:text-gray-300">Progresso</span>
                </div>
                <span className="font-medium text-gray-900 dark:text-white">
                  {xpData.isCorrect ? 'Acerto' : 'Prática'}
                </span>
              </div>
              {!xpData.isCorrect && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  💡 Dica: Revise os conceitos para melhorar seu desempenho!
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={handleContinue}
              className={`
                flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200
                ${xpData.isCorrect
                  ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-green-500/25'
                  : 'bg-amber-600 hover:bg-amber-700 text-white shadow-lg hover:shadow-amber-500/25'
                }
                transform hover:scale-105
              `}
            >
              {xpData.isCorrect ? '🚀 Próxima Questão' : '📚 Continuar Estudando'}
            </button>
          </div>

          {/* Quick Stats */}
          <div className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
            Continue respondendo questões para ganhar mais XP e subir de nível!
          </div>
        </div>
      </div>
    </div>
  );
}