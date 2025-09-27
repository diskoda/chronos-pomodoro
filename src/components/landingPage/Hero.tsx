export default function Hero() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-5xl font-bold text-white mb-6">
        Bem-vindo ao <span className="text-blue-400">PénaPED</span>
      </h1>
      <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
        Aumente sua produtividade com a técnica Pomodoro. 
        Gerencie seu tempo de forma inteligente e alcance seus objetivos.
      </p>
      <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors text-lg">
        Começar Grátis
      </button>
    </div>
  );
}
