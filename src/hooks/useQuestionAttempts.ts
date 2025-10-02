import { useState, useEffect } from 'react';

// ==========================================
// TIPOS PARA TENTATIVAS DE QUESTÕES
// ==========================================

export interface QuestionAttempt {
  questionId: number;
  selectedAlternative: string | null;
  isCorrect: boolean;
  timestamp: string;
  timeSpent: number;
}

export interface QuestionAttemptSummary {
  hasAttempted: boolean;
  lastAttempt: QuestionAttempt | null;
  isCorrect: boolean | null;
  attemptCount: number;
  lastAttemptDate: Date | null;
}

// ==========================================
// HOOK PARA GERENCIAR TENTATIVAS
// ==========================================

export function useQuestionAttempts() {
  const [attempts, setAttempts] = useState<Record<number, QuestionAttempt>>({});

  // Carregar tentativas do localStorage na inicialização
  useEffect(() => {
    const savedAttempts = localStorage.getItem('questionAttempts');
    if (savedAttempts) {
      try {
        setAttempts(JSON.parse(savedAttempts));
      } catch (error) {
        console.warn('Erro ao carregar tentativas salvas:', error);
      }
    }
  }, []);

  // Salvar uma nova tentativa
  const saveAttempt = (attempt: QuestionAttempt) => {
    const updatedAttempts = {
      ...attempts,
      [attempt.questionId]: attempt
    };
    
    setAttempts(updatedAttempts);
    localStorage.setItem('questionAttempts', JSON.stringify(updatedAttempts));
  };

  // Obter resumo de uma questão específica
  const getQuestionSummary = (questionId: number): QuestionAttemptSummary => {
    const attempt = attempts[questionId];
    
    if (!attempt) {
      return {
        hasAttempted: false,
        lastAttempt: null,
        isCorrect: null,
        attemptCount: 0,
        lastAttemptDate: null
      };
    }

    return {
      hasAttempted: true,
      lastAttempt: attempt,
      isCorrect: attempt.isCorrect,
      attemptCount: 1, // Por enquanto só uma tentativa por questão
      lastAttemptDate: new Date(attempt.timestamp)
    };
  };

  // Limpar todas as tentativas
  const clearAllAttempts = () => {
    setAttempts({});
    localStorage.removeItem('questionAttempts');
  };

  // Limpar tentativa de uma questão específica
  const clearQuestionAttempt = (questionId: number) => {
    const updatedAttempts = { ...attempts };
    delete updatedAttempts[questionId];
    
    setAttempts(updatedAttempts);
    localStorage.setItem('questionAttempts', JSON.stringify(updatedAttempts));
  };

  return {
    attempts,
    saveAttempt,
    getQuestionSummary,
    clearAllAttempts,
    clearQuestionAttempt
  };
}

// ==========================================
// HOOK PARA UMA QUESTÃO ESPECÍFICA
// ==========================================

export function useQuestionAttempt(questionId: number) {
  const { getQuestionSummary, saveAttempt, clearQuestionAttempt } = useQuestionAttempts();
  
  const summary = getQuestionSummary(questionId);

  const createAttempt = (selectedAlternative: string | null, isCorrect: boolean, timeSpent = 0) => {
    const attempt: QuestionAttempt = {
      questionId,
      selectedAlternative,
      isCorrect,
      timestamp: new Date().toISOString(),
      timeSpent
    };
    
    saveAttempt(attempt);
    return attempt;
  };

  return {
    ...summary,
    createAttempt,
    clearAttempt: () => clearQuestionAttempt(questionId)
  };
}