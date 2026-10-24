import React from 'react';
import Link from 'next/link';
import { HeroSection } from '@/components/home/HeroSection';
import { CraftPhilosophy } from '@/components/home/CraftPhilosophy';
import { ReviewsSection } from '@/components/home/ReviewsSection';
import { MenuSection } from '@/components/menu/MenuSection';
import { ArrowRight, UtensilsCrossed } from 'lucide-react';

export default function HomePage() {
  return (
    <div>
      {/* Hero Visual Section */}
      <HeroSection />

      {/* Featured Visual Speisekarte Section */}
      <section className="py-12 bg-[#0A0A0C] border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E6B84A] uppercase tracking-wider mb-2">
              <UtensilsCrossed className="h-4 w-4" />
              <span>Aus unserer Schmiede-Küche</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#FDFBF7] font-display">
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

      {/* Handwerk & Culinary Philosophy */}
      <CraftPhilosophy />

      {/* Social Proof & Local Google Reviews */}
      <ReviewsSection />
    </div>
  );
}
