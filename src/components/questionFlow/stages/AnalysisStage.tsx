import DrSkodaDialog from '../ui/DrSkodaDialog';
import { processStageContent, generateAlternativesAnalysis } from '../core/stageConfigs';
import { useQuestionFlow } from '../contexts/FlowContext';
import type { BaseStageProps } from '../core/types';

// ==========================================
// ANALYSIS STAGE COMPONENT
// ==========================================

export default function AnalysisStage({ onContinue }: BaseStageProps) {
  const { questionData, selectedAlternative, isCorrect } = useQuestionFlow();

  if (!questionData || !selectedAlternative) return null;

  const correctAlternative = questionData.alternativesAnalysis.find(alt => alt.isCorrect)?.letter || '';
  const alternativesAnalysis = generateAlternativesAnalysis(
    questionData.alternativesAnalysis, 
    selectedAlternative
  );

  const stageKey = isCorrect ? 'analysis_correct' : 'analysis_incorrect';
  const stageConfig = processStageContent(stageKey, {
    selectedAlternative,
    correctAlternative,
    alternativesAnalysis
  });

  return (
    <DrSkodaDialog
      title={stageConfig.title}
      content={stageConfig.content}
      continueButtonText={stageConfig.buttonText}
      onContinue={onContinue}
    />
  );
}