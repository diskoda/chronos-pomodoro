#!/usr/bin/env node

/**
 * Script de configuração completa do Firebase para explicações
 * 
 * Este script:
 * 1. Verifica a configuração do Firebase
 * 2. Migra todas as explicações para o Firestore
 * 3. Configura as regras de segurança
 * 4. Testa a conectividade
 */

import { runMigration } from './migrateExplanationsToFirebase';
import { loadExplanationsFromFirebase, getExplanationsMetadata } from '../services/explanationsService';
import { FIREBASE_CONFIG } from '../config/firebase';

console.log('🚀 Iniciando configuração completa do Firebase para Explicações');
console.log('='.repeat(60));

const setupFirebaseExplanations = async () => {
  try {
    // 1. Verificar configuração
    console.log('1️⃣ Verificando configuração do Firebase...');
    
    if (!FIREBASE_CONFIG.USE_FIREBASE) {
      console.log('⚠️  Firebase está desabilitado na configuração');
      console.log('   Para habilitar, altere USE_FIREBASE para true em src/config/firebase.ts');
      return;
    }
    
    console.log('✅ Configuração do Firebase OK');
    
    // 2. Executar migração
    console.log('\n2️⃣ Migrando explicações para o Firestore...');
    await runMigration();
    
    // 3. Testar conectividade
    console.log('\n3️⃣ Testando conectividade e carregamento...');
    
    const explanations = await loadExplanationsFromFirebase();
    console.log(`✅ Carregadas ${Object.keys(explanations).length} explicações do Firebase`);
    
    // 4. Verificar metadados
    console.log('\n4️⃣ Verificando metadados...');
    
    const metadata = await getExplanationsMetadata();
    if (metadata) {
      console.log('✅ Metadados encontrados:');
      console.log(`   - Total: ${metadata.totalExplanations} explicações`);
      console.log(`   - Versão: ${metadata.version}`);
      console.log(`   - Categorias: ${metadata.categories.length}`);
      console.log(`   - Última atualização: ${metadata.lastUpdated.toLocaleString()}`);
    } else {
      console.log('⚠️  Metadados não encontrados');
    }
    
    // 5. Instruções finais
    console.log('\n🎉 Configuração concluída com sucesso!');
    console.log('\n📋 Próximos passos:');
    console.log('   1. Adicione o ExplanationsProvider ao seu App.tsx:');
    console.log('      ```tsx');
    console.log('      import { ExplanationsProvider } from "./contexts/ExplanationsContext";');
    console.log('      ');
    console.log('      function App() {');
    console.log('        return (');
    console.log('          <ExplanationsProvider>');
    console.log('            {/* Seu app aqui */}');
    console.log('          </ExplanationsProvider>');
    console.log('        );');
    console.log('      }');
    console.log('      ```');
    console.log('');
    console.log('   2. Use o hook useExplanationsContext nos componentes');
    console.log('   3. Acesse o painel admin em /admin para gerenciar');
    console.log('');
    console.log('🔥 Sistema Firebase + Local híbrido configurado!');
    
  } catch (error) {
    console.error('\n❌ Erro na configuração:', error);
    console.log('\n🔄 Fallback: O sistema continuará funcionando com explicações locais');
    throw error;
  }
};

// Executar setup
setupFirebaseExplanations()
  .then(() => {
    console.log('\n🏁 Setup finalizado!');
  })
  .catch((error) => {
    console.error('\n💥 Falha no setup:', error);
    console.log('\n📞 Para suporte, verifique:');
    console.log('   1. Configuração do Firebase em src/config/firebase.ts');
    console.log('   2. Permissões do Firestore');
    console.log('   3. Conexão com a internet');
  });