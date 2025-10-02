import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  QueryConstraint,
  Timestamp,
  writeBatch
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { Question } from '../data/types/Question';
import { allQuestions } from '../data/questions';

// Coleção de questões no Firestore
const QUESTIONS_COLLECTION = 'questions';

// Interface para questão com dados do Firebase
export interface FirebaseQuestion extends Omit<Question, 'id'> {
  id?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

// Interface para filtros de busca
export interface QuestionFilters {
  category?: string | string[];
  difficulty?: 'Fácil' | 'Médio' | 'Difícil' | 'Todas';
  exam?: string;
  tags?: string[];
  completed?: boolean;
  searchText?: string;
}

// Interface para parâmetros de paginação
export interface PaginationParams {
  limitCount?: number;
  startAfter?: any;
}

class QuestionsService {
  
  /**
   * Buscar todas as questões
   */
  async getAllQuestions(): Promise<Question[]> {
    try {
      const questionsRef = collection(db, QUESTIONS_COLLECTION);
      const snapshot = await getDocs(questionsRef);
      
      const firebaseQuestions = snapshot.docs.map(doc => ({
        id: parseInt(doc.id) || 0,
        ...doc.data()
      })) as Question[];

      // Se não há questões no Firebase, usar questões locais
      if (firebaseQuestions.length === 0) {
        console.log('📋 Usando questões locais como fallback');
        return allQuestions;
      }

      return firebaseQuestions;
    } catch (error) {
      console.error('Erro ao buscar questões do Firebase, usando questões locais:', error);
      return allQuestions;
    }
  }

  /**
   * Buscar questões com filtros
   */
  async getQuestionsWithFilters(
    filters: QuestionFilters = {}, 
    pagination: PaginationParams = {}
  ): Promise<Question[]> {
    try {
      const questionsRef = collection(db, QUESTIONS_COLLECTION);
      const constraints: QueryConstraint[] = [];

      // Aplicar filtros
      if (filters.category && filters.category !== 'Todas') {
        if (Array.isArray(filters.category)) {
          constraints.push(where('category', 'array-contains-any', filters.category));
        } else {
          constraints.push(where('category', 'array-contains', filters.category));
        }
      }

      if (filters.difficulty && filters.difficulty !== 'Todas') {
        constraints.push(where('difficulty', '==', filters.difficulty));
      }

      if (filters.exam && filters.exam !== 'Todas') {
        constraints.push(where('exam', '==', filters.exam));
      }

      if (filters.completed !== undefined) {
        constraints.push(where('completed', '==', filters.completed));
      }

      if (filters.tags && filters.tags.length > 0) {
        constraints.push(where('tags', 'array-contains-any', filters.tags));
      }

      // Ordenação
      constraints.push(orderBy('createdAt', 'desc'));

      // Paginação
      if (pagination.limitCount) {
        constraints.push(limit(pagination.limitCount));
      }

      const q = query(questionsRef, ...constraints);
      const snapshot = await getDocs(q);
      
      let questions = snapshot.docs.map(doc => ({
        id: parseInt(doc.id) || 0,
        ...doc.data()
      })) as Question[];

      // Filtro de texto (client-side para melhor flexibilidade)
      if (filters.searchText) {
        const searchLower = filters.searchText.toLowerCase();
        questions = questions.filter(question => 
          question.title.toLowerCase().includes(searchLower) ||
          question.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
          (question.statement && question.statement.toLowerCase().includes(searchLower))
        );
      }

      return questions;
    } catch (error) {
      console.error('Erro ao buscar questões com filtros:', error);
      throw new Error('Falha ao carregar questões filtradas');
    }
  }

  /**
   * Buscar questão por ID
   */
  async getQuestionById(id: string | number): Promise<Question | null> {
    try {
      const docRef = doc(db, QUESTIONS_COLLECTION, id.toString());
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          id: parseInt(docSnap.id) || 0,
          ...docSnap.data()
        } as Question;
      }
      
      // Se não encontrou no Firebase, buscar nas questões locais
      const localQuestion = allQuestions.find(q => q.id === parseInt(id.toString()));
      if (localQuestion) {
        console.log(`📋 Usando questão local ${id} como fallback`);
        return localQuestion;
      }
      
