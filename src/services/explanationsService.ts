import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  query, 
  where, 
  orderBy 
} from 'firebase/firestore';
import { db, FIREBASE_CONFIG } from '../config/firebase';
import type { Explanation } from '../data/explanations';

// Cache para armazenar explicações carregadas
let explanationsCache: Record<string, Explanation> = {};
let lastCacheUpdate: Date | null = null;
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutos

// Interface para metadados das explicações
interface ExplanationsMetadata {
  totalExplanations: number;
  lastUpdated: Date;
  version: string;
  categories: string[];
}

/**
 * Carrega todas as explicações do Firebase
 */
export const loadExplanationsFromFirebase = async (): Promise<Record<string, Explanation>> => {
  try {
    // Verificar se Firebase está habilitado
    if (!FIREBASE_CONFIG.USE_FIREBASE) {
      throw new Error('Firebase desabilitado na configuração');
    }

    // Verificar se cache ainda é válido
    if (
      Object.keys(explanationsCache).length > 0 && 
      lastCacheUpdate && 
      (Date.now() - lastCacheUpdate.getTime()) < CACHE_DURATION
    ) {
      if (FIREBASE_CONFIG.ENABLE_LOGGING) {
        console.log('📦 Usando cache de explicações');
      }
      return explanationsCache;
    }

    if (FIREBASE_CONFIG.ENABLE_LOGGING) {
      console.log('🔄 Carregando explicações do Firebase...');
    }
    
    const explanationsRef = collection(db, 'explanations');
    const snapshot = await getDocs(explanationsRef);
    
    const explanations: Record<string, Explanation> = {};
    
    snapshot.forEach((doc) => {
      const data = doc.data();
      explanations[doc.id] = {
        id: doc.id,
        type: data.type,
        title: data.title,
        content: data.content,
        icon: data.icon,
        category: data.category,
        examples: data.examples || [],
        relatedLinks: data.relatedLinks || [],
        keywords: data.keywords || [],
        difficulty: data.difficulty || 'basic',
        lastUpdated: data.updatedAt?.toDate() || new Date()
      };
    });
    
    // Atualizar cache
    explanationsCache = explanations;
    lastCacheUpdate = new Date();
    
    if (FIREBASE_CONFIG.ENABLE_LOGGING) {
      console.log(`✅ ${Object.keys(explanations).length} explicações carregadas do Firebase`);
    }
    
    return explanations;
    
  } catch (error) {
    if (FIREBASE_CONFIG.ENABLE_LOGGING) {
      console.error('❌ Erro ao carregar explicações do Firebase:', error);
    }
    
    // Fallback: usar explicações locais se habilitado
    if (FIREBASE_CONFIG.USE_LOCAL_FALLBACK) {
      console.log('🔄 Usando explicações locais como fallback...');
      const { explanationsDatabase } = await import('../data/explanations');
      return explanationsDatabase;
    }
    
    throw error;
  }
};

/**
 * Carrega uma explicação específica por ID
 */
export const getExplanationFromFirebase = async (id: string): Promise<Explanation | null> => {
  try {
    // Verificar cache primeiro
    if (explanationsCache[id]) {
      return explanationsCache[id];
    }
    
    const docRef = doc(db, 'explanations', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      const explanation: Explanation = {
        id: docSnap.id,
        type: data.type,
        title: data.title,
        content: data.content,
        icon: data.icon,
        category: data.category,
        examples: data.examples || [],
        relatedLinks: data.relatedLinks || [],
        keywords: data.keywords || [],
        difficulty: data.difficulty || 'basic',
        lastUpdated: data.updatedAt?.toDate() || new Date()
      };
      
      // Adicionar ao cache
      explanationsCache[id] = explanation;
      
      return explanation;
    }
    
    return null;
    
  } catch (error) {
    console.error(`❌ Erro ao carregar explicação ${id}:`, error);
    return null;
  }
};

/**
 * Carrega explicações por categoria
 */
export const getExplanationsByCategory = async (category: string): Promise<Explanation[]> => {
  try {
    const explanationsRef = collection(db, 'explanations');
    const q = query(
      explanationsRef, 
      where('category', '==', category),
      orderBy('title')
    );
    
    const snapshot = await getDocs(q);
    const explanations: Explanation[] = [];
    
    snapshot.forEach((doc) => {
      const data = doc.data();
      explanations.push({
        id: doc.id,
        type: data.type,
        title: data.title,
        content: data.content,
        icon: data.icon,
        category: data.category,
        examples: data.examples || [],
        relatedLinks: data.relatedLinks || [],
        keywords: data.keywords || [],
        difficulty: data.difficulty || 'basic',
        lastUpdated: data.updatedAt?.toDate() || new Date()
      });
    });
    
    return explanations;
    
  } catch (error) {
    console.error(`❌ Erro ao carregar explicações da categoria ${category}:`, error);
    return [];
  }
};

/**
 * Carrega metadados das explicações
 */
export const getExplanationsMetadata = async (): Promise<ExplanationsMetadata | null> => {
  try {
    const metadataRef = doc(db, 'metadata', 'explanations');
    const docSnap = await getDoc(metadataRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        totalExplanations: data.totalExplanations,
        lastUpdated: data.lastUpdated?.toDate() || new Date(),
        version: data.version,
        categories: data.categories || []
      };
    }
    
    return null;
    
  } catch (error) {
    console.error('❌ Erro ao carregar metadados:', error);
    return null;
  }
};

/**
 * Limpa o cache de explicações
 */
export const clearExplanationsCache = (): void => {
  explanationsCache = {};
  lastCacheUpdate = null;
  console.log('🧹 Cache de explicações limpo');
};

/**
 * Atualiza uma explicação específica no cache
 */
export const updateExplanationInCache = (id: string, explanation: Explanation): void => {
  explanationsCache[id] = explanation;
  console.log(`📝 Explicação ${id} atualizada no cache`);
};

/**
 * Busca explicações por palavra-chave (busca local no cache)
 */
export const searchExplanationsInCache = (query: string): Explanation[] => {
  const lowercaseQuery = query.toLowerCase();
  
  return Object.values(explanationsCache).filter(explanation =>
    explanation.keywords?.some(keyword => 
      keyword.toLowerCase().includes(lowercaseQuery)
    ) ||
    explanation.title?.toLowerCase().includes(lowercaseQuery) ||
    explanation.content.toLowerCase().includes(lowercaseQuery)
  );
};