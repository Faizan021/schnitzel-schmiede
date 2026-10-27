'use client';

import React from 'react';
import Link from 'next/link';
import { InteractiveSizzleHero } from '@/components/creative/InteractiveSizzleHero';
import { CraftMarquee } from '@/components/creative/CraftMarquee';
import { ZeitlosWelcomeChapter } from '@/components/home/ZeitlosWelcomeChapter';
import { SchnitzelCompass } from '@/components/creative/SchnitzelCompass';
import { BentoCraftGrid } from '@/components/creative/BentoCraftGrid';
import { SauceDipInteractive } from '@/components/creative/SauceDipInteractive';
import { PartyCelebrationChapter } from '@/components/home/PartyCelebrationChapter';
import { ReviewsSection } from '@/components/home/ReviewsSection';
import { InvitationBanner } from '@/components/home/InvitationBanner';
import { FeaturedDishesPreview } from '@/components/home/FeaturedDishesPreview';
import { EmbersBackground } from '@/components/creative/EmbersBackground';
import { LiveKitchenRadar } from '@/components/ui/LiveKitchenRadar';
import { useLanguage } from '@/components/providers/LanguageContext';
import { ArrowRight, UtensilsCrossed } from 'lucide-react';

export default function HomePage() {
  const { t, lang } = useLanguage();
  const isEn = lang === 'en';

  return (
    <div className="relative min-h-screen min-w-0 max-w-full overflow-x-hidden bg-[#faf7f2] text-[#16202a]">
      {/* Dynamic Forge Embers Simulation */}
      <EmbersBackground />

      {/* Real-time Kitchen Radar Chip */}
      <LiveKitchenRadar />

      {/* Editorial Sizzle Hero with Butter-Sizzle Simulator */}
      <InteractiveSizzleHero />

      {/* Infinite Craft Marquee Banner */}
      <div className="w-full max-w-[100vw] overflow-x-hidden">
        <CraftMarquee />
      </div>

      {/* Zeitlos-inspired Chapter 1: Warm Hospitality & Philosophy */}
      <ZeitlosWelcomeChapter />

      {/* Featured Visual Speisekarte Section: Fast-Track to Appetizing Bestsellers */}
      <section id="speisekarte-section" className="py-16 sm:py-20 bg-gradient-to-b from-[#faf7f2] via-[#fffbf5] to-[#f4ede4] border-t border-[#e6d7c3]/70 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#b45309] uppercase tracking-wider mb-2 bg-[#fef3c7] px-3 py-1 rounded-full border border-[#fde68a]">
              <UtensilsCrossed className="h-4 w-4 text-[#d99036]" />
              <span>{isEn ? 'From Our Pan Kitchen' : 'Aus unserer Schmiede-Küche'}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#16202a] font-serif">
              {isEn ? 'Popular House Creations' : 'Die beliebtesten Kreationen'}
            </h2>
          </div>
          <Link
            href="/speisekarte"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d99036] to-[#b45309] text-white text-xs font-black uppercase tracking-wider hover:from-[#e09b43] hover:to-[#c25c0e] transition-all shadow-md active:scale-95"
          >
            <span>{t.menu.openAll}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <FeaturedDishesPreview />
      </section>

      {/* Interactive Feature: Der Schnitzel-Kompass (2-Click Flavor & Portion Matcher) */}
      <SchnitzelCompass />

      {/* 2026 Craft Bento Grid with Skillet Acoustics */}
      <BentoCraftGrid />

      {/* Interactive Sauce Pairing Station */}
      <SauceDipInteractive />

      {/* Zeitlos-inspired Chapter: "Für Ihre Feier reserviert" & Catering Party Deals */}
      <PartyCelebrationChapter />

      {/* Social Proof & Local Google Reviews */}
      <ReviewsSection />

      {/* Zeitlos Signature Chapter: "Wir freuen uns auf Ihren Besuch" with 1-Click Call & WhatsApp */}
      <InvitationBanner />
    </div>
  );
}
