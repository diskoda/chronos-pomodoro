import { Heart } from 'lucide-react';
import ModuleCard from '../components/ModuleCard';
import type { StudyModule } from '../types.ts';

interface CardiologiaModuleProps {
  onSelectCase: (moduleId: number, caseId: number) => void;
  getDifficultyColor: (difficulty: string) => string;
  getSpecialtyColor: (specialty: string) => string;
}

export default function CardiologiaModule({ 
  onSelectCase, 
  getDifficultyColor, 
  getSpecialtyColor 
}: CardiologiaModuleProps) {
  const module: StudyModule = {
    id: 14,
    title: "Cardiologia Pediátrica",
    description: "Doenças cardiovasculares em crianças e adolescentes",
    specialty: "Cardiologia",
    totalDuration: "125 min",
    completedCases: 0,
    totalCases: 4,
    icon: Heart,
    cases: [
      {
        id: 1,
        title: "Sopro Cardíaco Inocente",
        description: "Diferenciação entre sopros inocentes e patológicos",
        duration: "30 min",
        difficulty: "Básico",
        completed: false,
        locked: false
      },
      {
        id: 2,
        title: "Cardiopatia Congênita Acianótica",
        description: "Comunicação interventricular e outras cardiopatias",
        duration: "35 min",
        difficulty: "Intermediário",
        completed: false,
        locked: false
      },
      {
        id: 3,
        title: "Cardiopatia Congênita Cianótica",
        description: "Tetralogia de Fallot e outras cardiopatias cianóticas",
        duration: "40 min",
        difficulty: "Avançado",
        completed: false,
        locked: true
      },
      {
        id: 4,
        title: "Insuficiência Cardíaca",
        description: "Diagnóstico e tratamento da IC em pediatria",
        duration: "20 min",
        difficulty: "Avançado",
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