interface StatusBadgeProps {
  isActive: boolean;
  activeLabel?: string;
  inactiveLabel?: string;
  variant?: 'success' | 'warning' | 'info' | 'gray';
  className?: string;
}

export default function StatusBadge({ 
  isActive, 
  activeLabel = "Disponível", 
  inactiveLabel = "Em breve",
  variant = 'success',
  className = ""
}: StatusBadgeProps) {
  const getVariantClasses = (isActive: boolean, variant: string) => {
    if (isActive) {
      switch (variant) {
        case 'success':
          return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
        case 'warning':
          return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
        case 'info':
          return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
        default:
          return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      }
    } else {
      return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  return (
    <div className={`flex justify-center ${className}`}>
      <span className={`px-3 py-1 text-xs font-medium rounded-full ${getVariantClasses(isActive, variant)}`}>
        {isActive ? activeLabel : inactiveLabel}
      </span>
    </div>
  );
}