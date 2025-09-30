import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Stethoscope, Brain, Users } from 'lucide-react';

// Import avatar images
import babyCasesImg from '../assets/images/avatars/baby_cases.png';
import youngCasesImg from '../assets/images/avatars/young_cases.png';
import adultCasesImg from '../assets/images/avatars/adult_cases.png';

interface ClinicalCaseCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  avatar: string;
  route: string;
  caseCount: number;
  difficulty: string;
  estimatedTime: string;
}

export default function ClinicalCaseSelection() {
  const navigate = useNavigate();

  const categories: ClinicalCaseCategory[] = [
    {
      id: 'basic',
      title: 'Casos Básicos',
      description: 'Casos fundamentais para consolidar conhecimentos essenciais de pediatria',
      icon: FileText,
      avatar: babyCasesImg,
      route: '/clinical-cases/basic',
      caseCount: 12,
      difficulty: 'Iniciante',
      estimatedTime: '15-20 min'
    },
    {
      id: 'clinical',
      title: 'Casos Clínicos',
      description: 'Casos complexos que integram múltiplas áreas do conhecimento pediátrico',
      icon: Stethoscope,
      avatar: youngCasesImg,
      route: '/clinical-cases/clinical',
      caseCount: 18,
      difficulty: 'Intermediário',
      estimatedTime: '25-35 min'
    },
    {
      id: 'specialties',
      title: 'Especialidades',
      description: 'Casos avançados de subespecialidades pediátricas',
      icon: Brain,
      avatar: adultCasesImg,
      route: '/clinical-cases/specialties',
      caseCount: 15,
      difficulty: 'Avançado',
      estimatedTime: '30-45 min'
    }
  ];

  const handleCategorySelect = (category: ClinicalCaseCategory) => {
    navigate(category.route);
  };

  const handleBack = () => {
    navigate('/study');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Iniciante': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Intermediário': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Avançado': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getAvatarBorderColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Iniciante': return 'border-green-300 dark:border-green-700';
      case 'Intermediário': return 'border-yellow-300 dark:border-yellow-700';
      case 'Avançado': return 'border-red-300 dark:border-red-700';
      default: return 'border-blue-200 dark:border-blue-800';
    }
  };

  const getIconBadgeColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Iniciante': return 'bg-green-100 dark:bg-green-900 border-green-200 dark:border-green-800';
      case 'Intermediário': return 'bg-yellow-100 dark:bg-yellow-900 border-yellow-200 dark:border-yellow-800';
      case 'Avançado': return 'bg-red-100 dark:bg-red-900 border-red-200 dark:border-red-800';
      default: return 'bg-blue-100 dark:bg-blue-900 border-blue-200 dark:border-blue-800';
    }
  };

  return (
    <div className="dashboard-background min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header with Back Button */}
        <div className="flex items-center mb-8">
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 theme-text-secondary hover:theme-text-primary transition-colors mr-6"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Voltar</span>
          </button>
          
          <div>
            <h1 className="text-3xl font-bold theme-text-primary">
              Casos Clínicos
            </h1>
            <p className="theme-text-secondary mt-2">
              Escolha a categoria de casos clínicos que melhor se adapta ao seu nível
            </p>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {categories.map((category) => {
            const IconComponent = category.icon;
            
            return (
              <div
                key={category.id}
                onClick={() => handleCategorySelect(category)}
                className="theme-card rounded-xl p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:theme-shadow-lg border hover:border-blue-500 relative overflow-hidden group"
              >
                
                {/* Avatar Image */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <img 
                      src={category.avatar} 
                      alt={`${category.title} avatar`}
                      className={`w-20 h-20 rounded-full object-cover border-4 ${getAvatarBorderColor(category.difficulty)} shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-110`}
                    />
                    {/* Difficulty indicator on avatar */}
                    <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800 ${getIconBadgeColor(category.difficulty)}`}>
                      <IconComponent className="h-3 w-3 text-current" />
                    </div>
                  </div>
                </div>

                {/* Title and Difficulty */}
                <div className="text-center mb-4">
                  <h3 className="text-xl font-semibold theme-text-primary mb-2">
                    {category.title}
                  </h3>
                  <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getDifficultyColor(category.difficulty)}`}>
                    {category.difficulty}
                  </span>
                </div>

                {/* Description */}
                <p className="theme-text-secondary text-sm leading-relaxed mb-4 text-center">
                  {category.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm theme-text-tertiary mb-4">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{category.caseCount} casos</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>{category.estimatedTime}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="pt-4 border-t theme-border">
                  <div className="flex justify-between items-center text-xs theme-text-tertiary mb-2">
                    <span>Progresso</span>
                    <span>0%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: '0%' }}></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Information */}
        <div className="theme-card rounded-lg p-6">
          <h3 className="text-lg font-semibold theme-text-primary mb-3">
            Como funcionam os Casos Clínicos?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm theme-text-secondary">
            <div>
              <h4 className="font-medium theme-text-primary mb-2">📋 Apresentação</h4>
              <p>Cada caso apresenta uma situação clínica realista com história, exame físico e exames complementares.</p>
            </div>
            <div>
              <h4 className="font-medium theme-text-primary mb-2">🎯 Raciocínio</h4>
              <p>Você será guiado através de perguntas que estimulam o raciocínio clínico e tomada de decisões.</p>
            </div>
            <div>
              <h4 className="font-medium theme-text-primary mb-2">📚 Feedback</h4>
              <p>Receba explicações detalhadas sobre cada decisão e aprenda com especialistas em pediatria.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}