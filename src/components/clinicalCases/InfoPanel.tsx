import type { InfoSection } from './types';

interface InfoPanelProps {
  title: string;
  sections: InfoSection[];
  icon?: string;
  className?: string;
}

export default function InfoPanel({ 
  title, 
  sections, 
  icon = "💡",
  className = ""
}: InfoPanelProps) {
  return (
    <div className={`mt-8 theme-card rounded-lg p-6 ${className}`}>
      <h3 className="text-lg font-semibold theme-text-primary mb-4">
        {icon} {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm theme-text-secondary">
        {sections.map((section, index) => (
          <div key={index}>
            <h4 className="font-medium theme-text-primary mb-2">{section.title}</h4>
            <p>{section.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}