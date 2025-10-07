export default function SimpleXPTest() {
  const testXP = () => {
    console.log('🧪 Teste XP clicado!');
    
    const xpData = {
      questionId: 1,
      xpGained: 10,
      isCorrect: true,
      selectedAlternative: 'A',
      timestamp: Date.now()
    };
    
    localStorage.setItem('xpFeedback', JSON.stringify(xpData));
    console.log('✅ Dados salvos:', xpData);
    
    // Verificar se foi salvo
    const saved = localStorage.getItem('xpFeedback');
    console.log('📦 Verificação localStorage:', saved);
    
    // Recarregar página
    window.location.reload();
  };

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 9999,
      background: 'red',
      color: 'white',
      padding: '20px',
      border: '3px solid white',
      borderRadius: '10px',
      cursor: 'pointer'
    }} onClick={testXP}>
      🧪 TESTE XP - CLIQUE AQUI
    </div>
  );
}