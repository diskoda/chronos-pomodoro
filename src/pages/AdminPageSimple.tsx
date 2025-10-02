import React from 'react';

export const AdminPageSimple: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Admin Page - Debug
        </h1>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <p>✅ Admin page está carregando!</p>
          <p>Se você vê esta mensagem, a rota /admin está funcionando.</p>
        </div>
      </div>
    </div>
  );
};