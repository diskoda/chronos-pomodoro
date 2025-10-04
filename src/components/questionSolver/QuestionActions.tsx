import SubmissionFeedback from './SubmissionFeedback';

interface QuestionActionsProps {
  isSubmitted: boolean;
  selectedAlternative: string | null;
  onSubmit: () => void;
  onFinish: () => void;
  submitButtonText?: string;
  finishButtonText?: string;
  feedbackMessage?: string;
  showTimer?: boolean;
  timeRemaining?: string;
  className?: string;
}

export default function QuestionActions({ 
  isSubmitted, 
  selectedAlternative, 
  onSubmit, 
  onFinish,
  submitButtonText = "Enviar Resposta",
  finishButtonText = "Próxima",
  feedbackMessage = "Resposta enviada!",
  showTimer = false,
  timeRemaining,
  className = ""
}: QuestionActionsProps) {
  return (
    <div className={`penaped-question-actions ${className}`}>
      <div className="flex items-center space-x-4">
        {/* Timer Display */}
        {showTimer && timeRemaining && (
          <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300">
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 16 16" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M8 1V3M8 13V15M15 8H13M3 8H1M12.95 4.05L11.54 5.46M4.46 11.54L3.05 12.95M12.95 11.95L11.54 10.54M4.46 4.46L3.05 3.05M8 6V8L10 10" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            {timeRemaining}
          </div>
        )}
        
        {/* Feedback */}
        <SubmissionFeedback 
          isVisible={isSubmitted} 
          message={feedbackMessage}
          type="success"
        />
      </div>
      
      <div className="flex items-center space-x-3">
        {!isSubmitted ? (
          <button
            onClick={onSubmit}
            disabled={!selectedAlternative}
            className={`penaped-submit-btn ${!selectedAlternative ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {submitButtonText}
          </button>
        ) : (
          <button
            onClick={onFinish}
            className="penaped-submit-btn"
            style={{
              background: 'linear-gradient(135deg, var(--penaped-green), var(--penaped-green-dark))'
            }}
          >
            {finishButtonText}
          </button>
        )}
      </div>
    </div>
  );
}