// ==========================================
// SISTEMA DE QUESTÕES COMPONENTIZADO - EXPORTS PRINCIPAIS
// ==========================================

// Tipos base
export type { 
  QuestionFlowData, 
  AlternativeAnalysis, 
  QuestionMetadata,
  FlowStage,
  FlowStageConfig,
  FlowContextType
} from './types';

// Context e Hooks
export { FlowProvider, useQuestionFlow } from './FlowContext';

// Componentes universais
export { 
  default as UniversalFlowStage,
  QuestionBeginStage,
  QuestionExplanationStage, 
  QuestionAnalysisStage,
  QuestionFlowManager
} from './UniversalFlowStage';

// Wrappers para uso fácil
export { 
  default as QuestionFlowWrapper,
  SimpleQuestionFlow,
  useSimpleQuestionFlow
} from './QuestionFlowWrapper';

// Componente base
export { default as DrSkodaDialog } from './DrSkodaDialog';

// Componente de progresso
export { default as FlowProgressIndicator } from './FlowProgressIndicator';

// Configurações e templates
export { 
  stageConfigurations,
  processStageContent,
  generateAlternativesAnalysis
} from './stageConfigs';

// ==========================================
// COMPONENTES LEGADOS (BACKWARD COMPATIBILITY)
// ==========================================

// Re-exportar componentes existentes para não quebrar código atual
export { default as QuestionBegin } from './QuestionBegin';
export { default as QuestionExplanation } from './QuestionExplanation';
export { default as QuestionAnalysis } from './QuestionAnalysis';