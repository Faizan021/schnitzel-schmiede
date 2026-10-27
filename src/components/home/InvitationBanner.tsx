'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, MessageSquare, Calendar, MapPin, Sparkles, Heart } from 'lucide-react';
import { useLanguage } from '../providers/LanguageContext';
import { getKitchenWhatsAppNumber } from '@/lib/utils/whatsapp';

export function InvitationBanner() {
  const { lang } = useLanguage();
  const isEn = lang === 'en';
  const whatsappPhone = getKitchenWhatsAppNumber();

  const prefilledWhatsAppUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
    '🔥 [SCHNITZEL SCHMIEDE MÖNCHENGLADBACH · Dohler Str. 269]\n\nHallo Team der Schnitzelschmiede, ich möchte gerne eine Frage stellen / einen Tisch anfragen:'
  )}`;

  return (
    <section className="relative py-16 sm:py-24 bg-gradient-to-b from-[#faf7f2] via-[#f5efe6] to-[#faf7f2] border-t border-[#e8d5be]/70 overflow-hidden [contain:paint]">
      {/* Warm ambient background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[700px] h-[250px] bg-[#d99036]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#e8d5be] bg-white/90 backdrop-blur-md px-4 py-1.5 text-xs font-mono font-bold text-[#b45309] mb-4 shadow-sm">
          <Heart className="h-3.5 w-3.5 text-[#d99036] fill-current" />
          <span>{isEn ? 'PERSONAL HOSPITALITY' : 'PERSÖNLICHE GASTFREUNDSCHAFT'}</span>
        </div>

        <p className="text-xl sm:text-2xl font-serif italic text-[#b45309] mb-2">
          {isEn ? '“We look forward to welcoming you…”' : '„Wir freuen uns auf Ihren Besuch…“'}
        </p>

        <h2 className="text-3xl sm:text-5xl font-black text-[#16202a] font-serif tracking-tight mb-4">
          {isEn ? 'Your Hosts at Schnitzelschmiede' : 'Ihr Team der Schnitzelschmiede'}
        </h2>

        <p className="max-w-2xl mx-auto text-sm text-[#4b3b2f] leading-relaxed mb-8 flex items-center justify-center gap-1.5">
          <MapPin className="h-4 w-4 text-[#16202a] shrink-0" />
          <span>Dohler Str. 269 · 41238 Mönchengladbach</span>
        </p>

        {/* Action Trio: Phone Call + Table Reservation + WhatsApp */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
          {/* Direct Phone Call */}
          <a
            href="tel:+4921669786951"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#d99036] to-[#b45309] hover:from-[#e09b43] hover:to-[#c25c0e] text-white font-black text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
          >
            <Phone className="h-4 w-4" />
            <span>02166 9786951 anrufen</span>
          </a>

          {/* Table Reservation */}
          <Link
            href="/reservierung"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-[#fffdfa] text-[#16202a] border border-[#e8d5be] font-black text-xs uppercase tracking-wider transition-all shadow-sm active:scale-95"
          >
            <Calendar className="h-4 w-4 text-[#b45309]" />
            <span>{isEn ? 'Reserve Table' : 'Tisch reservieren'}</span>
          </Link>

          {/* Direct WhatsApp with Restaurant Identification */}
          <a
            href={prefilledWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
            title="Direkt per WhatsApp anfragen: 0176 70341602"
          >
            <MessageSquare className="h-4 w-4 fill-current" />
            <span>WhatsApp: 0176 70341602</span>
          </a>
        </div>

        <p className="mt-5 text-xs text-[#4b3b2f] font-medium flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{isEn ? 'Direct Line to Owner Umar Jabbar · Fast reply guaranteed' : 'Direkter WhatsApp-Draht zum Inhaber Umar Jabbar · Schnelle Rückmeldung garantiert'}</span>
        </p>
      </div>
    </section>
  );
}
