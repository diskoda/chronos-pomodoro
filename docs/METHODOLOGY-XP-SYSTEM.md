# 🎯 Sistema de XP por Metodologias - Chronos Pomodoro

## 📋 Visão Geral

O novo sistema de XP por metodologias substitui o sistema antigo unificado, oferecendo uma experiência de gamificação mais granular e específica para cada tipo de estudo. Agora cada metodologia (Casos Clínicos, Banco de Questões e Flashcards) tem seu próprio sistema de progressão.

## 🏗️ Arquitetura do Sistema

### 📁 Estrutura de Arquivos

```
src/
├── types/
│   └── xpMethodologies.ts          # Interfaces e tipos do novo sistema
├── services/
│   ├── methodologyXPService.ts     # Serviço principal para XP por metodologias
│   └── xpMigrationService.ts       # Migração do sistema antigo
├── hooks/
│   └── useMethodologyXP.ts         # Hook React para gerenciar XP
├── components/
│   └── xp/
│       ├── MethodologyXPBar.tsx    # Componentes visuais
│       └── methodologyIndex.ts     # Exportações centralizadas
└── pages/
    └── MethodologyXPSystemExample.tsx  # Página de demonstração
```

## 🎮 Metodologias Disponíveis

### 1. 🫀 Casos Clínicos (`clinical_cases`)
- **Foco**: Diagnósticos e análises clínicas complexas
- **Progressão**: Mais lenta (casos são complexos)
- **Atividades**: 
  - `case_started` (+5 XP)
  - `case_completed` (+25 XP base, multiplicador por dificuldade)
  - `case_perfect_score` (+50 XP)
  - `case_time_bonus` (+10 XP)
  - `case_difficulty_bonus` (+15 XP base, multiplicador por dificuldade)

### 2. 📚 Banco de Questões (`questions`)
- **Foco**: Resolução de questões e provas
- **Progressão**: Padrão
- **Atividades**:
  - `question_correct` (+10 XP base, multiplicador por dificuldade)
  - `question_incorrect` (+2 XP de participação)
  - `question_streak` (+5 XP base, multiplicador por sequência)
  - `quiz_completed` (+30 XP)
  - `perfect_quiz` (+75 XP)
  - `speed_bonus` (+15 XP)

### 3. ⚡ Flashcards (`flashcards`)
- **Foco**: Revisão e memorização
- **Progressão**: Mais rápida (revisões frequentes)
- **Atividades**:
  - `card_reviewed` (+3 XP)
  - `card_mastered` (+15 XP base, multiplicador por qualidade 1-5)
  - `deck_completed` (+40 XP)
  - `review_streak` (+8 XP base, multiplicador por dias consecutivos)
  - `spaced_repetition_bonus` (+20 XP)

## 📊 Sistema de Níveis

### Progressão por Metodologia
- **Casos Clínicos**: Progressão mais lenta (multiplier 1.2)
- **Questões**: Progressão padrão (multiplier 1.15)
- **Flashcards**: Progressão mais rápida (multiplier 1.1)

### Títulos Específicos
Cada metodologia possui títulos únicos:

#### 🫀 Casos Clínicos
- Nível 1: "Estudante Iniciante"
- Nível 10: "Diagnosticador"
- Nível 20: "Especialista em Casos"
- Nível 50: "Guru do Diagnóstico"

#### 📚 Questões
- Nível 1: "Questionador Novato"
- Nível 10: "Solucionador"
- Nível 20: "Mestre das Provas"
- Nível 50: "Oráculo do Conhecimento"

#### ⚡ Flashcards
- Nível 1: "Memorizador Iniciante"
- Nível 10: "Mestre da Repetição"
- Nível 20: "Guru da Retenção"
- Nível 50: "Arquivo Humano"

### Nível Geral
O nível geral do usuário é calculado como a média dos níveis das três metodologias.

## 💾 Estrutura do Banco de Dados

### Coleções Firestore

#### `methodology_levels`
```typescript
{
  id: `{userId}_{methodology}`,  // ex: "user123_clinical_cases"
  userId: string,
  methodology: 'clinical_cases' | 'questions' | 'flashcards',
  currentLevel: number,
  currentXP: number,
  totalXP: number,
  xpToNextLevel: number,
  lastLevelUp?: Timestamp,
  updatedAt: Timestamp
}
```

