import { useState, useEffect } from 'react';
import { Users, Database, Settings, BarChart3, RefreshCw, CheckCircle, AlertCircle, Play, UserCheck } from 'lucide-react';
import UserInitializationService from '../services/userInitializationService';
import { AuthXpIntegrationService } from '../services/authXpIntegrationService';

interface InitializationStats {
  totalUsers: number;
  initializedUsers: number;
  pendingUsers: number;
  initializationProgress: number;
}

interface InitializationResult {
  total: number;
  initialized: number;
  skipped: number;
  errors: string[];
}

export default function AdminInitializationPage() {
  const [stats, setStats] = useState<InitializationStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [result, setResult] = useState<InitializationResult | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  // Carregar estatísticas ao montar o componente
  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setIsLoading(true);
    try {
      const statsData = await UserInitializationService.getInitializationStats();
      setStats(statsData);
      addLog(`📊 Estatísticas carregadas: ${statsData.totalUsers} usuários encontrados`);
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
      addLog(`❌ Erro ao carregar estatísticas: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `[${timestamp}] ${message}`]);
  };

  const handleInitializeAll = async () => {
    if (!confirm('⚠️ Tem certeza que deseja inicializar todos os usuários? Esta operação pode demorar alguns minutos.')) {
      return;
    }

    setIsInitializing(true);
    setResult(null);
    setLogs([]);
    
    try {
      addLog('🚀 Iniciando inicialização em massa...');
      
      const initResult = await UserInitializationService.initializeAllUsers();
      setResult(initResult);
      
      addLog(`🎉 Inicialização concluída!`);
      addLog(`✅ ${initResult.initialized} usuários inicializados`);
      addLog(`⏭️ ${initResult.skipped} usuários já estavam inicializados`);
      
      if (initResult.errors.length > 0) {
        addLog(`❌ ${initResult.errors.length} erros encontrados`);
        initResult.errors.forEach(error => addLog(`   • ${error}`));
      }
      
      // Recarregar estatísticas
      await loadStats();
      
    } catch (error) {
      console.error('Erro na inicialização:', error);
      addLog(`❌ Erro crítico: ${error}`);
    } finally {
      setIsInitializing(false);
    }
  };

  const handleClearData = async () => {
    const confirmMessage = '🚨 ATENÇÃO: Esta operação irá remover TODOS os dados XP do sistema!\n\nEsta ação é IRREVERSÍVEL e só deve ser usada em desenvolvimento.\n\nTem certeza absoluta?';
    
    if (!confirm(confirmMessage)) {
      return;
    }

    if (!confirm('🔴 ÚLTIMA CONFIRMAÇÃO: Todos os dados XP serão perdidos permanentemente. Continuar?')) {
      return;
    }

    setIsLoading(true);
    try {
      await UserInitializationService.clearAllXPData();
      addLog('🧹 Todos os dados XP foram removidos');
      await loadStats();
    } catch (error) {
      console.error('Erro ao limpar dados:', error);
      addLog(`❌ Erro ao limpar dados: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDebugCollections = async () => {
    addLog('🔍 Iniciando debug das coleções Firebase...');
    try {
      await UserInitializationService.debugFirebaseCollections();
      addLog('🔍 Debug concluído - verifique o console do navegador (F12)');
    } catch (error) {
      console.error('Erro no debug:', error);
      addLog(`❌ Erro no debug: ${error}`);
    }
  };

  const handleCreateTestUsers = async () => {
    addLog('🧪 Criando usuários de teste...');
    setIsLoading(true);
    
    try {
      const userIds = await UserInitializationService.createTestUsers();
      addLog(`✅ Criados ${userIds.length} usuários de teste: ${userIds.join(', ')}`);
      
      // Recarregar estatísticas
      await loadStats();
      
      addLog('📊 Estatísticas atualizadas. Agora você pode inicializar os usuários.');
    } catch (error) {
      console.error('Erro ao criar usuários de teste:', error);
      addLog(`❌ Erro ao criar usuários de teste: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMigrateAuthUsers = async () => {
    addLog('🔄 Iniciando migração de usuários do Firebase Auth...');
    setIsLoading(true);
    
    try {
      const result = await AuthXpIntegrationService.migrateExistingAuthUsers();
      
      addLog(`📊 Migração concluída:`);
      addLog(`   • Usuários encontrados: ${result.found}`);
      addLog(`   • Usuários migrados: ${result.migrated}`);
      addLog(`   • Erros: ${result.errors.length}`);
      
      if (result.errors.length > 0) {
        addLog('❌ Erros durante migração:');
        result.errors.forEach(error => addLog(`   • ${error}`));
      }
      
      // Recarregar estatísticas
      await loadStats();
      
    } catch (error) {
      console.error('Erro na migração:', error);
      addLog(`❌ Erro na migração: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Settings className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Administração - Inicialização XP
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Gerencie a inicialização do sistema XP por metodologias para todos os usuários
          </p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-blue-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total de Usuários</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {isLoading ? '...' : stats?.totalUsers || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-green-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Inicializados</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {isLoading ? '...' : stats?.initializedUsers || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <AlertCircle className="w-8 h-8 text-orange-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pendentes</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {isLoading ? '...' : stats?.pendingUsers || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <BarChart3 className="w-8 h-8 text-purple-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Progresso</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {isLoading ? '...' : `${Math.round(stats?.initializationProgress || 0)}%`}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Barra de Progresso */}
        {stats && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Progresso da Inicialização</h3>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {stats.initializedUsers} de {stats.totalUsers}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${stats.initializationProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Ações */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
          
          {/* Atualizar Estatísticas */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <RefreshCw className="w-6 h-6 text-blue-500 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Atualizar</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
              Recarregar as estatísticas do sistema
            </p>
            <button
              onClick={loadStats}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              {isLoading ? 'Carregando...' : 'Atualizar'}
            </button>
          </div>

          {/* Debug Collections */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-yellow-200 dark:border-yellow-700">
            <div className="flex items-center mb-4">
              <Database className="w-6 h-6 text-yellow-500 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Debug</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
              Investigar estrutura das coleções Firebase
            </p>
            <button
              onClick={handleDebugCollections}
              disabled={isLoading}
              className="w-full bg-yellow-600 hover:bg-yellow-700 disabled:bg-yellow-400 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Investigar
            </button>
          </div>

          {/* Criar Usuários de Teste */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-purple-200 dark:border-purple-700">
            <div className="flex items-center mb-4">
              <Users className="w-6 h-6 text-purple-500 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Usuários Teste</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
              Criar 2 usuários de exemplo
            </p>
            <button
              onClick={handleCreateTestUsers}
              disabled={isLoading}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              {isLoading ? 'Criando...' : 'Criar Usuários'}
            </button>
          </div>

          {/* Migrar Usuários Auth */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-emerald-200 dark:border-emerald-700">
            <div className="flex items-center mb-4">
              <UserCheck className="w-6 h-6 text-emerald-500 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Migrar Auth</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
              Conectar usuários do Firebase Auth ao XP
            </p>
            <button
              onClick={handleMigrateAuthUsers}
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              {isLoading ? 'Migrando...' : 'Migrar'}
            </button>
          </div>

          {/* Inicializar Todos */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <Play className="w-6 h-6 text-green-500 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Inicializar</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
              Configurar todos os usuários pendentes no nível 1
            </p>
            <button
              onClick={handleInitializeAll}
              disabled={isInitializing || isLoading || stats?.pendingUsers === 0}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              {isInitializing ? 'Inicializando...' : 'Inicializar'}
            </button>
          </div>

          {/* Limpar Dados (Dev Only) */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-red-200 dark:border-red-700">
            <div className="flex items-center mb-4">
              <Database className="w-6 h-6 text-red-500 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Limpar</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
              ⚠️ Remover todos os dados XP
            </p>
            <button
              onClick={handleClearData}
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              {isLoading ? 'Limpando...' : 'Limpar'}
            </button>
          </div>
        </div>

        {/* Resultado da Inicialização */}
        {result && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              📊 Resultado da Inicialização
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{result.total}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{result.initialized}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Inicializados</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{result.skipped}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Pulados</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{result.errors.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Erros</div>
              </div>
            </div>

            {result.errors.length > 0 && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4">
                <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">Erros Encontrados:</h4>
                <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                  {result.errors.map((error, index) => (
                    <li key={index}>• {error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Logs */}
        {logs.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">📝 Logs da Operação</h3>
              <button
                onClick={() => setLogs([])}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                Limpar
              </button>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 max-h-64 overflow-y-auto">
              <div className="font-mono text-sm space-y-1">
                {logs.map((log, index) => (
                  <div key={index} className="text-gray-700 dark:text-gray-300">
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}