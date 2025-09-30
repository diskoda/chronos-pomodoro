import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Question } from '../data/types/Question';
import { getQuestionById } from '../data/questions';
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
  const [question, setQuestion] = useState<Question | null>(null);

  useEffect(() => {
    const questionId = parseInt(id || '0');
    const foundQuestion = getQuestionById(questionId);
    setQuestion(foundQuestion || null);
  }, [id]);

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