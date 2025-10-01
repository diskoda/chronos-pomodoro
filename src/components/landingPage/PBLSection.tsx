import { BookOpen, Users, Lightbulb, Target, Brain, Stethoscope } from 'lucide-react';

export default function PBLSection() {
  const benefits = [
    {
      icon: Brain,
      title: 'Pensamento Crítico',
      description: 'Desenvolve habilidades analíticas e de resolução de problemas complexos.'
    },
    {
      icon: Users,
      title: 'Aprendizado Colaborativo',
      description: 'Promove trabalho em equipe e troca de conhecimentos entre estudantes.'
    },
    {
      icon: Target,
      title: 'Aplicação Prática',
      description: 'Conecta teoria médica com situações clínicas reais e relevantes.'
    },
    {
      icon: Lightbulb,
      title: 'Aprendizado Ativo',
      description: 'Estimula participação ativa e engajamento no processo educativo.'
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
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Stethoscope className="h-12 w-12 text-blue-600 dark:text-blue-400 mr-4" />
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              O que é PBL?
            </h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Problem-Based Learning (Aprendizagem Baseada em Problemas) é uma metodologia educacional 
            que utiliza problemas reais como ponto de partida para o aprendizado, promovendo o 
            desenvolvimento de habilidades essenciais para a prática médica.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Benefícios do PBL na Medicina
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div 
                  key={index}
                  className="text-center p-6 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                      <IconComponent className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {benefit.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* How it Works */}
        <div>
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Como Funciona o PBL?
          </h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200 dark:bg-blue-800"></div>
            
            <div className="space-y-12">
              {steps.map((step, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  {/* Content */}
                  <div className="flex-1 lg:w-1/2">
                    <div className={`${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center mb-4">
                          <span className="text-3xl font-bold text-blue-600 dark:text-blue-400 mr-4">
                            {step.number}
                          </span>
                          <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {step.title}
                          </h4>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="hidden lg:flex items-center justify-center w-12 h-12 bg-blue-600 dark:bg-blue-500 rounded-full border-4 border-white dark:border-gray-900 shadow-lg z-10">
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
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Pronto para Experimentar o PBL?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Descubra como nossa plataforma implementa a metodologia PBL através de casos clínicos 
              interativos e questões baseadas em problemas reais.
            </p>
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors duration-300">
              Explorar Casos Clínicos
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}