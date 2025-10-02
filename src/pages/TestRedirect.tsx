import { useNavigate } from 'react-router-dom';

export default function TestRedirect() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    console.log('🚀 Testando redirecionamento para /questions');
    navigate('/questions');
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Teste de Redirecionamento</h1>
      <button 
        onClick={handleRedirect}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Redirecionar para /questions
      </button>
    </div>
  );
}