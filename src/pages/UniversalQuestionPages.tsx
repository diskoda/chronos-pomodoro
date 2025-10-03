import { useParams, useNavigate } from 'react-router-dom';
import { usePageLoading } from '../hooks/usePageLoading';
import UniversalQuestionSolver from '../components/universal/UniversalQuestionSolver';
import { 
  drSkodaConfig, 
  examConfig
} from '../data/questionConfigFactory';

// ==========================================
// PÁGINAS UNIVERSAIS SIMPLIFICADAS
// ==========================================

/**
 * Página universal para modo Dr. Skoda (Padrão)
 * Rota: /question/dr-skoda/:id
 */
export function UniversalDrSkodaQuestion() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Hook que automaticamente esconde loading quando a página carrega
  usePageLoading();
  
  const questionId = parseInt(id || '1');
  
  const config = drSkodaConfig(
    questionId,
    () => navigate('/questions'),
    () => navigate('/questions')
  );
  
  return <UniversalQuestionSolver {...config} />;
}

/**
 * Página universal para modo Simulado (Sem Dr. Skoda)
 * Rota: /exam/question/:id
 */
export function UniversalExamQuestion() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Hook que automaticamente esconde loading quando a página carrega
  usePageLoading();
  
  const questionId = parseInt(id || '1');
  
  const config = examConfig(
    questionId,
    () => navigate('/questions'),
    () => navigate('/questions')
  );
  
  return <UniversalQuestionSolver {...config} />;
}