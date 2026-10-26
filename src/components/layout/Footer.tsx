'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Flame,
  MapPin,
  Clock,
  Phone,
  Mail,
  ShieldCheck,
  MessageSquare,
  Truck,
  ExternalLink,
} from 'lucide-react';
import { getKitchenWhatsAppNumber } from '@/lib/utils/whatsapp';
import { useLanguage } from '@/components/providers/LanguageContext';

export function Footer() {
  const { t, lang } = useLanguage();
  const whatsappPhone = getKitchenWhatsAppNumber();
  const isEn = lang === 'en';
  const [scheduleTab, setScheduleTab] = useState<'restaurant' | 'delivery'>('restaurant');

  return (
    <footer className="border-t border-[#b8d4e8] bg-gradient-to-b from-[#ddeef7] via-[#cce3f1] to-[#b8d4e8]/40 text-[#2e5f7e] pt-14 pb-24 md:pb-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand & Craft Story */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#9bc1d9] via-[#b8d4e8] to-[#9bc1d9] text-[#1a3a52] shadow-sm">
                <Flame className="h-5 w-5 fill-current" />
              </div>
              <div>
                <div className="text-base font-black tracking-wider text-[#1a3a52] font-serif">
                  SCHNITZEL <span className="text-[#2e5f7e]">SCHMIEDE</span>
                </div>
                <div className="text-[10px] uppercase tracking-widest text-[#2e5f7e] font-bold">
                  MÖNCHENGLADBACH
                </div>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-[#2e5f7e]">
              {isEn
                ? 'Handcrafted culinary gastronomy in Mönchengladbach. Golden souffléed schnitzels, regional fresh meats, homemade sauces and crispy sides with no compromises.'
                : 'Traditionelle Handwerksgastronomie in Mönchengladbach. Goldbraun soufflierte Schnitzel, regionales Frischfleisch, hausgemachte Saucen und knusprige Beilagen ohne Kompromisse.'}
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="rounded-md border border-[#b8d4e8] bg-white/80 px-2 py-0.5 text-[10px] font-bold text-[#1a3a52]">
                ✓ 100% Frischezubereitung
              </span>
              <span className="rounded-md border border-[#b8d4e8] bg-white/80 px-2 py-0.5 text-[10px] font-bold text-[#1a3a52]">
                ✓ Reines Butterschmalz
              </span>
            </div>
          </div>

          {/* Schedule (Opening & Delivery Hours) - UX/UI Senior Manager Layout */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#1a3a52] flex items-center gap-1.5 font-serif">
                <Clock className="h-4 w-4 text-[#1a3a52]" />
                <span>{isEn ? 'Operating Hours' : 'Zeiten & Service'}</span>
              </h4>
            </div>

            {/* Subtle Tab Switcher for Clean UX */}
            <div className="grid grid-cols-2 p-1 rounded-xl bg-white/80 border border-[#b8d4e8] text-[11px] font-semibold">
              <button
                type="button"
                onClick={() => setScheduleTab('restaurant')}
                className={`py-1.5 px-2 rounded-lg transition-all text-center cursor-pointer ${
                  scheduleTab === 'restaurant'
                    ? 'bg-[#9bc1d9] text-[#1a3a52] shadow-sm font-black'
                    : 'text-[#2e5f7e] hover:text-[#1a3a52]'
                }`}
              >
                {isEn ? 'Restaurant' : 'Vor Ort / Abhol.'}
              </button>
              <button
                type="button"
                onClick={() => setScheduleTab('delivery')}
                className={`py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer ${
                  scheduleTab === 'delivery'
                    ? 'bg-[#9bc1d9] text-[#1a3a52] shadow-sm font-black'
                    : 'text-[#2e5f7e] hover:text-[#1a3a52]'
                }`}
              >
                <Truck className="h-3 w-3" />
                <span>{isEn ? 'Delivery' : 'Lieferdienst'}</span>
              </button>
            </div>

            {/* Tab 1: Öffnungszeiten (Vor Ort & Abholung) */}
            {scheduleTab === 'restaurant' && (
              <div className="space-y-1.5 text-xs rounded-xl bg-white/85 border border-[#b8d4e8] p-3 shadow-sm">
                <div className="text-[10px] uppercase tracking-wider font-bold text-[#1a3a52] pb-1 border-b border-[#b8d4e8]/60">
                  {isEn ? 'Dine-In & Takeaway Hours' : 'Öffnungszeiten (Restaurant & Abholung)'}
                </div>
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-[#2e5f7e]">{isEn ? 'Mon – Fri:' : 'Montag – Freitag:'}</span>
                  <span className="font-mono text-[#1a3a52] font-semibold">16:30 – 21:45</span>
                </div>
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-[#2e5f7e]">{isEn ? 'Saturday:' : 'Samstag:'}</span>
                  <span className="font-mono text-[#1a3a52] font-semibold">16:00 – 21:45</span>
                </div>
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-[#2e5f7e]">{isEn ? 'Sunday:' : 'Sonntag:'}</span>
                  <span className="font-mono text-[#1a3a52] font-semibold">12:00 – 21:45</span>
                </div>
              </div>
            )}

            {/* Tab 2: Lieferzeiten */}
            {scheduleTab === 'delivery' && (
              <div className="space-y-1.5 text-xs rounded-xl bg-white/85 border border-[#b8d4e8] p-3 shadow-sm">
                <div className="text-[10px] uppercase tracking-wider font-bold text-[#1a3a52] pb-1 border-b border-[#b8d4e8]/60 flex items-center gap-1.5">
                  <Truck className="h-3 w-3" />
                  <span>{isEn ? 'Delivery Service Hours' : 'Lieferzeiten (Bringdienst)'}</span>
                </div>
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-[#2e5f7e]">{isEn ? 'Mon – Fri:' : 'Montag – Freitag:'}</span>
                  <span className="font-mono text-[#1a3a52] font-semibold">16:00 – 21:45</span>
                </div>
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-[#2e5f7e]">{isEn ? 'Saturday:' : 'Samstag:'}</span>
                  <span className="font-mono text-[#1a3a52] font-semibold">14:00 – 21:45</span>
                </div>
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-[#2e5f7e]">{isEn ? 'Sunday:' : 'Sonntag:'}</span>
                  <span className="font-mono text-[#1a3a52] font-semibold">11:30 – 21:45</span>
                </div>
              </div>
            )}
          </div>

          {/* Direct Contact & Location */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#1a3a52] flex items-center gap-1.5 font-serif">
              <MapPin className="h-4 w-4 text-[#1a3a52]" />
              <span>{isEn ? 'Contact & Address' : 'Standort & Kontakt'}</span>
            </h4>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-white/85 border border-[#b8d4e8] shadow-sm">
                <p className="text-[#1a3a52] font-semibold leading-relaxed">
                  Schnitzelschmiede
                  <br />
                  <span className="text-[#2e5f7e] font-normal">Dohler Str. 269</span>
                  <br />
                  <span className="text-[#2e5f7e] font-normal">41238 Mönchengladbach</span>
                </p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Dohler+Str+269+41238+M%C3%B6nchengladbach"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-[#1a3a52] hover:underline"
                >
                  <span>Google Maps Navigation</span>
                  <ExternalLink className="h-2.5 w-2.5" />
                </a>
              </div>

              <div className="pt-1 flex flex-col space-y-2">
                <a
                  href="tel:+4921669786951"
                  className="flex items-center gap-2 text-[#1a3a52] hover:bg-white p-2 rounded-lg bg-white/70 border border-[#b8d4e8] transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 text-[#1a3a52] shrink-0" />
                  <span className="font-mono font-bold text-[#1a3a52]">02166 9786951</span>
                </a>

                <a
                  href="mailto:umarjabbar@yahoo.com?subject=Anfrage%20von%20schnitzel-schmiede-mg.de"
                  className="flex items-center gap-2 text-[#1a3a52] hover:bg-white p-2 rounded-lg bg-white/70 border border-[#b8d4e8] transition-colors"
                >
                  <Mail className="h-3.5 w-3.5 text-[#1a3a52] shrink-0" />
                  <span className="truncate text-xs">umarjabbar@yahoo.com</span>
                </a>

                <a
                  href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
                    '🔥 [SCHNITZEL SCHMIEDE MÖNCHENGLADBACH · Dohler Str. 269]\n\nHallo Team der Schnitzelschmiede, ich habe eine Frage:'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-emerald-800 bg-emerald-50 hover:bg-emerald-100 p-2 rounded-lg border border-emerald-300 transition-colors font-semibold"
                >
                  <MessageSquare className="h-3.5 w-3.5 shrink-0" />
                  <span>{isEn ? 'Kitchen WhatsApp Support' : 'Küchen-WhatsApp Support'}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links & Legal */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#1a3a52] flex items-center gap-1.5 font-serif">
              <ShieldCheck className="h-4 w-4 text-[#1a3a52]" />
              <span>{isEn ? 'Legal & Transparency' : 'Rechtliches & Transparenz'}</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/speisekarte"
                  className="hover:text-[#1a3a52] transition-colors flex items-center gap-1.5"
                >
                  <span>→</span>
                  <span>{t.footer.menuLink}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/reservierung"
                  className="hover:text-[#1a3a52] transition-colors flex items-center gap-1.5"
                >
                  <span>→</span>
                  <span>{t.footer.reserveLink}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/catering"
                  className="hover:text-[#1a3a52] transition-colors flex items-center gap-1.5"
                >
                  <span>→</span>
                  <span>{t.footer.cateringLink}</span>
                </Link>
              </li>
              <li className="pt-2 border-t border-[#b8d4e8]/60">
                <Link
                  href="/impressum"
                  className="hover:text-[#1a3a52] transition-colors flex items-center gap-1.5 font-semibold text-[#1a3a52]"
                >
                  <span>§</span>
                  <span>Impressum (§ 5 DDG)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/datenschutz"
                  className="hover:text-[#1a3a52] transition-colors flex items-center gap-1.5 font-semibold text-[#1a3a52]"
                >
                  <span>🛡</span>
                  <span>Datenschutzerklärung (DSGVO)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/agb"
                  className="hover:text-[#1a3a52] transition-colors flex items-center gap-1.5 font-semibold text-[#1a3a52]"
                >
                  <span>📋</span>
                  <span>Allgemeine Geschäftsbedingungen (AGB)</span>
                </Link>
              </li>
            </ul>

            {/* Speisebaron External Legal Links */}
            <div className="pt-2">
              <span className="text-[10px] text-[#2e5f7e] block mb-1">
                {isEn ? 'Official Speisebaron Portal:' : 'Offizielles Speisebaron Portal:'}
              </span>
              <div className="flex flex-wrap gap-2 text-[10px]">
                <a
                  href="https://speisebaron.de/webseite/664f673709580c0011f7c7d7/impressum"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1a3a52] font-semibold hover:underline"
                >
                  Impressum
                </a>
                <span className="text-[#b8d4e8]">·</span>
                <a
                  href="https://speisebaron.de/webseite/664f673709580c0011f7c7d7/datenschutz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1a3a52] font-semibold hover:underline"
                >
                  Datenschutz
                </a>
                <span className="text-[#b8d4e8]">·</span>
                <a
                  href="https://speisebaron.de/webseite/664f673709580c0011f7c7d7/agb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1a3a52] font-semibold hover:underline"
                >
                  AGB
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#b8d4e8]/60 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#163044] font-medium gap-3">
          <p>
            © 2026 Schnitzelschmiede Mönchengladbach · Inh. Umar Jabbar · Alle Rechte vorbehalten.
          </p>
          <div className="flex items-center gap-4">
            <span>Alle Preise inkl. MwSt.</span>
            <span>·</span>
            <span className="text-[#1a3a52] font-black">Dohler Str. 269 · 41238 Mönchengladbach</span>
          </div>
        </div>

        {/* Speisely Network & Technology Credit Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 mt-4 border-t border-[#b8d4e8]/60 text-xs text-[#163044]">
          <div className="flex flex-wrap items-center gap-2">
            <span>{t.footer.platformTechBy}</span>
            <a
              href="https://speisely.de"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1.5 font-bold text-[#1a3a52] hover:underline transition-colors"
              title="Speisely — Deutschlands Gastronomie- & Catering-Netzwerk"
            >
              <span className="text-[#1a3a52]">✦</span>
              <span className="underline decoration-[#9bc1d9] underline-offset-2">Speisely Gastro-Tech</span>
            </a>
            <span className="text-[#b8d4e8]">|</span>
            <a
              href="https://speisely.de/catering/ort/moenchengladbach"
              target="_blank"
              rel="noopener"
              className="text-[#163044] hover:text-[#1a3a52] font-semibold transition-colors"
            >
              {t.footer.partnerNetwork}
            </a>
          </div>
          <span className="text-xs font-bold text-[#163044]">{t.footer.zeroCommission}</span>
        </div>
      </div>
    </footer>
  );
}
