// Exportações do sistema XP por metodologias

// Tipos
export type {
  StudyMethodology,
  MethodologyLevel,
  UserOverallLevel,
  MethodologyXPActivity,
  MethodologyActivityType,
  MethodologyStats,
  UserMethodologyStats,
  ClinicalCaseActivityType,
  QuestionActivityType,
  FlashcardActivityType,
  MethodologyLevelDefinition
} from '../../types/xpMethodologies';

export {
  METHODOLOGY_XP_CONFIG,
  METHODOLOGY_TITLES
} from '../../types/xpMethodologies';

// Serviços
export { MethodologyXPService } from '../../services/methodologyXPService';
export { XPMigrationService } from '../../services/xpMigrationService';

// Hooks
export {
  useMethodologyXP,
  useMethodologyXPStats,
  useSpecificMethodologyXP
} from '../../hooks/useMethodologyXP';

// Componentes
export {
  default as MethodologyXPBar,
  MethodologyXPOverview,
  MethodologyXPCompact
} from './MethodologyXPBar';

// Páginas
export { default as MethodologyXPSystemExample } from '../../pages/MethodologyXPSystemExample';