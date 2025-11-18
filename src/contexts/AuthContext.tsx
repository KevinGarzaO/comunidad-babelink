"use client";

import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  doc,
  serverTimestamp,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { UserProfile } from "../data/userData";
import { auth, db } from "../../firebaseMessaging";

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeUserDoc: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      // Usuario NO logueado
      if (!firebaseUser) {
        setUser(null);
        if (unsubscribeUserDoc) unsubscribeUserDoc();
        unsubscribeUserDoc = null;
        setLoading(false);
        return;
      }

      const userRef = doc(db, "usuarios", firebaseUser.uid);

      // 🔥 Actualizar lastAccess UNA sola vez por login
      await updateDoc(userRef, {
        lastAccess: serverTimestamp(),
      });

      // 🔥 Escuchar cambios del usuario sin escribir nada
      unsubscribeUserDoc = onSnapshot(userRef, (snap) => {
        if (snap.exists()) {
          setUser(snap.data() as UserProfile);
        } else {
          setUser(null);
        }
        setLoading(false);
      });
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeUserDoc) unsubscribeUserDoc();
    };
  }, []);

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
