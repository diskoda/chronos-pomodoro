import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuestion } from '../hooks/useQuestions';
import { useUserQuestionAttempt } from '../hooks/useUserQuestionAttempts';
import { usePageLoading } from '../hooks/usePageLoading';
import { giveXPForQuestionCompletion } from '../hooks/useSimpleXP';
import QuestionSolverHeader from '../components/questionSolver/QuestionSolverHeader';
import QuestionInfo from '../components/common/QuestionInfo';
import QuestionStatement from '../components/questionSolver/QuestionStatement';
import QuestionAlternatives from '../components/questionSolver/QuestionAlternatives';
import QuestionActions from '../components/questionSolver/QuestionActions';
import QuestionNotFound from '../components/questionSolver/QuestionNotFound';
import { FlowProvider, useQuestionFlow, QuestionFlowManager, FlowProgressIndicator } from '../components/questionFlow';
import { getQuestionFlowData } from '../data/enhancedQuestionFlowData';

// Componente de notificação de level up
interface LevelUpNotificationProps {
  newLevel: number;
  newTitle: string;
  onClose: () => void;
}

function LevelUpNotification({ newLevel, newTitle, onClose }: LevelUpNotificationProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-6 rounded-lg shadow-2xl max-w-sm">
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 mr-3 bg-yellow-400 rounded-full flex items-center justify-center">
            📚
          </div>
          <div>
            <h3 className="font-bold text-lg">Level Up!</h3>
            <p className="text-sm opacity-90">Questões</p>
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-3xl font-bold mb-1">Nível {newLevel}</div>
          <div className="text-lg italic">{newTitle}</div>
        </div>
        
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white/70 hover:text-white"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

// ==========================================
// COMPONENTE PRINCIPAL COM SISTEMA COMPONENTIZADO
// ==========================================

export default function QuestionSolver() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const questionId = parseInt(id || '0');
  
  // Hook que automaticamente esconde loading quando a página carrega
  usePageLoading();
  
  // Estado para notificações de level up
  const [levelUpNotification, setLevelUpNotification] = useState<{
    newLevel: number;
    newTitle: string;
  } | null>(null);
  
  // Usar o hook Firebase para buscar a questão
  const { question, loading, error } = useQuestion(id || null);
  
  // Buscar dados do fluxo da questão
  const flowData = getQuestionFlowData(questionId);

  const handleBack = () => {
    navigate('/study');
  };

  const handleFlowFinish = () => {
    navigate('/questions');
  };

  // Função para registrar atividade XP (simplificada)
  const handleRecordXP = async (_isCorrect: boolean, _metadata: any = {}) => {
    try {
      // Sistema XP simplificado - sempre dá XP por completar questão
      // Não importa se está correto ou não
      if (questionId) {
        await giveXPForQuestionCompletion(questionId);
      }
    } catch (error) {
      console.error('Erro ao registrar XP:', error);
    }
  };

  // Estados de loading e erro
  if (loading) {
    return (
      <div className="dashboard-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center min-h-96">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="theme-text-secondary">Carregando questão...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <QuestionNotFound 
        onBack={handleBack}
        message={error}
        buttonText="Voltar aos modos de estudo"
      />
    );
  }

  // Estado de questão não encontrada
  if (!question) {
    return (
      <QuestionNotFound 
        onBack={handleBack}
        message="Questão não encontrada"
        buttonText="Voltar aos modos de estudo"
      />
    );
  }

  // Se não há dados de fluxo, usar interface simples
  if (!flowData) {
    return (
      <>
        <SimpleQuestionInterface 
          question={question}
          onBack={handleBack}
          onRecordXP={handleRecordXP}
        />
        {levelUpNotification && (
          <LevelUpNotification
            newLevel={levelUpNotification.newLevel}
            newTitle={levelUpNotification.newTitle}
            onClose={() => setLevelUpNotification(null)}
          />
        )}
      </>
    );
  }

  // Interface integrada com Dr. Skoda
  return (
    <>
      <FlowProvider questionData={flowData}>
        <IntegratedQuestionInterface 
          question={question}
          onBack={handleBack}
          onFlowFinish={handleFlowFinish}
          onRecordXP={handleRecordXP}
        />
      </FlowProvider>
      {levelUpNotification && (
        <LevelUpNotification
          newLevel={levelUpNotification.newLevel}
          newTitle={levelUpNotification.newTitle}
          onClose={() => setLevelUpNotification(null)}
        />
      )}
    </>
  );
}

