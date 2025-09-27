import { Heart, Calendar, User } from 'lucide-react';
import ThemeSelector from '../common/ThemeSelector';

export default function DashboardHeader() {
  return (
    <header className="theme-bg-primary theme-border border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-600 rounded-lg p-2">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold theme-text-primary">PénaPED Dashboard</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm theme-text-secondary">
              <Calendar className="h-4 w-4" />
              <span>Hoje, 27 Set 2025</span>
            </div>
            <ThemeSelector />
            <div className="flex items-center space-x-2 theme-bg-secondary rounded-lg px-3 py-2">
              <User className="h-5 w-5 theme-text-secondary" />
              <span className="text-sm font-medium theme-text-primary">Dr. Samuel</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}