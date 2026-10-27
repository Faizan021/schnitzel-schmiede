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
    <section className="relative py-16 sm:py-24 bg-gradient-to-b from-[#edf7fc] via-[#cce3f1] to-[#ddeef7] border-t border-[#b8d4e8]/60 overflow-hidden [contain:paint]">
      {/* Warm ambient background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[700px] h-[250px] bg-[#9bc1d9]/35 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#b8d4e8] bg-white/80 backdrop-blur-md px-4 py-1.5 text-xs font-mono font-bold text-[#1a3a52] mb-4 shadow-sm">
          <Heart className="h-3.5 w-3.5 text-[#2e5f7e] fill-current" />
          <span>{isEn ? 'PERSONAL HOSPITALITY' : 'PERSÖNLICHE GASTFREUNDSCHAFT'}</span>
        </div>

        <p className="text-xl sm:text-2xl font-serif italic text-[#2e5f7e] mb-2">
          {isEn ? '“We look forward to welcoming you…”' : '„Wir freuen uns auf Ihren Besuch…“'}
        </p>

        <h2 className="text-3xl sm:text-5xl font-black text-[#1a3a52] font-serif tracking-tight mb-4">
          {isEn ? 'Your Hosts at Schnitzelschmiede' : 'Ihr Team der Schnitzelschmiede'}
        </h2>

        <p className="max-w-2xl mx-auto text-sm text-[#2e5f7e] leading-relaxed mb-8 flex items-center justify-center gap-1.5">
          <MapPin className="h-4 w-4 text-[#1a3a52] shrink-0" />
          <span>Dohler Str. 269 · 41238 Mönchengladbach</span>
        </p>

        {/* Action Trio: Phone Call + Table Reservation + WhatsApp */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
          {/* Direct Phone Call */}
          <a
            href="tel:+4921669786951"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#9bc1d9] hover:bg-[#85b0cb] text-[#1a3a52] font-black text-xs uppercase tracking-wider transition-all shadow-md"
          >
            <Phone className="h-4 w-4" />
            <span>02166 9786951 anrufen</span>
          </a>

          {/* Table Reservation */}
          <Link
            href="/reservierung"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/90 hover:bg-white text-[#1a3a52] border border-[#b8d4e8] font-black text-xs uppercase tracking-wider transition-all shadow-sm"
          >
            <Calendar className="h-4 w-4 text-[#2e5f7e]" />
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

        <p className="mt-5 text-xs text-[#163044] font-medium flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{isEn ? 'Direct Line to Owner Umar Jabbar · Fast reply guaranteed' : 'Direkter WhatsApp-Draht zum Inhaber Umar Jabbar · Schnelle Rückmeldung garantiert'}</span>
        </p>
      </div>
    </section>
  );
}
