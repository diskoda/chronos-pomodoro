import { 
  collection, 
  getDocs, 
  writeBatch,
  doc,
  Timestamp,
  query,
  where 
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { StudyMethodology } from '../types/xpMethodologies';

/**
 * Serviço para inicializar usuários existentes no sistema XP por metodologias
 * 
 * Este serviço é usado para migração inicial - configurar todos os usuários
 * existentes com nível 1 em todas as metodologias
 */
export class UserInitializationService {
  
  /**
   * Inicializar um usuário específico com nível 1 em todas as metodologias
   */
  static async initializeUser(userId: string): Promise<void> {
    const batch = writeBatch(db);
    const now = Timestamp.now();
    
    const methodologies: StudyMethodology[] = ['clinical_cases', 'questions', 'flashcards'];
    
    try {
      console.log(`🚀 Inicializando usuário: ${userId}`);
      
      // 1. Criar níveis por metodologia
      for (const methodology of methodologies) {
        const methodologyLevelRef = doc(db, 'methodology_levels', `${userId}_${methodology}`);
        
        batch.set(methodologyLevelRef, {
          userId: userId,
          methodology: methodology,
          currentLevel: 1,
          currentXP: 0,
          totalXP: 0,
          xpToNextLevel: 100, // XP necessário para nível 2
          lastLevelUp: null,
          updatedAt: now
        });
      }
      
      // 2. Criar nível geral do usuário
      const overallLevelRef = doc(db, 'user_overall_levels', userId);
      batch.set(overallLevelRef, {
        userId: userId,
        overallLevel: 1,
        totalXP: 0,
        methodologyLevels: {
          clinical_cases: 1,
          questions: 1,
          flashcards: 1
        },
        updatedAt: now
      });
      
      // 3. Criar estatísticas iniciais
      const statsRef = doc(db, 'methodology_stats', userId);
      batch.set(statsRef, {
        userId: userId,
        overallStats: {
          totalLevel: 3, // Soma dos níveis das 3 metodologias (1+1+1)
          totalXP: 0,
          totalActivities: 0,
          totalTimeSpent: 0,
          favoriteMethodology: 'questions' // Padrão inicial
        },
        methodologyStats: {
          clinical_cases: {
            currentLevel: 1,
            totalXP: 0,
            currentStreak: 0,
            bestStreak: 0,
            totalActivities: 0,
            averagePerformance: 0,
            totalTimeSpent: 0,
            specific: {
              casesCompleted: 0,
              perfectCases: 0,
              averageAccuracy: 0,
              averageTimePerCase: 0,
              difficultyCasesCompleted: {
                easy: 0,
                medium: 0,
                hard: 0
              }
            }
          },
          questions: {
            currentLevel: 1,
            totalXP: 0,
            currentStreak: 0,
            bestStreak: 0,
            totalActivities: 0,
            averagePerformance: 0,
            totalTimeSpent: 0,
            specific: {
              questionsCorrect: 0,
              questionsIncorrect: 0,
              quizzesCompleted: 0,
              perfectQuizzes: 0,
              averageAccuracy: 0,
              subjectPerformance: {}
            }
          },
          flashcards: {
            currentLevel: 1,
            totalXP: 0,
            currentStreak: 0,
            bestStreak: 0,
            totalActivities: 0,
            averagePerformance: 0,
            totalTimeSpent: 0,
            specific: {
              cardsReviewed: 0,
              cardsMastered: 0,
              decksCompleted: 0,
              reviewStreak: 0,
              averageReviewQuality: 0,
              spacedRepetitionEfficiency: 0
            }
          }
        },
        updatedAt: now
      });
      
      // 4. Registrar atividade de inicialização
      const activityRef = doc(collection(db, 'methodology_xp_activities'));
      batch.set(activityRef, {
        userId: userId,
        methodology: 'questions', // Metodologia padrão para atividade de inicialização
        activityType: 'system_initialization',
        xpGained: 0,
        description: 'Usuário inicializado no sistema XP por metodologias',
        metadata: {
          initialSetup: true,
          version: '1.0'
        },
        createdAt: now
      });
      
      // Executar todas as operações
      await batch.commit();
      
      console.log(`✅ Usuário ${userId} inicializado com sucesso`);
      
    } catch (error) {
      console.error(`❌ Erro ao inicializar usuário ${userId}:`, error);
      throw error;
    }
  }
  
  /**
   * Verificar se um usuário já foi inicializado
   */
  static async isUserInitialized(userId: string): Promise<boolean> {
    try {
      const userLevelDoc = await getDocs(query(collection(db, 'user_overall_levels'), where('userId', '==', userId)));
      
      return !userLevelDoc.empty;
    } catch (error) {
      console.error('Erro ao verificar inicialização do usuário:', error);
      return false;
    }
  }
  
  /**
   * Obter lista de todos os usuários no sistema
   */
  static async getAllUsers(): Promise<string[]> {
    try {
      console.log('🔍 Buscando todos os usuários...');
      
      // Buscar usuários de diferentes coleções
      const userIds = new Set<string>();
      const collectionsToCheck = [
        'users',
        'user_answers', 
        'user_question_attempts',
        'user_levels',
        'xp_activities',
        'study_sessions',
        'user_achievements',
        'user_profiles'
      ];
      
      for (const collectionName of collectionsToCheck) {
        try {
          console.log(`🔍 Verificando coleção: ${collectionName}`);
          const snapshot = await getDocs(collection(db, collectionName));
          
          console.log(`📊 Coleção ${collectionName}: ${snapshot.size} documentos`);
          
          snapshot.forEach(doc => {
            const data = doc.data();
            
            // Diferentes estratégias para encontrar userId
            if (collectionName === 'users') {
              // Em 'users', o ID do documento é o userId
              userIds.add(doc.id);
              console.log(`👤 Usuário encontrado (doc.id): ${doc.id}`);
            } else if (data.userId) {
              // Em outras coleções, buscar campo userId
              userIds.add(data.userId);
              console.log(`👤 Usuário encontrado (userId): ${data.userId}`);
            } else if (data.uid) {
              // Alguns sistemas usam 'uid' ao invés de 'userId'
              userIds.add(data.uid);
              console.log(`👤 Usuário encontrado (uid): ${data.uid}`);
            } else if (data.user && data.user.uid) {
              // Estrutura aninhada
              userIds.add(data.user.uid);
              console.log(`👤 Usuário encontrado (user.uid): ${data.user.uid}`);
            }
            
            // Debug: mostrar estrutura do documento
            if (snapshot.size > 0 && doc === snapshot.docs[0]) {
              console.log(`🔍 Estrutura exemplo da coleção ${collectionName}:`, {
                docId: doc.id,
                keys: Object.keys(data),
                sample: data
              });
            }
          });
          
        } catch (error) {
          console.log(`⚠️ Erro ao acessar coleção ${collectionName}:`, error);
        }
      }
      
      const userList = Array.from(userIds);
      console.log(`📊 Total encontrado: ${userList.length} usuários únicos`);
      console.log(`👥 Lista de usuários:`, userList);
      
      // Se não encontrou usuários, tentar métodos alternativos
      if (userList.length === 0) {
        console.log('⚠️ Nenhum usuário encontrado no método principal. Tentando métodos alternativos...');
        
        // Método 1: Buscar usuários em coleções específicas do projeto
        const authUsers = await this.getUsersFromAuth();
        if (authUsers.length > 0) {
          console.log(`✅ Método alternativo encontrou ${authUsers.length} usuários`);
          return authUsers;
        }
        
        // Método 2: Usar usuários conhecidos manualmente
        const knownUsers = this.getKnownUserIds();
        if (knownUsers.length > 0) {
          console.log(`✅ Usando ${knownUsers.length} usuários conhecidos`);
          return knownUsers;
        }
        
        // Método 3: Sugerir próximos passos
        console.log('❌ Nenhum usuário encontrado em nenhum método!');
        console.log('💡 Sugestões:');
        console.log('   1. Execute o debug para ver a estrutura das coleções');
        console.log('   2. Verifique se os usuários estão em coleções diferentes');
        console.log('   3. Adicione manualmente os IDs de usuários conhecidos');
        console.log('   4. Verifique se o Firebase Auth está configurado corretamente');
      }
      
      return userList;
      
    } catch (error) {
      console.error('❌ Erro ao buscar usuários:', error);
      throw error;
    }
  }
  
  /**
   * Debug: Investigar estrutura das coleções Firebase
   */
  static async debugFirebaseCollections(): Promise<void> {
    try {
      console.log('🔍 === DEBUG: Investigando estrutura do Firebase ===');
      
      // Lista de coleções possíveis para verificar
      const possibleCollections = [
        'users',
        'user_answers', 
        'user_question_attempts',
        'user_levels',
        'xp_activities',
        'study_sessions',
        'user_achievements',
        'user_profiles',
        'accounts',
        'profiles',
        'auth_users'
      ];
      
      for (const collectionName of possibleCollections) {
        try {
          console.log(`\n📁 Verificando coleção: ${collectionName}`);
          const snapshot = await getDocs(collection(db, collectionName));
          
          if (snapshot.empty) {
            console.log(`   ❌ Coleção ${collectionName} está vazia ou não existe`);
            continue;
          }
          
          console.log(`   ✅ Coleção ${collectionName}: ${snapshot.size} documentos`);
          
          // Analisar os primeiros 3 documentos
          const firstDocs = snapshot.docs.slice(0, 3);
          firstDocs.forEach((doc, index) => {
            const data = doc.data();
            console.log(`   📄 Documento ${index + 1}:`);
            console.log(`      ID: ${doc.id}`);
            console.log(`      Campos: ${Object.keys(data).join(', ')}`);
            console.log(`      Exemplo:`, data);
          });
          
        } catch (error) {
          console.log(`   ⚠️ Erro ao acessar ${collectionName}:`, error);
        }
      }
      
      console.log('\n🔍 === FIM DO DEBUG ===');
      
    } catch (error) {
      console.error('❌ Erro no debug:', error);
    }
  }
  
  /**
   * Método alternativo: buscar usuários do Firebase Auth (se disponível)
   */
  static async getUsersFromAuth(): Promise<string[]> {
    try {
      console.log('🔍 Tentando buscar usuários do Firebase Auth...');
      
      // Este método requer Firebase Admin SDK, que não está disponível no frontend
      // Mas podemos tentar outras abordagens
      
      const userIds = new Set<string>();
      
      // Verificar se há alguma coleção específica do seu projeto
      const projectSpecificCollections = [
        'user_profiles',
        'profiles', 
        'accounts',
        'userProfiles',
        'chronos_users'
      ];
      
      for (const collectionName of projectSpecificCollections) {
        try {
          const snapshot = await getDocs(collection(db, collectionName));
          console.log(`📊 Verificando ${collectionName}: ${snapshot.size} docs`);
          
          snapshot.forEach(doc => {
            const data = doc.data();
            
            // Adicionar o ID do documento
            userIds.add(doc.id);
            
            // Verificar campos comuns de usuário
            if (data.userId) userIds.add(data.userId);
            if (data.uid) userIds.add(data.uid);
            if (data.id) userIds.add(data.id);
            if (data.user_id) userIds.add(data.user_id);
            if (data.email) {
              // Se tem email, provavelmente é um usuário
              userIds.add(doc.id);
            }
          });
          
        } catch (error) {
          console.log(`⚠️ Coleção ${collectionName} não encontrada`);
        }
      }
      
      const userList = Array.from(userIds);
      console.log(`📊 Método alternativo encontrou: ${userList.length} usuários`);
      
      return userList;
      
    } catch (error) {
      console.error('❌ Erro no método alternativo:', error);
      return [];
    }
  }
  
  /**
   * Método manual: inserir IDs de usuários conhecidos
   * 
   * SOLUÇÃO TEMPORÁRIA: Se você souber os UIDs dos usuários do Firebase Auth,
   * adicione-os aqui para inicialização manual
   */
  static getKnownUserIds(): string[] {
    // TODO: Substitua pelos UIDs reais dos usuários do Firebase Auth
    // Para encontrar os UIDs:
    // 1. Acesse: https://console.firebase.google.com/
    // 2. Vá em Authentication > Users
    // 3. Copie os UIDs dos usuários cadastrados
    
    const knownUsers: string[] = [
      // 'UID_DO_USUARIO_1_AQUI',
      // 'UID_DO_USUARIO_2_AQUI'
    ];
    
    if (knownUsers.length > 0 && knownUsers[0] !== 'UID_DO_USUARIO_1_AQUI') {
      console.log(`✅ Usando ${knownUsers.length} usuários conhecidos manualmente`);
      return knownUsers;
    }
    
    console.log('⚠️ Método manual: nenhum usuário configurado');
    console.log('💡 Para resolver:');
    console.log('   1. Acesse: https://console.firebase.google.com/');
    console.log('   2. Vá em Authentication > Users');
    console.log('   3. Copie os UIDs dos usuários');
    console.log('   4. Adicione-os no método getKnownUserIds()');
    
    return [];
  }
  
  /**
   * Criar usuários de teste para desenvolvimento
   */
  static async createTestUsers(): Promise<string[]> {
    try {
      console.log('🧪 Criando usuários de teste...');
      
      const testUsers = [
        {
          id: 'test_user_1',
          email: 'usuario1@teste.com',
          name: 'Usuário Teste 1'
        },
        {
          id: 'test_user_2', 
          email: 'usuario2@teste.com',
          name: 'Usuário Teste 2'
        }
      ];
      
      const batch = writeBatch(db);
      const createdUserIds: string[] = [];
      
      for (const user of testUsers) {
        const userRef = doc(db, 'users', user.id);
        batch.set(userRef, {
          email: user.email,
          name: user.name,
          createdAt: Timestamp.now(),
          isTestUser: true
        });
        createdUserIds.push(user.id);
      }
      
      await batch.commit();
      
      console.log(`✅ Criados ${createdUserIds.length} usuários de teste`);
      return createdUserIds;
      
    } catch (error) {
      console.error('❌ Erro ao criar usuários de teste:', error);
      throw error;
    }
  }
  
  /**
   * Inicializar todos os usuários existentes no sistema
   */
  static async initializeAllUsers(): Promise<{
    total: number;
    initialized: number;
    skipped: number;
    errors: string[];
  }> {
    const result = {
      total: 0,
      initialized: 0,
      skipped: 0,
      errors: [] as string[]
    };
    
    try {
      console.log('🚀 Iniciando inicialização em massa de usuários...');
      
      const userIds = await this.getAllUsers();
      result.total = userIds.length;
      
      console.log(`📋 Processando ${userIds.length} usuários...`);
      
      // Processar em lotes para evitar sobrecarga
      const batchSize = 10;
      for (let i = 0; i < userIds.length; i += batchSize) {
        const batch = userIds.slice(i, i + batchSize);
        
        console.log(`📦 Processando lote ${Math.floor(i/batchSize) + 1}/${Math.ceil(userIds.length/batchSize)}`);
        
        const batchPromises = batch.map(async (userId) => {
          try {
            // Verificar se já foi inicializado
            const isInitialized = await this.isUserInitialized(userId);
            
            if (isInitialized) {
              console.log(`⏭️  Usuário ${userId} já inicializado, pulando...`);
              result.skipped++;
              return;
            }
            
            // Inicializar usuário
            await this.initializeUser(userId);
            result.initialized++;
            
          } catch (error) {
            const errorMsg = `Erro ao inicializar usuário ${userId}: ${error}`;
            console.error(`❌ ${errorMsg}`);
            result.errors.push(errorMsg);
          }
        });
        
        // Aguardar lote atual
        await Promise.all(batchPromises);
        
        // Pequena pausa entre lotes
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      console.log('🎉 Inicialização em massa concluída!');
      console.log(`📊 Resultado: ${result.initialized} inicializados, ${result.skipped} pulados, ${result.errors.length} erros`);
      
      return result;
      
    } catch (error) {
      console.error('❌ Erro na inicialização em massa:', error);
      throw error;
    }
  }
  
  /**
   * Obter estatísticas de inicialização
   */
  static async getInitializationStats(): Promise<{
    totalUsers: number;
    initializedUsers: number;
    pendingUsers: number;
    initializationProgress: number;
  }> {
    try {
      const totalUsers = (await this.getAllUsers()).length;
      
      const initializedSnapshot = await getDocs(collection(db, 'user_overall_levels'));
      const initializedUsers = initializedSnapshot.size;
      
      const pendingUsers = totalUsers - initializedUsers;
      const initializationProgress = totalUsers > 0 ? (initializedUsers / totalUsers) * 100 : 0;
      
      return {
        totalUsers,
        initializedUsers,
        pendingUsers,
        initializationProgress
      };
      
    } catch (error) {
      console.error('Erro ao obter estatísticas de inicialização:', error);
      throw error;
    }
  }
  
  /**
   * Limpar dados de inicialização (para testes)
   * ⚠️ USE COM CUIDADO - Remove todos os dados XP!
   */
  static async clearAllXPData(): Promise<void> {
    // Verificação básica de ambiente
    const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    if (!isDevelopment) {
      throw new Error('Operação não permitida em produção!');
    }
    
    console.log('🧹 Limpando todos os dados XP...');
    
    const collections = [
      'methodology_levels',
      'user_overall_levels', 
      'methodology_stats',
      'methodology_xp_activities'
    ];
    
    for (const collectionName of collections) {
      const snapshot = await getDocs(collection(db, collectionName));
      const batch = writeBatch(db);
      
      snapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });
      
      if (snapshot.docs.length > 0) {
        await batch.commit();
        console.log(`✅ Limpou ${snapshot.docs.length} documentos de ${collectionName}`);
      }
    }
    
    console.log('🎉 Limpeza concluída!');
  }
  
  /**
   * Buscar usuários reais do Firebase Auth através de coleções existentes
   */
  static async getFirebaseAuthUsers(): Promise<string[]> {
    try {
      console.log('🔍 Buscando usuários do Firebase Auth...');
      
      const userIds = new Set<string>();
      
      // Buscar em coleções que provavelmente contêm UIDs do Firebase Auth
      const authCollections = [
        'users',
        'user_profiles', 
        'profiles',
        'accounts'
      ];
      
      for (const collectionName of authCollections) {
        try {
          const snapshot = await getDocs(collection(db, collectionName));
          
          if (!snapshot.empty) {
            console.log(`📋 Encontrados ${snapshot.size} documentos na coleção ${collectionName}`);
            
            snapshot.forEach(doc => {
              const data = doc.data();
              
              // Se o ID do documento parece ser um UID do Firebase Auth (28 caracteres)
              if (doc.id && doc.id.length >= 20) {
                userIds.add(doc.id);
              }
              
              // Verificar campos comuns de UID
              if (data.uid && typeof data.uid === 'string' && data.uid.length >= 20) {
                userIds.add(data.uid);
              }
              
              if (data.userId && typeof data.userId === 'string' && data.userId.length >= 20) {
                userIds.add(data.userId);
              }
            });
          }
          
        } catch (error) {
          console.log(`⚠️ Erro ao acessar ${collectionName}:`, error);
        }
      }
      
      const userIdArray = Array.from(userIds);
      console.log(`✅ Encontrados ${userIdArray.length} usuários únicos do Firebase Auth`);
      
      return userIdArray;
      
    } catch (error) {
      console.error('❌ Erro ao buscar usuários do Firebase Auth:', error);
      return [];
    }
  }
}

export default UserInitializationService;