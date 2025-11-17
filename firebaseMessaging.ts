import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInAnonymously,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getFunctions } from "firebase/functions";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MESAUREMENT_ID,
};

// Inicializa app solo si no existe
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Servicios principales
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

// 🔐 Providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// 💾 Persistencia (mantiene sesión activa en localStorage)
setPersistence(auth, browserLocalPersistence);

export {
  auth,
  db,
  functions,
  googleProvider,
  githubProvider,
  signInAnonymously,
};
