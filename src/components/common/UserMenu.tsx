import { LogOut, User } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          {currentUser?.photoURL ? (
            <img 
              src={currentUser.photoURL} 
              alt="Avatar" 
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <User className="w-4 h-4 text-white" />
          )}
        </div>
        <span className="text-sm font-medium theme-text-primary hidden sm:block">
          {currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Usuário'}
        </span>
      </button>

      {isOpen && (
        <>
          {/* Overlay para fechar o menu */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu dropdown */}
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20">
            <div className="py-1">
              {/* Informações do usuário */}
              <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium theme-text-primary">
                  {currentUser?.displayName || 'Usuário'}
                </p>
                <p className="text-xs theme-text-tertiary">
                  {currentUser?.email}
                </p>
              </div>

              {/* Opção de logout */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-2 text-sm theme-text-secondary hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}