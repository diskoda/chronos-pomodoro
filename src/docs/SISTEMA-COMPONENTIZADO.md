# 📚 Sistema de Fluxo de Questões Componentizado

## 🎯 **VISÃO GERAL**

O sistema foi refatorado para ser **100% reutilizável** em qualquer questão. Aqui está o que foi componentizado:

---

## 🏗️ **ARQUITETURA COMPONENTIZADA**

### **1. 📦 Componentes Base**
```
src/components/questionFlow/
├── types.ts                    # Tipos TypeScript universais
├── FlowContext.tsx             # Context API + Reducer para estado global
├── stageConfigs.ts             # Configurações e templates de conteúdo
├── DrSkodaDialog.tsx           # Componente base do Dr. Skoda (já existente)
├── UniversalFlowStage.tsx      # Componente universal para qualquer estágio
├── QuestionFlowWrapper.tsx     # Wrapper principal para uso fácil
└── index.ts                    # Exports organizados
```

### **2. 🗂️ Dados e Configurações**
```
src/data/
├── enhancedQuestionFlowData.ts # Sistema de dados melhorado
└── questionFlowData.ts         # Arquivo original (mantido para compatibilidade)
```

---

## 🚀 **FORMAS DE USO**

### **Opção 1: Super Simples (Recomendado)**
```tsx
import { SimpleQuestionFlow } from '../components/questionFlow';

function MinhaQuestao() {
  return (
    <SimpleQuestionFlow
      questionId={1}
      onFinish={() => console.log('Terminou!')}
    />
  );
}
```

### **Opção 2: Com Configurações Customizadas**
```tsx
import { QuestionFlowWrapper } from '../components/questionFlow';

function QuestaoCustomizada() {
  return (
    <QuestionFlowWrapper
      questionId={1}
      onFinish={() => console.log('Terminou!')}
      enabledStages={['begin', 'explanation', 'analysis']} // Pular 'question'
      customConfigs={{
        begin: {
          title: "🎯 Título personalizado!",
          buttonText: "Bora começar!"
        }
      }}
    />
  );
}
```

### **Opção 3: Controle Manual Completo**
```tsx
import { FlowProvider, useQuestionFlow, QuestionFlowManager } from '../components/questionFlow';

function ControleManual() {
  return (
    <FlowProvider questionData={dadosDaQuestao}>
      <MinhaInterface />
      <QuestionFlowManager onFinish={() => {}} />
    </FlowProvider>
  );
}

function MinhaInterface() {
  const { currentStage, selectAlternative, nextStage } = useQuestionFlow();
  
  return (
    <div>
      <p>Estágio: {currentStage}</p>
      <button onClick={() => selectAlternative('A')}>Escolher A</button>
      <button onClick={nextStage}>Próximo</button>
    </div>
  );
}
```

---

## 📋 **PARA ADICIONAR UMA NOVA QUESTÃO**

### **Passo 1: Criar os dados**
```typescript
// Em src/data/enhancedQuestionFlowData.ts

export const question2FlowData: QuestionFlowData = {
  contextText: "Contexto da questão 2...",
  explanationText: "Explicação teórica...",
  alternativesAnalysis: [
    {
      letter: "A",
      text: "Texto da alternativa A",
      isCorrect: true,
      explanation: "Por que está correta...",
      category: 'correct',
      conceptsInvolved: ['conceito1', 'conceito2']
    },
    // ... demais alternativas
  ],
  metadata: {
    specialty: 'Pediatria',
    difficulty: 'medium',
    tags: ['tag1', 'tag2'],
    estimatedTime: 10,
    conceptsRequired: ['conceito1'],
    learningObjectives: ['objetivo1']
  }
};
```

### **Passo 2: Registrar na função getter**
```typescript
export function getQuestionFlowData(questionId: number): QuestionFlowData | null {
  switch (questionId) {
    case 1: return question1FlowData;
    case 2: return question2FlowData; // ← Adicionar aqui
    default: return null;
  }
}
```

### **Passo 3: Usar na questão**
```tsx
<SimpleQuestionFlow
  questionId={2}  // ← Só mudar o ID!
  onFinish={handleFinish}
/>
```

---

## 🎨 **CUSTOMIZAÇÕES DISPONÍVEIS**

### **Personalizar Estágios**
```tsx
<QuestionFlowWrapper
  questionId={1}
  customConfigs={{
    begin: {
      title: "🔥 Título épico!",
      content: "Conteúdo completamente diferente...",
      buttonText: "Partiu!"
    },
    explanation: {
      title: "📚 Vamos estudar isso!"
    },
    analysis: {
      buttonText: "🏆 Show de bola!"
    }
  }}
/>
```

