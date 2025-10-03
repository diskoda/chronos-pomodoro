import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from '../config/firebase';
import { AuthXpIntegrationService } from '../services/authXpIntegrationService';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName?: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (displayName: string, photoURL?: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Integrar com sistema XP após login bem-sucedido
    try {
      await AuthXpIntegrationService.processUserAuth(userCredential.user);
    } catch (error) {
      console.error('⚠️ Erro na integração XP após login:', error);
      // Não fazer throw para não interromper o login
    }
  };

  const register = async (email: string, password: string, displayName?: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    if (displayName && userCredential.user) {
      await updateProfile(userCredential.user, { displayName });
    }
    
    // Integrar com sistema XP após registro bem-sucedido
    try {
      await AuthXpIntegrationService.processUserAuth(userCredential.user);
    } catch (error) {
      console.error('⚠️ Erro na integração XP após registro:', error);
      // Não fazer throw para não interromper o registro
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    
    // Integrar com sistema XP após login Google bem-sucedido
    try {
      await AuthXpIntegrationService.processUserAuth(userCredential.user);
    } catch (error) {
      console.error('⚠️ Erro na integração XP após login Google:', error);
      // Não fazer throw para não interromper o login
    }
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const updateUserProfile = async (displayName: string, photoURL?: string) => {
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, { displayName, photoURL });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      // Se usuário está logado, processar integração XP
      if (user) {
        try {
          await AuthXpIntegrationService.processUserAuth(user);
        } catch (error) {
          console.error('⚠️ Erro na integração XP durante mudança de estado:', error);
        }
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    currentUser,
    loading,
    login,
    register,
    logout,
    loginWithGoogle,
    resetPassword,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};