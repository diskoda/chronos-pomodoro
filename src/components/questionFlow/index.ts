// ==========================================
// CLEAN QUESTION FLOW SYSTEM - MAIN EXPORTS
// ==========================================

// Core Types
export type { 
  QuestionFlowData, 
  AlternativeAnalysis, 
  QuestionMetadata,
  FlowStage,
  StageConfig,
  FlowContextType,
  BaseStageProps,
  DialogProps,
  AudioConfig
} from './core/types';

// Context and Hooks
export { FlowProvider, useQuestionFlow } from './contexts/FlowContext';

// Main Wrappers
export { 
  default as QuestionFlowWrapper,
  SimpleQuestionFlow
} from './wrappers/QuestionFlowWrapper';

// Stage Components
export { default as BeginStage } from './stages/BeginStage';
export { default as ExplanationStage } from './stages/ExplanationStage';
export { default as AnalysisStage } from './stages/AnalysisStage';

// Manager Components
export { default as StageManager } from './managers/StageManager';

// UI Components
export { default as DrSkodaDialog } from './ui/DrSkodaDialog';
export { default as ProgressIndicator } from './ui/ProgressIndicator';
export { default as AudioPlayer } from './ui/AudioPlayer';
export { default as TextContent } from './ui/TextContent';
export { default as DrSkodaPortrait } from './ui/DrSkodaPortrait';

// Configuration and Utilities
export { 
  STAGE_CONFIGS,
  processStageContent,
  generateAlternativesAnalysis,
  getAudioConfig
} from './core/stageConfigs';

export {
  INITIAL_FLOW_STATE,
  calculateProgress,
  getNextStage,
  findSelectedAlternative,
  shouldIncrementDialogCount
} from './core/utils';

// Services
export { recordQuestionXP } from './services/xpService';

// ==========================================
// BACKWARD COMPATIBILITY EXPORTS
// ==========================================

// Re-export for existing code compatibility
export { default as QuestionBegin } from './stages/BeginStage';
export { default as QuestionExplanation } from './stages/ExplanationStage';
export { default as QuestionAnalysis } from './stages/AnalysisStage';

// Legacy names
export { default as QuestionFlowManager } from './managers/StageManager';
export { default as FlowProgressIndicator } from './ui/ProgressIndicator';