// ==========================================
// INTERFACE INTEGRADA COM DR. SKODA
// ==========================================

interface IntegratedQuestionInterfaceProps {
  question: any;
  onBack: () => void;
  onFlowFinish: () => void;
  onRecordXP: (isCorrect: boolean, metadata?: any) => Promise<any>;
}

function IntegratedQuestionInterface({ 
  question, 
  onBack, 
  onFlowFinish,
  onRecordXP
}: IntegratedQuestionInterfaceProps) {
  const [selectedAlternative, setSelectedAlternative] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [startTime] = useState<Date>(new Date());
  
  // Dados de XP simplificados (sem contexto)
  const questionsLevel = 1;
  const questionsTitle = "Iniciante";
  const currentXP = 0;
  const xpToNextLevel = 100;
  
  const { 
    currentStage, 
    selectAlternative,
    goToStage,
    selectedAlternative: contextSelectedAlternative,
    isCorrect
  } = useQuestionFlow();

  // Hook para gerenciar tentativas (Firebase)
  const { createAttempt } = useUserQuestionAttempt(parseInt(question.id));

  const handleAlternativeSelect = (alternative: string) => {
    if (!isSubmitted && currentStage === 'question') {
      setSelectedAlternative(alternative);
      
      // Extrair apenas a letra da alternativa para o sistema Dr. Skoda
      const letterMatch = alternative.match(/^\(([A-Z])\)/);
      const letter = letterMatch ? letterMatch[1] : alternative;
      
      console.log('🔍 DEBUG - Alternative selection:', {
        fullAlternative: alternative,
        extractedLetter: letter,
        regex: letterMatch
      });
      
      selectAlternative(letter);
    }
  };

  const handleSubmit = () => {
    if (selectedAlternative && currentStage === 'question') {
      setIsSubmitted(true);
      goToStage('explanation');
    }
  };

  // Função para salvar resultado e finalizar
  const handleFlowFinishWithSave = async () => {
    // Usar a alternativa do contexto ou a local como fallback
    const finalSelectedAlternative = contextSelectedAlternative || selectedAlternative;
    
    if (finalSelectedAlternative) {
      // Calcular tempo gasto
      const timeSpent = Math.floor((new Date().getTime() - startTime.getTime()) / 1000 / 60); // em minutos
      
      // Registrar XP antes de salvar tentativa
      await onRecordXP(isCorrect, {
        timeSpent: timeSpent
      });
      
      // Salvar resultado da tentativa no Firebase
      await createAttempt(finalSelectedAlternative, isCorrect);
    }

    // Chamar callback de finalização (redirecionamento)
    onFlowFinish();
  };

  return (
    <div className="dashboard-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Barra de XP - Questões */}
        <div className="max-w-4xl mx-auto mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  📚
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-200">
                    Questões - Nível {questionsLevel}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{questionsTitle}</p>
                </div>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                XP: {currentXP}/{xpToNextLevel}
              </div>
            </div>
            
            <div className="mt-3">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((currentXP / xpToNextLevel) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={`max-w-4xl mx-auto transition-opacity duration-300 ${
          (currentStage === 'begin' || currentStage === 'explanation' || currentStage === 'analysis') 
            ? 'pointer-events-none opacity-50' 
            : ''
        }`}>
          
          {/* Indicador de Progresso do Fluxo - Componente Dedicado */}
          <FlowProgressIndicator className="mb-6" showDetails={true} />
          
          <QuestionSolverHeader 
            onBack={onBack}
            backButtonText="Voltar"
          />

          <QuestionInfo 
            question={question}
            showTags={true}
            showTimeEstimate={true}
            className="mb-6"
          />

          {question.statement && (
            <div className="mb-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
                <QuestionStatement 
                  statement={question.statement}
                  className=""
                />
              </div>
            </div>
          )}

          {question.alternatives && (
            <div className="mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center">
                    <span className="mr-2">🎯</span>
                    Escolha a melhor alternativa:
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Analise cada opção cuidadosamente antes de decidir
                  </p>
                </div>
                <div className="p-6">
                  <QuestionAlternatives
                    alternatives={question.alternatives}
                    selectedAlternative={selectedAlternative}
                    onSelect={handleAlternativeSelect}
                    isSubmitted={isSubmitted}
                    className=""
                  />
                </div>
              </div>
            </div>
          )}

          {(currentStage === 'question' || currentStage === 'explanation' || currentStage === 'analysis') && (
            <div className="text-center">
              <QuestionActions
                isSubmitted={isSubmitted}
                selectedAlternative={selectedAlternative}
                onSubmit={handleSubmit}
                onFinish={onBack}
                submitButtonText={selectedAlternative ? "🚀 Confirmar Resposta" : "Selecione uma alternativa"}
                finishButtonText="Finalizar"
                feedbackMessage="Resposta enviada!"
              />
              
              {selectedAlternative && !isSubmitted && currentStage === 'question' && (
                <div className="mt-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                    <p className="text-sm text-blue-700 dark:text-blue-300 flex items-center justify-center">
                      <span className="mr-2">💡</span>
                      Você selecionou a alternativa <strong>{selectedAlternative}</strong>. Confirme sua resposta para continuar!
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Dr. Skoda Flow Manager - Sistema Componentizado */}
        <QuestionFlowManager onFinish={handleFlowFinishWithSave} />

      </div>
    </div>
  );
}

// ==========================================
// INTERFACE SIMPLES SEM DR. SKODA (FALLBACK)
// ==========================================

interface SimpleQuestionInterfaceProps {
  question: any;
  onBack: () => void;
  onRecordXP: (isCorrect: boolean, metadata?: any) => Promise<any>;
}

function SimpleQuestionInterface({ 
  question, 
  onBack,
  onRecordXP
}: SimpleQuestionInterfaceProps) {
  const [selectedAlternative, setSelectedAlternative] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [startTime] = useState<Date>(new Date());
  
  // Dados de XP simplificados (sem contexto)
  const questionsLevel = 1;
  const questionsTitle = "Iniciante";
  const currentXP = 0;
  const xpToNextLevel = 100;

  const handleAlternativeSelect = (alternative: string) => {
    if (!isSubmitted) {
      setSelectedAlternative(alternative);
    }
  };

  const handleSubmit = async () => {
    if (selectedAlternative) {
      setIsSubmitted(true);
      
      // Verificar se a resposta está correta (simulação básica)
      const isCorrect = selectedAlternative.includes('(A)'); // Simulação - normalmente viria dos dados da questão
      const timeSpent = Math.floor((new Date().getTime() - startTime.getTime()) / 1000 / 60);
      
      // Registrar XP
      await onRecordXP(isCorrect, {
        timeSpent: timeSpent
      });
    }
  };

  return (
    <div className="dashboard-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Barra de XP - Questões */}
        <div className="max-w-4xl mx-auto mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  📚
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-200">
                    Questões - Nível {questionsLevel}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{questionsTitle}</p>
                </div>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                XP: {currentXP}/{xpToNextLevel}
              </div>
            </div>
            
            <div className="mt-3">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((currentXP / xpToNextLevel) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          
          <QuestionSolverHeader 
            onBack={onBack}
            backButtonText="Voltar"
          />

          <QuestionInfo 
            question={question}
            showTags={true}
            showTimeEstimate={true}
            className="mb-6"
          />

          {question.statement && (
            <div className="mb-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
                <QuestionStatement 
                  statement={question.statement}
                  className=""
                />
              </div>
            </div>
          )}

          {question.alternatives && (
            <div className="mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center">
                    <span className="mr-2">🎯</span>
                    Escolha a melhor alternativa:
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Analise cada opção cuidadosamente antes de decidir
                  </p>
                </div>
                <div className="p-6">
                  <QuestionAlternatives
                    alternatives={question.alternatives}
                    selectedAlternative={selectedAlternative}
                    onSelect={handleAlternativeSelect}
                    isSubmitted={isSubmitted}
                    className=""
                  />
                </div>
              </div>
            </div>
          )}

          <div className="text-center">
            <QuestionActions
              isSubmitted={isSubmitted}
              selectedAlternative={selectedAlternative}
              onSubmit={handleSubmit}
              onFinish={onBack}
              submitButtonText={selectedAlternative ? "🚀 Confirmar Resposta" : "Selecione uma alternativa"}
              finishButtonText="Finalizar"
              feedbackMessage="Resposta enviada!"
            />
          </div>

        </div>
      </div>
    </div>
  );
}