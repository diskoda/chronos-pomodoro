import { Users } from 'lucide-react';
import ModuleCard from '../components/ModuleCard';
import type { StudyModule } from '../types.ts';

interface AdolescenciaModuleProps {
  onSelectCase: (moduleId: number, caseId: number) => void;
  getDifficultyColor: (difficulty: string) => string;
  getSpecialtyColor: (specialty: string) => string;
}

export default function AdolescenciaModule({ 
  onSelectCase, 
  getDifficultyColor, 
  getSpecialtyColor 
}: AdolescenciaModuleProps) {
  const module: StudyModule = {
    id: 11,
    title: "AdolescÃªncia",
    description: "AtenÃ§Ã£o integral Ã  saÃºde do adolescente",
    specialty: "AdolescÃªncia",
    totalDuration: "115 min",
    completedCases: 0,
    totalCases: 4,
    icon: Users,
    cases: [
      {
        id: 1,
        title: "Desenvolvimento Puberal",
        description: "AvaliaÃ§Ã£o do desenvolvimento na adolescÃªncia",
        duration: "30 min",
        difficulty: "BÃ¡sico",
        completed: false,
        locked: false
      },
      {
        id: 2,
        title: "SaÃºde Sexual e Reprodutiva",
        description: "OrientaÃ§Ãµes sobre sexualidade e contracepÃ§Ã£o",
        duration: "35 min",
        difficulty: "IntermediÃ¡rio",
        completed: false,
        locked: false
      },
      {
        id: 3,
        title: "Transtornos Alimentares",
        description: "Anorexia, bulimia e outros transtornos alimentares",
        duration: "25 min",
        difficulty: "IntermediÃ¡rio",
        completed: false,
        locked: true
      },
      {
        id: 4,
        title: "SaÃºde Mental do Adolescente",
        description: "DepressÃ£o, ansiedade e ideaÃ§Ã£o suicida",
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
