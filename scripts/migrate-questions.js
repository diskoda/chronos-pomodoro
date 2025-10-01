#!/usr/bin/env node

/**
 * Script para migrar questões locais para Firebase
 * Execute com: npm run migrate-questions
 */

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { migrateAllQuestions, verifyMigration } from '../src/utils/questionMigration.ts';

// Configuração do Firebase (substitua pelas suas credenciais)
const firebaseConfig = {
  apiKey: "AIzaSyBHJO-758wzc4IL3rpcAd_zcGBsP3ZAur0",
  authDomain: "penapedplataforma.firebaseapp.com",
  projectId: "penapedplataforma",
  storageBucket: "penapedplataforma.firebasestorage.app",
  messagingSenderId: "550474080281",
  appId: "1:550474080281:web:c2453a7df5fdd6c03c4a88"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function runMigration() {
  console.log('🚀 Iniciando processo de migração de questões...\n');

  try {
    // Executar migração
    await migrateAllQuestions();
    
    console.log('\n✅ Migração concluída! Verificando integridade...\n');
    
    // Verificar migração
    const verification = await verifyMigration();
    
    if (verification.isValid) {
      console.log('🎉 Migração verificada com sucesso!');
      console.log(`📊 Total de questões migradas: ${verification.firebaseCount}`);
    } else {
      console.warn('⚠️ Problemas encontrados na migração:');
      console.log(`❌ Questões faltando: ${verification.missingQuestions.length}`);
      console.log(`📝 IDs faltando: ${verification.missingQuestions.join(', ')}`);
    }
    
  } catch (error) {
    console.error('❌ Erro durante a migração:', error);
    process.exit(1);
  }
}

// Executar migração se chamado diretamente
if (require.main === module) {
  runMigration()
    .then(() => {
      console.log('\n🏁 Processo de migração finalizado.');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Falha crítica na migração:', error);
      process.exit(1);
    });
}

export { runMigration };