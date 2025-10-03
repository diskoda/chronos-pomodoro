import { BrowserRouter } from 'react-router-dom';
import UniversalQuestionSystemTest from '../tests/UniversalQuestionSystemTest';

// Página dedicada para testes do sistema universal
export default function TestPage() {
  return (
    <BrowserRouter>
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>🧪 Teste do Sistema Universal de Questões</h1>
        <UniversalQuestionSystemTest />
      </div>
    </BrowserRouter>
  );
}