import { useState } from 'react';
import { Upload, Database, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { useQuestionActions } from '../hooks/useQuestions';
import { migrateAllQuestions, verifyMigration, getComparisonStats } from '../utils/questionMigration';
import { allQuestions } from '../data/questions';

export default function QuestionsAdmin() {
  const { loading } = useQuestionActions();
  const [migrationStatus, setMigrationStatus] = useState<'idle' | 'migrating' | 'success' | 'error'>('idle');
  const [migrationMessage, setMigrationMessage] = useState('');
  const [verificationResult, setVerificationResult] = useState<any>(null);

  const handleMigration = async () => {
    try {
      setMigrationStatus('migrating');
      setMigrationMessage('Iniciando migração...');
      
      await migrateAllQuestions();
      
      setMigrationStatus('success');
      setMigrationMessage('Migração concluída com sucesso!');
      
      // Verificar migração automaticamente
      const verification = await verifyMigration();
      setVerificationResult(verification);
      
    } catch (err) {
      setMigrationStatus('error');
      setMigrationMessage(err instanceof Error ? err.message : 'Erro na migração');
    }
  };

  const handleVerification = async () => {
    try {
      const result = await verifyMigration();
      setVerificationResult(result);
    } catch (err) {
      console.error('Erro na verificação:', err);
    }
  };

  const handleStats = async () => {
    try {
      await getComparisonStats();
    } catch (err) {
      console.error('Erro ao obter estatísticas:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-6">
          <Database className="h-8 w-8 text-blue-600 mr-3" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Administração de Questões</h1>
            <p className="text-gray-600">Migração e gerenciamento do banco de questões Firebase</p>
          </div>
        </div>

        {/* Status da Migração */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Status da Migração</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-medium text-blue-900">Questões Locais</h3>
              <p className="text-2xl font-bold text-blue-600">{allQuestions.length}</p>
              <p className="text-sm text-blue-700">Prontas para migração</p>
            </div>
            
            {verificationResult && (
              <>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h3 className="font-medium text-green-900">No Firebase</h3>
                  <p className="text-2xl font-bold text-green-600">{verificationResult.firebaseCount}</p>
                  <p className="text-sm text-green-700">Questões migradas</p>
                </div>
                
                <div className={`p-4 rounded-lg border ${
                  verificationResult.isValid 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-red-50 border-red-200'
                }`}>
                  <h3 className={`font-medium ${
                    verificationResult.isValid ? 'text-green-900' : 'text-red-900'
                  }`}>
                    Status
                  </h3>
                  <div className="flex items-center mt-1">
                    {verificationResult.isValid ? (
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                    )}
                    <p className={`text-sm ${
                      verificationResult.isValid ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {verificationResult.isValid ? 'Sincronizado' : 'Dessincronizado'}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          {migrationMessage && (
            <div className={`p-4 rounded-lg mb-4 ${
              migrationStatus === 'success' 
                ? 'bg-green-50 border border-green-200 text-green-700'
                : migrationStatus === 'error'
                ? 'bg-red-50 border border-red-200 text-red-700'
                : 'bg-blue-50 border border-blue-200 text-blue-700'
            }`}>
              <div className="flex items-center">
                {migrationStatus === 'migrating' && (
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                )}
                {migrationStatus === 'success' && (
                  <CheckCircle className="h-5 w-5 mr-2" />
                )}
                {migrationStatus === 'error' && (
                  <AlertTriangle className="h-5 w-5 mr-2" />
                )}
                <span>{migrationMessage}</span>
              </div>
            </div>
          )}
        </div>

        {/* Ações */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Ações Disponíveis</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={handleMigration}
              disabled={loading || migrationStatus === 'migrating'}
              className="flex items-center justify-center px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
            >
              {migrationStatus === 'migrating' ? (
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
              ) : (
                <Upload className="h-5 w-5 mr-2" />
              )}
              Migrar Questões
            </button>
            
            <button
              onClick={handleVerification}
              className="flex items-center justify-center px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
            >
              <CheckCircle className="h-5 w-5 mr-2" />
              Verificar Migração
            </button>
            
            <button
              onClick={handleStats}
              className="flex items-center justify-center px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
            >
              <Database className="h-5 w-5 mr-2" />
              Ver Estatísticas
            </button>
          </div>
        </div>

        {/* Resultado da Verificação */}
        {verificationResult && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Resultado da Verificação</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Questões Locais:</span> {verificationResult.localCount}
                </div>
                <div>
                  <span className="font-medium">Questões Firebase:</span> {verificationResult.firebaseCount}
                </div>
                <div>
                  <span className="font-medium">Migração Válida:</span> 
                  <span className={verificationResult.isValid ? 'text-green-600' : 'text-red-600'}>
                    {verificationResult.isValid ? ' Sim' : ' Não'}
                  </span>
                </div>
                {verificationResult.missingQuestions.length > 0 && (
                  <div>
                    <span className="font-medium">Questões Faltando:</span> {verificationResult.missingQuestions.length}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Avisos */}
        <div className="mt-8 space-y-4">
          {/* Aviso de Permissões */}
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-red-600 mr-2 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-red-800">Erro de Permissões Detectado</p>
                <p className="mt-2 text-red-700">
                  Para resolver o erro "Missing or insufficient permissions":
                </p>
                <ol className="mt-2 text-red-700 space-y-1 list-decimal list-inside">
                  <li>Acesse o <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="underline">Firebase Console</a></li>
                  <li>Vá para "Firestore Database" → "Rules"</li>
                  <li>Substitua as regras por: <code className="bg-red-100 px-1 rounded">allow read, write: if true;</code></li>
                  <li>Clique em "Publish"</li>
                  <li>Tente a migração novamente</li>
                </ol>
                <p className="mt-2 text-red-600 font-medium">
                  ⚠️ Esta é uma configuração temporária para desenvolvimento!
                </p>
              </div>
            </div>
          </div>

          {/* Avisos Gerais */}
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-yellow-800">Avisos Importantes:</p>
                <ul className="mt-2 text-yellow-700 space-y-1">
                  <li>• A migração deve ser executada apenas uma vez</li>
                  <li>• Verificar se há questões duplicadas antes de migrar</li>
                  <li>• Fazer backup dos dados locais antes da migração</li>
                  <li>• Verificar as configurações do Firebase antes de prosseguir</li>
                  <li>• Consulte <code>docs/FIRESTORE-PERMISSIONS.md</code> para configuração detalhada</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}