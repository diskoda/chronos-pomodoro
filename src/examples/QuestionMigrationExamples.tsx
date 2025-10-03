// ==========================================
// EXEMPLO DE MIGRAÇÃO: QUESTÃO INDIVIDUAL PARA SISTEMA UNIVERSAL
// ==========================================

import { useParams, useNavigate, Routes, Route } from 'react-router-dom';
import { useState, useContext, createContext } from 'react';
import UniversalQuestionSolver from '../components/universal/UniversalQuestionSolver';
import { 
  drSkodaConfig, 
  simpleConfig, 
  studyConfig, 
  createCustomQuestionConfig 
} from '../data/questionConfigFactory';

// ==========================================
// EXEMPLO 1: MIGRAÇÃO SIMPLES
// ==========================================

// ANTES: Página específica com código duplicado
/*
function OldQuestionPage() {
  const { questionId } = useParams();
  const navigate = useNavigate();
  
  // Muito código específico para cada tipo de questão...
  return (
    <div>
      <QuestionSolverHeader />
      <QuestionInfo />
      <QuestionStatement />
      <QuestionAlternatives />
      // ... etc
    </div>
  );
}
*/

// DEPOIS: Página simples com configuração
export function NewQuestionPage() {
  const { questionId } = useParams<{ questionId: string }>();
  const navigate = useNavigate();
  
  // Configuração simples e reutilizável
  const config = studyConfig(
    parseInt(questionId || '1'),
    () => navigate('/questions'),
    () => navigate('/questions')
  );
  
  return <UniversalQuestionSolver {...config} />;
}

// ==========================================
// EXEMPLO 2: DIFERENTES MODOS PARA MESMA QUESTÃO
// ==========================================

// Questão em modo Dr. Skoda completo
export function DrSkodaQuestionPage() {
  const { questionId } = useParams<{ questionId: string }>();
  const navigate = useNavigate();
  
  const config = drSkodaConfig(
    parseInt(questionId || '1'),
    () => navigate('/study'),
    () => navigate('/study')
  );
  
  return <UniversalQuestionSolver {...config} />;
}

// Questão em modo simples
export function SimpleQuestionPage() {
  const { questionId } = useParams<{ questionId: string }>();
  const navigate = useNavigate();
  
  const config = simpleConfig(
    parseInt(questionId || '1'),
    () => navigate('/questions'),
    () => navigate('/questions')
  );
  
  return <UniversalQuestionSolver {...config} />;
}

// ==========================================
// EXEMPLO 3: CONFIGURAÇÃO PERSONALIZADA PARA CASO ESPECÍFICO
// ==========================================

// Questão para simulado (tempo limitado, sem Dr. Skoda)
export function ExamQuestionPage() {
  const { questionId } = useParams<{ questionId: string }>();
  const navigate = useNavigate();
  
  const config = createCustomQuestionConfig(
    parseInt(questionId || '1'),
    'minimal', // Preset base minimalista
    {
      uiConfig: {
        showProgress: true, // Mostrar progresso no simulado
        className: 'exam-mode'
      },
      integrationConfig: {
        saveAttempts: true, // Salvar para análise posterior
        trackAnalytics: true
      },
      onBack: () => navigate('/exam'),
      onFinish: () => navigate('/exam/results'),
      backUrl: '/exam',
      finishUrl: '/exam/results'
    }
  );
  
  return <UniversalQuestionSolver {...config} />;
}

// ==========================================
// EXEMPLO 4: ROTAS DINÂMICAS BASEADAS EM TIPO
// ==========================================

// Router principal com diferentes tipos
export function QuestionRouter() {
  return (
    <Routes>
      {/* Rota para Dr. Skoda completo */}
      <Route 
        path="/question/dr-skoda/:questionId" 
        element={<DrSkodaQuestionWrapper />} 
      />
      
      {/* Rota para questão simples */}
      <Route 
        path="/question/simple/:questionId" 
        element={<SimpleQuestionWrapper />} 
      />
      
      {/* Rota para modo estudo */}
      <Route 
        path="/question/study/:questionId" 
        element={<StudyQuestionWrapper />} 
      />
      
      {/* Rota para simulado */}
      <Route 
        path="/exam/question/:questionId" 
        element={<ExamQuestionWrapper />} 
      />
      
      {/* Rota padrão */}
      <Route 
        path="/question/:questionId" 
        element={<DefaultQuestionWrapper />} 
      />
    </Routes>
  );
}

