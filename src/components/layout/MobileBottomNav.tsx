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

export function MobileBottomNav() {
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();

  const navItems = [
    { href: '/', label: 'Start', icon: Flame },
    { href: '/speisekarte', label: 'Menü', icon: UtensilsCrossed },
    { href: '/konfigurator', label: 'Baukasten', icon: Sparkles, highlight: true },
    { href: '/reservierung', label: 'Tisch', icon: Calendar },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0E0E12]/95 backdrop-blur-lg border-t border-white/10 px-2 py-1.5 shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
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
                  ? 'text-[#E6B84A] bg-[#E6B84A]/10'
                  : 'text-[#C4BFB5] hover:text-[#FDFBF7]'
              }`}
            >
              <Icon className={`h-5 w-5 ${item.highlight && !isActive ? 'text-[#E6B84A]' : ''}`} />
              <span className="text-[10px] font-bold mt-0.5 tracking-tight">{item.label}</span>
            </Link>
          );
        })}

        {/* Cart Trigger (48x48px touch target with badge) */}
        <button
          onClick={openCart}
          className="relative flex flex-col items-center justify-center min-w-[54px] min-h-[48px] rounded-xl px-1.5 py-1 text-[#C4BFB5] hover:text-[#E6B84A] transition-all"
          aria-label="Warenkorb öffnen"
        >
          <div className="relative">
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#E6B84A] text-[9px] font-black text-[#0A0A0C]">
                {itemCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold mt-0.5 tracking-tight">Korb</span>
        </button>
      </div>
    </div>
  );
}
