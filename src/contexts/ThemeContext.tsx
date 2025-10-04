import { createContext, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';

interface ThemeContextType {
  theme: 'penaped';
  toggleTheme?: () => void; // Mantém para compatibilidade, mas não faz nada
  setTheme?: (theme: string) => void; // Mantém para compatibilidade, mas não faz nada
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Aplicar tema PéNaPED fixo na inicialização
  useEffect(() => {
    // Sempre aplicar o tema PéNaPED
    document.documentElement.setAttribute('data-theme', 'penaped');
    document.documentElement.classList.add('penaped-theme');
    // Remove classes dark/light se existirem
    document.documentElement.classList.remove('dark', 'light');
  }, []);

  const value: ThemeContextType = {
    theme: 'penaped',
    toggleTheme: () => {}, // Função vazia para compatibilidade
    setTheme: () => {} // Função vazia para compatibilidade
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}