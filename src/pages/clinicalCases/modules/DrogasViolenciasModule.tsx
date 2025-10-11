import { UserX } from 'lucide-react';
import ModuleCard from '../components/ModuleCard';
import type { StudyModule } from '../types.ts';

interface DrogasViolenciasModuleProps {
  onSelectCase: (moduleId: number, caseId: number) => void;
  getDifficultyColor: (difficulty: string) => string;
  getSpecialtyColor: (specialty: string) => string;
}

export default function DrogasViolenciasModule({ 
  onSelectCase, 
  getDifficultyColor, 
  getSpecialtyColor 
}: DrogasViolenciasModuleProps) {
  const module: StudyModule = {
    id: 8,
    title: "Drogas e ViolÃªncias",
    description: "Uso de substÃ¢ncias e violÃªncia na adolescÃªncia",
    specialty: "AdolescÃªncia",
    totalDuration: "105 min",
    completedCases: 0,
    totalCases: 4,
    icon: UserX,
    cases: [
      {
        id: 1,
        title: "Uso de Ãlcool na AdolescÃªncia",
        description: "IdentificaÃ§Ã£o e abordagem do uso de Ã¡lcool",
        duration: "25 min",
        difficulty: "IntermediÃ¡rio",
        completed: false,
        locked: false
      },
      {
        id: 2,
        title: "Drogas IlÃ­citas",
        description: "Manejo do uso de drogas na adolescÃªncia",
        duration: "30 min",
        difficulty: "IntermediÃ¡rio",
        completed: false,
        locked: false
      },
      {
        id: 3,
        title: "ViolÃªncia DomÃ©stica",
        description: "Adolescentes vÃ­timas de violÃªncia familiar",
        duration: "25 min",
        difficulty: "AvanÃ§ado",
        completed: false,
        locked: true
      },
      {
        id: 4,
        title: "PrevenÃ§Ã£o e ReduÃ§Ã£o de Danos",
        description: "EstratÃ©gias preventivas e de reduÃ§Ã£o de danos",
        duration: "25 min",
        difficulty: "BÃ¡sico",
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
