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
      {/* Header futurista com controles */}
      <div className="relative mb-6">
        {/* Cyber Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/20 via-purple-900/20 to-teal-900/20 rounded-xl blur-sm opacity-60"></div>
        
        {/* Main Header Container */}
        <div className="relative bg-gradient-to-r from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-lg border border-orange-500/30 rounded-xl p-4 shadow-2xl">
          {/* Animated Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-600/20 via-purple-600/20 to-teal-600/20 rounded-xl blur opacity-75 animate-pulse"></div>
          
          <div className="relative flex justify-between items-center">
            {/* Left Side - Title and Badge */}
            <div className="flex items-center gap-4">
              {/* Cyber Title */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="text-2xl animate-pulse">🧠</div>
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-teal-400 rounded-full animate-ping"></div>
                </div>
                <div>
                  <h2 className="text-lg font-bold bg-gradient-to-r from-orange-400 via-purple-400 to-teal-400 bg-clip-text text-transparent">
                    Neural Bank
                  </h2>
                  <div className="text-sm text-slate-400 font-medium">
                    {questions.length} questõe{questions.length !== 1 ? 's' : ''} disponívei{questions.length !== 1 ? 's' : 's'}
                  </div>
                </div>
              </div>
              
              {/* Status Badge */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-teal-400 rounded-full blur opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="relative bg-gradient-to-r from-green-500 to-teal-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span>Sistema Ativo</span>
                </div>
              </div>
            </div>

            {/* Right Side - View Controls */}
            <div className="flex items-center gap-3">
              {/* Neural Network Indicator */}
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-orange-400 rounded-full animate-ping"></div>
                  <div className="w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                  <div className="w-1 h-1 bg-teal-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                </div>
                <span className="ml-2 font-medium">NEURAL</span>
              </div>

              {/* View Mode Controls */}
              <div className="flex gap-2 bg-slate-800/60 p-1 rounded-lg border border-slate-600/40">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    viewMode === 'grid'
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/60'
                  }`}
                  title="Grade Neural"
                >
                  {viewMode === 'grid' && (
                    <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-md blur opacity-50"></div>
                  )}
                  <span className="relative flex items-center gap-2">
                    <span>⊞</span>
                    <span className="hidden sm:inline">Grade</span>
                  </span>
                </button>
                
                <button
                  onClick={() => setViewMode('list')}
                  className={`relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    viewMode === 'list'
                      ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/25'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/60'
                  }`}
                  title="Lista Neural"
                >
                  {viewMode === 'list' && (
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-purple-600 rounded-md blur opacity-50"></div>
                  )}
                  <span className="relative flex items-center gap-2">
                    <span>☰</span>
                    <span className="hidden sm:inline">Lista</span>
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Neural Connection Lines */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30">
            <svg className="w-full h-full" style={{ position: 'absolute' }}>
              <defs>
                <linearGradient id="neuralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f97316" stopOpacity="0.3"/>
                  <stop offset="50%" stopColor="#a855f7" stopOpacity="0.3"/>
                  <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.3"/>
                </linearGradient>
              </defs>
              <line x1="10%" y1="20%" x2="90%" y2="80%" stroke="url(#neuralGrad)" strokeWidth="1" className="animate-pulse"/>
              <line x1="20%" y1="80%" x2="80%" y2="20%" stroke="url(#neuralGrad)" strokeWidth="1" className="animate-pulse" style={{ animationDelay: '1s' }}/>
            </svg>
          </div>
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

      {/* Footer Futurista Neural */}
      <div className="relative mt-8">
        {/* Cyber Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/20 via-purple-900/20 to-orange-900/20 rounded-xl blur-sm opacity-50"></div>
        
        {/* Main Footer Container */}
        <div className="relative bg-gradient-to-r from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-lg border border-teal-500/20 rounded-xl p-4 shadow-xl">
          {/* Animated Border Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-teal-600/20 via-purple-600/20 to-orange-600/20 rounded-xl blur opacity-60 animate-pulse"></div>
          
          <div className="relative">
            {/* Neural Stats */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {/* Dr. Skoda Mode */}
              <div className="flex items-center gap-3 group">
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-orange-500/25">
                    🧑‍⚕️
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900"></div>
                </div>
                <div>
                  <div className="text-orange-300 font-semibold">Dr. Skoda Neural</div>
                  <div className="text-slate-400 text-xs">{questions.length} questões processadas</div>
                </div>
              </div>

              {/* Divisor Neural */}
              <div className="flex items-center">
                <div className="w-px h-8 bg-gradient-to-b from-transparent via-slate-600 to-transparent"></div>
              </div>

              {/* Simulado Mode */}
              <div className="flex items-center gap-3 group">
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-purple-500/25">
                    📊
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-teal-400 rounded-full border-2 border-slate-900"></div>
                </div>
                <div>
                  <div className="text-purple-300 font-semibold">Simulado Neural</div>
                  <div className="text-slate-400 text-xs">{questions.length} questões sincronizadas</div>
                </div>
              </div>
            </div>
            
            {/* Neural Network Info */}
            <div className="mt-4 text-center">
              <div className="inline-flex items-center gap-2 text-xs text-slate-400 bg-slate-800/60 px-3 py-2 rounded-full border border-slate-600/40">
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-orange-400 rounded-full animate-ping"></div>
                  <div className="w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '0.3s' }}></div>
                  <div className="w-1 h-1 bg-teal-400 rounded-full animate-ping" style={{ animationDelay: '0.6s' }}></div>
                </div>
                <span className="font-medium">REDE NEURAL ATIVA</span>
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                  <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                </div>
              </div>
            </div>

            {/* Mode Description */}
            <div className="mt-3 text-center">
              <div className="text-xs text-slate-500 font-medium">
                🎯 <span className="text-teal-400">Dual Neural Processing</span> - Dr. Skoda (padrão) e Simulado (avançado)
              </div>
            </div>
          </div>

          {/* Neural Connection Pattern */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
            <div className="absolute top-2 left-4 w-1 h-1 bg-teal-400 rounded-full animate-ping"></div>
            <div className="absolute top-4 right-6 w-1 h-1 bg-orange-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-3 left-1/3 w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-2 right-1/4 w-1 h-1 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '0.7s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}