import { ArrowLeft, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function QuestionsHeader() {
  return (
    <header className="theme-bg-primary theme-shadow-sm theme-border-secondary border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link 
              to="/dashboard"
              className="flex items-center theme-text-secondary hover:theme-text-primary transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Dashboard
            </Link>
            <div className="h-6 w-px theme-border" />
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 rounded-lg p-2">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold theme-text-primary">Banco de Questões PénaPED</h1>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}