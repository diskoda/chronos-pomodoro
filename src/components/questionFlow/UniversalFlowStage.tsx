import { useEffect } from 'react';
import { useQuestionFlow } from './FlowContext';
import { processStageContent, generateAlternativesAnalysis } from './stageConfigs';
import DrSkodaDialog from './DrSkodaDialog';
import type { FlowStage } from './types';

// ==========================================
// COMPONENTE UNIVERSAL PARA QUALQUER ESTÁGIO
// ==========================================

interface UniversalFlowStageProps {
  stage?: FlowStage;
  onContinue?: () => void;
  customContent?: string;
  customTitle?: string;
  customButtonText?: string;
}

export default function UniversalFlowStage({
  stage,
  onContinue,
  customContent,
  customTitle,
  customButtonText
}: UniversalFlowStageProps) {
  const { 
    currentStage, 
    questionData, 
    selectedAlternative, 
    isCorrect,
    nextStage 
  } = useQuestionFlow();

  // Usar stage fornecido ou stage atual do contexto
  const activeStage = stage || currentStage;
  
  // Determinar configuração do estágio
  let stageKey: string = activeStage;
  if (activeStage === 'analysis') {
    stageKey = isCorrect ? 'analysis_correct' : 'analysis_incorrect';
  }

  // Processar conteúdo dinâmico com tratamento de erro
  let stageConfig;
  try {
    stageConfig = processStageContent(stageKey, {
      contextText: questionData?.contextText,
      explanationText: questionData?.explanationText,
      selectedAlternative: selectedAlternative || '',
      correctAlternative: questionData?.alternativesAnalysis.find(alt => alt.isCorrect)?.letter || '',
      alternativesAnalysis: questionData?.alternativesAnalysis 
        ? generateAlternativesAnalysis(questionData.alternativesAnalysis, selectedAlternative || '')
        : ''
    });
  } catch (error) {
    // Fallback para estágios sem configuração específica
    console.warn(`Configuração não encontrada para estágio: ${stageKey}. Usando configuração padrão.`);
    stageConfig = {
      stage: activeStage,
      title: `Estágio: ${activeStage}`,
      content: `Processando estágio ${activeStage}...`,
      buttonText: "Continuar"
    };
  }

  // Usar conteúdo customizado se fornecido
  const finalTitle = customTitle || stageConfig.title;
  const finalContent = customContent || stageConfig.content;
  const finalButtonText = customButtonText || stageConfig.buttonText;

  // Handler padrão ou customizado
  const handleContinue = onContinue || (() => {
    console.log('🔄 handleContinue chamado no estágio:', activeStage);
    nextStage();
  });

  return (
    <DrSkodaDialog
      title={finalTitle}
      content={finalContent}
      continueButtonText={finalButtonText}
      onContinue={handleContinue}
    />
  );
}

// ==========================================
// COMPONENTES ESPECÍFICOS PARA BACKWARD COMPATIBILITY
// ==========================================

interface LegacyStageProps {
  onContinue: () => void;
}

// Componente de início reutilizável
export function QuestionBeginStage({ onContinue }: LegacyStageProps) {
  return (
    <UniversalFlowStage 
      stage="begin" 
      onContinue={onContinue} 
    />
  );
}

// Componente de explicação reutilizável
export function QuestionExplanationStage({ onContinue }: LegacyStageProps) {
  return (
    <UniversalFlowStage 
      stage="explanation" 
      onContinue={onContinue} 
    />
  );
}

// Componente de análise reutilizável
export function QuestionAnalysisStage({ onContinue }: LegacyStageProps) {
  return (
    <UniversalFlowStage 
      stage="analysis" 
      onContinue={onContinue} 
    />
  );
}

// ==========================================
// COMPONENTE MANAGER COMPLETO
// ==========================================

interface QuestionFlowManagerProps {
  onFinish: () => void;
  enabledStages?: FlowStage[];
  customStageConfigs?: Partial<Record<FlowStage, {
    title?: string;
    content?: string;
    buttonText?: string;
  }>>;
}

export function QuestionFlowManager({ 
  onFinish,
  enabledStages = ['begin', 'question', 'explanation', 'analysis'],
  customStageConfigs = {}
}: QuestionFlowManagerProps) {
  const { currentStage } = useQuestionFlow();

  // Usar useEffect para detectar mudança para 'finished'
  useEffect(() => {
    if (currentStage === 'finished') {
      // Pequeno delay para garantir que tudo foi processado
      const timer = setTimeout(() => {
        onFinish();
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [currentStage, onFinish]);

  // Verificar se o estágio atual está habilitado
  if (!enabledStages.includes(currentStage)) {
    return null;
  }

  // Não renderizar Dr. Skoda durante o estágio 'question' 
  // pois é quando o usuário está interagindo com a questão
  if (currentStage === 'question' || currentStage === 'finished') {
    return null;
  }

  // Buscar configurações customizadas para o estágio atual
  const customConfig = customStageConfigs[currentStage];

  return (
    <UniversalFlowStage
      customTitle={customConfig?.title}
      customContent={customConfig?.content}
      customButtonText={customConfig?.buttonText}
    />
  );
}