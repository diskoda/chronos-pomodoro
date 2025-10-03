import { ArrowLeft } from 'lucide-react';
import logoPenaped from '../../assets/images/logos/logo_penaped.png';
import { useLoading } from '../../contexts/LoadingContext';

interface ClinicalCasesHeaderProps {
  onBack: () => void;
}

export default function ClinicalCasesHeader({ onBack }: ClinicalCasesHeaderProps) {
  const { showLoading } = useLoading();

  const handleBack = () => {
    showLoading('Voltando ao Dashboard...', 'minimal');
    setTimeout(() => {
      onBack();
    }, 300);
  };
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-600">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar ao Dashboard</span>
          </button>
          <div className="w-px h-6 bg-gray-600"></div>
          <div className="flex items-center space-x-3">
            <img 
              src={logoPenaped} 
              alt="PéNaPED Logo" 
              className="h-45 w-auto"
            />
            <div>
              <h1 className="text-2xl font-bold text-white">Casos Clínicos</h1>
              <p className="text-gray-400">Selecione um caso para iniciar o estudo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}