#### `user_overall_levels`
```typescript
{
  id: userId,
  userId: string,
  overallLevel: number,
  totalXP: number,  // Soma de todas as metodologias
  methodologyLevels: {
    clinical_cases: number,
    questions: number,
    flashcards: number
  },
  updatedAt: Timestamp
}
```

#### `methodology_xp_activities`
```typescript
{
  id: string,  // Auto-gerado
  userId: string,
  methodology: 'clinical_cases' | 'questions' | 'flashcards',
  activityType: string,  // Específico por metodologia
  xpGained: number,
  description: string,
  metadata: {
    // Metadados específicos por metodologia
    difficulty?: 'easy' | 'medium' | 'hard',
    timeSpent?: number,
    accuracy?: number,     // Para casos clínicos
    streakCount?: number,  // Para questões
    reviewQuality?: 1-5,   // Para flashcards
    // ... outros metadados
  },
  createdAt: Timestamp
}
```

#### `methodology_stats`
```typescript
{
  id: userId,
  userId: string,
  overallStats: {
    totalLevel: number,
    totalXP: number,
    totalActivities: number,
    totalTimeSpent: number,
    favoriteMethodology: 'clinical_cases' | 'questions' | 'flashcards'
  },
  methodologyStats: {
    clinical_cases: MethodologyStats,
    questions: MethodologyStats,
    flashcards: MethodologyStats
  },
  updatedAt: Timestamp
}
```

## 🚀 Como Usar

### 1. Hook Principal
```typescript
import { useMethodologyXP } from '../hooks/useMethodologyXP';

function MyComponent() {
  const {
    overallLevel,
    methodologyLevels,
    userStats,
    recordClinicalCaseActivity,
    recordQuestionActivity,
    recordFlashcardActivity,
    getTitleByMethodology
  } = useMethodologyXP();

  // Registrar atividade de caso clínico
  const handleCaseCompleted = async () => {
    const result = await recordClinicalCaseActivity('case_completed', {
      caseId: 'case_123',
      difficulty: 'medium',
      accuracy: 85,
      timeSpent: 15
    });
    
    if (result?.leveledUp) {
      alert(`Parabéns! Nível ${result.newLevel} em Casos Clínicos!`);
    }
  };
}
```

### 2. Hook para Estatísticas Simplificadas
```typescript
import { useMethodologyXPStats } from '../hooks/useMethodologyXP';

function StatsComponent() {
  const {
    overallLevel,
    totalXP,
    clinicalCasesLevel,
    questionsLevel,
    flashcardsLevel,
    favoriteMethodology
  } = useMethodologyXPStats();
}
```

### 3. Hook para Metodologia Específica
```typescript
import { useSpecificMethodologyXP } from '../hooks/useMethodologyXP';

function QuestionsComponent() {
  const {
    level,
    totalXP,
    currentXP,
    xpToNextLevel,
    title,
    currentStreak,
    recordActivity
  } = useSpecificMethodologyXP('questions');

  const handleCorrectAnswer = () => {
    recordActivity('question_correct', {
      difficulty: 'hard',
      subject: 'Cardiologia'
    });
  };
}
```

### 4. Componentes Visuais
```typescript
import { 
  MethodologyXPBar, 
  MethodologyXPOverview, 
  MethodologyXPCompact 
} from '../components/xp/MethodologyXPBar';

// Barra individual
<MethodologyXPBar
  methodology="clinical_cases"
  level={methodologyLevels.clinical_cases}
  title={getTitleByMethodology('clinical_cases')}
  showDetails={true}
  size="lg"
/>

// Visão geral
<MethodologyXPOverview
  methodologyLevels={methodologyLevels}
  methodologyTitles={methodologyTitles}
  overallLevel={overallLevel.overallLevel}
  totalXP={overallLevel.totalXP}
  showDetails={true}
/>

// Versão compacta para dashboard
<MethodologyXPCompact
  methodologyLevels={methodologyLevels}
  favoriteMethodology={getFavoriteMethodology()}
/>
```

## 🔄 Migração do Sistema Antigo

