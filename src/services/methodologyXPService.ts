import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where,
  orderBy,
  limit,
  Timestamp,
  runTransaction
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { 
  StudyMethodology,
  MethodologyLevel,
  UserOverallLevel,
  MethodologyXPActivity,
  MethodologyActivityType,
  MethodologyStats,
  UserMethodologyStats
} from '../types/xpMethodologies';
import { 
  METHODOLOGY_XP_CONFIG,
  METHODOLOGY_TITLES
} from '../types/xpMethodologies';

// Coleções do Firestore para metodologias
const COLLECTIONS = {
  methodologyLevels: 'methodology_levels',
  userOverallLevels: 'user_overall_levels',
  methodologyActivities: 'methodology_xp_activities',
  methodologyStats: 'methodology_stats'
};

export class MethodologyXPService {
  
  // ============================================
  // CÁLCULOS DE XP E NÍVEIS
  // ============================================
  
  /**
   * Calcula XP necessário para um nível (progressão exponencial por metodologia)
   */
  private static calculateXPForLevel(level: number, methodology: StudyMethodology): number {
    if (level <= 1) return 0;
    
    // Diferentes curvas de progressão por metodologia
    const baseMultipliers = {
      clinical_cases: 1.2,   // Progressão mais lenta (casos são complexos)
      questions: 1.15,       // Progressão padrão
      flashcards: 1.1        // Progressão mais rápida (revisões frequentes)
    };
    
    const multiplier = baseMultipliers[methodology];
    return Math.floor(100 * Math.pow(multiplier, level - 1));
  }

  /**
   * Método público para calcular XP necessário para um nível
   */
  static getXPRequiredForLevel(level: number, methodology: StudyMethodology): number {
    return this.calculateXPForLevel(level, methodology);
  }
  
  /**
   * Determina o nível baseado no XP total
   */
  private static getLevelFromXP(totalXP: number, methodology: StudyMethodology): { level: number; currentXP: number; xpToNextLevel: number } {
    let level = 1;
    let accumulatedXP = 0;
    
    while (level < 50) {
      const xpForNextLevel = this.calculateXPForLevel(level + 1, methodology);
      if (accumulatedXP + xpForNextLevel > totalXP) {
        break;
      }
      accumulatedXP += xpForNextLevel;
      level++;
    }
    
    const currentXP = totalXP - accumulatedXP;
    const xpToNextLevel = level < 50 ? this.calculateXPForLevel(level + 1, methodology) - currentXP : 0;
    
    return { level, currentXP, xpToNextLevel };
  }
  
  /**
   * Calcula XP ganho por uma atividade
   */
  private static calculateActivityXP(
    methodology: StudyMethodology,
    activityType: MethodologyActivityType,
    metadata: any = {}
  ): number {
    const config = METHODOLOGY_XP_CONFIG[methodology][activityType as string];
    if (!config) return 0;
    
    let xp = config.base;
    
    // Aplicar multiplicadores baseados em metadados
    if (config.multipliers && metadata) {
      // Multiplicador por dificuldade
      if (metadata.difficulty && config.multipliers[metadata.difficulty]) {
        xp *= config.multipliers[metadata.difficulty];
      }
      
      // Multiplicador por streak (questões)
      if (metadata.streakCount && config.multipliers[metadata.streakCount.toString()]) {
        xp *= config.multipliers[metadata.streakCount.toString()];
      }
      
      // Multiplicador por qualidade de revisão (flashcards)
      if (metadata.reviewQuality && config.multipliers[metadata.reviewQuality.toString()]) {
        xp *= config.multipliers[metadata.reviewQuality.toString()];
      }
      
      // Multiplicador por accuracy em casos clínicos
      if (metadata.accuracy && methodology === 'clinical_cases') {
        if (metadata.accuracy >= 90) xp *= 1.5;
        else if (metadata.accuracy >= 80) xp *= 1.2;
      }
    }
    
    return Math.floor(xp);
  }
  
  // ============================================
  // OPERAÇÕES DE ATIVIDADES
  // ============================================
  
