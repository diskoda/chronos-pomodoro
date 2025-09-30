import SubmissionFeedback from './SubmissionFeedback';

interface QuestionActionsProps {
  isSubmitted: boolean;
  selectedAlternative: string | null;
  onSubmit: () => void;
  onFinish: () => void;
  submitButtonText?: string;
  finishButtonText?: string;
  feedbackMessage?: string;
  className?: string;
}

export default function QuestionActions({ 
  isSubmitted, 
  selectedAlternative, 
  onSubmit, 
  onFinish,
  submitButtonText = "Enviar Resposta",
  finishButtonText = "Finalizar",
  feedbackMessage = "Resposta enviada!",
  className = ""
}: QuestionActionsProps) {
  return (
    <div className={`flex justify-between items-center ${className}`}>
      <div className="flex items-center space-x-4">
        <SubmissionFeedback 
          isVisible={isSubmitted} 
          message={feedbackMessage}
          type="success"
        />
      </div>
      
      <div className="space-x-3">
        {!isSubmitted ? (
          <button
            onClick={onSubmit}
            disabled={!selectedAlternative}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              selectedAlternative
                ? 'theme-button-primary'
                : 'bg-gray-400 text-gray-600 cursor-not-allowed dark:bg-gray-600 dark:text-gray-300'
            }`}
          >
            {submitButtonText}
          </button>
        ) : (
          <button
            onClick={onFinish}
            className="theme-button-primary px-6 py-2 rounded-lg font-medium"
          >
            {finishButtonText}
          </button>
        )}
      </div>
    </div>
  );
}