import type { 
  UniversalQuestionSolverProps
} from '../components/universal/UniversalQuestionSolver';

// ==========================================
// FACTORY DE CONFIGURAÇÕES SIMPLIFICADO
// ==========================================

// Tipos baseados no UniversalQuestionSolver
type FlowConfig = NonNullable<UniversalQuestionSolverProps['flowConfig']>;
type UIConfig = NonNullable<UniversalQuestionSolverProps['uiConfig']>;
type IntegrationConfig = NonNullable<UniversalQuestionSolverProps['integrationConfig']>;

export interface QuestionConfigPreset {
  name: string;
  description: string;
  flowConfig: FlowConfig;
  uiConfig: UIConfig;
  integrationConfig: IntegrationConfig;
}

// ==========================================
// PRESETS DE CONFIGURAÇÃO
// ==========================================

/**
 * Configuração para questões com Dr. Skoda completo
 */
export const DR_SKODA_FULL_PRESET: QuestionConfigPreset = {
  name: 'Dr. Skoda Completo',
  description: 'Experiência completa com Dr. Skoda, incluindo todas as etapas',
  
  flowConfig: {
    enabled: true,
    enabledStages: ['begin', 'question', 'explanation', 'analysis'],
    autoStart: true,
    skipBegin: false,
    skipExplanation: false
  },
  
  uiConfig: {
    showProgress: true,
    showTimeEstimate: true,
    showTags: true,
    className: 'dr-skoda-full'
  },
  
  integrationConfig: {
    saveAttempts: true,
    trackAnalytics: true,
    enableFirebase: true
  }
};

/**
 * Configuração para questões simples sem Dr. Skoda
 */
export const SIMPLE_QUESTION_PRESET: QuestionConfigPreset = {
  name: 'Questão Simples',
  description: 'Interface direta, sem Dr. Skoda, ideal para revisão rápida',
  
  flowConfig: {
    enabled: false,
    autoStart: false,
    skipBegin: true,
    skipExplanation: true
  },
  
  uiConfig: {
    showProgress: false,
    showTimeEstimate: false,
    showTags: true,
    className: 'simple-question'
  },
  
  integrationConfig: {
    saveAttempts: true,
    trackAnalytics: false,
    enableFirebase: true
  }
};

/**
 * Configuração para modo estudo com Dr. Skoda
 */
export const STUDY_MODE_PRESET: QuestionConfigPreset = {
  name: 'Modo Estudo',
  description: 'Experiência educativa completa com Dr. Skoda',
  
  flowConfig: {
    enabled: true,
    enabledStages: ['begin', 'question', 'explanation', 'analysis'],
    autoStart: true,
    skipBegin: false,
    skipExplanation: false
  },
  
  uiConfig: {
    showProgress: true,
    showTimeEstimate: true,
    showTags: true,
    className: 'study-mode'
  },
  
  integrationConfig: {
    saveAttempts: true,
    trackAnalytics: true,
    enableFirebase: true
  }
};

/**
 * Configuração para revisão rápida
 */
export const REVIEW_MODE_PRESET: QuestionConfigPreset = {
  name: 'Modo Revisão',
  description: 'Revisão rápida sem etapas extras',
  
  flowConfig: {
    enabled: true,
    enabledStages: ['question', 'analysis'],
    autoStart: true,
    skipBegin: true,
    skipExplanation: false
  },
  
  uiConfig: {
    showProgress: false,
    showTimeEstimate: false,
    showTags: true,
    className: 'review-mode'
  },
  
  integrationConfig: {
    saveAttempts: false,
    trackAnalytics: false,
    enableFirebase: false
  }
};

/**
 * Configuração minimalista
 */
export const MINIMAL_PRESET: QuestionConfigPreset = {
  name: 'Minimalista',
  description: 'Interface mínima sem extras',
  
  flowConfig: {
    enabled: false,
    autoStart: false,
    skipBegin: true,
    skipExplanation: true
  },
  
  uiConfig: {
    showProgress: false,
    showTimeEstimate: false,
    showTags: false,
    className: 'minimal'
  },
  
  integrationConfig: {
    saveAttempts: false,
    trackAnalytics: false,
    enableFirebase: false
  }
};

/**
 * Configuração para modo Simulado
 */
export const EXAM_MODE_PRESET: QuestionConfigPreset = {
  name: 'Modo Simulado',
  description: 'Experiência de prova sem Dr. Skoda',
  
  flowConfig: {
    enabled: false,
    autoStart: false,
    skipBegin: true,
    skipExplanation: true
  },
  
  uiConfig: {
    showProgress: true,
    showTimeEstimate: true,
    showTags: false,
    className: 'exam-mode'
  },
  
  integrationConfig: {
    saveAttempts: true,
    trackAnalytics: true,
    enableFirebase: true
  }
};

// ==========================================
// REGISTRY DE PRESETS
// ==========================================

export const PRESET_REGISTRY = {
  'dr-skoda-full': DR_SKODA_FULL_PRESET,
  'simple': SIMPLE_QUESTION_PRESET,
  'study': STUDY_MODE_PRESET,
  'review': REVIEW_MODE_PRESET,
  'minimal': MINIMAL_PRESET,
  'exam': EXAM_MODE_PRESET
} as const;

