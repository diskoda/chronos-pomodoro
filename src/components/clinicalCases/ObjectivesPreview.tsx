interface ObjectivesPreviewProps {
  objectives: string[];
  maxVisible?: number;
}

export default function ObjectivesPreview({ objectives, maxVisible = 2 }: ObjectivesPreviewProps) {
  const visibleObjectives = objectives.slice(0, maxVisible);
  const remainingCount = objectives.length - maxVisible;

  return (
    <div className="mb-6">
      <h4 className="text-sm font-semibold text-gray-300 mb-2">Objetivos de Aprendizagem:</h4>
      <ul className="space-y-1">
        {visibleObjectives.map((objective, index) => (
          <li key={index} className="text-xs text-gray-400 flex items-start space-x-2">
            <span className="w-1 h-1 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
            <span>{objective}</span>
          </li>
        ))}
        {remainingCount > 0 && (
          <li className="text-xs text-gray-500">
            +{remainingCount} objetivos adicionais
          </li>
        )}
      </ul>
    </div>
  );
}