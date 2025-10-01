// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBHJO-758wzc4IL3rpcAd_zcGBsP3ZAur0",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "penapedplataforma.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "penapedplataforma",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "penapedplataforma.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "550474080281",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:550474080281:web:c2453a7df5fdd6c03c4a88"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;