import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, Clock, BookOpen, Target, CheckCircle } from 'lucide-react';
import { clinicalCases } from '../../data/clinicalCases';
import { CaseStartCountdown } from './CaseStartCountdown';
import { StepTransition } from './StepTransition';
import { CasePresentation } from './CasePresentation';
import { ErrorBoundary } from '../common/ErrorBoundary';

type CaseStep = 'countdown' | 'presentation' | 'knowledge-diagnosis' | 'learning-questions' | 'active-study' | 'conclusion';

const STEPS = [
  { id: 'presentation', label: 'Apresentação', icon: BookOpen },
  { id: 'knowledge-diagnosis', label: 'Diagnóstico de Conhecimento', icon: Target },
  { id: 'learning-questions', label: 'Questões de Aprendizagem', icon: BookOpen },
  { id: 'active-study', label: 'Estudo Ativo', icon: Clock },
  { id: 'conclusion', label: 'Conclusão', icon: CheckCircle },
] as const;

const ClinicalCase: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<CaseStep>('countdown');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const caseData = clinicalCases.find((c: any) => c.id === id);

  useEffect(() => {
    if (!caseData) {
      navigate('/clinical-cases');
      return;
    }

    // Load saved progress
    const savedProgress = localStorage.getItem(`clinical-case-${id}`);
    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress);
        setCurrentStep(progress.currentStep || 'countdown');
      } catch (error) {
        console.error('Error loading saved progress:', error);
      }
    }
  }, [id, caseData, navigate]);

  const saveProgress = (step: CaseStep, completedSteps: string[] = []) => {
    const progress = {
      currentStep: step,
      completedSteps,
      lastAccessed: new Date().toISOString(),
    };
    localStorage.setItem(`clinical-case-${id}`, JSON.stringify(progress));
  };

  const handleStepTransition = (nextStep: CaseStep) => {
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentStep(nextStep);
      saveProgress(nextStep);
      setIsTransitioning(false);
    }, 1000);
  };

  const handleCountdownComplete = () => {
    handleStepTransition('presentation');
  };

  const handleNextStep = () => {
    const currentIndex = STEPS.findIndex(step => step.id === currentStep);
    if (currentIndex < STEPS.length - 1) {
      const nextStep = STEPS[currentIndex + 1].id as CaseStep;
      handleStepTransition(nextStep);
    }
  };

  const handlePreviousStep = () => {
    const currentIndex = STEPS.findIndex(step => step.id === currentStep);
    if (currentIndex > 0) {
      const previousStep = STEPS[currentIndex - 1].id as CaseStep;
      handleStepTransition(previousStep);
    }
  };

  const handleGoToStep = (stepId: string) => {
    handleStepTransition(stepId as CaseStep);
  };

  const getCurrentStepIndex = () => {
    return STEPS.findIndex(step => step.id === currentStep);
  };

  if (!caseData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-white mb-4">Caso não encontrado</h2>
          <button
            onClick={() => navigate('/clinical-cases')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Voltar aos Casos
          </button>
        </div>
      </div>
    );
  }

  if (currentStep === 'countdown') {
    return (
      <CaseStartCountdown
        caseTitle={caseData.title}
        onComplete={handleCountdownComplete}
      />
    );
  }

  if (isTransitioning) {
    const currentStepIndex = getCurrentStepIndex();
    const nextStepIndex = currentStepIndex + 1;
    
    return (
      <StepTransition
        fromStep={STEPS[currentStepIndex]?.id || 'presentation'}
        toStep={nextStepIndex < STEPS.length ? STEPS[nextStepIndex].id : 'conclusion'}
        onComplete={() => setIsTransitioning(false)}
      />
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-600 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/clinical-cases')}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Voltar</span>
              </button>
              <div className="w-px h-6 bg-gray-600"></div>
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
              >
                <Home className="w-5 h-5" />
                <span>Dashboard</span>
              </button>
            </div>

            <div className="text-center">
              <h1 className="text-lg font-semibold text-white">{caseData.title}</h1>
              <div className="text-sm text-gray-400">
                Passo {getCurrentStepIndex() + 1} de {STEPS.length}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-400">
                {caseData.difficulty === 'basic' && '🟢 Básico'}
                {caseData.difficulty === 'intermediate' && '🟡 Intermediário'}
                {caseData.difficulty === 'advanced' && '🔴 Avançado'}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center space-x-2">
              {STEPS.map((step, index) => {
                const isActive = step.id === currentStep;
                const isCompleted = index < getCurrentStepIndex();
                const StepIcon = step.icon;

                return (
                  <React.Fragment key={step.id}>
                    <button
                      onClick={() => handleGoToStep(step.id)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-all ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-lg scale-105'
                          : isCompleted
                          ? 'bg-green-600/20 text-green-400 hover:bg-green-600/30'
                          : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700'
                      }`}
                    >
                      <StepIcon className="w-4 h-4" />
                      <span className="hidden md:inline">{step.label}</span>
                      <span className="md:hidden">{index + 1}</span>
                    </button>
                    {index < STEPS.length - 1 && (
                      <div className={`w-8 h-0.5 ${isCompleted ? 'bg-green-400' : 'bg-gray-600'}`}></div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {currentStep === 'presentation' && (
          <CasePresentation caseData={caseData} />
        )}

        {currentStep === 'knowledge-diagnosis' && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🧠</div>
            <h2 className="text-2xl font-bold text-white mb-4">Diagnóstico de Conhecimento</h2>
            <p className="text-gray-400 mb-8">Este componente será implementado em breve</p>
          </div>
        )}

        {currentStep === 'learning-questions' && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-2xl font-bold text-white mb-4">Questões de Aprendizagem</h2>
            <p className="text-gray-400 mb-8">Este componente será implementado em breve</p>
          </div>
        )}

        {currentStep === 'active-study' && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">⚡</div>
            <h2 className="text-2xl font-bold text-white mb-4">Estudo Ativo</h2>
            <p className="text-gray-400 mb-8">Este componente será implementado em breve</p>
          </div>
        )}

        {currentStep === 'conclusion' && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎯</div>
            <h2 className="text-2xl font-bold text-white mb-4">Conclusão</h2>
            <p className="text-gray-400 mb-8">Este componente será implementado em breve</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800/90 backdrop-blur-sm border-t border-gray-600">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handlePreviousStep}
              disabled={getCurrentStepIndex() === 0}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${
                getCurrentStepIndex() === 0
                  ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            <div className="text-center">
              <div className="text-sm text-gray-400">
                {STEPS[getCurrentStepIndex()]?.label}
              </div>
              <div className="text-xs text-gray-500">
                {getCurrentStepIndex() + 1} de {STEPS.length}
              </div>
            </div>

            <button
              onClick={handleNextStep}
              disabled={getCurrentStepIndex() === STEPS.length - 1}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${
                getCurrentStepIndex() === STEPS.length - 1
                  ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <span>Próximo</span>
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </div>
    </ErrorBoundary>
  );
};

export default ClinicalCase;