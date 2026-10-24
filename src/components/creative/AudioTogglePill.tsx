'use client';

import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { toggleSound, playCrunchSound } from './AudioCrunchEngine';

export function AudioTogglePill() {
  const [enabled, setEnabled] = useState(true);

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
      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#16161C]/90 px-3 py-1 text-[11px] font-semibold text-[#C4BFB5] hover:text-[#E6B84A] hover:border-[#E6B84A]/30 transition-all backdrop-blur-md"
      title={enabled ? 'Sound-Effekte deaktivieren' : 'Sound-Effekte aktivieren'}
    >
      {enabled ? (
        <>
          <Volume2 className="h-3.5 w-3.5 text-[#E6B84A]" />
          <span>Crunch-Audio: An</span>
        </>
      ) : (
        <>
          <VolumeX className="h-3.5 w-3.5 text-neutral-500" />
          <span>Sound: Aus</span>
        </>
      )}
    </button>
  );
}
