import DrSkodaDialog from '../ui/DrSkodaDialog';
import { processStageContent, getAudioConfig } from '../core/stageConfigs';
import { useQuestionFlow } from '../contexts/FlowContext';
import type { BaseStageProps } from '../core/types';

// ==========================================
// EXPLANATION STAGE COMPONENT
// ==========================================

export default function ExplanationStage({ onContinue, questionId }: BaseStageProps) {
  const { questionData } = useQuestionFlow();

  if (!questionData) return null;

  const stageConfig = processStageContent('explanation', {
    explanationText: questionData.explanationText
  });

  const audioConfig = getAudioConfig(questionId, 'explanation');

  return (
    <DrSkodaDialog
      title={stageConfig.title}
      content={stageConfig.content}
      continueButtonText={stageConfig.buttonText}
      onContinue={onContinue}
      audioConfig={audioConfig}
    />
  );
}