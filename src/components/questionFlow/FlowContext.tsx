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
  hasConfirmedSelection: boolean; // Para controlar quando finaliza a leitura
  dialogOpenCount: number; // Para controlar quantas vezes o DrSkodaDialog foi aberto
}

type FlowAction = 
  | { type: 'SET_QUESTION_DATA'; payload: QuestionFlowData }
  | { type: 'SET_STAGE'; payload: FlowStage }
  | { type: 'SELECT_ALTERNATIVE'; payload: string }
  | { type: 'CONFIRM_SELECTION' } // Nova action para quando confirma seleção
  | { type: 'START_READING' } // Nova action para início da leitura
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

      // Incrementar contador de diálogos quando entrar em explanation ou analysis
      const newDialogCount = (action.payload === 'explanation' || action.payload === 'analysis') 
        ? state.dialogOpenCount + 1 
        : state.dialogOpenCount;
        
      const newState = {
        ...state,
        currentStage: action.payload,
        stagesVisited: newStagesVisited,
        dialogOpenCount: newDialogCount
      };
        
      return {
        ...newState,
        progress: calculateProgressWithState(newState)
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

    case 'CONFIRM_SELECTION':
      // Finaliza a etapa de Leitura e avança para Contextualização
      return {
        ...state,
        hasConfirmedSelection: true,
        progress: calculateProgressWithState({
          ...state,
          hasConfirmedSelection: true
        })
      };

    case 'START_READING':
      // Inicia a etapa de Leitura
      return {
        ...state,
        progress: calculateProgressWithState(state)
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
  questionId: undefined,
  hasConfirmedSelection: false,
  dialogOpenCount: 0
};

// ==========================================
// FUNÇÕES AUXILIARES
// ==========================================

function calculateProgressWithState(state: FlowState): number {
  // Leitura: 0% -> 25% (desde início até confirmar seleção)
  if (!state.hasConfirmedSelection) {
    return 25; // Etapa de Leitura em andamento
  }
  
  // Contextualização: 25% -> 50% (segunda abertura do DrSkodaDialog)
  if (state.dialogOpenCount >= 1 && state.currentStage === 'explanation') {
    return 50; // Etapa de Contextualização
  }
  
  // Análise: 50% -> 75% (DrSkodaDialog analisando alternativas)
  if (state.currentStage === 'analysis') {
    return 75; // Etapa de Análise
  }
  
  // Conclusão: 75% -> 100% (última renderização)
  if (state.currentStage === 'finished') {
    return 100; // Etapa de Conclusão
  }
  
  // Default baseado no estágio atual
  const stageProgress = {
    'begin': 25,       // Leitura
    'question': 25,    // Leitura continua
    'explanation': 50, // Contextualização
    'analysis': 75,    // Análise
    'finished': 100    // Conclusão
  };
  
  return stageProgress[state.currentStage] || 0;
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