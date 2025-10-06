import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '../../contexts/LoadingContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { showLoading } = useLoading();
  const navigate = useNavigate();
  
  const handleNavigateToLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    showLoading('Carregando página de login...', 'branded');
    setTimeout(() => {
      navigate('/login');
    }, 400);
  };

  return (
    <header className="penaped-card border-0 rounded-none shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/logos/penaped_shadow.png" 
              alt="PéNaPED Logo" 
              className="h-45 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Recursos
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Preços
            </a>
            <a href="#about" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Sobre
            </a>
            <a href="#contact" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Contato
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={handleNavigateToLogin}
              className="penaped-btn penaped-btn-primary"
            >
              Login
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4">
            <div className="flex flex-col space-y-4">
              <a href="#features" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                Recursos
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                Preços
              </a>
              <a href="#about" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                Sobre
              </a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                Contato
              </a>
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <button 
                  onClick={handleNavigateToLogin}
                  className="w-full text-left text-gray-600 hover:text-blue-600 font-medium transition-colors mb-2 block"
                >
                  Login
                </button>
                <button className="w-full penaped-btn penaped-btn-primary">
                  Começar Grátis
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}