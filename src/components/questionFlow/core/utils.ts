import type { FlowState, FlowStage } from './types';

// ==========================================
// FLOW STATE UTILITIES
// ==========================================

export const INITIAL_FLOW_STATE: FlowState = {
  currentStage: 'begin',
  questionData: null,
  selectedAlternative: null,
  isCorrect: false,
  progress: 0,
  questionId: undefined,
  hasConfirmedSelection: false,
  dialogOpenCount: 0
};

export function calculateProgress(state: FlowState): number {
  // Leitura: 0% -> 25% (desde início até confirmar seleção)
  if (!state.hasConfirmedSelection) {
    return 25;
  }
  
  // Contextualização: 25% -> 50% (segunda abertura do DrSkodaDialog)
  if (state.dialogOpenCount >= 1 && state.currentStage === 'explanation') {
    return 50;
  }
  
  // Análise: 50% -> 75% (DrSkodaDialog analisando alternativas)
  if (state.currentStage === 'analysis') {
    return 75;
  }
  
  // Conclusão: 75% -> 100% (última renderização)
  if (state.currentStage === 'finished') {
    return 100;
  }
  
  // Default baseado no estágio atual
  const stageProgress = {
    'begin': 25,
    'question': 25,
    'explanation': 50,
    'analysis': 75,
    'finished': 100
  };
  
  return stageProgress[state.currentStage] || 0;
}

export function getNextStage(currentStage: FlowStage): FlowStage {
  const stageOrder: FlowStage[] = ['begin', 'question', 'explanation', 'analysis', 'finished'];
  const currentIndex = stageOrder.indexOf(currentStage);
  return stageOrder[currentIndex + 1] || 'finished';
}

export function findSelectedAlternative(state: FlowState, letter: string) {
  return state.questionData?.alternativesAnalysis.find(alt => alt.letter === letter);
}

export function shouldIncrementDialogCount(stage: FlowStage): boolean {
  return stage === 'explanation' || stage === 'analysis';
}