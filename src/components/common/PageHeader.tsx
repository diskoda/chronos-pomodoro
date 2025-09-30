interface PageHeaderProps {
  title: string;
  subtitle: string;
  align?: 'center' | 'left' | 'right';
  className?: string;
}

export default function PageHeader({ 
  title, 
  subtitle, 
  align = 'center',
  className = "" 
}: PageHeaderProps) {
  const alignmentClass = {
    center: 'text-center',
    left: 'text-left',
    right: 'text-right'
  }[align];

  return (
    <div className={`mb-12 ${alignmentClass} ${className}`}>
      <h1 className="text-4xl font-bold theme-text-primary mb-4">
        {title}
      </h1>
      <p className="text-lg theme-text-secondary max-w-2xl mx-auto">
        {subtitle}
      </p>
    </div>
  );
}