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
  Sparkles,
} from 'lucide-react';
import { useCart } from '../providers/CartContext';
import { useLanguage } from '../providers/LanguageContext';
import { KitchenStatusBar } from '../ui/KitchenStatusBar';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';

export function Header() {
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/speisekarte', label: t.nav.menu },
    { href: '/konfigurator', label: t.nav.configurator, highlight: true },
    { href: '/reservierung', label: t.nav.reservation },
    { href: '/catering', label: t.nav.catering },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#121110]/95 backdrop-blur-md border-b border-[#312B26] shadow-xl shadow-black/60 py-3'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo & Brand Identity */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#D4A347] via-[#E5B24E] to-[#B88526] text-[#121110] shadow-lg shadow-[#D4A347]/25 transition-transform duration-300 group-hover:scale-105">
              <Flame className="h-6 w-6 fill-current" />
            </div>
            <div>
              <div className="text-lg font-black tracking-wider text-[#FBF9F5] font-serif flex items-center gap-1.5">
                <span>SCHNITZEL</span>
                <span className="text-[#E5B24E]">SCHMIEDE</span>
              </div>
              <div className="text-[10px] tracking-widest text-[#C4BFB5] uppercase font-semibold">
                Mönchengladbach
              </div>
            </div>
          </Link>

          {/* Desktop Live Kitchen Pill */}
          <div className="hidden xl:block">
            <KitchenStatusBar />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                    isActive
                      ? 'text-[#E5B24E] bg-[#D4A347]/15'
                      : 'text-[#D5CEBF] hover:text-[#FBF9F5] hover:bg-[#23201C]'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {link.highlight && <Sparkles className="h-3 w-3 text-[#E5B24E]" />}
                    {link.label}
                  </span>
                  {isActive && (
                    <span className="absolute bottom-1 left-3.5 right-3.5 h-0.5 rounded-full bg-[#E5B24E]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Hub (Language Switcher + Cart + Table Booking CTA) */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Desktop Language Switcher */}
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>

            {/* Table Booking Shortcut */}
            <Link
              href="/reservierung"
              className="hidden lg:inline-flex items-center gap-1.5 rounded-xl border border-[#D4A347]/35 bg-[#1C1A18] px-3.5 py-2 text-xs font-bold text-[#E5B24E] hover:bg-[#D4A347] hover:text-[#121110] transition-colors"
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>{t.nav.bookTable}</span>
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-2 rounded-xl bg-[#D4A347] px-3.5 sm:px-4 py-2 text-xs font-black text-[#121110] hover:bg-[#E5B24E] shadow-md shadow-[#D4A347]/20 transition-all cursor-pointer active:scale-95"
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden xs:inline">{t.nav.cart}</span>
              {itemCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#121110] text-[10px] font-bold text-[#E5B24E]">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden rounded-xl border border-[#312B26] bg-[#1C1A18] p-2 text-[#D5CEBF] hover:text-[#FBF9F5]"
              aria-label="Navigation menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-[#121110] pt-20 px-6 space-y-6">
          <div className="flex items-center justify-between pb-2">
            <LanguageSwitcher />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-[#C4BFB5] hover:text-white"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="pb-2">
            <KitchenStatusBar />
          </div>

          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl bg-[#1C1A18] border border-[#312B26] p-4 text-base font-bold text-[#FBF9F5] flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-[#E5B24E]">&rarr;</span>
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-[#312B26] space-y-3">
            <a
              href="tel:+492161123456"
              className="flex items-center justify-center gap-2 rounded-xl bg-[#24211D] border border-[#312B26] p-3 text-sm font-semibold text-[#FBF9F5]"
            >
              <Phone className="h-4 w-4 text-[#E5B24E]" />
              <span>{t.nav.callUs}</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
