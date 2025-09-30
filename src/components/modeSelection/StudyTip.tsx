interface StudyTipProps {
  title?: string;
  content?: string;
  className?: string;
}

export default function StudyTip({ 
  title = "💡 Dica de Estudo",
  content = "Comece com o Banco de Questões para avaliar seu conhecimento atual. Em breve, novos modos de estudo estarão disponíveis para uma experiência de aprendizado ainda mais completa!",
  className = ""
}: StudyTipProps) {
  return (
    <div className={`mt-12 text-center ${className}`}>
      <div className="theme-card rounded-lg p-6 max-w-2xl mx-auto">
        <h3 className="text-lg font-semibold theme-text-primary mb-2">
          {title}
        </h3>
        <p 
          className="theme-text-secondary"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
}