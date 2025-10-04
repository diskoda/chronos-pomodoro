import { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { FlowStage, FlowContextType, QuestionFlowData } from './types';

// ==========================================
// CONTEXT E REDUCER PARA ESTADO GLOBAL DO FLUXO
// ==========================================

interface FlowState {
  currentStage: FlowStage;
  questionData: QuestionFlowData | null;
  selectedAlternative: string | null;
  isCorrect: boolean;
  progress: number;
  timeSpent: number;
  stagesVisited: FlowStage[];
  questionId?: number;
}

type FlowAction = 
  | { type: 'SET_QUESTION_DATA'; payload: QuestionFlowData }
  | { type: 'SET_STAGE'; payload: FlowStage }
  | { type: 'SELECT_ALTERNATIVE'; payload: string }
  | { type: 'NEXT_STAGE' }
  | { type: 'RESET_FLOW' }
  | { type: 'UPDATE_TIME'; payload: number }
  | { type: 'SET_QUESTION_ID'; payload: number };

const flowReducer = (state: FlowState, action: FlowAction): FlowState => {
  switch (action.type) {
    case 'SET_QUESTION_DATA':
      return {
        ...state,
        questionData: action.payload,
        progress: 0
      };
      
    case 'SET_STAGE':
      const newStagesVisited = state.stagesVisited.includes(action.payload) 
        ? state.stagesVisited 
        : [...state.stagesVisited, action.payload];
        
      return {
        ...state,
        currentStage: action.payload,
        stagesVisited: newStagesVisited,
        progress: calculateProgress(action.payload)
      };
      
    case 'SELECT_ALTERNATIVE':
      console.log('🔍 DEBUG - SELECT_ALTERNATIVE:', {
        payload: action.payload,
        questionData: state.questionData,
        alternativesAnalysis: state.questionData?.alternativesAnalysis,
        alternativesCount: state.questionData?.alternativesAnalysis?.length
      });
      
      const selectedAlt = state.questionData?.alternativesAnalysis.find(
        alt => {
          console.log('🔍 DEBUG - Comparing:', {
            altLetter: alt.letter,
            payload: action.payload,
            matches: alt.letter === action.payload
          });
          return alt.letter === action.payload;
        }
      );
      
      console.log('🔍 DEBUG - Selected alternative:', {
        selectedAlt,
        isCorrect: selectedAlt?.isCorrect || false
      });
      
      return {
        ...state,
        selectedAlternative: action.payload,
        isCorrect: selectedAlt?.isCorrect || false
      };
      
    case 'NEXT_STAGE':
      const nextStage = getNextStage(state.currentStage);
      return flowReducer(state, { type: 'SET_STAGE', payload: nextStage });
      
    case 'RESET_FLOW':
      return initialFlowState;
      
    case 'UPDATE_TIME':
      return {
        ...state,
        timeSpent: action.payload
      };
      
    case 'SET_QUESTION_ID':
      return {
        ...state,
        questionId: action.payload
      };
      
    default:
      return state;
  }
};

const initialFlowState: FlowState = {
  currentStage: 'begin',
  questionData: null,
  selectedAlternative: null,
  isCorrect: false,
  progress: 0,
  timeSpent: 0,
  stagesVisited: [],
  questionId: undefined
};

// ==========================================
// FUNÇÕES AUXILIARES
// ==========================================

function calculateProgress(stage: FlowStage): number {
  const stageProgress = {
    'begin': 25,     // Introdução completa
    'question': 50,  // Questão sendo resolvida
    'explanation': 75, // Explicação teórica
    'analysis': 100, // Análise completa
    'finished': 100
  };
  return stageProgress[stage] || 0;
}

function getNextStage(currentStage: FlowStage): FlowStage {
  const stageOrder: FlowStage[] = ['begin', 'question', 'explanation', 'analysis', 'finished'];
  const currentIndex = stageOrder.indexOf(currentStage);
  return stageOrder[currentIndex + 1] || 'finished';
}

// ==========================================
// CONTEXT PROVIDER
// ==========================================

const FlowContext = createContext<FlowContextType | null>(null);

interface FlowProviderProps {
  children: ReactNode;
  questionData?: QuestionFlowData;
  questionId?: number;
}

export function FlowProvider({ children, questionData, questionId }: FlowProviderProps) {
  const [state, dispatch] = useReducer(flowReducer, initialFlowState);

  // Inicializar dados da questão quando fornecidos
  if (questionData && !state.questionData) {
    console.log('🔍 DEBUG - Initializing questionData:', {
      questionData,
      alternativesAnalysis: questionData.alternativesAnalysis,
      alternativesCount: questionData.alternativesAnalysis?.length
    });
    dispatch({ type: 'SET_QUESTION_DATA', payload: questionData });
  }

  // Inicializar questionId quando fornecido
  if (questionId && state.questionId !== questionId) {
    dispatch({ type: 'SET_QUESTION_ID', payload: questionId });
  }

  const contextValue: FlowContextType = {
    currentStage: state.currentStage,
    questionData: state.questionData,
    selectedAlternative: state.selectedAlternative,
    isCorrect: state.isCorrect,
    progress: state.progress,
    questionId: state.questionId,
    
    goToStage: (stage: FlowStage) => {
      dispatch({ type: 'SET_STAGE', payload: stage });
    },
    
    selectAlternative: (letter: string) => {
      dispatch({ type: 'SELECT_ALTERNATIVE', payload: letter });
    },
    
    nextStage: () => {
      dispatch({ type: 'NEXT_STAGE' });
    },
    
    resetFlow: () => {
      dispatch({ type: 'RESET_FLOW' });
    },
    
    setQuestionId: (id: number) => {
      dispatch({ type: 'SET_QUESTION_ID', payload: id });
    }
  };

  return (
    <FlowContext.Provider value={contextValue}>
      {children}
    </FlowContext.Provider>
  );
}

// ==========================================
// HOOK PERSONALIZADO
// ==========================================

export function useQuestionFlow() {
  const context = useContext(FlowContext);
  if (!context) {
    throw new Error('useQuestionFlow deve ser usado dentro de um FlowProvider');
  }
  return context;
}