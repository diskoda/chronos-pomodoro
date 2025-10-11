import { Shield } from 'lucide-react';
import ModuleCard from '../components/ModuleCard';
import type { StudyModule } from '../types.ts';

interface AcidentesViolenciasModuleProps {
  onSelectCase: (moduleId: number, caseId: number) => void;
  getDifficultyColor: (difficulty: string) => string;
  getSpecialtyColor: (specialty: string) => string;
}

export default function AcidentesViolenciasModule({ 
  onSelectCase, 
  getDifficultyColor, 
  getSpecialtyColor 
}: AcidentesViolenciasModuleProps) {
  const module: StudyModule = {
    id: 6,
    title: "Acidentes e ViolÃªncias",
    description: "PrevenÃ§Ã£o e manejo de acidentes e violÃªncia infantil",
    specialty: "PrevenÃ§Ã£o",
    totalDuration: "100 min",
    completedCases: 0,
    totalCases: 4,
    icon: Shield,
    cases: [
      {
        id: 1,
        title: "PrevenÃ§Ã£o de Acidentes",
        description: "EstratÃ©gias preventivas por faixa etÃ¡ria",
        duration: "25 min",
        difficulty: "BÃ¡sico",
        completed: false,
        locked: false
      },
      {
        id: 2,
        title: "SÃ­ndrome da CrianÃ§a Espancada",
        description: "IdentificaÃ§Ã£o e notificaÃ§Ã£o de maus-tratos",
        duration: "30 min",
        difficulty: "IntermediÃ¡rio",
        completed: false,
        locked: false
      },
      {
        id: 3,
        title: "Abuso Sexual Infantil",
        description: "DiagnÃ³stico e abordagem do abuso sexual",
        duration: "25 min",
        difficulty: "AvanÃ§ado",
        completed: false,
        locked: true
      },
      {
        id: 4,
        title: "NegligÃªncia e Abandono",
        description: "Reconhecimento de negligÃªncia infantil",
        duration: "20 min",
        difficulty: "IntermediÃ¡rio",
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
