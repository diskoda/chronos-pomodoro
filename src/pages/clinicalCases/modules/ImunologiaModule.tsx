import { Microscope } from 'lucide-react';
import ModuleCard from '../components/ModuleCard';
import type { StudyModule } from '../types.ts';

interface ImunologiaModuleProps {
  onSelectCase: (moduleId: number, caseId: number) => void;
  getDifficultyColor: (difficulty: string) => string;
  getSpecialtyColor: (specialty: string) => string;
}

export default function ImunologiaModule({ 
  onSelectCase, 
  getDifficultyColor, 
  getSpecialtyColor 
}: ImunologiaModuleProps) {
  const module: StudyModule = {
    id: 13,
    title: "Imunologia ClÃ­nica",
    description: "ImunizaÃ§Ã£o e imunodeficiÃªncias em pediatria",
    specialty: "Imunologia",
    totalDuration: "110 min",
    completedCases: 0,
    totalCases: 4,
    icon: Microscope,
    cases: [
      {
        id: 1,
        title: "CalendÃ¡rio Vacinal",
        description: "Esquema bÃ¡sico e especial de vacinaÃ§Ã£o",
        duration: "25 min",
        difficulty: "BÃ¡sico",
        completed: false,
        locked: false
      },
      {
        id: 2,
        title: "Eventos Adversos Ã  VacinaÃ§Ã£o",
        description: "IdentificaÃ§Ã£o e manejo de reaÃ§Ãµes vacinais",
        duration: "20 min",
        difficulty: "BÃ¡sico",
        completed: false,
        locked: false
      },
      {
        id: 3,
        title: "ImunodeficiÃªncias PrimÃ¡rias",
        description: "DiagnÃ³stico de imunodeficiÃªncias congÃªnitas",
        duration: "35 min",
        difficulty: "AvanÃ§ado",
        completed: false,
        locked: true
      },
      {
        id: 4,
        title: "ImunodeficiÃªncias SecundÃ¡rias",
        description: "Manejo de pacientes imunocomprometidos",
        duration: "30 min",
        difficulty: "AvanÃ§ado",
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
