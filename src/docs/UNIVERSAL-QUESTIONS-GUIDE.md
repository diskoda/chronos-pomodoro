# 📚 Guia Completo do Sistema Universal de Questões

## 🎯 Visão Geral

O Sistema Universal de Questões permite criar questões educativas reutilizáveis com diferentes configurações e interfaces. Este sistema foi projetado para escalabilidade e facilidade de manutenção.

## 🏗️ Arquitetura do Sistema

### Componentes Principais

1. **UniversalQuestionSolver** - Componente principal configurável
2. **questionConfigFactory** - Factory para criar configurações pré-definidas
3. **universalFlowDataManager** - Gerenciador de dados de fluxo
4. **enhancedQuestionFlowData** - Dados específicos do Dr. Skoda

### Fluxo de Dados

```
Question ID → Factory Config → UniversalQuestionSolver → Flow Data → UI
```

## 🔧 Como Usar

### 1. Uso Básico com Presets

```tsx
import UniversalQuestionSolver from '../components/universal/UniversalQuestionSolver';
import { drSkodaConfig, simpleConfig } from '../data/questionConfigFactory';

// Dr. Skoda completo
function DrSkodaQuestion() {
  const config = drSkodaConfig(
    1, // questionId
    () => navigate('/back'), // onBack
    () => navigate('/finish') // onFinish
  );
  
  return <UniversalQuestionSolver {...config} />;
}

// Questão simples
function SimpleQuestion() {
  const config = simpleConfig(1);
  return <UniversalQuestionSolver {...config} />;
}
```

### 2. Configuração Customizada

```tsx
import { createCustomQuestionConfig } from '../data/questionConfigFactory';

function CustomQuestion() {
  const config = createCustomQuestionConfig(
    1, // questionId
    'study', // preset base
    {
      flowConfig: {
        skipBegin: true, // Pular etapa inicial
        enabledStages: ['question', 'analysis'] // Apenas questão e análise
      },
      uiConfig: {
        showProgress: false, // Sem indicador de progresso
        className: 'my-custom-class'
      },
      integrationConfig: {
        saveAttempts: false // Não salvar tentativas
      },
      onBack: () => console.log('Voltando...'),
      backUrl: '/custom-back'
    }
  );
  
  return <UniversalQuestionSolver {...config} />;
}
```

### 3. Props Diretas (Avançado)

```tsx
import UniversalQuestionSolver from '../components/universal/UniversalQuestionSolver';

function AdvancedQuestion() {
  return (
    <UniversalQuestionSolver
      questionId={1}
      onBack={() => navigate('/back')}
      onFinish={() => navigate('/finish')}
      flowConfig={{
        enabled: true,
        enabledStages: ['begin', 'question', 'explanation'],
        autoStart: true,
        skipBegin: false,
        skipExplanation: false
      }}
      uiConfig={{
        showProgress: true,
        showTimeEstimate: true,
        showTags: true,
        className: 'advanced-question'
      }}
      integrationConfig={{
        saveAttempts: true,
        trackAnalytics: true,
        enableFirebase: true
      }}
    />
  );
}
```

## 📋 Presets Disponíveis

### 1. `dr-skoda-full` - Dr. Skoda Completo
- **Uso**: Experiência educativa completa
- **Características**: Todas as etapas do Dr. Skoda, análise detalhada
- **Recomendado**: Estudo aprofundado, primeira vez com uma questão

```tsx
const config = drSkodaConfig(questionId, onBack, onFinish);
```

### 2. `simple` - Questão Simples
- **Uso**: Revisão rápida, sem Dr. Skoda
- **Características**: Interface limpa, resposta direta
- **Recomendado**: Revisão, questões já conhecidas

```tsx
const config = simpleConfig(questionId, onBack, onFinish);
```

### 3. `study` - Modo Estudo
- **Uso**: Aprendizado estruturado
- **Características**: Dr. Skoda completo, progresso visível
- **Recomendado**: Sessões de estudo planejadas

