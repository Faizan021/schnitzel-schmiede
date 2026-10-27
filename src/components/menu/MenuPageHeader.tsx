'use client';

import React from 'react';
import { Sparkles, Flame, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../providers/LanguageContext';

export function MenuPageHeader() {
  const { lang } = useLanguage();
  const isEn = lang === 'en';

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center mb-8">
      <div className="inline-flex items-center gap-2 rounded-full border border-[#e8d5be] bg-white/80 backdrop-blur-md px-4 py-1.5 text-xs font-mono font-bold text-[#16202a] mb-3 shadow-sm">
        <Flame className="h-3.5 w-3.5 text-[#4b3b2f]" />
        <span>{isEn ? 'SPEISEKARTE // CRAFT EDITION · DOHLER STR. 269' : 'SPEISEKARTE // HANDWERKS-EDITION · DOHLER STR. 269'}</span>
      </div>
      <h1 className="text-3xl sm:text-5xl font-black text-[#16202a] font-serif tracking-tight">
        {isEn ? 'THE SCHNITZEL SELECTION' : 'ORIGINAL SPEISEKARTE'}
      </h1>
      <p className="mt-2 text-sm sm:text-base text-[#4b3b2f] max-w-2xl mx-auto">
        {isEn
          ? 'Artisanal masterpieces crafted upon order. Pan-fried in 100% clarified butter, served with sauces in separate glass jars.'
          : 'Handgefertigt in Mönchengladbach • Reines Butterschmalz • Saucen reisen stets im separaten Glas für maximale Knusprigkeit.'}
      </p>
    </div>
  );
}
