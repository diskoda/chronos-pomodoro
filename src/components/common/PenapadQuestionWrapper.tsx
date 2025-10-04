import React from 'react';
import PenapadProgressStepper from '../common/PenapadProgressStepper';

interface PenapadQuestionWrapperProps {
  children: React.ReactNode;
  questionNumber: number;
  totalQuestions: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  tags?: Array<{ text: string; type: 'specialty' | 'topic' | 'default' }>;
  info?: {
    title: string;
    content: string;
  };
  className?: string;
}

const PenapadQuestionWrapper: React.FC<PenapadQuestionWrapperProps> = ({
  children,
  questionNumber,
  totalQuestions,
  difficulty = 'medium',
  tags = [],
  info,
  className = ''
}) => {
  const getDifficultyClass = (diff: string) => {
    switch (diff) {
      case 'easy':
        return 'penaped-difficulty-easy';
      case 'medium':
        return 'penaped-difficulty-medium';
      case 'hard':
        return 'penaped-difficulty-hard';
      default:
        return 'penaped-difficulty-medium';
    }
  };

  const getDifficultyText = (diff: string) => {
    switch (diff) {
      case 'easy':
        return 'Fácil';
      case 'medium':
        return 'Médio';
      case 'hard':
        return 'Difícil';
      default:
        return 'Médio';
    }
  };

  return (
    <div className={`penaped-question-container ${className}`}>
      {/* Progress Stepper */}
      <PenapadProgressStepper 
        currentStep={questionNumber} 
        totalSteps={totalQuestions} 
      />

      {/* Question Header */}
      <div className="penaped-question-header">
        <div className="penaped-question-number">
          Questão {questionNumber}
        </div>
        <div className={`penaped-question-difficulty ${getDifficultyClass(difficulty)}`}>
          {getDifficultyText(difficulty)}
        </div>
      </div>

      {/* Info Panel */}
      {info && (
        <div className="penaped-info-panel">
          <div className="penaped-info-title">
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 16 16" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M8 12V8M8 4H8.01M15 8C15 11.866 11.866 15 8 15C4.134 15 1 11.866 1 8C1 4.134 4.134 1 8 1C11.866 1 15 4.134 15 8Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            {info.title}
          </div>
          <div className="penaped-info-content">
            {info.content}
          </div>
        </div>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div className="penaped-tags-container">
          {tags.map((tag, index) => (
            <span 
              key={index} 
              className={`penaped-tag ${tag.type}`}
            >
              {tag.text}
            </span>
          ))}
        </div>
      )}

      {/* Question Content */}
      {children}
    </div>
  );
};

export default PenapadQuestionWrapper;