import { useAuth } from '../contexts/AuthContext';
import XPTestPanel from '../components/debug/XPTestPanel';

export default function XPTestPage() {
  const { currentUser, login } = useAuth();

  const handleQuickLogin = async () => {
    try {
      // Login de teste - substitua por credenciais reais se necessário
      await login('teste@exemplo.com', 'senha123');
    } catch (error) {
      console.error('Erro no login de teste:', error);
      alert('Erro no login. Verifique as credenciais ou crie uma conta primeiro.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            🧪 Página de Teste do Sistema XP
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Use esta página para testar se o sistema XP está carregando e salvando dados corretamente.
          </p>
        </div>

        {/* Login Section */}
        {!currentUser && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
              ⚠️ Login Necessário
            </h2>
            <p className="text-yellow-700 dark:text-yellow-300 mb-4">
              Você precisa estar logado para testar o sistema XP.
            </p>
            <button
              onClick={handleQuickLogin}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition-colors"
            >
              🔑 Teste de Login
            </button>
            <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-2">
              * Use suas credenciais reais ou crie uma conta primeiro
            </p>
          </div>
        )}

        {/* Status do Usuário */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
            👤 Status do Usuário
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Status:</strong> {currentUser ? '✅ Logado' : '❌ Não Logado'}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>UID:</strong> {currentUser?.uid || 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Email:</strong> {currentUser?.email || 'N/A'}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Nome:</strong> {currentUser?.displayName || 'N/A'}
              </p>
            </div>
          </div>
        </div>

        {/* Painel de Teste XP */}
        <XPTestPanel />

        {/* Instruções */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
            📋 Como Testar
          </h2>
          <ol className="list-decimal list-inside space-y-1 text-blue-700 dark:text-blue-300 text-sm">
            <li>Faça login (se ainda não estiver logado)</li>
            <li>Clique em "🔍 Testar Carregamento XP" para ver se carrega dados do Firebase</li>
            <li>Clique em "🎁 Testar Dar XP" para simular completar uma questão</li>
            <li>Observe o componente XP atualizar automaticamente</li>
            <li>Verifique os logs no console do navegador (F12)</li>
          </ol>
        </div>

        {/* Debug Info */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            🔧 Informações de Debug
          </h2>
          <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
            <p><strong>Coleção Firebase:</strong> user_levels</p>
            <p><strong>XP por Questão:</strong> 25 XP</p>
            <p><strong>Sistema de Níveis:</strong> 100 XP por nível</p>
            <p><strong>Servidor:</strong> {window.location.origin}</p>
          </div>
        </div>

      </div>
    </div>
  );
}