// Wrappers simples para cada tipo
function DrSkodaQuestionWrapper() {
  const { questionId } = useParams<{ questionId: string }>();
  const config = drSkodaConfig(parseInt(questionId || '1'));
  return <UniversalQuestionSolver {...config} />;
}

function SimpleQuestionWrapper() {
  const { questionId } = useParams<{ questionId: string }>();
  const config = simpleConfig(parseInt(questionId || '1'));
  return <UniversalQuestionSolver {...config} />;
}

function StudyQuestionWrapper() {
  const { questionId } = useParams<{ questionId: string }>();
  const config = studyConfig(parseInt(questionId || '1'));
  return <UniversalQuestionSolver {...config} />;
}

function ExamQuestionWrapper() {
  const { questionId } = useParams<{ questionId: string }>();
  const config = createCustomQuestionConfig(parseInt(questionId || '1'), 'minimal', {
    uiConfig: { showProgress: true, className: 'exam-mode' }
  });
  return <UniversalQuestionSolver {...config} />;
}

function DefaultQuestionWrapper() {
  const { questionId } = useParams<{ questionId: string }>();
  const config = studyConfig(parseInt(questionId || '1')); // Padrão: modo estudo
  return <UniversalQuestionSolver {...config} />;
}

// ==========================================
// EXEMPLO 5: INTEGRAÇÃO COM LISTA DE QUESTÕES
// ==========================================

// Card de questão com múltiplas opções
export function EnhancedQuestionCard({ question }: { question: any }) {
  const navigate = useNavigate();
  
  return (
    <div className="question-card">
      <div className="question-header">
        <h3>{question.title}</h3>
        <span className="question-category">{question.category}</span>
      </div>
      
      <div className="question-stats">
        <span>⏱️ {question.estimatedTime || 5} min</span>
        <span>📊 {question.difficulty || 'Médio'}</span>
      </div>
      
      <div className="question-actions">
        {/* Botão principal - Dr. Skoda completo */}
        <button 
          className="btn btn-primary"
          onClick={() => navigate(`/question/dr-skoda/${question.id}`)}
        >
          🧑‍⚕️ Dr. Skoda
        </button>
        
        {/* Modo estudo */}
        <button 
          className="btn btn-secondary"
          onClick={() => navigate(`/question/study/${question.id}`)}
        >
          📚 Estudar
        </button>
        
        {/* Questão rápida */}
        <button 
          className="btn btn-outline"
          onClick={() => navigate(`/question/simple/${question.id}`)}
        >
          ⚡ Rápido
        </button>
        
        {/* Adicionar ao simulado */}
        <button 
          className="btn btn-ghost"
          onClick={() => console.log('Adicionar questão', question.id, 'ao simulado')}
        >
          ➕ Simulado
        </button>
      </div>
    </div>
  );
}

// ==========================================
// EXEMPLO 6: HOOK PERSONALIZADO PARA CONFIGURAÇÕES
// ==========================================

// Hook para centralizar lógica de configuração
export function useQuestionConfig(
  questionId: number,
  mode: 'dr-skoda' | 'simple' | 'study' | 'exam' | 'review' = 'study'
) {
  const navigate = useNavigate();
  
  const configs = {
    'dr-skoda': () => drSkodaConfig(
      questionId,
      () => navigate('/questions'),
      () => navigate('/questions')
    ),
    
    'simple': () => simpleConfig(
      questionId,
      () => navigate('/questions'),
      () => navigate('/questions')
    ),
    
    'study': () => studyConfig(
      questionId,
      () => navigate('/questions'),
      () => navigate('/questions')
    ),
    
    'exam': () => createCustomQuestionConfig(questionId, 'minimal', {
      uiConfig: { showProgress: true, className: 'exam-mode' },
      onBack: () => navigate('/exam'),
      onFinish: () => navigate('/exam')
    }),
    
    'review': () => createCustomQuestionConfig(questionId, 'review', {
      onBack: () => navigate('/review'),
      onFinish: () => navigate('/review')
    })
  };
  
  return configs[mode]();
}

