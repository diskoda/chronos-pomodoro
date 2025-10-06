import { User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function UserMenu() {
  const { currentUser } = useAuth();

  return (
    <div className="flex items-center space-x-2 p-2 rounded-lg">
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
    </div>
  );
}