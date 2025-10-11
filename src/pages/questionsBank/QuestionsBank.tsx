import { useState, useMemo } from 'react';
import {
  QuestionsHeader,
  QuestionsStats,
  QuestionsFilters,
  QuestionsList,
  AttemptsStats
} from './components';
import { useQuestions } from '../../hooks/useQuestions';
import { FIREBASE_CONFIG } from '../../config/firebase';
import { 
  allQuestions,
  availableCategories,
  availableDifficulties, 
  availableExams
} from '../../data/questions';

export default function QuestionsBank() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Todas');
  const [selectedExam, setSelectedExam] = useState('Todas');
  const [useFirebase] = useState(FIREBASE_CONFIG.USE_FIREBASE);

  // Tentar usar Firebase primeiro, fallback para dados locais
  const { questions: firebaseQuestions, error } = useQuestions();

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
        difficulties: ['Todas', 'Fácil', 'Médio', 'Difícil'],
        exams: ['Todas', ...Array.from(examsSet).sort()]
      };
    } else {
      // Fallback para dados locais
      return {
        questions: allQuestions || [],
        categories: availableCategories || ['Todas'],
        difficulties: availableDifficulties || ['Todas'],
        exams: availableExams || ['Todas']
      };
    }
  }, [useFirebase, firebaseQuestions, error]);

  const filteredQuestions = useMemo(() => {
    // Garantir que questions é sempre um array
    const questionsArray = questions || [];
    
    return questionsArray.filter(question => {
      if (!question) return false;
      
      const matchesSearch = !searchTerm || 
        (question.title && question.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (question.tags && Array.isArray(question.tags) && question.tags.some(tag => 
          tag && tag.toLowerCase().includes(searchTerm.toLowerCase())
        ));
      
      const matchesCategory = selectedCategory === 'Todas' || 
        (question.category && (Array.isArray(question.category) 
          ? question.category.includes(selectedCategory)
          : question.category === selectedCategory));
      
      const matchesDifficulty = selectedDifficulty === 'Todas' || 
        (question.difficulty && question.difficulty === selectedDifficulty);
      
      const matchesExam = selectedExam === 'Todas' || 
        (question.exam && question.exam === selectedExam);
      
      return matchesSearch && matchesCategory && matchesDifficulty && matchesExam;
    });
  }, [questions, searchTerm, selectedCategory, selectedDifficulty, selectedExam]);

  const stats = useMemo(() => {
    // Garantir que questions é sempre um array
    const questionsArray = questions || [];
    const total = questionsArray.length;
    const completed = questionsArray.filter(q => q && q.completed).length;
    const avgCorrectRate = completed > 0 
      ? Math.round(questionsArray.filter(q => q && q.completed).reduce((sum, q) => sum + (q.correctRate || 0), 0) / completed)
      : 0;

    return { total, completed, avgCorrectRate };
  }, [questions]);

  return (
    <div className="dashboard-background">
      <QuestionsHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <QuestionsStats stats={stats} />
        
        {/* Estatísticas das tentativas */}
        <AttemptsStats />

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
            />
          </div>
        </div>
      </div>
    </div>
  );
}
