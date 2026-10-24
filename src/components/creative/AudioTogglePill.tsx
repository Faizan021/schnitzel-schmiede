'use client';

import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { toggleSound, playCrunchSound } from './AudioCrunchEngine';
import { useLanguage } from '../providers/LanguageContext';

export function AudioTogglePill() {
  const [enabled, setEnabled] = useState(true);
  const { lang } = useLanguage();
  const isEn = lang === 'en';

  const handleToggle = () => {
    const nextState = toggleSound();
    setEnabled(nextState);
    if (nextState) {
      playCrunchSound();
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#16161C]/90 px-3 py-1 text-[11px] font-semibold text-[#C4BFB5] hover:text-[#E6B84A] hover:border-[#E6B84A]/30 transition-all backdrop-blur-md cursor-pointer"
      title={
        enabled
          ? isEn
            ? 'Disable sound effects'
            : 'Sound-Effekte deaktivieren'
          : isEn
          ? 'Enable sound effects'
          : 'Sound-Effekte aktivieren'
      }
    >
      {enabled ? (
        <>
          <Volume2 className="h-3.5 w-3.5 text-[#E6B84A]" />
          <span>{isEn ? 'Crunch Audio: On' : 'Crunch-Audio: An'}</span>
        </>
      ) : (
        <>
          <VolumeX className="h-3.5 w-3.5 text-neutral-500" />
          <span>{isEn ? 'Audio: Off' : 'Sound: Aus'}</span>
        </>
      )}
    </button>
  );
}
