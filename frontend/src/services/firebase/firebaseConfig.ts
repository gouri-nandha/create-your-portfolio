import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as fbSignOut, 
  onAuthStateChanged as fbOnAuthStateChanged,
  User,
  Auth
} from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && 
  firebaseConfig.apiKey !== '' && 
  firebaseConfig.projectId &&
  !firebaseConfig.apiKey.includes('YOUR_')
);

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    console.log('[Firebase] Initialized with real cloud credentials.');
  } catch (err) {
    console.warn('[Firebase] Initialization error, falling back to Local Mode:', err);
  }
} else {
  console.log('[Firebase] Credentials not configured in .env. Running in Zero-Setup Local Mode with LocalStorage persistence.');
}

export { app, auth, db, storage };

// Mock User structure for local development
export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

const LOCAL_USER_KEY = 'portfolio_ai_current_user';

export const mockAuthService = {
  getCurrentUser(): AuthUser | null {
    const saved = localStorage.getItem(LOCAL_USER_KEY);
    if (saved) {
      try { return JSON.parse(saved); } catch { return null; }
    }
    return null;
  },
  
  async loginWithGoogle(): Promise<AuthUser> {
    if (isFirebaseConfigured && auth) {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      return {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
      };
    }
    // Local fallback
    const mockUser: AuthUser = {
      uid: 'user_demo_google_101',
      email: 'alex.creator@example.com',
      displayName: 'Alex Creator (Google Demo)',
      photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    };
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(mockUser));
    return mockUser;
  },

  async loginWithEmail(email: string, _password: string): Promise<AuthUser> {
    if (isFirebaseConfigured && auth) {
      const result = await signInWithEmailAndPassword(auth, email, _password);
      return {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName || email.split('@')[0],
        photoURL: result.user.photoURL,
      };
    }
    const name = email.split('@')[0];
    const mockUser: AuthUser = {
      uid: 'user_local_' + Math.random().toString(36).substring(2, 9),
      email,
      displayName: name.charAt(0).toUpperCase() + name.slice(1),
      photoURL: null,
    };
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(mockUser));
    return mockUser;
  },

  async signupWithEmail(email: string, _password: string, name?: string): Promise<AuthUser> {
    if (isFirebaseConfigured && auth) {
      const result = await createUserWithEmailAndPassword(auth, email, _password);
      return {
        uid: result.user.uid,
        email: result.user.email,
        displayName: name || email.split('@')[0],
        photoURL: result.user.photoURL,
      };
    }
    const mockUser: AuthUser = {
      uid: 'user_local_' + Math.random().toString(36).substring(2, 9),
      email,
      displayName: name || email.split('@')[0],
      photoURL: null,
    };
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(mockUser));
    return mockUser;
  },

  async logout(): Promise<void> {
    if (isFirebaseConfigured && auth) {
      await fbSignOut(auth);
    }
    localStorage.removeItem(LOCAL_USER_KEY);
  }
};
