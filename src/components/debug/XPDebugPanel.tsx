import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { initializeUserXPStructure, createSampleXPData, validateXPStructure } from '../../scripts/xpSetup';

/**
 * Componente de Debug para Sistema XP
 * 
 * Este componente permite:
 * 1. Inicializar estrutura XP para usuário atual
 * 2. Criar dados de exemplo
 * 3. Validar estrutura
 * 4. Ver informações do usuário
 */
export default function XPDebugPanel() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('info');

  const showMessage = (text: string, type: 'success' | 'error' | 'info' = 'info') => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(''), 5000);
  };

  const handleInitializeStructure = async () => {
    if (!currentUser) {
      showMessage('❌ Usuário não autenticado', 'error');
      return;
    }

    setLoading(true);
    try {
      const success = await initializeUserXPStructure(currentUser.uid);
      if (success) {
        showMessage('✅ Estrutura XP inicializada com sucesso!', 'success');
      } else {
        showMessage('❌ Erro ao inicializar estrutura XP', 'error');
      }
    } catch (error) {
      console.error('Erro:', error);
      showMessage('❌ Erro inesperado ao inicializar', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSampleData = async () => {
    if (!currentUser) {
      showMessage('❌ Usuário não autenticado', 'error');
      return;
    }

    setLoading(true);
    try {
      await createSampleXPData(currentUser.uid);
      showMessage('✅ Dados de exemplo criados com sucesso!', 'success');
    } catch (error) {
      console.error('Erro:', error);
      showMessage('❌ Erro ao criar dados de exemplo', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleValidateStructure = async () => {
    setLoading(true);
    try {
      const isValid = await validateXPStructure();
      if (isValid) {
        showMessage('✅ Estrutura XP válida!', 'success');
      } else {
        showMessage('❌ Problemas na estrutura XP', 'error');
      }
    } catch (error) {
      console.error('Erro:', error);
      showMessage('❌ Erro na validação', 'error');
    } finally {
      setLoading(false);
    }
  };

  const copyFirebaseScript = () => {
    const script = `// Script Firebase - Configuração XP
const userId = "${currentUser?.uid || 'SEU_USER_ID'}";

// Dados básicos
const userLevelData = {
  userId: userId,
  currentLevel: 1,
  currentXP: 0,
  totalXP: 0,
  xpToNextLevel: 100,
  updatedAt: firebase.firestore.Timestamp.now()
};

const firstActivity = {
  userId: userId,
  type: "daily_login",
  xpGained: 5,
  description: "Configuração inicial - Bem-vindo!",
  metadata: { source: "debug_panel" },
  createdAt: firebase.firestore.Timestamp.now()
};

// Executar
async function setupXP() {
  await firebase.firestore().collection('user_levels').doc(userId).set(userLevelData);
  await firebase.firestore().collection('xp_activities').add(firstActivity);
  console.log("✅ XP configurado!");
}

setupXP();`;

    navigator.clipboard.writeText(script);
    showMessage('📋 Script copiado para clipboard!', 'success');
  };

  if (!currentUser) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 m-4">
        <div className="flex items-center">
          <div className="text-red-600 dark:text-red-400 text-2xl mr-3">🔒</div>
          <div>
            <h3 className="font-semibold text-red-800 dark:text-red-200">
              Acesso Negado
            </h3>
            <p className="text-red-600 dark:text-red-400 text-sm">
              Faça login para acessar o painel de debug XP
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 m-4 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-4">
        <div className="flex items-center">
          <div className="text-white text-2xl mr-3">🛠️</div>
          <div>
            <h2 className="text-xl font-bold text-white">
              Debug Panel - Sistema XP
            </h2>
            <p className="text-purple-100 text-sm">
              Ferramentas para configurar e testar o sistema XP
            </p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
            {currentUser.email?.[0].toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-gray-800 dark:text-gray-200">
              {currentUser.email}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ID: <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded text-xs">
                {currentUser.uid}
              </code>
            </p>
          </div>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className={`p-4 border-b border-gray-200 dark:border-gray-700 ${
          messageType === 'success' 
            ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200'
            : messageType === 'error'
            ? 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200'
            : 'bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200'
        }`}>
          <p className="font-medium">{message}</p>
        </div>
      )}

      {/* Actions */}
      <div className="p-4 space-y-4">
        
        {/* Inicializar Estrutura */}
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 flex items-center">
            🚀 Inicializar Estrutura XP
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Cria as coleções básicas (user_levels, primeira atividade, achievement)
          </p>
          <button
            onClick={handleInitializeStructure}
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
          >
            {loading ? '⏳ Inicializando...' : '🚀 Inicializar Estrutura'}
          </button>
        </div>

        {/* Criar Dados de Exemplo */}
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 flex items-center">
            📊 Criar Dados de Exemplo
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Adiciona atividades e achievements de exemplo para testar
          </p>
          <button
            onClick={handleCreateSampleData}
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
          >
            {loading ? '⏳ Criando...' : '📊 Criar Dados de Exemplo'}
          </button>
        </div>

        {/* Validar Estrutura */}
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 flex items-center">
            🔍 Validar Estrutura
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Verifica se as coleções estão acessíveis
          </p>
          <button
            onClick={handleValidateStructure}
            disabled={loading}
            className="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
          >
            {loading ? '⏳ Validando...' : '🔍 Validar Estrutura'}
          </button>
        </div>

        {/* Script Firebase */}
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 flex items-center">
            📋 Script Firebase Console
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Copia script para executar diretamente no Firebase Console
          </p>
          <button
            onClick={copyFirebaseScript}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            📋 Copiar Script Firebase
          </button>
        </div>

      </div>

      {/* Instructions */}
      <div className="bg-gray-50 dark:bg-gray-900 p-4">
        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
          📚 Instruções de Uso:
        </h4>
        <ol className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-decimal list-inside">
          <li>Primeiro clique em <strong>"Inicializar Estrutura"</strong></li>
          <li>Depois clique em <strong>"Criar Dados de Exemplo"</strong></li>
          <li>Use <strong>"Validar Estrutura"</strong> para verificar</li>
          <li>Alternativamente, use o <strong>"Script Firebase"</strong> no console</li>
        </ol>
      </div>
    </div>
  );
}