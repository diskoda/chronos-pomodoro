import React from 'react';
import { AdminExplanations } from '../components/admin/AdminExplanations';
import { SmartTextProcessor } from '../components/common/SmartTextProcessor';

export const AdminPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Painel Administrativo - Explicações
        </h1>
        
        <AdminExplanations />
        
        {/* Área de testes */}
        <div className="mt-8 p-6 bg-white rounded-lg shadow-sm border">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Teste de Tooltips</h2>
          <div className="prose">
            <SmartTextProcessor>
              <p>
                Este paciente apresenta sintomas de <strong>diarreia aguda</strong> e necessita de{' '}
                <strong>hidratação endovenosa</strong>. O <strong>acesso venoso periférico</strong> foi estabelecido
                para administração de fluidos. Os <strong>exames laboratoriais</strong> mostram{' '}
                <strong>hipocalemia</strong> com <strong>potássio</strong> de 2.8 mEq/L.
              </p>
            </SmartTextProcessor>
            <SmartTextProcessor>
              <p>
                A <strong>gasometria arterial</strong> revela <strong>pH</strong> de 7.32,{' '}
                <strong>pO₂</strong> de 85 mmHg, <strong>pCO₂</strong> de 38 mmHg,{' '}
                <strong>HCO₃⁻</strong> de 18 mEq/L e <strong>SatO₂</strong> de 96%.
              </p>
            </SmartTextProcessor>
            <SmartTextProcessor>
              <p>
                O paciente está <strong>hígido</strong> e foi encaminhado ao <strong>pronto-socorro</strong> para{' '}
                <strong>estabilização inicial</strong>. As <strong>prescrições</strong> incluem{' '}
                <strong>hidratação</strong> para compensar as <strong>perdas</strong> e administração{' '}
                <strong>via oral</strong> quando possível.
              </p>
            </SmartTextProcessor>
          </div>
        </div>
      </div>
    </div>
  );
};