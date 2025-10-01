import { HelpCircle, BarChart3, Clock, Award, BookmarkCheck, TrendingUp, Search } from 'lucide-react';

export default function QuestionBankSection() {
  const features = [
    {
      icon: Search,
      title: 'Busca Avançada',
      description: 'Filtre questões por especialidade, dificuldade e tema específico.'
    },
    {
      icon: BarChart3,
      title: 'Análise de Performance',
      description: 'Acompanhe seu desempenho com estatísticas detalhadas.'
    },
    {
      icon: Clock,
      title: 'Simulados Cronometrados',
      description: 'Pratique com tempo limitado para simular provas reais.'
    },
    {
      icon: BookmarkCheck,
      title: 'Questões Comentadas',
      description: 'Explicações detalhadas para cada alternativa e conceito.'
    }
  ];

  const stats = [
    { number: '5000+', label: 'Questões Disponíveis' },
    { number: '50+', label: 'Especialidades Médicas' },
    { number: '15+', label: 'Bancas de Residência' },
    { number: '95%', label: 'Taxa de Aprovação' }
  ];

  const questionTypes = [
    {
      type: 'Múltipla Escolha',
      description: 'Questões tradicionais com 5 alternativas',
      icon: HelpCircle,
      color: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
    },
    {
      type: 'Casos Clínicos',
      description: 'Questões baseadas em cenários práticos',
      icon: Award,
      color: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
    },
    {
      type: 'Simulados',
      description: 'Provas completas de bancas anteriores',
      icon: TrendingUp,
      color: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800'
    }
  ];

  const examBoards = [
    'UNIFESP', 'USP', 'UERJ', 'UFRJ', 'PUC-SP', 'SUS-SP',
    'Einstein', 'Sírio-Libanês', 'AMRIGS', 'IAMSPE'
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-25">
        <div className="absolute top-20 left-20 w-38 h-38 bg-blue-500 rounded-full blur-3xl animate-pulse delay-400"></div>
        <div className="absolute bottom-20 right-20 w-42 h-42 bg-indigo-500 rounded-full blur-3xl animate-pulse delay-900"></div>
        <div className="absolute top-2/3 left-1/3 w-30 h-30 bg-purple-500 rounded-full blur-2xl animate-pulse delay-600"></div>
        <div className="absolute bottom-1/4 right-1/3 w-34 h-34 bg-cyan-500 rounded-full blur-3xl animate-pulse delay-1100"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mr-4 animate-pulse">
              <HelpCircle className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-indigo-200 bg-clip-text text-transparent">
              Banco de Questões
            </h2>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Acesse milhares de questões de residência médica organizadas por especialidade, 
            com análises de performance e comentários detalhados para maximizar seu aprendizado.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 group">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-300 font-medium group-hover:text-gray-200 transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-12">
            Recursos Avançados
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={index}
                  className="group text-center p-6 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full group-hover:scale-110 transition-transform duration-300 animate-pulse">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-3 group-hover:text-cyan-200 transition-colors duration-300">
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

        {/* Question Types */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent mb-12">
            Tipos de Questões
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {questionTypes.map((type, index) => {
              const IconComponent = type.icon;
              return (
                <div 
                  key={index}
                  className={`group p-6 rounded-xl border-2 ${type.color} bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-500 transform hover:-translate-y-2`}
                >
                  <div className="flex items-center mb-4">
                    <IconComponent className="h-8 w-8 text-white mr-3 group-hover:scale-110 transition-transform duration-300" />
                    <h4 className="text-xl font-semibold text-white group-hover:text-cyan-200 transition-colors duration-300">
                      {type.type}
                    </h4>
                  </div>
                  <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {type.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Exam Boards */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-8">
            Principais Bancas de Residência
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {examBoards.map((board, index) => (
              <span 
                key={index}
                className="px-4 py-2 bg-blue-500/20 border border-blue-400/30 text-blue-200 rounded-full text-sm font-medium hover:bg-blue-500/30 hover:border-blue-400/50 transition-all duration-300 cursor-pointer transform hover:scale-105"
              >
                {board}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-8 relative overflow-hidden group">
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 animate-pulse opacity-75"></div>
            <div className="absolute inset-0 bg-gradient-to-45 from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-full group-hover:-translate-x-full transition-transform duration-1000"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-4">
                Comece a Praticar Agora
              </h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Tenha acesso ilimitado a milhares de questões comentadas, 
                simulados e análises de performance personalizadas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-blue-600 hover:bg-gray-100 hover:text-blue-700 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                  Resolver Questões
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                  Fazer Simulado
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}