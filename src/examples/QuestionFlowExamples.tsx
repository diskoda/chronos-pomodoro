// ==========================================
// EXEMPLO DE USO DO SISTEMA COMPONENTIZADO
// ==========================================

import React from 'react';
import { 
  QuestionFlowWrapper, 
  SimpleQuestionFlow,
  FlowProvider,
  useQuestionFlow,
  QuestionFlowManager
} from '../components/questionFlow';

// ==========================================
// EXEMPLO 1: USO MAIS SIMPLES POSSÍVEL
// ==========================================

function ExemploSimples() {
  const handleFinish = () => {
    console.log('Fluxo finalizado!');
    // Navegar para próxima questão, etc.
  };

  return (
    <SimpleQuestionFlow
      questionId={1}
      onFinish={handleFinish}
    />
  );
}

// ==========================================
// EXEMPLO 2: USO COM CONFIGURAÇÕES CUSTOMIZADAS
// ==========================================

function ExemploCustomizado() {
  const handleFinish = () => {
    console.log('Fluxo finalizado!');
  };

  return (
    <QuestionFlowWrapper
      questionId={1}
      onFinish={handleFinish}
      enabledStages={['begin', 'explanation', 'analysis']} // Pular estágio 'question'
      customConfigs={{
        begin: {
          title: "🎯 Título customizado!",
          buttonText: "Vamos começar!"
        },
        analysis: {
          content: "Conteúdo personalizado para análise..."
        }
      }}
    />
  );
}

// ==========================================
// EXEMPLO 3: USO MANUAL COM HOOKS
// ==========================================

function ExemploManual() {
  const { 
    currentStage, 
    selectedAlternative,
    isCorrect,
    goToStage,
    selectAlternative,
    nextStage 
  } = useQuestionFlow();

  return (
    <div>
      <h2>Estágio atual: {currentStage}</h2>
      <p>Alternativa selecionada: {selectedAlternative}</p>
      <p>Está correto: {isCorrect ? 'Sim' : 'Não'}</p>
      
      <button onClick={() => goToStage('begin')}>Voltar ao início</button>
      <button onClick={nextStage}>Próximo estágio</button>
      <button onClick={() => selectAlternative('A')}>Selecionar A</button>
      
      {/* Renderizar componente baseado no estágio */}
      {currentStage === 'begin' && <QuestionFlowManager onFinish={() => {}} />}
    </div>
  );
}

// ==========================================
// EXEMPLO 4: INTEGRAÇÃO COM QUESTIONSOLVER EXISTENTE
// ==========================================

function QuestionSolverAtualizado() {
  const [showDrSkoda, setShowDrSkoda] = React.useState(false);

  const handleAnswerSubmit = (alternative: string) => {
    console.log('Alternativa selecionada:', alternative);
    setShowDrSkoda(true);
  };

  const handleFlowFinish = () => {
    setShowDrSkoda(false);
    // Continuar para próxima questão
  };

  return (
    <div>
      {/* Interface normal da questão */}
      <div className="question-interface">
        {/* ... componentes de questão existentes ... */}
        
        <button onClick={() => handleAnswerSubmit('A')}>
          Alternativa A
        </button>
        {/* ... demais alternativas ... */}
      </div>

      {/* Overlay do Dr. Skoda quando ativado */}
      {showDrSkoda && (
        <QuestionFlowWrapper
          questionId={1}
          onFinish={handleFlowFinish}
          enabledStages={['explanation', 'analysis']} // Pular begin e question
        />
      )}
    </div>
  );
}

// ==========================================
// EXEMPLO 5: WRAPPER PARA QUALQUER QUESTÃO
// ==========================================

interface UniversalQuestionPageProps {
  questionId: number;
  onNext: () => void;
  showDrSkoda?: boolean;
}

function UniversalQuestionPage({ 
  questionId, 
  onNext, 
  showDrSkoda = true 
}: UniversalQuestionPageProps) {
  return (
    <FlowProvider>
      <div className="question-page">
        {/* Conteúdo da questão */}
        <QuestionContent questionId={questionId} />
        
        {/* Dr. Skoda opcional */}
        {showDrSkoda && (
          <QuestionFlowManager
            onFinish={onNext}
            enabledStages={['begin', 'explanation', 'analysis']}
          />
        )}
      </div>
    </FlowProvider>
  );
}

function QuestionContent({ questionId: _ }: { questionId: number }) {
  const { selectAlternative, goToStage } = useQuestionFlow();
  
  const handleAlternativeSelect = (letter: string) => {
    selectAlternative(letter);
    goToStage('explanation'); // Ir para explicação
  };

  return (
    <div>
      {/* Interface da questão integrada com o hook */}
      <button onClick={() => handleAlternativeSelect('A')}>
        Alternativa A
      </button>
      <button onClick={() => handleAlternativeSelect('B')}>
        Alternativa B
      </button>
      {/* ... */}
    </div>
  );
}

export {
  ExemploSimples,
  ExemploCustomizado,
  ExemploManual,
  QuestionSolverAtualizado,
  UniversalQuestionPage
};