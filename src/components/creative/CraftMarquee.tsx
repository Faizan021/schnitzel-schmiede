'use client';

import React from 'react';
import { Flame, Sparkles, Award, ShieldCheck, Heart, Zap } from 'lucide-react';

export function CraftMarquee() {
  const items = [
    { icon: Flame, text: 'In reinem Butterschmalz souffliert' },
    { icon: ShieldCheck, text: '100% Halal Hähnchen-Optionen' },
    { icon: Sparkles, text: 'Saucen stets separat verpackt' },
    { icon: Award, text: 'Mönchengladbachs Schnitzel-Manufaktur' },
    { icon: Zap, text: '1-Klick WhatsApp Blitz-Bestellung' },
    { icon: Heart, text: '10% Rabatt bei Selbstabholung' },
  ];

  return (
    <div className="relative w-full overflow-hidden border-y border-[#E6B84A]/20 bg-[#121218]/90 py-3.5 backdrop-blur-md">
      {/* Side gradient masks */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-r from-[#0A0A0C] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-l from-[#0A0A0C] to-transparent" />

      <div className="flex w-max animate-marquee gap-8">
        {[...items, ...items, ...items].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FDFBF7]"
            >
              <Icon className="h-4 w-4 text-[#E6B84A]" />
              <span>{item.text}</span>
              <span className="text-[#E6B84A]/40 ml-4 font-black">✦</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
