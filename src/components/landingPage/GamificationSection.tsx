import { Trophy, Star, Target, Zap, GamepadIcon, Medal, Users, TrendingUp } from 'lucide-react';

export default function GamificationSection() {
  const gamificationElements = [
    {
      icon: Trophy,
      title: 'Sistema de Conquistas',
      description: 'Desbloqueie conquistas ao completar desafios e marcos importantes no seu aprendizado.',
      color: 'bg-gradient-to-r from-yellow-400 to-orange-500'
    },
    {
      icon: Star,
      title: 'Pontos de Experiência (XP)',
      description: 'Ganhe XP por cada atividade completada e veja seu progresso em tempo real.',
      color: 'bg-gradient-to-r from-blue-400 to-cyan-500'
    },
    {
      icon: Target,
      title: 'Níveis e Progressão',
      description: 'Avance através de níveis conforme desenvolve suas habilidades médicas.',
      color: 'bg-gradient-to-r from-green-400 to-emerald-500'
    },
    {
      icon: Users,
      title: 'Competição Saudável',
      description: 'Compare seu progresso com outros estudantes e participe de desafios em grupo.',
      color: 'bg-gradient-to-r from-purple-400 to-pink-500'
    }
  ];

  const benefits = [
    {
      icon: Zap,
      title: 'Maior Engajamento',
      description: 'Elementos de jogo tornam o aprendizado mais envolvente e divertido.',
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      icon: TrendingUp,
      title: 'Motivação Contínua',
      description: 'Recompensas e progressão visível mantêm a motivação em alta.',
      gradient: 'from-green-400 to-teal-500'
    },
    {
      icon: Medal,
      title: 'Senso de Conquista',
      description: 'Reconhecimento imediato por esforços e melhorias alcançadas.',
      gradient: 'from-purple-400 to-pink-500'
    },
    {
      icon: Target,
      title: 'Objetivos Claros',
      description: 'Metas bem definidas guiam o processo de aprendizagem.',
      gradient: 'from-blue-400 to-cyan-500'
    }
  ];

  const stats = [
    { number: '50+', label: 'Níveis Disponíveis', description: 'Sistema progressivo de evolução', gradient: 'from-purple-500 to-purple-600' },
    { number: '25+', label: 'Conquistas Únicas', description: 'Marcos especiais para desbloquear', gradient: 'from-blue-500 to-blue-600' },
    { number: '8', label: 'Tipos de Atividades', description: 'Diversas formas de ganhar XP', gradient: 'from-green-500 to-green-600' },
    { number: '90%', label: 'Mais Engajamento', description: 'Comparado ao método tradicional', gradient: 'from-pink-500 to-pink-600' }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-10 w-36 h-36 bg-purple-500 rounded-full blur-3xl animate-pulse delay-300"></div>
        <div className="absolute bottom-10 left-10 w-44 h-44 bg-pink-500 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/3 right-1/3 w-28 h-28 bg-blue-500 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/2 w-32 h-32 bg-cyan-500 rounded-full blur-3xl animate-pulse delay-1500"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mr-4 animate-bounce">
              <GamepadIcon className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Gamificação na Educação
            </h2>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A gamificação utiliza elementos de jogos para tornar o aprendizado mais envolvente, 
            motivador e efetivo. Transformamos o estudo da medicina em uma experiência interativa 
            e recompensadora.
          </p>
        </div>

        {/* Gamification Elements */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent mb-12">
            Elementos de Gamificação
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gamificationElements.map((element, index) => {
              const IconComponent = element.icon;
              return (
                <div 
                  key={index}
                  className="group bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105"
                >
                  <div className="flex justify-center mb-4">
                    <div className={`p-4 rounded-full ${element.color} group-hover:scale-110 transition-transform duration-300 animate-pulse`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-3 text-center group-hover:text-yellow-200 transition-colors duration-300">
                    {element.title}
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed text-center group-hover:text-gray-200 transition-colors duration-300">
                    {element.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-12">
            Nossa Plataforma em Números
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className={`bg-gradient-to-br ${stat.gradient} rounded-2xl p-6 mb-4 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg hover:shadow-2xl`}>
                  <div className="text-4xl font-bold text-white mb-2 animate-pulse">
                    {stat.number}
                  </div>
                  <div className="text-white/90 font-semibold">
                    {stat.label}
                  </div>
                </div>
                <p className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors duration-300">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent mb-12">
            Benefícios da Gamificação
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div 
                  key={index}
                  className="group flex items-start space-x-4 p-6 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-500 transform hover:-translate-y-2"
                >
                  <div className="flex-shrink-0">
                    <div className={`p-3 bg-gradient-to-r ${benefit.gradient} rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-yellow-200 transition-colors duration-300">
                      {benefit.title}
                    </h4>
                    <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Preview */}
        <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 rounded-2xl p-8 text-center relative overflow-hidden group">
          {/* Animated background effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 animate-pulse opacity-75"></div>
          <div className="absolute inset-0 bg-gradient-to-45 from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-full group-hover:-translate-x-full transition-transform duration-1000"></div>
          
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-white mb-4">
              Experimente a Gamificação
            </h3>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              Cadastre-se e comece a ganhar XP, desbloquear conquistas e subir de nível 
              enquanto desenvolve suas habilidades médicas.
            </p>
            
            {/* Mini Progress Bar Demo */}
            <div className="bg-white/20 backdrop-blur-lg rounded-lg p-4 mb-6 max-w-md mx-auto border border-white/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-white">Nível 5</span>
                <span className="text-sm text-gray-200">750/1000 XP</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
              </div>
              <div className="flex items-center justify-center mt-3 space-x-4 text-sm">
                <div className="flex items-center text-yellow-300">
                  <Trophy className="h-4 w-4 mr-1 animate-bounce" />
                  <span>12 Conquistas</span>
                </div>
                <div className="flex items-center text-blue-300">
                  <Star className="h-4 w-4 mr-1 animate-pulse" />
                  <span>2,150 XP Total</span>
                </div>
              </div>
            </div>

            <button className="bg-white text-purple-600 hover:bg-gray-100 hover:text-purple-700 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
              Começar Jornada
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}