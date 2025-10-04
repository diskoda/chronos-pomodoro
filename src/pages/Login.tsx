import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginLayout from '../components/loginPage/LoginLayout';
import LoginHeader from '../components/loginPage/LoginHeader';
import LoginForm from '../components/loginPage/LoginForm';
import UpdatesSlider from '../components/loginPage/UpdatesSlider';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/dashboard');
    } catch (error: any) {
      setError('Falha no login. Verifique suas credenciais.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginLayout updatesSlider={<UpdatesSlider />}>
      <LoginHeader />
      {error && (
        <div className="mb-4 p-3 penaped-badge-error text-sm rounded-lg">
          {error}
        </div>
      )}
      <LoginForm 
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </LoginLayout>
  );
}
