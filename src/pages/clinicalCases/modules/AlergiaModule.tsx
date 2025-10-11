import { Shield } from 'lucide-react';
import ModuleCard from '../components/ModuleCard';
import type { StudyModule } from '../types.ts';

interface AlergiaModuleProps {
  onSelectCase: (moduleId: number, caseId: number) => void;
  getDifficultyColor: (difficulty: string) => string;
  getSpecialtyColor: (specialty: string) => string;
}

export default function AlergiaModule({ 
  onSelectCase, 
  getDifficultyColor, 
  getSpecialtyColor 
}: AlergiaModuleProps) {
  const module: StudyModule = {
    id: 12,
    title: "Alergia",
    description: "DoenÃ§as alÃ©rgicas em pediatria",
    specialty: "Alergia",
    totalDuration: "95 min",
    completedCases: 0,
    totalCases: 4,
    icon: Shield,
    cases: [
      {
        id: 1,
        title: "Asma BrÃ´nquica",
        description: "DiagnÃ³stico e tratamento da asma infantil",
        duration: "30 min",
        difficulty: "IntermediÃ¡rio",
        completed: false,
        locked: false
      },
      {
        id: 2,
        title: "Rinite AlÃ©rgica",
        description: "Manejo da rinite alÃ©rgica em crianÃ§as",
        duration: "20 min",
        difficulty: "BÃ¡sico",
        completed: false,
        locked: false
      },
      {
        id: 3,
        title: "Dermatite AtÃ³pica",
        description: "Tratamento e prevenÃ§Ã£o da dermatite atÃ³pica",
        duration: "25 min",
        difficulty: "BÃ¡sico",
        completed: false,
        locked: true
      },
      {
        id: 4,
        title: "Alergia Alimentar",
        description: "DiagnÃ³stico e manejo de alergias alimentares",
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
