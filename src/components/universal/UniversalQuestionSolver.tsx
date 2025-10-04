import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuestion } from '../../hooks/useQuestions';
import { useUserQuestionAttempt } from '../../hooks/useUserQuestionAttempts';
import { useQuestionCooldown } from '../../hooks/useQuestionCooldown';
import { flowDataManager } from '../../data/universalFlowDataManager';
import { FlowProvider, QuestionFlowManager, FlowProgressIndicator } from '../questionFlow';
import QuestionSolverHeader from '../questionSolver/QuestionSolverHeader';
import QuestionInfo from '../common/QuestionInfo';
import QuestionStatement from '../questionSolver/QuestionStatement';
import QuestionAlternatives from '../questionSolver/QuestionAlternatives';
import QuestionActions from '../questionSolver/QuestionActions';
import QuestionNotFound from '../questionSolver/QuestionNotFound';
import QuestionCooldownBlocker from './QuestionCooldownBlocker';
import { useQuestionFlow } from '../questionFlow/FlowContext';

// ==========================================
// COMPONENTE UNIVERSAL PARA QUESTÕES
// ==========================================

export interface UniversalQuestionSolverProps {
  /** ID da questão */
  questionId: number;
  /** Callback para voltar */
  onBack?: () => void;
  /** Callback para finalizar */
  onFinish?: () => void;
  /** URL de redirecionamento ao voltar */
  backUrl?: string;
  /** URL de redirecionamento ao finalizar */
  finishUrl?: string;
  /** Configurações do fluxo Dr. Skoda */
  flowConfig?: {
    enabled?: boolean;
    enabledStages?: Array<'begin' | 'question' | 'explanation' | 'analysis'>;
    autoStart?: boolean;
    skipBegin?: boolean;
    skipExplanation?: boolean;
  };
  /** Configurações da interface */
  uiConfig?: {
    showProgress?: boolean;
    showTimeEstimate?: boolean;
    showTags?: boolean;
    className?: string;
  };
  /** Configurações de integração */
  integrationConfig?: {
    saveAttempts?: boolean;
    trackAnalytics?: boolean;
    enableFirebase?: boolean;
  };
}

export default function UniversalQuestionSolver({
  questionId,
  onBack,
  onFinish,
  backUrl = '/study',
  finishUrl = '/questions',
  flowConfig = {
    enabled: true,
    autoStart: true,
    skipBegin: false,
    skipExplanation: false
  },
  uiConfig = {
    showProgress: true,
    showTimeEstimate: true,
    showTags: true,
    className: ''
  },
  integrationConfig = {
    saveAttempts: true,
    trackAnalytics: true,
    enableFirebase: true
  }
}: UniversalQuestionSolverProps) {
  const navigate = useNavigate();
  
  // Hooks de dados
  const { question, loading, error } = useQuestion(questionId.toString());
  const flowData = flowDataManager.getFlowData(questionId);
  
  // Determinar modo baseado na configuração de fluxo
  const mode = flowConfig.enabled ? 'dr-skoda' : 'exam';
  
  // Hook de cooldown (24h)
  const {
    canAttempt,
    timeUntilAvailable,
    hoursRemaining,
    minutesRemaining,
    loading: cooldownLoading,
    recordAttempt
  } = useQuestionCooldown(questionId, mode);
  
  // Handlers padrão
  const handleBack = useCallback(() => {
    if (onBack) {
      onBack();
    } else {
      navigate(backUrl);
    }
  }, [onBack, navigate, backUrl]);
  
  const handleFinish = useCallback(() => {
    if (onFinish) {
      onFinish();
    } else {
      navigate(finishUrl);
    }
  }, [onFinish, navigate, finishUrl]);

  // Estados de loading e erro
  if (loading || cooldownLoading) {
    return (
      <UniversalQuestionLoader 
        message="Carregando questão..."
        className={uiConfig.className}
      />
    );
  }

  if (error) {
    return (
      <UniversalQuestionError 
        error={error}
        onBack={handleBack}
        className={uiConfig.className}
      />
    );
  }

  // Verificar cooldown antes de exibir a questão
  if (!canAttempt) {
    return (
      <QuestionCooldownBlocker
        questionId={questionId}
        mode={mode}
        timeUntilAvailable={timeUntilAvailable}
        hoursRemaining={hoursRemaining}
        minutesRemaining={minutesRemaining}
        nextAvailableDate={new Date(Date.now() + (hoursRemaining * 60 * 60 * 1000) + (minutesRemaining * 60 * 1000))}
        lastAttemptDate={null} // Será obtido do cooldown service
        onBack={handleBack}
        className={uiConfig.className}
      />
    );
  }

  if (!question) {
    return (
      <QuestionNotFound 
        onBack={handleBack}
      />
    );
  }

  // Determinar tipo de interface
  const shouldUseDrSkoda = flowConfig.enabled && !!flowData;

  if (shouldUseDrSkoda) {
    return (
      <FlowProvider questionData={flowData} questionId={questionId}>
        <IntegratedQuestionInterface 
          question={question}
          onBack={handleBack}
          onFinish={handleFinish}
          flowConfig={flowConfig}
          uiConfig={uiConfig}
          integrationConfig={integrationConfig}
          recordAttempt={recordAttempt}
        />
      </FlowProvider>
    );
  }

  return (
    <SimpleQuestionInterface 
      question={question}
      onBack={handleBack}
      onFinish={handleFinish}
      uiConfig={uiConfig}
      integrationConfig={integrationConfig}
      recordAttempt={recordAttempt}
    />
  );
}

