import { Search, RotateCcw } from 'lucide-react';

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
  exams
}: QuestionsFiltersProps) {
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('Todas');
    setSelectedDifficulty('Todas');
    setSelectedExam('Todas');
  };

  const hasActiveFilters = searchTerm || 
    selectedCategory !== 'Todas' || 
    selectedDifficulty !== 'Todas' || 
    selectedExam !== 'Todas';

  return (
    <div className="mb-6">
      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar questões..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
        </div>
      </div>

      {/* Filters Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Categoria</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          >
            {categories.map(category => (
              <option key={category} value={category} className="bg-slate-800">
                {category === 'Todas' ? 'Todas' : category}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Dificuldade</label>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          >
            {difficulties.map(difficulty => (
              <option key={difficulty} value={difficulty} className="bg-slate-800">
                {difficulty === 'Todas' ? 'Todas' : difficulty}
              </option>
            ))}
          </select>
        </div>

        {/* Exam */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Prova</label>
          <select
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
            className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          >
            {exams.map(exam => (
              <option key={exam} value={exam} className="bg-slate-800">
                {exam === 'Todas' ? 'Todas' : exam}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Reset Button */}
      {hasActiveFilters && (
        <div className="flex justify-end">
          <button
            onClick={handleResetFilters}
            className="penaped-btn penaped-btn-outline flex items-center space-x-2 text-sm"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Limpar Filtros</span>
          </button>
        </div>
      )}
    </div>
  );
}