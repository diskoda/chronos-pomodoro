import { Search, RotateCcw, ChevronDown, Zap, Target, Building } from 'lucide-react';

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

  return (
    <div className="relative mb-6">
      {/* Cyber Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-orange-900/20 to-teal-900/20 rounded-2xl blur-sm opacity-60"></div>
      
      {/* Main Filter Container */}
      <div className="relative bg-gradient-to-r from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-lg border border-purple-500/30 rounded-2xl p-6 shadow-2xl">
        {/* Animated Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 via-orange-600/20 to-teal-600/20 rounded-2xl blur opacity-75 animate-pulse"></div>
        
        <div className="relative">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-teal-400 rounded-full blur opacity-60"></div>
              <div className="relative w-10 h-10 bg-gradient-to-r from-purple-500 to-teal-500 rounded-full flex items-center justify-center">
                <Search className="h-5 w-5 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-purple-400 via-orange-400 to-teal-400 bg-clip-text text-transparent">
                Neural Search Engine
              </h3>
              <p className="text-sm text-slate-400 font-medium">
                Sistema de filtros avançado
              </p>
            </div>
            
            {/* Neural Activity Indicator */}
            <div className="ml-auto flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping"></div>
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
              </div>
              <span className="text-xs text-slate-400 font-medium">ATIVO</span>
            </div>
          </div>

          {/* Filters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Bar */}
            <div className="lg:col-span-2">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-teal-400 rounded-xl blur opacity-0 group-focus-within:opacity-50 transition-opacity duration-300"></div>
                <div className="relative bg-slate-800/60 border border-slate-600/40 rounded-xl overflow-hidden">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <Search className="h-5 w-5 text-purple-400 group-focus-within:text-purple-300 transition-colors duration-300" />
                  </div>
                  <input
                    type="text"
                    placeholder="Buscar questões..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-transparent pl-12 pr-4 py-4 text-white placeholder-slate-400 focus:outline-none focus:placeholder-slate-300 transition-all duration-300"
                  />
                  {/* Search Line Animation */}
                  <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-teal-400 w-0 group-focus-within:w-full transition-all duration-500"></div>
                </div>
              </div>
            </div>

            {/* Category Dropdown */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-purple-400 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative bg-slate-800/60 border border-slate-600/40 rounded-xl overflow-hidden">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Zap className="h-5 w-5 text-orange-400 group-hover:text-orange-300 transition-colors duration-300" />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-transparent pl-12 pr-4 py-4 text-white appearance-none focus:outline-none cursor-pointer"
                >
                  {categories.map(category => (
                    <option key={category} value={category} className="bg-slate-800 text-white">
                      {category === 'Todas' ? 'Todas Categorias' : category}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none group-hover:text-orange-300 transition-colors duration-300" />
              </div>
            </div>

            {/* Difficulty Dropdown */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-purple-400 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative bg-slate-800/60 border border-slate-600/40 rounded-xl overflow-hidden">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Target className="h-5 w-5 text-teal-400 group-hover:text-teal-300 transition-colors duration-300" />
                </div>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full bg-transparent pl-12 pr-4 py-4 text-white appearance-none focus:outline-none cursor-pointer"
                >
                  {difficulties.map(difficulty => (
                    <option key={difficulty} value={difficulty} className="bg-slate-800 text-white">
                      {difficulty === 'Todas' ? 'Todas Dificuldades' : 
                       difficulty === 'Fácil' ? '🟢 Fácil' :
                       difficulty === 'Médio' ? '🟡 Médio' : '🔴 Difícil'}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none group-hover:text-teal-300 transition-colors duration-300" />
              </div>
            </div>

            {/* Exam Dropdown */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-orange-400 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative bg-slate-800/60 border border-slate-600/40 rounded-xl overflow-hidden">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Building className="h-5 w-5 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" />
                </div>
                <select
                  value={selectedExam}
                  onChange={(e) => setSelectedExam(e.target.value)}
                  className="w-full bg-transparent pl-12 pr-4 py-4 text-white appearance-none focus:outline-none cursor-pointer"
                >
                  {exams.map(exam => (
                    <option key={exam} value={exam} className="bg-slate-800 text-white">
                      {exam === 'Todas' ? 'Todas Provas' : exam}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none group-hover:text-purple-300 transition-colors duration-300" />
              </div>
            </div>

            {/* Reset Button */}
            <div className="lg:col-span-4 flex justify-center mt-2">
              <button
                onClick={handleResetFilters}
                className="group relative overflow-hidden px-6 py-3 bg-gradient-to-r from-slate-700 to-slate-800 border border-slate-600/40 rounded-xl hover:from-slate-600 hover:to-slate-700 transition-all duration-300 transform hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center gap-2 text-slate-300 group-hover:text-white transition-colors duration-300">
                  <RotateCcw className="h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
                  <span className="font-medium">Reset Neural Filters</span>
                </div>
              </button>
            </div>
          </div>

          {/* Neural Network Pattern */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
            <div className="absolute top-4 left-8 w-1 h-1 bg-purple-400 rounded-full animate-ping"></div>
            <div className="absolute top-8 right-12 w-1 h-1 bg-orange-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-6 left-1/3 w-1 h-1 bg-teal-400 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-4 right-1/4 w-1 h-1 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}