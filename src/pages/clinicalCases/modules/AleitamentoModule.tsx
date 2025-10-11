import { Heart } from 'lucide-react';
import ModuleCard from '../components/ModuleCard';
import type { StudyModule } from '../types.ts';

interface AleitamentoModuleProps {
  onSelectCase: (moduleId: number, caseId: number) => void;
  getDifficultyColor: (difficulty: string) => string;
  getSpecialtyColor: (specialty: string) => string;
}

export default function AleitamentoModule({ 
  onSelectCase, 
  getDifficultyColor, 
  getSpecialtyColor 
}: AleitamentoModuleProps) {
  const module: StudyModule = {
    id: 9,
    title: "Aleitamento Materno",
    description: "PromoÃ§Ã£o e manejo do aleitamento materno",
    specialty: "NutriÃ§Ã£o",
    totalDuration: "80 min",
    completedCases: 0,
    totalCases: 3,
    icon: Heart,
    cases: [
      {
        id: 1,
        title: "TÃ©cnicas de AmamentaÃ§Ã£o",
        description: "Posicionamento e pega adequados",
        duration: "30 min",
        difficulty: "BÃ¡sico",
        completed: false,
        locked: false
      },
      {
        id: 2,
        title: "Dificuldades na AmamentaÃ§Ã£o",
        description: "Manejo de complicaÃ§Ãµes e dificuldades",
        duration: "25 min",
        difficulty: "IntermediÃ¡rio",
        completed: false,
        locked: false
      },
      {
        id: 3,
        title: "Banco de Leite Humano",
        description: "Coleta, processamento e distribuiÃ§Ã£o do leite humano",
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
