export default function Hero() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-5xl font-bold theme-text-primary mb-6">
        Bem-vindo ao <span className="text-blue-400 dark:text-blue-300">PénaPED</span>
      </h1>
      <p className="text-xl theme-text-secondary mb-8 max-w-2xl mx-auto">
        Plataforma completa para estudos em Pediatria. 
        Desenvolva seu conhecimento médico com casos clínicos, questões práticas e materiais especializados.
      </p>
      <button className="theme-button-primary px-8 py-3 rounded-lg font-medium text-lg">
        Começar Grátis
      </button>
    </div>
  );
}
