"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  type User,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { firebaseAuth } from "@/lib/firebaseConfig";

const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(firebaseAuth, provider);
    if (!result || !result.user) {
      throw new Error("Google login failed");
    }
    return result.user.uid;
  } catch (error) {
    console.error("Error while logging in with Google", error);
  }
};

const logoutWithGoogle = async () => {
  try {
    await firebaseAuth.signOut();
  } catch (error) {
    console.error("Error while logging out with Google", error);
  }
};

type AuthProviderProps = {
  children: ReactNode;
};

export type AuthContextValue = {
  user: User | null;
  login: () => Promise<any>;
  logout: () => Promise<any>;
};

const AuthContext = createContext<AuthContextValue>({} as AuthContextValue);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const contextValue = {
    user,
    login: loginWithGoogle,
    logout: logoutWithGoogle,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