  /**
   * Registra uma atividade de XP para uma metodologia específica
   */
  static async recordMethodologyActivity(
    userId: string,
    methodology: StudyMethodology,
    activityType: MethodologyActivityType,
    metadata: any = {}
  ): Promise<{ xpGained: number; leveledUp: boolean; newLevel?: number; overallLevelUp?: boolean }> {
    return await runTransaction(db, async (transaction) => {
      // 1. Calcular XP ganho
      const xpGained = this.calculateActivityXP(methodology, activityType, metadata);
      
      // 2. Criar registro da atividade
      const activityData: Omit<MethodologyXPActivity, 'id'> = {
        userId,
        methodology,
        activityType,
        xpGained,
        description: this.getActivityDescription(methodology, activityType, metadata),
        metadata,
        createdAt: Timestamp.now()
      };
      
      const activityRef = doc(collection(db, COLLECTIONS.methodologyActivities));
      transaction.set(activityRef, activityData);
      
      // 3. Atualizar nível da metodologia
      const methodologyLevelRef = doc(db, COLLECTIONS.methodologyLevels, `${userId}_${methodology}`);
      const methodologyLevelDoc = await transaction.get(methodologyLevelRef);
      
      let currentMethodologyLevel: MethodologyLevel;
      if (methodologyLevelDoc.exists()) {
        currentMethodologyLevel = methodologyLevelDoc.data() as MethodologyLevel;
      } else {
        currentMethodologyLevel = {
          userId,
          methodology,
          currentLevel: 1,
          currentXP: 0,
          totalXP: 0,
          xpToNextLevel: this.calculateXPForLevel(2, methodology),
          updatedAt: Timestamp.now()
        };
      }
      
      // Atualizar XP da metodologia
      const newTotalXP = currentMethodologyLevel.totalXP + xpGained;
      const newLevelData = this.getLevelFromXP(newTotalXP, methodology);
      const leveledUp = newLevelData.level > currentMethodologyLevel.currentLevel;
      
      const updatedMethodologyLevel: MethodologyLevel = {
        ...currentMethodologyLevel,
        currentLevel: newLevelData.level,
        currentXP: newLevelData.currentXP,
        totalXP: newTotalXP,
        xpToNextLevel: newLevelData.xpToNextLevel,
        lastLevelUp: leveledUp ? Timestamp.now() : currentMethodologyLevel.lastLevelUp,
        updatedAt: Timestamp.now()
      };
      
      transaction.set(methodologyLevelRef, updatedMethodologyLevel);
      
      // 4. Atualizar nível geral do usuário
      const overallLevelRef = doc(db, COLLECTIONS.userOverallLevels, userId);
      const overallLevelDoc = await transaction.get(overallLevelRef);
      
      let currentOverallLevel: UserOverallLevel;
      if (overallLevelDoc.exists()) {
        currentOverallLevel = overallLevelDoc.data() as UserOverallLevel;
      } else {
        currentOverallLevel = {
          userId,
          overallLevel: 1,
          totalXP: 0,
          methodologyLevels: {
            clinical_cases: 1,
            questions: 1,
            flashcards: 1
          },
          updatedAt: Timestamp.now()
        };
      }
      
      // Atualizar nível geral
      const newOverallTotalXP = currentOverallLevel.totalXP + xpGained;
      currentOverallLevel.methodologyLevels[methodology] = newLevelData.level;
      
      // Calcular nível geral baseado na soma dos níveis das metodologias
      const sumOfMethodologyLevels = Object.values(currentOverallLevel.methodologyLevels).reduce((sum, level) => sum + level, 0);
      const newOverallLevel = Math.floor(sumOfMethodologyLevels / 3); // Média dos níveis
      const overallLevelUp = newOverallLevel > currentOverallLevel.overallLevel;
      
      const updatedOverallLevel: UserOverallLevel = {
        ...currentOverallLevel,
        overallLevel: newOverallLevel,
        totalXP: newOverallTotalXP,
        updatedAt: Timestamp.now()
      };
      
      transaction.set(overallLevelRef, updatedOverallLevel);
      
      return {
        xpGained,
        leveledUp,
        newLevel: leveledUp ? newLevelData.level : undefined,
        overallLevelUp
      };
    });
  }
  
