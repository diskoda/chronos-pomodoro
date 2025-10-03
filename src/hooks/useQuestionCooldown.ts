import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  questionCooldownService, 
  type CooldownStatus,
  type QuestionCooldown 
} from '../services/questionCooldownService';

// ==========================================
// HOOK PARA COOLDOWN DE QUESTÃO ESPECÍFICA
// ==========================================

export function useQuestionCooldown(questionId: number, mode: 'dr-skoda' | 'exam' = 'dr-skoda') {
  const { currentUser } = useAuth();
  const [cooldownStatus, setCooldownStatus] = useState<CooldownStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Verificar status do cooldown
  const checkCooldownStatus = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const status = await questionCooldownService.canUserAttemptQuestion(
        currentUser?.uid || '', 
        questionId, 
        mode
      );
      
      setCooldownStatus(status);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao verificar cooldown');
      console.error('Erro ao verificar cooldown:', err);
      
      // Fallback em caso de erro - permitir tentativa
      const now = new Date();
      setCooldownStatus({
        canAttempt: true,
        hoursRemaining: 0,
        minutesRemaining: 0,
        nextAvailableDate: now,
        lastAttemptDate: null,
        timeUntilAvailable: ''
      });
    } finally {
      setLoading(false);
    }
  }, [currentUser?.uid, questionId, mode]);

  // Registrar uma nova tentativa
  const recordAttempt = useCallback(async (): Promise<boolean> => {
    try {
      if (!cooldownStatus?.canAttempt) {
        console.warn('Tentativa não permitida devido ao cooldown');
        return false;
      }

      await questionCooldownService.recordQuestionAttempt(
        currentUser?.uid || '', 
        questionId, 
        mode
      );
      
      // Atualizar status após registrar
      await checkCooldownStatus();
      
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao registrar tentativa');
      console.error('Erro ao registrar tentativa:', err);
      return false;
    }
  }, [currentUser?.uid, questionId, mode, cooldownStatus?.canAttempt, checkCooldownStatus]);

  // Reset cooldown (para debug/admin)
  const resetCooldown = useCallback(async (): Promise<boolean> => {
    try {
      await questionCooldownService.resetQuestionCooldown(
        currentUser?.uid || '', 
        questionId, 
        mode
      );
      
      // Atualizar status após reset
      await checkCooldownStatus();
      
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao resetar cooldown');
      console.error('Erro ao resetar cooldown:', err);
      return false;
    }
  }, [currentUser?.uid, questionId, mode, checkCooldownStatus]);

  // Verificar status na inicialização
  useEffect(() => {
    checkCooldownStatus();
  }, [checkCooldownStatus]);

  // Atualizar automaticamente a cada minuto quando em cooldown
  useEffect(() => {
    if (cooldownStatus && !cooldownStatus.canAttempt) {
      const interval = setInterval(() => {
        checkCooldownStatus();
      }, 60000); // Atualiza a cada 1 minuto

      return () => clearInterval(interval);
    }
  }, [cooldownStatus, checkCooldownStatus]);

  return {
    cooldownStatus,
    loading,
    error,
    canAttempt: cooldownStatus?.canAttempt ?? false,
    timeUntilAvailable: cooldownStatus?.timeUntilAvailable ?? '',
    hoursRemaining: cooldownStatus?.hoursRemaining ?? 0,
    minutesRemaining: cooldownStatus?.minutesRemaining ?? 0,
    lastAttemptDate: cooldownStatus?.lastAttemptDate ?? null,
    nextAvailableDate: cooldownStatus?.nextAvailableDate ?? new Date(),
    recordAttempt,
    resetCooldown,
    refreshStatus: checkCooldownStatus,
    isAuthenticated: !!currentUser?.uid
  };
}

// ==========================================
// HOOK PARA COOLDOWNS GLOBAIS DO USUÁRIO
// ==========================================

