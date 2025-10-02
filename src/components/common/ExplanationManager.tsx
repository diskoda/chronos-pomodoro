import React, { useState } from 'react';
import { Search, Filter, Book, Lightbulb, AlertTriangle, Stethoscope, GraduationCap, Target } from 'lucide-react';
import { useExplanationSearch, useExplanationCategories } from '../../hooks/useExplanations';
import TextExplanation from './TextExplanation';

interface ExplanationManagerProps {
  className?: string;
}

export const ExplanationManager: React.FC<ExplanationManagerProps> = ({ className = '' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const { results, loading, search, searchByCategory, searchByType, clearResults } = useExplanationSearch();
  const { categories } = useExplanationCategories();

  const explanationTypes = [
    { id: 'definition', name: 'Definições', icon: <Book className="w-4 h-4" />, color: 'text-blue-600' },
    { id: 'concept', name: 'Conceitos', icon: <Lightbulb className="w-4 h-4" />, color: 'text-purple-600' },
    { id: 'medical', name: 'Termos Médicos', icon: <Stethoscope className="w-4 h-4" />, color: 'text-teal-600' },
    { id: 'educational', name: 'Educacional', icon: <GraduationCap className="w-4 h-4" />, color: 'text-indigo-600' },
    { id: 'tip', name: 'Dicas', icon: <Target className="w-4 h-4" />, color: 'text-amber-600' },
    { id: 'important', name: 'Importante', icon: <AlertTriangle className="w-4 h-4" />, color: 'text-red-600' },
    { id: 'warning', name: 'Avisos', icon: <AlertTriangle className="w-4 h-4" />, color: 'text-orange-600' },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      search(query);
      setIsOpen(true);
    } else {
      clearResults();
      setIsOpen(false);
    }
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    setSelectedType('');
    if (category) {
      searchByCategory(category);
      setIsOpen(true);
    } else {
      clearResults();
      setIsOpen(false);
    }
  };

  const handleTypeFilter = (type: string) => {
    setSelectedType(type);
    setSelectedCategory('');
    if (type) {
      searchByType(type);
      setIsOpen(true);
    } else {
      clearResults();
      setIsOpen(false);
    }
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedType('');
    clearResults();
    setIsOpen(false);
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Gerenciador de Explicações
        </h3>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Buscar explicações..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Filters */}
        <div className="space-y-3">
          {/* Type Filters */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Filtrar por Tipo:
            </label>
            <div className="flex flex-wrap gap-2">
              {explanationTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleTypeFilter(selectedType === type.id ? '' : type.id)}
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    selectedType === type.id
                      ? `${type.color} bg-current bg-opacity-10 border border-current`
                      : 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {type.icon}
                  {type.name}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filters */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Filtrar por Categoria:
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Todas as categorias</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          {(searchQuery || selectedCategory || selectedType) && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Limpar filtros
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      {isOpen && (
        <div className="p-4">
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Buscando...</p>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-3">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {results.length} resultado(s) encontrado(s)
              </p>
              {results.map((explanation) => (
                <div
                  key={explanation.id}
                  className="p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {explanation.icon && <span>{explanation.icon}</span>}
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {explanation.title || explanation.id}
                        </h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          explanation.type === 'important' ? 'bg-red-100 text-red-700' :
                          explanation.type === 'warning' ? 'bg-orange-100 text-orange-700' :
                          explanation.type === 'medical' ? 'bg-teal-100 text-teal-700' :
                          explanation.type === 'educational' ? 'bg-indigo-100 text-indigo-700' :
                          explanation.type === 'tip' ? 'bg-amber-100 text-amber-700' :
                          explanation.type === 'concept' ? 'bg-purple-100 text-purple-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {explanation.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {explanation.content.length > 150
                          ? `${explanation.content.substring(0, 150)}...`
                          : explanation.content
                        }
                      </p>
                      {explanation.category && (
                        <span className="inline-block text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                          {explanation.category}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Exemplo de uso */}
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                    <p className="text-xs text-gray-500 mb-1">Exemplo de uso:</p>
                    <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded text-sm">
                      <code className="text-pink-600 dark:text-pink-400">
                        &lt;TextExplanation explanationId="{explanation.id}"&gt;
                      </code>
                      <br />
                      <span className="ml-4 text-gray-700 dark:text-gray-300">Texto a ser explicado</span>
                      <br />
                      <code className="text-pink-600 dark:text-pink-400">
                        &lt;/TextExplanation&gt;
                      </code>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Filter className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Nenhuma explicação encontrada
              </p>
            </div>
          )}
        </div>
      )}

      {/* Exemplos de uso */}
      {!isOpen && (
        <div className="p-4 bg-gray-50 dark:bg-gray-900">
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">Exemplos de Uso:</h4>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Termo médico com hover:</p>
              <div className="bg-white dark:bg-gray-800 p-3 rounded border">
                Durante a <TextExplanation explanationId="anamnese">anamnese</TextExplanation>, é importante coletar todas as informações relevantes.
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Conceito educacional:</p>
              <div className="bg-white dark:bg-gray-800 p-3 rounded border">
                A <TextExplanation explanationId="gamificacao-educacao" theme="medical">gamificação</TextExplanation> pode aumentar significativamente o engajamento dos estudantes.
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Aviso importante:</p>
              <div className="bg-white dark:bg-gray-800 p-3 rounded border">
                Verifique sempre as <TextExplanation explanationId="contraindicacao" variant="hover">contraindicações</TextExplanation> antes de prescrever.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExplanationManager;