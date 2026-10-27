'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Flame,
  ShoppingBag,
  Calendar,
  Phone,
  Menu,
  X,
  MessageSquare,
  MapPin,
  Clock,
} from 'lucide-react';
import { useCart } from '../providers/CartContext';
import { useLanguage } from '../providers/LanguageContext';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import { getKitchenWhatsAppNumber } from '@/lib/utils/whatsapp';

export function Header() {
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();
  const { t, lang } = useLanguage();
  const isEn = lang === 'en';
  const whatsappPhone = getKitchenWhatsAppNumber();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
    '🔥 [SCHNITZEL SCHMIEDE MÖNCHENGLADBACH · Dohler Str. 269]\n\nHallo Schnitzelschmiede-Team, ich möchte gerne bestellen / eine Frage stellen:'
  )}`;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/speisekarte', label: t.nav.menu },
    { href: '/reservierung', label: t.nav.reservation },
    { href: '/catering', label: t.nav.catering },
  ];

  return (
    <>
      {/* Top Utility Announcement & Direct Contact Bar (Owner's WhatsApp & Phone Priority) */}
      <div
        suppressHydrationWarning
        className="bg-[#1a3a52] text-white border-b border-[#2e5f7e]/40 py-1.5 px-3 sm:px-4 text-[10px] sm:text-xs font-mono"
      >
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 truncate">
            <span className="flex items-center gap-1 text-[#ffecd2] truncate">
              <MapPin className="h-3 w-3 text-[#9bc1d9] shrink-0" />
              <span className="truncate">
                <strong className="text-white">Dohler Str. 269</strong>
                <span className="hidden xs:inline">, 41238 MG</span>
              </span>
            </span>
            <span className="hidden sm:inline text-white/40">|</span>
            <span className="hidden md:flex items-center gap-1 text-[#9bc1d9]">
              <Clock className="h-3 w-3" />
              <span>Mo-Sa ab 16:30 · So ab 12:00</span>
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 ml-auto shrink-0">
            <a
              href="tel:+4921669786951"
              className="hidden sm:flex items-center gap-1 text-[#ffecd2] hover:text-white transition-colors"
            >
              <Phone className="h-3 w-3 text-[#9bc1d9]" />
              <span>02166 9786951</span>
            </a>
            <span className="hidden sm:inline text-white/40">|</span>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 font-bold text-emerald-300 hover:text-white transition-colors text-[10px] sm:text-xs"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <MessageSquare className="h-3 w-3 fill-current text-emerald-400" />
              <span>WhatsApp Live</span>
            </a>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-[#e8d5be] shadow-md shadow-[#16202a]/5 py-2'
            : 'bg-white/85 backdrop-blur-md py-2.5 sm:py-3.5 border-b border-[#e8d5be]/70'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8">
          {/* Logo & Brand Identity: Living Forge Crest & Luminous Gold Wordmark */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0 min-w-0 pr-2">
            {/* Forged Cast-Iron Guild Emblem with Living Ember Simmer */}
            <div className="relative flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#162e40] via-[#1a3a52] to-[#0f2130] shadow-md shadow-[#1a3a52]/30 border-2 border-[#d99036]/70 group-hover:border-[#f59e0b] group-hover:shadow-[0_0_20px_rgba(245,158,11,0.5)] transition-all duration-300 shrink-0 overflow-hidden">
              {/* Radial Ember Flare */}
              <div className="absolute inset-0 bg-radial from-[#d99036]/35 via-transparent to-transparent pointer-events-none" />
              
              {/* Living Flame with Ember Simmer Glow */}
              <Flame className="h-5 w-5 sm:h-6 sm:w-6 fill-[#d99036] text-[#ffecd2] filter drop-shadow-[0_0_8px_rgba(245,158,11,0.85)] animate-flame-simmer relative z-10 transition-transform duration-300 group-hover:scale-110" />
            </div>

            <div className="flex flex-col min-w-0">
              <span className="text-[8px] sm:text-[9px] font-mono font-black tracking-[0.25em] sm:tracking-[0.3em] text-[#b45309] uppercase leading-none mb-0.5">
                DIE
              </span>
              <div className="text-xs xs:text-sm sm:text-lg font-black tracking-wider font-serif flex items-center gap-1 sm:gap-1.5 leading-none">
                <span className="text-[#16202a]">SCHNITZEL</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d99036] via-[#f59e0b] to-[#b45309] animate-brand-sheen drop-shadow-sm font-black">
                  SCHMIEDE
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-[9px] tracking-widest text-[#4b3b2f] uppercase font-mono font-bold mt-1">
                <span>MÖNCHENGLADBACH</span>
                <span className="text-[#d99036]">·</span>
                <span className="text-[#b45309]">MEISTERBETRIEB</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                    isActive
                      ? 'text-[#16202a] bg-[#ffedd5] shadow-sm font-black'
                      : 'text-[#4b3b2f] hover:text-[#16202a] hover:bg-[#ffedd5]/50'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-1 left-4 right-4 h-0.5 rounded-full bg-[#d99036]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Hub (Language Switcher + WhatsApp Direct + Table Booking + Cart) */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Eye-Catching Official WhatsApp Action Pill (Visible on Tablet & Desktop; On Mobile user has the bottom nav WhatsApp button) */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 px-3.5 py-2 text-xs font-black text-white shadow-md shadow-emerald-900/20 hover:shadow-lg transition-all duration-300 border border-emerald-400/40 active:scale-95 cursor-pointer shrink-0"
              title="Per WhatsApp direkt anfragen & bestellen"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-200" />
              </span>
              <MessageSquare className="h-3.5 w-3.5 fill-white text-white" />
              <span className="tracking-wide font-extrabold">{isEn ? 'WhatsApp Chat' : 'WhatsApp Live'}</span>
            </a>

            {/* Desktop Language Switcher */}
            <div className="hidden lg:block">
              <LanguageSwitcher />
            </div>

            {/* Table Booking Shortcut */}
            <Link
              href="/reservierung"
              className="hidden md:inline-flex items-center gap-1.5 rounded-xl border border-[#b8d4e8] bg-white/80 px-3.5 py-2 text-xs font-bold text-[#1a3a52] hover:bg-[#cce3f1] transition-colors shadow-sm shrink-0"
            >
              <Calendar className="h-3.5 w-3.5 text-[#2e5f7e]" />
              <span>{t.nav.bookTable}</span>
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={openCart}
              className="relative flex items-center justify-center h-8 w-8 sm:h-auto sm:w-auto sm:gap-2 rounded-xl bg-[#9bc1d9] sm:px-3.5 sm:py-2 text-xs font-black text-[#1a3a52] hover:bg-[#b8d4e8] shadow-md shadow-[#9bc1d9]/30 transition-all cursor-pointer active:scale-95 border border-white/60 shrink-0"
              aria-label={t.nav.cart}
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden md:inline">{t.nav.cart}</span>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 sm:static flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-[#1a3a52] text-[9px] sm:text-[10px] font-bold text-white shadow-sm">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden rounded-xl border border-[#b8d4e8] bg-white/80 p-1.5 sm:p-2 text-[#1a3a52] hover:bg-[#cce3f1] shrink-0"
              aria-label="Navigation menu"
            >
              {mobileMenuOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-[#edf7fc]/98 backdrop-blur-xl pt-16 px-6 space-y-5 overflow-y-auto">
          <div className="flex items-center justify-between pb-3 border-b border-[#b8d4e8]/40">
            <LanguageSwitcher />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 text-[#1a3a52] hover:bg-white/80 rounded-xl"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl bg-white/90 border border-white p-4 text-base font-bold text-[#1a3a52] flex items-center justify-between shadow-sm"
              >
                <span>{link.label}</span>
                <span className="text-[#2e5f7e]">&rarr;</span>
              </Link>
            ))}
          </div>

          {/* Mobile Direct Contact Gateway: WhatsApp & Phone */}
          <div className="pt-2 border-t border-[#b8d4e8]/40 space-y-2.5">
            <span className="text-xs font-mono font-bold text-[#2e5f7e] uppercase block">
              DIREKTKONTAKT INHABER
            </span>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 p-3.5 text-sm font-black text-white shadow-md shadow-emerald-600/20 transition-all"
            >
              <MessageSquare className="h-5 w-5 fill-current" />
              <span>WhatsApp Chat: 0176 70341602</span>
            </a>

            <a
              href="tel:+4921669786951"
              className="flex items-center justify-center gap-2 rounded-xl bg-white border border-[#b8d4e8] p-3 text-sm font-bold text-[#1a3a52] shadow-sm"
            >
              <Phone className="h-4 w-4 text-[#2e5f7e]" />
              <span>02166 9786951 anrufen</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
