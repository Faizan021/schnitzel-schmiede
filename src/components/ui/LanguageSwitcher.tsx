'use client';

import React from 'react';
import { useLanguage } from '@/components/providers/LanguageContext';
import { motion } from 'framer-motion';

interface LanguageSwitcherProps {
  compact?: boolean;
  className?: string;
}

export function LanguageSwitcher({ compact = false, className = '' }: LanguageSwitcherProps) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className={`relative inline-flex items-center rounded-full p-1 bg-[#1D1B1A] border border-[#534434]/50 shadow-inner ${className}`}
      role="group"
      aria-label="Language selector"
    >
      <button
        type="button"
        onClick={() => setLang('de')}
        className={`relative z-10 flex items-center justify-center px-3 py-1 text-xs font-mono font-bold rounded-full transition-colors duration-200 cursor-pointer ${
          lang === 'de'
            ? 'text-[#2A1700]'
            : 'text-[#A08E7A] hover:text-[#E6E1DF]'
        }`}
        aria-pressed={lang === 'de'}
        title="Deutsch (German)"
      >
        <span>DE</span>
      </button>

      <button
        type="button"
        onClick={() => setLang('en')}
        className={`relative z-10 flex items-center justify-center px-3 py-1 text-xs font-mono font-bold rounded-full transition-colors duration-200 cursor-pointer ${
          lang === 'en'
            ? 'text-[#2A1700]'
            : 'text-[#A08E7A] hover:text-[#E6E1DF]'
        }`}
        aria-pressed={lang === 'en'}
        title="English"
      >
        <span>EN</span>
      </button>

      {/* Animated Glowing Gold Slider Pill */}
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        className="absolute top-1 bottom-1 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#FFC174] shadow-[0_0_12px_rgba(245,158,11,0.4)]"
        style={{
          width: 'calc(50% - 4px)',
          left: lang === 'de' ? '4px' : 'calc(50%)',
        }}
      />
    </div>
  );
}