export type PresetKey = keyof typeof PRESET_REGISTRY;

// ==========================================
// FACTORY FUNCTIONS
// ==========================================

/**
 * Criar configuração a partir de um preset
 */
export function createQuestionConfig(
  presetKey: PresetKey,
  questionId: number,
  callbacks?: {
    onBack?: () => void;
    onFinish?: () => void;
  },
  overrides?: {
    flowConfig?: Partial<FlowConfig>;
    uiConfig?: Partial<UIConfig>;
    integrationConfig?: Partial<IntegrationConfig>;
    backUrl?: string;
    finishUrl?: string;
  }
): UniversalQuestionSolverProps {
  const preset = PRESET_REGISTRY[presetKey];
  
  if (!preset) {
    throw new Error(`Preset '${presetKey}' não encontrado`);
  }

  return {
    questionId,
    onBack: callbacks?.onBack,
    onFinish: callbacks?.onFinish,
    backUrl: overrides?.backUrl,
    finishUrl: overrides?.finishUrl,
    flowConfig: overrides?.flowConfig ? { ...preset.flowConfig, ...overrides.flowConfig } : preset.flowConfig,
    uiConfig: overrides?.uiConfig ? { ...preset.uiConfig, ...overrides.uiConfig } : preset.uiConfig,
    integrationConfig: overrides?.integrationConfig ? { ...preset.integrationConfig, ...overrides.integrationConfig } : preset.integrationConfig
  };
}

/**
 * Criar configuração customizada a partir de um preset base
 */
export function createCustomQuestionConfig(
  questionId: number,
  basePreset: PresetKey = 'simple',
  customizations?: {
    flowConfig?: Partial<FlowConfig>;
    uiConfig?: Partial<UIConfig>;
    integrationConfig?: Partial<IntegrationConfig>;
    onBack?: () => void;
    onFinish?: () => void;
    backUrl?: string;
    finishUrl?: string;
  }
): UniversalQuestionSolverProps {
  return createQuestionConfig(
    basePreset,
    questionId,
    {
      onBack: customizations?.onBack,
      onFinish: customizations?.onFinish
    },
    {
      flowConfig: customizations?.flowConfig,
      uiConfig: customizations?.uiConfig,
      integrationConfig: customizations?.integrationConfig,
      backUrl: customizations?.backUrl,
      finishUrl: customizations?.finishUrl
    }
  );
}

// ==========================================
// FUNÇÕES DE CONVENIÊNCIA
// ==========================================

/**
 * Configuração rápida para Dr. Skoda
 */
export function drSkodaConfig(
  questionId: number,
  onBack?: () => void,
  onFinish?: () => void
): UniversalQuestionSolverProps {
  return createQuestionConfig('dr-skoda-full', questionId, { onBack, onFinish });
}

/**
 * Configuração rápida para questão simples
 */
export function simpleConfig(
  questionId: number,
  onBack?: () => void,
  onFinish?: () => void
): UniversalQuestionSolverProps {
  return createQuestionConfig('simple', questionId, { onBack, onFinish });
}

/**
 * Configuração rápida para modo estudo
 */
export function studyConfig(
  questionId: number,
  onBack?: () => void,
  onFinish?: () => void
): UniversalQuestionSolverProps {
  return createQuestionConfig('study', questionId, { onBack, onFinish });
}

/**
 * Configuração rápida para revisão
 */
export function reviewConfig(
  questionId: number,
  onBack?: () => void,
  onFinish?: () => void
): UniversalQuestionSolverProps {
  return createQuestionConfig('review', questionId, { onBack, onFinish });
}

/**
 * Configuração minimalista
 */
export function minimalConfig(
  questionId: number,
  onBack?: () => void,
  onFinish?: () => void
): UniversalQuestionSolverProps {
  return createQuestionConfig('minimal', questionId, { onBack, onFinish });
}

/**
 * Configuração para modo Simulado
 */
export function examConfig(
  questionId: number,
  onBack?: () => void,
  onFinish?: () => void
): UniversalQuestionSolverProps {
  return createQuestionConfig('exam', questionId, { onBack, onFinish });
}

// ==========================================
// UTILITÁRIOS
// ==========================================

/**
 * Obter lista de presets disponíveis
 */
export function getAvailablePresets(): Array<{ key: PresetKey; preset: QuestionConfigPreset }> {
  return Object.entries(PRESET_REGISTRY).map(([key, preset]) => ({ 
    key: key as PresetKey, 
    preset 
  }));
}

/**
 * Obter preset por chave
 */
export function getPreset(key: PresetKey): QuestionConfigPreset {
  return PRESET_REGISTRY[key];
}

/**
 * Validar configuração básica
 */
export function validateConfig(config: UniversalQuestionSolverProps): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!config.questionId || config.questionId <= 0) {
    errors.push('questionId deve ser um número positivo');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// ==========================================
// EXPORTAÇÕES DE TIPO
// ==========================================

export type {
  UniversalQuestionSolverProps,
  FlowConfig,
  UIConfig,
  IntegrationConfig
};