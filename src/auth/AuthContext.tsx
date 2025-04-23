import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../services/firebaseConfig'; // Adjust path to your firebase config
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  FacebookAuthProvider,
  signInWithPopup, // For web-based Facebook login
} from 'firebase/auth';

// No signup implemented currently:
// only user is littletest@ucsc.edu (added manually to firebase)
// password: 12356

// Types (simplify or import from your own 'types.ts')
interface User {
  id: string;
  name: string;
  email?: string;
}
interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}
interface LoginCredentials {
  email: string;
  password: string;
}
interface AuthContextType {
  authState: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  facebookLogin: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: false,
    error: null,
  });

  // Keep user in sync with Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setAuthState({
          user: {
            id: firebaseUser.uid,
            name: firebaseUser.displayName ?? 'Firebase User',
            email: firebaseUser.email ?? undefined,
          },
          isLoading: false,
          error: null,
        });
      } else {
        setAuthState((prev) => ({
          ...prev,
          user: null,
          isLoading: false,
        }));
      }
    });
    return () => unsubscribe();
  }, []);

  // Email/Password login
  const login = async ({ email, password }: LoginCredentials) => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const fbUser = userCredential.user;

      setAuthState({
        user: {
          id: fbUser.uid,
          name: fbUser.displayName ?? 'No Name',
          email: fbUser.email ?? undefined,
        },
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: error?.message || 'Error logging in',
      }));
    }
  };

  // Logout
  const logout = async () => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));
      await signOut(auth);
      setAuthState({ user: null, isLoading: false, error: null });
    } catch (error: any) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: error?.message || 'Error logging out',
      }));
    }
  };

  // Facebook login (web popup example)
  const facebookLogin = async () => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const fbUser = result.user;

      setAuthState({
        user: {
          id: fbUser.uid,
          name: fbUser.displayName ?? 'Facebook User',
          email: fbUser.email ?? undefined,
        },
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: error?.message || 'Error with Facebook login',
      }));
    }
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout, facebookLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
