import { ArrowLeft } from 'lucide-react';

interface PageHeaderWithBackProps {
  title: string;
  subtitle: string;
  onBack: () => void;
  backLabel?: string;
  className?: string;
}

export default function PageHeaderWithBack({ 
  title, 
  subtitle, 
  onBack, 
  backLabel = "Voltar",
  className = ""
}: PageHeaderWithBackProps) {
  return (
    <div className={`flex items-center mb-8 ${className}`}>
      <button
        onClick={onBack}
        className="flex items-center space-x-2 theme-text-secondary hover:theme-text-primary transition-colors mr-6"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>{backLabel}</span>
      </button>
      
      <div>
        <h1 className="text-3xl font-bold theme-text-primary">
          {title}
        </h1>
        <p className="theme-text-secondary mt-2">
          {subtitle}
        </p>
      </div>
    </div>
  );
}