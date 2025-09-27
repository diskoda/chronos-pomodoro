import { useState } from 'react';
import QuestionsHeader from '../components/questionsPage/QuestionsHeader';
import QuestionsStats from '../components/questionsPage/QuestionsStats';
import QuestionsFilters from '../components/questionsPage/QuestionsFilters';
import QuestionsList from '../components/questionsPage/QuestionsList';

interface Question {
  id: number;
  title: string;
  category: string;
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
  completed: boolean;
  correctRate: number;
  timeEstimate: number;
  tags: string[];
}

export default function QuestionsBank() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Todas');

  const questions: Question[] = [
    {
      id: 1,
      title: "Febre em lactente de 2 meses - Abordagem inicial",
      category: "Emergência Pediátrica",
      difficulty: "Difícil",
      completed: true,
      correctRate: 85,
      timeEstimate: 5,
      tags: ["Febre", "Lactente", "Emergência"]
    },
    {
      id: 2,
      title: "Vacinação em prematuros - Esquema especial",
      category: "Pediatria Geral",
      difficulty: "Médio",
      completed: false,
      correctRate: 0,
      timeEstimate: 3,
      tags: ["Vacinação", "Prematuro", "Imunização"]
    },
    {
      id: 3,
      title: "Cardiopatias congênitas cianóticas - Diagnóstico diferencial",
      category: "Cardiologia Pediátrica",
      difficulty: "Difícil",
      completed: false,
      correctRate: 0,
      timeEstimate: 8,
      tags: ["Cardiopatia", "Cianose", "Congênito"]
    },
    {
      id: 4,
      title: "Crescimento e desenvolvimento - Marcos do desenvolvimento",
      category: "Pediatria Geral",
      difficulty: "Fácil",
      completed: true,
      correctRate: 92,
      timeEstimate: 4,
      tags: ["Crescimento", "Desenvolvimento", "Marcos"]
    },
    {
      id: 5,
      title: "Síndrome do desconforto respiratório - RN prematuro",
      category: "Neonatologia",
      difficulty: "Difícil",
      completed: false,
      correctRate: 0,
      timeEstimate: 6,
      tags: ["SDR", "Prematuro", "Respiratório"]
    },
    {
      id: 6,
      title: "Diarréia aguda em crianças - Manejo clínico",
      category: "Emergência Pediátrica",
      difficulty: "Médio",
      completed: true,
      correctRate: 78,
      timeEstimate: 4,
      tags: ["Diarréia", "Desidratação", "Emergência"]
    }
  ];

  const categories = [
    "Todas", "Pediatria Geral", "Emergência Pediátrica", 
    "Neonatologia", "Cardiologia Pediátrica"
  ];

  const difficulties = ["Todas", "Fácil", "Médio", "Difícil"];

  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'Todas' || question.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'Todas' || question.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const stats = {
    total: questions.length,
    completed: questions.filter(q => q.completed).length,
    avgCorrectRate: Math.round(
      questions.filter(q => q.completed).reduce((sum, q) => sum + q.correctRate, 0) / 
      questions.filter(q => q.completed).length
    ) || 0
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil': return 'text-green-600 bg-green-100';
      case 'Médio': return 'text-yellow-600 bg-yellow-100';
      case 'Difícil': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen theme-bg-secondary">
      <QuestionsHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <QuestionsStats stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <QuestionsFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedDifficulty={selectedDifficulty}
              setSelectedDifficulty={setSelectedDifficulty}
              categories={categories}
              difficulties={difficulties}
            />
          </div>

          {/* Questions List */}
          <div className="lg:col-span-3">
            <QuestionsList 
              filteredQuestions={filteredQuestions}
              getDifficultyColor={getDifficultyColor}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
