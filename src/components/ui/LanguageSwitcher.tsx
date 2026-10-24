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
      className={`relative inline-flex items-center rounded-full p-0.5 bg-white/[0.06] border border-white/10 backdrop-blur-md shadow-inner ${className}`}
      role="group"
      aria-label="Language selector"
    >
      <button
        type="button"
        onClick={() => setLang('de')}
        className={`relative z-10 flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full transition-colors duration-200 ${
          lang === 'de'
            ? 'text-[#0D0D0E] font-bold'
            : 'text-[#C4BFB5] hover:text-[#FDFBF7]'
        }`}
        aria-pressed={lang === 'de'}
        title="Deutsch"
      >
        <span className="text-sm">🇩🇪</span>
        {!compact && <span>DE</span>}
      </button>

      <button
        type="button"
        onClick={() => setLang('en')}
        className={`relative z-10 flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full transition-colors duration-200 ${
          lang === 'en'
            ? 'text-[#0D0D0E] font-bold'
            : 'text-[#C4BFB5] hover:text-[#FDFBF7]'
        }`}
        aria-pressed={lang === 'en'}
        title="English"
      >
        <span className="text-sm">🇬🇧</span>
        {!compact && <span>EN</span>}
      </button>

      {/* Animated Glowing Pill Background */}
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        className="absolute top-0.5 bottom-0.5 rounded-full bg-gradient-to-r from-[#E6B84A] to-[#D4A030] shadow-[0_0_12px_rgba(230,184,74,0.4)]"
        style={{
          width: 'calc(50% - 2px)',
          left: lang === 'de' ? '2px' : 'calc(50%)',
        }}
      />
    </div>
  );
}
