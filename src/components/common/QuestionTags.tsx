interface QuestionTagsProps {
  tags: string[];
  className?: string;
  maxTags?: number;
}

export default function QuestionTags({ tags, className = "", maxTags }: QuestionTagsProps) {
  const displayTags = maxTags ? tags.slice(0, maxTags) : tags;
  const hasMore = maxTags && tags.length > maxTags;

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {displayTags.map((tag, index) => (
        <span
          key={index}
          className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-2 py-1 rounded font-medium"
        >
          {tag}
        </span>
      ))}
      {hasMore && (
        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
          +{tags.length - maxTags!} mais
        </span>
      )}
    </div>
  );
}