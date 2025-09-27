import { useTheme } from '../contexts/ThemeContext';

/**
 * Hook personalizado para aplicar classes de tema condicionais
 * Facilita a aplicação de estilos baseados no tema atual
 */
export function useThemeClasses() {
  const { theme } = useTheme();

  const getThemeClasses = {
    // Backgrounds
    card: 'theme-card',
    primary: 'theme-bg-primary',
    secondary: 'theme-bg-secondary',
    
    // Text
    textPrimary: 'theme-text-primary',
    textSecondary: 'theme-text-secondary',
    textTertiary: 'theme-text-tertiary',
    
    // Borders
    border: 'theme-border',
    borderSecondary: 'theme-border-secondary',
    
    // Shadows
    shadowSm: 'theme-shadow-sm',
    shadowMd: 'theme-shadow-md',
    shadowLg: 'theme-shadow-lg',
    
    // Buttons
    buttonPrimary: 'theme-button-primary',
    
    // Inputs
    input: 'theme-input',
  };

  /**
   * Retorna classes condicionais baseadas no tema
   */
  const conditional = (lightClass: string, darkClass: string) => {
    return theme === 'dark' ? darkClass : lightClass;
  };

  /**
   * Combina classes base com classes condicionais de tema
   */
  const combine = (baseClasses: string, lightClasses: string, darkClasses: string) => {
    return `${baseClasses} ${theme === 'dark' ? darkClasses : lightClasses}`;
  };

  return {
    theme,
    classes: getThemeClasses,
    conditional,
    combine,
    isDark: theme === 'dark',
    isLight: theme === 'light',
  };
}

/**
 * Classes de utilidade para temas comuns
 */
export const themeClasses = {
  // Cards
  card: 'theme-card rounded-lg p-6',
  cardHover: 'theme-card rounded-lg p-6 hover:theme-shadow-md transition-shadow',
  
  // Buttons
  buttonPrimary: 'theme-button-primary px-4 py-2 rounded-lg font-medium transition-colors',
  buttonSecondary: 'theme-bg-secondary theme-text-primary border theme-border px-4 py-2 rounded-lg font-medium hover:theme-bg-tertiary transition-colors',
  
  // Inputs
  input: 'theme-input w-full px-3 py-2 rounded-lg theme-border focus:theme-border-focus focus:outline-none transition-colors',
  
  // Layout
  page: 'min-h-screen theme-bg-secondary',
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  
  // Text
  heading: 'theme-text-primary font-bold',
  subheading: 'theme-text-secondary font-medium',
  body: 'theme-text-primary',
  caption: 'theme-text-tertiary text-sm',
};