// Uso do hook
export function FlexibleQuestionPage() {
  const { questionId, mode } = useParams<{ 
    questionId: string; 
    mode?: 'dr-skoda' | 'simple' | 'study' | 'exam' | 'review' 
  }>();
  
  const config = useQuestionConfig(
    parseInt(questionId || '1'),
    mode || 'study'
  );
  
  return <UniversalQuestionSolver {...config} />;
}

// ==========================================
// EXEMPLO 7: INTEGRAÇÃO COM CONTEXTO GLOBAL
// ==========================================

// Context para configurações globais
interface QuestionContextType {
  defaultMode: 'dr-skoda-full' | 'simple' | 'study';
  userPreferences: {
    showProgress: boolean;
    enableAnalytics: boolean;
    saveAttempts: boolean;
  };
}

const QuestionContext = createContext<QuestionContextType>({
  defaultMode: 'study',
  userPreferences: {
    showProgress: true,
    enableAnalytics: true,
    saveAttempts: true
  }
});

// Componente que usa o contexto
export function ContextAwareQuestion({ questionId }: { questionId: number }) {
  const { defaultMode, userPreferences } = useContext(QuestionContext);
  
  const config = createCustomQuestionConfig(
    questionId,
    defaultMode,
    {
      uiConfig: {
        showProgress: userPreferences.showProgress
      },
      integrationConfig: {
        trackAnalytics: userPreferences.enableAnalytics,
        saveAttempts: userPreferences.saveAttempts
      }
    }
  );
  
  return <UniversalQuestionSolver {...config} />;
}

// ==========================================
// EXEMPLO 8: MIGRAÇÃO GRADUAL
// ==========================================

// Componente híbrido para migração gradual
export function HybridQuestion({ questionId }: { questionId: number }) {
  const [useNewSystem] = useState(true);
  
  if (useNewSystem) {
    // Sistema novo
    const config = studyConfig(questionId);
    return <UniversalQuestionSolver {...config} />;
  } else {
    // Sistema antigo (fallback) - placeholder
    return <div>Sistema antigo - questão {questionId}</div>;
  }
}

// Utilitário para testar diferentes configurações
export function QuestionTester({ questionId }: { questionId: number }) {
  const [currentPreset, setCurrentPreset] = useState<'dr-skoda-full' | 'simple' | 'study'>('study');
  
  const configs = {
    'dr-skoda-full': drSkodaConfig(questionId),
    'simple': simpleConfig(questionId),
    'study': studyConfig(questionId)
  };
  
  return (
    <div>
      <div className="preset-selector">
        <button onClick={() => setCurrentPreset('dr-skoda-full')}>Dr. Skoda</button>
        <button onClick={() => setCurrentPreset('simple')}>Simples</button>
        <button onClick={() => setCurrentPreset('study')}>Estudo</button>
      </div>
      
      <UniversalQuestionSolver {...configs[currentPreset]} />
    </div>
  );
}

// ==========================================
// RESUMO DA MIGRAÇÃO
// ==========================================

/*
BENEFÍCIOS DA MIGRAÇÃO:

✅ Código Reutilizável
- Uma única implementação para todos os tipos de questão
- Redução de 80% no código duplicado

✅ Configuração Flexível  
- Presets para casos comuns
- Customização total quando necessário

✅ Manutenção Simplificada
- Bugs corrigidos em um lugar
- Novas features beneficiam todas as questões

✅ Experiência Consistente
- UI/UX padronizada
- Comportamento previsível

✅ Escalabilidade
- Fácil adicionar novos tipos de questão
- Sistema preparado para crescimento

PROCESSO DE MIGRAÇÃO:

1. ✅ Identificar questões existentes
2. ✅ Criar dados de fluxo (quando necessário)
3. ✅ Substituir componentes por UniversalQuestionSolver
4. ✅ Testar todas as configurações
5. ✅ Atualizar rotas e navegação
6. ✅ Documentar casos específicos

PRÓXIMOS PASSOS:

1. 🔄 Migrar questões uma por vez
2. 📊 Monitorar analytics e performance
3. 🎨 Ajustar estilos conforme necessário
4. 🚀 Expandir para novos tipos de questão
*/