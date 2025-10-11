import ModuleCard from './ModuleCard';
import type { StudyModule } from '../types.ts';

interface ModulesGridProps {
  modules: StudyModule[];
  onSelectCase: (moduleId: number, caseId: number) => void;
  getDifficultyColor: (difficulty: string) => string;
  getSpecialtyColor: (specialty: string) => string;
}

export default function ModulesGrid({ 
  modules, 
  onSelectCase, 
  getDifficultyColor, 
  getSpecialtyColor 
}: ModulesGridProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {modules.map((module) => (
        <ModuleCard
          key={module.id}
          module={module}
          onSelectCase={onSelectCase}
          getDifficultyColor={getDifficultyColor}
          getSpecialtyColor={getSpecialtyColor}
        />
      ))}
    </div>
  );
}