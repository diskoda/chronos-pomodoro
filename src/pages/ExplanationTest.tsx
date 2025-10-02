import React from 'react';
import { SmartTextProcessor } from '../components/common/SmartTextProcessor';
import { question1 } from '../data/questions/usp-sp-2025/question-1';

export const ExplanationTestPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold theme-text-primary mb-2">
          Teste do Sistema TextExplanation
        </h1>
        <p className="theme-text-secondary">
          Demonstração do processamento automático de termos médicos
        </p>
      </div>

      {/* Exemplo com a Questão 1 */}
      <div className="theme-card rounded-lg p-6">
        <h2 className="text-xl font-semibold theme-text-primary mb-4">
          📋 Questão 1 - USP-SP 2025 (Processamento Automático)
        </h2>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-4">
          <h3 className="font-medium theme-text-primary mb-2">
            {question1.title}
          </h3>
          <div className="text-sm theme-text-secondary mb-2">
            <strong>Categoria:</strong> {question1.category} | 
            <strong> Dificuldade:</strong> {question1.difficulty} | 
            <strong> Tempo:</strong> {question1.timeEstimate} min
          </div>
        </div>

        <div className="theme-text-secondary leading-relaxed">
          <h4 className="font-medium theme-text-primary mb-3">Enunciado:</h4>
          <SmartTextProcessor theme="medical" variant="hover">
            {question1.statement}
          </SmartTextProcessor>
        </div>

        <div className="mt-6">
          <h4 className="font-medium theme-text-primary mb-3">Alternativas:</h4>
          <div className="space-y-2">
            {question1.alternatives?.map((alternative: string, index: number) => (
              <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <SmartTextProcessor theme="medical" variant="hover">
                  {alternative}
                </SmartTextProcessor>
              </div>
            )) || []}
          </div>
        </div>
      </div>

      {/* Exemplo Manual para Comparação */}
      <div className="theme-card rounded-lg p-6">
        <h2 className="text-xl font-semibold theme-text-primary mb-4">
          🔧 Comparação - Texto Original vs Processado
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium theme-text-primary mb-3 text-red-600">
              ❌ Texto Original (sem explicações)
            </h3>
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <p className="theme-text-secondary leading-relaxed">
                {question1.statement}
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium theme-text-primary mb-3 text-green-600">
              ✅ Texto Processado (com explicações automáticas)
            </h3>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <SmartTextProcessor theme="medical" variant="hover">
                {question1.statement}
              </SmartTextProcessor>
            </div>
          </div>
        </div>
      </div>

      {/* Demonstração de Termos Detectados */}
      <div className="theme-card rounded-lg p-6">
        <h2 className="text-xl font-semibold theme-text-primary mb-4">
          🔍 Termos Detectados Automaticamente
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { term: 'asma', found: true, description: 'Doença respiratória crônica' },
            { term: 'broncoespasmo', found: true, description: 'Contração dos brônquios' },
            { term: 'UBS', found: true, description: 'Unidade Básica de Saúde' },
            { term: 'tabagismo', found: true, description: 'Dependência do tabaco' },
            { term: 'entrevista motivacional', found: false, description: 'Abordagem terapêutica' },
            { term: 'pediatria', found: false, description: 'Medicina infantil' }
          ].map((item, index) => (
            <div 
              key={index}
              className={`p-3 rounded-lg border-2 ${
                item.found 
                  ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700' 
                  : 'bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-600'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className={item.found ? 'text-green-600' : 'text-gray-400'}>
                  {item.found ? '✅' : '⚪'}
                </span>
                <span className="font-medium theme-text-primary">{item.term}</span>
              </div>
              <p className="text-xs theme-text-secondary">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Instruções de Uso */}
      <div className="theme-card rounded-lg p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <h2 className="text-xl font-semibold theme-text-primary mb-4">
          📚 Como Funciona
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
            <div>
              <h4 className="font-medium theme-text-primary">Detecção Automática</h4>
              <p className="text-sm theme-text-secondary">O sistema analisa o texto e identifica termos mapeados na base de dados</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
            <div>
              <h4 className="font-medium theme-text-primary">Envolvimento Inteligente</h4>
              <p className="text-sm theme-text-secondary">Cada termo detectado é automaticamente envolvido com o componente TextExplanation</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
            <div>
              <h4 className="font-medium theme-text-primary">Explicação Interativa</h4>
              <p className="text-sm theme-text-secondary">Ao passar o mouse sobre os termos destacados, uma explicação detalhada aparece</p>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg">
          <h4 className="font-medium theme-text-primary mb-2">💡 Dica:</h4>
          <p className="text-sm theme-text-secondary">
            Passe o mouse sobre as palavras destacadas (<span className="text-teal-600 bg-teal-50 px-1 rounded">asma</span>, 
            <span className="text-teal-600 bg-teal-50 px-1 rounded">UBS</span>, etc.) para ver as explicações!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExplanationTestPage;