import { Brain } from 'lucide-react';
import ModuleCard from '../components/ModuleCard';
import type { StudyModule } from '../types.ts';

interface DesenvolvimentoModuleProps {
  onSelectCase: (moduleId: number, caseId: number) => void;
  getDifficultyColor: (difficulty: string) => string;
  getSpecialtyColor: (specialty: string) => string;
}

export default function DesenvolvimentoModule({ 
  onSelectCase, 
  getDifficultyColor, 
  getSpecialtyColor 
}: DesenvolvimentoModuleProps) {
  const module: StudyModule = {
    id: 4,
    title: "Pediatria do Desenvolvimento e do Comportamento",
    description: "Aspectos neuropsicomotores e comportamentais",
    specialty: "Desenvolvimento",
    totalDuration: "110 min",
    completedCases: 0,
    totalCases: 4,
    icon: Brain,
    cases: [
      {
        id: 1,
        title: "Marcos do Desenvolvimento",
        description: "Avaliação dos marcos neuropsicomotores",
        duration: "30 min",
        difficulty: "Básico",
        completed: false,
        locked: false
      },
      {
        id: 2,
        title: "Transtorno do Espectro Autista",
        description: "Diagnóstico precoce e intervenções no TEA",
        duration: "35 min",
        difficulty: "Intermediário",
        completed: false,
        locked: false
      },
      {
        id: 3,
        title: "TDAH em Crianças",
        description: "Avaliação e manejo do TDAH na infância",
        duration: "25 min",
        difficulty: "Intermediário",
        completed: false,
        locked: true
      },
      {
        id: 4,
        title: "Distúrbios do Sono",
        description: "Transtornos do sono em pediatria",
        duration: "20 min",
        difficulty: "Básico",
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