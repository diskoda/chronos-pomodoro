import { ArrowLeft } from 'lucide-react';

interface ClinicalCasesHeaderProps {
  onBack: () => void;
}

export default function ClinicalCasesHeader({ onBack }: ClinicalCasesHeaderProps) {
  return (
    <header className="bg-slate-800 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <button 
              onClick={onBack}
              className="flex items-center text-slate-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Seleção de Modo
            </button>
            <div className="h-6 w-px bg-slate-600" />
            <div className="flex items-center space-x-2">
              <img 
                src="/logos/penaped_shadow.png" 
                alt="PéNaPED Logo" 
                className="h-8 w-auto"
              />
              <h1 className="text-xl font-bold text-white">Casos Clínicos</h1>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}