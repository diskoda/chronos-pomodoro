import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoPenaped from '../../assets/images/logos/logo_penaped.png';

export default function LoginHeader() {
  return (
    <div className="text-center">
      <Link
        to="/"
        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar ao início
      </Link>
      
      <div className="flex justify-center mb-6">
        <img 
          src={logoPenaped} 
          alt="PéNaPED Logo" 
          className="h-45 w-auto"
        />
      </div>
      
      <h2 className="text-3xl font-bold theme-text-primary">
        Entrar no PénaPED
      </h2>
      <p className="mt-2 theme-text-secondary">
        Acesse sua conta e continue sua jornada de estudos pediátricos
      </p>
    </div>
  );
}