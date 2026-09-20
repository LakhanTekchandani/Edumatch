import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message?: string;
}

interface AppContextType {
  shortlist: string[];
  compareList: string[];
  toasts: ToastMessage[];
  toggleShortlist: (instituteId: string) => void;
  isInShortlist: (instituteId: string) => boolean;
  toggleCompare: (instituteId: string) => void;
  isInCompare: (instituteId: string) => boolean;
  clearCompare: () => void;
  showToast: (title: string, message?: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_SHORTLIST = 'edumatch_shortlist';
const STORAGE_COMPARE = 'edumatch_compare';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shortlist, setShortlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_SHORTLIST);
      return saved ? JSON.parse(saved) : ['inst-1'];
    } catch {
      return ['inst-1'];
    }
  });

  const [compareList, setCompareList] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_COMPARE);
      return saved ? JSON.parse(saved) : ['inst-1', 'inst-2'];
    } catch {
      return ['inst-1', 'inst-2'];
    }
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    localStorage.setItem(STORAGE_SHORTLIST, JSON.stringify(shortlist));
  }, [shortlist]);

  useEffect(() => {
    localStorage.setItem(STORAGE_COMPARE, JSON.stringify(compareList));
  }, [compareList]);

  const showToast = (title: string, message?: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = 'toast-' + Date.now();
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleShortlist = (instituteId: string) => {
    setShortlist((prev) => {
      if (prev.includes(instituteId)) {
        showToast('Removed from Shortlist', 'Institute removed from your saved list.', 'info');
        return prev.filter((id) => id !== instituteId);
      } else {
        showToast('Added to Shortlist', 'Institute saved to your student dashboard shortlist.', 'success');
        return [...prev, instituteId];
      }
    });
  };

  const isInShortlist = (instituteId: string) => shortlist.includes(instituteId);

  const toggleCompare = (instituteId: string) => {
    setCompareList((prev) => {
      if (prev.includes(instituteId)) {
        showToast('Removed from Comparison', 'Institute removed from comparison matrix.', 'info');
        return prev.filter((id) => id !== instituteId);
      } else {
        if (prev.length >= 4) {
          showToast('Comparison Limit Reached', 'You can compare up to 4 institutes side by side.', 'error');
          return prev;
        }
        showToast('Added to Comparison', 'Institute added to comparison matrix.', 'success');
        return [...prev, instituteId];
      }
    });
  };

  const isInCompare = (instituteId: string) => compareList.includes(instituteId);

  const clearCompare = () => {
    setCompareList([]);
    showToast('Comparison Cleared', 'All institutes removed from comparison.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        shortlist,
        compareList,
        toasts,
        toggleShortlist,
        isInShortlist,
        toggleCompare,
        isInCompare,
        clearCompare,
        showToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
