import { SmartTextProcessor } from '../common/SmartTextProcessor';

interface AlternativeButtonProps {
  alternative: string;
  isSelected: boolean;
  isDisabled: boolean;
  onSelect: () => void;
}

export default function AlternativeButton({ 
  alternative, 
  isSelected, 
  isDisabled, 
  onSelect 
}: AlternativeButtonProps) {
  return (
    <button
      onClick={onSelect}
      disabled={isDisabled}
      className={`w-full text-left p-4 rounded-lg border transition-colors ${
        isSelected
          ? 'border-blue-500 bg-blue-100 dark:bg-blue-900/30 dark:border-blue-400'
          : 'theme-border hover:theme-bg-secondary'
      } ${isDisabled ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}`}
    >
      <span className="theme-text-primary font-medium">
        <SmartTextProcessor theme="medical" variant="hover">
          {alternative}
        </SmartTextProcessor>
      </span>
    </button>
  );
}