### Processo Automático
```typescript
import { XPMigrationService } from '../services/xpMigrationService';

// Migrar um usuário específico
const result = await XPMigrationService.migrateCompleteUser(userId);

// Migrar todos os usuários
const globalResult = await XPMigrationService.migrateAllUsers();

// Verificar se usuário já foi migrado
const isMigrated = await XPMigrationService.isUserMigrated(userId);

// Estatísticas de comparação
const stats = await XPMigrationService.getComparisonStats();
```

### Estratégia de Migração
1. **Distribuição de XP**: O XP total do sistema antigo é dividido igualmente entre as 3 metodologias
2. **Mapeamento de Atividades**: 
   - `question_correct` → `questions:question_correct`
   - `clinical_case_completed` → `clinical_cases:case_completed`
   - `quiz_completed` → `questions:quiz_completed`
3. **Nível Geral**: Calculado como média dos níveis das metodologias

## 🎨 Personalização

### Configurar XP por Atividade
```typescript
// Em types/xpMethodologies.ts
export const METHODOLOGY_XP_CONFIG = {
  clinical_cases: {
    case_completed: { 
      base: 25, 
      multipliers: { easy: 1, medium: 1.5, hard: 2 }
    }
  }
  // ... outras configurações
};
```

### Adicionar Nova Metodologia
1. Atualizar enum `StudyMethodology`
2. Adicionar configuração em `METHODOLOGY_XP_CONFIG`
3. Adicionar títulos em `METHODOLOGY_TITLES`
4. Atualizar componentes visuais

## 📊 Analytics e Métricas

### Estatísticas Disponíveis
- XP total e por metodologia
- Nível atual e progresso
- Streak atual e melhor
- Performance média por metodologia
- Tempo gasto por metodologia
- Metodologia favorita
- Atividades por tipo
- Histórico detalhado

### Relatórios
```typescript
const {
  overallStats: {
    totalLevel,
    totalXP,
    favoriteMethodology
  },
  methodologyStats: {
    clinical_cases: {
      currentLevel,
      totalXP,
      currentStreak,
      averagePerformance,
      specific: {
        casesCompleted,
        perfectCases,
        averageAccuracy
      }
    }
  }
} = userStats;
```

## 🧪 Teste o Sistema

### Página de Demonstração
Acesse `/methodology-xp` para ver o sistema em funcionamento com:
- Visão geral de todas as metodologias
- Estatísticas detalhadas
- Botões para testar diferentes atividades
- Comparação de desempenho

### Integração com Questões
```typescript
// No componente de questões
const { recordQuestionActivity } = useMethodologyXP();

const handleAnswerSubmit = async (isCorrect: boolean, questionData) => {
  if (isCorrect) {
    await recordQuestionActivity('question_correct', {
      questionId: questionData.id,
      difficulty: questionData.difficulty,
      subject: questionData.subject,
      timeSpent: timeSpent
    });
  } else {
    await recordQuestionActivity('question_incorrect', {
      questionId: questionData.id
    });
  }
};
```

## 🎯 Benefícios do Novo Sistema

### ✅ Vantagens
1. **Progressão Específica**: Cada metodologia tem sua própria curva de progressão
2. **Motivação Granular**: Usuários podem focar em áreas específicas
3. **Flexibilidade**: Fácil adição de novas metodologias e atividades
4. **Analytics Detalhados**: Insights profundos sobre padrões de estudo
5. **Gamificação Aprimorada**: Títulos e recompensas específicos por área
6. **Persistência Robusta**: Dados sempre salvos no Firebase
7. **Migração Automática**: Transição suave do sistema antigo

### 📈 Métricas de Sucesso
- Tempo de estudo por metodologia
- Taxa de retenção por área
- Progresso equilibrado entre metodologias
- Identificação de pontos fortes e fracos
- Motivação através de conquistas específicas

## 🔮 Próximos Passos

### Funcionalidades Futuras
1. **Conquistas por Metodologia**: Badges específicos para cada área
2. **Comparação Social**: Rankings por metodologia
3. **Recomendações Inteligentes**: Sugestões baseadas em performance
4. **Metas Personalizadas**: Objetivos específicos por metodologia
5. **Análise Preditiva**: Insights sobre próximos marcos
6. **Integração com IA**: Recomendações personalizadas de estudo

Este sistema fornece uma base sólida e escalável para gamificação educacional específica por metodologia, mantendo o usuário engajado através de progressão granular e feedback específico para cada área de estudo.