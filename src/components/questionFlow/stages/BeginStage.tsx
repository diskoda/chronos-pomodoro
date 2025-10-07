import DrSkodaDialog from '../ui/DrSkodaDialog';
import { processStageContent, getAudioConfig } from '../core/stageConfigs';
import { useQuestionFlow } from '../contexts/FlowContext';
import type { BaseStageProps } from '../core/types';

// ==========================================
// BEGIN STAGE COMPONENT
// ==========================================

export default function BeginStage({ onContinue, questionId }: BaseStageProps) {
  const { questionData } = useQuestionFlow();

  if (!questionData) return null;

  const stageConfig = processStageContent('begin', {
    contextText: questionData.contextText
  });

  const audioConfig = getAudioConfig(questionId, 'begin');

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