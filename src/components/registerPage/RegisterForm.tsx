import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';
import { useState } from 'react';
import PasswordStrength from './PasswordStrength';

interface RegisterFormProps {
  formData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  updateFormData: (field: string, value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  loading?: boolean;
}

export default function RegisterForm({ 
  formData, 
  updateFormData, 
  handleSubmit, 
  loading = false 
}: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPasswordStrength, setShowPasswordStrength] = useState(false);

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-4">
        {/* Nome */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium theme-text-primary">
            Nome Completo
          </label>
          <div className="mt-1 relative">
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => updateFormData('name', e.target.value)}
              className="theme-input appearance-none relative block w-full px-3 py-3 pl-10 rounded-lg sm:text-sm"
              placeholder="Seu nome completo"
            />
            <User className="absolute left-3 top-3 h-5 w-5 theme-text-tertiary" />
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium theme-text-primary">
            Email
          </label>
          <div className="mt-1 relative">
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => updateFormData('email', e.target.value)}
              className="theme-input appearance-none relative block w-full px-3 py-3 pl-10 rounded-lg sm:text-sm"
              placeholder="seu@email.com"
            />
            <Mail className="absolute left-3 top-3 h-5 w-5 theme-text-tertiary" />
          </div>
        </div>

        {/* Senha */}
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
              value={formData.password}
              onChange={(e) => updateFormData('password', e.target.value)}
              onFocus={() => setShowPasswordStrength(true)}
              onBlur={() => setShowPasswordStrength(false)}
              className="theme-input appearance-none relative block w-full px-3 py-3 pl-10 pr-10 rounded-lg sm:text-sm"
              placeholder="Digite sua senha"
            />
            <Lock className="absolute left-3 top-3 h-5 w-5 theme-text-tertiary" />
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
          <p className="mt-1 text-xs theme-text-tertiary">
            Mínimo de 6 caracteres
          </p>
          <PasswordStrength 
            password={formData.password} 
            show={showPasswordStrength}
          />
        </div>

        {/* Confirmar Senha */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium theme-text-primary">
            Confirmar Senha
          </label>
          <div className="mt-1 relative">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              required
              value={formData.confirmPassword}
              onChange={(e) => updateFormData('confirmPassword', e.target.value)}
              className="theme-input appearance-none relative block w-full px-3 py-3 pl-10 pr-10 rounded-lg sm:text-sm"
              placeholder="Confirme sua senha"
            />
            <Lock className="absolute left-3 top-3 h-5 w-5 theme-text-tertiary" />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5 theme-text-tertiary hover:theme-text-secondary" />
              ) : (
                <Eye className="h-5 w-5 theme-text-tertiary hover:theme-text-secondary" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Termos e Condições */}
      <div className="flex items-center">
        <input
          id="terms"
          name="terms"
          type="checkbox"
          required
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded"
        />
        <label htmlFor="terms" className="ml-2 block text-sm theme-text-primary">
          Aceito os{' '}
          <a href="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">
            Termos de Uso
          </a>{' '}
          e{' '}
          <a href="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">
            Política de Privacidade
          </a>
        </label>
      </div>

      {/* Botão de Submit */}
      <div>
        <button
          type="submit"
          disabled={loading}
          className="theme-button-primary group relative w-full flex justify-center py-3 px-4 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Criando conta...' : 'Criar Conta'}
        </button>
      </div>
    </form>
  );
}