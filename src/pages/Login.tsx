import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginLayout from '../components/loginPage/LoginLayout';
import LoginHeader from '../components/loginPage/LoginHeader';
import LoginForm from '../components/loginPage/LoginForm';
import SocialLogin from '../components/loginPage/SocialLogin';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação de login bem-sucedido
    console.log('Login attempt:', { email, password });
    
    // Redireciona para o dashboard após login
    navigate('/dashboard');
  };

  return (
    <LoginLayout>
      <LoginHeader />
      <LoginForm 
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
      />
      <SocialLogin />
    </LoginLayout>
  );
}
