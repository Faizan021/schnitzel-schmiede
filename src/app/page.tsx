'use client';

import React from 'react';
import Link from 'next/link';
import { InteractiveSizzleHero } from '@/components/creative/InteractiveSizzleHero';
import { CraftMarquee } from '@/components/creative/CraftMarquee';
import { BentoCraftGrid } from '@/components/creative/BentoCraftGrid';
import { SauceDipInteractive } from '@/components/creative/SauceDipInteractive';
import { ReviewsSection } from '@/components/home/ReviewsSection';
import { MenuSection } from '@/components/menu/MenuSection';
import { EmbersBackground } from '@/components/creative/EmbersBackground';
import { useLanguage } from '@/components/providers/LanguageContext';
import { ArrowRight, UtensilsCrossed } from 'lucide-react';

export default function HomePage() {
  const { t, lang } = useLanguage();
  const isEn = lang === 'en';

  return (
    <div className="relative bg-[#121110]">
      {/* Dynamic Forge Embers Simulation */}
      <EmbersBackground />

      {/* Editorial Sizzle Hero */}
      <InteractiveSizzleHero />

      {/* Infinite Craft Marquee Banner */}
      <CraftMarquee />

      {/* 2026 Craft Bento Grid with Real Gastraum Interior */}
      <BentoCraftGrid />

      {/* Interactive Sauce Pairing Station */}
      <SauceDipInteractive />

      {/* Featured Visual Speisekarte Section */}
      <section className="py-20 bg-[#141211] border-t border-[#312B26] relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E5B24E] uppercase tracking-wider mb-2">
              <UtensilsCrossed className="h-4 w-4" />
              <span>{isEn ? 'From Our Pan Kitchen' : 'Aus unserer Schmiede-Küche'}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#FBF9F5] font-serif">
              {isEn ? 'Popular House Creations' : 'Die beliebtesten Kreationen'}
            </h2>
          </div>
          <Link
            href="/speisekarte"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#E5B24E] hover:text-[#F3C769] transition-colors"
          >
            <span>{t.menu.openAll}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <MenuSection />
      </section>

      {/* Social Proof & Local Google Reviews */}
      <ReviewsSection />
    </div>
  );
}
