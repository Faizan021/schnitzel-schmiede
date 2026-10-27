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
  MessageSquare,
} from 'lucide-react';
import { useCart } from '../providers/CartContext';
import { useLanguage } from '../providers/LanguageContext';
import { getKitchenWhatsAppNumber } from '@/lib/utils/whatsapp';

export function MobileBottomNav() {
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();
  const { lang } = useLanguage();
  const isEn = lang === 'en';
  const whatsappPhone = getKitchenWhatsAppNumber();

  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
    '🔥 [SCHNITZEL SCHMIEDE MÖNCHENGLADBACH · Dohler Str. 269]\n\nHallo Schnitzelschmiede, ich möchte gerne eine Frage stellen / bestellen:'
  )}`;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-[#e8d5be] px-2 py-1 shadow-[0_-5px_25px_rgba(217,144,54,0.12)]">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* Start / Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center min-w-[50px] min-h-[46px] rounded-xl px-1 py-1 transition-all ${
            pathname === '/'
              ? 'text-[#16202a] bg-[#ffedd5] font-black'
              : 'text-[#4b3b2f] hover:text-[#16202a]'
          }`}
        >
          <Flame className="h-5 w-5 text-[#d99036]" />
          <span className="text-[10px] font-bold mt-0.5 tracking-tight">{isEn ? 'Home' : 'Start'}</span>
        </Link>

        {/* Menü */}
        <Link
          href="/speisekarte"
          className={`flex flex-col items-center justify-center min-w-[50px] min-h-[46px] rounded-xl px-1 py-1 transition-all ${
            pathname === '/speisekarte'
              ? 'text-[#16202a] bg-[#ffedd5] font-black'
              : 'text-[#4b3b2f] hover:text-[#16202a]'
          }`}
        >
          <UtensilsCrossed className="h-5 w-5" />
          <span className="text-[10px] font-bold mt-0.5 tracking-tight">{isEn ? 'Menu' : 'Menü'}</span>
        </Link>

        {/* Central WhatsApp Action Button (Owner's Top Lead Priority) */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center min-w-[56px] min-h-[46px] rounded-xl px-1.5 py-1 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 shadow-sm transition-all active:scale-95"
          aria-label="WhatsApp Direktkontakt 0176 70341602"
        >
          <div className="relative">
            <MessageSquare className="h-5 w-5 fill-emerald-600 text-emerald-600" />
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
          </div>
          <span className="text-[10px] font-black text-emerald-800 mt-0.5 tracking-tight">WhatsApp</span>
        </a>

        {/* Tisch Reservieren */}
        <Link
          href="/reservierung"
          className={`flex flex-col items-center justify-center min-w-[50px] min-h-[46px] rounded-xl px-1 py-1 transition-all ${
            pathname === '/reservierung'
              ? 'text-[#1a3a52] bg-[#cce3f1] font-black'
              : 'text-[#2e5f7e] hover:text-[#1a3a52]'
          }`}
        >
          <Calendar className="h-5 w-5" />
          <span className="text-[10px] font-bold mt-0.5 tracking-tight">{isEn ? 'Table' : 'Tisch'}</span>
        </Link>

        {/* Cart Trigger */}
        <button
          onClick={openCart}
          className="relative flex flex-col items-center justify-center min-w-[50px] min-h-[46px] rounded-xl px-1 py-1 text-[#2e5f7e] hover:text-[#1a3a52] transition-all cursor-pointer"
          aria-label={isEn ? 'Open Cart' : 'Warenkorb öffnen'}
        >
          <div className="relative">
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#9bc1d9] text-[9px] font-black text-[#1a3a52]">
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
