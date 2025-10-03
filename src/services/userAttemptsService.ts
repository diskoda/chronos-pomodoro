import { 
  collection, 
  doc, 
  getDocs, 
  addDoc, 
  query, 
  where, 
  orderBy,
  Timestamp,
  writeBatch
} from 'firebase/firestore';
import { db } from '../config/firebase';

// ==========================================
// INTERFACES PARA TRACKING DE USUÁRIO
// ==========================================

export interface UserQuestionAttempt {
  id?: string;
  userId: string;
  questionId: number;
  selectedAlternative: string;
  isCorrect: boolean;
  timeSpent: number; // em segundos
  timestamp: Timestamp;
  sessionId?: string; // Para agrupar tentativas da mesma sessão
  metadata?: {
    userAgent?: string;
    ip?: string;
    source?: 'web' | 'mobile';
    migrated?: boolean;
    [key: string]: any; // Para permitir propriedades adicionais
  };
}

export interface UserQuestionSummary {
  questionId: number;
  totalAttempts: number;
  correctAttempts: number;
  lastAttempt: UserQuestionAttempt | null;
  firstAttempt: UserQuestionAttempt | null;
  averageTimeSpent: number;
  bestTime: number;
  successRate: number;
  lastAttemptDate: Date | null;
  hasAttempted: boolean;
  isCorrect: boolean; // Baseado na última tentativa
}

export interface UserProgressStats {
  totalQuestionsAttempted: number;
  totalQuestionsCorrect: number;
  totalTimeSpent: number;
  averageSuccessRate: number;
  streakCurrent: number;
  streakBest: number;
  categoriesProgress: Record<string, {
    attempted: number;
    correct: number;
    successRate: number;
  }>;
  difficultiesProgress: Record<string, {
    attempted: number;
    correct: number;
    successRate: number;
  }>;
  recentActivity: UserQuestionAttempt[];
}

// ==========================================
// SERVIÇO DE TRACKING DE USUÁRIO
// ==========================================

class UserAttemptsService {
  private readonly COLLECTION_NAME = 'userQuestionAttempts';

  /**
   * Salvar uma nova tentativa do usuário
   */
  async saveUserAttempt(attempt: Omit<UserQuestionAttempt, 'id' | 'timestamp'>): Promise<string> {
    try {
      // Verificar se já existe uma tentativa muito recente (últimos 5 segundos)
      // para evitar duplicatas por duplo clique
      const recentAttempts = await this.getUserQuestionAttempts(attempt.userId, attempt.questionId);
      if (recentAttempts.length > 0) {
        const lastAttempt = recentAttempts[0];
        const timeDiff = Date.now() - lastAttempt.timestamp.toMillis();
        
        if (timeDiff < 5000) { // 5 segundos
          console.log('⚠️ Tentativa muito recente detectada, ignorando possível duplicata');
          return lastAttempt.id || 'duplicate-ignored';
        }
      }

      const attemptData: Omit<UserQuestionAttempt, 'id'> = {
        ...attempt,
        timestamp: Timestamp.now(),
        metadata: {
          source: 'web',
          userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
          ...attempt.metadata
        }
      };

      const docRef = await addDoc(collection(db, this.COLLECTION_NAME), attemptData);
      console.log('✅ Tentativa salva no Firebase:', docRef.id);
      
      return docRef.id;
    } catch (error) {
      console.error('❌ Erro ao salvar tentativa:', error);
      throw error;
    }
  }

