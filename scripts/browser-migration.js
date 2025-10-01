/**
 * Script de migração para executar no Console do Navegador
 * 
 * INSTRUÇÕES:
 * 1. Abra a aplicação no navegador
 * 2. Abra o Console (F12 → Console)
 * 3. Cole este código completo
 * 4. Execute com Enter
 */

console.log('🚀 Iniciando migração de questões...');

// Função para migração no browser
async function migrarQuestoesBrowser() {
  try {
    // Importar módulos necessários
    const { migrateAllQuestions, verifyMigration } = await import('/src/utils/questionMigration.js');
    
    console.log('📋 Módulos carregados com sucesso');
    
    // Executar migração
    console.log('🔄 Iniciando migração...');
    await migrateAllQuestions();
    
    console.log('✅ Migração concluída! Verificando...');
    
    // Verificar resultado
    const verification = await verifyMigration();
    
    if (verification.isValid) {
      console.log('🎉 SUCESSO! Migração verificada!');
      console.log(`📊 Questões migradas: ${verification.firebaseCount}`);
    } else {
      console.warn('⚠️ Verificação falhou');
      console.log(`❌ Questões faltando: ${verification.missingQuestions.length}`);
    }
    
    return verification;
    
  } catch (error) {
    console.error('❌ Erro na migração:', error);
    
    if (error.message.includes('permission')) {
      console.log('\n🔧 SOLUÇÃO PARA ERRO DE PERMISSÕES:');
      console.log('1. Acesse: https://console.firebase.google.com/');
      console.log('2. Projeto: penapedplataforma → Firestore → Rules');
      console.log('3. Cole: allow read, write: if true;');
      console.log('4. Publish e tente novamente');
    }
    
    throw error;
  }
}

// Executar migração
migrarQuestoesBrowser()
  .then(result => {
    console.log('🏁 Processo finalizado');
    window.migrationResult = result; // Salvar resultado globalmente
  })
  .catch(error => {
    console.error('💥 Falha na migração:', error.message);
  });

// Disponibilizar função globalmente para re-execução
window.migrarQuestoes = migrarQuestoesBrowser;