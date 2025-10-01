import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuestion } from '../hooks/useQuestions';
import QuestionSolverHeader from '../components/questionSolver/QuestionSolverHeader';
import QuestionInfo from '../components/common/QuestionInfo';
import QuestionStatement from '../components/questionSolver/QuestionStatement';
import QuestionAlternatives from '../components/questionSolver/QuestionAlternatives';
import QuestionActions from '../components/questionSolver/QuestionActions';
import QuestionNotFound from '../components/questionSolver/QuestionNotFound';

export default function QuestionSolver() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedAlternative, setSelectedAlternative] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Usar o hook Firebase para buscar a questão
  const { question, loading, error } = useQuestion(id || null);

  const handleAlternativeSelect = (alternative: string) => {
    if (!isSubmitted) {
      setSelectedAlternative(alternative);
    }
  };

  const handleSubmit = () => {
    if (selectedAlternative) {
      setIsSubmitted(true);
      // Aqui você pode implementar a lógica de verificação da resposta
    }
  };

  const handleBack = () => {
    navigate('/study');
  };

  // Estados de loading e erro
  if (loading) {
    return (
      <div className="dashboard-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center min-h-96">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="theme-text-secondary">Carregando questão...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <QuestionNotFound 
        onBack={handleBack}
        message={error}
        buttonText="Voltar aos modos de estudo"
      />
    );
  }

  // Estado de questão não encontrada
  if (!question) {
    return (
      <QuestionNotFound 
        onBack={handleBack}
        message="Questão não encontrada"
        buttonText="Voltar aos modos de estudo"
      />
    );
  }

  return (
    <div className="dashboard-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          
          <QuestionSolverHeader 
            onBack={handleBack}
            backButtonText="Voltar"
          />

          <QuestionInfo 
            question={question}
            showTags={true}
            showTimeEstimate={true}
            className="mb-6"
          />

          {question.statement && (
            <QuestionStatement 
              statement={question.statement}
              className="mb-6"
            />
          )}

          {question.alternatives && (
            <QuestionAlternatives
              alternatives={question.alternatives}
              selectedAlternative={selectedAlternative}
              onSelect={handleAlternativeSelect}
              isSubmitted={isSubmitted}
              className="mb-6"
            />
          )}

          <QuestionActions
            isSubmitted={isSubmitted}
            selectedAlternative={selectedAlternative}
            onSubmit={handleSubmit}
            onFinish={handleBack}
            submitButtonText="Enviar Resposta"
            finishButtonText="Finalizar"
            feedbackMessage="Resposta enviada!"
          />

        </div>
      </div>
    </div>
  );
}