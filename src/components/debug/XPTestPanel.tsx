import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { XPService } from '../../services/xpService';
import { giveQuestionCompletionXP } from '../../services/simpleXPService';
import UserXPDisplay from '../universal/UserXPDisplay';

export default function XPTestPanel() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const testLoadXP = async () => {
    if (!currentUser) {
      alert('Faça login primeiro!');
      return;
    }

    setLoading(true);
    try {
      console.log('🧪 Teste: Carregando XP do usuário:', currentUser.uid);
      const userLevel = await XPService.getUserLevel(currentUser.uid);
      setResult(userLevel);
      console.log('✅ Teste: XP carregado:', userLevel);
    } catch (error) {
      console.error('❌ Teste: Erro ao carregar XP:', error);
      setResult({ error: error instanceof Error ? error.message : 'Erro desconhecido' });
    } finally {
      setLoading(false);
    }
  };

  const testGiveXP = async () => {
    if (!currentUser) {
      alert('Faça login primeiro!');
      return;
    }

    setLoading(true);
    try {
      console.log('🧪 Teste: Dando XP para questão 123');
      const result = await giveQuestionCompletionXP(123);
      console.log('✅ Teste: XP dado:', result);
      
      // Recarregar dados após dar XP
      setTimeout(() => testLoadXP(), 1000);
    } catch (error) {
      console.error('❌ Teste: Erro ao dar XP:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border">
      <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
        🧪 Painel de Teste XP
      </h3>

      {/* Componente XP Display */}
      <div className="mb-4">
        <h4 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">
          Componente UserXPDisplay:
        </h4>
        <UserXPDisplay variant="full" showProgress={true} />
      </div>

      {/* Status do usuário */}
      <div className="mb-4 p-3 bg-gray-100 dark:bg-gray-700 rounded">
        <p className="text-sm">
          <strong>Usuário:</strong> {currentUser ? currentUser.uid : 'Não logado'}
        </p>
        <p className="text-sm">
          <strong>Email:</strong> {currentUser?.email || 'N/A'}
        </p>
      </div>

      {/* Botões de teste */}
      <div className="space-y-2 mb-4">
        <button
          onClick={testLoadXP}
          disabled={loading || !currentUser}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded transition-colors"
        >
          {loading ? 'Carregando...' : '🔍 Testar Carregamento XP'}
        </button>

        <button
          onClick={testGiveXP}
          disabled={loading || !currentUser}
          className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-4 py-2 rounded transition-colors"
        >
          {loading ? 'Processando...' : '🎁 Testar Dar XP (+25)'}
        </button>
      </div>

      {/* Resultado do teste */}
      {result && (
        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded">
          <h4 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Último Resultado:
          </h4>
          <pre className="text-xs text-gray-600 dark:text-gray-400 overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}

      {!currentUser && (
        <div className="mt-4 p-3 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 rounded">
          ⚠️ Faça login para testar o sistema XP
        </div>
      )}
    </div>
  );
}