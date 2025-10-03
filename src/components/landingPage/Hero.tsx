import { useNavigate } from 'react-router-dom';
import { useLoading } from '../../contexts/LoadingContext';
import DoctorSkoda from '../images/DoctorSkoda';

export default function Hero() {
  const { showLoading } = useLoading();
  const navigate = useNavigate();
  
  const handleStartNow = () => {
    showLoading('Iniciando sua jornada de estudos...', 'branded');
    setTimeout(() => {
      navigate('/login');
    }, 500);
  };
  
  const handleLearnMore = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div className="relative py-6 max-h-screen overflow-hidden">
      {/* Glass layer with blur effect - full width */}
      <div className="absolute inset-0 hero-glass-effect"></div>
      
      {/* Content over glass layer */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 min-h-[60vh] max-h-[70vh] max-w-5xl mx-auto">
          {/* Left side - Text Content */}
          <div className="text-center space-y-4 flex-1 max-w-lg">
            <div className="inline-block px-3 py-1 bg-orange-100 dark:bg-orange-900/30 rounded-full text-orange-800 dark:text-orange-200 text-sm font-medium mb-2">
              ⭐ Plataforma de Estudos PBL
            </div>
            
            <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
              Sua plataforma de estudos em{' '}
              <span className="text-gradient bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                Pediatria
              </span>
            </h1>
            
            <p className="text-base lg:text-lg text-gray-200 leading-relaxed">
              A PéNaPED é uma plataforma de estudos para estudantes de Medicina, apoiada na 
              metodologia de ensino PBL (Problem Based Learning), cujo objetivo é promover o 
              aprendizado ativo e a retenção do conteúdo através da gamificação.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center">
              <button 
                onClick={handleStartNow}
                className="theme-button-primary px-6 py-3 rounded-lg font-medium text-base hover:scale-105 transition-all duration-200 flex items-center gap-2"
              >
                📚 Começar Agora!
              </button>
              <button 
                onClick={handleLearnMore}
                className="border border-white/30 text-white px-6 py-3 rounded-lg font-medium text-base hover:bg-white/10 transition-all duration-200 flex items-center gap-2"
              >
                ▶️ Conhecer Mais
              </button>
            </div>
            
            <div className="text-white/80 text-base">
              Por apenas <span className="text-xl font-bold text-orange-400">R$4,99/mês</span>
            </div>
          </div>
          
          {/* Right side - Doctor Skoda */}
          <div className="flex justify-center items-center lg:pl-8 flex-1 max-w-sm">
            {/* Desktop version */}
            <div className="hidden lg:block">
              <div className="relative w-80 h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 
                            hover:shadow-3xl hover:border-blue-400/30 hover:scale-102 
                            transform transition-all duration-500 ease-out cursor-pointer
                            hover:rotate-0.5 group">
                <DoctorSkoda 
                  className="absolute inset-0 w-full h-full object-cover object-top 
                           group-hover:scale-105 transition-transform duration-700 ease-out" 
                  width="100%"
                  height="100%"
                />
                {/* Overlay effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 via-transparent to-transparent 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                {/* Shine effect */}
                <div className="absolute -top-full -left-full w-full h-full bg-gradient-to-br from-transparent via-white/10 to-transparent 
                              rotate-45 group-hover:top-full group-hover:left-full transition-all duration-1000 ease-out"></div>
              </div>
            </div>
            
            {/* Mobile version - smaller portrait */}
            <div className="lg:hidden">
              <div className="relative w-48 h-60 rounded-xl overflow-hidden shadow-xl border-3 border-white/20
                            hover:shadow-2xl hover:border-blue-400/30 hover:scale-102 
                            transform transition-all duration-500 ease-out cursor-pointer group">
                <DoctorSkoda 
                  className="absolute inset-0 w-full h-full object-cover object-top
                           group-hover:scale-105 transition-transform duration-700 ease-out" 
                  width="100%"
                  height="100%"
                />
                {/* Overlay effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 via-transparent to-transparent 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
