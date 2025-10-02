import { SmartTextProcessor } from '../components/common/SmartTextProcessor';

export default function DebugTooltips() {
  const testText = "Três crianças com bronquiolite aguardam internação: Enzo com vírus sincicial respiratório; Miguel com parainfluenza 3 e Caio com Influenza A.";

  const simpleTests = [
    "bronquiolite",
    "pneumonia", 
    "febre",
    "VSR",
    "vírus sincicial respiratório"
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Debug - Sistema de Tooltips
          </h1>

          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-3">Teste com texto completo da questão 8:</h2>
              <div className="p-4 border rounded-lg bg-gray-50">
                <SmartTextProcessor theme="medical" variant="hover">
                  {testText}
                </SmartTextProcessor>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-3">Testes individuais de termos:</h2>
              <div className="space-y-3">
                {simpleTests.map((term, index) => (
                  <div key={index} className="p-3 border rounded-lg bg-blue-50">
                    <span className="text-sm text-gray-600 mb-1 block">Testando: "{term}"</span>
                    <SmartTextProcessor theme="medical" variant="hover">
                      Este é um teste com o termo {term} no meio da frase.
                    </SmartTextProcessor>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-3">Teste direto (sem processador):</h2>
              <div className="space-y-2">
                <div className="p-3 border rounded-lg bg-red-50">
                  <span className="text-sm text-gray-600 mb-1 block">Texto sem processamento:</span>
                  <span>{testText}</span>
                </div>
                <div className="p-3 border rounded-lg bg-green-50">
                  <span className="text-sm text-gray-600 mb-1 block">Texto com processamento:</span>
                  <SmartTextProcessor theme="medical" variant="hover">
                    {testText}
                  </SmartTextProcessor>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-3">Teste de CSS - Verificar se os estilos estão aplicados:</h2>
              <div className="space-y-2">
                <span className="text-blue-600 border-b border-dashed border-blue-300 cursor-help">
                  Texto com estilo manual
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}