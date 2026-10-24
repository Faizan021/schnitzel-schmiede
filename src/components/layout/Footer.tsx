'use client';

import React from 'react';
import Link from 'next/link';
import {
  Flame,
  MapPin,
  Clock,
  Phone,
  Mail,
  ShieldCheck,
  MessageSquare,
} from 'lucide-react';
import { getKitchenWhatsAppNumber } from '@/lib/utils/whatsapp';
import { useLanguage } from '@/components/providers/LanguageContext';

export function Footer() {
  const { t, lang } = useLanguage();
  const whatsappPhone = getKitchenWhatsAppNumber();
  const isEn = lang === 'en';

  return (
    <footer className="border-t border-[#312B26] bg-[#121110] text-[#D5CEBF] pt-14 pb-24 md:pb-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand & Craft Story */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#D4A347] via-[#E5B24E] to-[#B88526] text-[#121110]">
                <Flame className="h-5 w-5 fill-current" />
              </div>
              <div className="text-base font-black tracking-wider text-[#FBF9F5] font-serif">
                SCHNITZEL <span className="text-[#E5B24E]">SCHMIEDE</span>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-[#D5CEBF]">
              {t.footer.craftDescription}
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                {t.footer.halalTag}
              </span>
              <span className="rounded-md border border-[#D4A347]/30 bg-[#D4A347]/10 px-2 py-0.5 text-[10px] font-bold text-[#E5B24E]">
                {t.footer.butterTag}
              </span>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#FBF9F5] flex items-center gap-1.5 font-serif">
              <Clock className="h-4 w-4 text-[#E5B24E]" />
              <span>{t.footer.openingHours}</span>
            </h4>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span>{isEn ? 'Monday:' : 'Montag:'}</span>
                <span className="text-rose-400 font-semibold">{t.footer.mondayRest}</span>
              </div>
              <div className="flex justify-between">
                <span>{isEn ? 'Tuesday – Friday:' : 'Dienstag – Freitag:'}</span>
                <span className="text-[#FBF9F5]">12:00 – 14:30 {isEn ? 'PM' : 'Uhr'}</span>
              </div>
              <div className="flex justify-between">
                <span></span>
                <span className="text-[#FBF9F5]">17:00 – 22:00 {isEn ? 'PM' : 'Uhr'}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span>{isEn ? 'Saturday & Sunday:' : 'Samstag & Sonntag:'}</span>
                <span className="text-[#E5B24E] font-semibold">12:00 – 22:00 {isEn ? 'PM' : 'Uhr'}</span>
              </div>
            </div>
          </div>

          {/* Direct Contact & Location */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#FBF9F5] flex items-center gap-1.5 font-serif">
              <MapPin className="h-4 w-4 text-[#E5B24E]" />
              <span>{t.footer.locationContact}</span>
            </h4>
            <div className="space-y-2 text-xs">
              <p className="text-[#FBF9F5] font-medium">
                Bismarckstraße 45<br />
                41061 Mönchengladbach
              </p>
              <div className="pt-1 flex flex-col space-y-1.5">
                <a
                  href="tel:+492161123456"
                  className="flex items-center gap-2 text-[#D5CEBF] hover:text-[#E5B24E] transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 text-[#E5B24E]" />
                  <span>02161 123456</span>
                </a>
                <a
                  href="mailto:schmiede.mg@gmail.com"
                  className="flex items-center gap-2 text-[#D5CEBF] hover:text-[#E5B24E] transition-colors"
                >
                  <Mail className="h-3.5 w-3.5 text-[#E5B24E]" />
                  <span>schmiede.mg@gmail.com</span>
                </a>
                <a
                  href={`https://wa.me/${whatsappPhone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#25D366] hover:underline pt-1 font-semibold"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>{isEn ? 'Kitchen WhatsApp' : 'Küchen-WhatsApp'}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links & Legal */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#FBF9F5] flex items-center gap-1.5 font-serif">
              <ShieldCheck className="h-4 w-4 text-[#E5B24E]" />
              <span>{t.footer.legalTransparency}</span>
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link
                  href="/speisekarte"
                  className="hover:text-[#E5B24E] transition-colors"
                >
                  {t.footer.menuLink}
                </Link>
              </li>
              <li>
                <Link
                  href="/reservierung"
                  className="hover:text-[#E5B24E] transition-colors"
                >
                  {t.footer.reserveLink}
                </Link>
              </li>
              <li>
                <Link
                  href="/catering"
                  className="hover:text-[#E5B24E] transition-colors"
                >
                  {t.footer.cateringLink}
                </Link>
              </li>
              <li>
                <Link
                  href="/impressum"
                  className="hover:text-[#E5B24E] transition-colors"
                >
                  {t.footer.imprintLink}
                </Link>
              </li>
              <li>
                <Link
                  href="/datenschutz"
                  className="hover:text-[#E5B24E] transition-colors"
                >
                  {t.footer.privacyLink}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#312B26] pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#C4BFB5]/80 gap-3">
          <p>
            © 2026 {t.footer.allRightsReserved}
          </p>
          <div className="flex items-center gap-4">
            <span>{t.footer.pricesVatNotice}</span>
            <span>·</span>
            <span className="text-[#E5B24E]">Bismarckstraße 45 Mönchengladbach</span>
          </div>
        </div>

        {/* Speisely Network & Technology Credit Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 mt-4 border-t border-[#312B26] text-[11px] text-[#C4BFB5]/80">
          <div className="flex flex-wrap items-center gap-2">
            <span>{t.footer.platformTechBy}</span>
            <a
              href="https://speisely.de"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1.5 font-bold text-[#FBF9F5] hover:text-[#E5B24E] transition-colors"
              title="Speisely — Deutschlands Gastronomie- & Catering-Netzwerk"
            >
              <span className="text-[#E5B24E]">✦</span>
              <span className="underline decoration-[#E5B24E]/40 underline-offset-2">Speisely Gastro-Tech</span>
            </a>
            <span className="text-white/20">|</span>
            <a
              href="https://speisely.de/catering/ort/moenchengladbach"
              target="_blank"
              rel="noopener"
              className="text-[#C4BFB5]/80 hover:text-[#E5B24E] transition-colors"
            >
              {t.footer.partnerNetwork}
            </a>
          </div>
          <span className="text-[10px] text-[#C4BFB5]/60">{t.footer.zeroCommission}</span>
        </div>
      </div>
    </footer>
  );
}
