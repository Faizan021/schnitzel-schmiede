'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ShoppingBag,
  Calendar,
  Flame,
  Award,
  ShieldCheck,
  Star,
} from 'lucide-react';
import { GlowingButton } from '../ui/GlowingButton';

export function HeroSection() {

  return (
    <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden pt-8 pb-16">
      {/* Background Ambience & Radial Glows */}
      <div className="absolute inset-0 bg-[#0A0A0C] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#E6B84A]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-[#B88526]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Micro-Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-[#E6B84A]/30 bg-[#16161C]/90 px-4 py-1.5 text-xs font-semibold text-[#E6B84A] shadow-lg backdrop-blur-md mb-6"
        >
          <Flame className="h-4 w-4 fill-[#E6B84A]" />
          <span>Mönchengladbachs erste Adresse für echte Schnitzel-Handwerkskunst</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-[#FDFBF7] font-display max-w-5xl mx-auto leading-[1.08]"
        >
          KNUSPRIG. GOLDEN.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E6B84A] via-[#F5C75D] to-[#E6B84A]">
            MEISTERHAFT.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-base sm:text-xl text-[#C4BFB5] max-w-2xl mx-auto font-normal leading-relaxed"
        >
          Frisch von Hand geklopft, in reinem Butterschmalz souffliert und mit der
          legendären <strong className="text-[#FDFBF7]">Knusper-Garantie</strong> geliefert.
          Jetzt direkt ohne Plattform-Aufpreis bestellen.
        </motion.p>

        {/* High-Converting CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4"
        >
          <Link href="/speisekarte">
            <GlowingButton size="lg" icon={<ShoppingBag className="h-5 w-5" />}>
              Speisekarte & Bestellen
            </GlowingButton>
          </Link>

          <Link href="/konfigurator">
            <GlowingButton
              variant="forge"
              size="lg"
              icon={<Sparkles className="h-5 w-5 text-[#E6B84A]" />}
            >
              Schnitzel-Baukasten starten
            </GlowingButton>
          </Link>

          <Link href="/reservierung">
            <GlowingButton
              variant="outline"
              size="lg"
              icon={<Calendar className="h-5 w-5 text-[#E6B84A]" />}
            >
              Tisch reservieren
            </GlowingButton>
          </Link>
        </motion.div>

        {/* Trust Badges Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 pt-8 border-t border-white/5 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-[#C4BFB5]"
        >
          <div className="flex items-center gap-2">
            <div className="flex text-[#E6B84A]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <span className="font-bold text-[#FDFBF7]">4.9 / 5.0 Google Reviews</span>
          </div>

          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>100% Halal Hähnchen-Optionen</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Award className="h-4 w-4 text-[#E6B84A]" />
            <span>10% Rabatt bei Selbstabholung</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Flame className="h-4 w-4 text-[#E6B84A]" />
            <span>Saucen stets separat verpackt</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
