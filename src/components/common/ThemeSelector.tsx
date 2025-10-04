import { Palette } from 'lucide-react';

export default function ThemeSelector() {
  return (
    <div className="relative">
      {/* PéNaPED Theme Indicator */}
      <div
        className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 shadow-sm"
        title="Tema PéNaPED Ativo"
      >
        <Palette className="h-5 w-5 text-white" />
      </div>
    </div>
  );
}

// Componente desabilitado - mantido para compatibilidade
export function ThemeDropdown() {
  return (
    <div className="relative opacity-50 cursor-not-allowed">
      <div className="bg-gray-100 border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-500">
        � PéNaPED
      </div>
    </div>
  );
}

// Componente desabilitado - mantido para compatibilidade
export function ThemeButtonGroup() {
  return (
    <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
      <div className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium bg-blue-500 text-white shadow-sm">
        <Palette className="h-4 w-4" />
        <span>PéNaPED</span>
      </div>
    </div>
  );
}