### **Escolher Quais Estágios Mostrar**
```tsx
// Só mostrar explicação e análise (pular begin e question)
<QuestionFlowWrapper
  enabledStages={['explanation', 'analysis']}
  questionId={1}
  onFinish={handleFinish}
/>
```

### **Modo Manual (Controle Total)**
```tsx
const { 
  currentStage,           // 'begin' | 'question' | 'explanation' | 'analysis' 
  questionData,           // Dados da questão carregados
  selectedAlternative,    // 'A', 'B', 'C', 'D' ou null
  isCorrect,             // boolean
  progress,              // 0-100
  goToStage,             // (stage) => void
  selectAlternative,     // (letter) => void  
  nextStage,             // () => void
  resetFlow              // () => void
} = useQuestionFlow();
```

---

## 🔧 **HOOKS DISPONÍVEIS**

### **useQuestionFlow()**
- ✅ Controle completo do estado do fluxo
- ✅ Navegação entre estágios
- ✅ Seleção de alternativas
- ✅ Progresso em tempo real

### **useSimpleQuestionFlow(questionId)**
- ✅ Versão simplificada com dados carregados automaticamente
- ✅ Ideal para casos básicos

---

## 🎯 **BENEFÍCIOS DA COMPONENTIZAÇÃO**

### **✅ Reutilização Total**
- Uma vez configurado, funciona em **qualquer questão**
- Apenas mude o `questionId` prop

### **✅ Flexibilidade Máxima**
- 3 níveis de uso: Simples → Customizado → Manual
- Personalize títulos, conteúdos, botões
- Escolha quais estágios mostrar

### **✅ Manutenibilidade**
- Toda lógica centralizada no Context
- Fácil adicionar novos recursos
- Backward compatibility mantida

### **✅ Tipagem Completa**
- TypeScript em tudo
- Autocomplete e validação
- Detecção de erros em tempo de desenvolvimento

### **✅ Performance**
- Estado gerenciado com useReducer
- Re-renders otimizados
- Lazy loading de conteúdo

---

## 🚧 **MIGRAÇÃO DO CÓDIGO ATUAL**

### **Antes (código atual):**
```tsx
// QuestionSolver.tsx
const [flowStage, setFlowStage] = useState('begin');

{flowStage === 'begin' && (
  <QuestionBegin 
    contextText={flowData?.contextText || ''} 
    onContinue={() => setFlowStage('question')} 
  />
)}
{flowStage === 'explanation' && (
  <QuestionExplanation 
    explanationText={flowData?.explanationText || ''} 
    onContinue={() => setFlowStage('analysis')} 
  />
)}
// ... etc
```

### **Depois (componentizado):**
```tsx
// QuestionSolver.tsx
<SimpleQuestionFlow
  questionId={questionId}
  onFinish={() => navigate('/next-question')}
/>
```

**📉 90% menos código!**

---

## 🎨 **EXEMPLOS PRÁTICOS**

### **Questão de Pediatria Básica**
```tsx
<SimpleQuestionFlow questionId={1} onFinish={handleNext} />
```

### **Questão Complexa com Configurações**
```tsx
<QuestionFlowWrapper
  questionId={2}
  enabledStages={['begin', 'explanation', 'analysis']}
  customConfigs={{
    begin: { title: "🩺 Caso Clínico Avançado" },
    analysis: { buttonText: "🎯 Dominar este conceito!" }
  }}
  onFinish={handleFinish}
/>
```

### **Integração com Sistema Existente**
```tsx
function QuestionSolver() {
  const [showFlow, setShowFlow] = useState(false);
  
  return (
    <div>
      {/* Interface normal da questão */}
      <QuestionInterface onSubmit={() => setShowFlow(true)} />
      
      {/* Dr. Skoda aparece após resposta */}
      {showFlow && (
        <SimpleQuestionFlow
          questionId={questionId}
          onFinish={() => setShowFlow(false)}
        />
      )}
    </div>
  );
}
```

---

## 🏁 **RESULTADO FINAL**

✅ **Sistema 100% reutilizável** para qualquer questão  
✅ **3 níveis de complexidade** conforme a necessidade  
✅ **Backward compatibility** preservada  
✅ **TypeScript completo** com validação  
✅ **Performance otimizada** com Context + Reducer  
✅ **Manutenibilidade máxima** com arquitetura limpa  

🎉 **Agora você pode usar o Dr. Skoda em qualquer questão apenas mudando o `questionId`!**