import { FileText, Clock, Brain, CheckCircle, Stethoscope, BookOpen, Target } from 'lucide-react';

export default function ClinicalCasesSection() {
  const features = [
    {
      icon: FileText,
      title: 'Casos Reais',
      description: 'Baseados em situações clínicas autênticas do dia a dia médico.'
    },
    {
      icon: Clock,
      title: 'Análise Temporal',
      description: 'Acompanhe a evolução do paciente ao longo do tempo.'
    },
    {
      icon: Brain,
      title: 'Raciocínio Clínico',
      description: 'Desenvolva habilidades de diagnóstico diferencial.'
    },
    {
      icon: CheckCircle,
      title: 'Feedback Imediato',
      description: 'Receba orientações instantâneas sobre suas decisões.'
    }
  ];

  const process = [
    {
      step: '1',
      title: 'Apresentação do Caso',
      description: 'História clínica detalhada com sintomas e sinais.',
      icon: BookOpen
    },
    {
      step: '2',
      title: 'Investigação',
      description: 'Solicite exames e colete informações adicionais.',
      icon: Stethoscope
    },
    {
      step: '3',
      title: 'Diagnóstico',
      description: 'Formule hipóteses diagnósticas baseadas nos dados.',
      icon: Brain
    },
    {
      step: '4',
      title: 'Conduta',
      description: 'Defina o plano terapêutico mais adequado.',
      icon: Target
    }
  ];

  const specialties = [
    'Cardiologia', 'Neurologia', 'Pediatria', 'Ginecologia',
    'Oncologia', 'Psiquiatria', 'Dermatologia', 'Ortopedia'
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-25">
        <div className="absolute top-16 left-16 w-40 h-40 bg-emerald-500 rounded-full blur-3xl animate-pulse delay-200"></div>
        <div className="absolute bottom-16 right-16 w-36 h-36 bg-teal-500 rounded-full blur-3xl animate-pulse delay-800"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-cyan-500 rounded-full blur-2xl animate-pulse delay-1200"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full mr-4 animate-pulse">
              <FileText className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-emerald-200 to-teal-200 bg-clip-text text-transparent">
              Casos Clínicos Interativos
            </h2>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Pratique com casos clínicos reais e desenvolva suas habilidades diagnósticas 
            através de cenários autênticos da prática médica, com feedback personalizado 
            e orientação especializada.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={index}
                  className="text-center p-6 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-3">
                    {feature.title}
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Process Steps */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent mb-12">
            Como Funciona um Caso Clínico
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="relative">
                  {/* Connection line */}
                  {index < process.length - 1 && (
                    <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-emerald-300 to-teal-300 transform translate-x-2 z-0"></div>
                  )}
                  
                  <div className="relative bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-500 z-10">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-teal-500 text-white rounded-full flex items-center justify-center font-bold text-sm mr-3">
                        {item.step}
                      </div>
                      <IconComponent className="h-6 w-6 text-emerald-300" />
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">
                      {item.title}
                    </h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Specialties */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent mb-8">
            Especialidades Disponíveis
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {specialties.map((specialty, index) => (
              <span 
                key={index}
                className="px-4 py-2 bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 rounded-full text-sm font-medium hover:bg-emerald-200 dark:hover:bg-emerald-800 transition-colors cursor-pointer"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-700 dark:to-teal-700 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Pratique com Casos Reais
            </h3>
            <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
              Acesse nossa biblioteca com centenas de casos clínicos organizados por 
              especialidade e nível de dificuldade. Desenvolvido por especialistas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-emerald-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors duration-300">
                Explorar Casos
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-emerald-600 px-6 py-3 rounded-lg font-semibold transition-colors duration-300">
                Ver Demonstração
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}