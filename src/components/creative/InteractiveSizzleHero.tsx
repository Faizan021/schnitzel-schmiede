'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  Sparkles,
  ShoppingBag,
  Calendar,
  Flame,
  Volume2,
  Award,
  ShieldCheck,
  Star,
  CheckCircle2,
} from 'lucide-react';
import { playSizzleSound } from './AudioCrunchEngine';
import { AudioTogglePill } from './AudioTogglePill';
import { GlowingButton } from '../ui/GlowingButton';
import { useLanguage } from '../providers/LanguageContext';
import { useCart } from '../providers/CartContext';
import { MENU_ITEMS } from '@/lib/data/menu';

export function InteractiveSizzleHero() {
  const { lang } = useLanguage();
  const { addStandardItem } = useCart();
  const isEn = lang === 'en';

  // 3D Tilt Spring Physics
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    damping: 25,
    stiffness: 140,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    damping: 25,
    stiffness: 140,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const heroDish = MENU_ITEMS.find((d) => d.id === 'schnitzel-wiener-art') || MENU_ITEMS[0];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-8 pb-16">
      {/* Warm Ambient Tavern Glows */}
      <div className="absolute inset-0 bg-[#121110] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-[#D4A347]/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-[350px] h-[350px] bg-[#B88526]/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#8B5A2B]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Prestigious Editorial Typography */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            {/* Top Identity Toolbar */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A347]/30 bg-[#1C1A18]/90 px-4 py-1.5 text-xs font-bold text-[#E5B24E] shadow-lg backdrop-blur-md">
                <Flame className="h-4 w-4 fill-[#E5B24E]" />
                <span>
                  {isEn
                    ? 'Bismarckstraße 45 · Artisanal Schnitzel Craft'
                    : 'Bismarckstraße 45 · Echte Mönchengladbacher Schnitzel-Kultur'}
                </span>
              </div>
              <AudioTogglePill />
            </div>

            {/* Editorial Serif & Display Headline */}
            <div className="space-y-2">
              <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#D4A347] font-sans">
                {isEn ? 'Traditional Pan Craft since Day 1' : 'Traditionelles Pfannen-Handwerk seit Tag 1'}
              </p>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#FBF9F5] font-serif leading-[1.08]">
                {isEn ? 'Mönchengladbach’s ' : 'Mönchengladbachs '}
                <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#E5B24E] via-[#F3C769] to-[#D4A347]">
                  {isEn ? 'Schnitzel Institution.' : 'Schnitzel-Institution.'}
                  <span className="absolute -bottom-1.5 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4A347] to-transparent rounded-full" />
                </span>
              </h1>
            </div>

            {/* Authentic Gastronomic Prose */}
            <p className="text-base sm:text-lg text-[#D5CEBF] max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              {isEn
                ? 'Every schnitzel is freshly pounded to order, hand-dredged through country eggs and flour, and floated in pure golden clarified butter for that signature soufflé crust. With our Crunch Guarantee: sauces are always packed in separate glass jars.'
                : 'Jedes Schnitzel wird erst bei Ihrer Bestellung frisch von Hand geklopft, durch Land-Ei gezogen und in reinem Butterschmalz schwimmend goldgelb ausgebacken. Mit unserer Knusper-Garantie: Saucen reisen stets im separaten Glas.'}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <Link href="/speisekarte">
                <GlowingButton
                  size="lg"
                  icon={<ShoppingBag className="h-5 w-5" />}
                  onMouseEnter={playSizzleSound}
                >
                  {isEn ? 'Explore Menu & Order' : 'Speisekarte & Bestellen'}
                </GlowingButton>
              </Link>

              <Link href="/reservierung">
                <GlowingButton
                  variant="forge"
                  size="lg"
                  icon={<Calendar className="h-5 w-5 text-[#E5B24E]" />}
                >
                  {isEn ? 'Book Table in Gastraum' : 'Tisch im Gastraum buchen'}
                </GlowingButton>
              </Link>

              <Link href="/konfigurator">
                <GlowingButton
                  variant="outline"
                  size="lg"
                  icon={<Sparkles className="h-5 w-5 text-[#E5B24E]" />}
                  onMouseEnter={playSizzleSound}
                >
                  {isEn ? 'Schnitzel Builder' : 'Schnitzel-Baukasten'}
                </GlowingButton>
              </Link>
            </div>

            {/* Trust Micro-Metrics Bar */}
            <div className="pt-6 border-t border-[#312B26] flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-[#C4BFB5]">
              <div className="flex items-center gap-1.5">
                <div className="flex text-[#E5B24E]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-bold text-[#FBF9F5]">4.9 / 5.0 Google Reviews</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>{isEn ? '100% Halal Options' : '100% Halal Optionen'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="h-4 w-4 text-[#E5B24E]" />
                <span>{isEn ? '10% Pickup Discount' : '10% Abholer-Rabatt'}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Masterpiece Visual Culinary Presentation */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-full max-w-md perspective-1000"
            >
              {/* Outer Golden Aura */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-[#D4A347]/20 via-[#F3C769]/10 to-[#D4A347]/20 blur-xl opacity-75 animate-pulse pointer-events-none" />

              {/* 3D Motion Card Container */}
              <motion.div
                style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                className="relative rounded-3xl border border-[#D4A347]/35 bg-[#191715] p-5 sm:p-6 shadow-2xl backdrop-blur-xl"
              >
                {/* Header Pills */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-bold text-[#FBF9F5]">
                      {isEn ? 'Fresh in Butter Pan' : 'Frisch in Butterschmalz'}
                    </span>
                  </div>
                  <span className="rounded-full bg-[#D4A347]/15 border border-[#D4A347]/40 px-3 py-1 text-[11px] font-bold text-[#E5B24E]">
                    {isEn ? 'Chef’s Classic' : 'Klassiker des Hauses'}
                  </span>
                </div>

                {/* Main Dish Visual with Enhanced HD Real Photo */}
                <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden bg-black/40 group border border-[#D4A347]/20 shadow-inner">
                  <Image
                    src="/images/dishes/schnitzel-wiener-art.jpg"
                    alt={
                      isEn
                        ? 'Golden souffléed Schnitzel Wiener Art'
                        : 'Goldbraun souffliertes Schnitzel Wiener Art'
                    }
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 420px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#191715] via-transparent to-transparent opacity-85" />

                  {/* Original HD Photo Verified Pill */}
                  <div className="absolute top-3 right-3 rounded-full bg-[#191715]/85 backdrop-blur-md border border-[#D4A347]/40 px-2.5 py-1 text-[10px] font-bold text-[#E5B24E] flex items-center gap-1.5 shadow-sm">
                    <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                    <span>{isEn ? 'Original Kitchen Photo' : 'Original-Foto'}</span>
                  </div>

                  {/* Dish Title Overlay */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-[#FBF9F5] font-serif">
                        Schnitzel Wiener Art
                      </h3>
                      <p className="text-xs text-[#E5B24E] font-medium">
                        {isEn
                          ? '220g · Souffléed Crust · Organic Lemon · Fries'
                          : '220g · Soufflierte Panade · Bio-Zitrone · Pommes'}
                      </p>
                    </div>
                    <span className="font-serif text-lg font-bold text-[#E5B24E]">
                      15,90 €
                    </span>
                  </div>
                </div>

                {/* Culinary Guarantee & Direct Add Bar */}
                <div className="mt-4 rounded-2xl border border-[#312B26] bg-[#211E1B] p-3.5 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#D5CEBF] font-medium">
                      {isEn ? 'Knusper-Garantie:' : 'Knusper-Garantie:'}
                    </span>
                    <span className="text-[#E5B24E] font-bold">
                      {isEn ? 'Sauce always separate' : 'Sauce stets separat'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => addStandardItem(heroDish)}
                      className="flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 px-4 text-xs font-bold bg-gradient-to-r from-[#D4A347] via-[#E5B24E] to-[#D4A347] text-[#121110] hover:brightness-110 shadow-md shadow-[#D4A347]/25 transition-all cursor-pointer"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      <span>{isEn ? 'Add to Order (15,90 €)' : 'Direkt bestellen (15,90 €)'}</span>
                    </button>

                    <button
                      onClick={playSizzleSound}
                      title={isEn ? 'Listen to butter sizzle' : 'Pfannenzischen anhören'}
                      className="rounded-xl border border-[#D4A347]/30 bg-[#1C1A18] p-2.5 text-[#E5B24E] hover:bg-[#D4A347]/15 transition-colors cursor-pointer"
                    >
                      <Volume2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
