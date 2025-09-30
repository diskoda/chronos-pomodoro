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

  return (
    <div className="theme-card rounded-lg">
      <div className="p-6 border-b theme-border">
        <h3 className="font-semibold theme-text-primary">Filtros</h3>
      </div>
      <div className="p-6 space-y-6">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium theme-text-primary mb-2">
            Buscar
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 theme-text-tertiary" />
            <input
              type="text"
              placeholder="Buscar questões..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="theme-input w-full pl-10 pr-3 py-2 rounded-lg"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium theme-text-primary mb-2">
            Categoria
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="theme-input w-full px-3 py-2 rounded-lg"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Difficulty Filter */}
        <div>
          <label className="block text-sm font-medium theme-text-primary mb-2">
            Dificuldade
          </label>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="theme-input w-full px-3 py-2 rounded-lg"
          >
            {difficulties.map(difficulty => (
              <option key={difficulty} value={difficulty}>{difficulty}</option>
            ))}
          </select>
        </div>

        {/* Exam Filter */}
        <div>
          <label className="block text-sm font-medium theme-text-primary mb-2">
            Provas
          </label>
          <select
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
            className="theme-input w-full px-3 py-2 rounded-lg"
          >
            {exams.map(exam => (
              <option key={exam} value={exam}>{exam}</option>
            ))}
          </select>
        </div>

        {/* Reset Filters */}
        <button
          onClick={handleResetFilters}
          className="w-full flex items-center justify-center space-x-2 py-2 px-4 theme-border border rounded-lg theme-text-primary hover:theme-bg-secondary transition-colors"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Limpar Filtros</span>
        </button>
      </div>
    </div>
  );
}