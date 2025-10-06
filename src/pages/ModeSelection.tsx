import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { BookOpen, FileText, Brain, Puzzle } from 'lucide-react';
import { BackButton } from '../components/common';
import { StudyModeGrid, StudyTip, type StudyModeOption } from '../components/modeSelection';
import { useLoading } from '../contexts/LoadingContext';

// Import mode images
import clinicalImg from '../components/images/clinical_img.png';
import questionsImg from '../components/images/questions_img.png';

export default function ModeSelection() {
  const navigate = useNavigate();
  const { hideLoading } = useLoading();

  // Limpar qualquer loading pendente quando o componente montar
  useEffect(() => {
    hideLoading();
  }, [hideLoading]);

  const studyModes: StudyModeOption[] = [
    {
      id: 'question-bank',
      title: 'Banco de Questões',
      description: 'Pratique com questões organizadas por tema e dificuldade',
      icon: BookOpen,
      image: questionsImg,
      isActive: true,
      route: '/questions'
    },
    {
      id: 'clinical-cases',
      title: 'Casos Clínicos',
      description: 'Resolva casos clínicos complexos com cenários realistas',
      icon: FileText,
      image: clinicalImg,
      isActive: false,
      route: '/clinical-cases'
    },
    {
      id: 'flashcards',
      title: 'Flashcards',
      description: 'Revise conceitos importantes de forma rápida e eficiente',
      icon: Brain,
      isActive: false,
      route: '/flashcards'
    },
    {
      id: 'interactive',
      title: 'Componentes Interativos',
      description: 'Explore simuladores e ferramentas interativas de aprendizado',
      icon: Puzzle,
      isActive: false,
      route: '/interactive'
    }
  ];

  const handleModeSelect = (mode: StudyModeOption) => {
    if (!mode.isActive) {
      // Não faz nada se o modo não estiver ativo
      return;
    }
    
    // Navegação direta sem loading para evitar problemas
    navigate(mode.route);
  };

  const handleBackToDashboard = () => {
    // Navegação direta sem loading para evitar problemas
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <BackButton 
          onClick={handleBackToDashboard}
          label="Voltar ao Dashboard"
        />

        {/* Custom Header with Logo */}
        <div className="text-center mb-12">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img 
                src="/logos/penaped_shadow.png" 
                alt="PénaPED Logo"
                className="h-28 w-auto drop-shadow-lg hover:scale-105 transition-transform duration-300"
              />
              {/* Subtle glow effect behind logo */}
              <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full scale-150 -z-10" />
            </div>
          </div>
          
          {/* Title and Subtitle */}
          <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Escolha seu Modo de Estudo
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Selecione a modalidade de estudo que melhor se adapta ao seu objetivo de aprendizado
          </p>
        </div>

        <StudyModeGrid 
          modes={studyModes}
          onSelect={handleModeSelect}
        />

        <StudyTip 
          content="Aproveite o <strong>Banco de Questões</strong> já disponível com centenas de questões de alta qualidade! Os outros modos de estudo estão em desenvolvimento e estarão disponíveis em breve para oferecer uma experiência de aprendizado ainda mais completa."
        />
      </div>
    </div>
  );
}