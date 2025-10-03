/**
 * Serviço de Integração entre Firebase Auth e Sistema XP
 * 
 * Este serviço conecta o Firebase Authentication ao sistema XP,
 * garantindo que todos os usuários tenham seus dados XP inicializados.
 */

import { db } from '../config/firebase';
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import type { User } from 'firebase/auth';
import { UserInitializationService } from './userInitializationService';

interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  createdAt: Timestamp;
  lastLoginAt: Timestamp;
  isXpInitialized: boolean;
  authProvider: 'email' | 'google' | 'unknown';
}

export class AuthXpIntegrationService {
  
  /**
   * Processamento completo quando usuário faz login/registro
   */
  static async processUserAuth(user: User): Promise<void> {
    try {
      console.log(`🔐 Processando autenticação para usuário: ${user.uid}`);
      
      // 1. Criar/atualizar perfil do usuário
      await this.createOrUpdateUserProfile(user);
      
      // 2. Verificar se XP já foi inicializado
      const isXpInitialized = await this.isUserXpInitialized(user.uid);
      
      if (!isXpInitialized) {
        console.log(`⚡ Inicializando sistema XP para usuário: ${user.uid}`);
        
        // 3. Inicializar sistema XP
        await UserInitializationService.initializeUser(user.uid);
        
        // 4. Marcar como inicializado
        await this.markXpAsInitialized(user.uid);
        
        console.log(`✅ Sistema XP inicializado para usuário: ${user.uid}`);
      } else {
        console.log(`ℹ️  Usuário ${user.uid} já possui sistema XP inicializado`);
      }
      
      // 5. Atualizar último login
      await this.updateLastLogin(user.uid);
      
    } catch (error) {
      console.error(`❌ Erro ao processar autenticação do usuário ${user.uid}:`, error);
      throw error;
    }
  }
  
