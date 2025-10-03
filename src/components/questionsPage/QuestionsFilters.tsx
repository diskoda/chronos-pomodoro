import { Search, RotateCcw, ChevronDown } from 'lucide-react';

interface QuestionsFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedDifficulty: string;
  setSelectedDifficulty: (difficulty: string) => void;
  selectedExam: string;
  setSelectedExam: (exam: string) => void;
  categories: string[];
  difficulties: string[];
  exams: string[];
  useFirebase?: boolean;
  setUseFirebase?: (use: boolean) => void;
}

export default function QuestionsFilters({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedDifficulty,
  setSelectedDifficulty,
  selectedExam,
  setSelectedExam,
  categories,
  difficulties,
  exams,
  useFirebase,
  setUseFirebase
}: QuestionsFiltersProps) {
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('Todas');
    setSelectedDifficulty('Todas');
    setSelectedExam('Todas');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex flex-wrap items-center gap-4">
        {/* Search Bar */}
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar questões..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Category Dropdown */}
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-8 text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[120px]"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'Todas' ? '📋 Todas' : `📝 ${category}`}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>

        {/* Difficulty Dropdown */}
        <div className="relative">
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-8 text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[110px]"
          >
            {difficulties.map(difficulty => (
              <option key={difficulty} value={difficulty}>
                {difficulty === 'Todas' ? '🎯 Todas' : 
                 difficulty === 'Fácil' ? '🟢 Fácil' :
                 difficulty === 'Médio' ? '🟡 Médio' : '🔴 Difícil'}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>

        {/* Exam Dropdown */}
        <div className="relative">
          <select
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
            className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-8 text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[130px]"
          >
            {exams.map(exam => (
              <option key={exam} value={exam}>
                {exam === 'Todas' ? '🏥 Todas' : `🏥 ${exam}`}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>

        {/* Firebase Toggle */}
        {setUseFirebase && (
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="firebase-toggle"
              checked={useFirebase || false}
              onChange={(e) => setUseFirebase(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="firebase-toggle" className="text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
              🔥 Firebase
            </label>
          </div>
        )}

        {/* Reset Button */}
        <button
          onClick={handleResetFilters}
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          title="Limpar Filtros"
        >
          <RotateCcw className="h-4 w-4" />
          <span className="hidden sm:inline">Limpar</span>
        </button>
      </div>
    </div>
  );
}