import { useEffect } from 'react';

export default function XPTestComponent() {
  useEffect(() => {
    // Verificar localStorage na montagem
    const xpData = localStorage.getItem('xpFeedback');
    console.log('🧪 Teste: localStorage xpFeedback =', xpData);
    
    if (xpData) {
      console.log('🧪 Teste: Dados encontrados!', JSON.parse(xpData));
    }
  }, []);

  return (
    <div className="fixed top-4 left-4 bg-yellow-500 text-black p-2 rounded z-50">
      XP Test Component Mounted
    </div>
  );
}