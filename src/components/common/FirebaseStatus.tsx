import { useState, useEffect } from 'react';
import { Database, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { simpleFirestoreTest } from '../../utils/simpleFirestoreTest';

interface FirebaseStatusProps {
  className?: string;
}

export default function FirebaseStatus({ className = '' }: FirebaseStatusProps) {
  const [status, setStatus] = useState<'idle' | 'checking' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string>('');

  const checkStatus = async () => {
    setStatus('checking');
    setMessage('Verificando configuração...');

    try {
      const result = await simpleFirestoreTest();
      
      if (result.success) {
        setStatus('success');
        setMessage('✅ Firestore configurado e funcionando!');
      } else {
        setStatus('error');
        setMessage(`❌ ${result.error}`);
        console.error('Detalhes do erro:', result);
      }
    } catch (error) {
      setStatus('error');
      setMessage('❌ Erro ao verificar configuração');
      console.error('Erro no status check:', error);
    }
  };

  useEffect(() => {
    // Verificar automaticamente ao montar o componente
    checkStatus();
  }, []);

  const getStatusIcon = () => {
    switch (status) {
      case 'checking':
        return <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'error':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case 'checking':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
      default:
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
    }
  };

  return (
    <div className={`p-4 rounded-lg border ${getStatusColor()} ${className}`}>
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <Database className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          {getStatusIcon()}
        </div>
        <div className="flex-1">
          <h3 className="font-medium theme-text-primary">Status do Firebase</h3>
          <p className="text-sm theme-text-secondary mt-1">{message}</p>
        </div>
        <button
          onClick={checkStatus}
          disabled={status === 'checking'}
          className="px-3 py-1 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
        >
          {status === 'checking' ? 'Verificando...' : 'Verificar'}
        </button>
      </div>

      {status === 'error' && (
        <div className="mt-3 p-3 bg-white dark:bg-gray-800 rounded border">
          <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">Possíveis soluções:</h4>
          <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
            <li>• Verifique se está logado: <code>firebase login</code></li>
            <li>• Confirme o projeto: <code>firebase use penapedplataforma</code></li>
            <li>• Deploy das regras: <code>firebase deploy --only firestore:rules</code></li>
            <li>• Deploy dos índices: <code>firebase deploy --only firestore:indexes</code></li>
          </ul>
        </div>
      )}

      {status === 'success' && (
        <div className="mt-3 p-3 bg-white dark:bg-gray-800 rounded border">
          <div className="text-sm theme-text-secondary">
            <p className="mb-2">🎉 <strong>Tudo funcionando!</strong></p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>✅ Regras de segurança</div>
              <div>✅ Índices otimizados</div>
              <div>✅ Coleções criadas</div>
              <div>✅ Sistema XP ativo</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}