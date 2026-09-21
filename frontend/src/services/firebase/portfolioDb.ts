import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  deleteDoc, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebaseConfig';
import { Portfolio } from '../../types/portfolio';
import { INITIAL_SAMPLE_PORTFOLIOS } from '../../data/samplePortfolios';

const getLocalStorageKey = (userId: string) => `portfolio_ai_portfolios_${userId}`;

export const portfolioDb = {
  async getPortfolios(userId: string): Promise<Portfolio[]> {
    if (isFirebaseConfigured && db) {
      try {
        const colRef = collection(db, 'users', userId, 'portfolios');
        const q = query(colRef, orderBy('updatedAt', 'desc'));
        const snap = await getDocs(q);
        return snap.docs.map(doc => doc.data() as Portfolio);
      } catch (err) {
        console.warn('Firestore fetch failed, checking local backup:', err);
      }
    }

    // LocalStorage fallback
    const raw = localStorage.getItem(getLocalStorageKey(userId));
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        // fallback to initial sample
      }
    }

    // Initialize with sample portfolios for first-time user exploration
    localStorage.setItem(getLocalStorageKey(userId), JSON.stringify(INITIAL_SAMPLE_PORTFOLIOS));
    return INITIAL_SAMPLE_PORTFOLIOS;
  },

  async getPortfolio(userId: string, portfolioId: string): Promise<Portfolio | null> {
    if (isFirebaseConfigured && db) {
      try {
        const docRef = doc(db, 'users', userId, 'portfolios', portfolioId);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          return snap.data() as Portfolio;
        }
      } catch (err) {
        console.warn('Firestore get failed, checking local storage:', err);
      }
    }

    const list = await this.getPortfolios(userId);
    return list.find(p => p.id === portfolioId) || null;
  },

  async savePortfolio(userId: string, portfolio: Portfolio): Promise<void> {
    const updated = {
      ...portfolio,
      updatedAt: new Date().toISOString()
    };

    if (isFirebaseConfigured && db) {
      try {
        const docRef = doc(db, 'users', userId, 'portfolios', portfolio.id);
        await setDoc(docRef, updated);
      } catch (err) {
        console.warn('Firestore save failed, persisting locally:', err);
      }
    }

    // Always update local storage
    const list = await this.getPortfolios(userId);
    const index = list.findIndex(p => p.id === portfolio.id);
    let newList: Portfolio[];
    if (index >= 0) {
      newList = [...list];
      newList[index] = updated;
    } else {
      newList = [updated, ...list];
    }
    localStorage.setItem(getLocalStorageKey(userId), JSON.stringify(newList));
  },

  async deletePortfolio(userId: string, portfolioId: string): Promise<void> {
    if (isFirebaseConfigured && db) {
      try {
        const docRef = doc(db, 'users', userId, 'portfolios', portfolioId);
        await deleteDoc(docRef);
      } catch (err) {
        console.warn('Firestore delete failed:', err);
      }
    }

    const list = await this.getPortfolios(userId);
    const filtered = list.filter(p => p.id !== portfolioId);
    localStorage.setItem(getLocalStorageKey(userId), JSON.stringify(filtered));
  }
};
