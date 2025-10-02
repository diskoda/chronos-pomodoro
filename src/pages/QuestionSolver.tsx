import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuestion } from '../hooks/useQuestions';
import QuestionSolverHeader from '../components/questionSolver/QuestionSolverHeader';
import QuestionInfo from '../components/common/QuestionInfo';
import QuestionStatement from '../components/questionSolver/QuestionStatement';
import QuestionAlternatives from '../components/questionSolver/QuestionAlternatives';
import QuestionActions from '../components/questionSolver/QuestionActions';
import QuestionNotFound from '../components/questionSolver/QuestionNotFound';
import { QuestionBegin, QuestionExplanation, QuestionAnalysis } from '../components/questionFlow';
import { getQuestionFlowData } from '../data/questionFlowData';

export default function QuestionSolver() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedAlternative, setSelectedAlternative] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Estados do fluxo do Dr. Skoda
  const [flowStage, setFlowStage] = useState<'begin' | 'question' | 'explanation' | 'analysis'>('begin');
  
  // Usar o hook Firebase para buscar a questão
  const { question, loading, error } = useQuestion(id || null);
  
  // Buscar dados do fluxo da questão
  const questionId = parseInt(id || '0');
  const flowData = getQuestionFlowData(questionId);

  const handleAlternativeSelect = (alternative: string) => {
    if (!isSubmitted && flowStage === 'question') {
      setSelectedAlternative(alternative);
    }
  };

  const handleSubmit = () => {
    if (selectedAlternative && flowStage === 'question') {
      setIsSubmitted(true);
      setFlowStage('explanation');
    }
  };

  const handleBack = () => {
    navigate('/study');
  };

  // Handlers do fluxo Dr. Skoda
  const handleBeginContinue = () => {
    setFlowStage('question');
  };

  const handleExplanationContinue = () => {
    setFlowStage('analysis');
  };

  const handleAnalysisFinish = () => {
    navigate('/study');
  };

  // Estados de loading e erro
  if (loading) {
    return (
      <div className="dashboard-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center min-h-96">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="theme-text-secondary">Carregando questão...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <QuestionNotFound 
        onBack={handleBack}
        message={error}
        buttonText="Voltar aos modos de estudo"
      />
    );
  }

  // Estado de questão não encontrada
  if (!question) {
    return (
      <QuestionNotFound 
        onBack={handleBack}
        message="Questão não encontrada"
        buttonText="Voltar aos modos de estudo"
      />
    );
  }

  return (
    <div className="dashboard-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Indicador de Progresso do Fluxo */}
          {flowStage === 'question' && (
            <div className="mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-blue-200 dark:border-blue-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Progresso do Fluxo</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Etapa 2 de 4</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500" style={{width: '50%'}}></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                  <span>✅ Introdução</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">📝 Resolução</span>
                  <span>💡 Explicação</span>
                  <span>🔍 Análise</span>
                </div>
              </div>
            </div>
          )}

          {/* Dr. Skoda Flow Dialogs */}
          {flowStage === 'begin' && flowData && (
            <QuestionBegin
              contextText={flowData.contextText}
              onContinue={handleBeginContinue}
            />
          )}

          {flowStage === 'explanation' && flowData && (
            <QuestionExplanation
              explanationText={flowData.explanationText}
              onContinue={handleExplanationContinue}
            />
          )}

          {flowStage === 'analysis' && flowData && selectedAlternative && (
            <QuestionAnalysis
              alternatives={flowData.alternativesAnalysis}
              selectedAlternative={selectedAlternative}
              onFinish={handleAnalysisFinish}
            />
          )}
          
          <QuestionSolverHeader 
            onBack={handleBack}
            backButtonText="Voltar"
          />

          <QuestionInfo 
            question={question}
            showTags={true}
            showTimeEstimate={true}
            className="mb-6"
          />

          {question.statement && (
            <div className="mb-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
                <QuestionStatement 
                  statement={question.statement}
                  className=""
                />
              </div>
            </div>
          )}

          {question.alternatives && flowStage === 'question' && (
            <div className="mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center">
                    <span className="mr-2">🎯</span>
                    Escolha a melhor alternativa:
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Analise cada opção cuidadosamente antes de decidir
                  </p>
                </div>
                <div className="p-6">
                  <QuestionAlternatives
                    alternatives={question.alternatives}
                    selectedAlternative={selectedAlternative}
                    onSelect={handleAlternativeSelect}
                    isSubmitted={isSubmitted}
                    className=""
                  />
                </div>
              </div>
            </div>
          )}

          {flowStage === 'question' && (
            <div className="text-center">
              <QuestionActions
                isSubmitted={isSubmitted}
                selectedAlternative={selectedAlternative}
                onSubmit={handleSubmit}
                onFinish={handleBack}
                submitButtonText={selectedAlternative ? "🚀 Confirmar Resposta" : "Selecione uma alternativa"}
                finishButtonText="Finalizar"
                feedbackMessage="Resposta enviada!"
              />
              
              {selectedAlternative && !isSubmitted && (
                <div className="mt-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                    <p className="text-sm text-blue-700 dark:text-blue-300 flex items-center justify-center">
                      <span className="mr-2">💡</span>
                      Você selecionou a alternativa <strong>{selectedAlternative}</strong>. Confirme sua resposta para continuar!
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}