      return null;
    } catch (error) {
      console.error('Erro ao buscar questão por ID no Firebase, tentando questões locais:', error);
      
      // Em caso de erro, buscar nas questões locais
      const localQuestion = allQuestions.find(q => q.id === parseInt(id.toString()));
      if (localQuestion) {
        console.log(`📋 Usando questão local ${id} como fallback após erro`);
        return localQuestion;
      }
      
      return null;
    }
  }

  /**
   * Criar nova questão
   */
  async createQuestion(questionData: Omit<Question, 'id'>): Promise<string> {
    try {
      const newQuestion: FirebaseQuestion = {
        ...questionData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };

      const docRef = await addDoc(collection(db, QUESTIONS_COLLECTION), newQuestion);
      return docRef.id;
    } catch (error) {
      console.error('Erro ao criar questão:', error);
      throw new Error('Falha ao criar questão');
    }
  }

  /**
   * Atualizar questão existente
   */
  async updateQuestion(id: string | number, updates: Partial<Question>): Promise<void> {
    try {
      const docRef = doc(db, QUESTIONS_COLLECTION, id.toString());
      const updateData = {
        ...updates,
        updatedAt: Timestamp.now()
      };
      
      await updateDoc(docRef, updateData);
    } catch (error) {
      console.error('Erro ao atualizar questão:', error);
      throw new Error('Falha ao atualizar questão');
    }
  }

  /**
   * Deletar questão
   */
  async deleteQuestion(id: string | number): Promise<void> {
    try {
      await deleteDoc(doc(db, QUESTIONS_COLLECTION, id.toString()));
    } catch (error) {
      console.error('Erro ao deletar questão:', error);
      throw new Error('Falha ao deletar questão');
    }
  }

  /**
   * Marcar questão como completada/não completada
   */
  async toggleQuestionCompletion(id: string | number, completed: boolean): Promise<void> {
    try {
      await this.updateQuestion(id, { completed });
    } catch (error) {
      console.error('Erro ao alterar status da questão:', error);
      throw new Error('Falha ao alterar status da questão');
    }
  }

  /**
   * Buscar questões por categoria
   */
  async getQuestionsByCategory(category: string): Promise<Question[]> {
    return this.getQuestionsWithFilters({ category });
  }

  /**
   * Buscar questões por exame
   */
  async getQuestionsByExam(exam: string): Promise<Question[]> {
    return this.getQuestionsWithFilters({ exam });
  }

  /**
   * Buscar questões por dificuldade
   */
  async getQuestionsByDifficulty(difficulty: 'Fácil' | 'Médio' | 'Difícil' | 'Todas'): Promise<Question[]> {
    return this.getQuestionsWithFilters({ difficulty });
  }

  /**
   * Migrar questões locais para Firebase (usar apenas uma vez)
   */
  async migrateLocalQuestions(localQuestions: Question[]): Promise<void> {
    try {
      console.log('🚀 Iniciando migração de questões para Firebase...');
      console.log(`📊 Total de questões a migrar: ${localQuestions.length}`);

      // Verificar permissões antes da migração
      try {
        const testRef = collection(db, QUESTIONS_COLLECTION);
        const testDoc = doc(testRef, 'permission-test');
        await addDoc(testRef, { test: true });
        await deleteDoc(testDoc);
        console.log('✅ Permissões verificadas com sucesso');
      } catch (permissionError) {
        console.error('❌ Erro de permissões detectado:', permissionError);
        throw new Error(
          'Erro de permissões no Firestore. ' +
          'Verifique as regras do Firebase Console. ' +
          'Para desenvolvimento, configure regras que permitam write: if true. ' +
          'Consulte docs/FIRESTORE-PERMISSIONS.md para mais detalhes.'
        );
      }

      const batch = writeBatch(db);
      const questionsRef = collection(db, QUESTIONS_COLLECTION);

      localQuestions.forEach((question) => {
        const { id, ...questionData } = question;
        const newDocRef = doc(questionsRef, id.toString());
        
        const firebaseQuestion: FirebaseQuestion = {
          ...questionData,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now()
        };

        batch.set(newDocRef, firebaseQuestion);
      });

      await batch.commit();
      console.log('✅ Migração de questões concluída com sucesso!');
    } catch (error) {
      console.error('❌ Erro na migração:', error);
      
      if (error instanceof Error) {
        if (error.message.includes('permission') || error.message.includes('Permission')) {
          throw new Error('Erro de permissões no Firestore. Verifique as regras de segurança.');
        }
        throw new Error(`Falha na migração das questões: ${error.message}`);
      }
      
      throw new Error('Falha na migração das questões');
    }
  }

  /**
   * Obter estatísticas das questões
   */
  async getQuestionsStats(): Promise<{
    total: number;
    completed: number;
    avgCorrectRate: number;
    byDifficulty: Record<string, number>;
    byCategory: Record<string, number>;
  }> {
    try {
      const questions = await this.getAllQuestions();
      
      const total = questions.length;
      const completed = questions.filter(q => q.completed).length;
      const avgCorrectRate = completed > 0 
        ? Math.round(questions.filter(q => q.completed).reduce((sum, q) => sum + q.correctRate, 0) / completed)
        : 0;

      const byDifficulty = questions.reduce((acc, q) => {
        acc[q.difficulty] = (acc[q.difficulty] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const byCategory = questions.reduce((acc, q) => {
        if (Array.isArray(q.category)) {
          q.category.forEach(cat => {
            acc[cat] = (acc[cat] || 0) + 1;
          });
        } else {
          acc[q.category] = (acc[q.category] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>);

      return {
        total,
        completed,
        avgCorrectRate,
        byDifficulty,
        byCategory
      };
    } catch (error) {
      console.error('Erro ao obter estatísticas:', error);
      throw new Error('Falha ao carregar estatísticas');
    }
  }
}

// Instância singleton do serviço
export const questionsService = new QuestionsService();

// Funções de conveniência (mantém compatibilidade com código existente)
export const getQuestionById = (id: number): Promise<Question | null> => 
  questionsService.getQuestionById(id);

export const getQuestionsByCategory = (category: string): Promise<Question[]> => 
  questionsService.getQuestionsByCategory(category);

export const getQuestionsByExam = (exam: string): Promise<Question[]> => 
  questionsService.getQuestionsByExam(exam);

export const getQuestionsByDifficulty = (difficulty: 'Fácil' | 'Médio' | 'Difícil' | 'Todas'): Promise<Question[]> => 
  questionsService.getQuestionsByDifficulty(difficulty);