import { useEffect, useState } from 'react';
import { flowDataManager } from '../data/universalFlowDataManager';
import { initializeUSPSP2025System } from '../data/uspSp2025FlowData';

export default function TestQuestion10() {
  const [flowData, setFlowData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testFlow = async () => {
      try {
        console.log('🔄 Inicializando sistema...');
        await initializeUSPSP2025System();
        
        console.log('🔍 Buscando dados da questão 10...');
        const data = flowDataManager.getFlowData(10);
        
        if (data) {
          console.log('✅ Dados encontrados:', data);
          setFlowData(data);
        } else {
          console.log('❌ Dados não encontrados para questão 10');
          setError('Dados não encontrados para questão 10');
        }
      } catch (err) {
        console.error('❌ Erro:', err);
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    testFlow();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Teste Questão 10</h1>
          <p>🔄 Carregando...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4 text-red-600">Erro no Teste</h1>
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">✅ Teste Questão 10 - Sucesso!</h1>
        
        {flowData && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-2">Contexto</h2>
              <p className="text-gray-700 dark:text-gray-300">{flowData.contextText?.substring(0, 200)}...</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-2">Metadados</h2>
              <pre className="text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 p-4 rounded">
                {JSON.stringify(flowData.metadata, null, 2)}
              </pre>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-2">Alternativas</h2>
              <p className="text-gray-700 dark:text-gray-300">
                {flowData.alternativesAnalysis?.length || 0} alternativas configuradas
              </p>
            </div>
            
            <div className="mt-6">
              <a 
                href="/question/dr-skoda/10" 
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                🧑‍⚕️ Testar Dr. Skoda Questão 10
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}