  /**
   * Gera descrição amigável para a atividade
   */
  private static getActivityDescription(
    methodology: StudyMethodology,
    activityType: MethodologyActivityType,
    metadata: any = {}
  ): string {
    const descriptions = {
      clinical_cases: {
        case_started: 'Iniciou um caso clínico',
        case_completed: `Completou o caso clínico${metadata.caseId ? ` #${metadata.caseId}` : ''}`,
        case_perfect_score: 'Pontuação perfeita em caso clínico!',
        case_time_bonus: 'Bônus por tempo em caso clínico',
        case_difficulty_bonus: `Bônus por dificuldade (${metadata.difficulty || 'unknown'})`
      },
      questions: {
        question_correct: `Acertou questão${metadata.subject ? ` de ${metadata.subject}` : ''}`,
        question_incorrect: 'Errou questão (XP de participação)',
        question_streak: `Sequência de ${metadata.streakCount || 'várias'} questões corretas!`,
        quiz_completed: 'Completou um quiz',
        perfect_quiz: 'Quiz perfeito - todas corretas!',
        speed_bonus: 'Bônus por velocidade'
      },
      flashcards: {
        card_reviewed: 'Revisou um flashcard',
        card_mastered: `Dominou um flashcard (qualidade ${metadata.reviewQuality || 'unknown'})`,
        deck_completed: 'Completou um deck de flashcards',
        review_streak: `Sequência de ${metadata.streakCount || 'várias'} revisões`,
        spaced_repetition_bonus: 'Bônus por repetição espaçada'
      }
    };
    
    const methodologyDescriptions = descriptions[methodology] as Record<string, string>;
    return methodologyDescriptions[activityType] || `Atividade: ${activityType}`;
  }
  
  // ============================================
  // CONSULTAS DE DADOS
  // ============================================
  
  /**
   * Busca nível de uma metodologia específica
   */
  static async getMethodologyLevel(userId: string, methodology: StudyMethodology): Promise<MethodologyLevel> {
    const docRef = doc(db, COLLECTIONS.methodologyLevels, `${userId}_${methodology}`);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as MethodologyLevel;
    }
    
