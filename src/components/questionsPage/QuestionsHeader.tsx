import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '../../contexts/LoadingContext';
import logoPenaped from '../../assets/images/logos/logo_penaped.png';

export default function QuestionsHeader() {
  const navigate = useNavigate();
  const { showLoading } = useLoading();

  const handleBackToDashboard = () => {
    showLoading('Voltando ao Dashboard...', 'minimal');
    setTimeout(() => {
      navigate('/dashboard');
    }, 300);
  };
  return (
    <header className="theme-bg-primary theme-shadow-sm theme-border-secondary border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleBackToDashboard}
              className="flex items-center theme-text-secondary hover:theme-text-primary transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Dashboard
            </button>
            <div className="h-6 w-px theme-border" />
            <div className="flex items-center space-x-2">
              <img 
                src={logoPenaped} 
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