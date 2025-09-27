import { Clock, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ThemeSelector from '../common/ThemeSelector';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="theme-bg-primary theme-shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 rounded-lg p-2">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold theme-text-primary">PéNaPED</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="theme-text-secondary hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
              Recursos
            </a>
            <a href="#pricing" className="theme-text-secondary hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
              Preços
            </a>
            <a href="#about" className="theme-text-secondary hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
              Sobre
            </a>
            <a href="#contact" className="theme-text-secondary hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
              Contato
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeSelector />
            <Link 
              to="/login"
              className="theme-button-primary px-4 py-2 rounded-lg font-medium"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeSelector />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="theme-text-secondary hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
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
          <div className="md:hidden border-t theme-border py-4">
            <div className="flex flex-col space-y-4">
              <a href="#features" className="theme-text-secondary hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
                Recursos
              </a>
              <a href="#pricing" className="theme-text-secondary hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
                Preços
              </a>
              <a href="#about" className="theme-text-secondary hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
                Sobre
              </a>
              <a href="#contact" className="theme-text-secondary hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
                Contato
              </a>
              <div className="pt-4 border-t theme-border">
                <Link 
                  to="/login"
                  className="w-full text-left theme-text-secondary hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors mb-2 block"
                >
                  Login
                </Link>
                <button className="w-full theme-button-primary px-4 py-2 rounded-lg font-medium">
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