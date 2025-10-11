import { Heart } from 'lucide-react';
import ModuleCard from '../components/ModuleCard';
import type { StudyModule } from '../types.ts';

interface FundamentosModuleProps {
  onSelectCase: (moduleId: number, caseId: number) => void;
  getDifficultyColor: (difficulty: string) => string;
  getSpecialtyColor: (specialty: string) => string;
}

export default function FundamentosModule({ 
  onSelectCase, 
  getDifficultyColor, 
  getSpecialtyColor 
}: FundamentosModuleProps) {
  const module: StudyModule = {
    id: 2,
    title: "Fundamentos da Atenção à Saúde da Criança e do Adolescente",
    description: "Bases da assistência integral em pediatria",
    specialty: "Atenção Básica",
    totalDuration: "95 min",
    completedCases: 0,
    totalCases: 3,
    icon: Heart,
    cases: [
      {
        id: 1,
        title: "Puericultura Integral",
        description: "Acompanhamento do crescimento e desenvolvimento",
        duration: "40 min",
        difficulty: "Básico",
        completed: false,
        locked: false
      },
      {
        id: 2,
        title: "Humanização do Cuidado",
        description: "Práticas humanizadas no atendimento pediátrico",
        duration: "30 min",
        difficulty: "Básico",
        completed: false,
        locked: false
      },
      {
        id: 3,
        title: "Família e Comunidade",
        description: "Abordagem familiar e comunitária em pediatria",
        duration: "25 min",
        difficulty: "Intermediário",
        completed: false,
        locked: true
      }
    ]
  };

  return (
    <ModuleCard
      module={module}
      onSelectCase={onSelectCase}
      getDifficultyColor={getDifficultyColor}
      getSpecialtyColor={getSpecialtyColor}
    />
  );
}