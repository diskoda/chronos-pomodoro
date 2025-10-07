// ==========================================
// CORE TYPES - SISTEMA DE QUESTÕES LIMPO
// ==========================================

// Tipos base para questões
export interface QuestionFlowData {
  contextText: string;
  explanationText: string;
  alternativesAnalysis: AlternativeAnalysis[];
  metadata?: QuestionMetadata;
}

export interface AlternativeAnalysis {
  letter: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
  category?: 'correct' | 'plausible' | 'incorrect' | 'dangerous';
  conceptsInvolved?: string[];
}

export interface QuestionMetadata {
  specialty: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  tags: string[];
  estimatedTime: number;
  conceptsRequired: string[];
  learningObjectives: string[];
}

// Estados do fluxo
export type FlowStage = 'begin' | 'question' | 'explanation' | 'analysis' | 'finished';

export interface FlowState {
  currentStage: FlowStage;
  questionData: QuestionFlowData | null;
  selectedAlternative: string | null;
  isCorrect: boolean;
  progress: number;
  questionId?: number;
  hasConfirmedSelection: boolean;
  dialogOpenCount: number;
}

// Actions para o reducer
export type FlowAction = 
  | { type: 'SET_QUESTION_DATA'; payload: QuestionFlowData }
  | { type: 'SET_STAGE'; payload: FlowStage }
  | { type: 'SELECT_ALTERNATIVE'; payload: string }
  | { type: 'CONFIRM_SELECTION' }
  | { type: 'START_READING' }
  | { type: 'NEXT_STAGE' }
  | { type: 'RESET_FLOW' }
  | { type: 'SET_QUESTION_ID'; payload: number };

// Context interface
export interface FlowContextType {
  currentStage: FlowStage;
  questionData: QuestionFlowData | null;
  selectedAlternative: string | null;
  isCorrect: boolean;
  progress: number;
  questionId?: number;
  goToStage: (stage: FlowStage) => void;
  selectAlternative: (letter: string) => void;
  confirmSelection: () => void;
  startReading: () => void;
  nextStage: () => void;
  resetFlow: () => void;
  setQuestionId: (id: number) => void;
}

// Configurações de estágio
export interface StageConfig {
  stage: FlowStage;
  title: string;
  content: string;
  buttonText: string;
  audioConfig?: AudioConfig;
}

export interface AudioConfig {
  src?: string;
  sequence?: string[];
  requireCompletion?: boolean;
  autoPlay?: boolean;
}

// Props comuns
export interface BaseStageProps {
  onContinue: () => void;
  questionId?: number;
}

export interface DialogProps {
  title: string;
  content: string;
  continueButtonText?: string;
  onContinue?: () => void;
  audioConfig?: AudioConfig;
  className?: string;
}