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
}

type FlowAction = 
  | { type: 'SET_QUESTION_DATA'; payload: QuestionFlowData }
  | { type: 'SET_STAGE'; payload: FlowStage }
  | { type: 'SELECT_ALTERNATIVE'; payload: string }
  | { type: 'NEXT_STAGE' }
  | { type: 'RESET_FLOW' }
  | { type: 'UPDATE_TIME'; payload: number };

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
      const selectedAlt = state.questionData?.alternativesAnalysis.find(
        alt => alt.letter === action.payload
      );
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
  stagesVisited: []
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
}

export function FlowProvider({ children, questionData }: FlowProviderProps) {
  const [state, dispatch] = useReducer(flowReducer, initialFlowState);

  // Inicializar dados da questão quando fornecidos
  if (questionData && !state.questionData) {
    dispatch({ type: 'SET_QUESTION_DATA', payload: questionData });
  }

  const contextValue: FlowContextType = {
    currentStage: state.currentStage,
    questionData: state.questionData,
    selectedAlternative: state.selectedAlternative,
    isCorrect: state.isCorrect,
    progress: state.progress,
    
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