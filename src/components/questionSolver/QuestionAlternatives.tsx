interface QuestionAlternativesProps {
  alternatives: string[];
  selectedAlternative: string | null;
  onSelect: (alternative: string) => void;
  isSubmitted: boolean;
  correctAnswer?: string;
  className?: string;
}

export default function QuestionAlternatives({ 
  alternatives, 
  selectedAlternative, 
  onSelect, 
  isSubmitted,
  correctAnswer,
  className = ""
}: QuestionAlternativesProps) {
  const getAlternativeLetter = (index: number) => {
    return String.fromCharCode(65 + index); // A, B, C, D...
  };

  const getAlternativeClass = (alternative: string, isSelected: boolean) => {
    let baseClass = 'penaped-alternative';
    
    if (isSelected) {
      baseClass += ' selected';
    }
    
    if (isSubmitted && correctAnswer) {
      if (alternative === correctAnswer) {
        baseClass += ' correct';
      } else if (isSelected && alternative !== correctAnswer) {
        baseClass += ' incorrect';
      }
    }
    
    return baseClass;
  };

  return (
    <div className={`penaped-alternatives-container ${className}`}>
      {alternatives.map((alternative, index) => (
        <div
          key={index}
          className={getAlternativeClass(alternative, selectedAlternative === alternative)}
          onClick={() => !isSubmitted && onSelect(alternative)}
          style={{ cursor: isSubmitted ? 'default' : 'pointer' }}
        >
          <div className="penaped-alternative-letter">
            {getAlternativeLetter(index)}
          </div>
          <div className="penaped-alternative-text">
            {alternative}
          </div>
        </div>
      ))}
    </div>
  );
}