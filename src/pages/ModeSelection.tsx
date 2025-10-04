import { useNavigate } from 'react-router-dom';
import { BookOpen, FileText, Brain, Puzzle } from 'lucide-react';
import { BackButton } from '../components/common';
import { StudyModeGrid, StudyTip, type StudyModeOption } from '../components/modeSelection';
import { useLoading } from '../contexts/LoadingContext';

// Import mode images
import clinicalImg from '../components/images/clinical_img.png';
import questionsImg from '../components/images/questions_img.png';

// Import PénaPED logo
import penaPedLogo from '../assets/images/logos/logo_penaped.png';

export default function ModeSelection() {
  const navigate = useNavigate();
  const { showLoading } = useLoading();

  const studyModes: StudyModeOption[] = [
    {
      id: 'clinical-cases',
      title: 'Casos Clínicos',
      description: 'Resolva casos clínicos complexos com cenários realistas',
      icon: FileText,
      image: clinicalImg,
      isActive: true,
      route: '/clinical-cases'
    },
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
    if (mode.isActive) {
      showLoading(`Carregando ${mode.title}...`, 'branded');
      setTimeout(() => {
        navigate(mode.route);
      }, 500);
    }
  };

  const handleBackToDashboard = () => {
    showLoading('Voltando ao Dashboard...', 'minimal');
    setTimeout(() => {
      navigate('/dashboard');
    }, 300);
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
                src={penaPedLogo} 
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
          content="Comece com o <strong>Banco de Questões</strong> para avaliar seu conhecimento atual. Em breve, novos modos de estudo estarão disponíveis para uma experiência de aprendizado ainda mais completa!"
        />
      </div>
    </div>
  );
}