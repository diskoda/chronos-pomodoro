import { FlowProvider, QuestionFlowManager, FlowProgressIndicator } from '../components/questionFlow';
import { question1FlowData } from '../data/enhancedQuestionFlowData';
import { question1 } from '../data/questions/usp-sp-2025/question-1';

export default function TestQuestion1() {
  console.log('🎯 Teste direto da questão 1');
  console.log('Dados da questão:', question1);
  console.log('Dados do fluxo:', question1FlowData);

  const handleFlowFinish = () => {
    console.log('Fluxo finalizado!');
    alert('Fluxo Dr. Skoda finalizado com sucesso!');
  };

  return (
    <div className="dashboard-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          
          <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg">
            <h1 className="text-xl font-bold text-green-800">Teste Direto - Questão 1 com Dr. Skoda</h1>
            <p className="text-green-700">ID: {question1.id} | Título: {question1.title}</p>
          </div>

          <FlowProvider questionData={question1FlowData}>
            <FlowProgressIndicator className="mb-6" showDetails={true} />
            
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h2 className="font-semibold text-blue-800">Questão:</h2>
              <p className="text-blue-700">{question1.statement}</p>
              
              <div className="mt-4">
                <h3 className="font-semibold text-blue-800">Alternativas:</h3>
                <ul className="text-blue-700">
                  {question1.alternatives?.map((alt, index) => (
                    <li key={index} className="mt-1">{alt}</li>
                  )) || <li>Nenhuma alternativa encontrada</li>}
                </ul>
              </div>
            </div>

            <QuestionFlowManager onFinish={handleFlowFinish} />
          </FlowProvider>

        </div>
      </div>
    </div>
  );
}