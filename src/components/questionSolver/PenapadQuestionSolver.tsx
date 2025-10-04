import React, { useState } from 'react';
import { 
  PenapadQuestionWrapper, 
  PenapadQuestionText 
} from '../common';
import QuestionAlternatives from './QuestionAlternatives';
import QuestionActions from './QuestionActions';
import type { Question } from '../../data/types/Question';

interface PenapadQuestionSolverProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onSubmit: (answer: string, timeSpent: number) => void;
  onFinish: () => void;
  className?: string;
}

const PenapadQuestionSolver: React.FC<PenapadQuestionSolverProps> = ({
  question,
  questionNumber,
  totalQuestions,
  onSubmit,
  onFinish,
  className = ''
}) => {
  const [selectedAlternative, setSelectedAlternative] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [startTime] = useState<Date>(new Date());

  // Mapear dificuldade da questão
  const getDifficulty = (): 'easy' | 'medium' | 'hard' => {
    if (question.difficulty === 'Fácil') return 'easy';
    if (question.difficulty === 'Difícil') return 'hard';
    return 'medium';
  };

  // Gerar tags da questão
  const getTags = () => {
    const tags: Array<{ text: string; type: 'specialty' | 'topic' | 'default' }> = [];
    
    // Adicionar categoria como specialty
    if (question.category) {
      const category = Array.isArray(question.category) ? question.category[0] : question.category;
      tags.push({ text: category, type: 'specialty' });
    }
    
    // Adicionar tags se existirem
    if (question.tags && question.tags.length > 0) {
      question.tags.slice(0, 2).forEach((topic: string) => {
        tags.push({ text: topic, type: 'topic' });
      });
    }
    
    // Adicionar exame
    if (question.exam) {
      tags.push({ text: question.exam, type: 'default' });
    }
    
    return tags;
  };

  // Informações adicionais da questão
  const getQuestionInfo = () => {
    if (question.timeEstimate) {
      return {
        title: "Tempo Estimado",
        content: `Tempo recomendado: ${question.timeEstimate} minutos`
      };
    }
    return undefined;
  };

  const handleSubmit = () => {
    if (!selectedAlternative) return;
    
    const timeSpent = Math.floor((new Date().getTime() - startTime.getTime()) / 1000);
    setIsSubmitted(true);
    onSubmit(selectedAlternative, timeSpent);
  };

  const handleFinish = () => {
    onFinish();
  };

  return (
    <div className={`min-h-screen p-4 ${className}`} style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-4xl mx-auto">
        <PenapadQuestionWrapper
          questionNumber={questionNumber}
          totalQuestions={totalQuestions}
          difficulty={getDifficulty()}
          tags={getTags()}
          info={getQuestionInfo()}
        >
          {/* Texto da Questão */}
          <PenapadQuestionText 
            text={question.statement || question.title}
          />

          {/* Alternativas */}
          <QuestionAlternatives
            alternatives={question.alternatives || []}
            selectedAlternative={selectedAlternative}
            onSelect={setSelectedAlternative}
            isSubmitted={isSubmitted}
          />

          {/* Ações */}
          <QuestionActions
            isSubmitted={isSubmitted}
            selectedAlternative={selectedAlternative}
            onSubmit={handleSubmit}
            onFinish={handleFinish}
            showTimer={true}
            timeRemaining="--:--"
            submitButtonText="Confirmar Resposta"
            finishButtonText="Próxima Questão"
          />
        </PenapadQuestionWrapper>
      </div>
    </div>
  );
};

export default PenapadQuestionSolver;