import { QuestionFlowWrapper, SimpleQuestionFlow, ProgressIndicator } from '../index';

// ==========================================
// EXEMPLO 1: USO BÁSICO MAIS COMUM
// ==========================================

function BasicQuestionFlowExample() {
  const handleFinish = () => {
    console.log('✅ Questão finalizada!');
    // Aqui você pode navegar para próxima questão ou página
  };

  return (
    <div className="question-page">
      <h1>Questão 1 - Pediatria</h1>
      
      {/* Seu conteúdo da questão aqui */}
      <div className="question-content">
        <p>Conteúdo da questão...</p>
      </div>
      
      {/* Dr. Skoda aparecerá automaticamente nos estágios corretos */}
      <QuestionFlowWrapper
        questionId={1}
        onFinish={handleFinish}
      />
    </div>
  );
}

// ==========================================
// EXEMPLO 2: FLUXO SIMPLES COM CONFIGURAÇÕES
// ==========================================

function SimpleFlowExample() {
  return (
    <div className="simple-question">
      <SimpleQuestionFlow
        questionId={2}
        onFinish={() => alert('Questão concluída!')}
        skipBegin={false}        // Incluir estágio inicial
        skipExplanation={false}  // Incluir explicação
      />
    </div>
  );
}

// ==========================================
// EXEMPLO 3: USO AVANÇADO COM COMPONENTES CUSTOMIZADOS
// ==========================================

function AdvancedQuestionFlowExample() {
  const questionId = 3;

  return (
    <div className="advanced-question">
      {/* Indicador de progresso no topo */}
      <ProgressIndicator className="mb-4" showDetails={true} />
      
      <div className="question-layout">
        <h2>Questão Avançada - Endocrinologia</h2>
        
        {/* Componente customizado que usa o context */}
        <CustomQuestionInteraction />
        
        {/* Wrapper principal */}
        <QuestionFlowWrapper
          questionId={questionId}
          onFinish={() => console.log('Avançada finalizada!')}
          enabledStages={['begin', 'question', 'explanation', 'analysis']}
        />
      </div>
    </div>
  );
}

// Componente customizado que acessa o context
import { useQuestionFlow } from '../index';

function CustomQuestionInteraction() {
  const { 
    currentStage, 
    selectedAlternative, 
    isCorrect,
    selectAlternative, 
    confirmSelection 
  } = useQuestionFlow();

  return (
    <div className="custom-interaction">
      <div className="stage-info">
        <p>Estágio atual: <strong>{currentStage}</strong></p>
        {selectedAlternative && (
          <p>Alternativa selecionada: <strong>{selectedAlternative}</strong></p>
        )}
      </div>
      
      {currentStage === 'question' && (
        <div className="question-controls">
          <div className="alternatives">
            {['A', 'B', 'C', 'D', 'E'].map(letter => (
              <button
                key={letter}
                onClick={() => selectAlternative(letter)}
                className={`alternative-btn ${
                  selectedAlternative === letter ? 'selected' : ''
                }`}
              >
                Alternativa {letter}
              </button>
            ))}
          </div>
          
          {selectedAlternative && (
            <button
              onClick={confirmSelection}
              className="confirm-btn"
            >
              Confirmar Resposta
            </button>
          )}
        </div>
      )}
      
      {currentStage === 'analysis' && (
        <div className="result-info">
          <p className={`result ${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? '✅ Resposta Correta!' : '❌ Resposta Incorreta'}
          </p>
        </div>
      )}
    </div>
  );
}

// ==========================================
// EXEMPLO 4: COMPONENTES UI INDEPENDENTES
// ==========================================

import { DrSkodaDialog, AudioPlayer, TextContent } from '../index';

function IndependentUIExample() {
  return (
    <div className="ui-examples">
      <h3>Componentes UI Independentes</h3>
      
      {/* Dialog customizado */}
      <DrSkodaDialog
        title="Minha Explicação Customizada"
        content={`**Conceito importante:**
        
        Este é um exemplo de como usar o DrSkodaDialog independentemente.
        
        • Suporte a formatação **negrito**
        • Listas com bullets
        • Conteúdo multi-linha
        
        **Conclusão:**
        Componente reutilizável e flexível!`}
        continueButtonText="Entendi!"
        onContinue={() => console.log('Dialog fechado')}
        audioConfig={{
          src: '/exemplo-audio.mp3',
          requireCompletion: true,
          autoPlay: false
        }}
      />
      
      {/* Player de áudio independente */}
      <AudioPlayer
        config={{
          sequence: ['/audio1.mp3', '/audio2.mp3', '/audio3.mp3'],
          requireCompletion: false,
          autoPlay: true
        }}
        onComplete={() => console.log('Áudio concluído')}
        className="my-4"
      />
      
      {/* Processador de texto independente */}
      <div className="text-example p-4 bg-slate-800 rounded">
        <TextContent
          content={`**Exemplo de Texto Processado:**
          
          Este componente processa automaticamente:
          
          • **Textos em negrito**
          • Listas com bullets
          • Parágrafos múltiplos
          
          **Resultado:**
          Formatação consistente em toda aplicação!`}
        />
      </div>
    </div>
  );
}

// ==========================================
// EXPORTAÇÕES PARA USO
// ==========================================

export {
  BasicQuestionFlowExample,
  SimpleFlowExample,
  AdvancedQuestionFlowExample,
  IndependentUIExample
};