import { getQuestionFlowData } from '../../data/questionFlowData';
import { FlowProvider } from './FlowContext';
import { QuestionFlowManager } from './UniversalFlowStage';
import type { ReactNode } from 'react';
import type { FlowStage } from './types';

// ==========================================
// WRAPPER PRINCIPAL PARA USO FÁCIL
// ==========================================

interface QuestionFlowWrapperProps {
  questionId: number;
  children?: ReactNode;
  onFinish: () => void;
  enabledStages?: FlowStage[];
  autoStart?: boolean;
  customConfigs?: Partial<Record<FlowStage, {
    title?: string;
    content?: string;
    buttonText?: string;
  }>>;
}

export default function QuestionFlowWrapper({
  questionId,
  children,
  onFinish,
  enabledStages,
  autoStart = true,
  customConfigs
}: QuestionFlowWrapperProps) {
  // Buscar dados da questão
  const questionData = getQuestionFlowData(questionId);

  if (!questionData) {
    console.warn(`Dados de fluxo não encontrados para a questão ${questionId}`);
    return children || null;
  }

  return (
    <FlowProvider questionData={questionData}>
      {children}
      {autoStart && (
        <QuestionFlowManager
          onFinish={onFinish}
          enabledStages={enabledStages}
          customStageConfigs={customConfigs}
        />
      )}
    </FlowProvider>
  );
}

// ==========================================
// COMPONENTE SIMPLES PARA CASOS BÁSICOS
// ==========================================

interface SimpleQuestionFlowProps {
  questionId: number;
  onFinish: () => void;
  skipBegin?: boolean;
  skipExplanation?: boolean;
}

export function SimpleQuestionFlow({
  questionId,
  onFinish,
  skipBegin = false,
  skipExplanation = false
}: SimpleQuestionFlowProps) {
  // Determinar estágios habilitados
  const enabledStages: FlowStage[] = ['question'];
  
  if (!skipBegin) enabledStages.unshift('begin');
  if (!skipExplanation) enabledStages.push('explanation');
  enabledStages.push('analysis');

  return (
    <QuestionFlowWrapper
      questionId={questionId}
      onFinish={onFinish}
      enabledStages={enabledStages}
    />
  );
}

// ==========================================
// HOOK PARA USO MANUAL
// ==========================================

import { useQuestionFlow } from './FlowContext';

export function useSimpleQuestionFlow(questionId: number) {
  const questionData = getQuestionFlowData(questionId);
  const flowContext = useQuestionFlow();

  return {
    ...flowContext,
    questionData,
    isReady: !!questionData
  };
}