  /**
   * Criar ou atualizar perfil do usuário no Firestore
   */
  static async createOrUpdateUserProfile(user: User): Promise<void> {
    try {
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
      
      const authProvider = this.detectAuthProvider(user);
      const now = Timestamp.now();
      
      if (!userDoc.exists()) {
        // Criar novo perfil
        const newUserProfile: UserProfile = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          createdAt: now,
          lastLoginAt: now,
          isXpInitialized: false,
          authProvider
        };
        
        await setDoc(userRef, newUserProfile);
        console.log(`👤 Novo perfil criado para usuário: ${user.uid}`);
        
      } else {
        // Atualizar perfil existente
        const updates = {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          lastLoginAt: now,
          authProvider
        };
        
        await setDoc(userRef, updates, { merge: true });
        console.log(`🔄 Perfil atualizado para usuário: ${user.uid}`);
      }
      
    } catch (error) {
      console.error(`❌ Erro ao criar/atualizar perfil do usuário ${user.uid}:`, error);
      throw error;
    }
  }
  
  /**
   * Verificar se usuário já tem sistema XP inicializado
   */
  static async isUserXpInitialized(userId: string): Promise<boolean> {
    try {
      // Verificar marcador no perfil
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data() as UserProfile;
        if (userData.isXpInitialized) {
          return true;
        }
      }
      
      // Verificar se existe documento de nível geral
      const levelRef = doc(db, 'user_overall_levels', userId);
      const levelDoc = await getDoc(levelRef);
      
      if (levelDoc.exists()) {
        // Atualizar marcador se encontrou dados XP
        await this.markXpAsInitialized(userId);
        return true;
      }
      
      return false;
      
    } catch (error) {
      console.error(`❌ Erro ao verificar inicialização XP do usuário ${userId}:`, error);
      return false;
    }
  }
  
  /**
   * Marcar usuário como tendo XP inicializado
   */
  static async markXpAsInitialized(userId: string): Promise<void> {
    try {
      const userRef = doc(db, 'users', userId);
      await setDoc(userRef, { 
        isXpInitialized: true,
        xpInitializedAt: Timestamp.now()
      }, { merge: true });
      
    } catch (error) {
      console.error(`❌ Erro ao marcar XP como inicializado para usuário ${userId}:`, error);
      throw error;
    }
  }
  
  /**
   * Atualizar último login do usuário
   */
  static async updateLastLogin(userId: string): Promise<void> {
    try {
      const userRef = doc(db, 'users', userId);
      await setDoc(userRef, { 
        lastLoginAt: Timestamp.now()
      }, { merge: true });
      
    } catch (error) {
      console.error(`❌ Erro ao atualizar último login do usuário ${userId}:`, error);
      // Não fazer throw aqui para não interromper o login
    }
  }
  
  /**
   * Detectar provedor de autenticação
   */
  static detectAuthProvider(user: User): 'email' | 'google' | 'unknown' {
    if (!user.providerData || user.providerData.length === 0) {
      return 'unknown';
    }
    
    const providerId = user.providerData[0].providerId;
    
    switch (providerId) {
      case 'password':
        return 'email';
      case 'google.com':
        return 'google';
      default:
        return 'unknown';
    }
  }
  
  /**
   * Migrar usuários existentes do Firebase Auth para o sistema XP
   */
  static async migrateExistingAuthUsers(): Promise<{
    found: number;
    migrated: number;
    errors: string[];
  }> {
    console.log('🔄 Iniciando migração de usuários existentes do Firebase Auth...');
    
    const result = {
      found: 0,
      migrated: 0,
      errors: [] as string[]
    };
    
    try {
      // Esta função precisa ser executada com privilégios admin
      // Por enquanto, vamos tentar buscar usuários das coleções existentes
      
      const userIds = await UserInitializationService.getAllUsers();
      result.found = userIds.length;
      
      console.log(`📋 Encontrados ${userIds.length} usuários para migrar`);
      
      for (const userId of userIds) {
        try {
          const isInitialized = await this.isUserXpInitialized(userId);
          
          if (!isInitialized) {
            await UserInitializationService.initializeUser(userId);
            await this.markXpAsInitialized(userId);
            result.migrated++;
            console.log(`✅ Usuário ${userId} migrado com sucesso`);
          } else {
            console.log(`ℹ️  Usuário ${userId} já estava inicializado`);
          }
          
        } catch (error) {
          const errorMsg = `Erro ao migrar usuário ${userId}: ${error}`;
          result.errors.push(errorMsg);
          console.error(`❌ ${errorMsg}`);
        }
      }
      
      console.log(`🎉 Migração concluída: ${result.migrated}/${result.found} usuários migrados`);
      
      return result;
      
    } catch (error) {
      console.error('❌ Erro durante migração:', error);
      result.errors.push(`Erro geral: ${error}`);
      return result;
    }
  }
  
  /**
   * Obter estatísticas dos usuários
   */
  static async getUserStats(): Promise<{
    totalUsers: number;
    usersWithXp: number;
    usersWithoutXp: number;
    recentLogins: number;
  }> {
    try {
      const userIds = await UserInitializationService.getAllUsers();
      let usersWithXp = 0;
      let recentLogins = 0;
      
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      
      for (const userId of userIds) {
        // Verificar XP
        const hasXp = await this.isUserXpInitialized(userId);
        if (hasXp) usersWithXp++;
        
        // Verificar login recente
        const userRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userRef);
        
        if (userDoc.exists()) {
          const userData = userDoc.data() as UserProfile;
          if (userData.lastLoginAt && userData.lastLoginAt.toDate() > oneWeekAgo) {
            recentLogins++;
          }
        }
      }
      
      return {
        totalUsers: userIds.length,
        usersWithXp,
        usersWithoutXp: userIds.length - usersWithXp,
        recentLogins
      };
      
    } catch (error) {
      console.error('❌ Erro ao obter estatísticas:', error);
      return {
        totalUsers: 0,
        usersWithXp: 0,
        usersWithoutXp: 0,
        recentLogins: 0
      };
    }
  }
}