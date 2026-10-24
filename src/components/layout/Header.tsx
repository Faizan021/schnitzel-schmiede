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
import { KitchenStatusBar } from '../ui/KitchenStatusBar';

export function Header() {
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();
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
    { href: '/speisekarte', label: 'Speisekarte' },
    { href: '/konfigurator', label: 'Schnitzel-Baukasten', highlight: true },
    { href: '/reservierung', label: 'Tisch reservieren' },
    { href: '/catering', label: 'Catering & Feiern' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0A0A0C]/90 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/50 py-3'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo & Brand Identity */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#E6B84A] via-[#F5C75D] to-[#B88526] text-[#0A0A0C] shadow-lg shadow-[#E6B84A]/25 transition-transform duration-300 group-hover:scale-105">
              <Flame className="h-6 w-6 fill-current" />
            </div>
            <div>
              <div className="text-lg font-black tracking-wider text-[#FDFBF7] font-display flex items-center gap-1.5">
                <span>SCHNITZEL</span>
                <span className="text-[#E6B84A]">SCHMIEDE</span>
              </div>
              <div className="text-[10px] tracking-widest text-[#C4BFB5] uppercase font-semibold">
                Mönchengladbach
              </div>
            </div>
          </Link>

          {/* Desktop Live Kitchen Pill */}
          <div className="hidden lg:block">
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
                      ? 'text-[#E6B84A] bg-[#E6B84A]/10'
                      : 'text-[#C4BFB5] hover:text-[#FDFBF7] hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {link.highlight && <Sparkles className="h-3 w-3 text-[#E6B84A]" />}
                    {link.label}
                  </span>
                  {isActive && (
                    <span className="absolute bottom-1 left-3.5 right-3.5 h-0.5 rounded-full bg-[#E6B84A]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Hub (Cart + Table Booking CTA) */}
          <div className="flex items-center gap-2.5">
            {/* Table Booking Shortcut */}
            <Link
              href="/reservierung"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-[#E6B84A]/30 bg-[#16161C] px-3.5 py-2 text-xs font-bold text-[#E6B84A] hover:bg-[#E6B84A] hover:text-[#0A0A0C] transition-colors"
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>Tisch buchen</span>
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-2 rounded-xl bg-[#E6B84A] px-4 py-2 text-xs font-black text-[#0A0A0C] hover:bg-[#F5C75D] shadow-md shadow-[#E6B84A]/20 transition-all cursor-pointer active:scale-95"
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden xs:inline">Warenkorb</span>
              {itemCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0A0A0C] text-[10px] font-bold text-[#E6B84A]">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden rounded-xl border border-white/10 bg-[#141418] p-2 text-[#C4BFB5] hover:text-[#FDFBF7]"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-[#0A0A0C] pt-20 px-6 space-y-6">
          <div className="flex justify-end pb-2">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-[#C4BFB5] hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="pb-4">
            <KitchenStatusBar />
          </div>

          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl bg-[#141418] border border-white/5 p-4 text-base font-bold text-[#FDFBF7] flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-[#E6B84A]">&rarr;</span>
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 space-y-3">
            <a
              href="tel:+492161123456"
              className="flex items-center justify-center gap-2 rounded-xl bg-[#181820] p-3 text-sm font-semibold text-[#FDFBF7]"
            >
              <Phone className="h-4 w-4 text-[#E6B84A]" />
              <span>02161 / 123456 anrufen</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
