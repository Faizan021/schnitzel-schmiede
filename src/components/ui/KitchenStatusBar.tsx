'use client';

import React, { useSyncExternalStore } from 'react';
import { getLiveKitchenStatus, KitchenStatus } from '@/lib/utils/kitchenStatus';
import { Clock } from 'lucide-react';

let cachedStatus: KitchenStatus | null = null;
let lastCheckTime = 0;

function subscribe(callback: () => void) {
  const interval = setInterval(() => {
    cachedStatus = getLiveKitchenStatus();
    lastCheckTime = Date.now();
    callback();
  }, 60000);
  return () => clearInterval(interval);
}

function getSnapshot(): KitchenStatus {
  const now = Date.now();
  if (!cachedStatus || now - lastCheckTime > 30000) {
    cachedStatus = getLiveKitchenStatus();
    lastCheckTime = now;
  }
  return cachedStatus;
}

function getServerSnapshot(): KitchenStatus | null {
  return null;
}

export function KitchenStatusBar() {
  const status = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!status) return null;

  const dotColors = {
    emerald: 'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]',
    amber: 'bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.8)]',
    ruby: 'bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.8)]',
  }[status.statusColor];

  return (
    <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-[#16161C]/90 px-3.5 py-1.5 text-xs backdrop-blur-md">
      <span className="relative flex h-2.5 w-2.5 items-center justify-center">
        <span
          className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${dotColors}`}
        />
        <span className={`relative inline-flex h-2 w-2 rounded-full ${dotColors}`} />
      </span>
      <span className="font-semibold text-[#FDFBF7]">{status.statusBadge}</span>
      <span className="hidden sm:inline-block text-[#C4BFB5]/80 font-normal border-l border-white/10 pl-2">
        <Clock className="inline-block h-3.5 w-3.5 mr-1 -mt-0.5" />
        {status.details}
      </span>
    </div>
  );
}
