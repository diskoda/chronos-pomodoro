import { useState } from 'react';
import type { Question } from '../../data/types/Question';
import UniversalQuestionCard from './UniversalQuestionCard';

interface UniversalQuestionsListProps {
  questions: Question[];
  loading?: boolean;
  error?: string;
  className?: string;
}

export default function UniversalQuestionsList({ 
  questions, 
  loading = false, 
  error, 
  className = '' 
}: UniversalQuestionsListProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  if (loading) {
    return (
      <div className={`space-y-3 ${className}`}>
        {/* Loading Skeleton Compacto */}
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 animate-pulse">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2 w-3/4"></div>
                <div className="flex gap-2">
                  <div className="h-4 w-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  <div className="h-4 w-12 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  <div className="h-4 w-14 bg-gray-300 dark:bg-gray-600 rounded"></div>
                </div>
              </div>
              <div className="h-6 w-10 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded mb-3 w-full"></div>
            <div className="flex gap-2">
              <div className="h-8 w-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="h-8 w-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="h-8 w-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="text-red-600 dark:text-red-400 text-lg mb-4">
          ❌ Erro ao carregar questões
        </div>
        <p className="theme-text-secondary mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          🔄 Tentar Novamente
        </button>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="text-6xl mb-4">📚</div>
        <h3 className="text-xl font-semibold theme-text-primary mb-2">
          Nenhuma questão encontrada
        </h3>
        <p className="theme-text-secondary mb-6">
          Tente ajustar os filtros ou verifique sua conexão.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            🔄 Recarregar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Header compacto com controles */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-base font-semibold theme-text-primary">
            📋 {questions.length} questão{questions.length !== 1 ? 'ões' : ''}
          </h2>
          
          <div className="text-xs theme-text-secondary bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">
            ✅ Sistema Universal
          </div>
        </div>

        {/* Controles de visualização compactos */}
        <div className="flex gap-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded text-sm ${
              viewMode === 'grid'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 theme-text-secondary hover:bg-gray-200 dark:hover:bg-gray-600'
            } transition-colors`}
            title="Grade"
          >
            ⊞
          </button>
          
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded text-sm ${
              viewMode === 'list'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 theme-text-secondary hover:bg-gray-200 dark:hover:bg-gray-600'
            } transition-colors`}
            title="Lista"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Lista de questões */}
      <div className={
        viewMode === 'grid'
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
          : 'space-y-3'
      }>
        {questions.map((question) => (
          <UniversalQuestionCard
            key={question.id}
            question={question}
            className={viewMode === 'list' ? 'max-w-none' : ''}
            compact={viewMode === 'list'}
          />
        ))}
      </div>

      {/* Footer Compacto com estatísticas */}
      <div className="mt-6 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="flex flex-wrap justify-center gap-4 text-xs theme-text-secondary">
          <div className="flex items-center gap-1">
            🧑‍⚕️ <span>Dr. Skoda: {questions.length}</span>
          </div>
          <div className="flex items-center gap-1">
            📚 <span>Estudo: {questions.length}</span>
          </div>
          <div className="flex items-center gap-1">
            ⚡ <span>Rápido: {questions.length}</span>
          </div>
          <div className="flex items-center gap-1">
            🔄 <span>Revisão: {questions.length}</span>
          </div>
          <div className="flex items-center gap-1">
            📊 <span>Simulado: {questions.length}</span>
          </div>
        </div>
        
        <div className="text-center mt-2 text-xs theme-text-secondary">
          🎯 Sistema Universal ativo - 5 modos de estudo para cada questão
        </div>
      </div>
    </div>
  );
}