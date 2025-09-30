import { ArrowLeft } from 'lucide-react';

interface QuestionSolverHeaderProps {
  onBack: () => void;
  backButtonText?: string;
  className?: string;
}

export default function QuestionSolverHeader({ 
  onBack, 
  backButtonText = "Voltar",
  className = ""
}: QuestionSolverHeaderProps) {
  return (
    <div className={`flex items-center justify-between mb-6 ${className}`}>
      <button
        onClick={onBack}
        className="flex items-center space-x-2 theme-text-secondary hover:theme-text-primary transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>{backButtonText}</span>
      </button>
    </div>
  );
}