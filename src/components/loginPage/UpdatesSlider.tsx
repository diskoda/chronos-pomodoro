import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Users, Star, TrendingUp } from 'lucide-react';

interface Update {
  id: number;
  title: string;
  description: string;
  date: string;
  type: 'feature' | 'improvement' | 'announcement' | 'success';
  icon: React.ReactNode;
}

const updates: Update[] = [
  {
    id: 1,
    title: 'Sistema XP Lançado',
    description: 'Novo sistema de gamificação com níveis, conquistas e pontos de experiência para tornar seus estudos mais engajantes.',
    date: '25 Set 2025',
    type: 'feature',
    icon: <Star className="w-6 h-6" />
  },
  {
    id: 2,
    title: 'Novos Casos Clínicos',
    description: 'Adicionados 50+ casos clínicos em Pediatria, Cardiologia e Neurologia com diferentes níveis de dificuldade.',
    date: '20 Set 2025',
    type: 'feature',
    icon: <TrendingUp className="w-6 h-6" />
  },
  {
    id: 3,
    title: 'Interface Melhorada',
    description: 'Design mais moderno e responsivo com novos temas escuro e claro para melhor experiência de estudo.',
    date: '15 Set 2025',
    type: 'improvement',
    icon: <Calendar className="w-6 h-6" />
  },
  {
    id: 4,
    title: '10.000+ Usuários',
    description: 'Chegamos a 10 mil estudantes ativos na plataforma! Obrigado por fazer parte desta jornada.',
    date: '10 Set 2025',
    type: 'success',
    icon: <Users className="w-6 h-6" />
  },
  {
    id: 5,
    title: 'Banco de Questões Expandido',
    description: 'Mais de 5.000 questões atualizadas de residência médica com explicações detalhadas e referências.',
    date: '5 Set 2025',
    type: 'feature',
    icon: <TrendingUp className="w-6 h-6" />
  }
];

export default function UpdatesSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % updates.length);
    }, 5000); // Auto-advance every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % updates.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + updates.length) % updates.length);
  };

  const getTypeColor = (type: Update['type']) => {
    switch (type) {
      case 'feature':
        return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30';
      case 'improvement':
        return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
      case 'announcement':
        return 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30';
      case 'success':
        return 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30';
      default:
        return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const currentUpdate = updates[currentIndex];

  return (
    <div className="w-full h-full bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold theme-text-primary mb-2">
          Atualizações da Plataforma
        </h3>
        <p className="text-sm theme-text-secondary">
          Fique por dentro das novidades
        </p>
      </div>

      {/* Content */}
      <div 
        className="relative h-80 flex items-center justify-center p-6"
        onMouseEnter={() => setIsAutoPlay(false)}
        onMouseLeave={() => setIsAutoPlay(true)}
      >
        {/* Update Content */}
        <div className="text-center space-y-4 max-w-sm">
          {/* Icon */}
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${getTypeColor(currentUpdate.type)}`}>
            {currentUpdate.icon}
          </div>

          {/* Title */}
          <h4 className="text-xl font-bold theme-text-primary">
            {currentUpdate.title}
          </h4>

          {/* Description */}
          <p className="theme-text-secondary text-sm leading-relaxed">
            {currentUpdate.description}
          </p>

          {/* Date */}
          <div className="flex items-center justify-center space-x-2 text-xs theme-text-tertiary">
            <Calendar className="w-4 h-4" />
            <span>{currentUpdate.date}</span>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white dark:bg-gray-700 shadow-md hover:shadow-lg transition-shadow theme-text-secondary hover:theme-text-primary"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white dark:bg-gray-700 shadow-md hover:shadow-lg transition-shadow theme-text-secondary hover:theme-text-primary"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Indicators */}
      <div className="flex justify-center space-x-2 p-4 border-t border-gray-200 dark:border-gray-700">
        {updates.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-blue-600 dark:bg-blue-400 w-6'
                : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
            }`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-center space-x-2 text-xs theme-text-tertiary">
          <div className={`w-2 h-2 rounded-full ${isAutoPlay ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
          <span>{isAutoPlay ? 'Atualizando automaticamente' : 'Pausado'}</span>
        </div>
      </div>
    </div>
  );
}