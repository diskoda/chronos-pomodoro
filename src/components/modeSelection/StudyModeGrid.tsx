import StudyModeCard from './StudyModeCard';
import type { StudyModeOption } from './types';

interface StudyModeGridProps {
  modes: StudyModeOption[];
  onSelect: (mode: StudyModeOption) => void;
  className?: string;
}

export default function StudyModeGrid({ modes, onSelect, className = "" }: StudyModeGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
      {modes.map((mode) => (
        <StudyModeCard
          key={mode.id}
          mode={mode}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}