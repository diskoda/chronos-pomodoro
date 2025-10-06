import { HelpCircle, Play, ArrowRight, Target, CheckCircle, Building2, Stethoscope, BookOpen, Award, Clock } from 'lucide-react';
import dravenusImg from '../../assets/images/avatars/dravenus.png';

export default function QuestionBankSection() {
  const stats = [
    { number: '5000+', label: 'Questões Disponíveis', icon: HelpCircle },
    { number: '50+', label: 'Especialidades', icon: Target },
    { number: '95%', label: 'Taxa de Aprovação', icon: Award },
    { number: '24/7', label: 'Disponibilidade', icon: Clock }
  ];

  const features = [
    {
      title: 'Questões por Bancas',
      description: 'Pratique com questões organizadas pelas principais bancas de residência médica',
      icon: Building2,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Questões por Especialidades',
      description: 'Acesse questões categorizadas por área médica específica para foco no seu estudo',
      icon: Stethoscope,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Questões por Temas',
      description: 'Estude por tópicos específicos dentro de cada especialidade médica',
      icon: BookOpen,
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <section id="questions" className="py-20 theme-bg-primary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-40 h-40 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 penaped-bg-purple rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 penaped-bg-teal rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6">
            <HelpCircle className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold theme-text-primary mb-6">
            Banco de Questões Interativo
          </h2>
          <p className="text-xl theme-text-secondary max-w-3xl mx-auto leading-relaxed">
            Aprenda enquanto resolve questões com feedback imediato e explicações detalhadas para cada resposta
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="group penaped-card hover:theme-shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold theme-text-primary mb-2">{stat.number}</div>
                <div className="theme-text-secondary font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Left Column - Question Cards Preview */}
          <div className="space-y-6">
            <div className="text-center lg:text-left mb-8">
              <h3 className="text-3xl font-bold theme-text-primary mb-4">
                Questões Organizadas por Especialidade
              </h3>
              <p className="theme-text-secondary text-lg leading-relaxed">
                Acesse questões dos principais concursos de residência médica, organizadas por especialidade e nível de dificuldade.
              </p>
            </div>
            
            {/* Question Cards Grid */}
            <div className="relative">
              {/* Background mockup representing the first image */}
              <div className="theme-bg-secondary rounded-3xl p-8 theme-shadow-lg border theme-border">
                <div className="grid grid-cols-2 gap-4">
                  {/* Card 1 - Highlighted */}
                  <div className="penaped-bg-orange rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-3 left-3 bg-black/20 rounded-full px-3 py-1 text-sm font-bold text-white">
                      #1 ⭐
                    </div>
                    <div className="absolute top-3 right-3 penaped-bg-purple rounded-lg px-3 py-1 text-xs font-semibold text-white">
                      USP-SP 2025
                    </div>
                    <div className="mt-8">
                      <h4 className="text-white font-bold text-lg mb-2">Abordagem motivacional no tabagismo</h4>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-black/20 rounded-full px-3 py-1 text-xs text-white">Pediatria Geral</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-white/80 mb-4">
                        <span className="penaped-bg-amber rounded-full px-3 py-1 text-white">Médio</span>
                        <span>~3min</span>
                      </div>
                      <div className="flex gap-2 flex-wrap text-xs">
                        <span className="bg-black/20 rounded-lg px-2 py-1 text-white">Asma</span>
                        <span className="bg-black/20 rounded-lg px-2 py-1 text-white">Tabagismo</span>
                      </div>
                    </div>
                    <div className="absolute bottom-4 right-4 left-4 flex gap-2">
                      <button className="flex-1 bg-black/30 rounded-lg py-2 px-3 text-white text-sm font-medium">
                        Dra. Vênus
                      </button>
                      <button className="flex-1 penaped-bg-purple rounded-lg py-2 px-3 text-white text-sm font-medium">
                        Simulado
                      </button>
                    </div>
                  </div>

                  {/* Cards 2-4 - Smaller */}
                  <div className="space-y-4">
                    <div className="theme-bg-tertiary rounded-xl p-4 theme-border border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="penaped-text-orange font-bold text-sm">#10 ⭐</span>
                        <span className="penaped-bg-purple rounded px-2 py-1 text-xs text-white">USP-SP 2025</span>
                      </div>
                      <h5 className="theme-text-primary font-semibold text-sm mb-2">Cetoacidose diabética - Diagnóstico laboratorial</h5>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="penaped-bg-orange rounded px-2 py-1 text-xs text-white">Endocrinologia</span>
                        <span className="theme-text-tertiary text-xs">~5min</span>
                      </div>
                    </div>

                    <div className="theme-bg-tertiary rounded-xl p-4 theme-border border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="penaped-text-pink font-bold text-sm">#11 ⭐</span>
                        <span className="penaped-bg-purple rounded px-2 py-1 text-xs text-white">USP-SP 2025</span>
                      </div>
                      <h5 className="theme-text-primary font-semibold text-sm mb-2">Doença hemorrágica do recém-nascido</h5>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="penaped-bg-pink rounded px-2 py-1 text-xs text-white">Neonatologia</span>
                        <span className="theme-text-tertiary text-xs">~4min</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Dr. Skoda Interface */}
          <div className="space-y-6">
            <div className="text-center lg:text-left mb-8">
              <h3 className="text-3xl font-bold theme-text-primary mb-4">
                Aprendizado Interativo
              </h3>
              <p className="theme-text-secondary text-lg leading-relaxed">
                Resolva questões e receba feedback imediato com explicações detalhadas para cada alternativa, fortalecendo seu conhecimento a cada resposta.
              </p>
            </div>

            {/* Dr. Skoda Interface Mockup */}
            <div className="relative">
              <div className="theme-bg-secondary rounded-3xl p-6 theme-shadow-lg theme-border border">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6 theme-bg-tertiary rounded-xl p-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-orange-400">
                      <img 
                        src={dravenusImg} 
                        alt="Dra. Vênus" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 penaped-bg-green rounded-full border-2 border-blue-900"></div>
                  </div>
                  <div>
                    <div className="theme-text-primary font-bold">Dra. Vênus</div>
                    <div className="penaped-text-green text-sm flex items-center gap-1">
                      <div className="w-2 h-2 penaped-bg-green rounded-full"></div>
                      Online
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="theme-bg-tertiary rounded-2xl p-6 mb-6 theme-border border">
                  <div className="theme-text-primary font-bold text-lg mb-4">
                    Aprendizado interativo em ação!
                  </div>
                  <div className="theme-text-secondary mb-4 space-y-2">
                    <p>Cada questão é uma oportunidade de aprender! Resolva e receba explicações detalhadas.</p>
                    <p className="font-semibold theme-text-primary">Sobre esta questão:</p>
                    <p>Esta questão aborda um caso clássico de <span className="penaped-text-orange font-semibold">Cetoacidose Diabética (CAD)</span> em pediatria, uma emergência endocrinológica grave.</p>
                    <p className="font-semibold penaped-text-orange">Conceitos que você aprenderá:</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 penaped-bg-amber rounded-full mt-2 flex-shrink-0"></div>
                      <div className="theme-text-secondary">
                        <span className="penaped-text-amber font-semibold">Tríade clássica:</span> hiperglicemia + acidose metabólica + cetolemia/cetonúria
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 penaped-bg-green rounded-full mt-2 flex-shrink-0"></div>
                      <div className="theme-text-secondary">
                        <span className="penaped-text-green font-semibold">Critérios diagnósticos:</span> glicemia &gt;250mg/dL, pH &lt;7.30 HCO3- &lt;15mEq/L...
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 penaped-btn penaped-btn-orange transition-all duration-300 flex items-center justify-center gap-2">
                    <span>🎯</span>
                    Resolver e Aprender!
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center theme-text-primary mb-12">
            Recursos Exclusivos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="group penaped-card hover:theme-shadow-lg transition-all duration-300 hover:-translate-y-2">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold theme-text-primary mb-4 group-hover:penaped-text-teal transition-colors duration-300">
                    {feature.title}
                  </h4>
                  <p className="theme-text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Exam Boards Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold theme-text-primary mb-4">
              Bancas de Residência Médica
            </h3>
            <p className="theme-text-secondary text-lg max-w-2xl mx-auto">
              Questões atualizadas das principais instituições de residência médica do estado de São Paulo
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {/* SUS-SP */}
            <div className="group penaped-card text-center hover:theme-shadow-lg transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-lg">SUS</span>
              </div>
              <h4 className="font-bold theme-text-primary mb-2">SUS-SP</h4>
              <p className="text-sm theme-text-secondary">Sistema Único de Saúde - São Paulo</p>
              <div className="mt-3 inline-flex items-center gap-1 penaped-text-green text-sm">
                <CheckCircle className="h-4 w-4" />
                <span>Ativo</span>
              </div>
            </div>

            {/* USP-SP */}
            <div className="group penaped-card text-center hover:theme-shadow-lg transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-lg">USP</span>
              </div>
              <h4 className="font-bold theme-text-primary mb-2">USP-SP</h4>
              <p className="text-sm theme-text-secondary">Universidade de São Paulo</p>
              <div className="mt-3 inline-flex items-center gap-1 penaped-text-green text-sm">
                <CheckCircle className="h-4 w-4" />
                <span>Ativo</span>
              </div>
            </div>

            {/* UNIFESP */}
            <div className="group penaped-card text-center hover:theme-shadow-lg transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-sm">UNI</span>
              </div>
              <h4 className="font-bold theme-text-primary mb-2">UNIFESP</h4>
              <p className="text-sm theme-text-secondary">Universidade Federal de São Paulo</p>
              <div className="mt-3 inline-flex items-center gap-1 penaped-text-green text-sm">
                <CheckCircle className="h-4 w-4" />
                <span>Ativo</span>
              </div>
            </div>

            {/* UNICAMP */}
            <div className="group penaped-card text-center hover:theme-shadow-lg transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-sm">UNC</span>
              </div>
              <h4 className="font-bold theme-text-primary mb-2">UNICAMP</h4>
              <p className="text-sm theme-text-secondary">Universidade Estadual de Campinas</p>
              <div className="mt-3 inline-flex items-center gap-1 penaped-text-green text-sm">
                <CheckCircle className="h-4 w-4" />
                <span>Ativo</span>
              </div>
            </div>

            {/* IAMSPE */}
            <div className="group penaped-card text-center hover:theme-shadow-lg transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-sm">IAM</span>
              </div>
              <h4 className="font-bold theme-text-primary mb-2">IAMSPE</h4>
              <p className="text-sm theme-text-secondary">Instituto de Assistência Médica do Servidor Público Estadual</p>
              <div className="mt-3 inline-flex items-center gap-1 penaped-text-green text-sm">
                <CheckCircle className="h-4 w-4" />
                <span>Ativo</span>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 penaped-card px-6 py-3">
              <Target className="h-5 w-5 penaped-text-teal" />
              <span className="theme-text-secondary font-medium">
                Questões atualizadas regularmente | Últimas provas incluídas
              </span>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="theme-bg-secondary rounded-3xl p-12 relative overflow-hidden group theme-shadow-lg theme-border border">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-indigo-600/20"></div>
            <div className="absolute inset-0 bg-gradient-to-45 from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-full group-hover:-translate-x-full transition-transform duration-1000"></div>
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold theme-text-primary mb-6">
                Comece Sua Jornada de Aprendizado Interativo
              </h3>
              <p className="theme-text-secondary text-lg mb-8 max-w-2xl mx-auto">
                Acesse milhares de questões com explicações detalhadas e aprenda enquanto pratica para sua residência médica
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group penaped-btn penaped-btn-primary text-lg transform hover:scale-105 hover:theme-shadow-lg flex items-center justify-center gap-2">
                  <Play className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  Começar Agora
                </button>
                <button className="penaped-btn penaped-btn-outline text-lg transform hover:scale-105 flex items-center justify-center gap-2">
                  Ver Demonstração
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}