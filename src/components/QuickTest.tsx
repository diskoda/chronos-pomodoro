import UniversalQuestionSolver from '../components/universal/UniversalQuestionSolver';
import { 
  drSkodaConfig, 
  simpleConfig, 
  createCustomQuestionConfig 
} from '../data/questionConfigFactory';

// Componente de teste simples para inserir em qualquer página
export function QuickTest() {
  return (
    <div style={{ 
      border: '2px solid #007bff', 
      borderRadius: '8px', 
      padding: '20px', 
      margin: '20px 0',
      backgroundColor: '#f8f9fa'
    }}>
      <h3>🧪 Teste Rápido - Sistema Universal</h3>
      
      {/* Teste 1: Dr. Skoda */}
      <div style={{ marginBottom: '20px' }}>
        <h4>📚 Teste Dr. Skoda (Questão 1)</h4>
        <UniversalQuestionSolver 
          {...drSkodaConfig(
            1, 
            () => console.log('Voltar clicado'),
            () => console.log('Finalizar clicado')
          )}
        />
      </div>
      
      <hr />
      
      {/* Teste 2: Simples */}
      <div style={{ marginBottom: '20px' }}>
        <h4>⚡ Teste Simples (Questão 1)</h4>
        <UniversalQuestionSolver 
          {...simpleConfig(
            1,
            () => console.log('Voltar - simples'),
            () => console.log('Finalizar - simples')
          )}
        />
      </div>
      
      <hr />
      
      {/* Teste 3: Customizado */}
      <div style={{ marginBottom: '20px' }}>
        <h4>🔧 Teste Customizado (Questão 1)</h4>
        <UniversalQuestionSolver 
          {...createCustomQuestionConfig(1, 'study', {
            flowConfig: {
              skipBegin: true,
              enabledStages: ['question', 'analysis']
            },
            uiConfig: {
              showProgress: false,
              className: 'test-custom'
            },
            integrationConfig: {
              saveAttempts: false
            }
          })}
        />
      </div>
    </div>
  );
}

export default QuickTest;