export function useUserCooldowns() {
  const { currentUser } = useAuth();
  const [activeCooldowns, setActiveCooldowns] = useState<QuestionCooldown[]>([]);
  const [stats, setStats] = useState<{
    totalQuestionsInCooldown: number;
    nextAvailableQuestion: QuestionCooldown | null;
    averageWaitTime: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carregar cooldowns ativos do usuário
  const loadActiveCooldowns = useCallback(async () => {
    if (!currentUser?.uid) {
      setActiveCooldowns([]);
      setStats({
        totalQuestionsInCooldown: 0,
        nextAvailableQuestion: null,
        averageWaitTime: 24
      });
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const [cooldowns, userStats] = await Promise.all([
        questionCooldownService.getUserActiveCooldowns(currentUser.uid),
        questionCooldownService.getUserCooldownStats(currentUser.uid)
      ]);
      
      setActiveCooldowns(cooldowns);
      setStats(userStats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar cooldowns');
      console.error('Erro ao carregar cooldowns:', err);
    } finally {
      setLoading(false);
    }
  }, [currentUser?.uid]);

  // Carregar na inicialização
  useEffect(() => {
    loadActiveCooldowns();
  }, [loadActiveCooldowns]);

  // Verificar questão específica nos cooldowns carregados
  const isQuestionInCooldown = useCallback((questionId: number, mode: 'dr-skoda' | 'exam' = 'dr-skoda'): boolean => {
    return activeCooldowns.some(cooldown => 
      cooldown.questionId === questionId && 
      cooldown.mode === mode &&
      cooldown.nextAvailableDate.toDate() > new Date()
    );
  }, [activeCooldowns]);

  // Obter cooldown específico
  const getQuestionCooldown = useCallback((questionId: number, mode: 'dr-skoda' | 'exam' = 'dr-skoda'): QuestionCooldown | null => {
    return activeCooldowns.find(cooldown => 
      cooldown.questionId === questionId && 
      cooldown.mode === mode
    ) || null;
  }, [activeCooldowns]);

  return {
    activeCooldowns,
    stats: stats || {
      totalQuestionsInCooldown: 0,
      nextAvailableQuestion: null,
      averageWaitTime: 24
    },
    loading,
    error,
    isQuestionInCooldown,
    getQuestionCooldown,
    refreshCooldowns: loadActiveCooldowns,
    isAuthenticated: !!currentUser?.uid
  };
}

// ==========================================
// HOOK COMBINADO COM TENTATIVAS
// ==========================================

export function useQuestionWithCooldown(questionId: number, mode: 'dr-skoda' | 'exam' = 'dr-skoda') {
  const { currentUser } = useAuth();
  const cooldown = useQuestionCooldown(questionId, mode);
  
  // Função integrada para tentar resolver questão
  const attemptQuestion = useCallback(async (
    _selectedAlternative: string,
    isCorrect: boolean,
    _timeSpent: number = 0
  ): Promise<{success: boolean, canTryAgain: boolean, message: string}> => {
    
    // Verificar se pode tentar
    if (!cooldown.canAttempt) {
      return {
        success: false,
        canTryAgain: false,
        message: `Você deve aguardar ${cooldown.timeUntilAvailable} para tentar esta questão novamente.`
      };
    }

    try {
      // Registrar tentativa no cooldown
      const cooldownRecorded = await cooldown.recordAttempt();
      
      if (!cooldownRecorded) {
        return {
          success: false,
          canTryAgain: true,
          message: 'Erro ao registrar tentativa. Tente novamente.'
        };
      }

      // Aqui poderia integrar com o sistema de tentativas existente
      // Por enquanto, apenas retornamos sucesso
      return {
        success: true,
        canTryAgain: false,
        message: isCorrect 
          ? 'Resposta correta! Próxima tentativa disponível em 24 horas.' 
          : 'Resposta incorreta. Próxima tentativa disponível em 24 horas.'
      };

    } catch (error) {
      console.error('Erro ao processar tentativa:', error);
      return {
        success: false,
        canTryAgain: true,
        message: 'Erro interno. Tente novamente.'
      };
    }
  }, [cooldown]);

  return {
    ...cooldown,
    attemptQuestion,
    isAuthenticated: !!currentUser?.uid
  };
}