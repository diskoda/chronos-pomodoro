// ==========================================
// CLEAN TEXT CONTENT PROCESSOR
// ==========================================

interface TextContentProps {
  content: string;
  className?: string;
}

export default function TextContent({ content, className = "" }: TextContentProps) {
  // Process bold text with neural styling
  const processTextWithBold = (text: string) => {
    if (!text.includes('**')) return text;
    
    const parts = text.split(/(\*\*[^*]+\*\*)/);
    return parts.map((part, partIndex) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={partIndex} className="text-orange-300 font-semibold bg-gradient-to-r from-orange-300 to-teal-300 bg-clip-text text-transparent">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  const processedParagraphs = content.split('\n').map((paragraph, index) => {
    // Skip empty paragraphs
    if (!paragraph.trim()) return null;

    // Enhanced titles with neural styling
    if (paragraph.trim().startsWith('**') && paragraph.trim().endsWith('**') && !paragraph.includes(':')) {
      const cleanTitle = paragraph.replace(/^\*\*/, '').replace(/\*\*$/, '').trim();
      return (
        <div key={index} className="relative mb-3 mt-4 first:mt-0">
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse"></div>
            <h4 className="text-teal-300 font-bold text-sm bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">
              {processTextWithBold(cleanTitle)}
            </h4>
          </div>
          <div className="ml-3.5 h-px bg-gradient-to-r from-teal-500/30 to-transparent mt-1"></div>
        </div>
      );
    }
    
    // Enhanced list items with neural bullets
    if (paragraph.trim().match(/^[•\-\*→]\s/) || paragraph.trim().match(/^\d+\.\s/)) {
      const content = paragraph.trim().replace(/^[•\-\*→]\s/, '').replace(/^\d+\.\s/, '');
      return (
        <div key={index} className="flex items-start space-x-3 text-sm relative">
          <div className="mt-1.5 relative">
            <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-teal-400 rounded-full relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-teal-400 rounded-full animate-pulse opacity-50"></div>
            </div>
          </div>
          <span className="text-slate-200 leading-relaxed">{processTextWithBold(content)}</span>
        </div>
      );
    }
    
    // Enhanced paragraphs
    return (
      <div key={index} className="relative">
        <p className="text-slate-200 leading-relaxed text-sm relative z-10">
          {processTextWithBold(paragraph)}
        </p>
      </div>
    );
  }).filter(Boolean);

  return (
    <div className={`text-slate-200 leading-relaxed text-sm space-y-3 ${className}`}>
      <div className="absolute -left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500/30 via-teal-500/30 to-purple-500/30 rounded-full"></div>
      <div className="pl-2">
        {processedParagraphs}
      </div>
    </div>
  );
}