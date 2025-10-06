import { Calendar } from 'lucide-react';
import UserMenu from '../common/UserMenu';

export default function DashboardHeader() {
  const formatDate = () => {
    const today = new Date();
    return today.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <header className="theme-bg-primary theme-border border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img 
              src="/logos/penaped_shadow.png" 
              alt="PéNaPED Logo" 
              className="h-45 w-auto"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm theme-text-secondary">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">{formatDate()}</span>
              <span className="sm:hidden">Hoje</span>
            </div>
            
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
}