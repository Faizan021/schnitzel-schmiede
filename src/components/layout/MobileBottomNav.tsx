'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  UtensilsCrossed,
  Sparkles,
  Calendar,
  ShoppingBag,
  Flame,
} from 'lucide-react';
import { useCart } from '../providers/CartContext';
import { useLanguage } from '../providers/LanguageContext';

export function MobileBottomNav() {
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();
  const { lang } = useLanguage();
  const isEn = lang === 'en';

  const navItems = [
    { href: '/', label: isEn ? 'Home' : 'Start', icon: Flame },
    { href: '/speisekarte', label: isEn ? 'Menu' : 'Menü', icon: UtensilsCrossed },
    { href: '/konfigurator', label: isEn ? 'Builder' : 'Baukasten', icon: Sparkles, highlight: true },
    { href: '/reservierung', label: isEn ? 'Table' : 'Tisch', icon: Calendar },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#161413]/95 backdrop-blur-lg border-t border-[#312B26] px-2 py-1.5 shadow-[0_-5px_20px_rgba(0,0,0,0.6)]">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center min-w-[54px] min-h-[48px] rounded-xl px-1.5 py-1 transition-all ${
                isActive
                  ? 'text-[#E5B24E] bg-[#D4A347]/15'
                  : 'text-[#D5CEBF] hover:text-[#FBF9F5]'
              }`}
            >
              <Icon className={`h-5 w-5 ${item.highlight && !isActive ? 'text-[#E5B24E]' : ''}`} />
              <span className="text-[10px] font-bold mt-0.5 tracking-tight">{item.label}</span>
            </Link>
          );
        })}

        {/* Cart Trigger (48x48px touch target with badge) */}
        <button
          onClick={openCart}
          className="relative flex flex-col items-center justify-center min-w-[54px] min-h-[48px] rounded-xl px-1.5 py-1 text-[#D5CEBF] hover:text-[#E5B24E] transition-all cursor-pointer"
          aria-label={isEn ? 'Open Cart' : 'Warenkorb öffnen'}
        >
          <div className="relative">
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#D4A347] text-[9px] font-black text-[#121110]">
                {itemCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold mt-0.5 tracking-tight">{isEn ? 'Cart' : 'Korb'}</span>
        </button>
      </div>
    </div>
  );
}
