import { useState } from 'react';
import QuestionsHeader from '../components/questionsPage/QuestionsHeader';
import QuestionsStats from '../components/questionsPage/QuestionsStats';
import QuestionsFilters from '../components/questionsPage/QuestionsFilters';
import QuestionsList from '../components/questionsPage/QuestionsList';
import { 
  allQuestions,
  availableCategories,
  availableDifficulties, 
  availableExams
} from '../data/questions';

export default function QuestionsBank() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Todas');
  const [selectedExam, setSelectedExam] = useState('Todas');

  // Importa todas as questões do sistema centralizado
  const questions = allQuestions;
  const categories = availableCategories;
  const difficulties = availableDifficulties;
  const exams = availableExams;

  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'Todas' || 
      (Array.isArray(question.category) 
        ? question.category.includes(selectedCategory)
        : question.category === selectedCategory);
    
    const matchesDifficulty = selectedDifficulty === 'Todas' || question.difficulty === selectedDifficulty;
    const matchesExam = selectedExam === 'Todas' || question.exam === selectedExam;
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesExam;
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
    <div className="dashboard-background">
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
              selectedExam={selectedExam}
              setSelectedExam={setSelectedExam}
              categories={categories}
              difficulties={difficulties}
              exams={exams}
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
