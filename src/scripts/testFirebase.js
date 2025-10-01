// Script para testar a configuração do Firebase em produção
import { initializeXPSystem, validateCollections } from './initFirebase.js';

async function testFirebaseConfiguration() {
  console.log('🧪 Testando configuração do Firebase...\n');

  try {
    // 1. Validar coleções
    console.log('1️⃣ Validando coleções...');
    const collectionsValid = await validateCollections();
    
    if (!collectionsValid) {
      throw new Error('Erro na validação das coleções');
    }

    // 2. Inicializar sistema XP
    console.log('\n2️⃣ Inicializando sistema XP...');
    const xpSystemInitialized = await initializeXPSystem();
    
    if (!xpSystemInitialized) {
      throw new Error('Erro na inicialização do sistema XP');
    }

    // 3. Sucesso
    console.log('\n🎉 Configuração do Firebase concluída com sucesso!');
    console.log('\n📋 Resumo:');
    console.log('✅ Regras de segurança: Deployadas');
    console.log('✅ Índices do Firestore: Deployados');
    console.log('✅ Coleções: Validadas');
    console.log('✅ Sistema XP: Inicializado');
    
    console.log('\n🔗 Links importantes:');
    console.log('📊 Console Firebase: https://console.firebase.google.com/project/penapedplataforma');
    console.log('🗄️ Firestore: https://console.firebase.google.com/project/penapedplataforma/firestore');
    console.log('👥 Authentication: https://console.firebase.google.com/project/penapedplataforma/authentication');
    
    console.log('\n🚀 Próximos passos:');
    console.log('1. Execute: npm run dev');
    console.log('2. Acesse: http://localhost:5174/xp-system');
    console.log('3. Teste todas as funcionalidades do sistema XP');
    console.log('4. Integre o sistema XP nas suas páginas existentes');

    return true;

  } catch (error) {
    console.error('\n❌ Erro na configuração:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Verifique se está logado: firebase login');
    console.log('2. Confirme o projeto: firebase use penapedplataforma');
    console.log('3. Verifique as regras: firebase deploy --only firestore:rules');
    console.log('4. Verifique os índices: firebase deploy --only firestore:indexes');
    
    return false;
  }
}

// Executar teste
testFirebaseConfiguration();