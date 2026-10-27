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
    <div className="relative min-h-screen min-w-0 max-w-full overflow-x-hidden bg-[#edf7fc] text-[#1a3a52]">
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

      {/* Interactive Feature: Der Schnitzel-Kompass (2-Click Flavor & Portion Matcher) */}
      <SchnitzelCompass />

      {/* 2026 Craft Bento Grid with Skillet Acoustics */}
      <BentoCraftGrid />

      {/* Interactive Sauce Pairing Station */}
      <SauceDipInteractive />

      {/* Featured Visual Speisekarte Section with BebeQ Frosted Glass Theme */}
      <section id="speisekarte-section" className="py-20 bg-gradient-to-b from-[#edf7fc] via-[#ddeef7] to-[#edf7fc] border-t border-[#b8d4e8]/60 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#92601e] uppercase tracking-wider mb-2">
              <UtensilsCrossed className="h-4 w-4 text-[#92601e]" />
              <span>{isEn ? 'From Our Pan Kitchen' : 'Aus unserer Schmiede-Küche'}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#1a3a52] font-serif">
              {isEn ? 'Popular House Creations' : 'Die beliebtesten Kreationen'}
            </h2>
          </div>
          <Link
            href="/speisekarte"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/90 border border-[#b8d4e8] text-xs font-bold text-[#1a3a52] hover:bg-[#cce3f1] transition-all shadow-sm"
          >
            <span>{t.menu.openAll}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <FeaturedDishesPreview />
      </section>

      {/* Zeitlos-inspired Chapter: "Für Ihre Feier reserviert" & Catering Party Deals */}
      <PartyCelebrationChapter />

      {/* Social Proof & Local Google Reviews */}
      <ReviewsSection />

      {/* Zeitlos Signature Chapter: "Wir freuen uns auf Ihren Besuch" with 1-Click Call & WhatsApp */}
      <InvitationBanner />
    </div>
  );
}