  /**
   * Buscar todas as tentativas de um usuário
   */
  async getUserAttempts(userId: string): Promise<UserQuestionAttempt[]> {
    try {
      // Versão otimizada com orderBy (requer índice: userId + timestamp)
      const q = query(
        collection(db, this.COLLECTION_NAME),
        where('userId', '==', userId),
        orderBy('timestamp', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const attempts: UserQuestionAttempt[] = [];

      querySnapshot.forEach((doc) => {
        attempts.push({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp as Timestamp
        } as UserQuestionAttempt);
      });

      console.log(`✅ ${attempts.length} tentativas carregadas (otimizado com índice)`);
      return attempts;
    } catch (error) {
      console.error('❌ Erro ao buscar tentativas do usuário:', error);
      
      // Fallback para consulta sem orderBy se índice ainda não estiver pronto
      console.log('🔄 Tentando consulta sem orderBy...');
      try {
        const fallbackQuery = query(
          collection(db, this.COLLECTION_NAME),
          where('userId', '==', userId)
        );
        
        const fallbackSnapshot = await getDocs(fallbackQuery);
        const attempts: UserQuestionAttempt[] = [];

        fallbackSnapshot.forEach((doc) => {
          attempts.push({
            id: doc.id,
            ...doc.data(),
            timestamp: doc.data().timestamp as Timestamp
          } as UserQuestionAttempt);
        });

        // Ordenar no cliente como fallback
        attempts.sort((a, b) => b.timestamp.toMillis() - a.timestamp.toMillis());
        console.log(`✅ ${attempts.length} tentativas carregadas (fallback sem índice)`);
        return attempts;
      } catch (fallbackError) {
        console.error('❌ Erro no fallback:', fallbackError);
        throw fallbackError;
      }
    }
  }

  /**
   * Buscar tentativas de uma questão específica para um usuário
   */
  async getUserQuestionAttempts(userId: string, questionId: number): Promise<UserQuestionAttempt[]> {
    try {
      // Versão otimizada com orderBy (requer índice: userId + questionId + timestamp)
      const q = query(
        collection(db, this.COLLECTION_NAME),
        where('userId', '==', userId),
        where('questionId', '==', questionId),
        orderBy('timestamp', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const attempts: UserQuestionAttempt[] = [];

      querySnapshot.forEach((doc) => {
        attempts.push({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp as Timestamp
        } as UserQuestionAttempt);
      });

      console.log(`✅ ${attempts.length} tentativas da questão ${questionId} carregadas (otimizado)`);
      return attempts;
    } catch (error) {
      console.error('❌ Erro ao buscar tentativas da questão:', error);
      
      // Fallback para consulta sem orderBy se índice ainda não estiver pronto
      console.log('🔄 Tentando consulta sem orderBy...');
      try {
        const fallbackQuery = query(
          collection(db, this.COLLECTION_NAME),
          where('userId', '==', userId),
          where('questionId', '==', questionId)
        );
        
        const fallbackSnapshot = await getDocs(fallbackQuery);
        const attempts: UserQuestionAttempt[] = [];

        fallbackSnapshot.forEach((doc) => {
          attempts.push({
            id: doc.id,
            ...doc.data(),
            timestamp: doc.data().timestamp as Timestamp
          } as UserQuestionAttempt);
        });

        // Ordenar no cliente como fallback
        attempts.sort((a, b) => b.timestamp.toMillis() - a.timestamp.toMillis());
        console.log(`✅ ${attempts.length} tentativas da questão ${questionId} carregadas (fallback)`);
        return attempts;
      } catch (fallbackError) {
        console.error('❌ Erro no fallback:', fallbackError);
        throw fallbackError;
      }
    }
  }

  /**
   * Gerar resumo de uma questão para um usuário
   */
  async getUserQuestionSummary(userId: string, questionId: number): Promise<UserQuestionSummary> {
    try {
      const attempts = await this.getUserQuestionAttempts(userId, questionId);

      if (attempts.length === 0) {
        return {
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
        };
      }

      const correctAttempts = attempts.filter(a => a.isCorrect).length;
      const timesSpent = attempts.map(a => a.timeSpent).filter(t => t > 0);
      const averageTimeSpent = timesSpent.length > 0 ? timesSpent.reduce((a, b) => a + b, 0) / timesSpent.length : 0;
      const bestTime = timesSpent.length > 0 ? Math.min(...timesSpent) : 0;

      return {
        questionId,
        totalAttempts: attempts.length,
        correctAttempts,
        lastAttempt: attempts[0], // Mais recente
        firstAttempt: attempts[attempts.length - 1], // Mais antiga
        averageTimeSpent,
        bestTime,
        successRate: (correctAttempts / attempts.length) * 100,
        lastAttemptDate: attempts[0].timestamp.toDate(),
        hasAttempted: true,
        isCorrect: attempts[0].isCorrect // Baseado na última tentativa
      };
    } catch (error) {
      console.error('❌ Erro ao gerar resumo da questão:', error);
      throw error;
    }
  }

  /**
   * Gerar estatísticas completas de progresso do usuário
   */
  async getUserProgressStats(userId: string): Promise<UserProgressStats> {
    try {
      const attempts = await this.getUserAttempts(userId);

      if (attempts.length === 0) {
        return {
          totalQuestionsAttempted: 0,
          totalQuestionsCorrect: 0,
          totalTimeSpent: 0,
          averageSuccessRate: 0,
          streakCurrent: 0,
          streakBest: 0,
          categoriesProgress: {},
          difficultiesProgress: {},
          recentActivity: []
        };
      }

      // Agrupar por questão para calcular estatísticas únicas
      const questionMap = new Map<number, UserQuestionAttempt[]>();
      attempts.forEach(attempt => {
        if (!questionMap.has(attempt.questionId)) {
          questionMap.set(attempt.questionId, []);
        }
        questionMap.get(attempt.questionId)!.push(attempt);
      });

      // Calcular estatísticas
      const totalQuestionsAttempted = questionMap.size;
      let totalQuestionsCorrect = 0;
      const totalTimeSpent = attempts.reduce((sum, a) => sum + a.timeSpent, 0);

      // Verificar quais questões foram resolvidas corretamente (última tentativa)
      questionMap.forEach(questionAttempts => {
        const lastAttempt = questionAttempts[0]; // Mais recente
        if (lastAttempt.isCorrect) {
          totalQuestionsCorrect++;
        }
      });

      const averageSuccessRate = totalQuestionsAttempted > 0 ? (totalQuestionsCorrect / totalQuestionsAttempted) * 100 : 0;

      // Calcular streaks
      const { current: streakCurrent, best: streakBest } = this.calculateStreaks(attempts);

      // Atividade recente: apenas a tentativa mais recente de cada questão
      const recentActivityMap = new Map<number, UserQuestionAttempt>();
      attempts.forEach(attempt => {
        if (!recentActivityMap.has(attempt.questionId) || 
            attempt.timestamp.toMillis() > recentActivityMap.get(attempt.questionId)!.timestamp.toMillis()) {
          recentActivityMap.set(attempt.questionId, attempt);
        }
      });
      
      const recentActivity = Array.from(recentActivityMap.values())
        .sort((a, b) => b.timestamp.toMillis() - a.timestamp.toMillis())
        .slice(0, 10); // Últimas 10 questões tentadas

      return {
        totalQuestionsAttempted,
        totalQuestionsCorrect,
        totalTimeSpent,
        averageSuccessRate,
        streakCurrent,
        streakBest,
        categoriesProgress: {}, // TODO: Implementar com dados das questões
        difficultiesProgress: {}, // TODO: Implementar com dados das questões
        recentActivity
      };
    } catch (error) {
      console.error('❌ Erro ao gerar estatísticas do usuário:', error);
      throw error;
    }
  }

  /**
   * Calcular streaks de acertos
   */
  private calculateStreaks(attempts: UserQuestionAttempt[]): { current: number; best: number } {
    if (attempts.length === 0) return { current: 0, best: 0 };

    // Agrupar por questão e pegar só a última tentativa de cada
    const questionMap = new Map<number, UserQuestionAttempt>();
    attempts.forEach(attempt => {
      if (!questionMap.has(attempt.questionId) || 
          questionMap.get(attempt.questionId)!.timestamp.toMillis() < attempt.timestamp.toMillis()) {
        questionMap.set(attempt.questionId, attempt);
      }
    });

    // Ordenar por timestamp das últimas tentativas
    const lastAttempts = Array.from(questionMap.values())
      .sort((a, b) => b.timestamp.toMillis() - a.timestamp.toMillis());

    let currentStreak = 0;
    let bestStreak = 0;
    let tempStreak = 0;

    // Calcular streak atual (a partir da mais recente)
    for (const attempt of lastAttempts) {
      if (attempt.isCorrect) {
        if (currentStreak === tempStreak) {
          currentStreak++;
        }
        tempStreak++;
        bestStreak = Math.max(bestStreak, tempStreak);
      } else {
        if (currentStreak === tempStreak) {
          currentStreak = 0;
        }
        tempStreak = 0;
      }
    }

    return { current: currentStreak, best: bestStreak };
  }

  /**
   * Migrar dados do localStorage para o Firebase
   */
  async migrateLocalStorageToFirebase(userId: string): Promise<{
    totalMigrated: number;
    errors: string[];
  }> {
    const result = {
      totalMigrated: 0,
      errors: [] as string[]
    };

    try {
      const localData = localStorage.getItem('questionAttempts');
      if (!localData) {
        console.log('📭 Nenhum dado local encontrado para migrar');
        return result;
      }

      const localAttempts = JSON.parse(localData);
      const batch = writeBatch(db);
      let migratedCount = 0;

      for (const [questionId, attempt] of Object.entries(localAttempts)) {
        try {
          const attemptData = attempt as any;
          
          const userAttempt: Omit<UserQuestionAttempt, 'id'> = {
            userId,
            questionId: parseInt(questionId),
            selectedAlternative: attemptData.selectedAlternative || 'A',
            isCorrect: attemptData.isCorrect || false,
            timeSpent: attemptData.timeSpent || 0,
            timestamp: attemptData.timestamp ? 
              Timestamp.fromDate(new Date(attemptData.timestamp)) : 
              Timestamp.now(),
            metadata: {
              source: 'web',
              migrated: true
            }
          };

          const docRef = doc(collection(db, this.COLLECTION_NAME));
          batch.set(docRef, userAttempt);
          migratedCount++;
        } catch (error) {
          const errorMsg = `Erro ao migrar questão ${questionId}: ${error instanceof Error ? error.message : 'Erro desconhecido'}`;
          result.errors.push(errorMsg);
          console.error(errorMsg);
        }
      }

      if (migratedCount > 0) {
        await batch.commit();
        result.totalMigrated = migratedCount;
        console.log(`✅ ${migratedCount} tentativas migradas com sucesso`);
        
        // Backup dos dados locais antes de limpar
        localStorage.setItem('questionAttempts_backup', localData);
        localStorage.removeItem('questionAttempts');
      }

      return result;
    } catch (error) {
      const errorMsg = `Erro geral na migração: ${error instanceof Error ? error.message : 'Erro desconhecido'}`;
      result.errors.push(errorMsg);
      console.error('❌ Erro na migração:', error);
      return result;
    }
  }

  /**
   * Limpar todas as tentativas de um usuário (apenas para desenvolvimento)
   */
  async clearUserAttempts(userId: string): Promise<void> {
    try {
      const attempts = await this.getUserAttempts(userId);
      const batch = writeBatch(db);

      attempts.forEach(attempt => {
        if (attempt.id) {
          const docRef = doc(db, this.COLLECTION_NAME, attempt.id);
          batch.delete(docRef);
        }
      });

      await batch.commit();
      console.log('🗑️ Tentativas do usuário limpas');
    } catch (error) {
      console.error('❌ Erro ao limpar tentativas:', error);
      throw error;
    }
  }
}

// ==========================================
// INSTÂNCIA E EXPORTS
// ==========================================

export const userAttemptsService = new UserAttemptsService();

// Funções de conveniência
export const saveUserAttempt = (attempt: Omit<UserQuestionAttempt, 'id' | 'timestamp'>) => 
  userAttemptsService.saveUserAttempt(attempt);

export const getUserQuestionSummary = (userId: string, questionId: number) => 
  userAttemptsService.getUserQuestionSummary(userId, questionId);

export const getUserProgressStats = (userId: string) => 
  userAttemptsService.getUserProgressStats(userId);

export const migrateLocalToFirebase = (userId: string) => 
  userAttemptsService.migrateLocalStorageToFirebase(userId);