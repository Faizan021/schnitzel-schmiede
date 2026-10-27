'use client';

import React, { useState, useEffect } from 'react';
import { Clock, Truck, Flame, CheckCircle2, ChevronRight, X, Phone, MessageSquare } from 'lucide-react';
import { getLiveKitchenStatus, KitchenStatus } from '@/lib/utils/kitchenStatus';
import { useLanguage } from '../providers/LanguageContext';
import { getKitchenWhatsAppNumber } from '@/lib/utils/whatsapp';

export function LiveKitchenRadar() {
  const { lang } = useLanguage();
  const isEn = lang === 'en';
  const whatsappPhone = getKitchenWhatsAppNumber();

  const [status, setStatus] = useState<KitchenStatus | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    setStatus(getLiveKitchenStatus(new Date(), isEn ? 'en' : 'de'));
    const interval = setInterval(() => {
      setStatus(getLiveKitchenStatus(new Date(), isEn ? 'en' : 'de'));
    }, 60000);
    return () => clearInterval(interval);
  }, [isEn]);

  if (!status || isDismissed) return null;

  return (
    <>
      {/* Sticky Bottom-Right Live Chip (Engineered to not block mobile menu or dish buttons) */}
      <div className="fixed bottom-16 md:bottom-6 right-2 sm:right-4 md:right-6 z-30 flex items-center gap-1">
        <button
          type="button"
          onClick={() => setIsOpenModal(true)}
          className="group flex items-center gap-1.5 px-2.5 py-1 md:px-3.5 md:py-2 rounded-full bg-white/95 backdrop-blur-md border border-[#e8d5be] shadow-md shadow-[#16202a]/10 hover:border-[#d99036] transition-all cursor-pointer active:scale-95"
          aria-label="Live Kitchen Status"
        >
          <span className="relative flex h-2 w-2 md:h-2.5 md:w-2.5">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                status.isOpen ? 'bg-emerald-400' : 'bg-amber-400'
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-2 w-2 md:h-2.5 md:w-2.5 ${
                status.isOpen ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
            />
          </span>

          <span className="text-[9px] sm:text-[10px] md:text-xs font-mono font-bold text-[#16202a] group-hover:text-[#163044] transition-colors">
            {status.isOpen
              ? isEn
                ? 'Kitchen Active'
                : 'Küche aktiv'
              : (isEn ? 'From 16:30' : 'Ab 16:30')}
          </span>

          <span className="text-[10px] text-[#163044] font-mono font-black hidden sm:inline">
            // LIVE
          </span>
        </button>

        {/* Quick Dismiss Button (Mobile-Friendly) */}
        <button
          type="button"
          onClick={() => setIsDismissed(true)}
          className="h-6 w-6 rounded-full bg-white/90 border border-[#e8d5be] text-[#4b3b2f] hover:text-[#16202a] flex items-center justify-center transition-all shadow-sm cursor-pointer"
          aria-label="Status schließen"
          title="Schließen"
        >
          <X className="h-3 w-3" />
        </button>
      </div>

      {/* Floating Detailed Radar Modal */}
      {isOpenModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md rounded-2xl bg-white/95 backdrop-blur-md border border-[#e8d5be] p-6 shadow-2xl space-y-5 text-[#16202a]">
            <button
              onClick={() => setIsOpenModal(false)}
              className="absolute top-4 right-4 text-[#4b3b2f] hover:text-[#16202a] text-sm p-1 rounded-lg cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#16202a] uppercase">
              <Flame className="h-4 w-4 text-[#4b3b2f]" />
              <span>LIVE KITCHEN RADAR · DOHLER STR. 269</span>
            </div>

            <div className="p-4 rounded-xl bg-[#fffbf5] border border-[#e8d5be]/60 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#16202a]">
                  {status.statusBadge}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">
                  {status.isOpen ? 'ONLINE' : 'PRE-ORDER'}
                </span>
              </div>
              <p className="text-xs text-[#4b3b2f] leading-relaxed">
                {status.details}
              </p>
            </div>

            {/* Dual Schedule breakdown */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white border border-[#e8d5be] shadow-sm space-y-1">
                <span className="font-bold text-[#16202a] block text-[11px] uppercase tracking-wider">
                  Vor Ort & Abholung
                </span>
                <div className="text-[11px] text-[#4b3b2f] space-y-0.5 font-mono">
                  <div>Mo–Fr: 16:30–21:45</div>
                  <div>Sa: 16:00–21:45</div>
                  <div>So: 12:00–21:45</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#e8d5be] shadow-sm space-y-1">
                <span className="font-bold text-[#16202a] block text-[11px] uppercase tracking-wider flex items-center gap-1">
                  <Truck className="h-3 w-3 text-[#4b3b2f]" />
                  <span>Lieferzeiten</span>
                </span>
                <div className="text-[11px] text-[#4b3b2f] space-y-0.5 font-mono">
                  <div>Mo–Fr: 16:00–21:45</div>
                  <div>Sa: 14:00–21:45</div>
                  <div>So: 11:30–21:45</div>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <a
                href="tel:+4921669786951"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#d99036] hover:bg-[#85b0cb] text-[#16202a] font-black text-xs uppercase tracking-wider transition-colors shadow-sm"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>02166 9786951</span>
              </a>

              <a
                href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
                  '🔥 [SCHNITZEL SCHMIEDE MÖNCHENGLADBACH · Dohler Str. 269]\n\nHallo Team der Schnitzelschmiede, ich habe eine Frage zu den aktuellen Öffnungs- oder Lieferzeiten:'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>WhatsApp Live</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
