import CaseCard from './CaseCard';
import type { CaseBase } from './types';

interface CaseGridProps {
  cases: CaseBase[];
  onCaseSelect: (id: number) => void;
  columns?: 1 | 2 | 3;
  variant?: 'basic' | 'clinical' | 'specialty';
  className?: string;
}

export default function CaseGrid({ 
  cases, 
  onCaseSelect, 
  columns = 2,
  variant = 'basic',
  className = ""
}: CaseGridProps) {
  const getGridClasses = (columns: number) => {
    switch (columns) {
      case 1:
        return 'grid-cols-1';
      case 2:
        return 'grid-cols-1 lg:grid-cols-2';
      case 3:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      default:
        return 'grid-cols-1 lg:grid-cols-2';
    }
  };

  return (
    <div className={`grid ${getGridClasses(columns)} gap-6 ${className}`}>
      {cases.map((clinicalCase) => (
        <CaseCard
          key={clinicalCase.id}
          case={clinicalCase}
          onSelect={onCaseSelect}
          variant={variant}
        />
      ))}
    </div>
  );
}