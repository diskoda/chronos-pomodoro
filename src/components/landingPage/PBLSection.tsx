import { BookOpen, Users, Lightbulb, Target, Brain, Stethoscope } from 'lucide-react';

export default function PBLSection() {
  const benefits = [
    {
      icon: Brain,
      title: 'Pensamento Crítico',
      description: 'Desenvolve habilidades analíticas e de resolução de problemas complexos.',
      gradient: 'from-cyan-400 to-blue-500'
    },
    {
      icon: Users,
      title: 'Aprendizado Colaborativo',
      description: 'Promove trabalho em equipe e troca de conhecimentos entre estudantes.',
      gradient: 'from-purple-400 to-pink-500'
    },
    {
      icon: Target,
      title: 'Aplicação Prática',
      description: 'Conecta teoria médica com situações clínicas reais e relevantes.',
      gradient: 'from-orange-400 to-red-500'
    },
    {
      icon: Lightbulb,
      title: 'Aprendizado Ativo',
      description: 'Estimula participação ativa e engajamento no processo educativo.',
      gradient: 'from-green-400 to-teal-500'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Apresentação do Caso',
      description: 'Um caso clínico real é apresentado com todas as informações necessárias.'
    },
    {
      number: '02',
      title: 'Identificação de Problemas',
      description: 'Estudantes identificam e listam os problemas principais do caso.'
    },
    {
      number: '03',
      title: 'Hipóteses e Objetivos',
      description: 'Formulação de hipóteses diagnósticas e definição de objetivos de aprendizado.'
    },
    {
      number: '04',
      title: 'Estudo Autodirigido',
      description: 'Pesquisa individual para buscar conhecimentos necessários.'
    },
    {
      number: '05',
      title: 'Discussão e Síntese',
      description: 'Compartilhamento de conhecimentos e síntese das informações.'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-pink-500 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mr-4 animate-pulse">
              <Stethoscope className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              O que é PBL?
            </h2>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Problem-Based Learning (Aprendizagem Baseada em Problemas) é uma metodologia educacional 
            que utiliza problemas reais como ponto de partida para o aprendizado, promovendo o 
            desenvolvimento de habilidades essenciais para a prática médica.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-12">
            Benefícios do PBL na Medicina
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div 
                  key={index}
                  className="group text-center p-6 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105"
                >
                  <div className="flex justify-center mb-4">
                    <div className={`p-3 bg-gradient-to-r ${benefit.gradient} rounded-full group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-3 group-hover:text-yellow-200 transition-colors duration-300">
                    {benefit.title}
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* How it Works */}
        <div>
          <h3 className="text-2xl font-bold text-center bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent mb-12">
            Como Funciona o PBL?
          </h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-400 via-purple-500 to-pink-500"></div>
            
            <div className="space-y-12">
              {steps.map((step, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  {/* Content */}
                  <div className="flex-1 lg:w-1/2">
                    <div className={`${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                      <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 group">
                        <div className="flex items-center mb-4">
                          <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mr-4 group-hover:scale-110 transition-transform duration-300">
                            {step.number}
                          </span>
                          <h4 className="text-xl font-semibold text-white group-hover:text-yellow-200 transition-colors duration-300">
                            {step.title}
                          </h4>
                        </div>
                        <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="hidden lg:flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full border-4 border-white/20 shadow-lg z-10 hover:scale-110 transition-transform duration-300">
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden lg:block flex-1 lg:w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 relative overflow-hidden group">
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-pulse opacity-75"></div>
            <div className="absolute inset-0 bg-gradient-to-45 from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-full group-hover:-translate-x-full transition-transform duration-1000"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-4">
                Pronto para Experimentar o PBL?
              </h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Descubra como nossa plataforma implementa a metodologia PBL através de casos clínicos 
                interativos e questões baseadas em problemas reais.
              </p>
              <button className="bg-white text-purple-600 hover:bg-gray-100 hover:text-purple-700 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                Explorar Casos Clínicos
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}