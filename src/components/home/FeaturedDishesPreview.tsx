'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  Plus,
  Check,
  ArrowRight,
  Flame,
  Info,
  UtensilsCrossed,
  ChefHat,
  Star,
  ShoppingBag,
} from 'lucide-react';
import { MENU_ITEMS } from '@/lib/data/menu';
import { MenuItem, AllergenKey } from '@/lib/types/menu';
import { useCart } from '../providers/CartContext';
import { useLanguage } from '../providers/LanguageContext';
import { AllergenModal } from '../ui/AllergenModal';

// Select 6 curated house signature bestsellers
const FEATURED_IDS = [
  'schnitzel-200g-wiener',
  'schnitzel-200g-jaeger',
  'schnitzel-200g-gladbacher',
  'schnitzel-200g-rahm',
  'ueberbacken-broccoli-schinken',
  'schnitzel-200g-hollaendisch',
];

export function FeaturedDishesPreview() {
  const { addStandardItem, openCart, calculations } = useCart();
  const { t, lang } = useLanguage();
  const isEn = lang === 'en';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  const [activeAllergenModal, setActiveAllergenModal] = useState<AllergenKey[] | null>(null);
  const [addedItemNotice, setAddedItemNotice] = useState<MenuItem | null>(null);

  const featuredDishes: MenuItem[] = FEATURED_IDS.map(
    (id) => MENU_ITEMS.find((item) => item.id === id)!
  ).filter(Boolean);

  const handleQuickAdd = (item: MenuItem) => {
    addStandardItem(item);
    setAddedItemNotice(item);
    setTimeout(() => {
      setAddedItemNotice(null);
    }, 2800);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 relative">
      {/* 6 Curated Dishes Grid with Warm Culinary Radiance */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredDishes.map((item) => {
          const isAdded = addedItemNotice?.id === item.id;
          const isGladbacher = item.id === 'schnitzel-200g-gladbacher';
          const isWiener = item.id === 'schnitzel-200g-wiener';
          const isGratinated = item.category === 'specials';

          return (
            <div
              key={item.id}
              className="group relative rounded-2xl bg-gradient-to-b from-white via-[#fffdfa] to-[#fffaf2] backdrop-blur-md border border-[#e8d5be] hover:border-[#d99036] shadow-[0_10px_30px_rgba(26,58,82,0.06)] hover:shadow-[0_16px_40px_rgba(217,144,54,0.14)] transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Top Accent Gradient Line with Golden Butter Glow */}
              <div
                className={`h-1.5 w-full ${
                  isGladbacher
                    ? 'bg-gradient-to-r from-[#d99036] via-[#f59e0b] to-[#16202a]'
                    : isWiener
                    ? 'bg-gradient-to-r from-[#d99036] to-[#ffecd2]'
                    : 'bg-gradient-to-r from-[#d99036] via-[#d99036] to-[#e8d5be]'
                }`}
              />

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Badge Row */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#fef3c7] text-[#92400e] border border-[#fde68a]">
                      {isGratinated ? (
                        <>
                          <Flame className="h-3 w-3 text-[#d99036]" />
                          <span>{isEn ? 'Gratinated Special' : 'Überbacken'}</span>
                        </>
                      ) : isGladbacher ? (
                        <>
                          <Star className="h-3 w-3 fill-[#d99036] text-[#d99036]" />
                          <span>{isEn ? 'House Specialty MG' : 'Gladbacher Spezialität'}</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-3 w-3 text-[#d99036]" />
                          <span>{isEn ? 'Signature Classic' : 'Klassiker Bestseller'}</span>
                        </>
                      )}
                    </span>

                    <span className="text-[11px] font-mono text-[#16202a] font-extrabold bg-[#ffecd2]/80 px-2 py-0.5 rounded-md border border-[#f5d0a9]">
                      {item.defaultPortion || 'ca. 200g'}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-black text-[#16202a] font-serif group-hover:text-[#b45309] transition-colors leading-snug">
                    {isEn ? item.nameEn || item.name : item.name}
                  </h3>

                  {/* Subtitle / Key Flavor */}
                  {item.subtitle && (
                    <p className="text-xs font-bold text-[#b45309] mt-1">
                      {isEn ? item.subtitleEn || item.subtitle : item.subtitle}
                    </p>
                  )}

                  {/* Description */}
                  <p className="text-xs text-[#4b3b2f] mt-2 leading-relaxed line-clamp-3">
                    {isEn ? item.descriptionEn || item.description : item.description}
                  </p>
                </div>

                {/* Footer of Card: Price & Quick Add */}
                <div className="pt-5 mt-4 border-t border-[#f5d0a9]/60 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-[#4b3b2f] tracking-wider">
                      {isEn ? 'Price' : 'Hauspreis'}
                    </div>
                    <div className="text-xl font-black text-[#16202a] font-mono tracking-tight">
                      {item.price.toFixed(2).replace('.', ',')} €
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Allergen Info Button */}
                    {item.allergens.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setActiveAllergenModal(item.allergens)}
                        className="h-10 w-10 rounded-xl bg-white border border-[#e8d5be] text-[#4b3b2f] hover:text-[#16202a] hover:bg-[#faf7f2] flex items-center justify-center transition-colors cursor-pointer"
                        title={isEn ? 'Allergen information' : 'Allergene & Inhaltsstoffe'}
                        aria-label="Allergene"
                      >
                        <Info className="h-4 w-4" />
                      </button>
                    )}

                    {/* Quick Add Button with Rich Warm Butter/Crust Gradient */}
                    <button
                      type="button"
                      onClick={() => handleQuickAdd(item)}
                      className={`h-10 px-4 rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md cursor-pointer active:scale-95 ${
                        isAdded
                          ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                          : 'bg-gradient-to-r from-[#d99036] to-[#b45309] hover:from-[#e09b43] hover:to-[#c25c0e] text-white shadow-[#d99036]/25 hover:shadow-lg'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="h-4 w-4 stroke-[3]" />
                          <span>{isEn ? 'Added' : 'Im Korb'}</span>
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4 stroke-[3]" />
                          <span>{isEn ? 'Add' : 'Bestellen'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Instant-Add Micro-Cart Confirmation Toast */}
      {addedItemNotice && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 w-[92vw] max-w-md animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="rounded-2xl bg-[#16202a] text-white p-3.5 shadow-2xl border-2 border-[#d99036] flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="h-9 w-9 rounded-xl bg-[#d99036] text-white flex items-center justify-center shrink-0 font-bold">
                <Check className="h-5 w-5 stroke-[3]" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-[#ffecd2] truncate">
                  {isEn ? 'Added to order:' : 'Zur Bestellung hinzugefügt:'}
                </p>
                <p className="text-xs font-extrabold text-white truncate">
                  {isEn ? addedItemNotice.nameEn || addedItemNotice.name : addedItemNotice.name}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={openCart}
              className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#d99036] to-[#b45309] text-white text-xs font-black uppercase tracking-wider hover:from-[#e09b43] hover:to-[#c25c0e] shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              <span>{isEn ? 'Open Cart' : 'Warenkorb'} ({calculations.total.toFixed(2).replace('.', ',')} €)</span>
            </button>
          </div>
        </div>
      )}

      {/* Prominent High-Converting Call-To-Action Banner (UX/UI Best Practice) */}
      <div className="mt-12 rounded-3xl bg-gradient-to-r from-white/95 via-[#fffdfa]/95 to-white/95 backdrop-blur-xl border border-[#e8d5be] p-6 sm:p-10 shadow-[0_20px_50px_rgba(217,144,54,0.09)]">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffedd5] text-[#9a3412] text-xs font-bold font-mono border border-[#fed7aa]">
              <UtensilsCrossed className="h-3.5 w-3.5" />
              <span>{isEn ? '56 Signature Dishes Online' : '56 Spezialitäten & Beilagen Online'}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#16202a] font-serif">
              {isEn ? 'Craving more? Discover our full menu' : 'Lust auf mehr? Entdecken Sie unsere gesamte Schmiede-Karte'}
            </h3>
            <p className="text-xs sm:text-sm text-[#4b3b2f] leading-relaxed">
              {isEn
                ? 'From small 110g portions to oven-gratinated specialties, homemade burgers, fresh garden salads, loaded fries and sweet desserts.'
                : 'Von kleinen 110g Portionen über ofenfrisch gratiniertes Schnitzel, saftige Burger & Hacksteaks bis hin zu knackigen Salaten, hausgemachten Saucen und Desserts.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <Link
              href="/speisekarte"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#d99036] to-[#b45309] hover:from-[#e09b43] hover:to-[#c25c0e] text-white font-black text-sm tracking-wider uppercase shadow-lg shadow-[#d99036]/25 hover:shadow-xl hover:shadow-[#d99036]/35 transition-all active:scale-95 cursor-pointer"
            >
              <span>{isEn ? 'Open Complete Menu (56 Items)' : 'Komplette Speisekarte ansehen (56 Gerichte)'}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Quick Category Discovery Pills */}
        <div className="mt-8 pt-6 border-t border-[#e8d5be]/80 flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs">
          <span className="text-[11px] font-bold text-[#b45309] uppercase tracking-wider mr-1">
            {isEn ? 'Direct categories:' : 'Direkt zu den Rubriken:'}
          </span>
          <Link
            href="/speisekarte"
            className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#ffedd5] border border-[#e8d5be] text-[#16202a] font-semibold transition-colors"
          >
            Schnitzel 200g
          </Link>
          <Link
            href="/speisekarte"
            className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#ffedd5] border border-[#e8d5be] text-[#16202a] font-semibold transition-colors"
          >
            Kleine Schnitzel 110g
          </Link>
          <Link
            href="/speisekarte"
            className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#ffedd5] border border-[#e8d5be] text-[#16202a] font-semibold transition-colors"
          >
            Überbackene Schnitzel
          </Link>
          <Link
            href="/speisekarte"
            className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#ffedd5] border border-[#e8d5be] text-[#16202a] font-semibold transition-colors"
          >
            Burger & Hacksteaks
          </Link>
          <Link
            href="/speisekarte"
            className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#ffedd5] border border-[#e8d5be] text-[#16202a] font-semibold transition-colors"
          >
            Beilagen & Salate
          </Link>
          <Link
            href="/catering"
            className="px-3 py-1.5 rounded-lg bg-[#d99036]/15 hover:bg-[#d99036]/25 border border-[#d99036]/40 text-[#b45309] font-bold transition-colors"
          >
            Party-Catering Angebote
          </Link>
        </div>
      </div>

      {/* Allergen Modal Portal */}
      <AllergenModal
        isOpen={Boolean(activeAllergenModal)}
        activeAllergens={activeAllergenModal || undefined}
        onClose={() => setActiveAllergenModal(null)}
      />
    </div>
  );
}
