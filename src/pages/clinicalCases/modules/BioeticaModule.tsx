import { BookOpen } from 'lucide-react';
import ModuleCard from '../components/ModuleCard';
import type { StudyModule } from '../types.ts';

interface BioeticaModuleProps {
  onSelectCase: (moduleId: number, caseId: number) => void;
  getDifficultyColor: (difficulty: string) => string;
  getSpecialtyColor: (specialty: string) => string;
}

export default function BioeticaModule({ 
  onSelectCase, 
  getDifficultyColor, 
  getSpecialtyColor 
}: BioeticaModuleProps) {
  const module: StudyModule = {
    id: 1,
    title: "Bioética",
    description: "Princípios éticos fundamentais na prática pediátrica",
    specialty: "Bioética",
    totalDuration: "120 min",
    completedCases: 0,
    totalCases: 4,
    icon: BookOpen,
    cases: [
      {
        id: 1,
        title: "Consentimento Informado",
        description: "Processo de consentimento em procedimentos pediátricos",
        duration: "30 min",
        difficulty: "Básico",
        completed: false,
        locked: false
      },
      {
        id: 2,
        title: "Autonomia do Adolescente",
        description: "Limites da autonomia decisória em adolescentes",
        duration: "35 min",
        difficulty: "Intermediário",
        completed: false,
        locked: false
      },
      {
        id: 3,
        title: "Cuidados Paliativos",
        description: "Dilemas éticos em cuidados paliativos pediátricos",
        duration: "40 min",
        difficulty: "Avançado",
        completed: false,
        locked: true
      },
      {
        id: 4,
        title: "Recusa de Tratamento",
        description: "Manejo ético da recusa de tratamento pelos responsáveis",
        duration: "15 min",
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