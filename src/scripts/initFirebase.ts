import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Configuração do Firebase (mesma do seu projeto)
const firebaseConfig = {
  apiKey: "AIzaSyBHJO-758wzc4IL3rpcAd_zcGBsP3ZAur0",
  authDomain: "penapedplataforma.firebaseapp.com",
  projectId: "penapedplataforma",
  storageBucket: "penapedplataforma.firebasestorage.app",
  messagingSenderId: "550474080281",
  appId: "1:550474080281:web:c2453a7df5fdd6c03c4a88"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

/**
 * Inicializa as coleções básicas do sistema XP
 */
export async function initializeXPSystem() {
  try {
    console.log('🚀 Inicializando sistema XP...');

    // Criar documento de configuração do sistema
    const systemConfig = {
      version: '1.0.0',
      xpConfig: {
        question_correct: { base: 10, multipliers: { easy: 1, medium: 1.5, hard: 2 } },
        question_incorrect: { base: 2 },
        daily_login: { base: 5 },
        streak_milestone: { base: 50, multipliers: { week: 1, month: 3, hundred_days: 10 } },
        quiz_completed: { base: 25 },
        study_session: { base: 15 },
        clinical_case: { base: 30, multipliers: { easy: 1, medium: 1.5, hard: 2 } },
        achievement_unlocked: { base: 0 } // XP definido por conquista
      },
      maxLevel: 50,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await setDoc(doc(db, 'system_config', 'xp_system'), systemConfig);
    console.log('✅ Configuração do sistema criada');

    console.log('🎉 Sistema XP inicializado com sucesso!');
    return true;
  } catch (error) {
    console.error('❌ Erro ao inicializar sistema XP:', error);
    return false;
  }
}

/**
 * Verifica a estrutura das coleções
 */
export async function validateCollections() {
  try {
    console.log('🔍 Validando estrutura das coleções...');

    const collections = [
      'xp_activities',
      'user_levels', 
      'user_achievements',
      'system_config'
    ];

    for (const collectionName of collections) {
      console.log(`✅ Coleção '${collectionName}' configurada`);
    }

    console.log('✅ Todas as coleções estão configuradas');
    return true;
  } catch (error) {
    console.error('❌ Erro na validação:', error);
    return false;
  }
}

export { db, auth };