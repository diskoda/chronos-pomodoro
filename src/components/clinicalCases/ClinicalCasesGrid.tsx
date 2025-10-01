import ClinicalCaseCard from './ClinicalCaseCard';

interface ClinicalCase {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  estimatedTime: number;
  specialties: string[];
  objectives: string[];
}

interface ClinicalCasesGridProps {
  cases: ClinicalCase[];
  onCaseSelect: (caseId: string) => void;
}

export default function ClinicalCasesGrid({ cases, onCaseSelect }: ClinicalCasesGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cases.map((clinicalCase) => (
        <ClinicalCaseCard
          key={clinicalCase.id}
          clinicalCase={clinicalCase}
          onSelect={onCaseSelect}
        />
      ))}
    </div>
  );
}