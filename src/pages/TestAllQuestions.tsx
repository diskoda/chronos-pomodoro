import { useState } from 'react';
import { allQuestions } from '../data/questions';
import { SmartTextProcessor } from '../components/common/SmartTextProcessor';

export default function TestAllQuestions() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = allQuestions[currentQuestionIndex];

  const nextQuestion = () => {
    if (currentQuestionIndex < allQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Teste de Tooltips - Questão {currentQuestionIndex + 1} de {allQuestions.length}
            </h1>
            <div className="space-x-2">
              <button
                onClick={previousQuestion}
                disabled={currentQuestionIndex === 0}
                className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
              >
                Anterior
              </button>
              <button
                onClick={nextQuestion}
                disabled={currentQuestionIndex === allQuestions.length - 1}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
              >
                Próxima
              </button>
            </div>
          </div>

          {currentQuestion && (
            <div className="space-y-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h2 className="font-semibold text-lg mb-2">
                  {currentQuestion.title}
                </h2>
                <div className="text-sm text-gray-600 space-x-2">
                  <span>ID: {currentQuestion.id}</span>
                  <span>•</span>
                  <span>Exame: {currentQuestion.exam}</span>
                  <span>•</span>
                  <span>Categoria: {Array.isArray(currentQuestion.category) ? currentQuestion.category.join(', ') : currentQuestion.category}</span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Enunciado com Tooltips:</h3>
                <div className="p-4 border rounded-lg bg-gray-50">
                  <SmartTextProcessor theme="medical" variant="hover">
                    {currentQuestion.statement}
                  </SmartTextProcessor>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Alternativas com Tooltips:</h3>
                {currentQuestion.alternatives && currentQuestion.alternatives.map((alt, index) => (
                  <div key={index} className="p-3 border rounded-lg bg-gray-50">
                    <SmartTextProcessor theme="medical" variant="hover">
                      {alt}
                    </SmartTextProcessor>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg">
                <h3 className="font-semibold mb-2">Tags da questão:</h3>
                <div className="flex flex-wrap gap-2">
                  {currentQuestion.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-yellow-200 text-yellow-800 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}