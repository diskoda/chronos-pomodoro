import { useEffect } from 'react';
import { useQuestionFlow } from '../contexts/FlowContext';
import BeginStage from '../stages/BeginStage';
import ExplanationStage from '../stages/ExplanationStage';
import AnalysisStage from '../stages/AnalysisStage';
import type { FlowStage } from '../core/types';

// ==========================================
// CLEAN STAGE MANAGER COMPONENT
// ==========================================

interface StageManagerProps {
  onFinish: () => void;
  enabledStages?: FlowStage[];
  questionId?: number;
}

export default function StageManager({ 
  onFinish, 
  enabledStages = ['begin', 'question', 'explanation', 'analysis'],
  questionId
}: StageManagerProps) {
  const { currentStage, nextStage } = useQuestionFlow();

  // Handle finish when reaching 'finished' stage
  useEffect(() => {
    if (currentStage === 'finished') {
      const timer = setTimeout(() => {
        onFinish();
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [currentStage, onFinish]);

  // Don't render if stage is not enabled
  if (!enabledStages.includes(currentStage)) {
    return null;
  }

  // Don't render during question stage (user is interacting with question)
  if (currentStage === 'question' || currentStage === 'finished') {
    return null;
  }

  // Render appropriate stage component
  switch (currentStage) {
    case 'begin':
      return <BeginStage onContinue={nextStage} questionId={questionId} />;
    
    case 'explanation':
      return <ExplanationStage onContinue={nextStage} questionId={questionId} />;
    
    case 'analysis':
      return <AnalysisStage onContinue={nextStage} questionId={questionId} />;
    
    default:
      return null;
  }
}