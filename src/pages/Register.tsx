import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  RegisterLayout, 
  RegisterHeader, 
  RegisterForm, 
  SocialRegister 
} from '../components/registerPage';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register, loginWithGoogle } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    try {
      setError('');
      setLoading(true);
      await register(formData.email, formData.password, formData.name);
      navigate('/dashboard');
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setError('Este email já está em uso. Tente fazer login.');
      } else if (error.code === 'auth/weak-password') {
        setError('A senha é muito fraca. Use pelo menos 6 caracteres.');
      } else if (error.code === 'auth/invalid-email') {
        setError('Email inválido.');
      } else {
        setError('Erro ao criar conta. Tente novamente.');
      }
      console.error('Register error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      setError('');
      setLoading(true);
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (error: any) {
      setError('Falha no registro com Google.');
      console.error('Google register error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <RegisterLayout>
      <RegisterHeader />
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      <RegisterForm 
        formData={formData}
        updateFormData={updateFormData}
        handleSubmit={handleSubmit}
        loading={loading}
      />
      <SocialRegister 
        onGoogleRegister={handleGoogleRegister}
        loading={loading}
      />
      <div className="text-center mt-6">
        <p className="text-sm theme-text-secondary">
          Já tem uma conta?{' '}
          <Link to="/login" className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">
            Faça login
          </Link>
        </p>
      </div>
    </RegisterLayout>
  );
}