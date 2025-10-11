import { Baby } from 'lucide-react';
import ModuleCard from '../components/ModuleCard';
import type { StudyModule } from '../types.ts';

interface NeonatologiaModuleProps {
  onSelectCase: (moduleId: number, caseId: number) => void;
  getDifficultyColor: (difficulty: string) => string;
  getSpecialtyColor: (specialty: string) => string;
}

export default function NeonatologiaModule({ 
  onSelectCase, 
  getDifficultyColor, 
  getSpecialtyColor 
}: NeonatologiaModuleProps) {
  const module: StudyModule = {
    id: 10,
    title: "Neonatologia",
    description: "Cuidados com recÃ©m-nascidos e prematuros",
    specialty: "Neonatologia",
    totalDuration: "135 min",
    completedCases: 0,
    totalCases: 5,
    icon: Baby,
    cases: [
      {
        id: 1,
        title: "AdaptaÃ§Ã£o Neonatal",
        description: "Cuidados imediatos ao recÃ©m-nascido",
        duration: "25 min",
        difficulty: "BÃ¡sico",
        completed: false,
        locked: false
      },
      {
        id: 2,
        title: "Prematuridade",
        description: "Manejo do recÃ©m-nascido prematuro",
        duration: "35 min",
        difficulty: "AvanÃ§ado",
        completed: false,
        locked: false
      },
      {
        id: 3,
        title: "SÃ­ndrome do Desconforto RespiratÃ³rio",
        description: "DiagnÃ³stico e tratamento da SDR",
        duration: "30 min",
        difficulty: "AvanÃ§ado",
        completed: false,
        locked: true
      },
      {
        id: 4,
        title: "Hiperbilirrubinemia Neonatal",
        description: "Manejo da icterÃ­cia neonatal",
        duration: "25 min",
        difficulty: "IntermediÃ¡rio",
        completed: false,
        locked: true
      },
      {
        id: 5,
        title: "InfecÃ§Ãµes Neonatais",
        description: "Sepse neonatal precoce e tardia",
        duration: "20 min",
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
