import XPDebugPanel from '../components/debug/XPDebugPanel';

/**
 * Página temporária para configuração do Sistema XP
 * 
 * Esta página deve ser usada apenas para configurar o Firebase
 * e depois pode ser removida ou desabilitada.
 */
export default function XPSetupPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                ⚙️ Configuração Sistema XP
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Configure as estruturas Firebase para o sistema de experiência
              </p>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full text-sm font-medium">
              🚧 Página Temporária
            </div>
          </div>
        </div>
      </div>

      {/* Instruções */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-6">
          <div className="flex items-start">
            <div className="text-blue-600 dark:text-blue-400 text-3xl mr-4">📋</div>
            <div>
              <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Como usar este painel:
              </h2>
              <ol className="text-blue-800 dark:text-blue-200 space-y-2 list-decimal list-inside">
                <li>
                  <strong>Faça login</strong> no sistema (se ainda não estiver logado)
                </li>
                <li>
                  <strong>Clique em "Inicializar Estrutura"</strong> para criar as coleções básicas
                </li>
                <li>
                  <strong>Clique em "Criar Dados de Exemplo"</strong> para adicionar dados de teste
                </li>
                <li>
                  <strong>Use "Validar Estrutura"</strong> para confirmar que tudo funcionou
                </li>
                <li>
                  <strong>Teste uma questão</strong> para ver o XP funcionando
                </li>
              </ol>
              <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-800/30 rounded-lg">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  💡 <strong>Dica:</strong> Após a configuração, você pode remover esta página 
                  ou comentar a rota no seu roteador.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Painel de Debug */}
        <XPDebugPanel />

        {/* Informações Adicionais */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* O que será criado */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              📁 O que será criado no Firebase
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start">
                <div className="text-green-500 mr-2">✅</div>
                <div>
                  <strong className="text-gray-900 dark:text-white">xp_activities</strong>
                  <p className="text-gray-600 dark:text-gray-400">
                    Registra todas as atividades que geram XP
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="text-green-500 mr-2">✅</div>
                <div>
                  <strong className="text-gray-900 dark:text-white">user_levels</strong>
                  <p className="text-gray-600 dark:text-gray-400">
                    Mantém nível atual e XP total de cada usuário
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="text-green-500 mr-2">✅</div>
                <div>
                  <strong className="text-gray-900 dark:text-white">user_achievements</strong>
                  <p className="text-gray-600 dark:text-gray-400">
                    Conquistas desbloqueadas pelos usuários
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Próximos passos */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              🎯 Próximos passos
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start">
                <div className="text-blue-500 mr-2">1️⃣</div>
                <div>
                  <strong className="text-gray-900 dark:text-white">Testar questões</strong>
                  <p className="text-gray-600 dark:text-gray-400">
                    Vá para uma questão e veja o XP sendo exibido
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="text-blue-500 mr-2">2️⃣</div>
                <div>
                  <strong className="text-gray-900 dark:text-white">Completar questão</strong>
                  <p className="text-gray-600 dark:text-gray-400">
                    Finalize uma questão e veja o XP aumentar
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="text-blue-500 mr-2">3️⃣</div>
                <div>
                  <strong className="text-gray-900 dark:text-white">Remover esta página</strong>
                  <p className="text-gray-600 dark:text-gray-400">
                    Após confirmar que funciona, remova esta rota
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Aviso Final */}
        <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
          <div className="flex items-start">
            <div className="text-yellow-600 dark:text-yellow-400 text-2xl mr-3">⚠️</div>
            <div>
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                Importante - Segurança
              </h3>
              <div className="text-yellow-700 dark:text-yellow-300 space-y-2">
                <p>
                  • Esta página deve ser usada <strong>apenas para configuração inicial</strong>
                </p>
                <p>
                  • Após configurar o sistema XP, <strong>remova ou desabilite esta rota</strong>
                </p>
                <p>
                  • Não deixe este painel acessível em produção
                </p>
                <p>
                  • Se necessário, adicione autenticação de admin
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}