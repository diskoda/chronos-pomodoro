import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  userAttemptsService, 
  type UserQuestionAttempt, 
  type UserQuestionSummary,
  type UserProgressStats 
} from '../services/userAttemptsService';

// ==========================================
// HOOK PARA TENTATIVAS DO USUÁRIO (FIREBASE)
// ==========================================

export function useUserQuestionAttempts() {
  const { currentUser } = useAuth();
  const [attempts, setAttempts] = useState<UserQuestionAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carregar tentativas do usuário
  const loadUserAttempts = useCallback(async () => {
    if (!currentUser?.uid) {
      setAttempts([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const userAttempts = await userAttemptsService.getUserAttempts(currentUser.uid);
      setAttempts(userAttempts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar tentativas');
      console.error('Erro ao carregar tentativas:', err);
    } finally {
      setLoading(false);
    }
  }, [currentUser?.uid]);

  // Carregar tentativas na inicialização
  useEffect(() => {
    loadUserAttempts();
  }, [loadUserAttempts]);

  // Salvar uma nova tentativa
  const saveAttempt = async (
    questionId: number,
    selectedAlternative: string,
    isCorrect: boolean,
    timeSpent: number = 0
  ): Promise<string | null> => {
    if (!currentUser?.uid) {
      console.warn('Usuário não autenticado - não é possível salvar tentativa');
      return null;
    }

    try {
      const attemptData = {
        userId: currentUser.uid,
        questionId,
        selectedAlternative,
        isCorrect,
        timeSpent
      };

      const attemptId = await userAttemptsService.saveUserAttempt(attemptData);
      
      // Recarregar tentativas para atualizar o estado local
      await loadUserAttempts();
      
      return attemptId;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar tentativa');
      console.error('Erro ao salvar tentativa:', err);
      return null;
    }
  };

  // Migrar dados do localStorage
  const migrateFromLocalStorage = async (): Promise<boolean> => {
    if (!currentUser?.uid) {
      console.warn('Usuário não autenticado - não é possível migrar dados');
      return false;
    }

    try {
      await userAttemptsService.migrateLocalStorageToFirebase(currentUser.uid);
      await loadUserAttempts(); // Recarregar após migração
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro na migração');
      console.error('Erro na migração:', err);
      return false;
    }
  };

  return {
    attempts,
    loading,
    error,
    saveAttempt,
    migrateFromLocalStorage,
    refreshAttempts: loadUserAttempts,
    isAuthenticated: !!currentUser?.uid
  };
}

// ==========================================
// HOOK PARA UMA QUESTÃO ESPECÍFICA
// ==========================================

export function useUserQuestionAttempt(questionId: number) {
  const { currentUser } = useAuth();
  const [summary, setSummary] = useState<UserQuestionSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carregar resumo da questão
  const loadQuestionSummary = useCallback(async () => {
    if (!currentUser?.uid) {
      // Se não autenticado, retornar resumo vazio
      setSummary({
        questionId,
        totalAttempts: 0,
        correctAttempts: 0,
        lastAttempt: null,
        firstAttempt: null,
        averageTimeSpent: 0,
        bestTime: 0,
        successRate: 0,
        lastAttemptDate: null,
        hasAttempted: false,
        isCorrect: false
      });
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const questionSummary = await userAttemptsService.getUserQuestionSummary(currentUser.uid, questionId);
      setSummary(questionSummary);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar resumo da questão');
      console.error('Erro ao carregar resumo:', err);
    } finally {
      setLoading(false);
    }
  }, [currentUser?.uid, questionId]);

  // Carregar resumo na inicialização
  useEffect(() => {
    loadQuestionSummary();
  }, [loadQuestionSummary]);

  // Criar uma nova tentativa
  const createAttempt = async (
    selectedAlternative: string,
    isCorrect: boolean,
    timeSpent: number = 0
  ): Promise<string | null> => {
    if (!currentUser?.uid) {
      console.warn('Usuário não autenticado - não é possível salvar tentativa');
      return null;
    }

    try {
      const attemptData = {
        userId: currentUser.uid,
        questionId,
        selectedAlternative,
        isCorrect,
        timeSpent
      };

      const attemptId = await userAttemptsService.saveUserAttempt(attemptData);
      
      // Recarregar resumo para atualizar estatísticas
      await loadQuestionSummary();
      
      return attemptId;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar tentativa');
      console.error('Erro ao salvar tentativa:', err);
      return null;
    }
  };

  return {
    summary: summary || {
      questionId,
      totalAttempts: 0,
      correctAttempts: 0,
      lastAttempt: null,
      firstAttempt: null,
      averageTimeSpent: 0,
      bestTime: 0,
      successRate: 0,
      lastAttemptDate: null,
      hasAttempted: false,
      isCorrect: false
    },
    loading,
    error,
    createAttempt,
    refreshSummary: loadQuestionSummary,
    isAuthenticated: !!currentUser?.uid,
    // Propriedades de compatibilidade com o hook antigo
    hasAttempted: summary?.hasAttempted || false,
    isCorrect: summary?.isCorrect || false,
    lastAttemptDate: summary?.lastAttemptDate || null,
    lastAttempt: summary?.lastAttempt || null
  };
}

// ==========================================
// HOOK PARA ESTATÍSTICAS GERAIS DO USUÁRIO
// ==========================================

export function useUserProgressStats() {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState<UserProgressStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carregar estatísticas do usuário
  const loadUserStats = useCallback(async () => {
    if (!currentUser?.uid) {
      setStats({
        totalQuestionsAttempted: 0,
        totalQuestionsCorrect: 0,
        totalTimeSpent: 0,
        averageSuccessRate: 0,
        streakCurrent: 0,
        streakBest: 0,
        categoriesProgress: {},
        difficultiesProgress: {},
        recentActivity: []
      });
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const userStats = await userAttemptsService.getUserProgressStats(currentUser.uid);
      setStats(userStats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar estatísticas');
      console.error('Erro ao carregar estatísticas:', err);
    } finally {
      setLoading(false);
    }
  }, [currentUser?.uid]);

  // Carregar estatísticas na inicialização
  useEffect(() => {
    loadUserStats();
  }, [loadUserStats]);

  return {
    stats: stats || {
      totalQuestionsAttempted: 0,
      totalQuestionsCorrect: 0,
      totalTimeSpent: 0,
      averageSuccessRate: 0,
      streakCurrent: 0,
      streakBest: 0,
      categoriesProgress: {},
      difficultiesProgress: {},
      recentActivity: []
    },
    loading,
    error,
    refreshStats: loadUserStats,
    isAuthenticated: !!currentUser?.uid
  };
}

// ==========================================
// HOOK DE MIGRAÇÃO (COMPATIBILIDADE)
// ==========================================

export function useAttemptsmigration() {
  const { currentUser } = useAuth();
  const [migrationStatus, setMigrationStatus] = useState<'pending' | 'migrating' | 'completed' | 'error'>('pending');

  const performMigration = useCallback(async () => {
    if (!currentUser?.uid) return;

    // Verificar se há dados locais para migrar
    const localData = localStorage.getItem('questionAttempts');
    if (!localData) {
      setMigrationStatus('completed');
      return;
    }

    try {
      setMigrationStatus('migrating');
      await userAttemptsService.migrateLocalStorageToFirebase(currentUser.uid);
      setMigrationStatus('completed');
    } catch (error) {
      console.error('Erro na migração:', error);
      setMigrationStatus('error');
    }
  }, [currentUser?.uid]);

  useEffect(() => {
    performMigration();
  }, [performMigration]);

  return {
    migrationStatus,
    performMigration
  };
}