import { useState, useEffect, useCallback } from 'react';
import type { Explanation } from '../data/explanations';
import { 
  getExplanation, 
  searchExplanations,
  getExplanationsByCategory,
  getExplanationsByType,
  getAvailableCategories,
  getExplanationsStats
} from '../data/explanations';
import { 
  loadExplanationsFromFirebase, 
  clearExplanationsCache,
  searchExplanationsInCache 
} from '../services/explanationsService';

// Hook principal para gerenciar explicações (Firebase + Local)
export const useExplanations = () => {
  const [explanations, setExplanations] = useState<Record<string, Explanation>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [useFirebase, setUseFirebase] = useState(true);
  const [isReady, setIsReady] = useState(false);

  // Carregar explicações (Firebase ou Local)
  const loadExplanations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (useFirebase) {
        const firebaseExplanations = await loadExplanationsFromFirebase();
        setExplanations(firebaseExplanations);
      } else {
        const { explanationsDatabase } = await import('../data/explanations');
        setExplanations(explanationsDatabase);
      }
      
      setIsReady(true);
      
    } catch (err) {
      console.error('❌ Erro ao carregar explicações:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      
      // Fallback automático para local se Firebase falhar
      if (useFirebase) {
        try {
          const { explanationsDatabase } = await import('../data/explanations');
          setExplanations(explanationsDatabase);
          setUseFirebase(false);
          setIsReady(true);
          setError(null);
        } catch (fallbackErr) {
          console.error('❌ Erro no fallback:', fallbackErr);
        }
      }
      
    } finally {
      setLoading(false);
    }
  }, [useFirebase]);

  // Refresh manual
  const refreshExplanations = useCallback(async () => {
    if (useFirebase) {
      clearExplanationsCache();
    }
    await loadExplanations();
  }, [loadExplanations, useFirebase]);

  // Obter explicação específica
  const getExplanationById = useCallback((id: string): Explanation | null => {
    return explanations[id] || null;
  }, [explanations]);

  // Buscar explicações
  const searchExplanationsLocal = useCallback((query: string): Explanation[] => {
    if (!query.trim()) return [];
    
    if (useFirebase && Object.keys(explanations).length > 0) {
      return searchExplanationsInCache(query);
    } else {
      return searchExplanations(query);
    }
  }, [explanations, useFirebase]);

  // Carregar ao montar
  useEffect(() => {
    loadExplanations();
  }, [loadExplanations]);

  return {
    explanations,
    loading,
    error,
    isReady,
    useFirebase,
    setUseFirebase,
    getExplanation: getExplanationById,
    searchExplanations: searchExplanationsLocal,
    refreshExplanations
  };
};

// Hook para uma explicação específica
export const useExplanation = (id: string) => {
  const [explanation, setExplanation] = useState<Explanation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const result = getExplanation(id);
    setExplanation(result);
    setLoading(false);
  }, [id]);

  return { explanation, loading };
};

// Hook para buscar explicações
export const useExplanationSearch = () => {
  const [results, setResults] = useState<Explanation[]>([]);
  const [loading, setLoading] = useState(false);

  const search = async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    // Simular delay de busca para UX
    await new Promise(resolve => setTimeout(resolve, 300));
    const searchResults = searchExplanations(query);
    setResults(searchResults);
    setLoading(false);
  };

  const searchByCategory = (category: string) => {
    setLoading(true);
    const results = getExplanationsByCategory(category);
    setResults(results);
    setLoading(false);
  };

  const searchByType = (type: string) => {
    setLoading(true);
    const results = getExplanationsByType(type);
    setResults(results);
    setLoading(false);
  };

  const clearResults = () => {
    setResults([]);
  };

  return {
    results,
    loading,
    search,
    searchByCategory,
    searchByType,
    clearResults
  };
};

// Hook para categorias
export const useExplanationCategories = () => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const availableCategories = getAvailableCategories();
    setCategories(availableCategories);
  }, []);

  return { categories };
};

// Hook para estatísticas
export const useExplanationStats = () => {
  const [stats, setStats] = useState(getExplanationsStats());

  useEffect(() => {
    setStats(getExplanationsStats());
  }, []);

  return { stats };
};

// Hook para gerenciar histórico de explicações visualizadas
export const useExplanationHistory = () => {
  const [history, setHistory] = useState<string[]>([]);

  const addToHistory = (explanationId: string) => {
    setHistory(prev => {
      const newHistory = prev.filter(id => id !== explanationId);
      newHistory.unshift(explanationId);
      return newHistory.slice(0, 20); // Manter apenas os 20 mais recentes
    });
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const getRecentExplanations = () => {
    return history.map(id => getExplanation(id)).filter(Boolean) as Explanation[];
  };

  return {
    history,
    addToHistory,
    clearHistory,
    getRecentExplanations
  };
};

// Hook para tema das explicações baseado no contexto da aplicação
export const useExplanationTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'medical' | 'educational'>('light');

  // Detectar tema do sistema ou contexto da aplicação
  useEffect(() => {
    const detectTheme = () => {
      // Verificar se existe um tema definido globalmente
      const savedTheme = localStorage.getItem('explanationTheme');
      if (savedTheme) {
        setTheme(savedTheme as any);
        return;
      }

      // Detectar baseado no tema dark/light do sistema
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
      } else {
        setTheme('light');
      }
    };

    detectTheme();

    // Escutar mudanças no tema do sistema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => detectTheme();
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const setExplanationTheme = (newTheme: 'light' | 'dark' | 'medical' | 'educational') => {
    setTheme(newTheme);
    localStorage.setItem('explanationTheme', newTheme);
  };

  return { theme, setExplanationTheme };
};

// Hook para analytics/métricas de explicações
export const useExplanationAnalytics = () => {
  const [viewedExplanations, setViewedExplanations] = useState<Record<string, number>>({});
  const [popularExplanations, setPopularExplanations] = useState<string[]>([]);

  const trackView = (explanationId: string) => {
    setViewedExplanations(prev => ({
      ...prev,
      [explanationId]: (prev[explanationId] || 0) + 1
    }));
  };

  const getViewCount = (explanationId: string) => {
    return viewedExplanations[explanationId] || 0;
  };

  const getMostViewed = (limit: number = 10) => {
    return Object.entries(viewedExplanations)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([id]) => id);
  };

  useEffect(() => {
    // Atualizar lista de explicações populares
    const popular = getMostViewed(5);
    setPopularExplanations(popular);
  }, [viewedExplanations]);

  return {
    viewedExplanations,
    popularExplanations,
    trackView,
    getViewCount,
    getMostViewed
  };
};