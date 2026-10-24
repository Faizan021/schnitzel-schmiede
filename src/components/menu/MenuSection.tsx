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

      // Search query filter (INP optimized via deferredSearch)
      if (deferredSearch.trim()) {
        const query = deferredSearch.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query) || (item.nameEn?.toLowerCase().includes(query) || false);
        const matchesDesc = item.description.toLowerCase().includes(query) || (item.descriptionEn?.toLowerCase().includes(query) || false);
        const matchesSubtitle = (item.subtitle?.toLowerCase().includes(query) || false) || (item.subtitleEn?.toLowerCase().includes(query) || false);
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

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Category Tabs & Filter Toolbar */}
      <div className="space-y-4 mb-8">
        {/* Search & Dietary Bar */}
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#C4BFB5]" />
            <input
              type="text"
              placeholder={t.menu.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl bg-[#141418] border border-white/10 pl-10 pr-4 py-2.5 text-xs text-[#FDFBF7] placeholder-[#C4BFB5]/60 focus:border-[#E6B84A] focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#C4BFB5] hover:text-[#FDFBF7]"
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
                    ? 'bg-[#E6B84A] text-[#0A0A0C] shadow-md shadow-[#E6B84A]/20'
                    : 'bg-[#181820] text-[#C4BFB5] hover:text-[#FDFBF7] border border-white/5'
                }`}
              >
                {diet.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills (Horizontal Scrollable) */}
        <div className="flex items-center gap-2 overflow-x-auto py-2 scrollbar-none border-b border-white/5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`whitespace-nowrap rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-[#E6B84A] to-[#F5C75D] text-[#0A0A0C] shadow-lg shadow-[#E6B84A]/25'
                  : 'bg-[#121216] text-[#C4BFB5] hover:bg-white/5 hover:text-[#FDFBF7] border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Dish Grid */}
      {filteredItems.length === 0 ? (
        <div className="rounded-2xl border border-white/5 bg-[#121216] p-12 text-center max-w-md mx-auto my-12">
          <ChefHat className="h-12 w-12 text-[#E6B84A] mx-auto mb-3 opacity-60" />
          <h3 className="text-lg font-bold text-[#FDFBF7]">{t.menu.noDishesFound}</h3>
          <p className="mt-1 text-xs text-[#C4BFB5]">
            {t.menu.noDishesDesc}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedDietary('all');
            }}
            className="mt-4 rounded-xl bg-[#E6B84A] px-4 py-2 text-xs font-bold text-[#0A0A0C] cursor-pointer"
          >
            {t.menu.resetFilters}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((dish) => {
            const displayName = (isEn && dish.nameEn) ? dish.nameEn : dish.name;
            const displaySubtitle = (isEn && dish.subtitleEn) ? dish.subtitleEn : dish.subtitle;
            const displayDesc = (isEn && dish.descriptionEn) ? dish.descriptionEn : dish.description;

            return (
              <SpotlightCard
                key={dish.id}
                className="flex flex-col h-full bg-[#141418] border border-white/10 overflow-hidden hover:border-[#E6B84A]/40 transition-all duration-300 group"
              >
                {/* Dish Visual Header */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-neutral-900">
                  <Image
                    src={dish.image}
                    alt={displayName}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141418] via-transparent to-black/30" />

                  {/* Dietary Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {dish.tags.map((tag) => (
                      <Badge key={tag} tag={tag} />
                    ))}
                  </div>

                  {dish.defaultPortion && (
                    <span className="absolute bottom-3 right-3 rounded-md bg-black/60 backdrop-blur-md px-2 py-0.5 text-[10px] font-semibold text-[#FDFBF7]">
                      {dish.defaultPortion}
                    </span>
                  )}
                </div>

                {/* Card Body */}
                <div className="flex flex-1 flex-col p-5 justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-base font-bold text-[#FDFBF7] group-hover:text-[#E6B84A] transition-colors">
                        {displayName}
                      </h3>
                      <span className="font-mono text-base font-extrabold text-[#E6B84A] whitespace-nowrap">
                        {dish.price.toFixed(2).replace('.', ',')} €
                      </span>
                    </div>

                    {displaySubtitle && (
                      <p className="text-xs font-semibold text-[#E6B84A]/90 mt-0.5">
                        {displaySubtitle}
                      </p>
                    )}

                    <p className="mt-2 text-xs text-[#C4BFB5] line-clamp-3 leading-relaxed">
                      {displayDesc}
                    </p>
                  </div>

                  {/* Card Footer: Allergens + Action Buttons */}
                  <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                    {/* Allergen Key Badges */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setActiveAllergenModal(dish.allergens)}
                        className="text-[10px] text-[#C4BFB5] hover:text-[#E6B84A] flex items-center gap-1 cursor-pointer"
                        title={isEn ? "View Allergens" : "Allergene anzeigen"}
                      >
                        <Info className="h-3 w-3 text-[#E6B84A]" />
                        <span>{dish.allergens.length > 0 ? dish.allergens.join(', ') : (isEn ? 'None' : 'Keine')}</span>
                      </button>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      {dish.isCustomizable && (
                        <Link
                          href="/konfigurator"
                          className="rounded-xl border border-[#E6B84A]/30 bg-[#E6B84A]/10 px-3 py-2 text-xs font-bold text-[#E6B84A] hover:bg-[#E6B84A] hover:text-[#0A0A0C] transition-colors"
                        >
                          {t.menu.configureBtn}
                        </Link>
                      )}

                      <button
                        onClick={() => handleQuickAdd(dish)}
                        className="flex items-center gap-1.5 rounded-xl bg-[#E6B84A] px-3.5 py-2 text-xs font-black text-[#0A0A0C] hover:bg-[#F5C75D] shadow-md shadow-[#E6B84A]/20 transition-all active:scale-95 cursor-pointer"
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

      {/* Allergen Transparency Modal */}
      <AllergenModal
        isOpen={activeAllergenModal !== null}
        onClose={() => setActiveAllergenModal(null)}
        activeAllergens={activeAllergenModal || []}
      />
    </div>
  );
}
