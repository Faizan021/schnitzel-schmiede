'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, Sparkles, X } from 'lucide-react';
import { getKitchenWhatsAppNumber } from '@/lib/utils/whatsapp';
import { useLanguage } from '../providers/LanguageContext';

export function FloatingWhatsAppFAB() {
  const { lang } = useLanguage();
  const isEn = lang === 'en';
  const whatsappPhone = getKitchenWhatsAppNumber();
  const [isDismissed, setIsDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
    '🔥 [SCHNITZEL SCHMIEDE MÖNCHENGLADBACH · Dohler Str. 269]\n📍 RESTAURANT: Die Schnitzel Schmiede Mönchengladbach\n\nHallo Schnitzelschmiede-Team, ich habe eine Frage / möchte gerne bestellen:'
  )}`;

  if (!mounted || isDismissed) return null;

  return (
    <aside
      aria-label={isEn ? 'Direct WhatsApp contact' : 'Direkter WhatsApp-Kontakt'}
      className="hidden md:flex fixed bottom-6 left-16 sm:left-20 z-40 items-center gap-2 group animate-fade-in"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/95 backdrop-blur-md border border-emerald-400 shadow-xl shadow-emerald-950/10 hover:border-emerald-500 hover:scale-105 transition-all duration-300 cursor-pointer"
        title="Direkter WhatsApp-Draht zum Inhaber (0176 70341602)"
      >
        <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md shadow-emerald-500/30">
          <MessageSquare className="h-4 w-4 fill-current" />
          <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-300 animate-ping" />
          <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400" />
        </div>

        <div className="flex flex-col text-left">
          <span className="text-[10px] font-mono font-bold tracking-wider text-emerald-800 uppercase flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {isEn ? 'Direct WhatsApp' : 'WhatsApp Live'}
          </span>
          <span className="text-xs font-black text-[#1a3a52] leading-none mt-0.5">
            {isEn ? 'Chat Now →' : 'Jetzt anfragen →'}
          </span>
        </div>
      </a>

      {/* Dismiss Button */}
      <button
        onClick={() => setIsDismissed(true)}
        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full bg-white/80 hover:bg-white text-[#2e5f7e] hover:text-[#1a3a52] border border-[#b8d4e8] shadow-sm cursor-pointer"
        aria-label="Schließen"
        title="Ausblenden"
      >
        <X className="h-3 w-3" />
      </button>
    </aside>
  );
}
