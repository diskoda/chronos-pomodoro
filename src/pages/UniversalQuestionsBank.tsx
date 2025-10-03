import { useState, useMemo, useEffect } from 'react';
import QuestionsHeader from '../components/questionsPage/QuestionsHeader';
import QuestionsStats from '../components/questionsPage/QuestionsStats';
import QuestionsFilters from '../components/questionsPage/QuestionsFilters';
import UniversalQuestionsList from '../components/questionsPage/UniversalQuestionsList';
import AttemptsStats from '../components/questionsPage/AttemptsStats';
import { useQuestions } from '../hooks/useQuestions';
import { FIREBASE_CONFIG } from '../config/firebase';
import { 
  allQuestions,
  availableCategories,
  availableDifficulties, 
  availableExams
} from '../data/questions';
import { initializeUSPSP2025System } from '../data/uspSp2025FlowData';

export default function UniversalQuestionsBank() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Todas');
  const [selectedExam, setSelectedExam] = useState('Todas');
  const [useFirebase, setUseFirebase] = useState(FIREBASE_CONFIG.USE_FIREBASE);

  // Inicializar sistema universal
  useEffect(() => {
    const initSystem = async () => {
      try {
        await initializeUSPSP2025System();
        console.log('✅ Sistema Universal inicializado no QuestionsBank');
      } catch (error) {
        console.error('❌ Erro ao inicializar sistema universal:', error);
      }
    };

    initSystem();
  }, []);

  // Tentar usar Firebase primeiro, fallback para dados locais
  const { questions: firebaseQuestions, loading, error } = useQuestions();

  // Determinar qual fonte de dados usar
  const { questions, categories, difficulties, exams } = useMemo(() => {
    if (useFirebase && !error && firebaseQuestions && firebaseQuestions.length > 0) {
      // Usar dados do Firebase
      const categoriesSet = new Set<string>();
      const difficultiesSet = new Set<string>();
      const examsSet = new Set<string>();

      firebaseQuestions.forEach(question => {
        if (question && question.category) {
          if (Array.isArray(question.category)) {
            question.category.forEach(cat => categoriesSet.add(cat));
          } else {
            categoriesSet.add(question.category);
          }
        }
        if (question && question.difficulty) {
          difficultiesSet.add(question.difficulty);
        }
        if (question && question.exam) {
          examsSet.add(question.exam);
        }
      });

      return {
        questions: firebaseQuestions,
        categories: ['Todas', ...Array.from(categoriesSet).sort()],
        difficulties: ['Todas', ...Array.from(difficultiesSet).sort()],
        exams: ['Todas', ...Array.from(examsSet).sort()]
      };
    } else {
      // Usar dados locais como fallback
      return {
        questions: allQuestions,
        categories: availableCategories,
        difficulties: availableDifficulties,
        exams: availableExams
      };
    }
  }, [useFirebase, error, firebaseQuestions]);

  // Filtrar questões
  const filteredQuestions = useMemo(() => {
    return questions.filter(question => {
      // Filtro de busca
      const matchesSearch = !searchTerm || 
        question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.statement?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.id.toString().includes(searchTerm);

      // Filtro de categoria
      const matchesCategory = selectedCategory === 'Todas' || 
        (Array.isArray(question.category) 
          ? question.category.includes(selectedCategory)
          : question.category === selectedCategory);

      // Filtro de dificuldade
      const matchesDifficulty = selectedDifficulty === 'Todas' || 
        question.difficulty === selectedDifficulty;

      // Filtro de exame
      const matchesExam = selectedExam === 'Todas' || 
        question.exam === selectedExam;

      return matchesSearch && matchesCategory && matchesDifficulty && matchesExam;
    });
  }, [questions, searchTerm, selectedCategory, selectedDifficulty, selectedExam]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <QuestionsHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats */}
        <div className="mb-4">
          <QuestionsStats 
            stats={{
              total: questions.length,
              completed: filteredQuestions.filter(q => q.id <= 5).length, // Questões concluídas
              avgCorrectRate: 75 // Taxa média
            }}
          />
        </div>

        {/* Tentativas Stats */}
        <div className="mb-4">
          <AttemptsStats />
        </div>

        {/* Filtros */}
        <div className="mb-4">
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
            useFirebase={useFirebase}
            setUseFirebase={setUseFirebase}
          />
        </div>

        {/* Lista Universal de Questões */}
        <UniversalQuestionsList
          questions={filteredQuestions}
          loading={loading}
          error={error || undefined}
        />
      </div>
    </div>
  );
}