// ==========================================
// TIPOS BASE PARA O SISTEMA DE FLUXO DE QUESTÕES
// ==========================================

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
  estimatedTime: number; // em minutos
  conceptsRequired: string[];
  learningObjectives: string[];
}

export interface FlowStageConfig {
  stage: FlowStage;
  title: string;
  content: string;
  buttonText: string;
  icon?: string;
  customData?: Record<string, any>;
}

export type FlowStage = 'begin' | 'question' | 'explanation' | 'analysis' | 'finished';

export interface FlowTransition {
  from: FlowStage;
  to: FlowStage;
  condition?: (data: any) => boolean;
  animation?: 'slide' | 'fade' | 'zoom';
}

// ==========================================
// CONTEXTOS E CONFIGURAÇÕES
// ==========================================

export interface DrSkodaPersonality {
  encouraging: boolean;
  detailed: boolean;
  supportive: boolean;
  clinical: boolean;
  motivational: boolean;
}

export interface FlowConfiguration {
  enabledStages: FlowStage[];
  customTransitions?: FlowTransition[];
  drSkodaPersonality: DrSkodaPersonality;
  adaptiveContent: boolean;
  progressTracking: boolean;
}

// ==========================================
// HOOKS E PROVIDERS
// ==========================================

export interface FlowContextType {
  currentStage: FlowStage;
  questionData: QuestionFlowData | null;
  selectedAlternative: string | null;
  isCorrect: boolean;
  progress: number;
  questionId?: number;
  goToStage: (stage: FlowStage) => void;
  selectAlternative: (letter: string) => void;
  nextStage: () => void;
  resetFlow: () => void;
  setQuestionId: (id: number) => void;
}

export interface AnalyticsData {
  questionId: number;
  userId: string;
  selectedAlternative: string;
  isCorrect: boolean;
  timeSpent: number;
  stagesVisited: FlowStage[];
  timestamp: Date;
}