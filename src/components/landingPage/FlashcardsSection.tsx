import { CreditCard, RefreshCw, Brain, Zap, BookOpen, Timer, TrendingUp, Star } from 'lucide-react';

export default function FlashcardsSection() {
  const features = [
    {
      icon: RefreshCw,
      title: 'Repetição Espaçada',
      description: 'Sistema inteligente que otimiza a revisão baseado na curva do esquecimento.'
    },
    {
      icon: Brain,
      title: 'Aprendizado Ativo',
      description: 'Método comprovado para melhorar retenção e fixação do conhecimento.'
    },
    {
      icon: Zap,
      title: 'Revisão Rápida',
      description: 'Estude conceitos importantes em poucos minutos por dia.'
    },
    {
      icon: TrendingUp,
      title: 'Progresso Adaptativo',
      description: 'Algoritmo que se adapta ao seu ritmo de aprendizagem individual.'
    }
  ];

  const cardTypes = [
    {
      title: 'Conceitos Básicos',
      description: 'Definições fundamentais de anatomia, fisiologia e patologia',
      count: '2,500+',
      color: 'bg-emerald-100 dark:bg-emerald-900',
      textColor: 'text-emerald-800 dark:text-emerald-200',
      borderColor: 'border-emerald-300 dark:border-emerald-700'
    },
    {
      title: 'Farmacologia',
      description: 'Medicamentos, mecanismos de ação e efeitos adversos',
      count: '1,800+',
      color: 'bg-purple-100 dark:bg-purple-900',
      textColor: 'text-purple-800 dark:text-purple-200',
      borderColor: 'border-purple-300 dark:border-purple-700'
    },
    {
      title: 'Diagnósticos',
      description: 'Critérios diagnósticos e diagnósticos diferenciais',
      count: '1,200+',
      color: 'bg-orange-100 dark:bg-orange-900',
      textColor: 'text-orange-800 dark:text-orange-200',
      borderColor: 'border-orange-300 dark:border-orange-700'
    },
    {
      title: 'Procedimentos',
      description: 'Técnicas e protocolos clínicos essenciais',
      count: '900+',
      color: 'bg-blue-100 dark:bg-blue-900',
      textColor: 'text-blue-800 dark:text-blue-200',
      borderColor: 'border-blue-300 dark:border-blue-700'
    }
  ];

  const studyMethods = [
    {
      icon: Timer,
      title: 'Sessões Curtas',
      description: 'Estude de 5 a 15 minutos por sessão para máxima eficiência.',
      tip: 'Ideal para intervalos entre outras atividades'
    },
    {
      icon: Star,
      title: 'Priorização Inteligente',
      description: 'Cards mais difíceis aparecem com maior frequência.',
      tip: 'Foque no que realmente precisa melhorar'
    },
    {
      icon: BookOpen,
      title: 'Múltiplos Formatos',
      description: 'Texto, imagens, diagramas e até áudio quando necessário.',
      tip: 'Aprenda de forma visual e auditiva'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-violet-900 via-purple-900 to-fuchsia-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-24 right-24 w-40 h-40 bg-violet-500 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute bottom-24 left-24 w-44 h-44 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/4 w-28 h-28 bg-fuchsia-500 rounded-full blur-2xl animate-pulse delay-300"></div>
        <div className="absolute bottom-1/2 left-1/2 w-36 h-36 bg-pink-500 rounded-full blur-3xl animate-pulse delay-1300"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 bg-gradient-to-r from-violet-500 to-fuchsia-600 rounded-full mr-4 animate-bounce">
              <CreditCard className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-violet-200 to-fuchsia-200 bg-clip-text text-transparent">
              Flashcards Inteligentes
            </h2>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Memorize conceitos médicos de forma eficiente com nosso sistema de flashcards 
            baseado em repetição espaçada e algoritmos de aprendizagem adaptativa.
          </p>
        </div>

        {/* Features */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={index}
                  className="group text-center p-6 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-gradient-to-r from-violet-400 to-fuchsia-500 rounded-full group-hover:scale-110 transition-transform duration-300 animate-pulse">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-3 group-hover:text-pink-200 transition-colors duration-300">
                    {feature.title}
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Card Types */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center bg-gradient-to-r from-white to-violet-200 bg-clip-text text-transparent mb-12">
            Categorias de Flashcards
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cardTypes.map((type, index) => (
              <div 
                key={index}
                className={`group p-6 rounded-xl border-2 ${type.borderColor} ${type.color} bg-white/10 backdrop-blur-lg hover:bg-white/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2`}
              >
                <div className="text-center">
                  <div className={`text-2xl font-bold ${type.textColor} mb-2 group-hover:scale-110 transition-transform duration-300`}>
                    {type.count}
                  </div>
                  <h4 className={`text-lg font-semibold ${type.textColor} mb-3 group-hover:text-white transition-colors duration-300`}>
                    {type.title}
                  </h4>
                  <p className={`text-sm ${type.textColor} opacity-80 leading-relaxed group-hover:opacity-100 transition-opacity duration-300`}>
                    {type.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Study Methods */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-12">
            Métodos de Estudo Otimizados
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {studyMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <div 
                  key={index}
                  className="group bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-500 transform hover:-translate-y-2"
                >
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-gradient-to-r from-violet-400 to-fuchsia-500 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-white group-hover:text-pink-200 transition-colors duration-300">
                      {method.title}
                    </h4>
                  </div>
                  <p className="text-gray-300 mb-3 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {method.description}
                  </p>
                  <div className="bg-violet-500/20 backdrop-blur-sm p-3 rounded-lg border border-violet-400/30">
                    <p className="text-sm text-violet-200 font-medium">
                      💡 {method.tip}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Demo */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent mb-8">
            Como Funciona na Prática
          </h3>
          <div className="max-w-md mx-auto">
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/30 group hover:bg-white/25 transition-all duration-500 transform hover:scale-105">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white p-4 text-center">
                <h4 className="font-semibold">Farmacologia - Nível 2</h4>
                <p className="text-violet-200 text-sm">Card 15 de 30</p>
              </div>
              
              {/* Card Content */}
              <div className="p-6 text-center min-h-[200px] flex flex-col justify-center">
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-pink-200 transition-colors duration-300">
                  Qual é o mecanismo de ação da Aspirina?
                </h3>
                <button className="text-violet-300 text-sm hover:text-violet-200 transition-colors duration-300 hover:underline">
                  Clique para revelar a resposta →
                </button>
              </div>
              
              {/* Card Footer */}
              <div className="bg-white/10 p-4 flex justify-center space-x-4">
                <button className="px-4 py-2 bg-red-500/80 hover:bg-red-500 text-white rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105">
                  Difícil
                </button>
                <button className="px-4 py-2 bg-yellow-500/80 hover:bg-yellow-500 text-white rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105">
                  Médio
                </button>
                <button className="px-4 py-2 bg-green-500/80 hover:bg-green-500 text-white rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105">
                  Fácil
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 rounded-2xl p-8 relative overflow-hidden group">
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 animate-pulse opacity-75"></div>
            <div className="absolute inset-0 bg-gradient-to-45 from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-full group-hover:-translate-x-full transition-transform duration-1000"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-4">
                Memorize Mais, Estude Menos
              </h3>
              <p className="text-violet-100 mb-6 max-w-2xl mx-auto">
                Experimente nosso sistema de flashcards inteligentes e veja como 
                a repetição espaçada pode revolucionar seu aprendizado.
              </p>
              <button className="bg-white text-violet-600 hover:bg-gray-100 hover:text-violet-700 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                Começar com Flashcards
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}