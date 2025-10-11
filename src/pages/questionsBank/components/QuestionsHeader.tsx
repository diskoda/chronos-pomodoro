import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '../../../contexts/LoadingContext';

export default function QuestionsHeader() {
  const navigate = useNavigate();
  const { showLoading } = useLoading();

  const handleBackToModeSelection = () => {
    showLoading('Voltando à Seleção de Modo...', 'minimal');
    setTimeout(() => {
      navigate('/study');
    }, 300);
  };
  return (
    <header className="theme-bg-primary theme-shadow-sm theme-border-secondary border-b relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4 relative z-10">
            <button 
              onClick={handleBackToModeSelection}
              className="flex items-center theme-text-secondary hover:theme-text-primary transition-colors cursor-pointer z-10 relative px-2 py-1 rounded-md hover:bg-slate-700/50"
              style={{ pointerEvents: 'auto' }}
              type="button"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Seleção de Modo
            </button>
            <div className="h-6 w-px theme-border" />
            <div className="flex items-center space-x-2">
              <img 
                src="/logos/penaped_shadow.png" 
                alt="PéNaPED Logo" 
                className="h-45 w-auto"
              />
              <h1 className="text-xl font-bold theme-text-primary">Banco de Questões</h1>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}