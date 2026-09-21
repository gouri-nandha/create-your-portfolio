import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  auth, 
  isFirebaseConfigured, 
  mockAuthService, 
  AuthUser 
} from '../services/firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

interface AuthContextType {
  currentUser: AuthUser | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  signupWithEmail: (email: string, pass: string, name?: string) => Promise<void>;
  loginAsDemoUser: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setCurrentUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || user.email?.split('@')[0] || 'User',
            photoURL: user.photoURL,
          });
        } else {
          setCurrentUser(null);
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      // Local development check
      const localUser = mockAuthService.getCurrentUser();
      setCurrentUser(localUser);
      setLoading(false);
    }
  }, []);

  const loginWithGoogle = async () => {
    const user = await mockAuthService.loginWithGoogle();
    setCurrentUser(user);
  };

  const loginWithEmail = async (email: string, pass: string) => {
    const user = await mockAuthService.loginWithEmail(email, pass);
    setCurrentUser(user);
  };

  const signupWithEmail = async (email: string, pass: string, name?: string) => {
    const user = await mockAuthService.signupWithEmail(email, pass, name);
    setCurrentUser(user);
  };

  const loginAsDemoUser = async () => {
    const demo: AuthUser = {
      uid: 'user_demo_local_42',
      email: 'demo.developer@portfolioai.dev',
      displayName: 'Demo Developer',
      photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    };
    localStorage.setItem('portfolio_ai_current_user', JSON.stringify(demo));
    setCurrentUser(demo);
  };

  const logout = async () => {
    await mockAuthService.logout();
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        loginWithGoogle,
        loginWithEmail,
        signupWithEmail,
        loginAsDemoUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
