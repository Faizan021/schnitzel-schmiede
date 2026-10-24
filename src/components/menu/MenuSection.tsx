'use client';

import React, { useState, useDeferredValue, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  Plus,
  Info,
  Check,
  ChefHat,
  Sparkles,
  SlidersHorizontal,
} from 'lucide-react';
import { MENU_ITEMS } from '@/lib/data/menu';
import { MenuItem, AllergenKey, DietaryTag } from '@/lib/types/menu';
import { useCart } from '../providers/CartContext';
import { useLanguage } from '../providers/LanguageContext';
import { Badge } from '../ui/Badge';
import { AllergenModal } from '../ui/AllergenModal';
import { SpotlightCard } from '../ui/SpotlightCard';

export function MenuSection() {
  const { addStandardItem } = useCart();
  const { t, lang } = useLanguage();
  const isEn = lang === 'en';

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const deferredSearch = useDeferredValue(searchQuery);
  const [selectedDietary, setSelectedDietary] = useState<DietaryTag | 'all'>('all');
  const [activeAllergenModal, setActiveAllergenModal] = useState<AllergenKey[] | null>(null);
  const [addedItemNotice, setAddedItemNotice] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: t.menu.allDishes },
    { id: 'schnitzel', label: t.menu.catClassics },
    { id: 'specials', label: t.menu.catSpecials },
    { id: 'burgers', label: t.menu.catBurgers },
    { id: 'fries', label: t.menu.catFries },
    { id: 'kids', label: t.menu.catKids },
    { id: 'desserts', label: t.menu.catDesserts },
    { id: 'drinks', label: t.menu.catDrinks },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Dietary filter
      if (selectedDietary !== 'all' && !item.tags.includes(selectedDietary)) {
        return false;
      }

      // Search query filter
      if (deferredSearch.trim()) {
        const query = deferredSearch.toLowerCase();
        const matchesName =
          item.name.toLowerCase().includes(query) ||
          (item.nameEn?.toLowerCase().includes(query) || false);
        const matchesDesc =
          item.description.toLowerCase().includes(query) ||
          (item.descriptionEn?.toLowerCase().includes(query) || false);
        const matchesSubtitle =
          (item.subtitle?.toLowerCase().includes(query) || false) ||
          (item.subtitleEn?.toLowerCase().includes(query) || false);
        if (!matchesName && !matchesDesc && !matchesSubtitle) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, selectedDietary, deferredSearch]);

  const handleQuickAdd = (item: MenuItem) => {
    addStandardItem(item);
    setAddedItemNotice(item.id);
    setTimeout(() => {
      setAddedItemNotice(null);
    }, 1200);
  };

  const isDefaultView = selectedCategory === 'all' && !deferredSearch.trim() && selectedDietary === 'all';
  const masterpieceDishes = useMemo(() => {
    return MENU_ITEMS.filter((item) => Boolean(item.image));
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Category Tabs & Filter Toolbar */}
      <div className="space-y-4 mb-10">
        {/* Search & Dietary Bar */}
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#D5CEBF]" />
            <input
              type="text"
              placeholder={t.menu.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl bg-[#1C1A18] border border-[#312B26] pl-10 pr-4 py-2.5 text-xs text-[#FBF9F5] placeholder-[#D5CEBF]/60 focus:border-[#D4A347] focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#D5CEBF] hover:text-[#FBF9F5]"
              >
                ✕
              </button>
            )}
          </div>

          {/* Dietary Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {[
              { id: 'all' as const, label: t.menu.filterAll },
              { id: 'halal' as const, label: t.menu.filterHalal },
              { id: 'veggie' as const, label: t.menu.filterVeggie },
              { id: 'bestseller' as const, label: t.menu.filterBestseller },
              { id: 'chef_special' as const, label: t.menu.filterChef },
            ].map((diet) => (
              <button
                key={diet.id}
                onClick={() => setSelectedDietary(diet.id)}
                className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                  selectedDietary === diet.id
                    ? 'bg-[#D4A347] text-[#121110] shadow-md shadow-[#D4A347]/20'
                    : 'bg-[#1F1C1A] text-[#D5CEBF] hover:text-[#FBF9F5] border border-[#312B26]'
                }`}
              >
                {diet.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills (Horizontal Scrollable) */}
        <div className="flex items-center gap-2 overflow-x-auto py-2 scrollbar-none border-b border-[#312B26]">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`whitespace-nowrap rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-[#D4A347] to-[#E5B24E] text-[#121110] shadow-lg shadow-[#D4A347]/25'
                  : 'bg-[#191715] text-[#D5CEBF] hover:bg-[#23201C] hover:text-[#FBF9F5] border border-[#312B26]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Masterpieces Showcase (Only in default All view) */}
      {isDefaultView && masterpieceDishes.length > 0 && (
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold text-[#E5B24E] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                {isEn ? 'Culinary Highlights' : 'Meisterstücke des Hauses'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#FBF9F5] font-serif mt-1">
                {isEn ? 'Signature Creations with Original Photos' : 'Aus unserer Küche frisch fotografiert'}
              </h3>
            </div>
            <span className="text-xs text-[#C4BFB5] hidden sm:block">
              {isEn ? '100% Authentic Photos' : '100% Echte Fotos'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {masterpieceDishes.map((dish) => {
              const displayName = isEn && dish.nameEn ? dish.nameEn : dish.name;
              const displaySubtitle = isEn && dish.subtitleEn ? dish.subtitleEn : dish.subtitle;
              const displayDesc = isEn && dish.descriptionEn ? dish.descriptionEn : dish.description;

              return (
                <SpotlightCard
                  key={`feat-${dish.id}`}
                  className="flex flex-col sm:flex-row bg-[#1C1A18] border border-[#D4A347]/30 overflow-hidden hover:border-[#D4A347] transition-all duration-300 group rounded-2xl"
                >
                  {/* Photo Section */}
                  <div className="relative h-56 sm:h-auto sm:min-h-[220px] sm:w-1/2 overflow-hidden bg-black/40">
                    <Image
                      src={dish.image!}
                      alt={displayName}
                      fill
                      sizes="(max-width: 768px) 100vw, 320px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A18] via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-[#1C1A18] opacity-80" />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                      {dish.tags.map((tag) => (
                        <Badge key={tag} tag={tag} />
                      ))}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex flex-1 flex-col p-5 justify-between sm:w-1/2">
                    <div>
                      <div className="flex items-baseline justify-between gap-2">
                        <h4 className="text-base sm:text-lg font-bold text-[#FBF9F5] font-serif group-hover:text-[#E5B24E] transition-colors">
                          {displayName}
                        </h4>
                      </div>
                      <div className="font-serif text-lg font-bold text-[#E5B24E] mt-0.5">
                        {dish.price.toFixed(2).replace('.', ',')} €
                      </div>

                      {displaySubtitle && (
                        <p className="text-xs font-semibold text-[#E5B24E]/90 mt-1">
                          {displaySubtitle}
                        </p>
                      )}

                      <p className="mt-2 text-xs text-[#D5CEBF] line-clamp-3 leading-relaxed">
                        {displayDesc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#312B26] flex items-center justify-between gap-2">
                      <button
                        onClick={() => setActiveAllergenModal(dish.allergens)}
                        className="text-[10px] text-[#C4BFB5] hover:text-[#E5B24E] flex items-center gap-1 cursor-pointer"
                        title={isEn ? 'View Allergens' : 'Allergene anzeigen'}
                      >
                        <Info className="h-3 w-3 text-[#E5B24E]" />
                        <span>{dish.allergens.length > 0 ? dish.allergens.join(', ') : 'Keine'}</span>
                      </button>

                      <div className="flex items-center gap-1.5">
                        {dish.isCustomizable && (
                          <Link
                            href="/konfigurator"
                            className="rounded-lg border border-[#D4A347]/30 bg-[#D4A347]/10 px-2.5 py-1.5 text-[11px] font-bold text-[#E5B24E] hover:bg-[#D4A347] hover:text-[#121110] transition-colors"
                          >
                            {t.menu.configureBtn}
                          </Link>
                        )}
                        <button
                          onClick={() => handleQuickAdd(dish)}
                          className="flex items-center gap-1 rounded-lg bg-[#D4A347] px-3 py-1.5 text-xs font-bold text-[#121110] hover:bg-[#E5B24E] shadow-sm transition-all cursor-pointer"
                        >
                          {addedItemNotice === dish.id ? (
                            <Check className="h-3.5 w-3.5" />
                          ) : (
                            <Plus className="h-3.5 w-3.5" />
                          )}
                          <span>{addedItemNotice === dish.id ? t.menu.addedBtn : t.menu.addToCartBtn}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Speisekarte Grid / Bistro List */}
      <div>
        {isDefaultView && (
          <div className="flex items-center gap-2 mb-6">
            <SlidersHorizontal className="h-4 w-4 text-[#E5B24E]" />
            <h3 className="text-xl sm:text-2xl font-bold text-[#FBF9F5] font-serif">
              {isEn ? 'Full Selection & Specialties' : 'Gesamte Speisekarte der Schmiede'}
            </h3>
          </div>
        )}

        {filteredItems.length === 0 ? (
          <div className="rounded-2xl border border-[#312B26] bg-[#191715] p-12 text-center max-w-md mx-auto my-12">
            <ChefHat className="h-12 w-12 text-[#E5B24E] mx-auto mb-3 opacity-60" />
            <h3 className="text-lg font-bold text-[#FBF9F5] font-serif">{t.menu.noDishesFound}</h3>
            <p className="mt-1 text-xs text-[#D5CEBF]">{t.menu.noDishesDesc}</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedDietary('all');
              }}
              className="mt-4 rounded-xl bg-[#D4A347] px-4 py-2 text-xs font-bold text-[#121110] cursor-pointer"
            >
              {t.menu.resetFilters}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((dish) => {
              const displayName = isEn && dish.nameEn ? dish.nameEn : dish.name;
              const displaySubtitle = isEn && dish.subtitleEn ? dish.subtitleEn : dish.subtitle;
              const displayDesc = isEn && dish.descriptionEn ? dish.descriptionEn : dish.description;

              return (
                <SpotlightCard
                  key={dish.id}
                  className="flex flex-col h-full bg-[#1C1A18] border border-[#312B26] overflow-hidden hover:border-[#D4A347]/50 transition-all duration-300 group rounded-2xl"
                >
                  {/* Photo Header (if photo exists) */}
                  {dish.image && (
                    <div className="relative h-44 w-full overflow-hidden bg-black/40 border-b border-[#312B26]">
                      <Image
                        src={dish.image}
                        alt={displayName}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A18] via-transparent to-transparent opacity-85" />
                      <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
                        {dish.tags.map((tag) => (
                          <Badge key={tag} tag={tag} />
                        ))}
                      </div>
                      <span className="absolute bottom-2 right-2 rounded-full bg-black/75 backdrop-blur-md border border-[#D4A347]/40 px-2 py-0.5 text-[9px] font-bold text-[#E5B24E]">
                        {isEn ? 'Original Photo' : 'Original-Foto'}
                      </span>
                    </div>
                  )}

                  {/* Header Bar for Typography-only Cards (NO empty gray box!) */}
                  {!dish.image && (
                    <div className="px-5 pt-5 pb-1 flex items-center justify-between border-b border-[#312B26]/60">
                      <div className="flex flex-wrap gap-1.5">
                        {dish.tags.map((tag) => (
                          <Badge key={tag} tag={tag} />
                        ))}
                      </div>
                      {dish.defaultPortion && (
                        <span className="text-[10px] font-medium text-[#C4BFB5] bg-[#23201C] border border-[#312B26] px-2 py-0.5 rounded-md">
                          {dish.defaultPortion}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Card Body */}
                  <div className="flex flex-1 flex-col p-5 justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-base font-bold text-[#FBF9F5] font-serif group-hover:text-[#E5B24E] transition-colors">
                          {displayName}
                        </h3>
                        <span className="font-serif text-base font-bold text-[#E5B24E] whitespace-nowrap">
                          {dish.price.toFixed(2).replace('.', ',')} €
                        </span>
                      </div>

                      {displaySubtitle && (
                        <p className="text-xs font-semibold text-[#E5B24E]/90 mt-0.5">
                          {displaySubtitle}
                        </p>
                      )}

                      <p className="mt-2 text-xs text-[#D5CEBF] line-clamp-3 leading-relaxed">
                        {displayDesc}
                      </p>
                    </div>

                    {/* Card Footer: Allergens + Action Buttons */}
                    <div className="mt-5 pt-4 border-t border-[#312B26] flex items-center justify-between gap-3">
                      {/* Allergen Key Badges */}
                      <button
                        onClick={() => setActiveAllergenModal(dish.allergens)}
                        className="text-[10px] text-[#C4BFB5] hover:text-[#E5B24E] flex items-center gap-1 cursor-pointer"
                        title={isEn ? 'View Allergens' : 'Allergene anzeigen'}
                      >
                        <Info className="h-3 w-3 text-[#E5B24E]" />
                        <span>
                          {dish.allergens.length > 0
                            ? dish.allergens.join(', ')
                            : isEn
                            ? 'None'
                            : 'Keine'}
                        </span>
                      </button>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        {dish.isCustomizable && (
                          <Link
                            href="/konfigurator"
                            className="rounded-xl border border-[#D4A347]/30 bg-[#D4A347]/10 px-3 py-1.5 text-xs font-bold text-[#E5B24E] hover:bg-[#D4A347] hover:text-[#121110] transition-colors"
                          >
                            {t.menu.configureBtn}
                          </Link>
                        )}

                        <button
                          onClick={() => handleQuickAdd(dish)}
                          className="flex items-center gap-1.5 rounded-xl bg-[#D4A347] px-3.5 py-1.5 text-xs font-bold text-[#121110] hover:bg-[#E5B24E] shadow-sm transition-all active:scale-95 cursor-pointer"
                        >
                          {addedItemNotice === dish.id ? (
                            <>
                              <Check className="h-3.5 w-3.5" />
                              <span>{t.menu.addedBtn}</span>
                            </>
                          ) : (
                            <>
                              <Plus className="h-3.5 w-3.5" />
                              <span>{t.menu.addToCartBtn}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        )}
      </div>

      {/* Allergen Transparency Modal */}
      <AllergenModal
        isOpen={activeAllergenModal !== null}
        onClose={() => setActiveAllergenModal(null)}
        activeAllergens={activeAllergenModal || []}
      />
    </div>
  );
}
