'use client';

import React, { useState } from 'react';
import { Compass, Sparkles, Check, Plus, ArrowRight, Flame, Utensils, Heart } from 'lucide-react';
import { useCart } from '../providers/CartContext';
import { useLanguage } from '../providers/LanguageContext';
import { MENU_ITEMS } from '@/lib/data/menu';
import { MenuItem } from '@/lib/types/menu';
import confetti from 'canvas-confetti';
import { SpotlightCard } from '../ui/SpotlightCard';

export function SchnitzelCompass() {
  const { addStandardItem } = useCart();
  const { lang } = useLanguage();
  const isEn = lang === 'en';

  const [portion, setPortion] = useState<'classic' | 'snack' | 'party'>('classic');
  const [flavor, setFlavor] = useState<'lemon' | 'mushroom' | 'pepper' | 'gratinated'>('lemon');
  const [addedNotice, setAddedNotice] = useState(false);

  // Dynamic recommendation resolver
  const matchedDish: MenuItem = React.useMemo(() => {
    if (portion === 'party') {
      return (
        MENU_ITEMS.find((m) => m.id === 'party-10er') ||
        MENU_ITEMS[0]
      );
    }

    if (portion === 'snack') {
      if (flavor === 'mushroom') return MENU_ITEMS.find((m) => m.id === 'schnitzel-110g-jaeger') || MENU_ITEMS[0];
      if (flavor === 'pepper') return MENU_ITEMS.find((m) => m.id === 'schnitzel-110g-gladbacher') || MENU_ITEMS[0];
      if (flavor === 'gratinated') return MENU_ITEMS.find((m) => m.id === 'schnitzel-110g-alachef') || MENU_ITEMS[0];
      return MENU_ITEMS.find((m) => m.id === 'schnitzel-110g-wiener') || MENU_ITEMS[0];
    }

    // Classic 200g
    if (flavor === 'mushroom') return MENU_ITEMS.find((m) => m.id === 'schnitzel-200g-jaeger') || MENU_ITEMS[0];
    if (flavor === 'pepper') return MENU_ITEMS.find((m) => m.id === 'schnitzel-200g-gladbacher') || MENU_ITEMS[0];
    if (flavor === 'gratinated') return MENU_ITEMS.find((m) => m.id === 'ueberbacken-broccoli-schinken') || MENU_ITEMS[0];
    return MENU_ITEMS.find((m) => m.id === 'schnitzel-200g-wiener') || MENU_ITEMS[0];
  }, [portion, flavor]);

  const handleAdd = () => {
    addStandardItem(matchedDish);
    setAddedNotice(true);
    try {
      confetti({
        particleCount: 50,
        spread: 55,
        origin: { y: 0.7 },
        colors: ['#D4A347', '#E5B24E'],
      });
    } catch {
      // Ignore
    }
    setTimeout(() => setAddedNotice(false), 1400);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-[#edf7fc] via-[#ddeef7] to-[#edf7fc] border-t border-[#b8d4e8]/60 relative overflow-hidden">
      {/* Volumetric Radial Sconce Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#9bc1d9]/25 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#b8d4e8] bg-white/80 backdrop-blur-md px-4 py-1.5 text-xs font-mono font-bold text-[#1a3a52] mb-3 shadow-sm">
            <Compass className="h-4 w-4 text-[#2e5f7e] animate-pulse" />
            <span>{isEn ? 'INTERACTIVE FLAVOR MATCHER' : 'DER SCHNITZEL-KOMPASS'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#1a3a52] font-serif tracking-tight">
            {isEn ? 'Find Your Perfect Schnitzel in 2 Clicks' : 'In 2 Klicks zum perfekten Schnitzel'}
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#2e5f7e]">
            {isEn
              ? 'Tell us your hunger level and taste preference. Our kitchen algorithm matches your ideal creation instantly.'
              : 'Wählen Sie Ihren Hunger und Ihr Geschmacksprofil – unser Schmiede-Kompass empfiehlt sofort das passende Gericht.'}
          </p>
        </div>

        {/* 2-Step Selector Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Controls Column */}
          <div className="md:col-span-7 space-y-6">
            {/* Step 1: Hunger Level */}
            <div className="p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-white/90 shadow-md shadow-[#1a3a52]/5 space-y-3">
              <span className="text-xs font-mono font-black text-[#163044] uppercase tracking-wider block">
                {isEn ? '1. HOW BIG IS YOUR APPETITE?' : '1. WIE GROSS IST DER HUNGER?'}
              </span>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'snack' as const, label: isEn ? 'Snack (110g)' : 'Klein (ca. 110g)', desc: isEn ? 'Light hunger' : 'Leichter Hunger' },
                  { id: 'classic' as const, label: isEn ? 'Classic (200g)' : 'Klassiker (200g)', desc: isEn ? 'House favorite' : 'Echter Hunger' },
                  { id: 'party' as const, label: isEn ? 'Party (10+)' : 'Party (10er+)', desc: isEn ? 'For groups' : 'Für die Runde' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setPortion(opt.id)}
                    className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                      portion === opt.id
                        ? 'bg-[#9bc1d9] text-[#1a3a52] border-[#9bc1d9] font-black shadow-md shadow-[#9bc1d9]/30 scale-[1.02]'
                        : 'bg-[#f0f7fb] text-[#1a3a52] border-[#b8d4e8] hover:border-[#9bc1d9]'
                    }`}
                  >
                    <div className="text-xs font-bold">{opt.label}</div>
                    <div className={`text-[11px] font-medium ${portion === opt.id ? 'text-[#1a3a52]' : 'text-[#163044]'}`}>
                      {opt.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Flavor Soul */}
            <div className="p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-white/90 shadow-md shadow-[#1a3a52]/5 space-y-3">
              <span className="text-xs font-mono font-black text-[#163044] uppercase tracking-wider block">
                {isEn ? '2. WHICH FLAVOR PROFILE DO YOU CRAVE?' : '2. WELCHE GESCHMACKS-RICHTUNG?'}
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { id: 'lemon' as const, label: isEn ? 'Crispy & Lemon' : 'Klassisch mit Zitrone', icon: '🍋' },
                  { id: 'mushroom' as const, label: isEn ? 'Mushrooms & Cream' : 'Rheinische Waldpilze', icon: '🍄' },
                  { id: 'pepper' as const, label: isEn ? 'Green Pepper & Spice' : 'Gladbacher Grüner Pfeffer', icon: '🌶️' },
                  { id: 'gratinated' as const, label: isEn ? 'Oven-Gratinated' : 'Ofenfrisch Überbacken', icon: '🧀' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setFlavor(opt.id)}
                    className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer flex items-center gap-2.5 ${
                      flavor === opt.id
                        ? 'bg-[#9bc1d9] text-[#1a3a52] border-[#9bc1d9] font-black shadow-md shadow-[#9bc1d9]/30 scale-[1.02]'
                        : 'bg-[#f0f7fb] text-[#1a3a52] border-[#b8d4e8] hover:border-[#9bc1d9]'
                    }`}
                  >
                    <span className="text-xl">{opt.icon}</span>
                    <span className="text-xs font-bold leading-tight">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Recommended Dish Match Card Column */}
          <div className="md:col-span-5">
            <SpotlightCard className="p-6 sm:p-7 bg-white/95 backdrop-blur-md border-2 border-[#9bc1d9] shadow-xl shadow-[#1a3a52]/10">
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full bg-[#9bc1d9] text-[#1a3a52] text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-[#1a3a52]" />
                  <span>{isEn ? 'MATCH FOUND' : 'DEIN MATCH'}</span>
                </span>
                <span className="text-xs font-mono font-black text-[#163044]">
                  {matchedDish.defaultPortion || 'Frisch aus der Pfanne'}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#1a3a52] mb-1">
                {isEn && matchedDish.nameEn ? matchedDish.nameEn : matchedDish.name}
              </h3>

              {matchedDish.subtitle && (
                <p className="text-xs sm:text-sm text-[#163044] font-semibold mb-3">
                  {matchedDish.subtitle}
                </p>
              )}

              <p className="text-xs sm:text-sm text-[#163044] leading-relaxed mb-6 line-clamp-3">
                {matchedDish.description}
              </p>

              <div className="pt-4 border-t border-[#b8d4e8]/60 flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-[#163044] block font-bold uppercase tracking-wider">
                    {isEn ? 'Real Price' : 'Original-Preis'}
                  </span>
                  <span className="text-2xl sm:text-3xl font-black font-serif text-[#1a3a52]">
                    {matchedDish.price.toFixed(2).replace('.', ',')} €
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleAdd}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#9bc1d9] hover:bg-[#85b0cb] text-[#1a3a52] font-black text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  {addedNotice ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span>{isEn ? 'Added!' : 'Hinzugefügt!'}</span>
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4" />
                      <span>{isEn ? 'Add to Order' : 'Bestellen'}</span>
                    </>
                  )}
                </button>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
}
