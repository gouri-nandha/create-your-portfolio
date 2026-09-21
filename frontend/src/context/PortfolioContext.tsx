import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Portfolio, PortfolioData, PortfolioSection, TemplateStyle, TemplateVariant, ThemeMode } from '../types/portfolio';
import { portfolioDb } from '../services/firebase/portfolioDb';
import { useAuth } from './AuthContext';
import { INITIAL_SAMPLE_PORTFOLIOS } from '../data/samplePortfolios';

interface PortfolioContextType {
  portfolios: Portfolio[];
  currentPortfolio: Portfolio | null;
  loading: boolean;
  loadPortfolios: () => Promise<void>;
  selectPortfolio: (id: string) => Promise<Portfolio | null>;
  saveCurrentPortfolio: (updated?: Portfolio) => Promise<void>;
  createPortfolio: (portfolio: Portfolio) => Promise<void>;
  deletePortfolio: (id: string) => Promise<void>;
  updatePortfolioData: (updater: (prev: PortfolioData) => PortfolioData) => void;
  updatePortfolioMeta: (fields: Partial<Portfolio>) => void;
  reorderSections: (newSections: PortfolioSection[]) => void;
  toggleSectionVisibility: (sectionId: string) => void;
  addSection: (type: PortfolioSection['type'], title: string) => void;
  removeSection: (sectionId: string) => void;
  setStyle: (style: TemplateStyle) => void;
  setTemplate: (template: TemplateVariant) => void;
  setTheme: (theme: ThemeMode) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [currentPortfolio, setCurrentPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(false);

  const userId = currentUser ? currentUser.uid : 'guest_local_user';

  const loadPortfolios = useCallback(async () => {
    setLoading(true);
    try {
      const list = await portfolioDb.getPortfolios(userId);
      setPortfolios(list);
      if (!currentPortfolio && list.length > 0) {
        setCurrentPortfolio(list[0]);
      }
    } catch (err) {
      console.error('Failed to load portfolios:', err);
    } finally {
      setLoading(false);
    }
  }, [userId, currentPortfolio]);

  useEffect(() => {
    loadPortfolios();
  }, [userId]);

  const selectPortfolio = async (id: string): Promise<Portfolio | null> => {
    let p = portfolios.find(item => item.id === id);
    if (!p) {
      p = (await portfolioDb.getPortfolio(userId, id)) || undefined;
    }
    if (p) {
      setCurrentPortfolio(p);
      return p;
    }
    return null;
  };

  const saveCurrentPortfolio = async (updated?: Portfolio) => {
    const target = updated || currentPortfolio;
    if (!target) return;

    await portfolioDb.savePortfolio(userId, target);
    setPortfolios(prev => {
      const idx = prev.findIndex(item => item.id === target.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = target;
        return copy;
      }
      return [target, ...prev];
    });
  };

  const createPortfolio = async (portfolio: Portfolio) => {
    await portfolioDb.savePortfolio(userId, portfolio);
    setPortfolios(prev => [portfolio, ...prev]);
    setCurrentPortfolio(portfolio);
  };

  const deletePortfolio = async (id: string) => {
    await portfolioDb.deletePortfolio(userId, id);
    setPortfolios(prev => prev.filter(p => p.id !== id));
    if (currentPortfolio?.id === id) {
      const remaining = portfolios.filter(p => p.id !== id);
      setCurrentPortfolio(remaining.length > 0 ? remaining[0] : null);
    }
  };

  const updatePortfolioData = (updater: (prev: PortfolioData) => PortfolioData) => {
    if (!currentPortfolio) return;
    const updatedData = updater(currentPortfolio.portfolioData);
    const updated: Portfolio = {
      ...currentPortfolio,
      portfolioData: updatedData,
      updatedAt: new Date().toISOString(),
    };
    setCurrentPortfolio(updated);
    saveCurrentPortfolio(updated);
  };

  const updatePortfolioMeta = (fields: Partial<Portfolio>) => {
    if (!currentPortfolio) return;
    const updated: Portfolio = {
      ...currentPortfolio,
      ...fields,
      updatedAt: new Date().toISOString(),
    };
    setCurrentPortfolio(updated);
    saveCurrentPortfolio(updated);
  };

  const reorderSections = (newSections: PortfolioSection[]) => {
    if (!currentPortfolio) return;
    const updated: Portfolio = {
      ...currentPortfolio,
      sections: newSections,
      updatedAt: new Date().toISOString(),
    };
    setCurrentPortfolio(updated);
    saveCurrentPortfolio(updated);
  };

  const toggleSectionVisibility = (sectionId: string) => {
    if (!currentPortfolio) return;
    const newSections = currentPortfolio.sections.map(s =>
      s.id === sectionId ? { ...s, visible: !s.visible } : s
    );
    reorderSections(newSections);
  };

  const addSection = (type: PortfolioSection['type'], title: string) => {
    if (!currentPortfolio) return;
    const id = `sec-${type}-${Date.now()}`;
    const newSections = [...currentPortfolio.sections, { id, type, title, visible: true }];
    reorderSections(newSections);
  };

  const removeSection = (sectionId: string) => {
    if (!currentPortfolio) return;
    const newSections = currentPortfolio.sections.filter(s => s.id !== sectionId);
    reorderSections(newSections);
  };

  const setStyle = (style: TemplateStyle) => {
    updatePortfolioMeta({ style });
  };

  const setTemplate = (template: TemplateVariant) => {
    updatePortfolioMeta({ template });
  };

  const setTheme = (theme: ThemeMode) => {
    updatePortfolioMeta({ theme });
  };

  return (
    <PortfolioContext.Provider
      value={{
        portfolios,
        currentPortfolio,
        loading,
        loadPortfolios,
        selectPortfolio,
        saveCurrentPortfolio,
        createPortfolio,
        deletePortfolio,
        updatePortfolioData,
        updatePortfolioMeta,
        reorderSections,
        toggleSectionVisibility,
        addSection,
        removeSection,
        setStyle,
        setTemplate,
        setTheme,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error('usePortfolio must be used within a PortfolioProvider');
  return context;
};
