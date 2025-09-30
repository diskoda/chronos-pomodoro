import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  onClick: () => void;
  label?: string;
  className?: string;
}

export default function BackButton({ 
  onClick, 
  label = "Voltar", 
  className = "" 
}: BackButtonProps) {
  return (
    <div className={`mb-6 ${className}`}>
      <button
        onClick={onClick}
        className="flex items-center space-x-2 theme-text-secondary hover:theme-text-primary transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>{label}</span>
      </button>
    </div>
  );
}