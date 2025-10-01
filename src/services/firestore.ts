import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  getDoc, 
  getDocs, 
  query, 
  where,
  orderBy,
  limit,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Tipos para os dados do usuário
export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface StudySession {
  id?: string;
  userId: string;
  questionId: string;
  correct: boolean;
  timeSpent: number; // em segundos
  difficulty: 'easy' | 'medium' | 'hard';
  subject: string;
  createdAt: Timestamp;
}

export interface UserStats {
  userId: string;
  totalQuestions: number;
  correctAnswers: number;
  totalTimeSpent: number;
  streak: number;
  lastActivityDate: Timestamp;
  favoriteSubjects: string[];
}

// Serviços para gerenciar perfis de usuário
export const userService = {
  // Criar perfil do usuário
  async createUserProfile(userData: Omit<UserProfile, 'createdAt' | 'updatedAt'>) {
    const now = Timestamp.now();
    const profileData = {
      ...userData,
      createdAt: now,
      updatedAt: now
    };
    
    const docRef = doc(db, 'users', userData.uid);
    await updateDoc(docRef, profileData);
    return docRef.id;
  },

  // Buscar perfil do usuário
  async getUserProfile(uid: string): Promise<UserProfile | null> {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { uid, ...docSnap.data() } as UserProfile;
    }
    return null;
  },

  // Atualizar perfil do usuário
  async updateUserProfile(uid: string, updates: Partial<UserProfile>) {
    const docRef = doc(db, 'users', uid);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: Timestamp.now()
    });
  }
};

// Serviços para gerenciar sessões de estudo
export const studyService = {
  // Registrar uma sessão de estudo
  async recordStudySession(sessionData: Omit<StudySession, 'id' | 'createdAt'>) {
    const data = {
      ...sessionData,
      createdAt: Timestamp.now()
    };
    
    const docRef = await addDoc(collection(db, 'study_sessions'), data);
    return docRef.id;
  },

  // Buscar sessões de estudo do usuário
  async getUserStudySessions(userId: string, limitCount = 50) {
    const q = query(
      collection(db, 'study_sessions'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as StudySession[];
  },

  // Buscar estatísticas do usuário
  async getUserStats(userId: string): Promise<UserStats | null> {
    const docRef = doc(db, 'user_stats', userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { userId, ...docSnap.data() } as UserStats;
    }
    return null;
  },

  // Atualizar estatísticas do usuário
  async updateUserStats(userId: string, updates: Partial<UserStats>) {
    const docRef = doc(db, 'user_stats', userId);
    await updateDoc(docRef, updates);
  }
};

// Utilitários
export const firestoreUtils = {
  // Converter timestamp do Firestore para Date
  timestampToDate(timestamp: Timestamp): Date {
    return timestamp.toDate();
  },

  // Converter Date para timestamp do Firestore
  dateToTimestamp(date: Date): Timestamp {
    return Timestamp.fromDate(date);
  }
};