import AlternativeButton from './AlternativeButton';

interface QuestionAlternativesProps {
  alternatives: string[];
  selectedAlternative: string | null;
  onSelect: (alternative: string) => void;
  isSubmitted: boolean;
  className?: string;
}

export default function QuestionAlternatives({ 
  alternatives, 
  selectedAlternative, 
  onSelect, 
  isSubmitted,
  className = ""
}: QuestionAlternativesProps) {
  return (
    <div className={`theme-card rounded-lg p-6 ${className}`}>
      <h2 className="text-lg font-semibold theme-text-primary mb-4">
        Alternativas
      </h2>
      <div className="space-y-3">
        {alternatives.map((alternative, index) => (
          <AlternativeButton
            key={index}
            alternative={alternative}
            isSelected={selectedAlternative === alternative}
            isDisabled={isSubmitted}
            onSelect={() => onSelect(alternative)}
          />
        ))}
      </div>
    </div>
  );
}