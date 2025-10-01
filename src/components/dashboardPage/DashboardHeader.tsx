import { Calendar } from 'lucide-react';
import ThemeSelector from '../common/ThemeSelector';
import UserMenu from '../common/UserMenu';
import logoPenaped from '../../assets/images/logos/logo_penaped.png';

export default function DashboardHeader() {
  return (
    <header className="theme-bg-primary theme-border border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <img 
              src={logoPenaped} 
              alt="PéNaPED Logo" 
              className="h-10 w-auto"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm theme-text-secondary">
              <Calendar className="h-4 w-4" />
              <span>Hoje, 27 Set 2025</span>
            </div>
            <ThemeSelector />
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
}