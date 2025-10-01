import { useState, useMemo } from 'react';
import QuestionsHeader from '../components/questionsPage/QuestionsHeader';
import QuestionsStats from '../components/questionsPage/QuestionsStats';
import QuestionsFilters from '../components/questionsPage/QuestionsFilters';
import QuestionsList from '../components/questionsPage/QuestionsList';
import { useQuestions } from '../hooks/useQuestions';
import { FIREBASE_CONFIG } from '../config/firebase';
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
  const [useFirebase, setUseFirebase] = useState(FIREBASE_CONFIG.USE_FIREBASE);

  // Tentar usar Firebase primeiro, fallback para dados locais
  const { questions: firebaseQuestions, loading, error } = useQuestions();

  // Determinar qual fonte de dados usar
  const { questions, categories, difficulties, exams, isUsingFirebase } = useMemo(() => {
    if (useFirebase && !error && firebaseQuestions.length > 0) {
      // Usar dados do Firebase
      const categoriesSet = new Set<string>();
      const difficultiesSet = new Set<string>();
      const examsSet = new Set<string>();

      firebaseQuestions.forEach(question => {
        if (Array.isArray(question.category)) {
          question.category.forEach(cat => categoriesSet.add(cat));
        } else {
          categoriesSet.add(question.category);
        }
        difficultiesSet.add(question.difficulty);
        examsSet.add(question.exam);
      });

      return {
        questions: firebaseQuestions,
        categories: ['Todas', ...Array.from(categoriesSet).sort()],
        difficulties: ['Todas', 'Fácil', 'Médio', 'Difícil'],
        exams: ['Todas', ...Array.from(examsSet).sort()],
        isUsingFirebase: true
      };
    } else {
      // Fallback para dados locais
      return {
        questions: allQuestions,
        categories: availableCategories,
        difficulties: availableDifficulties,
        exams: availableExams,
        isUsingFirebase: false
      };
    }
  }, [useFirebase, firebaseQuestions, error]);

  const filteredQuestions = useMemo(() => {
    return questions.filter(question => {
      const matchesSearch = !searchTerm || 
        question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'Todas' || 
        (Array.isArray(question.category) 
          ? question.category.includes(selectedCategory)
          : question.category === selectedCategory);
      
      const matchesDifficulty = selectedDifficulty === 'Todas' || 
        question.difficulty === selectedDifficulty;
      
      const matchesExam = selectedExam === 'Todas' || 
        question.exam === selectedExam;
      
      return matchesSearch && matchesCategory && matchesDifficulty && matchesExam;
    });
  }, [questions, searchTerm, selectedCategory, selectedDifficulty, selectedExam]);

  const stats = useMemo(() => {
    const total = questions.length;
    const completed = questions.filter(q => q.completed).length;
    const avgCorrectRate = completed > 0 
      ? Math.round(questions.filter(q => q.completed).reduce((sum, q) => sum + q.correctRate, 0) / completed)
      : 0;

    return { total, completed, avgCorrectRate };
  }, [questions]);

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
        
        {/* Status do Sistema */}
        <div className="mb-6">
          <div className={`p-3 rounded-lg border ${
            isUsingFirebase 
              ? 'bg-green-50 border-green-200' 
              : 'bg-yellow-50 border-yellow-200'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${
                  isUsingFirebase ? 'bg-green-500' : 'bg-yellow-500'
                }`}></div>
                <span className={`text-sm font-medium ${
                  isUsingFirebase ? 'text-green-800' : 'text-yellow-800'
                }`}>
                  {isUsingFirebase ? 'Conectado ao Firebase' : 'Usando dados locais'}
                </span>
                {loading && (
                  <div className="ml-2 animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                {error && (
                  <span className="text-sm text-red-600">
                    Erro Firebase: {error}
                  </span>
                )}
                <button
                  onClick={() => setUseFirebase(!useFirebase)}
                  className="text-sm text-blue-600 hover:text-blue-800 underline"
                >
                  {useFirebase ? 'Usar Local' : 'Tentar Firebase'}
                </button>
              </div>
            </div>
          </div>
        </div>

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