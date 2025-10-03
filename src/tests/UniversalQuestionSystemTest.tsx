// ==========================================
// TESTE DO SISTEMA UNIVERSAL DE QUESTÕES
// ==========================================

import { useEffect, useState } from 'react';
import UniversalQuestionSolver from '../components/universal/UniversalQuestionSolver';
import { 
  drSkodaConfig, 
  simpleConfig, 
  studyConfig, 
  reviewConfig,
  minimalConfig,
  createCustomQuestionConfig,
  getAvailablePresets,
  validateConfig
} from '../data/questionConfigFactory';
import { 
  initializeFlowDataSystem,
  flowDataManager 
} from '../data/universalFlowDataManager';

// ==========================================
// COMPONENTE DE TESTE PRINCIPAL
// ==========================================

function UniversalQuestionSystemTest() {
  useEffect(() => {
    // Inicializar sistema de dados de fluxo
    const initSystem = async () => {
      try {
        await initializeFlowDataSystem();
        console.log('✅ Sistema Universal inicializado com sucesso');
        
        // Mostrar estatísticas
        const stats = flowDataManager.getStats();
        console.log('📊 Estatísticas do sistema:', stats);
        
        // Mostrar presets disponíveis
        const presets = getAvailablePresets();
        console.log('🎛️ Presets disponíveis:', presets.map(p => p.key));
        
      } catch (error) {
        console.error('❌ Erro ao inicializar sistema:', error);
      }
    };
    
    initSystem();
  }, []);

  return (
    <div className="universal-question-test">
      <h1>🧪 Teste do Sistema Universal de Questões</h1>
      
      <div className="test-sections">
        {/* Seção 1: Dr. Skoda Completo */}
        <TestSection 
          title="Dr. Skoda Completo"
          description="Experiência completa com Dr. Skoda"
          configFactory={() => drSkodaConfig(1)}
        />
        
        {/* Seção 2: Questão Simples */}
        <TestSection 
          title="Questão Simples" 
          description="Interface limpa sem Dr. Skoda"
          configFactory={() => simpleConfig(1)}
        />
        
        {/* Seção 3: Modo Estudo */}
        <TestSection 
          title="Modo Estudo"
          description="Experiência educativa estruturada"
          configFactory={() => studyConfig(1)}
        />
        
        {/* Seção 4: Modo Revisão */}
        <TestSection 
          title="Modo Revisão"
          description="Revisão rápida com análise"
          configFactory={() => reviewConfig(1)}
        />
        
        {/* Seção 5: Configuração Customizada */}
        <TestSection 
          title="Configuração Customizada"
          description="Exemplo de customização avançada"
          configFactory={() => createCustomQuestionConfig(1, 'study', {
            flowConfig: {
              skipBegin: true,
              enabledStages: ['question', 'analysis']
            },
            uiConfig: {
              showProgress: false,
              className: 'custom-test-style'
            },
            integrationConfig: {
              saveAttempts: false,
              trackAnalytics: false
            }
          })}
        />
      </div>
      
      {/* Seção de Validação */}
      <TestValidationSection />
      
      {/* Seção de Estatísticas */}
      <TestStatsSection />
    </div>
  );
}

// ==========================================
// COMPONENTE DE SEÇÃO DE TESTE
// ==========================================

interface TestSectionProps {
  title: string;
  description: string;
  configFactory: () => any;
}

function TestSection({ title, description, configFactory }: TestSectionProps) {
  const handleTest = () => {
    try {
      const config = configFactory();
      const validation = validateConfig(config);
      
      console.log(`🧪 Testando: ${title}`);
      console.log('⚙️ Configuração:', config);
      console.log('✅ Validação:', validation);
      
      if (!validation.isValid) {
        console.error('❌ Configuração inválida:', validation.errors);
      }
      
    } catch (error) {
      console.error(`❌ Erro ao testar ${title}:`, error);
    }
  };

  return (
    <div className="test-section">
      <div className="test-header">
        <h3>{title}</h3>
        <p>{description}</p>
        <button onClick={handleTest} className="btn btn-test">
          🧪 Testar Configuração
        </button>
      </div>
      
      <div className="test-preview">
        <UniversalQuestionSolver {...configFactory()} />
      </div>
    </div>
  );
}

// ==========================================
// SEÇÃO DE VALIDAÇÃO
// ==========================================

function TestValidationSection() {
  const runValidationTests = () => {
    console.log('🔍 Executando testes de validação...');
    
    const testCases = [
      {
        name: 'Configuração válida',
        config: drSkodaConfig(1),
        shouldPass: true
      },
      {
        name: 'QuestionId inválido',
        config: { ...simpleConfig(1), questionId: 0 },
        shouldPass: false
      },
      {
        name: 'QuestionId negativo',
        config: { ...studyConfig(1), questionId: -1 },
        shouldPass: false
      }
    ];
    
    testCases.forEach(testCase => {
      const validation = validateConfig(testCase.config);
      const passed = validation.isValid === testCase.shouldPass;
      
      console.log(
        passed ? '✅' : '❌',
        `Teste: ${testCase.name}`,
        validation
      );
    });
  };

  return (
    <div className="test-validation-section">
      <h3>🔍 Testes de Validação</h3>
      <button onClick={runValidationTests} className="btn btn-validation">
        Executar Testes de Validação
      </button>
    </div>
  );
}

