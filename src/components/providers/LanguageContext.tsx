'use client';

import React, { createContext, useContext, useMemo, useSyncExternalStore } from 'react';
import { Language, Translations, TRANSLATIONS } from '@/lib/i18n/translations';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'ss_lang_v1';

let cachedLang: Language | null = null;
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  const handleStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY && (e.newValue === 'de' || e.newValue === 'en')) {
      cachedLang = e.newValue;
      document.documentElement.lang = e.newValue;
      listeners.forEach((l) => l());
    }
  };
  window.addEventListener('storage', handleStorage);
  return () => {
    listeners.delete(callback);
    window.removeEventListener('storage', handleStorage);
  };
}

function getSnapshot(): Language {
  if (cachedLang !== null) {
    return cachedLang;
  }
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'de' || saved === 'en') {
        cachedLang = saved;
        document.documentElement.lang = saved;
        return cachedLang;
      }
    } catch {
      // Ignore
    }
  }
  cachedLang = 'de';
  return cachedLang;
}

function getServerSnapshot(): Language {
  return 'de';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setLang = (newLang: Language) => {
    cachedLang = newLang;
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
      document.documentElement.lang = newLang;
    } catch {
      // Ignore
    }
    listeners.forEach((l) => l());
  };

  const toggleLang = () => {
    setLang(lang === 'de' ? 'en' : 'de');
  };

  const t = useMemo(() => TRANSLATIONS[lang], [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
