interface DifficultyBadgeProps {
  difficulty: string;
}

export default function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'basic':
        return 'bg-green-500/20 text-green-400 border-green-400/30';
      case 'intermediate':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30';
      case 'advanced':
        return 'bg-red-500/20 text-red-400 border-red-400/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-400/30';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'basic':
        return '🟢';
      case 'intermediate':
        return '🟡';
      case 'advanced':
        return '🔴';
      default:
        return '⚪';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'basic':
        return 'Básico';
      case 'intermediate':
        return 'Intermediário';
      case 'advanced':
        return 'Avançado';
      default:
        return difficulty;
    }
  };

  return (
    <div className={`px-2 py-1 rounded-lg text-xs border ${getDifficultyColor(difficulty)}`}>
      {getDifficultyIcon(difficulty)} {getDifficultyText(difficulty)}
    </div>
  );
}