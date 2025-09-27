import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export default function ThemeSelector() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        onClick={toggleTheme}
        className="flex items-center justify-center w-10 h-10 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
        title={`Alternar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
      >
        {theme === 'light' ? (
          <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        ) : (
          <Sun className="h-5 w-5 text-yellow-500" />
        )}
      </button>
    </div>
  );
}

// Componente alternativo com dropdown para múltiplas opções
export function ThemeDropdown() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="relative">
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
        className="appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      >
        <option value="light">☀️ Claro</option>
        <option value="dark">🌙 Escuro</option>
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}

// Componente com botões individuais
export function ThemeButtonGroup() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
      <button
        onClick={() => setTheme('light')}
        className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          theme === 'light'
            ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
        }`}
      >
        <Sun className="h-4 w-4" />
        <span>Claro</span>
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          theme === 'dark'
            ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
        }`}
      >
        <Moon className="h-4 w-4" />
        <span>Escuro</span>
      </button>
    </div>
  );
}