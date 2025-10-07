# Clean Question Flow System - Documentação

## Estrutura Refatorada

A nova estrutura do sistema de questionFlow foi completamente refatorada para ter código mais limpo e componentes melhor organizados:

```
questionFlow/
├── core/                    # Lógica central
│   ├── types.ts            # Tipos TypeScript centralizados
│   ├── stageConfigs.ts     # Configurações de conteúdo dos estágios
│   └── utils.ts            # Utilitários para estado e progresso
├── contexts/               # Context do React
│   └── FlowContext.tsx     # Context limpo com reducer
├── services/               # Serviços externos
│   └── xpService.ts        # Integração com sistema XP
├── ui/                     # Componentes UI reutilizáveis
│   ├── DrSkodaDialog.tsx   # Dialog principal componentizado
│   ├── AudioPlayer.tsx     # Player de áudio limpo
│   ├── TextContent.tsx     # Processador de texto
│   ├── DrSkodaPortrait.tsx # Retrato do Dr. Skoda
│   └── ProgressIndicator.tsx # Indicador de progresso
├── stages/                 # Componentes de estágio
│   ├── BeginStage.tsx      # Estágio inicial
│   ├── ExplanationStage.tsx # Estágio de explicação
│   └── AnalysisStage.tsx   # Estágio de análise
├── managers/               # Gerenciadores
│   └── StageManager.tsx    # Gerenciador de estágios
├── wrappers/               # Wrappers para uso fácil
│   └── QuestionFlowWrapper.tsx # Wrapper principal
└── index.ts                # Exports organizados
```

## Integração com Sistema XP

O sistema questionFlow agora possui integração automática e transparente com o sistema XP:

### ✅ Funcionalidades XP Integradas:

- **Registro Automático**: XP é registrado automaticamente quando o usuário confirma uma resposta
- **Notificações Visuais**: Popup de XP aparece no canto superior direito
- **Diferenciação por Resultado**: 
  - ✅ Resposta correta: +XP com feedback positivo
  - 📚 Resposta incorreta: +XP menor com incentivo ao aprendizado
- **Level Up Detection**: Notifica quando usuário sobe de nível
- **Integração Silenciosa**: Não interfere na experiência se houver erros

### 🔧 Implementação Técnica:

```tsx
// services/xpService.ts - Serviço isolado
export async function recordQuestionXP(
  questionId: number, 
  selectedAlternative: string, 
  isCorrect: boolean
): Promise<void>

// contexts/FlowContext.tsx - Integração automática
case 'CONFIRM_SELECTION': {
  // XP é registrado automaticamente quando confirma resposta
  if (state.selectedAlternative && state.questionData && state.questionId) {
    recordQuestionXP(state.questionId, state.selectedAlternative, state.isCorrect);
  }
}
```

### 📊 Benefícios da Nova Arquitetura:

1. **Isolamento**: XP service é independente do fluxo da questão
2. **Error Handling**: Falhas no XP não quebram a experiência
3. **Testabilidade**: Service pode ser testado isoladamente  
4. **Flexibilidade**: Fácil customização das regras de XP
5. **Performance**: Processamento assíncrono sem bloqueio

## Como Usar

### Uso Básico (Mais Comum)

```tsx
import { QuestionFlowWrapper } from './components/questionFlow';

function MyQuestionPage() {
  const handleFinish = () => {
    console.log('Questão finalizada!');
    // Navegar para próxima questão ou página
  };

  return (
    <div>
      {/* Seu conteúdo da questão aqui */}
      
      <QuestionFlowWrapper
        questionId={1}
        onFinish={handleFinish}
      />
    </div>
  );
}
```

### Uso Simples (Sem alguns estágios)

```tsx
import { SimpleQuestionFlow } from './components/questionFlow';

function QuickQuestionPage() {
  return (
    <SimpleQuestionFlow
      questionId={1}
      onFinish={() => console.log('Finalizado!')}
      skipBegin={false}        // Opcional: pular estágio inicial
      skipExplanation={false}  // Opcional: pular explicação
    />
  );
}
```

### Uso Avançado com Context

```tsx
import { 
  FlowProvider, 
  useQuestionFlow,
  StageManager,
  ProgressIndicator 
} from './components/questionFlow';

function AdvancedQuestionPage() {
  const questionData = getQuestionFlowData(1);

  return (
    <FlowProvider questionData={questionData} questionId={1}>
      <ProgressIndicator />
      
      <div className="question-content">
        <MyCustomQuestionComponent />
      </div>
      
      <StageManager 
        onFinish={() => console.log('Finalizado!')}
        questionId={1}
      />
    </FlowProvider>
  );
}

function MyCustomQuestionComponent() {
  const { currentStage, selectedAlternative, confirmSelection } = useQuestionFlow();
  
  return (
    <div>
      <h2>Estágio atual: {currentStage}</h2>
      {selectedAlternative && (
        <button onClick={confirmSelection}>
          Confirmar alternativa {selectedAlternative}
        </button>
      )}
    </div>
  );
}
```

### Componentes UI Individuais

```tsx
import { 
  DrSkodaDialog, 
  AudioPlayer, 
  TextContent,
  DrSkodaPortrait 
} from './components/questionFlow';

function CustomDialog() {
  return (
    <DrSkodaDialog
      title="Meu Título Customizado"
      content="Conteúdo personalizado aqui..."
      continueButtonText="Avançar"
      onContinue={() => console.log('Continuando...')}
      audioConfig={{
        src: '/audio.mp3',
        requireCompletion: true,
        autoPlay: true
      }}
    />
  );
}
```

## Principais Melhorias

### 1. **Separação de Responsabilidades**
- **Core**: Lógica pura sem dependências UI
- **UI**: Componentes visuais reutilizáveis  
- **Contexts**: Gerenciamento de estado limpo
- **Services**: Integração com serviços externos

### 2. **Componentes Limpos**
- Cada componente tem uma responsabilidade específica
- Props bem definidas e tipadas
- Código mais legível e manutenível

### 3. **TypeScript Melhorado**
- Tipos centralizados em `core/types.ts`
- Interfaces bem definidas
- Melhor IntelliSense e detecção de erros

### 4. **Reutilização**
- Componentes UI podem ser usados independentemente
- Configurações centralizadas e reutilizáveis
- Fácil customização sem quebrar funcionalidade

### 5. **Manutenibilidade**
- Estrutura de pastas lógica
- Imports organizados
- Backward compatibility mantida

## Compatibilidade

Os exports antigos ainda funcionam para não quebrar código existente:

```tsx
// Ainda funciona (legacy)
import { QuestionBegin, QuestionExplanation, QuestionAnalysis } from './components/questionFlow';

// Novo e recomendado
import { BeginStage, ExplanationStage, AnalysisStage } from './components/questionFlow';
```

## Performance

- Componentes menores e mais focados
- Lazy loading quando possível
- Menos re-renders desnecessários
- Melhor tree-shaking

## Testing

Cada componente pode ser testado independentemente:

```tsx
import { render } from '@testing-library/react';
import { TextContent } from './components/questionFlow';

test('renders text content correctly', () => {
  render(<TextContent content="**Bold text** and normal text" />);
  // Test implementation
});
```