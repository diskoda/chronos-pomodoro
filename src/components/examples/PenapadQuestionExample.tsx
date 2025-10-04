import React, { useState } from 'react';
import { 
  PenapadQuestionWrapper, 
  PenapadQuestionText 
} from '../../components/common';
import QuestionAlternatives from '../../components/questionSolver/QuestionAlternatives';
import QuestionActions from '../../components/questionSolver/QuestionActions';

// Exemplo de uso do estilo PéNaPED
const PenapadQuestionExample: React.FC = () => {
  const [selectedAlternative, setSelectedAlternative] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Dados de exemplo
  const questionData = {
    number: 1,
    totalQuestions: 10,
    difficulty: 'medium' as const,
    text: "Paciente de 65 anos, sexo masculino, com histórico de hipertensão arterial sistêmica, apresenta quadro de dispneia progressiva há 3 meses, associada a edema de membros inferiores e ortopneia. Ao exame físico, presença de estertores crepitantes bibasais e sopro sistólico em foco mitral. Qual a principal hipótese diagnóstica?",
    alternatives: [
      "Insuficiência cardíaca congestiva",
      "Pneumonia bilateral",
      "Embolia pulmonar",
      "Infarto agudo do miocárdio",
      "Asma bronquica"
    ],
    correctAnswer: "Insuficiência cardíaca congestiva",
    tags: [
      { text: "Cardiologia", type: 'specialty' as const },
      { text: "Insuficiência Cardíaca", type: 'topic' as const },
      { text: "Diagnóstico Clínico", type: 'default' as const }
    ],
    info: {
      title: "Dica Clínica",
      content: "A presença de dispneia progressiva, edema de membros inferiores, ortopneia e estertores bibasais são sinais clássicos de insuficiência cardíaca congestiva."
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const handleFinish = () => {
    console.log('Próxima questão...');
    // Reset para demonstração
    setSelectedAlternative(null);
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <PenapadQuestionWrapper
          questionNumber={questionData.number}
          totalQuestions={questionData.totalQuestions}
          difficulty={questionData.difficulty}
          tags={questionData.tags}
          info={questionData.info}
        >
          {/* Texto da Questão */}
          <PenapadQuestionText 
            text={questionData.text}
          />

          {/* Alternativas */}
          <QuestionAlternatives
            alternatives={questionData.alternatives}
            selectedAlternative={selectedAlternative}
            onSelect={setSelectedAlternative}
            isSubmitted={isSubmitted}
            correctAnswer={isSubmitted ? questionData.correctAnswer : undefined}
          />

          {/* Ações */}
          <QuestionActions
            isSubmitted={isSubmitted}
            selectedAlternative={selectedAlternative}
            onSubmit={handleSubmit}
            onFinish={handleFinish}
            showTimer={true}
            timeRemaining="02:45"
          />
        </PenapadQuestionWrapper>
      </div>
    </div>
  );
};

export default PenapadQuestionExample;