    // Retornar nível inicial
    return {
      userId,
      methodology,
      currentLevel: 1,
      currentXP: 0,
      totalXP: 0,
      xpToNextLevel: this.calculateXPForLevel(2, methodology),
      updatedAt: Timestamp.now()
    };
  }
  
  /**
   * Busca nível geral do usuário
   */
  static async getUserOverallLevel(userId: string): Promise<UserOverallLevel> {
    const docRef = doc(db, COLLECTIONS.userOverallLevels, userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as UserOverallLevel;
    }
    
    // Retornar nível inicial
    return {
      userId,
      overallLevel: 1,
      totalXP: 0,
      methodologyLevels: {
        clinical_cases: 1,
        questions: 1,
        flashcards: 1
      },
      updatedAt: Timestamp.now()
    };
  }
  
  /**
   * Busca todos os níveis de metodologias do usuário
   */
  static async getAllMethodologyLevels(userId: string): Promise<Record<StudyMethodology, MethodologyLevel>> {
    const methodologies: StudyMethodology[] = ['clinical_cases', 'questions', 'flashcards'];
    
    const levels = await Promise.all(
      methodologies.map(methodology => this.getMethodologyLevel(userId, methodology))
    );
    
    return {
      clinical_cases: levels[0],
      questions: levels[1],
      flashcards: levels[2]
    };
  }
  
  /**
   * Busca atividades recentes de uma metodologia
   */
  static async getMethodologyActivities(
    userId: string,
    methodology?: StudyMethodology,
    limitCount: number = 20
  ): Promise<MethodologyXPActivity[]> {
    let q = query(
      collection(db, COLLECTIONS.methodologyActivities),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    
    if (methodology) {
      q = query(
        collection(db, COLLECTIONS.methodologyActivities),
        where('userId', '==', userId),
        where('methodology', '==', methodology),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as MethodologyXPActivity));
  }
  
  /**
   * Calcula estatísticas completas por metodologia
   */
  static async getUserMethodologyStats(userId: string): Promise<UserMethodologyStats> {
    const [overallLevel, methodologyLevels, activities] = await Promise.all([
      this.getUserOverallLevel(userId),
      this.getAllMethodologyLevels(userId),
      this.getMethodologyActivities(userId, undefined, 1000)
    ]);
    
    // Calcular estatísticas por metodologia
    const methodologyStats: Record<StudyMethodology, MethodologyStats> = {
      clinical_cases: this.calculateMethodologyStats('clinical_cases', methodologyLevels.clinical_cases, activities),
      questions: this.calculateMethodologyStats('questions', methodologyLevels.questions, activities),
      flashcards: this.calculateMethodologyStats('flashcards', methodologyLevels.flashcards, activities)
    };
    
    // Determinar metodologia favorita
    const favoriteMethodology = Object.entries(methodologyStats)
      .sort(([,a], [,b]) => b.totalXP - a.totalXP)[0][0] as StudyMethodology;
    
    return {
      userId,
      overallStats: {
        totalLevel: overallLevel.overallLevel,
        totalXP: overallLevel.totalXP,
        totalActivities: activities.length,
        totalTimeSpent: activities.reduce((sum, activity) => sum + (activity.metadata?.timeSpent || 0), 0),
        favoriteMethodology
      },
      methodologyStats,
      updatedAt: Timestamp.now()
    };
  }
  
  /**
   * Calcula estatísticas para uma metodologia específica
   */
  private static calculateMethodologyStats(
    methodology: StudyMethodology,
    level: MethodologyLevel,
    allActivities: MethodologyXPActivity[]
  ): MethodologyStats {
    const methodologyActivities = allActivities.filter(a => a.methodology === methodology);
    
    // Calcular streak atual
    let currentStreak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < methodologyActivities.length; i++) {
      const activityDate = methodologyActivities[i].createdAt.toDate();
      activityDate.setHours(0, 0, 0, 0);
      
      const daysDiff = Math.floor((today.getTime() - activityDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === i) {
        currentStreak++;
      } else {
        break;
      }
    }
    
    // Calcular melhor streak
    let bestStreak = 0;
    let tempStreak = 0;
    let lastDate: Date | null = null;
    
    for (const activity of methodologyActivities) {
      const activityDate = activity.createdAt.toDate();
      activityDate.setHours(0, 0, 0, 0);
      
      if (!lastDate || Math.abs(activityDate.getTime() - lastDate.getTime()) <= 24 * 60 * 60 * 1000) {
        tempStreak++;
        bestStreak = Math.max(bestStreak, tempStreak);
      } else {
        tempStreak = 1;
      }
      
      lastDate = activityDate;
    }
    
    // Calcular performance média baseada na metodologia
    let averagePerformance = 0;
    if (methodology === 'clinical_cases') {
      const accuracies = methodologyActivities
        .map(a => a.metadata?.accuracy)
        .filter(acc => acc !== undefined);
      averagePerformance = accuracies.length > 0 
        ? accuracies.reduce((sum, acc) => sum + acc, 0) / accuracies.length 
        : 0;
    } else if (methodology === 'questions') {
      const correctAnswers = methodologyActivities.filter(a => a.activityType === 'question_correct').length;
      const totalAnswers = methodologyActivities.filter(a => 
        a.activityType === 'question_correct' || a.activityType === 'question_incorrect'
      ).length;
      averagePerformance = totalAnswers > 0 ? (correctAnswers / totalAnswers) * 100 : 0;
    } else if (methodology === 'flashcards') {
      const qualities = methodologyActivities
        .map(a => a.metadata?.reviewQuality)
        .filter(q => q !== undefined);
      averagePerformance = qualities.length > 0 
        ? (qualities.reduce((sum, q) => sum + q, 0) / qualities.length) * 20 // Converter escala 1-5 para 0-100
        : 0;
    }
    
    return {
      methodology,
      currentLevel: level.currentLevel,
      totalXP: level.totalXP,
      totalActivities: methodologyActivities.length,
      currentStreak,
      bestStreak,
      averagePerformance,
      timeSpent: methodologyActivities.reduce((sum, activity) => sum + (activity.metadata?.timeSpent || 0), 0),
      lastActivity: methodologyActivities.length > 0 ? methodologyActivities[0].createdAt : undefined,
      specific: this.calculateSpecificStats(methodology, methodologyActivities)
    };
  }
  
  /**
   * Calcula estatísticas específicas por metodologia
   */
  private static calculateSpecificStats(methodology: StudyMethodology, activities: MethodologyXPActivity[]): any {
    switch (methodology) {
      case 'clinical_cases':
        return {
          casesCompleted: activities.filter(a => a.activityType === 'case_completed').length,
          perfectCases: activities.filter(a => a.activityType === 'case_perfect_score').length,
          averageAccuracy: activities
            .map(a => a.metadata?.accuracy)
            .filter(acc => acc !== undefined)
            .reduce((sum, acc, _, arr) => sum + acc / arr.length, 0) || 0
        };
        
      case 'questions':
        const correctAnswers = activities.filter(a => a.activityType === 'question_correct').length;
        const incorrectAnswers = activities.filter(a => a.activityType === 'question_incorrect').length;
        return {
          questionsAnswered: correctAnswers + incorrectAnswers,
          correctAnswers,
          incorrectAnswers,
          quizzesCompleted: activities.filter(a => a.activityType === 'quiz_completed').length
        };
        
      case 'flashcards':
        return {
          cardsReviewed: activities.filter(a => a.activityType === 'card_reviewed').length,
          cardsMastered: activities.filter(a => a.activityType === 'card_mastered').length,
          decksCompleted: activities.filter(a => a.activityType === 'deck_completed').length,
          averageReviewQuality: activities
            .map(a => a.metadata?.reviewQuality)
            .filter(q => q !== undefined)
            .reduce((sum, q, _, arr) => sum + q / arr.length, 0) || 0
        };
        
      default:
        return {};
    }
  }
  
  // ============================================
  // MÉTODOS DE CONVENIÊNCIA
  // ============================================
  
  /**
   * Registra atividade de caso clínico
   */
  static async recordClinicalCaseActivity(
    userId: string,
    activityType: 'case_started' | 'case_completed' | 'case_perfect_score' | 'case_time_bonus',
    metadata: {
      caseId?: string;
      difficulty?: 'easy' | 'medium' | 'hard';
      timeSpent?: number;
      accuracy?: number;
      stepsCompleted?: number;
      totalSteps?: number;
    } = {}
  ) {
    return this.recordMethodologyActivity(userId, 'clinical_cases', activityType, metadata);
  }
  
  /**
   * Registra atividade de questão
   */
  static async recordQuestionActivity(
    userId: string,
    activityType: 'question_correct' | 'question_incorrect' | 'question_streak' | 'quiz_completed' | 'perfect_quiz',
    metadata: {
      questionId?: string;
      difficulty?: 'easy' | 'medium' | 'hard';
      subject?: string;
      timeSpent?: number;
      streakCount?: number;
      examType?: string;
    } = {}
  ) {
    return this.recordMethodologyActivity(userId, 'questions', activityType, metadata);
  }
  
  /**
   * Registra atividade de flashcard
   */
  static async recordFlashcardActivity(
    userId: string,
    activityType: 'card_reviewed' | 'card_mastered' | 'deck_completed' | 'review_streak',
    metadata: {
      cardId?: string;
      deckId?: string;
      reviewQuality?: 1 | 2 | 3 | 4 | 5;
      timeSpent?: number;
      intervalDays?: number;
      streakCount?: number;
    } = {}
  ) {
    return this.recordMethodologyActivity(userId, 'flashcards', activityType, metadata);
  }
  
  /**
   * Obtém título da metodologia baseado no nível
   */
  static getMethodologyTitle(methodology: StudyMethodology, level: number): string {
    const titles = METHODOLOGY_TITLES[methodology];
    
    // Encontrar o título mais próximo do nível atual
    const availableLevels = Object.keys(titles).map(Number).sort((a, b) => a - b);
    let titleLevel = availableLevels[0];
    
    for (const availableLevel of availableLevels) {
      if (level >= availableLevel) {
        titleLevel = availableLevel;
      } else {
        break;
      }
    }
    
    return titles[titleLevel] || 'Estudante';
  }
}