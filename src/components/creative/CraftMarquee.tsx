'use client';

import React from 'react';
import { Flame, Sparkles, Award, ShieldCheck, Heart, Zap } from 'lucide-react';
import { useLanguage } from '../providers/LanguageContext';

export function CraftMarquee() {
  const { t } = useLanguage();

  const items = [
    { icon: Flame, text: t.marquee.inButter },
    { icon: ShieldCheck, text: t.marquee.halal },
    { icon: Sparkles, text: t.marquee.saucesSeparate },
    { icon: Award, text: t.marquee.manufaktur },
    { icon: Zap, text: t.marquee.whatsappOrder },
    { icon: Heart, text: t.marquee.pickupDiscount },
  ];

  return (
    <div className="relative w-full overflow-hidden border-y border-[#312B26] bg-[#191715]/95 py-3.5 backdrop-blur-md">
      {/* Side gradient masks */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-r from-[#121110] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-l from-[#121110] to-transparent" />

      <div className="flex w-max animate-marquee gap-8">
        {[...items, ...items, ...items].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FBF9F5]"
            >
              <Icon className="h-4 w-4 text-[#E5B24E]" />
              <span>{item.text}</span>
              <span className="text-[#D4A347]/40 ml-4 font-black">✦</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
