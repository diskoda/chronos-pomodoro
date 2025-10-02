import { SmartTextProcessor } from '../components/common/SmartTextProcessor';
import TextExplanation from '../components/common/TextExplanation';

export default function TestTooltips() {
  const testText = "Criança com diagnóstico prévio de asma, está com uma crise de broncoespasmo atual na UBS. O pai é tabagista.";

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Teste de Tooltips</h1>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Texto com SmartTextProcessor:</h2>
          <div className="text-gray-700 leading-relaxed text-lg">
            <SmartTextProcessor theme="medical" variant="hover">
              {testText}
            </SmartTextProcessor>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow mt-6">
          <h2 className="text-lg font-semibold mb-4">TextExplanation manual:</h2>
          <div className="text-gray-700 leading-relaxed text-lg">
            Esta criança tem <TextExplanation explanationId="asma" theme="medical" variant="hover" className="bg-yellow-200 px-1 border-2 border-blue-500">asma</TextExplanation> e está com <TextExplanation explanationId="broncoespasmo" theme="medical" variant="hover" className="bg-yellow-200 px-1 border-2 border-red-500">broncoespasmo</TextExplanation>.
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow mt-6">
          <h2 className="text-lg font-semibold mb-4">Texto sem processamento:</h2>
          <div className="text-gray-700 leading-relaxed">
            {testText}
          </div>
        </div>
      </div>
    </div>
  );
}