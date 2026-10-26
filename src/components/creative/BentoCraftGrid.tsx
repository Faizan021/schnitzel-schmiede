'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Flame,
  Volume2,
  CheckCircle2,
  Waves,
  Bike,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Compass,
  Sliders,
} from 'lucide-react';
import { playSizzleSound } from './AudioCrunchEngine';
import { useLanguage } from '../providers/LanguageContext';

export function BentoCraftGrid() {
  const { lang } = useLanguage();
  const isEn = lang === 'en';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const [isPlayingSound, setIsPlayingSound] = useState(false);

  const handlePlaySound = () => {
    setIsPlayingSound(true);
    playSizzleSound();
    setTimeout(() => setIsPlayingSound(false), 1500);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-[#edf7fc] via-[#ddeef7] to-[#edf7fc] border-t border-[#b8d4e8]/60 relative">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 space-y-10">
        
        {/* Section Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#b8d4e8] text-xs font-mono font-bold text-[#1a3a52] uppercase tracking-wider shadow-sm">
            <Sliders className="h-3.5 w-3.5 text-[#2e5f7e]" />
            <span>{isEn ? 'INTERACTIVE CRAFT BENTO' : 'INTERAKTIVER KRAFT-BENTO'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#1a3a52] font-serif tracking-tight">
            {isEn ? 'THE CRAFT FORGE' : 'DIE HANDWERKS-SCHMIEDE'}
          </h2>
          <p className="text-sm sm:text-base text-[#2e5f7e] max-w-2xl">
            {isEn
              ? 'Precision culinary craft meets gentle butter heat. Explore our meat cuts, skillet acoustics, sauce alchemy lab, and delivery radius.'
              : 'Präzise Kulinarik trifft sanfte Butterschmalz-Hitze. Erforschen Sie Zuschnitt, Pfannen-Akustik, Saucen-Labor und Kurier-Radius.'}
          </p>
        </div>

        {/* 4 Bento Chapters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* BENTO TILE 1: THE MEAT FORGE (Zuschnitt & Textur) */}
          <div className="rounded-2xl overflow-hidden border border-white/90 bg-white/85 backdrop-blur-md shadow-lg shadow-[#1a3a52]/5 flex flex-col justify-between">
            <div className="relative h-56 w-full overflow-hidden bg-[#ddeef7]">
              <Image
                src={`${basePath}/images/stitch/schnitzel-hero-stitch.jpg`}
                alt="Die Schmiede Goldbraunes Kalbsschnitzel"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover object-center transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent" />
              
              <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-md border border-[#b8d4e8] rounded-full text-[11px] font-mono font-bold text-[#1a3a52] flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9bc1d9]" />
                  100% REGIONAL FRESH CUTS · NIEDERRHEIN
                </span>
                <span className="p-1 rounded-full bg-white/90 border border-[#b8d4e8] text-emerald-600 shadow-sm">
                  <CheckCircle2 className="h-4 w-4" />
                </span>
              </div>
            </div>

            <div className="p-5 space-y-4 -mt-2 relative z-10">
              <div className="flex items-baseline justify-between border-b border-[#b8d4e8]/60 pb-2">
                <div>
                  <span className="text-xs font-mono font-bold text-[#163044] tracking-wider uppercase block">
                    KAPITEL 01 // TEXTUR
                  </span>
                  <h3 className="text-xl font-bold font-serif text-[#1a3a52]">
                    {isEn ? 'The Meat Craft' : 'Das Fleischhandwerk'}
                  </h3>
                </div>
                <span className="text-xs font-mono font-black text-[#1a3a52] bg-[#cce3f1] px-2.5 py-1 rounded border border-[#b8d4e8]">
                  180g - 240g CUT
                </span>
              </div>

              {/* Spec Tags */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#f0f7fb] border border-[#b8d4e8]/60">
                  <span className="text-[#163044] font-bold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9bc1d9]" />
                    REIFEGRAD
                  </span>
                  <span className="font-black text-[#1a3a52]">Dry-Aged 21 Tage</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#f0f7fb] border border-[#b8d4e8]/60">
                  <span className="text-[#163044] font-bold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9bc1d9]" />
                    SCHNITTVERFAHREN
                  </span>
                  <span className="font-black text-[#1a3a52]">Präzisions-Klopfschnitt</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#f0f7fb] border border-[#b8d4e8]/60">
                  <span className="text-[#163044] font-bold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9bc1d9]" />
                    HERKUNFT
                  </span>
                  <span className="font-black text-[#1a3a52]">Metzgerei Stüttgen MG</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-[#163044] font-bold pt-1">
                <span className="flex items-center gap-1.5">
                  <Waves className="h-3.5 w-3.5 text-[#1a3a52]" />
                  PANIERUNG: WELLEN-SOUFFLÉ
                </span>
                <span className="text-[#1a3a52] font-black">CRUST: 185°C</span>
              </div>
            </div>
          </div>

          {/* BENTO TILE 2: BUTTER-PAN SIZZLE (Akustik & Pfanne) */}
          <div className="rounded-2xl p-6 border border-white/90 bg-white/85 backdrop-blur-md shadow-lg shadow-[#1a3a52]/5 flex flex-col justify-between space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-[#163044] tracking-wider uppercase block">
                  KAPITEL 02 // AKUSTIK
                </span>
                <h3 className="text-xl font-bold font-serif text-[#1a3a52]">
                  {isEn ? 'The Pan Alchemy' : 'Die Pfannen-Alchemie'}
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded bg-[#cce3f1] border border-[#b8d4e8] text-xs font-mono font-black text-[#1a3a52]">
                100% REINES BUTTERSCHMALZ
              </span>
            </div>

            {/* Live Sonic Wave Visualizer */}
            <div className="p-4 rounded-xl bg-[#f0f7fb] border border-[#b8d4e8]/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#1a3a52] font-black flex items-center gap-1.5">
                  <Volume2 className="h-4 w-4 text-[#1a3a52]" />
                  SIZZLE AUDIO LIVE
                </span>
                <span className="text-xs font-mono font-bold text-[#163044]">92 dB CRUNCH</span>
              </div>

              {/* Animated waveform bars */}
              <div className="flex items-center justify-center gap-1.5 h-14">
                {[12, 28, 48, 35, 52, 20, 42, 60, 45, 25, 50, 32, 58, 22].map((height, idx) => (
                  <span
                    key={idx}
                    style={{ height: isPlayingSound ? `${height}px` : '14px' }}
                    className="w-1.5 bg-gradient-to-t from-[#1a3a52] via-[#2e5f7e] to-[#9bc1d9] rounded-full transition-all duration-300"
                  />
                ))}
              </div>

              <p className="text-xs text-[#163044] font-medium italic text-center">
                &quot;Das hörbare Ausbacken im schäumenden Schmalz bei exakt 178°C.&quot;
              </p>
            </div>

            <button
              onClick={handlePlaySound}
              className="w-full py-3 rounded-xl bg-[#9bc1d9] hover:bg-[#85b0cb] text-xs font-mono font-black text-[#1a3a52] transition-all flex items-center justify-center gap-2 uppercase tracking-wider active:scale-98 shadow-sm cursor-pointer"
            >
              <Volume2 className="h-4 w-4 text-[#1a3a52]" />
              <span>{isEn ? 'PLAY CRUNCH SOUND' : 'SOUND ANHÖREN (KNISTERN)'}</span>
            </button>
          </div>

          {/* BENTO TILE 3: SAUCE ALCHEMY LAB (mit Stitch Pan Foto) */}
          <div className="rounded-2xl overflow-hidden border border-white/90 bg-white/85 backdrop-blur-md shadow-lg shadow-[#1a3a52]/5 flex flex-col justify-between">
            <div className="relative h-56 w-full overflow-hidden bg-[#ddeef7]">
              <Image
                src={`${basePath}/images/stitch/sauce-pan-stitch.jpg`}
                alt="Artisanal Sauce Alchemy Skillet - Champignon Rahm"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover object-center transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent" />
              
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md border border-[#b8d4e8] px-3 py-1 rounded-full text-[11px] font-mono font-bold text-[#1a3a52] shadow-sm">
                FOND: 48h RINDERKNOCHEN REDUKTION
              </div>
            </div>

            <div className="p-5 space-y-3 -mt-2 relative z-10">
              <div className="flex items-baseline justify-between border-b border-[#b8d4e8]/60 pb-2">
                <div>
                  <span className="text-[10px] font-mono text-[#2e5f7e] tracking-wider uppercase block">
                    KAPITEL 03 // EXTRAKT
                  </span>
                  <h3 className="text-xl font-bold font-serif text-[#1a3a52]">
                    Sauce Alchemy Lab
                  </h3>
                </div>
                <span className="text-xs font-mono font-bold text-[#2e5f7e]">
                  SEPARAT IM GLAS
                </span>
              </div>

              {/* 3 Signature Sauces with Radar Metrics */}
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-[#f0f7fb] border border-[#b8d4e8]/60 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[#1a3a52] block">Schmiede-Rahm (+4.80 €)</span>
                    <span className="text-[11px] text-[#2e5f7e]">Pfifferlinge & Waldpilze</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#1a3a52] font-semibold bg-[#cce3f1] px-2 py-0.5 rounded">
                    SCHMELZ 5/5
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-[#f0f7fb] border border-[#b8d4e8]/60 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[#1a3a52] block">Pfeffer-Cognac Glacé</span>
                    <span className="text-[11px] text-[#2e5f7e]">Madagaskar Pfeffer & Rémy</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#1a3a52] font-semibold bg-[#cce3f1] px-2 py-0.5 rounded">
                    FEUER 4/5
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-[#f0f7fb] border border-[#b8d4e8]/60 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[#1a3a52] block">Preiselbeer-Chili Chutney</span>
                    <span className="text-[11px] text-[#2e5f7e]">Wildfrüchte & Schärfe</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#1a3a52] font-semibold bg-[#cce3f1] px-2 py-0.5 rounded">
                    FRUCHT 4/5
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* BENTO TILE 4: SCHNITZELTAXI MG (Logistik & Radius) */}
          <div className="rounded-2xl p-6 border border-white/90 bg-white/85 backdrop-blur-md shadow-lg shadow-[#1a3a52]/5 flex flex-col justify-between space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#2e5f7e] tracking-wider uppercase block">
                  KAPITEL 04 // LOGISTIK
                </span>
                <h3 className="text-xl font-bold font-serif text-[#1a3a52]">
                  Schnitzeltaxi Mönchengladbach
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#cce3f1] border border-[#b8d4e8] text-[10px] font-mono font-bold text-[#1a3a52] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                ONLINE
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#f0f7fb] border border-[#b8d4e8]/60 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#2e5f7e]">ZENTRALE:</span>
                <span className="font-bold text-[#1a3a52]">Dohler Str. 269, 41238 MG</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-lg bg-white border border-[#b8d4e8]/50 shadow-sm">
                  <span className="text-[10px] font-mono text-[#2e5f7e] block">ZONE 1 (0–5 km)</span>
                  <span className="font-bold text-[#1a3a52]">~ 20 Min</span>
                  <span className="text-[10px] text-emerald-600 block">Frisch & Knusprig</span>
                </div>
                <div className="p-2 rounded-lg bg-white border border-[#b8d4e8]/50 shadow-sm">
                  <span className="text-[10px] font-mono text-[#2e5f7e] block">ZONE 2 (5–12 km)</span>
                  <span className="font-bold text-[#1a3a52]">~ 35 Min</span>
                  <span className="text-[10px] text-[#2e5f7e] block">Thermo-Spezialbox</span>
                </div>
              </div>
            </div>

            <Link href="/speisekarte">
              <button className="w-full py-3 rounded-xl bg-[#9bc1d9] hover:bg-[#85b0cb] text-[#1a3a52] font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer">
                <Bike className="h-4 w-4" />
                <span>{isEn ? 'ORDER SCHNITZELTAXI NOW' : 'SCHNITZELTAXI JETZT BESTELLEN'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
