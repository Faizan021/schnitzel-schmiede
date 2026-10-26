'use client';

import React, { useState, useDeferredValue, useMemo } from 'react';
import {
  Search,
  Plus,
  Info,
  Check,
  ChefHat,
  SlidersHorizontal,
} from 'lucide-react';
import { MENU_ITEMS } from '@/lib/data/menu';
import { MenuItem, AllergenKey, DietaryTag, MenuItemCategory } from '@/lib/types/menu';
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

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: t.menu.allDishes },
    { id: 'schnitzel', label: isEn ? 'Schnitzel (200g)' : 'Schnitzel (ca. 200g)' },
    { id: 'schnitzel_110g', label: isEn ? 'Small (110g)' : 'Kleine Schnitzel (ca. 110g)' },
    { id: 'specials', label: isEn ? 'Gratinated' : 'Schnitzel Überbacken' },
    { id: 'party', label: isEn ? 'Party Catering' : 'Die Schnitzel-Party' },
    { id: 'burgers', label: isEn ? 'Burgers & Steaks' : 'Burger & Hacksteaks' },
    { id: 'fries', label: isEn ? 'Sides & Classics' : 'Beilagen & Hausgemachtes' },
    { id: 'salads', label: isEn ? 'Fresh Salads' : 'Frische Salate' },
    { id: 'desserts', label: isEn ? 'Desserts' : 'Desserts' },
    { id: 'drinks', label: isEn ? 'Drinks' : 'Getränke' },
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

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Category Tabs & Filter Toolbar */}
      <div className="space-y-4 mb-10">
        {/* Search & Dietary Bar */}
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#2e5f7e]" />
            <input
              type="text"
              placeholder={t.menu.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl bg-white/85 backdrop-blur-md border border-[#b8d4e8] pl-10 pr-4 py-2.5 text-xs text-[#1a3a52] placeholder-[#2e5f7e]/60 focus:border-[#9bc1d9] focus:outline-none transition-colors shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#2e5f7e] hover:text-[#1a3a52]"
              >
                ✕
              </button>
            )}
          </div>

          {/* Dietary Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {[
              { id: 'all' as const, label: t.menu.filterAll },
              { id: 'regional' as const, label: t.menu.filterRegional },
              { id: 'veggie' as const, label: t.menu.filterVeggie },
              { id: 'bestseller' as const, label: t.menu.filterBestseller },
              { id: 'chef_special' as const, label: t.menu.filterChef },
            ].map((diet) => (
              <button
                key={diet.id}
                onClick={() => setSelectedDietary(diet.id)}
                className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                  selectedDietary === diet.id
                    ? 'bg-[#9bc1d9] text-[#1a3a52] shadow-sm font-black'
                    : 'bg-white/80 text-[#2e5f7e] hover:text-[#1a3a52] border border-[#b8d4e8]'
                }`}
              >
                {diet.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills (Horizontal Scrollable) */}
        <div className="flex items-center gap-2 overflow-x-auto py-2 scrollbar-none border-b border-[#b8d4e8]/60">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`whitespace-nowrap rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#9bc1d9] text-[#1a3a52] shadow-sm font-black'
                  : 'bg-white/80 text-[#2e5f7e] hover:bg-[#cce3f1] hover:text-[#1a3a52] border border-[#b8d4e8]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Speisekarte Grid */}
      <div>
        {isDefaultView && (
          <div className="flex items-center gap-2 mb-6">
            <SlidersHorizontal className="h-4 w-4 text-[#2e5f7e]" />
            <h3 className="text-xl sm:text-2xl font-bold text-[#1a3a52] font-serif">
              {isEn ? 'Handcrafted Menu · Authentic Selection' : 'Original Speisekarte der Schnitzelschmiede'}
            </h3>
          </div>
        )}

        {filteredItems.length === 0 ? (
          <div className="rounded-2xl border border-[#b8d4e8] bg-white/80 p-12 text-center max-w-md mx-auto my-12 shadow-sm">
            <ChefHat className="h-12 w-12 text-[#2e5f7e] mx-auto mb-3 opacity-60" />
            <h3 className="text-lg font-bold text-[#1a3a52] font-serif">{t.menu.noDishesFound}</h3>
            <p className="mt-1 text-xs text-[#2e5f7e]">{t.menu.noDishesDesc}</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedDietary('all');
              }}
              className="mt-4 rounded-xl bg-[#9bc1d9] hover:bg-[#85b0cb] px-4 py-2 text-xs font-bold text-[#1a3a52] cursor-pointer"
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
                  className="flex flex-col h-full bg-white/85 backdrop-blur-md border border-white/95 shadow-md shadow-[#1a3a52]/5 overflow-hidden hover:border-[#9bc1d9] hover:shadow-xl transition-all duration-300 group rounded-2xl"
                >
                  {/* Header Bar for Typography-only Cards */}
                  <div className="px-5 pt-5 pb-2 flex items-center justify-between border-b border-[#b8d4e8]/50">
                    <div className="flex flex-wrap gap-1.5">
                      {dish.tags.map((tag) => (
                        <Badge key={tag} tag={tag} />
                      ))}
                    </div>
                    {dish.defaultPortion && (
                      <span className="text-[10px] font-medium text-[#2e5f7e] bg-[#f0f7fb] border border-[#b8d4e8] px-2 py-0.5 rounded-md">
                        {dish.defaultPortion}
                      </span>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="flex flex-1 flex-col p-5 justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-base font-bold text-[#1a3a52] font-serif group-hover:text-[#2e5f7e] transition-colors leading-snug">
                          {displayName}
                        </h3>
                        <span className="font-serif text-base font-bold text-[#1a3a52] whitespace-nowrap ml-2">
                          {dish.price.toFixed(2).replace('.', ',')} €
                        </span>
                      </div>

                      {displaySubtitle && (
                        <p className="text-xs font-semibold text-[#2e5f7e] mt-1">
                          {displaySubtitle}
                        </p>
                      )}

                      <p className="mt-2 text-xs text-[#2e5f7e] leading-relaxed line-clamp-3">
                        {displayDesc}
                      </p>
                    </div>

                    {/* Card Footer: Allergens + Action Buttons */}
                    <div className="mt-5 pt-4 border-t border-[#b8d4e8]/50 flex items-center justify-between gap-3">
                      {/* Allergen Key Badges */}
                      <button
                        onClick={() => setActiveAllergenModal(dish.allergens)}
                        className="text-[10px] text-[#2e5f7e] hover:text-[#1a3a52] flex items-center gap-1 cursor-pointer transition-colors"
                        title={isEn ? 'View Allergens' : 'Allergene anzeigen'}
                      >
                        <Info className="h-3 w-3 text-[#2e5f7e]" />
                        <span>
                          {dish.allergens.length > 0
                            ? `Allergene: ${dish.allergens.join(', ')}`
                            : isEn
                            ? 'Allergen-free'
                            : 'Keine Allergene'}
                        </span>
                      </button>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleQuickAdd(dish)}
                          className="flex items-center gap-1.5 rounded-xl bg-[#9bc1d9] hover:bg-[#85b0cb] px-3.5 py-1.5 text-xs font-bold text-[#1a3a52] shadow-sm transition-all active:scale-95 cursor-pointer"
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