```tsx
const config = studyConfig(questionId, onBack, onFinish);
```

### 4. `review` - Modo Revisão
- **Uso**: Revisão com análise básica
- **Características**: Dr. Skoda simplificado, foco na análise
- **Recomendado**: Revisão antes de provas

```tsx
const config = reviewConfig(questionId, onBack, onFinish);
```

### 5. `minimal` - Minimalista
- **Uso**: Interface mínima
- **Características**: Sem extras, apenas questão e resposta
- **Recomendado**: Simulados, testes rápidos

```tsx
const config = minimalConfig(questionId, onBack, onFinish);
```

## 🔄 Gerenciamento de Dados de Fluxo

### Dados Manuais (Recomendado)

Para questões importantes, crie dados de fluxo manuais:

```tsx
// src/data/enhancedQuestionFlowData.ts
export const question2FlowData: QuestionFlowData = {
  contextText: "Contexto específico da questão...",
  explanationText: "Explicação detalhada...",
  alternativesAnalysis: [
    {
      letter: 'A',
      text: 'Texto da alternativa',
      isCorrect: false,
      explanation: 'Por que está incorreta...',
      category: 'incorrect',
      conceptsInvolved: ['conceito1', 'conceito2']
    }
    // ... outras alternativas
  ],
  metadata: {
    specialty: 'Medicina Interna',
    difficulty: 'medium',
    tags: ['diagnóstico', 'cardiologia'],
    estimatedTime: 5,
    conceptsRequired: ['fisiopatologia', 'diagnóstico diferencial'],
    learningObjectives: ['Identificar sinais...', 'Aplicar critérios...']
  }
};

// Registrar no sistema
registerQuestionFlowData(2, question2FlowData);
```

### Dados Auto-gerados

O sistema gera automaticamente dados básicos para questões sem dados manuais:

```tsx
// Inicializar sistema com dados automáticos
import { initializeFlowDataSystem } from '../data/universalFlowDataManager';

// No App.tsx ou equivalente
useEffect(() => {
  initializeFlowDataSystem(allQuestions);
}, []);
```

## 🚀 Implementação em Páginas

### Página de Questão Individual

```tsx
// src/pages/UniversalQuestionPage.tsx
import { useParams } from 'react-router-dom';
import UniversalQuestionSolver from '../components/universal/UniversalQuestionSolver';
import { studyConfig } from '../data/questionConfigFactory';

export default function UniversalQuestionPage() {
  const { questionId } = useParams<{ questionId: string }>();
  
  const config = studyConfig(
    parseInt(questionId || '1'),
    () => navigate('/questions'),
    () => navigate('/questions')
  );
  
  return <UniversalQuestionSolver {...config} />;
}
```

### Lista de Questões com Links

```tsx
// src/components/QuestionCard.tsx
import { Link } from 'react-router-dom';

function QuestionCard({ question }: { question: any }) {
  return (
    <div className="question-card">
      <h3>{question.title}</h3>
      
      <div className="question-actions">
        <Link 
          to={`/question/study/${question.id}`}
          className="btn btn-primary"
        >
          📚 Estudar
        </Link>
        
        <Link 
          to={`/question/review/${question.id}`}
          className="btn btn-secondary"
        >
          🔄 Revisar
        </Link>
        
        <Link 
          to={`/question/simple/${question.id}`}
          className="btn btn-outline"
        >
          ⚡ Rápido
        </Link>
      </div>
    </div>
  );
}
```

### Rotas Dinâmicas

```tsx
// src/App.tsx
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      {/* Rotas específicas por tipo */}
      <Route path="/question/study/:questionId" element={<StudyQuestionPage />} />
      <Route path="/question/review/:questionId" element={<ReviewQuestionPage />} />
      <Route path="/question/simple/:questionId" element={<SimpleQuestionPage />} />
      
      {/* Rota genérica */}
      <Route path="/question/:questionId" element={<DefaultQuestionPage />} />
    </Routes>
  );
}

// Componentes específicos
function StudyQuestionPage() {
  const { questionId } = useParams();
  const config = studyConfig(parseInt(questionId || '1'));
  return <UniversalQuestionSolver {...config} />;
}

function ReviewQuestionPage() {
  const { questionId } = useParams();
  const config = reviewConfig(parseInt(questionId || '1'));
  return <UniversalQuestionSolver {...config} />;
}
```

