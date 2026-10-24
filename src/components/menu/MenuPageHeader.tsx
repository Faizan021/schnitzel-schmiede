'use client';

import React from 'react';
import { UtensilsCrossed } from 'lucide-react';
import { useLanguage } from '../providers/LanguageContext';

export function MenuPageHeader() {
  const { lang } = useLanguage();
  const isEn = lang === 'en';

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center max-w-3xl mb-6">
      <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A347]/30 bg-[#D4A347]/10 px-4 py-1.5 text-xs font-bold text-[#E5B24E] mb-3">
        <UtensilsCrossed className="h-3.5 w-3.5" />
        <span>{isEn ? 'Handmade upon Order · Bismarckstraße 45' : 'Frisch geklopft & in Butterschmalz souffliert'}</span>
      </div>
      <h1 className="text-3xl sm:text-5xl font-black text-[#FBF9F5] font-serif">
        {isEn ? 'The Schmiede Menu' : 'Unsere Speisekarte'}
      </h1>
      <p className="mt-2 text-sm sm:text-base text-[#D5CEBF]">
        {isEn
          ? 'Artisanal schnitzels, custom creations, loaded sides and signature craft sauces. 10% discount on self-pickup.'
          : 'Traditionelle Schnitzel-Klassiker, Brauhaus-Spezialitäten und hausgemachte Saucen. 10% Rabatt bei Selbstabholung.'}
      </p>
    </div>
  );
}
