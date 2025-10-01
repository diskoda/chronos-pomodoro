import { db } from '../config/firebase';
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

/**
 * Testa a criação automática do banco de dados Firestore
 */
export async function testFirestoreConnection() {
  try {
    console.log('🧪 Testando conexão com Firestore...');

    // 1. Criar documento de teste na coleção system_test (sem autenticação necessária)
    const testDoc = {
      message: 'Teste de conexão com Firestore',
      timestamp: new Date(),
      version: '1.0.0',
      testId: 'connection_test_' + Date.now()
    };

    // Criar documento na coleção 'system_test'
    const testRef = doc(db, 'system_test', 'connection_test');
    await setDoc(testRef, testDoc);
    console.log('✅ Documento de teste criado!');

    // 2. Ler o documento para confirmar
    const docSnap = await getDoc(testRef);

    if (docSnap.exists()) {
      console.log('✅ Documento lido com sucesso!');
      console.log('📄 Dados:', docSnap.data());
      return true;
    } else {
      console.log('❌ Documento não encontrado');
      return false;
    }

  } catch (error: any) {
    console.error('❌ Erro na conexão com Firestore:', error);
    
    // Verificar tipos de erro comuns
    if (error?.code === 'permission-denied') {
      console.log('🔒 Erro de permissão - verifique as regras de segurança');
    } else if (error?.code === 'failed-precondition') {
      console.log('⚙️ Firestore não foi inicializado no projeto');
    } else if (error?.code === 'unavailable') {
      console.log('🌐 Problema de conectividade - verifique sua internet');
    } else if (error?.code === 'not-found') {
      console.log('📁 Coleção ou documento não encontrado (normal na primeira execução)');
    }
    
    return false;
  }
}

/**
 * Inicializa as coleções do sistema XP se necessário
 */
export async function initializeXPCollections() {
  try {
    console.log('🎮 Inicializando coleções do sistema XP...');

    // Verificar se o usuário está autenticado
    const auth = getAuth();
    if (!auth.currentUser) {
      console.log('⚠️ Usuário não autenticado - algumas coleções não serão criadas');
    }

    // 1. Criar configuração do sistema (público)
    const systemConfig = {
      version: '1.0.0',
      xpMultipliers: {
        easy: 1,
        medium: 1.5,
        hard: 2
      },
      maxLevel: 50,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await setDoc(doc(db, 'system_config', 'xp_system'), systemConfig);
    console.log('✅ Configuração do sistema criada');

    // 2. Se usuário autenticado, criar dados de exemplo
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      
      // Criar nível inicial do usuário
      const userLevel = {
        userId: userId,
        currentLevel: 1,
        currentXP: 0,
        totalXP: 0,
        xpToNextLevel: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      await setDoc(doc(db, 'user_levels', userId), userLevel);
      console.log('✅ Nível inicial do usuário criado');

      // Criar primeira atividade de exemplo
      const firstActivity = {
        userId: userId,
        type: 'daily_login',
        xpGained: 5,
        description: 'Primeiro login no sistema',
        metadata: {
          source: 'system_initialization'
        },
        createdAt: new Date()
      };

      const activityRef = doc(collection(db, 'xp_activities'));
      await setDoc(activityRef, firstActivity);
      console.log('✅ Primeira atividade registrada');
    }

    console.log('🎉 Coleções do sistema XP inicializadas!');
    return true;

  } catch (error: any) {
    console.error('❌ Erro ao inicializar coleções:', error);
    return false;
  }
}

/**
 * Verifica se o Firestore está configurado corretamente
 */
export async function checkFirestoreSetup() {
  console.log('🔍 Verificando configuração do Firestore...\n');

  const checks = [
    {
      name: 'Conexão básica',
      test: testFirestoreConnection
    },
    {
      name: 'Inicialização XP',
      test: initializeXPCollections
    }
  ];

  let allPassed = true;

  for (const check of checks) {
    console.log(`⏳ Executando: ${check.name}...`);
    const result = await check.test();
    
    if (result) {
      console.log(`✅ ${check.name}: PASSOU\n`);
    } else {
      console.log(`❌ ${check.name}: FALHOU\n`);
      allPassed = false;
    }
  }

  if (allPassed) {
    console.log('🎉 Todas as verificações passaram!');
    console.log('🚀 Firestore está pronto para uso!');
  } else {
    console.log('⚠️ Algumas verificações falharam');
    console.log('📖 Consulte a documentação em docs/FIREBASE-SETUP.md');
  }

  return allPassed;
}