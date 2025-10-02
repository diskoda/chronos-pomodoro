import React, { useState } from 'react';
import { Upload, Download, RefreshCw, Database, AlertCircle, CheckCircle } from 'lucide-react';
import { useExplanationsContext } from '../../contexts/ExplanationsContext';
import { migrateExplanationsToFirebase } from '../../scripts/migrateExplanationsToFirebase';

interface AdminExplanationsProps {
  className?: string;
}

export const AdminExplanations: React.FC<AdminExplanationsProps> = ({ className = '' }) => {
  const { 
    explanations, 
    loading, 
    error, 
    isReady, 
    useFirebase, 
    setUseFirebase, 
    refreshExplanations 
  } = useExplanationsContext();

  const [migrationStatus, setMigrationStatus] = useState<{
    status: 'idle' | 'running' | 'success' | 'error';
    message: string;
    details?: any;
  }>({ status: 'idle', message: '' });

  const handleMigration = async () => {
    try {
      setMigrationStatus({ status: 'running', message: 'Iniciando migração...' });
      
      const result = await migrateExplanationsToFirebase();
      
      setMigrationStatus({
        status: 'success',
        message: `Migração concluída! ${result.totalMigrated} explicações enviadas.`,
        details: result
      });
      
      // Refresh para carregar do Firebase
      await refreshExplanations();
      
    } catch (error) {
      setMigrationStatus({
        status: 'error',
        message: `Erro na migração: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
        details: error
      });
    }
  };

  const handleToggleFirebase = async (enabled: boolean) => {
    setUseFirebase(enabled);
    if (enabled) {
      await refreshExplanations();
    }
  };

  const getStatusIcon = () => {
    switch (migrationStatus.status) {
      case 'running':
        return <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Database className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = () => {
    switch (migrationStatus.status) {
      case 'running':
        return 'border-blue-200 bg-blue-50';
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'error':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className={`p-6 bg-white rounded-lg shadow-sm border ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Admin - Explicações</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">
            {useFirebase ? 'Firebase Ativo' : 'Modo Local'}
          </span>
          <div className={`w-3 h-3 rounded-full ${useFirebase ? 'bg-green-500' : 'bg-gray-400'}`} />
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 border rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Explicações</p>
              <p className="text-2xl font-bold text-gray-900">
                {Object.keys(explanations).length}
              </p>
            </div>
            <Database className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="p-4 border rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <p className="text-lg font-semibold text-gray-900">
                {loading ? 'Carregando...' : isReady ? 'Pronto' : 'Erro'}
              </p>
            </div>
            {loading ? (
              <RefreshCw className="h-8 w-8 text-blue-500 animate-spin" />
            ) : isReady ? (
              <CheckCircle className="h-8 w-8 text-green-500" />
            ) : (
              <AlertCircle className="h-8 w-8 text-red-500" />
            )}
          </div>
        </div>

        <div className="p-4 border rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Fonte</p>
              <p className="text-lg font-semibold text-gray-900">
                {useFirebase ? 'Firebase' : 'Local'}
              </p>
            </div>
            <div className="flex space-x-1">
              <button
                onClick={() => handleToggleFirebase(true)}
                className={`px-2 py-1 text-xs rounded ${
                  useFirebase 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Firebase
              </button>
              <button
                onClick={() => handleToggleFirebase(false)}
                className={`px-2 py-1 text-xs rounded ${
                  !useFirebase 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Local
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 border border-red-200 bg-red-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-4 w-4 text-red-500" />
            <span className="text-sm text-red-700">Erro: {error}</span>
          </div>
        </div>
      )}

      {/* Migration Status */}
      {migrationStatus.message && (
        <div className={`mb-6 p-4 border rounded-lg ${getStatusColor()}`}>
          <div className="flex items-center space-x-2">
            {getStatusIcon()}
            <span className="text-sm font-medium">{migrationStatus.message}</span>
          </div>
          {migrationStatus.details && migrationStatus.status === 'success' && (
            <div className="mt-2 text-xs text-gray-600">
              <p>Migração realizada em: {migrationStatus.details.timestamp?.toLocaleString()}</p>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={handleMigration}
          disabled={migrationStatus.status === 'running'}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Upload className="h-4 w-4" />
          <span>Migrar para Firebase</span>
        </button>

        <button
          onClick={refreshExplanations}
          disabled={loading}
          className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Atualizar</span>
        </button>

        <button
          onClick={() => {
            const data = JSON.stringify(explanations, null, 2);
            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `explanations-backup-${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            URL.revokeObjectURL(url);
          }}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          <Download className="h-4 w-4" />
          <span>Backup JSON</span>
        </button>
      </div>

      {/* Debug Info */}
      <details className="mt-6">
        <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-900">
          Informações de Debug
        </summary>
        <div className="mt-2 p-4 bg-gray-50 rounded-lg">
          <pre className="text-xs text-gray-700 overflow-auto">
            {JSON.stringify({
              totalExplanations: Object.keys(explanations).length,
              useFirebase,
              isReady,
              loading,
              error,
              categories: Array.from(new Set(
                Object.values(explanations)
                  .map((exp: any) => exp.category)
                  .filter(Boolean)
              )).sort(),
              types: Array.from(new Set(
                Object.values(explanations).map((exp: any) => exp.type)
              )).sort()
            }, null, 2)}
          </pre>
        </div>
      </details>
    </div>
  );
};