## 🎨 Customização de Estilos

### Classes CSS Automáticas

O sistema adiciona classes CSS automaticamente baseadas na configuração:

```css
/* src/styles/universal-questions.css */

/* Preset Dr. Skoda */
.dr-skoda-full {
  /* Estilos para experiência completa */
}

/* Preset Simples */
.simple-question {
  /* Interface limpa */
}

/* Preset Estudo */
.study-mode {
  /* Foco no aprendizado */
}

/* Preset Revisão */
.review-mode {
  /* Interface de revisão */
}

/* Preset Minimal */
.minimal {
  /* Interface mínima */
}
```

### Customização por Classe

```tsx
const config = createCustomQuestionConfig(1, 'simple', {
  uiConfig: {
    className: 'my-custom-style enhanced-ui'
  }
});
```

## 🔍 Debugging e Monitoramento

### Logs do Sistema

```tsx
// Verificar dados de fluxo carregados
import { flowDataManager } from '../data/universalFlowDataManager';

console.log('Stats:', flowDataManager.getStats());
console.log('Questões disponíveis:', flowDataManager.listAvailableQuestions());
```

### Validação de Configuração

```tsx
import { validateConfig } from '../data/questionConfigFactory';

const config = drSkodaConfig(1);
const validation = validateConfig(config);

if (!validation.isValid) {
  console.error('Configuração inválida:', validation.errors);
}
```

## 📊 Analytics e Tracking

### Configuração de Analytics

```tsx
const config = createCustomQuestionConfig(1, 'study', {
  integrationConfig: {
    trackAnalytics: true, // Habilitar analytics
    saveAttempts: true,   // Salvar tentativas
    enableFirebase: true  // Usar Firebase
  }
});
```

### Eventos Trackados

- ✅ Tentativas de resposta
- ⏱️ Tempo gasto por questão
- 🎯 Taxa de acertos
- 📈 Progresso de estudo
- 🔄 Padrões de revisão

## 🚀 Próximos Passos

### Para Adicionar Nova Questão

1. **Dados Manuais** (Recomendado):
   ```tsx
   // 1. Criar dados de fluxo em enhancedQuestionFlowData.ts
   export const questionXFlowData = { /* ... */ };
   
   // 2. Registrar no sistema
   registerQuestionFlowData(X, questionXFlowData);
   ```

2. **Dados Auto-gerados**:
   ```tsx
   // O sistema gera automaticamente se não houver dados manuais
   const config = studyConfig(newQuestionId);
   ```

### Para Criar Novo Preset

```tsx
// src/data/questionConfigFactory.ts
export const CUSTOM_PRESET: QuestionConfigPreset = {
  name: 'Meu Preset',
  description: 'Descrição personalizada',
  flowConfig: { /* ... */ },
  uiConfig: { /* ... */ },
  integrationConfig: { /* ... */ }
};

// Adicionar ao registry
export const PRESET_REGISTRY = {
  // ... presets existentes
  'custom': CUSTOM_PRESET
} as const;
```

### Para Integrar com Nova Interface

```tsx
// O UniversalQuestionSolver é extensível
// Adicione novas props conforme necessário
interface ExtendedProps extends UniversalQuestionSolverProps {
  customFeature?: boolean;
  newIntegration?: SomeType;
}
```

## 📞 Suporte

Para dúvidas ou problemas:

1. ✅ Verificar este guia
2. 🔍 Inspecionar logs do sistema
3. 🧪 Testar com presets simples primeiro
4. 📝 Verificar dados de fluxo da questão
5. 🐛 Usar ferramentas de debug do React

---

**Sistema Universal de Questões v1.0** - Documentação atualizada em 2025