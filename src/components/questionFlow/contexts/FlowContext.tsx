import { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { FlowContextType, FlowState, FlowAction, QuestionFlowData } from '../core/types';
import { 
  INITIAL_FLOW_STATE, 
  calculateProgress, 
  getNextStage, 
  findSelectedAlternative,
  shouldIncrementDialogCount
} from '../core/utils';
import { recordQuestionXP } from '../services/xpService';

// ==========================================
// FLOW REDUCER - CLEAN STATE MANAGEMENT
// ==========================================

function flowReducer(state: FlowState, action: FlowAction): FlowState {
  switch (action.type) {
    case 'SET_QUESTION_DATA':
      return {
        ...state,
        questionData: action.payload,
        progress: calculateProgress(state)
      };
      
    case 'SET_STAGE': {
      const newDialogCount = shouldIncrementDialogCount(action.payload) 
        ? state.dialogOpenCount + 1 
        : state.dialogOpenCount;
        
      const newState = {
        ...state,
        currentStage: action.payload,
        dialogOpenCount: newDialogCount
      };
        
      return {
        ...newState,
        progress: calculateProgress(newState)
      };
    }
      
    case 'SELECT_ALTERNATIVE': {
      const selectedAlt = findSelectedAlternative(state, action.payload);
      
      return {
        ...state,
        selectedAlternative: action.payload,
        isCorrect: selectedAlt?.isCorrect || false
      };
    }

    case 'CONFIRM_SELECTION': {
      // Record XP asynchronously
      if (state.selectedAlternative && state.questionData && state.questionId) {
        recordQuestionXP(state.questionId, state.selectedAlternative, state.isCorrect);
      }
      
      const newState = {
        ...state,
        hasConfirmedSelection: true
      };
      
      return {
        ...newState,
        progress: calculateProgress(newState)
      };
    }

    case 'START_READING':
      return {
        ...state,
        progress: calculateProgress(state)
      };
      
    case 'NEXT_STAGE': {
      const nextStage = getNextStage(state.currentStage);
      return flowReducer(state, { type: 'SET_STAGE', payload: nextStage });
    }
      
    case 'RESET_FLOW':
      return INITIAL_FLOW_STATE;
      
    case 'SET_QUESTION_ID':
      return {
        ...state,
        questionId: action.payload
      };
      
    default:
      return state;
  }
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
  const [state, dispatch] = useReducer(flowReducer, INITIAL_FLOW_STATE);

  // Initialize question data when provided
  if (questionData && !state.questionData) {
    dispatch({ type: 'SET_QUESTION_DATA', payload: questionData });
  }

  // Initialize questionId when provided
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
    
    goToStage: (stage) => {
      dispatch({ type: 'SET_STAGE', payload: stage });
    },
    
    selectAlternative: (letter) => {
      dispatch({ type: 'SELECT_ALTERNATIVE', payload: letter });
    },
    
    confirmSelection: () => {
      dispatch({ type: 'CONFIRM_SELECTION' });
    },
    
    startReading: () => {
      dispatch({ type: 'START_READING' });
    },
    
    nextStage: () => {
      dispatch({ type: 'NEXT_STAGE' });
    },
    
    resetFlow: () => {
      dispatch({ type: 'RESET_FLOW' });
    },
    
    setQuestionId: (id) => {
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
// CUSTOM HOOK
// ==========================================

export function useQuestionFlow() {
  const context = useContext(FlowContext);
  if (!context) {
    throw new Error('useQuestionFlow must be used within FlowProvider');
  }
  return context;
}