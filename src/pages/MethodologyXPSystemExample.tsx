import { useState } from 'react';
import { BookOpen, Heart, Zap, Award, Clock, Target, Activity } from 'lucide-react';
import { useMethodologyXP, useMethodologyXPStats } from '../hooks/useMethodologyXP';
import { MethodologyXPOverview, MethodologyXPCompact } from '../components/xp/MethodologyXPBar';
import type { StudyMethodology } from '../types/xpMethodologies';

export default function MethodologyXPSystemExample() {
  const {
    overallLevel,
    methodologyLevels,
    userStats,
    recentActivities,
    loading,
    error,
    recordClinicalCaseActivity,
    recordQuestionActivity,
    recordFlashcardActivity,
    getTitleByMethodology,
    getFavoriteMethodology
  } = useMethodologyXP();

  const stats = useMethodologyXPStats();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Função para testar atividades
  const testActivity = async (methodology: StudyMethodology, activityType: string, metadata: any = {}) => {
    setIsSubmitting(true);
    try {
      let result;
      
      switch (methodology) {
        case 'clinical_cases':
          result = await recordClinicalCaseActivity(activityType as any, metadata);
          break;
        case 'questions':
          result = await recordQuestionActivity(activityType as any, metadata);
          break;
        case 'flashcards':
          result = await recordFlashcardActivity(activityType as any, metadata);
          break;
      }
      
      if (result?.leveledUp) {
        alert(`🎉 Parabéns! Você subiu para o nível ${result.newLevel} em ${methodology}!`);
      }
      
      if (result?.overallLevelUp) {
        alert(`🌟 Nível geral aumentou! Você está cada vez melhor!`);
      }
    } catch (err) {
      console.error('Erro ao testar atividade:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="theme-text-secondary">Carregando sistema XP...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Erro: {error}</p>
        </div>
      </div>
    );
  }

  const methodologyTitles = {
    clinical_cases: getTitleByMethodology('clinical_cases'),
    questions: getTitleByMethodology('questions'),
    flashcards: getTitleByMethodology('flashcards')
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold theme-text-primary mb-2">
            Sistema de XP por Metodologias
          </h1>
          <p className="theme-text-secondary">
            Acompanhe seu progresso em casos clínicos, questões e flashcards separadamente
          </p>
        </div>

        {/* Overview Geral */}
        {methodologyLevels && (
          <MethodologyXPOverview
            methodologyLevels={methodologyLevels}
            methodologyTitles={methodologyTitles}
            overallLevel={overallLevel?.overallLevel}
            totalXP={overallLevel?.totalXP}
            showDetails={true}
            className="mb-8"
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Estatísticas Rápidas */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cards de Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="theme-bg-primary rounded-lg border theme-border shadow-sm p-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                    <Activity className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold theme-text-primary">
                      {stats.totalActivities}
                    </p>
                    <p className="theme-text-secondary text-sm">
                      Atividades Totais
                    </p>
                  </div>
                </div>
              </div>

              <div className="theme-bg-primary rounded-lg border theme-border shadow-sm p-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
                    <Clock className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold theme-text-primary">
                      {Math.round(stats.totalTimeSpent / 60)}h
                    </p>
                    <p className="theme-text-secondary text-sm">
                      Tempo de Estudo
                    </p>
                  </div>
                </div>
              </div>

              <div className="theme-bg-primary rounded-lg border theme-border shadow-sm p-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
                    <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xl font-bold theme-text-primary capitalize">
                      {stats.favoriteMethodology === 'clinical_cases' ? 'Casos' : 
                       stats.favoriteMethodology === 'questions' ? 'Questões' : 'Flashcards'}
                    </p>
                    <p className="theme-text-secondary text-sm">
                      Metodologia Favorita
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Detalhes por Metodologia */}
            {userStats && (
              <div className="theme-bg-primary rounded-lg border theme-border shadow-sm p-6">
                <h3 className="text-lg font-semibold theme-text-primary mb-4">
                  Detalhes por Metodologia
                </h3>
                
                <div className="space-y-4">
                  {Object.entries(userStats.methodologyStats).map(([methodology, stats]) => {
                    const methodologyKey = methodology as StudyMethodology;
                    const icons = {
                      clinical_cases: Heart,
                      questions: BookOpen,
                      flashcards: Zap
                    };
                    const Icon = icons[methodologyKey];
                    
                    return (
                      <div key={methodology} className="border theme-border rounded-lg p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <Icon className="w-5 h-5 theme-text-primary" />
                          <h4 className="font-medium theme-text-primary capitalize">
                            {methodology.replace('_', ' ')}
                          </h4>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="theme-text-secondary">Nível</p>
                            <p className="font-semibold theme-text-primary">{stats.currentLevel}</p>
                          </div>
                          <div>
                            <p className="theme-text-secondary">XP Total</p>
                            <p className="font-semibold theme-text-primary">{stats.totalXP.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="theme-text-secondary">Streak Atual</p>
                            <p className="font-semibold theme-text-primary">{stats.currentStreak}</p>
                          </div>
                          <div>
                            <p className="theme-text-secondary">Performance</p>
                            <p className="font-semibold theme-text-primary">{Math.round(stats.averagePerformance)}%</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Atividades Recentes */}
            <div className="theme-bg-primary rounded-lg border theme-border shadow-sm p-6">
              <h3 className="text-lg font-semibold theme-text-primary mb-4">
                Atividades Recentes
              </h3>
              
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {recentActivities.map((activity, index) => {
                  const icons = {
                    clinical_cases: Heart,
                    questions: BookOpen,
                    flashcards: Zap
                  };
                  const Icon = icons[activity.methodology];
                  
                  return (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded">
                      <Icon className="w-4 h-4 theme-text-secondary" />
                      <div className="flex-1">
                        <p className="text-sm font-medium theme-text-primary">
                          {activity.description}
                        </p>
                        <p className="text-xs theme-text-secondary">
                          {activity.createdAt.toDate().toLocaleString()}
                        </p>
                      </div>
                      <div className="text-sm font-semibold text-green-600">
                        +{activity.xpGained} XP
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progresso Compacto */}
            {methodologyLevels && (
              <MethodologyXPCompact
                methodologyLevels={methodologyLevels}
                favoriteMethodology={getFavoriteMethodology()}
              />
            )}

            {/* Painel de Testes */}
            <div className="theme-bg-primary rounded-lg border theme-border shadow-sm p-6">
              <h3 className="text-lg font-semibold theme-text-primary mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Testar Sistema XP
              </h3>
              
              <div className="space-y-4">
                {/* Casos Clínicos */}
                <div>
                  <h4 className="font-medium theme-text-primary mb-2 flex items-center">
                    <Heart className="w-4 h-4 mr-2" />
                    Casos Clínicos
                  </h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => testActivity('clinical_cases', 'case_completed', { 
                        difficulty: 'medium', 
                        accuracy: 85,
                        timeSpent: 15 
                      })}
                      disabled={isSubmitting}
                      className="w-full text-left px-3 py-2 text-sm bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors disabled:opacity-50"
                    >
                      Caso Completado (+25 XP)
                    </button>
                    <button
                      onClick={() => testActivity('clinical_cases', 'case_perfect_score', { 
                        accuracy: 100 
                      })}
                      disabled={isSubmitting}
                      className="w-full text-left px-3 py-2 text-sm bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors disabled:opacity-50"
                    >
                      Pontuação Perfeita (+50 XP)
                    </button>
                  </div>
                </div>

                {/* Questões */}
                <div>
                  <h4 className="font-medium theme-text-primary mb-2 flex items-center">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Questões
                  </h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => testActivity('questions', 'question_correct', { 
                        difficulty: 'hard',
                        subject: 'Cardiologia',
                        timeSpent: 3 
                      })}
                      disabled={isSubmitting}
                      className="w-full text-left px-3 py-2 text-sm bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors disabled:opacity-50"
                    >
                      Questão Correta Difícil (+20 XP)
                    </button>
                    <button
                      onClick={() => testActivity('questions', 'quiz_completed', { 
                        questionsCount: 10 
                      })}
                      disabled={isSubmitting}
                      className="w-full text-left px-3 py-2 text-sm bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors disabled:opacity-50"
                    >
                      Quiz Completado (+30 XP)
                    </button>
                  </div>
                </div>

                {/* Flashcards */}
                <div>
                  <h4 className="font-medium theme-text-primary mb-2 flex items-center">
                    <Zap className="w-4 h-4 mr-2" />
                    Flashcards
                  </h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => testActivity('flashcards', 'card_mastered', { 
                        reviewQuality: 5,
                        timeSpent: 2 
                      })}
                      disabled={isSubmitting}
                      className="w-full text-left px-3 py-2 text-sm bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors disabled:opacity-50"
                    >
                      Card Dominado Perfeitamente (+23 XP)
                    </button>
                    <button
                      onClick={() => testActivity('flashcards', 'deck_completed', {})}
                      disabled={isSubmitting}
                      className="w-full text-left px-3 py-2 text-sm bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors disabled:opacity-50"
                    >
                      Deck Completado (+40 XP)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}