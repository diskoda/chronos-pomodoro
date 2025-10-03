import { useParams, useNavigate } from 'react-router-dom';
import UniversalQuestionSolver from '../components/universal/UniversalQuestionSolver';
import { 
  drSkodaConfig, 
  simpleConfig, 
  studyConfig, 
  reviewConfig,
  createCustomQuestionConfig 
} from '../data/questionConfigFactory';

// ==========================================
// PÁGINAS UNIVERSAIS PARA TODAS AS QUESTÕES
// ==========================================

/**
 * Página universal para modo Dr. Skoda
 * Rota: /question/dr-skoda/:id
 */
export function UniversalDrSkodaQuestion() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const questionId = parseInt(id || '1');
  
  const config = drSkodaConfig(
    questionId,
    () => navigate('/questions'),
    () => navigate('/questions')
  );
  
  return <UniversalQuestionSolver {...config} />;
}

/**
 * Página universal para modo simples
 * Rota: /question/simple/:id
 */
export function UniversalSimpleQuestion() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const questionId = parseInt(id || '1');
  
  const config = simpleConfig(
    questionId,
    () => navigate('/questions'),
    () => navigate('/questions')
  );
  
  return <UniversalQuestionSolver {...config} />;
}

/**
 * Página universal para modo estudo
 * Rota: /question/study/:id
 */
export function UniversalStudyQuestion() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const questionId = parseInt(id || '1');
  
  const config = studyConfig(
    questionId,
    () => navigate('/questions'),
    () => navigate('/questions')
  );
  
  return <UniversalQuestionSolver {...config} />;
}

/**
 * Página universal para modo revisão
 * Rota: /question/review/:id
 */
export function UniversalReviewQuestion() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const questionId = parseInt(id || '1');
  
  const config = reviewConfig(
    questionId,
    () => navigate('/questions'),
    () => navigate('/questions')
  );
  
  return <UniversalQuestionSolver {...config} />;
}

/**
 * Página universal para simulado
 * Rota: /exam/question/:id
 */
export function UniversalExamQuestion() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const questionId = parseInt(id || '1');
  
  const config = createCustomQuestionConfig(
    questionId,
    'minimal',
    {
      uiConfig: {
        showProgress: true,
        showTimeEstimate: false,
        showTags: false,
        className: 'exam-mode'
      },
      integrationConfig: {
        saveAttempts: true,
        trackAnalytics: true,
        enableFirebase: true
      },
      onBack: () => navigate('/exam'),
      onFinish: () => navigate('/exam'),
      backUrl: '/exam',
      finishUrl: '/exam'
    }
  );
  
  return <UniversalQuestionSolver {...config} />;
}

/**
 * Página universal padrão (modo estudo)
 * Rota: /question/:id
 */
export function UniversalDefaultQuestion() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const questionId = parseInt(id || '1');
  
  // Padrão: modo estudo
  const config = studyConfig(
    questionId,
    () => navigate('/questions'),
    () => navigate('/questions')
  );
  
  return <UniversalQuestionSolver {...config} />;
}

/**
 * Página universal flexível baseada em parâmetros
 * Rota: /question/:mode/:id
 */
export function UniversalFlexibleQuestion() {
  const { mode, id } = useParams<{ mode: string; id: string }>();
  const navigate = useNavigate();
  
  const questionId = parseInt(id || '1');
  
  // Factory de configurações baseado no modo
  const configFactories = {
    'dr-skoda': drSkodaConfig,
    'simple': simpleConfig,
    'study': studyConfig,
    'review': reviewConfig,
    'minimal': (qId: number, onBack?: () => void, onFinish?: () => void) => 
      createCustomQuestionConfig(qId, 'minimal', {
        onBack,
        onFinish
      })
  };
  
  const factory = configFactories[mode as keyof typeof configFactories] || studyConfig;
  
  const config = factory(
    questionId,
    () => navigate('/questions'),
    () => navigate('/questions')
  );
  
  return <UniversalQuestionSolver {...config} />;
}