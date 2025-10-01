// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Configuração para desenvolvimento
export const FIREBASE_CONFIG = {
  // Habilita/desabilita uso do Firebase (para desenvolvimento)
  USE_FIREBASE: true,
  
  // Habilita logs detalhados
  ENABLE_LOGGING: true,
  
  // Timeout para operações (ms)
  OPERATION_TIMEOUT: 10000,
  
  // Fallback para dados locais se Firebase falhar
  USE_LOCAL_FALLBACK: true
};

export default app;