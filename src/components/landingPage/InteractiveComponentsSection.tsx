import { MousePointer, Layers, Eye, Play, Puzzle, Activity, Microscope, Heart } from 'lucide-react';

export default function InteractiveComponentsSection() {
  const components = [
    {
      icon: Eye,
      title: 'Visualizações 3D',
      description: 'Modelos anatômicos interativos para explorar estruturas corporais.',
      example: 'Coração 3D com válvulas animadas'
    },
    {
      icon: Microscope,
      title: 'Simuladores Virtuais',
      description: 'Laboratórios virtuais para praticar procedimentos sem riscos.',
      example: 'Microscopia de tecidos histológicos'
    },
    {
      icon: Activity,
      title: 'Gráficos Dinâmicos',
      description: 'Dados clínicos que se atualizam em tempo real.',
      example: 'Monitoramento de sinais vitais'
    },
    {
      icon: Puzzle,
      title: 'Jogos Educativos',
      description: 'Atividades lúdicas que reforçam conceitos importantes.',
      example: 'Quebra-cabeça de anatomia'
    }
  ];

  const interactionTypes = [
    {
      title: 'Drag & Drop',
      description: 'Arraste elementos para posições corretas',
      icon: MousePointer,
      color: 'bg-blue-500'
    },
    {
      title: 'Camadas Visuais',
      description: 'Navegue por diferentes sistemas anatômicos',
      icon: Layers,
      color: 'bg-purple-500'
    },
    {
      title: 'Animações',
      description: 'Processos fisiológicos em movimento',
      icon: Play,
      color: 'bg-green-500'
    },
    {
      title: 'Simulação',
      description: 'Experimente cenários clínicos realistas',
      icon: Heart,
      color: 'bg-red-500'
    }
  ];

  const benefits = [
    {
      title: 'Aprendizado Visual',
      description: 'Conceitos complexos ficam mais fáceis de compreender através de visualizações interativas.',
      percentage: 85
    },
    {
      title: 'Engajamento Ativo',
      description: 'Interação direta mantém o foco e aumenta a participação no aprendizado.',
      percentage: 92
    },
    {
      title: 'Retenção Melhorada',
      description: 'Experiências hands-on resultam em melhor fixação do conhecimento.',
      percentage: 78
    },
    {
      title: 'Prática Segura',
      description: 'Ambiente virtual permite erros sem consequências reais.',
      percentage: 95
    }
  ];

  const examples = [
    {
      title: 'Sistema Cardiovascular',
      description: 'Explore o coração em 3D, veja o fluxo sanguíneo e simule diferentes condições cardíacas.',
      tags: ['3D', 'Animação', 'Simulação']
    },
    {
      title: 'Análise de ECG',
      description: 'Interpretar eletrocardiogramas com feedback em tempo real e casos progressivos.',
      tags: ['Interativo', 'Feedback', 'Casos']
    },
    {
      title: 'Farmacologia Dinâmica',
      description: 'Visualize como medicamentos interagem no organismo com gráficos animados.',
      tags: ['Visualização', 'Dinâmico', 'Educativo']
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-cyan-900 via-teal-900 to-blue-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-25">
        <div className="absolute top-16 left-16 w-42 h-42 bg-cyan-500 rounded-full blur-3xl animate-pulse delay-200"></div>
        <div className="absolute bottom-20 right-20 w-38 h-38 bg-teal-500 rounded-full blur-3xl animate-pulse delay-800"></div>
        <div className="absolute top-2/3 right-1/4 w-32 h-32 bg-blue-500 rounded-full blur-2xl animate-pulse delay-500"></div>
        <div className="absolute bottom-1/3 left-1/3 w-36 h-36 bg-indigo-500 rounded-full blur-3xl animate-pulse delay-1200"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mr-4 animate-spin-slow">
              <MousePointer className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent">
              Componentes Interativos
            </h2>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Experiências de aprendizado imersivas com simulações 3D, laboratórios virtuais 
            e atividades interativas que transformam conceitos abstratos em experiências tangíveis.
          </p>
        </div>

        {/* Components Grid */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {components.map((component, index) => {
              const IconComponent = component.icon;
              return (
                <div 
                  key={index}
                  className="group bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 hover:rotate-1"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full group-hover:scale-110 transition-transform duration-300 animate-pulse">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-3 text-center group-hover:text-cyan-200 transition-colors duration-300">
                    {component.title}
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4 text-center group-hover:text-gray-200 transition-colors duration-300">
                    {component.description}
                  </p>
                  <div className="bg-cyan-500/20 backdrop-blur-sm p-3 rounded-lg border border-cyan-400/30">
                    <p className="text-xs text-cyan-200 font-medium text-center">
                      📋 {component.example}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interaction Types */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent mb-12">
            Tipos de Interação
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {interactionTypes.map((type, index) => {
              const IconComponent = type.icon;
              return (
                <div key={index} className="text-center">
                  <div className={`${type.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2 hover:text-cyan-200 transition-colors duration-300">
                    {type.title}
                  </h4>
                  <p className="text-gray-300 text-sm hover:text-gray-200 transition-colors duration-300">
                    {type.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Benefits with Progress Bars */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center bg-gradient-to-r from-white to-teal-200 bg-clip-text text-transparent mb-12">
            Impacto no Aprendizado
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="group bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-500 transform hover:-translate-y-2">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-lg font-semibold text-white group-hover:text-cyan-200 transition-colors duration-300">
                    {benefit.title}
                  </h4>
                  <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                    {benefit.percentage}%
                  </span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2 mb-4">
                  <div 
                    className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-1000 ease-out animate-pulse"
                    style={{ width: `${benefit.percentage}%` }}
                  ></div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Examples */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-12">
            Exemplos Práticos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {examples.map((example, index) => (
              <div key={index} className="group bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-500 transform hover:-translate-y-2">
                <h4 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-200 transition-colors duration-300">
                  {example.title}
                </h4>
                <p className="text-gray-300 mb-4 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  {example.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {example.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="px-3 py-1 bg-cyan-500/20 border border-cyan-400/30 text-cyan-200 rounded-full text-xs font-medium hover:bg-cyan-500/30 transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-cyan-600 via-teal-600 to-blue-600 rounded-2xl p-8 relative overflow-hidden group">
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-teal-600 to-blue-600 animate-pulse opacity-75"></div>
            <div className="absolute inset-0 bg-gradient-to-45 from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-full group-hover:-translate-x-full transition-transform duration-1000"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-4">
                Experimente a Interatividade
              </h3>
              <p className="text-cyan-100 mb-6 max-w-2xl mx-auto">
                Descubra como componentes interativos podem transformar sua forma de aprender 
                medicina, tornando conceitos complexos intuitivos e envolventes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-cyan-600 hover:bg-gray-100 hover:text-cyan-700 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                  Explorar Simulações
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:text-cyan-600 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                  Ver Demonstração
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}