import { Link } from 'react-router-dom';
import DoctorSkoda from '../components/images/DoctorSkoda';

export default function TestFlowPage() {
  return (
    <div className="dashboard-background min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-6">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-900 rounded-full p-4 shadow-2xl">
              <DoctorSkoda width="100%" height="100%" />
            </div>
            <div className="absolute -top-2 -right-2 bg-green-500 w-8 h-8 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-white text-sm">✨</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Sistema de Fluxo Interativo
          </h1>
          <p className="text-xl theme-text-secondary max-w-2xl mx-auto">
            Aprenda pediatria com o Dr. Skoda através de uma experiência educacional imersiva e personalizada
          </p>
        </div>

        {/* Como Funciona */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-6 theme-text-primary flex items-center">
              <span className="mr-3 text-3xl">🎯</span>
              Como funciona o fluxo
            </h2>
            
            <div className="space-y-6">
              {[
                {
                  step: 1,
                  title: "Introdução Personalizada",
                  description: "Dr. Skoda contextualiza a questão e te motiva para o aprendizado",
                  color: "bg-blue-500",
                  icon: "👋"
                },
                {
                  step: 2,
                  title: "Resolução Ativa",
                  description: "Você analisa o caso clínico e escolhe a melhor alternativa",
                  color: "bg-green-500",
                  icon: "🤔"
                },
                {
                  step: 3,
                  title: "Explicação Detalhada",
                  description: "Conceitos fundamentais são explicados de forma didática",
                  color: "bg-yellow-500",
                  icon: "💡"
                },
                {
                  step: 4,
                  title: "Análise Completa",
                  description: "Cada alternativa é analisada com feedback personalizado",
                  color: "bg-purple-500",
                  icon: "🔍"
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className={`${item.color} text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-sm shadow-lg`}>
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold theme-text-primary text-lg flex items-center">
                      <span className="mr-2">{item.icon}</span>
                      {item.title}
                    </h3>
                    <p className="text-sm theme-text-secondary mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Características */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-700">
            <h2 className="text-2xl font-bold mb-6 text-blue-800 dark:text-blue-200 flex items-center">
              <span className="mr-3 text-3xl">✨</span>
              Características especiais
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "🎨", title: "Interface Moderna", desc: "Design responsivo e intuitivo" },
                { icon: "🧠", title: "Educativo", desc: "Baseado em evidências científicas" },
                { icon: "⚡", title: "Interativo", desc: "Feedback personalizado em tempo real" },
                { icon: "📱", title: "Responsivo", desc: "Funciona em todos os dispositivos" },
                { icon: "🎯", title: "Focado", desc: "Direcionado para pediatria" },
                { icon: "💪", title: "Motivacional", desc: "Encoraja o aprendizado contínuo" }
              ].map((feature, index) => (
                <div key={index} className="bg-white/70 dark:bg-gray-800/70 rounded-lg p-4 backdrop-blur-sm">
                  <div className="text-2xl mb-2">{feature.icon}</div>
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 text-sm">{feature.title}</h4>
                  <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Questão de Exemplo */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 mb-8">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6">
            <h3 className="text-2xl font-bold flex items-center">
              <span className="mr-3">🧪</span>
              Questão de Demonstração
            </h3>
            <p className="opacity-90 mt-2">Teste completo com a Questão 1 - Abordagem Motivacional no Tabagismo</p>
          </div>
          
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h4 className="text-xl font-semibold theme-text-primary mb-4">📋 Sobre a questão:</h4>
                <ul className="space-y-3 theme-text-secondary">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span><strong>Tema:</strong> Entrevista motivacional em pediatria</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span><strong>Contexto:</strong> Criança asmática com pai tabagista</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span><strong>Conceitos:</strong> Comunicação terapêutica, mudança comportamental</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span><strong>Análise:</strong> 4 alternativas com explicações detalhadas</span>
                  </li>
                </ul>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl p-6 border border-green-200 dark:border-green-700">
                  <div className="text-4xl mb-4">🚀</div>
                  <h5 className="font-bold text-green-800 dark:text-green-200 mb-2">Pronto para começar?</h5>
                  <p className="text-sm text-green-600 dark:text-green-300 mb-4">
                    Experiência completa: ~5-8 minutos
                  </p>
                  <Link
                    to="/question/1"
                    className="inline-block bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  >
                    🎯 Iniciar Teste Completo
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navegação */}
        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar ao Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}