// ==========================================
// INTERFACE INTEGRADA COM DR. SKODA
// ==========================================

interface IntegratedQuestionInterfaceProps {
  question: any;
  onBack: () => void;
  onFinish: () => void;
  flowConfig: NonNullable<UniversalQuestionSolverProps['flowConfig']>;
  uiConfig: NonNullable<UniversalQuestionSolverProps['uiConfig']>;
  integrationConfig: NonNullable<UniversalQuestionSolverProps['integrationConfig']>;
  recordAttempt: () => Promise<boolean>;
}

function IntegratedQuestionInterface({ 
  question, 
  onBack, 
  onFinish,
  flowConfig,
  uiConfig,
  integrationConfig,
  recordAttempt
}: IntegratedQuestionInterfaceProps) {
  const [selectedAlternative, setSelectedAlternative] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { 
    currentStage, 
    selectAlternative,
    goToStage,
    selectedAlternative: contextSelectedAlternative,
    isCorrect
  } = useQuestionFlow();

  // Hook para gerenciar tentativas (Firebase)
  const { createAttempt } = integrationConfig.enableFirebase 
    ? useUserQuestionAttempt(parseInt(question.id))
    : { createAttempt: async () => null };

  const handleAlternativeSelect = (alternative: string) => {
    if (!isSubmitted && currentStage === 'question') {
      setSelectedAlternative(alternative);
      
      // Extrair apenas a letra da alternativa para o sistema Dr. Skoda
      const letterMatch = alternative.match(/^\(([A-Z])\)/);
      const letter = letterMatch ? letterMatch[1] : alternative;
      
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
    
    if (finalSelectedAlternative && integrationConfig.saveAttempts) {
      // Salvar resultado da tentativa no Firebase
      await createAttempt(finalSelectedAlternative, isCorrect);
    }

    // Registrar cooldown de 24h
    try {
      await recordAttempt();
      console.log('✅ Cooldown de 24h registrado para a questão', question.id);
    } catch (error) {
      console.error('❌ Erro ao registrar cooldown:', error);
    }

    // Analytics (se habilitado)
    if (integrationConfig.trackAnalytics) {
      // TODO: Implementar tracking de analytics
      console.log('📊 Analytics:', {
        questionId: question.id,
        selectedAlternative: finalSelectedAlternative,
        isCorrect,
        stage: currentStage
      });
    }

    // Chamar callback de finalização (redirecionamento)
    onFinish();
  };

  return (
    <div className={`dashboard-background min-h-screen ${uiConfig.className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`max-w-4xl mx-auto transition-opacity duration-300 ${
          (currentStage === 'begin' || currentStage === 'explanation' || currentStage === 'analysis') 
            ? 'pointer-events-none opacity-50' 
            : ''
        }`}>
          
          {/* Indicador de Progresso do Fluxo */}
          {uiConfig.showProgress && (
            <FlowProgressIndicator className="mb-6" showDetails={true} />
          )}
          
          <QuestionSolverHeader 
            onBack={onBack}
            backButtonText="Voltar"
          />

          <QuestionInfo 
            question={question}
            showTags={uiConfig.showTags}
            showTimeEstimate={uiConfig.showTimeEstimate}
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
            
            {selectedAlternative && !isSubmitted && currentStage === 'question' && (
              <div className="mt-4">
                <p className="text-sm theme-text-secondary">
                  Você selecionou: <span className="font-medium theme-text-primary">{selectedAlternative}</span>
                </p>
              </div>
            )}
          </div>

        </div>

        {/* Dr. Skoda Flow Manager - Sistema Componentizado */}
        <QuestionFlowManager 
          onFinish={handleFlowFinishWithSave}
          enabledStages={flowConfig.enabledStages}
        />

      </div>
    </div>
  );
}

// ==========================================
// INTERFACE SIMPLES SEM DR. SKODA
// ==========================================

interface SimpleQuestionInterfaceProps {
  question: any;
  onBack: () => void;
  onFinish: () => void;
  uiConfig: NonNullable<UniversalQuestionSolverProps['uiConfig']>;
  integrationConfig: NonNullable<UniversalQuestionSolverProps['integrationConfig']>;
  recordAttempt: () => Promise<boolean>;
}

function SimpleQuestionInterface({ 
  question, 
  onBack, 
  onFinish,
  uiConfig,
  integrationConfig,
  recordAttempt
}: SimpleQuestionInterfaceProps) {
  const [selectedAlternative, setSelectedAlternative] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Hook para tentativas (se habilitado)
  const { createAttempt } = integrationConfig.enableFirebase 
    ? useUserQuestionAttempt(parseInt(question.id))
    : { createAttempt: async () => null };

  const handleAlternativeSelect = (alternative: string) => {
    if (!isSubmitted) {
      setSelectedAlternative(alternative);
    }
  };

  const handleSubmit = async () => {
    if (selectedAlternative) {
      setIsSubmitted(true);
      
      // Salvar tentativa (se habilitado)
      if (integrationConfig.saveAttempts) {
        const letter = selectedAlternative.match(/^\(([A-Z])\)/)?.[1] || 'A';
        // TODO: Determinar se está correto (sem Dr. Skoda, precisaríamos de outra fonte)
        await createAttempt(letter, false); // Por enquanto, sempre false
      }

      // Registrar cooldown de 24h
      try {
        await recordAttempt();
        console.log('✅ Cooldown de 24h registrado para a questão', question.id);
      } catch (error) {
        console.error('❌ Erro ao registrar cooldown:', error);
      }

      // Analytics
      if (integrationConfig.trackAnalytics) {
        console.log('📊 Analytics (Simple):', {
          questionId: question.id,
          selectedAlternative
        });
      }
    }
  };

  return (
    <div className={`dashboard-background min-h-screen ${uiConfig.className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          
          <QuestionSolverHeader 
            onBack={onBack}
            backButtonText="Voltar"
          />

          <QuestionInfo 
            question={question}
            showTags={uiConfig.showTags}
            showTimeEstimate={uiConfig.showTimeEstimate}
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
              onFinish={onFinish}
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

// ==========================================
// COMPONENTES AUXILIARES
// ==========================================

interface UniversalQuestionLoaderProps {
  message?: string;
  className?: string;
}

function UniversalQuestionLoader({ 
  message = "Carregando...", 
  className = "" 
}: UniversalQuestionLoaderProps) {
  return (
    <div className={`dashboard-background ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="theme-text-secondary">{message}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface UniversalQuestionErrorProps {
  error: string;
  onBack: () => void;
  className?: string;
}

function UniversalQuestionError({ 
  error, 
  onBack, 
  className = "" 
}: UniversalQuestionErrorProps) {
  return (
    <div className={`dashboard-background ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h2 className="text-xl font-semibold theme-text-primary mb-2">
                Erro ao carregar questão
              </h2>
              <p className="theme-text-secondary mb-4">{error}</p>
              <button
                onClick={onBack}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Voltar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}