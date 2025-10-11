import { School } from 'lucide-react';
import ModuleCard from '../components/ModuleCard';
import type { StudyModule } from '../types.ts';

interface SaudeEscolarModuleProps {
  onSelectCase: (moduleId: number, caseId: number) => void;
  getDifficultyColor: (difficulty: string) => string;
  getSpecialtyColor: (specialty: string) => string;
}

export default function SaudeEscolarModule({ 
  onSelectCase, 
  getDifficultyColor, 
  getSpecialtyColor 
}: SaudeEscolarModuleProps) {
  const module: StudyModule = {
    id: 5,
    title: "SaÃºde Escolar",
    description: "PromoÃ§Ã£o da saÃºde no ambiente escolar",
    specialty: "SaÃºde Escolar",
    totalDuration: "85 min",
    completedCases: 0,
    totalCases: 3,
    icon: School,
    cases: [
      {
        id: 1,
        title: "Programa SaÃºde na Escola",
        description: "ImplementaÃ§Ã£o de aÃ§Ãµes de saÃºde nas escolas",
        duration: "30 min",
        difficulty: "BÃ¡sico",
        completed: false,
        locked: false
      },
      {
        id: 2,
        title: "Dificuldades de Aprendizagem",
        description: "IdentificaÃ§Ã£o e abordagem das dificuldades escolares",
        duration: "35 min",
        difficulty: "IntermediÃ¡rio",
        completed: false,
        locked: false
      },
      {
        id: 3,
        title: "Bullying e SaÃºde Mental",
        description: "PrevenÃ§Ã£o e intervenÃ§Ã£o em casos de bullying",
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
