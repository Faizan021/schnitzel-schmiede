'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Check,
  ShieldCheck,
  Info,
  Flame,
  Layers,
  Soup,
  UtensilsCrossed,
  ShoppingBag,
  RotateCcw,
} from 'lucide-react';
import { useCart } from '../providers/CartContext';
import {
  MEAT_OPTIONS,
  SIZE_OPTIONS,
  CRUST_OPTIONS,
  SAUCE_OPTIONS,
  SIDE_OPTIONS,
  EXTRA_OPTIONS,
  SchnitzelConfig,
} from '@/lib/schemas/configurator';
import { AllergenKey } from '@/lib/types/menu';
import { AllergenModal } from '../ui/AllergenModal';
import { Badge } from '../ui/Badge';
import confetti from 'canvas-confetti';

const BASE_PRICE = 14.90;

export function SchnitzelBuilder() {
  const { addCustomSchnitzel } = useCart();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedMeat, setSelectedMeat] = useState<keyof typeof MEAT_OPTIONS>('haehnchen');
  const [selectedSize, setSelectedSize] = useState<keyof typeof SIZE_OPTIONS>('normal');
  const [selectedCrust, setSelectedCrust] = useState<keyof typeof CRUST_OPTIONS>('klassik_gold');
  const [selectedSauce, setSelectedSauce] = useState<keyof typeof SAUCE_OPTIONS>('champignon_rahm');
  const [sauceSeparated, setSauceSeparated] = useState(true);
  const [selectedSide, setSelectedSide] = useState<keyof typeof SIDE_OPTIONS>('pommes_knusprig');
  const [selectedExtras, setSelectedExtras] = useState<Array<keyof typeof EXTRA_OPTIONS>>([
    'preiselbeeren',
  ]);
  const [notes, setNotes] = useState('');
  const [isAllergenModalOpen, setIsAllergenModalOpen] = useState(false);

  // Compute live price
  const totalPrice = useMemo(() => {
    let sum = BASE_PRICE;
    sum += MEAT_OPTIONS[selectedMeat].priceDelta;
    sum += SIZE_OPTIONS[selectedSize].priceDelta;
    sum += CRUST_OPTIONS[selectedCrust].priceDelta;
    sum += SAUCE_OPTIONS[selectedSauce].priceDelta;
    sum += SIDE_OPTIONS[selectedSide].priceDelta;
    for (const extra of selectedExtras) {
      sum += EXTRA_OPTIONS[extra].priceDelta;
    }
    return Math.round(sum * 100) / 100;
  }, [selectedMeat, selectedSize, selectedCrust, selectedSauce, selectedSide, selectedExtras]);

  // Aggregate allergens for this custom combination
  const activeAllergens = useMemo(() => {
    const set = new Set<AllergenKey>();
    MEAT_OPTIONS[selectedMeat].allergens?.forEach((a) => set.add(a));
    CRUST_OPTIONS[selectedCrust].allergens?.forEach((a) => set.add(a));
    SAUCE_OPTIONS[selectedSauce].allergens?.forEach((a) => set.add(a));
    SIDE_OPTIONS[selectedSide].allergens?.forEach((a) => set.add(a));
    selectedExtras.forEach((e) => EXTRA_OPTIONS[e].allergens?.forEach((a) => set.add(a)));
    return Array.from(set);
  }, [selectedMeat, selectedCrust, selectedSauce, selectedSide, selectedExtras]);

  const toggleExtra = (extra: keyof typeof EXTRA_OPTIONS) => {
    setSelectedExtras((prev) =>
      prev.includes(extra) ? prev.filter((e) => e !== extra) : [...prev, extra]
    );
  };

  const handleAddToCart = () => {
    const config: SchnitzelConfig = {
      id: `schnitzel-${Date.now()}`,
      meat: selectedMeat,
      size: selectedSize,
      crust: selectedCrust,
      sauce: selectedSauce,
      sauceSeparated,
      side: selectedSide,
      extras: selectedExtras,
      specialInstructions: notes.trim() || undefined,
      unitPrice: totalPrice,
      allergens: activeAllergens,
    };

    addCustomSchnitzel(config);

    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#E6B84A', '#FFFFFF'],
      });
    } catch {
      // Ignore
    }
  };

  const resetConfig = () => {
    setSelectedMeat('haehnchen');
    setSelectedSize('normal');
    setSelectedCrust('klassik_gold');
    setSelectedSauce('champignon_rahm');
    setSauceSeparated(true);
    setSelectedSide('pommes_knusprig');
    setSelectedExtras(['preiselbeeren']);
    setNotes('');
    setCurrentStep(1);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#E6B84A]/30 bg-[#E6B84A]/10 px-4 py-1.5 text-xs font-bold text-[#E6B84A] mb-4">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Der Digitale Schmiede-Baukasten 2026</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#FDFBF7]">
          Bauen Sie Ihr Meister-Schnitzel
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[#C4BFB5]">
          Wählen Sie Fleisch, Knusperpanade, hausgemachte Saucen und knusprige Beilagen.
          Frisch von Hand geklopft und in reinem Butterschmalz souffliert.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: 4-Step Wizard */}
        <div className="lg:col-span-8 space-y-6">
          {/* Step Navigation Pills */}
          <div className="grid grid-cols-4 gap-2 rounded-2xl bg-[#141418] p-2 border border-white/5">
            {[
              { step: 1 as const, title: '1. Fleisch', icon: Flame },
              { step: 2 as const, title: '2. Panade', icon: Layers },
              { step: 3 as const, title: '3. Sauce', icon: Soup },
              { step: 4 as const, title: '4. Beilagen', icon: UtensilsCrossed },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = currentStep === tab.step;
              return (
                <button
                  key={tab.step}
                  onClick={() => setCurrentStep(tab.step)}
                  className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 rounded-xl py-2.5 px-3 text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#E6B84A] text-[#0A0A0C] shadow-lg shadow-[#E6B84A]/25'
                      : 'text-[#C4BFB5] hover:bg-white/5 hover:text-[#FDFBF7]'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="truncate">{tab.title}</span>
                </button>
              );
            })}
          </div>

          {/* Wizard Step Content */}
          <div className="rounded-2xl border border-white/10 bg-[#121216] p-5 sm:p-7 shadow-xl">
            {/* STEP 1: FLEISCH & GRÖSSE */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-bold text-[#FDFBF7] flex items-center justify-between">
                    <span>1. Wählen Sie Ihre Fleischart</span>
                    <span className="text-xs font-normal text-[#C4BFB5]">
                      Frisch aus regionaler Schlachtung
                    </span>
                  </h3>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.entries(MEAT_OPTIONS).map(([key, opt]) => {
                      const meatKey = key as keyof typeof MEAT_OPTIONS;
                      const isSelected = selectedMeat === meatKey;
                      return (
                        <div
                          key={key}
                          onClick={() => setSelectedMeat(meatKey)}
                          className={`relative cursor-pointer rounded-xl border p-4 transition-all ${
                            isSelected
                              ? 'border-[#E6B84A] bg-[#E6B84A]/10 shadow-md shadow-[#E6B84A]/10'
                              : 'border-white/5 bg-[#181820] hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <span className="font-bold text-sm text-[#FDFBF7]">{opt.name}</span>
                            <div className="flex items-center gap-1.5">
                              {opt.badge && <Badge label={opt.badge} variant="gold" />}
                              <div
                                className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                                  isSelected
                                    ? 'border-[#E6B84A] bg-[#E6B84A] text-[#0A0A0C]'
                                    : 'border-white/20 bg-transparent'
                                }`}
                              >
                                {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                              </div>
                            </div>
                          </div>
                          <p className="mt-1 text-xs text-[#C4BFB5]">{opt.description}</p>
                          <div className="mt-3 text-xs font-semibold text-[#E6B84A]">
                            {opt.priceDelta === 0
                              ? 'Im Basispreis enthalten'
                              : `+${opt.priceDelta.toFixed(2).replace('.', ',')} €`}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5">
                  <h3 className="text-lg font-bold text-[#FDFBF7]">
                    Größe & Einwaage
                  </h3>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.entries(SIZE_OPTIONS).map(([key, opt]) => {
                      const sizeKey = key as keyof typeof SIZE_OPTIONS;
                      const isSelected = selectedSize === sizeKey;
                      return (
                        <div
                          key={key}
                          onClick={() => setSelectedSize(sizeKey)}
                          className={`cursor-pointer rounded-xl border p-4 transition-all ${
                            isSelected
                              ? 'border-[#E6B84A] bg-[#E6B84A]/10'
                              : 'border-white/5 bg-[#181820] hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <span className="font-bold text-sm text-[#FDFBF7]">{opt.name}</span>
                            {opt.badge && <Badge label={opt.badge} variant="gold" />}
                          </div>
                          <p className="mt-1 text-xs text-[#C4BFB5]">{opt.description}</p>
                          <div className="mt-2 text-xs font-semibold text-[#E6B84A]">
                            {opt.priceDelta === 0
                              ? 'Standard-Portion'
                              : `+${opt.priceDelta.toFixed(2).replace('.', ',')} €`}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="rounded-xl bg-[#E6B84A] px-6 py-2.5 text-sm font-bold text-[#0A0A0C] hover:bg-[#F5C75D] transition-colors"
                  >
                    Weiter zu Schritt 2: Panade &rarr;
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: PANADE */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-bold text-[#FDFBF7] flex items-center justify-between">
                    <span>2. Wählen Sie Ihre Knusper-Panade</span>
                    <span className="text-xs font-normal text-[#C4BFB5]">
                      Souffliert in reinem Butterschmalz
                    </span>
                  </h3>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.entries(CRUST_OPTIONS).map(([key, opt]) => {
                      const crustKey = key as keyof typeof CRUST_OPTIONS;
                      const isSelected = selectedCrust === crustKey;
                      return (
                        <div
                          key={key}
                          onClick={() => setSelectedCrust(crustKey)}
                          className={`relative cursor-pointer rounded-xl border p-4 transition-all ${
                            isSelected
                              ? 'border-[#E6B84A] bg-[#E6B84A]/10'
                              : 'border-white/5 bg-[#181820] hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <span className="font-bold text-sm text-[#FDFBF7]">{opt.name}</span>
                            {opt.badge && <Badge label={opt.badge} variant="gold" />}
                          </div>
                          <p className="mt-1 text-xs text-[#C4BFB5]">{opt.description}</p>
                          <div className="mt-3 text-xs font-semibold text-[#E6B84A]">
                            {opt.priceDelta === 0
                              ? 'Klassisch inklusive'
                              : `+${opt.priceDelta.toFixed(2).replace('.', ',')} €`}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="rounded-xl border border-white/10 px-5 py-2 text-sm text-[#C4BFB5] hover:text-[#FDFBF7] transition-colors"
                  >
                    &larr; Zurück
                  </button>
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="rounded-xl bg-[#E6B84A] px-6 py-2.5 text-sm font-bold text-[#0A0A0C] hover:bg-[#F5C75D] transition-colors"
                  >
                    Weiter zu Schritt 3: Sauce &rarr;
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: SAUCE */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-bold text-[#FDFBF7] flex items-center justify-between">
                    <span>3. Hausgemachte Schmiede-Sauce</span>
                    <span className="text-xs font-normal text-[#C4BFB5]">
                      Täglich frisch eingekocht
                    </span>
                  </h3>

                  {/* Sauce Packaging Toggle (Crucial for crisp delivery) */}
                  <div className="mt-3 rounded-xl border border-[#E6B84A]/30 bg-[#E6B84A]/10 p-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck className="h-5 w-5 text-[#E6B84A] shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-[#FDFBF7]">
                          Knusper-Garantie: Sauce separat verpacken
                        </div>
                        <div className="text-[11px] text-[#C4BFB5]">
                          Verhindert matschige Panade beim Transport und zu Hause.
                        </div>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={sauceSeparated}
                        onChange={(e) => setSauceSeparated(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-[#22222A] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E6B84A]"></div>
                    </label>
                  </div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.entries(SAUCE_OPTIONS).map(([key, opt]) => {
                      const sauceKey = key as keyof typeof SAUCE_OPTIONS;
                      const isSelected = selectedSauce === sauceKey;
                      return (
                        <div
                          key={key}
                          onClick={() => setSelectedSauce(sauceKey)}
                          className={`cursor-pointer rounded-xl border p-4 transition-all ${
                            isSelected
                              ? 'border-[#E6B84A] bg-[#E6B84A]/10'
                              : 'border-white/5 bg-[#181820] hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <span className="font-bold text-sm text-[#FDFBF7]">{opt.name}</span>
                            {opt.badge && <Badge label={opt.badge} variant="gold" />}
                          </div>
                          <p className="mt-1 text-xs text-[#C4BFB5]">{opt.description}</p>
                          <div className="mt-3 text-xs font-semibold text-[#E6B84A]">
                            {opt.priceDelta === 0
                              ? 'Inklusive'
                              : `+${opt.priceDelta.toFixed(2).replace('.', ',')} €`}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="rounded-xl border border-white/10 px-5 py-2 text-sm text-[#C4BFB5] hover:text-[#FDFBF7] transition-colors"
                  >
                    &larr; Zurück
                  </button>
                  <button
                    onClick={() => setCurrentStep(4)}
                    className="rounded-xl bg-[#E6B84A] px-6 py-2.5 text-sm font-bold text-[#0A0A0C] hover:bg-[#F5C75D] transition-colors"
                  >
                    Weiter zu Schritt 4: Beilagen &rarr;
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: BEILAGEN & EXTRAS */}
            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-bold text-[#FDFBF7]">
                    4. Wählen Sie Ihre Hauptbeilage
                  </h3>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.entries(SIDE_OPTIONS).map(([key, opt]) => {
                      const sideKey = key as keyof typeof SIDE_OPTIONS;
                      const isSelected = selectedSide === sideKey;
                      return (
                        <div
                          key={key}
                          onClick={() => setSelectedSide(sideKey)}
                          className={`cursor-pointer rounded-xl border p-4 transition-all ${
                            isSelected
                              ? 'border-[#E6B84A] bg-[#E6B84A]/10'
                              : 'border-white/5 bg-[#181820] hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <span className="font-bold text-sm text-[#FDFBF7]">{opt.name}</span>
                            {opt.badge && <Badge label={opt.badge} variant="gold" />}
                          </div>
                          <p className="mt-1 text-xs text-[#C4BFB5]">{opt.description}</p>
                          <div className="mt-3 text-xs font-semibold text-[#E6B84A]">
                            {opt.priceDelta === 0
                              ? 'Inklusive'
                              : `+${opt.priceDelta.toFixed(2).replace('.', ',')} €`}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Gourmet Extras */}
                <div className="pt-6 border-t border-white/5">
                  <h3 className="text-lg font-bold text-[#FDFBF7] flex items-center justify-between">
                    <span>Gourmet-Extras & Toppings</span>
                    <span className="text-xs font-normal text-[#C4BFB5]">Mehrfachauswahl möglich</span>
                  </h3>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.entries(EXTRA_OPTIONS).map(([key, opt]) => {
                      const extraKey = key as keyof typeof EXTRA_OPTIONS;
                      const isSelected = selectedExtras.includes(extraKey);
                      return (
                        <div
                          key={key}
                          onClick={() => toggleExtra(extraKey)}
                          className={`cursor-pointer rounded-xl border p-3.5 transition-all flex items-start justify-between ${
                            isSelected
                              ? 'border-[#E6B84A] bg-[#E6B84A]/10'
                              : 'border-white/5 bg-[#181820] hover:border-white/20'
                          }`}
                        >
                          <div>
                            <div className="text-sm font-bold text-[#FDFBF7]">{opt.name}</div>
                            <div className="text-xs text-[#C4BFB5] mt-0.5">{opt.description}</div>
                            <div className="text-xs font-semibold text-[#E6B84A] mt-1.5">
                              +{opt.priceDelta.toFixed(2).replace('.', ',')} €
                            </div>
                          </div>
                          <div
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                              isSelected
                                ? 'border-[#E6B84A] bg-[#E6B84A] text-[#0A0A0C]'
                                : 'border-white/20 bg-transparent'
                            }`}
                          >
                            {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Special Instructions */}
                <div className="pt-4 border-t border-white/5">
                  <label className="block text-xs font-bold text-[#C4BFB5] uppercase tracking-wider mb-1.5">
                    Besondere Zubereitungswünsche an die Schmiede (optional)
                  </label>
                  <input
                    type="text"
                    maxLength={160}
                    placeholder="z.B. Zitrone extra dick schneiden, Sauce sehr heiß"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full rounded-xl bg-[#181820] border border-white/10 px-4 py-2.5 text-sm text-[#FDFBF7] focus:border-[#E6B84A] focus:outline-none"
                  />
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="rounded-xl border border-white/10 px-5 py-2 text-sm text-[#C4BFB5] hover:text-[#FDFBF7] transition-colors"
                  >
                    &larr; Zurück
                  </button>
                  <button
                    onClick={handleAddToCart}
                    className="rounded-xl bg-[#E6B84A] px-7 py-3 text-sm font-black text-[#0A0A0C] hover:bg-[#F5C75D] shadow-lg shadow-[#E6B84A]/25 transition-all flex items-center gap-2"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    <span>In den Warenkorb ({totalPrice.toFixed(2).replace('.', ',')} €)</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Right Column: Live Sticky Summary Card */}
        <div className="lg:col-span-4 sticky top-24 space-y-4">
          <div className="rounded-2xl border border-[#E6B84A]/30 bg-[#141418] p-5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 h-32 w-32 rounded-full bg-[#E6B84A]/10 blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-[11px] font-bold text-[#E6B84A] uppercase tracking-widest">
                  Live Konfiguration
                </span>
                <h3 className="text-lg font-extrabold text-[#FDFBF7]">Ihr Schmiede-Unikat</h3>
              </div>
              <button
                onClick={resetConfig}
                className="text-[#C4BFB5] hover:text-[#FDFBF7] p-1.5 rounded-lg hover:bg-white/5 transition-colors"
                title="Zurücksetzen"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>

            <div className="py-4 space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-[#C4BFB5]">Basis:</span>
                <span className="font-semibold text-[#FDFBF7] text-right">
                  {MEAT_OPTIONS[selectedMeat].name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#C4BFB5]">Portion:</span>
                <span className="font-semibold text-[#FDFBF7] text-right">
                  {SIZE_OPTIONS[selectedSize].name.split('(')[0]}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#C4BFB5]">Kruste:</span>
                <span className="font-semibold text-[#FDFBF7] text-right">
                  {CRUST_OPTIONS[selectedCrust].name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#C4BFB5]">Sauce:</span>
                <span className="font-semibold text-[#FDFBF7] text-right">
                  {SAUCE_OPTIONS[selectedSauce].name}
                  {sauceSeparated && (
                    <span className="block text-[10px] text-[#E6B84A]">separat verpackt</span>
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#C4BFB5]">Beilage:</span>
                <span className="font-semibold text-[#FDFBF7] text-right">
                  {SIDE_OPTIONS[selectedSide].name}
                </span>
              </div>
              {selectedExtras.length > 0 && (
                <div className="flex justify-between">
                  <span className="text-[#C4BFB5]">Extras:</span>
                  <span className="font-semibold text-[#FDFBF7] text-right">
                    {selectedExtras.map((e) => EXTRA_OPTIONS[e].name).join(', ')}
                  </span>
                </div>
              )}
            </div>

            {/* Allergens Info Button */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => setIsAllergenModalOpen(true)}
                className="inline-flex items-center gap-1.5 text-[11px] text-[#C4BFB5] hover:text-[#E6B84A] transition-colors"
              >
                <Info className="h-3.5 w-3.5 text-[#E6B84A]" />
                <span>Allergene: {activeAllergens.join(', ')} (Ansehen)</span>
              </button>
            </div>

            {/* Live Price Display & Add To Cart Button */}
            <div className="mt-5 pt-4 border-t border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#C4BFB5]">Preis inkl. MwSt.:</span>
                <span className="text-2xl font-black font-mono text-[#E6B84A]">
                  {totalPrice.toFixed(2).replace('.', ',')} €
                </span>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#E6B84A] via-[#F5C75D] to-[#E6B84A] py-3.5 text-sm font-black text-[#0A0A0C] shadow-lg shadow-[#E6B84A]/25 hover:shadow-[#E6B84A]/40 transition-all cursor-pointer"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>In den Warenkorb legen</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* LMIV Allergen Transparency Modal */}
      <AllergenModal
        isOpen={isAllergenModalOpen}
        onClose={() => setIsAllergenModalOpen(false)}
        activeAllergens={activeAllergens}
      />
    </div>
  );
}
