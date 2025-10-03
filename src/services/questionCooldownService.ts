import { 
  collection, 
  doc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  Timestamp,
  setDoc,
  getDoc
} from 'firebase/firestore';
import { db } from '../config/firebase';

// ==========================================
// INTERFACES PARA COOLDOWN DO SISTEMA
// ==========================================

export interface QuestionCooldown {
  id?: string;
  userId: string;
  questionId: number;
  lastAttemptDate: Timestamp;
  nextAvailableDate: Timestamp;
  mode: 'dr-skoda' | 'exam'; // Modo específico
  created: Timestamp;
  updated: Timestamp;
}

export interface CooldownStatus {
  canAttempt: boolean;
  hoursRemaining: number;
  minutesRemaining: number;
  nextAvailableDate: Date;
  lastAttemptDate: Date | null;
  timeUntilAvailable: string; // "23h 45min"
}

// ==========================================
// SERVIÇO DE COOLDOWN (24H)
// ==========================================

class QuestionCooldownService {
  private readonly COOLDOWN_HOURS = 24;
  private readonly COLLECTION_NAME = 'question_cooldowns';

  /**
   * Verifica se o usuário pode tentar uma questão
   */
  async canUserAttemptQuestion(
    userId: string, 
    questionId: number, 
    mode: 'dr-skoda' | 'exam' = 'dr-skoda'
  ): Promise<CooldownStatus> {
    try {
      // Se não há usuário autenticado, permite
      if (!userId) {
        const now = new Date();
        return {
          canAttempt: true,
          hoursRemaining: 0,
          minutesRemaining: 0,
          nextAvailableDate: now,
          lastAttemptDate: null,
          timeUntilAvailable: ''
        };
      }

      const cooldownDoc = await this.getCooldownDocument(userId, questionId, mode);
      
      if (!cooldownDoc) {
        // Primeira tentativa - permitir
        const now = new Date();
        return {
          canAttempt: true,
          hoursRemaining: 0,
          minutesRemaining: 0,
          nextAvailableDate: now,
          lastAttemptDate: null,
          timeUntilAvailable: ''
        };
      }

      const now = new Date();
      const nextAvailable = cooldownDoc.nextAvailableDate.toDate();
      const lastAttempt = cooldownDoc.lastAttemptDate.toDate();

      if (now >= nextAvailable) {
        // Cooldown expirado - permitir
        return {
          canAttempt: true,
          hoursRemaining: 0,
          minutesRemaining: 0,
          nextAvailableDate: nextAvailable,
          lastAttemptDate: lastAttempt,
          timeUntilAvailable: ''
        };
      }

      // Ainda em cooldown
      const timeDiff = nextAvailable.getTime() - now.getTime();
      const hoursRemaining = Math.ceil(timeDiff / (1000 * 60 * 60));
      const minutesRemaining = Math.ceil((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      
      const timeUntilAvailable = this.formatTimeRemaining(hoursRemaining, minutesRemaining);

      return {
        canAttempt: false,
        hoursRemaining,
        minutesRemaining,
        nextAvailableDate: nextAvailable,
        lastAttemptDate: lastAttempt,
        timeUntilAvailable
      };

    } catch (error) {
      console.error('Erro ao verificar cooldown:', error);
      // Em caso de erro, permitir tentativa (fail-safe)
      const now = new Date();
      return {
        canAttempt: true,
        hoursRemaining: 0,
        minutesRemaining: 0,
        nextAvailableDate: now,
        lastAttemptDate: null,
        timeUntilAvailable: ''
      };
    }
  }

  /**
   * Registra uma nova tentativa e define o próximo cooldown
   */
  async recordQuestionAttempt(
    userId: string, 
    questionId: number, 
    mode: 'dr-skoda' | 'exam' = 'dr-skoda'
  ): Promise<void> {
    try {
      if (!userId) {
        console.warn('Usuário não autenticado - cooldown não será registrado');
        return;
      }

      const now = Timestamp.now();
      const nextAvailable = Timestamp.fromDate(
        new Date(Date.now() + (this.COOLDOWN_HOURS * 60 * 60 * 1000))
      );

      const cooldownData: Omit<QuestionCooldown, 'id'> = {
        userId,
        questionId,
        lastAttemptDate: now,
        nextAvailableDate: nextAvailable,
        mode,
        created: now,
        updated: now
      };

      // Usar documento com ID composto para facilitar queries
      const docId = `${userId}_${questionId}_${mode}`;
      const docRef = doc(db, this.COLLECTION_NAME, docId);
      
      await setDoc(docRef, cooldownData);

      console.log(`Cooldown registrado: Q${questionId} (${mode}) - próxima tentativa em ${this.COOLDOWN_HOURS}h`);

    } catch (error) {
      console.error('Erro ao registrar cooldown:', error);
      throw error;
    }
  }

  /**
   * Obtém o documento de cooldown específico
   */
  private async getCooldownDocument(
    userId: string, 
    questionId: number, 
    mode: 'dr-skoda' | 'exam'
  ): Promise<QuestionCooldown | null> {
    try {
      const docId = `${userId}_${questionId}_${mode}`;
      const docRef = doc(db, this.COLLECTION_NAME, docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as QuestionCooldown;
      }

      return null;
    } catch (error) {
      console.error('Erro ao buscar documento de cooldown:', error);
      return null;
    }
  }

  /**
   * Obtém todos os cooldowns ativos do usuário
   */
  async getUserActiveCooldowns(userId: string): Promise<QuestionCooldown[]> {
    try {
      if (!userId) return [];

      const now = Timestamp.now();
      const cooldownsRef = collection(db, this.COLLECTION_NAME);
      const q = query(
        cooldownsRef,
        where('userId', '==', userId),
        where('nextAvailableDate', '>', now),
        orderBy('nextAvailableDate', 'asc')
      );

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as QuestionCooldown[];

    } catch (error) {
      console.error('Erro ao buscar cooldowns ativos:', error);
      return [];
    }
  }

  /**
   * Formatar tempo restante para exibição
   */
  private formatTimeRemaining(hours: number, minutes: number): string {
    if (hours > 0) {
      return minutes > 0 ? `${hours}h ${minutes}min` : `${hours}h`;
    }
    return `${minutes}min`;
  }

  /**
   * Método para resetar cooldown (apenas para admin/debug)
   */
  async resetQuestionCooldown(
    userId: string, 
    questionId: number, 
    mode: 'dr-skoda' | 'exam'
  ): Promise<void> {
    try {
      const docId = `${userId}_${questionId}_${mode}`;
      const docRef = doc(db, this.COLLECTION_NAME, docId);
      
      // Define next available para agora (permite imediatamente)
      const now = Timestamp.now();
      await setDoc(docRef, {
        userId,
        questionId,
        lastAttemptDate: now,
        nextAvailableDate: now, // Permite imediatamente
        mode,
        created: now,
        updated: now
      });

      console.log(`Cooldown resetado: Q${questionId} (${mode})`);
    } catch (error) {
      console.error('Erro ao resetar cooldown:', error);
      throw error;
    }
  }

  /**
   * Obter estatísticas de cooldown do usuário
   */
  async getUserCooldownStats(userId: string): Promise<{
    totalQuestionsInCooldown: number;
    nextAvailableQuestion: QuestionCooldown | null;
    averageWaitTime: number;
  }> {
    try {
      const activeCooldowns = await this.getUserActiveCooldowns(userId);
      
      return {
        totalQuestionsInCooldown: activeCooldowns.length,
        nextAvailableQuestion: activeCooldowns[0] || null,
        averageWaitTime: this.COOLDOWN_HOURS
      };
    } catch (error) {
      console.error('Erro ao obter estatísticas de cooldown:', error);
      return {
        totalQuestionsInCooldown: 0,
        nextAvailableQuestion: null,
        averageWaitTime: this.COOLDOWN_HOURS
      };
    }
  }
}

// ==========================================
// EXPORTAR INSTÂNCIA SINGLETON
// ==========================================

export const questionCooldownService = new QuestionCooldownService();