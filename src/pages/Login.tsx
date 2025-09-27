import { useState } from 'react';
import LoginLayout from '../components/loginPage/LoginLayout';
import LoginHeader from '../components/loginPage/LoginHeader';
import LoginForm from '../components/loginPage/LoginForm';
import SocialLogin from '../components/loginPage/SocialLogin';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de login aqui
    console.log('Login attempt:', { email, password });
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
