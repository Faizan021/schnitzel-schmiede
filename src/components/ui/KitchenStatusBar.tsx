'use client';

import React, { useSyncExternalStore } from 'react';
import { getLiveKitchenStatus, KitchenStatus } from '@/lib/utils/kitchenStatus';
import { Clock } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageContext';

let cachedStatusDe: KitchenStatus | null = null;
let cachedStatusEn: KitchenStatus | null = null;
let lastCheckTime = 0;

function subscribe(callback: () => void) {
  const interval = setInterval(() => {
    cachedStatusDe = getLiveKitchenStatus(new Date(), 'de');
    cachedStatusEn = getLiveKitchenStatus(new Date(), 'en');
    lastCheckTime = Date.now();
    callback();
  }, 60000);
  return () => clearInterval(interval);
}

function getSnapshotDe(): KitchenStatus {
  const now = Date.now();
  if (!cachedStatusDe || now - lastCheckTime > 30000) {
    cachedStatusDe = getLiveKitchenStatus(new Date(), 'de');
    lastCheckTime = now;
  }
  return cachedStatusDe;
}

function getSnapshotEn(): KitchenStatus {
  const now = Date.now();
  if (!cachedStatusEn || now - lastCheckTime > 30000) {
    cachedStatusEn = getLiveKitchenStatus(new Date(), 'en');
    lastCheckTime = now;
  }
  return cachedStatusEn;
}

function getServerSnapshot(): KitchenStatus | null {
  return null;
}

export function KitchenStatusBar() {
  const { lang } = useLanguage();
  const status = useSyncExternalStore(
    subscribe,
    lang === 'en' ? getSnapshotEn : getSnapshotDe,
    getServerSnapshot
  );

  if (!status) return null;

  const dotColors = {
    emerald: 'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]',
    amber: 'bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.8)]',
    ruby: 'bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.8)]',
  }[status.statusColor];

  return (
    <div className="inline-flex items-center gap-2.5 rounded-full border border-[#534434]/40 bg-[#1D1B1A]/90 px-3.5 py-1.5 text-xs font-mono backdrop-blur-md shadow-sm">
      <span className="relative flex h-2.5 w-2.5 items-center justify-center">
        <span
          className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${dotColors}`}
        />
        <span className={`relative inline-flex h-2 w-2 rounded-full ${dotColors}`} />
      </span>
      <span className="font-bold text-[#E6E1DF] tracking-wide">{status.statusBadge}</span>
      <span className="hidden sm:inline-block text-[#A08E7A] font-normal border-l border-[#534434]/40 pl-2.5">
        <Clock className="inline-block h-3.5 w-3.5 mr-1.5 -mt-0.5 text-[#F59E0B]" />
        {status.details}
      </span>
    </div>
  );
}
