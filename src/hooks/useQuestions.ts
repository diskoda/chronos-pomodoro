import { useState, useEffect, useCallback } from 'react';
import { questionsService, type QuestionFilters, type PaginationParams } from '../services/questionsService';
import type { Question } from '../data/types/Question';

// Hook para buscar todas as questões
export function useQuestions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuestions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await questionsService.getAllQuestions();
      setQuestions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar questões');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  return {
    questions,
    loading,
    error,
    refetch: fetchQuestions
  };
}

// Hook para buscar questões com filtros
export function useQuestionsWithFilters(
  filters: QuestionFilters = {}, 
  pagination: PaginationParams = {}
) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuestions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await questionsService.getQuestionsWithFilters(filters, pagination);
      setQuestions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar questões');
    } finally {
      setLoading(false);
    }
  }, [filters, pagination]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  return {
    questions,
    loading,
    error,
    refetch: fetchQuestions
  };
}

// Hook para buscar uma questão específica por ID
export function useQuestion(id: string | number | null) {
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuestion = useCallback(async () => {
    if (!id) {
      setQuestion(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await questionsService.getQuestionById(id);
      setQuestion(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar questão');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchQuestion();
  }, [fetchQuestion]);

  return {
    question,
    loading,
    error,
    refetch: fetchQuestion
  };
}

// Hook para gerenciar estatísticas das questões
export function useQuestionsStats() {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    avgCorrectRate: 0,
    byDifficulty: {} as Record<string, number>,
    byCategory: {} as Record<string, number>
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await questionsService.getQuestionsStats();
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar estatísticas');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats
  };
}

// Hook para ações de questões (criar, atualizar, deletar)
export function useQuestionActions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createQuestion = useCallback(async (questionData: Omit<Question, 'id'>) => {
    try {
      setLoading(true);
      setError(null);
      const id = await questionsService.createQuestion(questionData);
      return id;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar questão');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateQuestion = useCallback(async (id: string | number, updates: Partial<Question>) => {
    try {
      setLoading(true);
      setError(null);
      await questionsService.updateQuestion(id, updates);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar questão');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteQuestion = useCallback(async (id: string | number) => {
    try {
      setLoading(true);
      setError(null);
      await questionsService.deleteQuestion(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao deletar questão');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleCompletion = useCallback(async (id: string | number, completed: boolean) => {
    try {
      setLoading(true);
      setError(null);
      await questionsService.toggleQuestionCompletion(id, completed);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao alterar status da questão');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const migrateLocalQuestions = useCallback(async (localQuestions: Question[]) => {
    try {
      setLoading(true);
      setError(null);
      await questionsService.migrateLocalQuestions(localQuestions);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro na migração das questões');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    toggleCompletion,
    migrateLocalQuestions
  };
}

// Hook para gerenciar filtros de questões
export function useQuestionFilters() {
  const [filters, setFilters] = useState<QuestionFilters>({});
  
  const updateFilter = useCallback((key: keyof QuestionFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  const clearFilter = useCallback((key: keyof QuestionFilters) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  }, []);

  return {
    filters,
    updateFilter,
    clearFilters,
    clearFilter,
    setFilters
  };
}