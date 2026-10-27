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
    <section className="py-20 bg-gradient-to-b from-[#faf7f2] via-[#f5efe6] to-[#faf7f2] border-t border-[#e8d5be]/70 relative">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 space-y-10">
        
        {/* Section Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#e8d5be] text-xs font-mono font-bold text-[#b45309] uppercase tracking-wider shadow-sm">
            <Sliders className="h-3.5 w-3.5 text-[#d99036]" />
            <span>{isEn ? 'INTERACTIVE CRAFT BENTO' : 'INTERAKTIVER KRAFT-BENTO'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#16202a] font-serif tracking-tight">
            {isEn ? 'THE CRAFT FORGE' : 'DIE HANDWERKS-SCHMIEDE'}
          </h2>
          <p className="text-sm sm:text-base text-[#4b3b2f] max-w-2xl">
            {isEn
              ? 'Precision culinary craft meets gentle butter heat. Explore our meat cuts, skillet acoustics, sauce alchemy lab, and delivery radius.'
              : 'Präzise Kulinarik trifft sanfte Butterschmalz-Hitze. Erforschen Sie Zuschnitt, Pfannen-Akustik, Saucen-Labor und Kurier-Radius.'}
          </p>
        </div>

        {/* 4 Bento Chapters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* BENTO TILE 1: THE MEAT FORGE (Zuschnitt & Textur) */}
          <div className="rounded-2xl overflow-hidden border border-[#e8d5be] bg-white/95 backdrop-blur-md shadow-lg shadow-[#16202a]/5 flex flex-col justify-between">
            <div className="relative h-56 w-full overflow-hidden bg-[#f4ede4]">
              <Image
                src={`${basePath}/images/stitch/schnitzel-hero-stitch.jpg`}
                alt="Die Schmiede Goldbraunes Kalbsschnitzel"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover object-center transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent" />
              
              <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-md border border-[#e8d5be] rounded-full text-[11px] font-mono font-bold text-[#16202a] flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d99036]" />
                  100% REGIONAL FRESH CUTS · NIEDERRHEIN
                </span>
                <span className="p-1 rounded-full bg-white/90 border border-[#e8d5be] text-emerald-600 shadow-sm">
                  <CheckCircle2 className="h-4 w-4" />
                </span>
              </div>
            </div>

            <div className="p-5 space-y-4 -mt-2 relative z-10">
              <div className="flex items-baseline justify-between border-b border-[#e8d5be]/70 pb-2">
                <div>
                  <span className="text-xs font-mono font-bold text-[#b45309] tracking-wider uppercase block">
                    KAPITEL 01 // TEXTUR
                  </span>
                  <h3 className="text-xl font-bold font-serif text-[#16202a]">
                    {isEn ? 'The Meat Craft' : 'Das Fleischhandwerk'}
                  </h3>
                </div>
                <span className="text-xs font-mono font-black text-[#b45309] bg-[#ffedd5] px-2.5 py-1 rounded border border-[#fed7aa]">
                  180g - 240g CUT
                </span>
              </div>

              {/* Spec Tags */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-[#e8d5be]">
                  <span className="text-[#4b3b2f] font-bold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d99036]" />
                    REIFEGRAD
                  </span>
                  <span className="font-black text-[#16202a]">Dry-Aged 21 Tage</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-[#e8d5be]">
                  <span className="text-[#4b3b2f] font-bold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d99036]" />
                    SCHNITTVERFAHREN
                  </span>
                  <span className="font-black text-[#16202a]">Präzisions-Klopfschnitt</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-[#e8d5be]">
                  <span className="text-[#4b3b2f] font-bold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d99036]" />
                    HERKUNFT
                  </span>
                  <span className="font-black text-[#16202a]">Metzgerei Stüttgen MG</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-[#4b3b2f] font-bold pt-1">
                <span className="flex items-center gap-1.5 text-[#16202a]">
                  <Waves className="h-3.5 w-3.5 text-[#d99036]" />
                  PANIERUNG: WELLEN-SOUFFLÉ
                </span>
                <span className="text-[#b45309] font-black">CRUST: 185°C</span>
              </div>
            </div>
          </div>

          {/* BENTO TILE 2: BUTTER-PAN SIZZLE (Akustik & Pfanne) */}
          <div className="rounded-2xl p-6 border border-[#e8d5be] bg-white/95 backdrop-blur-md shadow-lg shadow-[#16202a]/5 flex flex-col justify-between space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-[#b45309] tracking-wider uppercase block">
                  KAPITEL 02 // AKUSTIK
                </span>
                <h3 className="text-xl font-bold font-serif text-[#16202a]">
                  {isEn ? 'The Pan Alchemy' : 'Die Pfannen-Alchemie'}
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded bg-[#ffedd5] border border-[#fed7aa] text-xs font-mono font-black text-[#b45309]">
                100% REINES BUTTERSCHMALZ
              </span>
            </div>

            {/* Live Sonic Wave Visualizer */}
            <div className="p-4 rounded-xl bg-[#fffbf5] border border-[#e8d5be] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#16202a] font-black flex items-center gap-1.5">
                  <Volume2 className="h-4 w-4 text-[#d99036]" />
                  SIZZLE AUDIO LIVE
                </span>
                <span className="text-xs font-mono font-bold text-[#b45309]">92 dB CRUNCH</span>
              </div>

              {/* Animated waveform bars */}
              <div className="flex items-center justify-center gap-1.5 h-14">
                {[12, 28, 48, 35, 52, 20, 42, 60, 45, 25, 50, 32, 58, 22].map((height, idx) => (
                  <span
                    key={idx}
                    style={{ height: isPlayingSound ? `${height}px` : '14px' }}
                    className="w-1.5 bg-gradient-to-t from-[#b45309] via-[#d99036] to-[#f59e0b] rounded-full transition-all duration-300"
                  />
                ))}
              </div>

              <p className="text-xs text-[#4b3b2f] font-medium italic text-center">
                &quot;Das hörbare Ausbacken im schäumenden Schmalz bei exakt 178°C.&quot;
              </p>
            </div>

            <button
              onClick={handlePlaySound}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#d99036] to-[#b45309] hover:from-[#e09b43] hover:to-[#c25c0e] text-xs font-mono font-black text-white transition-all flex items-center justify-center gap-2 uppercase tracking-wider active:scale-98 shadow-md shadow-[#d99036]/25 cursor-pointer"
            >
              <Volume2 className="h-4 w-4 text-white" />
              <span>{isEn ? 'PLAY CRUNCH SOUND' : 'SOUND ANHÖREN (KNISTERN)'}</span>
            </button>
          </div>

          {/* BENTO TILE 3: SAUCE ALCHEMY LAB (mit Stitch Pan Foto) */}
          <div className="rounded-2xl overflow-hidden border border-[#e8d5be] bg-white/95 backdrop-blur-md shadow-lg shadow-[#16202a]/5 flex flex-col justify-between">
            <div className="relative h-56 w-full overflow-hidden bg-[#f4ede4]">
              <Image
                src={`${basePath}/images/stitch/sauce-pan-stitch.jpg`}
                alt="Artisanal Sauce Alchemy Skillet - Champignon Rahm"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover object-center transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent" />
              
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md border border-[#e8d5be] px-3 py-1 rounded-full text-[11px] font-mono font-bold text-[#16202a] shadow-sm">
                FOND: 48h RINDERKNOCHEN REDUKTION
              </div>
            </div>

            <div className="p-5 space-y-3 -mt-2 relative z-10">
              <div className="flex items-baseline justify-between border-b border-[#e8d5be]/70 pb-2">
                <div>
                  <span className="text-[10px] font-mono text-[#b45309] tracking-wider uppercase block">
                    KAPITEL 03 // EXTRAKT
                  </span>
                  <h3 className="text-xl font-bold font-serif text-[#16202a]">
                    Sauce Alchemy Lab
                  </h3>
                </div>
                <span className="text-xs font-mono font-bold text-[#b45309]">
                  SEPARAT IM GLAS
                </span>
              </div>

              {/* 3 Signature Sauces with Radar Metrics */}
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-white border border-[#e8d5be] flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[#16202a] block">Schmiede-Rahm (+4.80 €)</span>
                    <span className="text-[11px] text-[#4b3b2f]">Pfifferlinge & Waldpilze</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#b45309] font-bold bg-[#ffedd5] px-2 py-0.5 rounded border border-[#fed7aa]">
                    SCHMELZ 5/5
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-white border border-[#e8d5be] flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[#16202a] block">Pfeffer-Cognac Glacé</span>
                    <span className="text-[11px] text-[#4b3b2f]">Madagaskar Pfeffer & Rémy</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#b45309] font-bold bg-[#ffedd5] px-2 py-0.5 rounded border border-[#fed7aa]">
                    FEUER 4/5
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-white border border-[#e8d5be] flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[#16202a] block">Preiselbeer-Chili Chutney</span>
                    <span className="text-[11px] text-[#4b3b2f]">Wildfrüchte & Schärfe</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#b45309] font-bold bg-[#ffedd5] px-2 py-0.5 rounded border border-[#fed7aa]">
                    FRUCHT 4/5
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* BENTO TILE 4: SCHNITZELTAXI MG (Logistik & Radius) */}
          <div className="rounded-2xl p-6 border border-[#e8d5be] bg-white/95 backdrop-blur-md shadow-lg shadow-[#16202a]/5 flex flex-col justify-between space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#b45309] tracking-wider uppercase block">
                  KAPITEL 04 // LOGISTIK
                </span>
                <h3 className="text-xl font-bold font-serif text-[#16202a]">
                  Schnitzeltaxi Mönchengladbach
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#ffedd5] border border-[#fed7aa] text-[10px] font-mono font-bold text-[#b45309] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                ONLINE
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#fffbf5] border border-[#e8d5be] space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#b45309]">ZENTRALE:</span>
                <span className="font-bold text-[#16202a]">Dohler Str. 269, 41238 MG</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-lg bg-white border border-[#e8d5be] shadow-sm">
                  <span className="text-[10px] font-mono text-[#b45309] block">ZONE 1 (0–5 km)</span>
                  <span className="font-bold text-[#16202a]">~ 20 Min</span>
                  <span className="text-[10px] text-emerald-600 block">Frisch & Knusprig</span>
                </div>
                <div className="p-2 rounded-lg bg-white border border-[#e8d5be] shadow-sm">
                  <span className="text-[10px] font-mono text-[#b45309] block">ZONE 2 (5–12 km)</span>
                  <span className="font-bold text-[#16202a]">~ 35 Min</span>
                  <span className="text-[10px] text-[#4b3b2f] block">Thermo-Spezialbox</span>
                </div>
              </div>
            </div>

            <Link href="/speisekarte">
              <button className="w-full py-3 rounded-xl bg-gradient-to-r from-[#d99036] to-[#b45309] hover:from-[#e09b43] hover:to-[#c25c0e] text-white font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md shadow-[#d99036]/25 cursor-pointer">
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
