// Common components - reusable across the application
export { default as DifficultyBadge } from './DifficultyBadge';
export { default as QuestionTags } from './QuestionTags';
export { default as QuestionInfo } from './QuestionInfo';
export { default as BackButton } from './BackButton';
export { default as PageHeader } from './PageHeader';
export { default as StatusBadge } from './StatusBadge';
export { default as PageHeaderWithBack } from './PageHeaderWithBack';
export { default as TopicTags } from './TopicTags';
export { default as UserMenu } from './UserMenu';
export { default as LogoutButton } from './LogoutButton';
export { default as ProtectedRoute } from './ProtectedRoute';

// TextExplanation System
export { TextExplanation as default } from './TextExplanation';
export { TextExplanation } from './TextExplanation';
export { ExplanationManager } from './ExplanationManager';
export { SmartTextProcessor } from './SmartTextProcessor';

// Hooks relacionados às explicações
export {
  useExplanation,
  useExplanationSearch,
  useExplanationCategories,
  useExplanationStats,
  useExplanationHistory,
  useExplanationTheme,
  useExplanationAnalytics
} from '../../hooks/useExplanations';

// Tipos e interfaces de explicações
export type {
  Explanation,
  ExplanationLink
} from '../../data/explanations';

// Funções utilitárias para explicações
export {
  getExplanation,
  getExplanationsByCategory,
  getExplanationsByType,
  searchExplanations,
  addExplanation,
  updateExplanation,
  removeExplanation,
  getAvailableCategories,
  getExplanationsStats
} from '../../data/explanations';