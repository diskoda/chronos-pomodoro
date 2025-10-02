import { useState } from 'react';

export default function SimpleTooltipTest() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Teste Simples de Tooltip</h1>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-700 leading-relaxed text-lg">
            Esta criança tem{' '}
            <span 
              className="bg-blue-100 text-blue-700 px-1 cursor-help border-b-2 border-blue-300"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              asma
            </span>
            {' '}e está com broncoespasmo.
          </p>
          
          {showTooltip && (
            <div className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm">
              <h3 className="font-semibold text-sm mb-2">Asma</h3>
              <p className="text-sm text-gray-700">
                Doença inflamatória crônica das vias aéreas caracterizada por obstrução reversível do fluxo aéreo.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}