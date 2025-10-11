import { AlertTriangle } from 'lucide-react';
import ModuleCard from '../components/ModuleCard';
import type { StudyModule } from '../types.ts';

interface ToxicologiaModuleProps {
  onSelectCase: (moduleId: number, caseId: number) => void;
  getDifficultyColor: (difficulty: string) => string;
  getSpecialtyColor: (specialty: string) => string;
}

export default function ToxicologiaModule({ 
  onSelectCase, 
  getDifficultyColor, 
  getSpecialtyColor 
}: ToxicologiaModuleProps) {
  const module: StudyModule = {
    id: 7,
    title: "Toxicologia e SaÃºde",
    description: "IntoxicaÃ§Ãµes e exposiÃ§Ãµes tÃ³xicas em pediatria",
    specialty: "Toxicologia",
    totalDuration: "90 min",
    completedCases: 0,
    totalCases: 3,
    icon: AlertTriangle,
    cases: [
      {
        id: 1,
        title: "IntoxicaÃ§Ã£o Medicamentosa",
        description: "Manejo de intoxicaÃ§Ãµes por medicamentos",
        duration: "35 min",
        difficulty: "IntermediÃ¡rio",
        completed: false,
        locked: false
      },
      {
        id: 2,
        title: "IntoxicaÃ§Ã£o por Produtos DomÃ©sticos",
        description: "ExposiÃ§Ã£o acidental a produtos de limpeza",
        duration: "30 min",
        difficulty: "BÃ¡sico",
        completed: false,
        locked: false
      },
      {
        id: 3,
        title: "ExposiÃ§Ã£o Ambiental",
        description: "IntoxicaÃ§Ã£o por agrotÃ³xicos e metais pesados",
        duration: "25 min",
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
