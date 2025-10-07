import { getQuestionFlowData } from '../../../data/questionFlowData';
import { FlowProvider } from '../contexts/FlowContext';
import StageManager from '../managers/StageManager';
import type { ReactNode } from 'react';
import type { FlowStage } from '../core/types';

// ==========================================
// MAIN QUESTION FLOW WRAPPER
// ==========================================

interface QuestionFlowWrapperProps {
  questionId: number;
  children?: ReactNode;
  onFinish: () => void;
  enabledStages?: FlowStage[];
  autoStart?: boolean;
}

export default function QuestionFlowWrapper({
  questionId,
  children,
  onFinish,
  enabledStages,
  autoStart = true
}: QuestionFlowWrapperProps) {
  const questionData = getQuestionFlowData(questionId);

  if (!questionData) {
    console.warn(`Question flow data not found for question ${questionId}`);
    return children || null;
  }

  return (
    <FlowProvider questionData={questionData} questionId={questionId}>
      {children}
      {autoStart && (
        <StageManager
          onFinish={onFinish}
          enabledStages={enabledStages}
          questionId={questionId}
        />
      )}
    </FlowProvider>
  );
}

// ==========================================
// SIMPLE FLOW COMPONENT
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