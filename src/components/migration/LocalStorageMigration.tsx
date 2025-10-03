import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { migrateLocalToFirebase } from '../../services/userAttemptsService';
import { CheckCircle, Database, Upload, AlertCircle } from 'lucide-react';

// ==========================================
// COMPONENTE DE MIGRAÇÃO DO LOCALSTORAGE
// ==========================================

export default function LocalStorageMigration() {
  const { currentUser } = useAuth();
  const [isMigrating, setIsMigrating] = useState(false);
  const [migrationStatus, setMigrationStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [migrationStats, setMigrationStats] = useState<{
    totalMigrated: number;
    errors: string[];
  } | null>(null);

  // Verificar se há dados para migrar
  const hasLocalData = () => {
    try {
      const keys = Object.keys(localStorage);
      return keys.some(key => 
        key.startsWith('question-attempts-') || 
        key.startsWith('user-question-attempts')
      );
    } catch {
      return false;
    }
  };

  const handleMigration = async () => {
    if (!currentUser) return;

    setIsMigrating(true);
    setMigrationStatus('idle');

    try {
      const result = await migrateLocalToFirebase(currentUser.uid);
      
      setMigrationStats({
        totalMigrated: result.totalMigrated,
        errors: result.errors
      });

      if (result.errors.length === 0) {
        setMigrationStatus('success');
      } else {
        setMigrationStatus('error');
      }
    } catch (error) {
      console.error('Erro na migração:', error);
      setMigrationStatus('error');
      setMigrationStats({
        totalMigrated: 0,
        errors: [error instanceof Error ? error.message : 'Erro desconhecido']
      });
    } finally {
      setIsMigrating(false);
    }
  };

  // Não mostrar se não estiver logado
  if (!currentUser) {
    return null;
  }

  // Não mostrar se não há dados locais
  if (!hasLocalData()) {
    return null;
  }

  // Se já migrado com sucesso, mostrar mensagem
  if (migrationStatus === 'success') {
    return (
      <div className="theme-card rounded-lg p-6 mb-6 border-l-4 border-green-500">
        <div className="flex items-center space-x-3">
          <CheckCircle className="h-6 w-6 text-green-500" />
          <div>
            <h3 className="text-lg font-semibold theme-text-primary">
              Migração Concluída!
            </h3>
            <p className="theme-text-secondary text-sm">
              {migrationStats?.totalMigrated || 0} tentativas foram transferidas para a nuvem.
              Seus dados agora estão sincronizados entre dispositivos.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="theme-card rounded-lg p-6 mb-6 border-l-4 border-blue-500">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <Database className="h-8 w-8 text-blue-600" />
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold theme-text-primary mb-2">
            Migrar Dados para a Nuvem
          </h3>
          
          <p className="theme-text-secondary text-sm mb-4">
            Detectamos dados de progresso salvos localmente no seu dispositivo. 
            Migre-os para a nuvem para sincronizar entre dispositivos e garantir backup.
          </p>

          {/* Status de erro */}
          {migrationStatus === 'error' && migrationStats && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <h4 className="font-medium text-red-700 dark:text-red-300">
                  Erro na Migração
                </h4>
              </div>
              <p className="text-sm text-red-600 dark:text-red-400 mb-2">
                {migrationStats.totalMigrated > 0 && (
                  <>Migrados: {migrationStats.totalMigrated} itens.</>
                )}
              </p>
              {migrationStats.errors.length > 0 && (
                <div className="text-xs text-red-500">
                  <p className="font-medium mb-1">Erros:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {migrationStats.errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <div className="flex items-center space-x-3">
            <button
              onClick={handleMigration}
              disabled={isMigrating}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition-colors"
            >
              {isMigrating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  <span>Migrando...</span>
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  <span>Migrar Agora</span>
                </>
              )}
            </button>

            {!isMigrating && (
              <button
                onClick={() => {
                  if (confirm('Tem certeza que deseja pular a migração? Os dados locais permanecerão apenas neste dispositivo.')) {
                    // Marcar como migração realizada para não mostrar novamente
                    localStorage.setItem('migration-skipped', 'true');
                    window.location.reload();
                  }
                }}
                className="px-4 py-2 theme-border border rounded-lg theme-text-secondary hover:theme-text-primary transition-colors"
              >
                Pular por Agora
              </button>
            )}
          </div>

          <div className="mt-4 text-xs theme-text-tertiary">
            <p>
              ✅ Dados transferidos com segurança<br />
              ✅ Sincronização automática entre dispositivos<br />
              ✅ Backup na nuvem
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}