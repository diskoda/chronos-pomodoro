interface TopicTagsProps {
  topics: string[];
  variant?: 'blue' | 'purple' | 'green' | 'orange';
  size?: 'sm' | 'md';
  className?: string;
}

export default function TopicTags({ 
  topics, 
  variant = 'blue', 
  size = 'sm',
  className = ""
}: TopicTagsProps) {
  const getVariantClasses = (variant: string) => {
    switch (variant) {
      case 'blue':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
      case 'purple':
        return 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200';
      case 'green':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'orange':
        return 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200';
      default:
        return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
    }
  };

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'sm':
        return 'px-2 py-1 text-xs';
      case 'md':
        return 'px-3 py-1.5 text-sm';
      default:
        return 'px-2 py-1 text-xs';
    }
  };

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {topics.map((topic, index) => (
        <span
          key={index}
          className={`rounded-full font-medium ${getVariantClasses(variant)} ${getSizeClasses(size)}`}
        >
          {topic}
        </span>
      ))}
    </div>
  );
}