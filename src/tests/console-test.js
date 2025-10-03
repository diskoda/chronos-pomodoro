// ==========================================
// TESTES VIA CONSOLE DO NAVEGADOR
// ==========================================

// Copie e cole este código no console do navegador (F12)

// Teste 1: Verificar se o sistema está funcionando
console.log('🧪 Testando Sistema Universal de Questões');

// Teste 2: Importar e testar configurações
try {
  // Simular imports (adapte conforme sua estrutura)
  const { 
    drSkodaConfig, 
    simpleConfig, 
    studyConfig,
    validateConfig,
    getAvailablePresets 
  } = window.questionConfigFactory || {};

  if (drSkodaConfig) {
    // Testar Dr. Skoda
    const drSkodaTest = drSkodaConfig(1);
    console.log('✅ Dr. Skoda Config:', drSkodaTest);
    
    // Testar validação
    const validation = validateConfig(drSkodaTest);
    console.log('✅ Validação Dr. Skoda:', validation);
    
    // Testar presets
    const presets = getAvailablePresets();
    console.log('✅ Presets disponíveis:', presets);
    
  } else {
    console.log('⚠️ Sistema ainda não carregado. Tente novamente em alguns segundos.');
  }
  
} catch (error) {
  console.error('❌ Erro no teste:', error);
}

// Teste 3: Verificar dados de fluxo
try {
  const { flowDataManager } = window.universalFlowDataManager || {};
  
  if (flowDataManager) {
    const stats = flowDataManager.getStats();
    console.log('📊 Stats do Flow Manager:', stats);
    
    const questions = flowDataManager.listAvailableQuestions();
    console.log('📋 Questões disponíveis:', questions);
  }
  
} catch (error) {
  console.log('ℹ️ Flow Manager não disponível no console');
}

// Instruções para o usuário
console.log(`
🎯 INSTRUÇÕES DE TESTE:

1. DASHBOARD:
   - Vá para a página Dashboard
   - Clique na aba "🧪 Teste"
   - Teste os 3 componentes diferentes

2. CONSOLE:
   - Abra o console (F12)
   - Execute os comandos acima
   - Verifique os logs

3. DIRECT TEST:
   - Acesse qualquer página
   - Adicione <QuickTest /> no JSX
   - Veja os componentes renderizados

4. NAVEGAÇÃO:
   - Teste /question/study/1
   - Teste /question/simple/1
   - Teste /question/dr-skoda/1

📋 O QUE OBSERVAR:
✅ Componentes renderizam sem erro
✅ Console mostra configurações válidas
✅ Navegação funciona
✅ Dr. Skoda aparece quando habilitado
✅ Interface muda conforme preset
`);

// Teste 4: Performance
console.time('Universal System Performance');

for (let i = 1; i <= 10; i++) {
  try {
    // Simular criação de configurações
    const configs = [
      { questionId: i, preset: 'dr-skoda-full' },
      { questionId: i, preset: 'simple' },
      { questionId: i, preset: 'study' }
    ];
    
    configs.forEach(config => {
      // Simular validação
      if (window.questionConfigFactory?.validateConfig) {
        const testConfig = { questionId: config.questionId };
        window.questionConfigFactory.validateConfig(testConfig);
      }
    });
    
  } catch (error) {
    console.log(`Erro no teste ${i}:`, error);
  }
}

console.timeEnd('Universal System Performance');
console.log('✅ Teste de performance concluído');