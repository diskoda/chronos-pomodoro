interface QuestionNotFoundProps {
  onBack: () => void;
  message?: string;
  buttonText?: string;
}

export default function QuestionNotFound({ 
  onBack, 
  message = "Questão não encontrada",
  buttonText = "Voltar aos modos de estudo"
}: QuestionNotFoundProps) {
  return (
    <div className="dashboard-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold theme-text-primary mb-4">
            {message}
          </h1>
          <p className="theme-text-secondary mb-6">
            A questão solicitada não foi encontrada ou pode ter sido removida.
          </p>
          <button
            onClick={onBack}
            className="theme-button-primary px-4 py-2 rounded-lg font-medium"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}