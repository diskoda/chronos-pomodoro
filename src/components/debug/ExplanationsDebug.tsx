import React from 'react';
import { useExplanationsContext } from '../../contexts/ExplanationsContext';

export const ExplanationsDebug: React.FC = () => {
  const { 
    explanations, 
    loading, 
    error, 
    isReady, 
    useFirebase 
  } = useExplanationsContext();

  const totalExplanations = Object.keys(explanations).length;
  const sampleExplanations = Object.keys(explanations).slice(0, 5);

  React.useEffect(() => {
    console.log('🔍 DEBUG - Estado das explicações:');
    console.log('- useFirebase:', useFirebase);
    console.log('- loading:', loading);
    console.log('- isReady:', isReady);
    console.log('- error:', error);
    console.log('- total explicações:', totalExplanations);
    console.log('- primeiras 5 explicações:', sampleExplanations);
    
    if (totalExplanations > 0) {
      console.log('📝 Exemplo de explicação:', explanations[sampleExplanations[0]]);
    }
  }, [explanations, loading, error, isReady, useFirebase, totalExplanations, sampleExplanations]);

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
      <h3 className="font-bold text-blue-900 mb-2">🔍 Debug - Estado das Explicações</h3>
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <strong>Fonte:</strong> {useFirebase ? '🔥 Firebase' : '📁 Local'}
        </div>
        <div>
          <strong>Status:</strong> {loading ? '⏳ Carregando...' : isReady ? '✅ Pronto' : '❌ Erro'}
        </div>
        <div>
          <strong>Total:</strong> {totalExplanations} explicações
        </div>
        <div>
          <strong>Erro:</strong> {error || 'Nenhum'}
        </div>
      </div>

      {totalExplanations > 0 && (
        <div className="mt-3">
          <strong>Primeiras explicações carregadas:</strong>
          <ul className="list-disc list-inside text-sm mt-1">
            {sampleExplanations.map((id) => (
              <li key={id} className="text-gray-700">
                {id} → {explanations[id]?.title || 'Sem título'}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-3 text-xs text-gray-600">
        💡 Verifique o console do navegador para logs detalhados
      </div>
    </div>
  );
};