'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  Flame,
  Sparkles,
  Calendar,
  Bike,
  Star,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Award,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Utensils,
  MessageSquare,
  Phone,
} from 'lucide-react';
import { playSizzleSound, playSkilletSizzleSimulation } from './AudioCrunchEngine';
import { useLanguage } from '../providers/LanguageContext';
import { getKitchenWhatsAppNumber } from '@/lib/utils/whatsapp';

export function InteractiveSizzleHero() {
  const { lang } = useLanguage();
  const isEn = lang === 'en';
  const whatsappPhone = getKitchenWhatsAppNumber();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const [isSizzlingActive, setIsSizzlingActive] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const whatsappHeroUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
    '🔥 [SCHNITZEL SCHMIEDE MÖNCHENGLADBACH · Dohler Str. 269]\n\nHallo Team der Schnitzelschmiede, ich möchte gerne bestellen / eine Frage stellen:'
  )}`;

  const showcaseVideoRef = useRef<HTMLVideoElement | null>(null);

  const handleTogglePlay = () => {
    if (!showcaseVideoRef.current) return;
    if (showcaseVideoRef.current.paused) {
      showcaseVideoRef.current.play();
      setIsPlayingVideo(true);
    } else {
      showcaseVideoRef.current.pause();
      setIsPlayingVideo(false);
    }
  };

  const handleToggleMute = () => {
    if (!showcaseVideoRef.current) return;
    showcaseVideoRef.current.muted = !showcaseVideoRef.current.muted;
    setIsMuted(showcaseVideoRef.current.muted);
  };

  const handleTriggerSizzle = () => {
    setIsSizzlingActive(true);
    playSkilletSizzleSimulation(3000);
    setTimeout(() => setIsSizzlingActive(false), 3000);
  };

  // 3D Tilt Spring Physics
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
    damping: 25,
    stiffness: 140,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    damping: 25,
    stiffness: 140,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 bg-[#edf7fc]">
      {/* Full-Bleed Cinematic Background Video (No Old Poster Flash) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-cover object-center filter brightness-[0.98] contrast-[1.05] opacity-40 transition-opacity duration-1000"
        >
          <source src={`${basePath}/videos/kitchen-free.mp4`} type="video/mp4" />
          <source src={`${basePath}/videos/zeitlos-hero.mp4`} type="video/mp4" />
        </video>
        {/* BebeQ Light Frosted Ambient Overlays - Crystal Text Visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#edf7fc]/70 via-[#ddeef7]/50 to-[#edf7fc]/95 backdrop-blur-[1px]" />
      </div>

      {/* Soft BebeQ Glacier & Riviera Blue Light Pools */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-[#9bc1d9]/25 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-[420px] h-[420px] bg-[#b8d4e8]/35 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#ffecd2]/30 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 w-full space-y-8">
        {/* Hero Editorial Statement: BebeQ Deep Marine & Sky Blue */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 border border-[#b8d4e8] shadow-sm backdrop-blur-md">
            <Flame className="h-4 w-4 text-[#a87b41] fill-[#a87b41]" />
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#1a3a52] uppercase font-mono">
              DIE SCHNITZEL SCHMIEDE
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#1a3a52] font-serif leading-[1.1] max-w-4xl mx-auto">
            {isEn ? (
              <>
                WHERE CRAFT MEETS THE{' '}
                <span className="italic text-[#d99036] drop-shadow-sm">
                  GOLDEN CRUST.
                </span>
              </>
            ) : (
              <>
                WO DIE SCHMIEDE AUF DIE{' '}
                <span className="italic text-[#d99036] drop-shadow-sm">
                  GOLDENE KRUSTE TRIFFT.
                </span>
              </>
            )}
          </h1>

          <div className="inline-block bg-white/75 backdrop-blur-sm px-4 py-1.5 rounded-xl border border-[#b8d4e8]/60 text-[11px] sm:text-xs font-mono text-[#2e5f7e] tracking-wider uppercase shadow-sm">
            {isEn
              ? 'CINEMATIC KITCHEN // BUTTER-SIZZLE @ 178°C // ARTISANAL VEAL CUTLET'
              : 'CINEMATISCHE KÜCHE // BUTTER-SIZZLE @ 178°C // KALBFLEISCH ARTISANAL'}
          </div>
        </div>

        {/* Visual Centerpiece: BebeQ Frosted Glass Dish Matrix with Live Video Showcase */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative rounded-2xl bg-white/80 backdrop-blur-md p-2.5 sm:p-6 border border-white shadow-[0_20px_50px_rgba(26,58,82,0.1)] overflow-hidden"
        >
          {/* Top Edge Glow */}
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#9bc1d9] to-transparent opacity-90" />

          {/* Dish Showcase Container with Live Cinematic Video */}
          <div className="relative w-full h-80 sm:h-auto sm:aspect-[21/9] rounded-xl overflow-hidden border border-[#b8d4e8]/50 bg-[#1a3a52] shadow-inner group">
            {/* Live Video Element */}
            <video
              ref={showcaseVideoRef}
              autoPlay
              muted={isMuted}
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            >
              <source src={`${basePath}/videos/pan-sizzle-free.mp4`} type="video/mp4" />
              <source src={`${basePath}/videos/kitchen-free.mp4`} type="video/mp4" />
            </video>

            {/* Cinematic Shadow Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a52]/90 via-transparent to-black/30 pointer-events-none" />

            {/* Top Interactive Row: Origin Badge + Controls (Never Clips or Hides on Mobile) */}
            <div className="absolute top-3 inset-x-3 flex items-center justify-between z-20 gap-2">
              {/* Origin badge - visible on tablet and desktop to preserve mobile space */}
              <div className="hidden sm:flex bg-white/90 backdrop-blur-md border border-white px-3 py-1 rounded-lg text-xs font-bold text-[#1a3a52] items-center gap-1.5 shadow-md shrink-0">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>{isEn ? 'LIVE FORGE' : 'PFANNEN-KUNST'}</span>
              </div>

              {/* Action buttons with plenty of breathing room */}
              <div className="flex items-center gap-2 sm:gap-2.5 ml-auto shrink-0">
                {/* Play / Pause Toggle */}
                <button
                  type="button"
                  onClick={handleTogglePlay}
                  className="h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center rounded-xl bg-white/95 hover:bg-white text-[#1a3a52] backdrop-blur-md border border-[#b8d4e8] transition-all shadow-md cursor-pointer active:scale-95 shrink-0"
                  title={isPlayingVideo ? 'Pause Video' : 'Play Video'}
                  aria-label="Video Play/Pause"
                >
                  {isPlayingVideo ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current" />}
                </button>

                {/* Mute / Unmute Toggle */}
                <button
                  type="button"
                  onClick={handleToggleMute}
                  className="h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center rounded-xl bg-white/95 hover:bg-white text-[#1a3a52] backdrop-blur-md border border-[#b8d4e8] transition-all shadow-md cursor-pointer active:scale-95 shrink-0"
                  title={isMuted ? 'Unmute Video' : 'Mute Video'}
                  aria-label="Video Sound"
                >
                  {isMuted ? <VolumeX className="h-4 w-4 text-[#2e5f7e]" /> : <Volume2 className="h-4 w-4 text-emerald-600" />}
                </button>

                {/* Sizzle Simulator Interactive Toggle */}
                <button
                  type="button"
                  onClick={handleTriggerSizzle}
                  className={`h-8 sm:h-10 px-3 sm:px-4 rounded-xl text-xs font-mono font-bold tracking-wider flex items-center gap-1.5 transition-all shadow-md cursor-pointer active:scale-95 shrink-0 ${
                    isSizzlingActive
                      ? 'bg-[#9bc1d9] text-[#1a3a52] shadow-[#9bc1d9]/50 scale-105 border border-white'
                      : 'bg-white/95 backdrop-blur-md border border-[#b8d4e8] text-[#1a3a52] hover:bg-[#cce3f1]'
                  }`}
                >
                  <Flame className={`h-3.5 w-3.5 ${isSizzlingActive ? 'animate-bounce text-[#92601e]' : 'text-[#92601e]'}`} />
                  <span className="hidden sm:inline">
                    {isSizzlingActive
                      ? (isEn ? '🔥 SIZZLING @ 178°C' : '🔥 178°C BUTTER-HITZE')
                      : (isEn ? 'Sizzle Sound 🔊' : 'Pfannen-Hitze zünden 🔊')}
                  </span>
                  <span className="sm:hidden">
                    {isSizzlingActive ? '🔥 178°C' : 'Hitze 🔊'}
                  </span>
                </button>
              </div>
            </div>

            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white pointer-events-none">
              <div className="pr-2">
                <p className="text-[10px] sm:text-xs font-mono text-[#ffecd2] uppercase tracking-wider">
                  MASTERPIECE SPEISE NR. 01
                </p>
                <h3 className="text-base sm:text-2xl font-bold font-serif text-white drop-shadow">
                  Original Wiener Schnitzel
                </h3>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xl sm:text-3xl font-black font-mono tracking-tight text-[#ffecd2] drop-shadow">
                  12,90 €
                </span>
              </div>
            </div>
          </div>

          {/* 4 Exploded Anatomical Callouts - High Contrast */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4">
            <div className="p-3.5 rounded-xl bg-white/90 border border-[#b8d4e8]/60 hover:border-[#9bc1d9] transition-colors shadow-sm">
              <span className="text-xs font-mono font-bold text-[#163044] block">
                [01] SOUFFLÉ-PANADE
              </span>
              <p className="text-xs sm:text-sm text-[#1a3a52] font-black mt-1">
                {isEn ? 'Airy wave crust' : 'Luftige Wellenstruktur'}
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/90 border border-[#b8d4e8]/60 hover:border-[#9bc1d9] transition-colors shadow-sm">
              <span className="text-xs font-mono font-bold text-[#163044] block">
                [02] KALB & GEFLÜGEL
              </span>
              <p className="text-xs sm:text-sm text-[#1a3a52] font-black mt-1">
                {isEn ? 'Tender pounded cutlet' : 'Frisch von Hand geklopft'}
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/90 border border-[#b8d4e8]/60 hover:border-[#9bc1d9] transition-colors shadow-sm">
              <span className="text-xs font-mono font-bold text-[#163044] block">
                [03] KLÄRBUTTER-SIZZLE
              </span>
              <p className="text-xs sm:text-sm text-[#1a3a52] font-black mt-1">
                {isEn ? 'Pure clarified butter' : 'Reines Butterschmalz'}
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/90 border border-[#b8d4e8]/60 hover:border-[#9bc1d9] transition-colors shadow-sm">
              <span className="text-xs font-mono font-bold text-[#163044] block">
                [04] BIO-ZITRONE
              </span>
              <p className="text-xs sm:text-sm text-[#1a3a52] font-black mt-1">
                {isEn ? 'Fresh aromatic oils' : 'Frische ätherische Öle'}
              </p>
            </div>
          </div>
        </div>

        {/* Major Action Buttons: BebeQ Riviera Blue & Frosted Glass + Express Menu Jump */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/speisekarte"
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#9bc1d9] hover:bg-[#85b0cb] text-[#1a3a52] font-black text-sm tracking-wider uppercase shadow-lg shadow-[#9bc1d9]/30 transition-all active:scale-95 border border-white cursor-pointer"
            onMouseEnter={playSizzleSound}
          >
            <Bike className="h-5 w-5" />
            <span>{isEn ? 'ORDER SCHNITZELTAXI' : 'SCHNITZELTAXI BESTELLEN'}</span>
          </Link>

          <a
            href="#speisekarte-section"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white/90 hover:bg-[#cce3f1] text-[#1a3a52] font-black text-sm tracking-wider uppercase border border-[#b8d4e8] transition-all shadow-sm cursor-pointer"
          >
            <Utensils className="h-4 w-4 text-[#163044]" />
            <span>{isEn ? 'EXPLORE MENU' : 'SPEISEKARTE ÖFFNEN'}</span>
          </a>

          <Link
            href="/reservierung"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white/90 hover:bg-white text-[#1a3a52] font-black text-sm tracking-wider uppercase border border-[#b8d4e8] transition-all shadow-sm cursor-pointer"
          >
            <Calendar className="h-4 w-4 text-[#163044]" />
            <span>{isEn ? 'RESERVE TABLE' : 'TISCH RESERVIEREN'}</span>
          </Link>
        </div>

        {/* Quick Access Bento Grid - 3 Lead & Trust Anchors */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
          {/* Bento Item 1: Rating */}
          <div className="p-4 rounded-xl bg-white/95 border border-white shadow-sm flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1 text-[#92601e]">
                <Star className="h-4 w-4 fill-current text-[#92601e]" />
                <span className="text-sm font-black text-[#92601e]">4.9 / 5.0</span>
              </div>
              <p className="text-xs text-[#1a3a52] font-bold">
                {isEn ? 'From 850+ Guests' : 'Aus 850+ Schmiede-Gästen'}
              </p>
              <p className="text-[11px] text-emerald-700 font-extrabold uppercase">
                {isEn ? 'VERIFIED CRAFT' : 'VERIFIZIERTES HANDWERK'}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xl font-bold font-serif text-[#1a3a52]">Top 1%</span>
              <span className="block text-xs font-semibold text-[#163044]">Mönchengladbach</span>
            </div>
          </div>

          {/* Bento Item 2: Real Location & Phone */}
          <div className="p-4 rounded-xl bg-white/95 border border-white shadow-sm flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs font-mono text-[#163044] uppercase font-black flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-[#1a3a52]" />
                STANDORT
              </span>
              <p className="text-xs sm:text-sm text-[#1a3a52] font-bold">
                Dohler Str. 269
              </p>
              <p className="text-xs font-medium text-[#163044]">
                41238 Mönchengladbach
              </p>
            </div>
            <a
              href="tel:+4921669786951"
              className="text-xs font-mono font-black text-[#1a3a52] bg-[#cce3f1] px-3 py-2 rounded-lg border border-[#b8d4e8] hover:bg-[#9bc1d9] transition-colors"
              title="Telefonisch anrufen: 02166 9786951"
            >
              02166 9786951
            </a>
          </div>

          {/* Bento Item 3: Direct WhatsApp Fast-Lane (Owner Priority) */}
          <div className="p-4 rounded-xl bg-emerald-50/90 border border-emerald-300 shadow-sm flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs font-mono text-emerald-800 uppercase font-black flex items-center gap-1">
                <MessageSquare className="h-3.5 w-3.5 text-emerald-600 fill-emerald-600" />
                WHATSAPP LIVE
              </span>
              <p className="text-xs sm:text-sm text-emerald-950 font-black">
                0176 70341602
              </p>
              <p className="text-[11px] text-emerald-700 font-semibold">
                {isEn ? 'Instant Owner Chat' : 'Inhaber-Direktkontakt'}
              </p>
            </div>
            <a
              href={whatsappHeroUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono font-black text-white bg-emerald-600 hover:bg-emerald-700 px-3.5 py-2 rounded-lg shadow-sm transition-all active:scale-95 flex items-center gap-1.5"
            >
              <MessageSquare className="h-3.5 w-3.5 fill-current" />
              <span>Chat</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