// ==========================================
// SEÇÃO DE ESTATÍSTICAS
// ==========================================

function TestStatsSection() {
  const showStats = () => {
    const stats = flowDataManager.getStats();
    const presets = getAvailablePresets();
    
    console.group('📊 Estatísticas do Sistema');
    console.log('Questões com dados de fluxo:', stats.totalQuestions);
    console.log('Fontes carregadas:', stats.loadedSources);
    console.log('Dados auto-gerados:', stats.autoGenerated);
    console.log('Dados manuais:', stats.manual);
    console.log('Presets disponíveis:', presets.length);
    console.log('Questões disponíveis:', flowDataManager.listAvailableQuestions());
    console.groupEnd();
  };

  return (
    <div className="test-stats-section">
      <h3>📊 Estatísticas do Sistema</h3>
      <button onClick={showStats} className="btn btn-stats">
        Mostrar Estatísticas
      </button>
    </div>
  );
}

// ==========================================
// TESTE DE PERFORMANCE
// ==========================================

export function PerformanceTest() {
  const runPerformanceTest = () => {
    console.log('⚡ Iniciando teste de performance...');
    
    const startTime = performance.now();
    
    // Criar 100 configurações diferentes
    for (let i = 1; i <= 100; i++) {
      const configs = [
        drSkodaConfig(i),
        simpleConfig(i),
        studyConfig(i),
        reviewConfig(i),
        minimalConfig(i)
      ];
      
      configs.forEach(config => validateConfig(config));
    }
    
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    console.log(`✅ Teste de performance concluído em ${duration.toFixed(2)}ms`);
    console.log(`📈 Média por configuração: ${(duration / 500).toFixed(2)}ms`);
  };

  return (
    <div className="performance-test">
      <h3>⚡ Teste de Performance</h3>
      <button onClick={runPerformanceTest} className="btn btn-performance">
        Executar Teste de Performance
      </button>
    </div>
  );
}

// ==========================================
// COMPONENTE DE DEMONSTRAÇÃO INTERATIVA
// ==========================================

export function InteractiveDemo() {
  const [selectedPreset, setSelectedPreset] = useState<string>('study');
  const [questionId, setQuestionId] = useState<number>(1);
  
  const presetConfigs = {
    'dr-skoda-full': () => drSkodaConfig(questionId),
    'simple': () => simpleConfig(questionId),
    'study': () => studyConfig(questionId),
    'review': () => reviewConfig(questionId),
    'minimal': () => minimalConfig(questionId)
  };
  
  const currentConfig = presetConfigs[selectedPreset as keyof typeof presetConfigs]();

  return (
    <div className="interactive-demo">
      <h2>🎮 Demonstração Interativa</h2>
      
      <div className="demo-controls">
        <div className="control-group">
          <label>ID da Questão:</label>
          <input 
            type="number" 
            value={questionId}
            onChange={(e) => setQuestionId(parseInt(e.target.value) || 1)}
            min="1"
          />
        </div>
        
        <div className="control-group">
          <label>Preset:</label>
          <select 
            value={selectedPreset}
            onChange={(e) => setSelectedPreset(e.target.value)}
          >
            <option value="dr-skoda-full">Dr. Skoda Completo</option>
            <option value="simple">Simples</option>
            <option value="study">Estudo</option>
            <option value="review">Revisão</option>
            <option value="minimal">Minimalista</option>
          </select>
        </div>
        
        <button 
          onClick={() => console.log('Configuração atual:', currentConfig)}
          className="btn btn-info"
        >
          📋 Ver Configuração
        </button>
      </div>
      
      <div className="demo-preview">
        <UniversalQuestionSolver {...currentConfig} />
      </div>
    </div>
  );
}

// ==========================================
// ESTILOS CSS PARA O TESTE
// ==========================================

export const testStyles = `
.universal-question-test {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.test-sections {
  display: grid;
  gap: 20px;
  margin: 20px 0;
}

.test-section {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  background: #f9f9f9;
}

.test-header {
  margin-bottom: 15px;
}

.test-header h3 {
  margin: 0 0 5px 0;
  color: #333;
}

.test-header p {
  margin: 0 0 10px 0;
  color: #666;
  font-size: 14px;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-right: 10px;
}

.btn-test { background: #007bff; color: white; }
.btn-validation { background: #28a745; color: white; }
.btn-stats { background: #17a2b8; color: white; }
.btn-performance { background: #ffc107; color: black; }
.btn-info { background: #6c757d; color: white; }

.demo-controls {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  align-items: end;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.control-group label {
  font-weight: bold;
  font-size: 14px;
}

.control-group input,
.control-group select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
`;

// ==========================================
// EXPORTAÇÃO PRINCIPAL
// ==========================================

export default UniversalQuestionSystemTest;