'use client';

import React from 'react';
import { Flame, Sparkles, Award, ShieldCheck, Heart, Zap } from 'lucide-react';
import { useLanguage } from '../providers/LanguageContext';

export function CraftMarquee() {
  const { t } = useLanguage();

  const items = [
    { icon: Flame, text: t.marquee.inButter },
    { icon: ShieldCheck, text: t.marquee.regional },
    { icon: Sparkles, text: t.marquee.saucesSeparate },
    { icon: Award, text: t.marquee.manufaktur },
    { icon: Zap, text: t.marquee.whatsappOrder },
    { icon: Heart, text: t.marquee.pickupDiscount },
  ];

  return (
    <div
      style={{ maxWidth: '100vw', overflowX: 'hidden' }}
      className="relative w-full overflow-hidden border-y border-[#b8d4e8]/60 bg-white/75 py-3.5 backdrop-blur-md shadow-sm"
    >
      {/* Side gradient masks */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-16 sm:w-24 bg-gradient-to-r from-[#edf7fc] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-16 sm:w-24 bg-gradient-to-l from-[#edf7fc] to-transparent" />

      <div className="flex w-max min-w-full animate-marquee gap-8">
        {[...items, ...items, ...items].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1a3a52]"
            >
              <Icon className="h-4 w-4 text-[#2e5f7e]" />
              <span>{item.text}</span>
              <span className="text-[#9bc1d9] ml-4 font-black">✦</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
