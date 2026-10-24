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

export function Footer() {
  const whatsappPhone = getKitchenWhatsAppNumber();
  return (
    <footer className="border-t border-white/10 bg-[#0A0A0D] text-[#C4BFB5] pt-14 pb-24 md:pb-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand & Craft Story */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E6B84A] text-[#0A0A0C]">
                <Flame className="h-5 w-5 fill-current" />
              </div>
              <div className="text-base font-black tracking-wider text-[#FDFBF7]">
                SCHNITZEL <span className="text-[#E6B84A]">SCHMIEDE</span>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-[#C4BFB5]">
              Traditionelle Handwerksgastronomie in Mönchengladbach. Goldbraun soufflierte
              Schnitzel, saftiges Fleisch, hausgemachte Saucen und knusprige Beilagen ohne
              Kompromisse.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                ✓ 100% Halal Optionen
              </span>
              <span className="rounded-md border border-[#E6B84A]/30 bg-[#E6B84A]/10 px-2 py-0.5 text-[10px] font-bold text-[#E6B84A]">
                ✓ Frisches Butterschmalz
              </span>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#FDFBF7] flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-[#E6B84A]" />
              <span>Öffnungszeiten</span>
            </h4>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span>Montag:</span>
                <span className="text-rose-400 font-semibold">Ruhetag</span>
              </div>
              <div className="flex justify-between">
                <span>Dienstag – Freitag:</span>
                <span className="text-[#FDFBF7]">12:00 – 14:30 Uhr</span>
              </div>
              <div className="flex justify-between">
                <span></span>
                <span className="text-[#FDFBF7]">17:00 – 22:00 Uhr</span>
              </div>
              <div className="flex justify-between pt-1">
                <span>Samstag & Sonntag:</span>
                <span className="text-[#E6B84A] font-semibold">12:00 – 22:00 Uhr</span>
              </div>
              <p className="text-[11px] text-[#C4BFB5]/80 pt-1">
                Durchgehend warme Küche am Wochenende.
              </p>
            </div>
          </div>

          {/* Location & Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#FDFBF7] flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-[#E6B84A]" />
              <span>Standort & Kontakt</span>
            </h4>
            <div className="space-y-2 text-xs">
              <p className="text-[#FDFBF7] font-semibold">
                Schnitzel Schmiede Mönchengladbach
                <br />
                Bismarckstraße 45
                <br />
                41061 Mönchengladbach
              </p>
              <div className="pt-2 space-y-1">
                <a
                  href="tel:+492161123456"
                  className="flex items-center gap-2 text-[#C4BFB5] hover:text-[#E6B84A] transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 text-[#E6B84A]" />
                  <span>02161 / 123456</span>
                </a>
                <a
                  href={`https://wa.me/${whatsappPhone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#C4BFB5] hover:text-[#25D366] transition-colors"
                >
                  <MessageSquare className="h-3.5 w-3.5 text-[#25D366]" />
                  <span>WhatsApp: {whatsappPhone.replace(/^49/, '+49 ')}</span>
                </a>
                <a
                  href="mailto:bestellung@schnitzel-schmiede-mg.de"
                  className="flex items-center gap-2 text-[#C4BFB5] hover:text-[#E6B84A] transition-colors"
                >
                  <Mail className="h-3.5 w-3.5 text-[#E6B84A]" />
                  <span>bestellung@schnitzel-schmiede-mg.de</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links & Legal */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#FDFBF7] flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-[#E6B84A]" />
              <span>Rechtliches & Transparenz</span>
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link
                  href="/speisekarte"
                  className="hover:text-[#E6B84A] transition-colors"
                >
                  Digitale Speisekarte
                </Link>
              </li>
              <li>
                <Link
                  href="/reservierung"
                  className="hover:text-[#E6B84A] transition-colors"
                >
                  Tisch online reservieren
                </Link>
              </li>
              <li>
                <Link
                  href="/catering"
                  className="hover:text-[#E6B84A] transition-colors"
                >
                  Catering-Rechner Mönchengladbach
                </Link>
              </li>
              <li>
                <Link
                  href="/impressum"
                  className="hover:text-[#E6B84A] transition-colors"
                >
                  Impressum (§ 5 DDG)
                </Link>
              </li>
              <li>
                <Link
                  href="/datenschutz"
                  className="hover:text-[#E6B84A] transition-colors"
                >
                  Datenschutzerklärung (DSGVO)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#C4BFB5]/70 gap-3">
          <p>
            © 2026 Schnitzel Schmiede Mönchengladbach. Alle Rechte
            vorbehalten.
          </p>
          <div className="flex items-center gap-4">
            <span>Alle Preise inkl. gesetzlicher MwSt. (§ 312j BGB / PAngV)</span>
            <span>·</span>
            <span className="text-[#E6B84A]">Google for Startups Immersion EMEA Standard</span>
          </div>
        </div>

        {/* Speisely Network & Technology Credit Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 mt-4 border-t border-white/5 text-[11px] text-[#C4BFB5]/80">
          <div className="flex flex-wrap items-center gap-2">
            <span>Plattform & Technologie von</span>
            <a
              href="https://speisely.de"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1.5 font-bold text-[#FDFBF7] hover:text-[#E6B84A] transition-colors"
              title="Speisely — Deutschlands Gastronomie- & Catering-Netzwerk"
            >
              <span className="text-[#E6B84A]">✦</span>
              <span className="underline decoration-[#E6B84A]/40 underline-offset-2">Speisely Gastro-Tech</span>
            </a>
            <span className="text-white/20">|</span>
            <a
              href="https://speisely.de/catering/ort/moenchengladbach"
              target="_blank"
              rel="noopener"
              className="text-[#C4BFB5]/70 hover:text-[#E6B84A] transition-colors"
            >
              Partner im Speisely Netzwerk Mönchengladbach
            </a>
          </div>
          <span className="text-[10px] text-[#C4BFB5]/60">Zero-Commission Direct Ordering Engine</span>
        </div>
      </div>
    </footer>
  );
}
