import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface LoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  loading?: boolean;
}

export default function LoginForm({ email, setEmail, password, setPassword, handleSubmit, loading = false }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium theme-text-primary">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="theme-input mt-1 appearance-none relative block w-full px-3 py-3 rounded-lg sm:text-sm"
            placeholder="seu@email.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium theme-text-primary">
            Senha
          </label>
          <div className="mt-1 relative">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="theme-input appearance-none relative block w-full px-3 py-3 pr-10 rounded-lg sm:text-sm"
              placeholder="Digite sua senha"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 theme-text-tertiary hover:theme-text-secondary" />
              ) : (
                <Eye className="h-5 w-5 theme-text-tertiary hover:theme-text-secondary" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm theme-text-primary">
            Lembrar de mim
          </label>
        </div>

        <div className="text-sm">
          <a href="#" className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">
            Esqueceu a senha?
          </a>
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="theme-button-primary group relative w-full flex justify-center py-3 px-4 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </div>

      <div className="text-center">
        <p className="text-sm theme-text-secondary">
          Não tem uma conta?{' '}
          <Link to="/register" className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">
            Cadastre-se gratuitamente
          </Link>
        </p>
      </div>
    </form>
  );
}