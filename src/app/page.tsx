import React from 'react';
import Link from 'next/link';
import { InteractiveSizzleHero } from '@/components/creative/InteractiveSizzleHero';
import { CraftMarquee } from '@/components/creative/CraftMarquee';
import { BentoCraftGrid } from '@/components/creative/BentoCraftGrid';
import { SauceDipInteractive } from '@/components/creative/SauceDipInteractive';
import { ReviewsSection } from '@/components/home/ReviewsSection';
import { MenuSection } from '@/components/menu/MenuSection';
import { EmbersBackground } from '@/components/creative/EmbersBackground';
import { ArrowRight, UtensilsCrossed } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="relative">
      {/* Dynamic Forge Embers Simulation */}
      <EmbersBackground />

      {/* 3D Sizzle Hero with Live Crunch Sensor */}
      <InteractiveSizzleHero />

      {/* Infinite Craft Marquee Banner */}
      <CraftMarquee />

      {/* Modern 2026 Bento Craft Grid */}
      <BentoCraftGrid />

      {/* Interactive Sauce Pairing Station */}
      <SauceDipInteractive />

      {/* Featured Visual Speisekarte Section */}
      <section className="py-16 bg-[#0A0A0C] border-t border-white/5 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E6B84A] uppercase tracking-wider mb-2">
              <UtensilsCrossed className="h-4 w-4" />
              <span>Aus unserer Schmiede-Küche</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#FDFBF7] font-display">
              Die beliebtesten Kreationen
            </h2>
          </div>
          <Link
            href="/speisekarte"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#E6B84A] hover:text-[#F5C75D] transition-colors"
          >
            <span>Gesamte Speisekarte öffnen</span>
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
