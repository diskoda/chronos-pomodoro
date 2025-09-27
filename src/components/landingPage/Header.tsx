import { Clock, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 rounded-lg p-2">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">PéNaPED</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Recursos
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Preços
            </a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Sobre
            </a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Contato
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors"
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
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <a href="#features" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Recursos
              </a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Preços
              </a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Sobre
              </a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Contato
              </a>
              <div className="pt-4 border-t border-gray-200">
                <Link 
                  to="/login"
                  className="w-full text-left text-gray-700 hover:text-blue-600 font-medium transition-colors mb-2 block"
                >
                  Login
                </Link>
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
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