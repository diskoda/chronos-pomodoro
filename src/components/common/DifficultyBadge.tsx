interface DifficultyBadgeProps {
  difficulty: 'Fácil' | 'Médio' | 'Difícil' | 'Básico' | 'Intermediário' | 'Avançado';
  className?: string;
  size?: 'sm' | 'md';
}

export default function DifficultyBadge({ difficulty, className = "", size = 'sm' }: DifficultyBadgeProps) {
  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Fácil':
      case 'Básico':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Médio':
      case 'Intermediário':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Difícil':
      case 'Avançado':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'sm':
        return 'text-xs px-2 py-1';
      case 'md':
        return 'text-sm px-3 py-1.5';
      default:
        return 'text-xs px-2 py-1';
    }
  };

  return (
    <span className={`rounded-full font-medium ${getDifficultyColor(difficulty)} ${getSizeClasses(size)} ${className}`}>
      {difficulty}
    </span>
  );
}