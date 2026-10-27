'use client';

import React, { useRef, useState, useEffect } from 'react';
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
  Volume2,
  VolumeX,
  Play,
  Pause,
  Utensils,
  MessageSquare,
  Thermometer,
  ShieldCheck,
  ChevronRight,
  Info,
} from 'lucide-react';
import {
  playSizzleSound,
  playCrunchSound,
  playSkilletSizzleSimulation,
} from './AudioCrunchEngine';
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
  const [selectedCrustTab, setSelectedCrustTab] = useState<'schmiede' | 'standard'>('schmiede');
  const [temperature, setTemperature] = useState(178);

  const whatsappHeroUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
    '🔥 [SCHNITZEL SCHMIEDE MÖNCHENGLADBACH · Dohler Str. 269]\n\nHallo Herr Jabbar & Schmiede-Team, ich möchte gerne bestellen / eine Frage stellen:'
  )}`;

  const bgVideoRef = useRef<HTMLVideoElement | null>(null);
  const showcaseVideoRef = useRef<HTMLVideoElement | null>(null);

  // Bulletproof Mobile Video Autoplay Engine
  useEffect(() => {
    const startVideos = () => {
      [bgVideoRef.current, showcaseVideoRef.current].forEach((vid) => {
        if (!vid) return;
        vid.muted = true;
        vid.defaultMuted = true;
        vid.setAttribute('playsinline', 'true');
        vid.setAttribute('webkit-playsinline', 'true');
        const playPromise = vid.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsPlayingVideo(true))
            .catch(() => {
              // Browser policy prevented autoplay (e.g., Low Power Mode)
              // The high-res golden schnitzel backdrop remains seamlessly visible
            });
        }
      });
    };

    startVideos();

    // Fallback: First touch on mobile awakens videos if blocked by battery-saver
    const handleFirstTouch = () => {
      startVideos();
      window.removeEventListener('touchstart', handleFirstTouch);
      window.removeEventListener('scroll', handleFirstTouch);
    };

    window.addEventListener('touchstart', handleFirstTouch, { once: true, passive: true });
    window.addEventListener('scroll', handleFirstTouch, { once: true, passive: true });

    return () => {
      window.removeEventListener('touchstart', handleFirstTouch);
      window.removeEventListener('scroll', handleFirstTouch);
    };
  }, []);

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
    setTemperature(182);
    playSkilletSizzleSimulation(3500);

    setTimeout(() => {
      setIsSizzlingActive(false);
      setTemperature(178);
    }, 3500);
  };

  const handleCrunchTest = () => {
    playCrunchSound();
  };

  // 3D Tilt Spring Physics for Desktop
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), {
    damping: 25,
    stiffness: 140,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
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
    <section className="relative overflow-hidden pt-6 sm:pt-10 pb-16 sm:pb-24 bg-[#edf7fc]">
      {/* =========================================================================
          SENSORY HERO BACKGROUND ARCHITECTURE (100% Mobile & Desktop WOW Guarantee)
          ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden [contain:paint] pointer-events-none select-none">
        {/* Layer 1: High-Resolution Golden Schnitzel Craftsmanship Photo (Never blank or black) */}
        <div className="absolute inset-0 h-full w-full overflow-hidden [contain:paint]">
          <Image
            src={`${basePath}/images/stitch/schnitzel-hero-stitch.jpg`}
            alt="Goldbraun souffliertes Schnitzel in Butterschmalz"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center filter brightness-[0.92] contrast-[1.1]"
          />
        </div>

        {/* Layer 2: Full-Bleed Live Video (Autoplays seamlessly on all devices) */}
        <video
          ref={bgVideoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover object-center filter brightness-[0.9] contrast-[1.1] opacity-70 transition-opacity duration-1000"
        >
          <source src={`${basePath}/videos/kitchen-free.mp4`} type="video/mp4" />
          <source src={`${basePath}/videos/zeitlos-hero.mp4`} type="video/mp4" />
        </video>

        {/* Layer 3: Warm Golden Butter Aurora & Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a3a52]/85 via-[#1a3a52]/55 to-[#edf7fc] backdrop-blur-[1.5px]" />
        
        {/* Layer 4: Glowing Radial Spotlight for Headline Drama */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[800px] h-[450px] bg-gradient-to-tr from-[#d99036]/25 via-[#ffecd2]/20 to-transparent rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[70vw] max-w-[350px] h-[350px] bg-[#9bc1d9]/20 rounded-full blur-[120px] pointer-events-none" />
      </div>

      {/* =========================================================================
          HERO CONTENT CONTAINER
          ========================================================================= */}
      <div className="relative z-10 mx-auto max-w-5xl px-3 sm:px-6 w-full space-y-5 sm:space-y-8 overflow-hidden">
        
        {/* Editorial Statement & Brand Header */}
        <div className="text-center space-y-2.5 sm:space-y-3 pt-1 sm:pt-2">
          {/* Animated Gold Forge Badge (Mobile-Safe Width) */}
          <div className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#1a3a52]/90 border border-[#d99036]/60 shadow-lg shadow-[#1a3a52]/30 backdrop-blur-md max-w-full">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d99036] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d99036]" />
            </span>
            <Flame className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#ffecd2] shrink-0" />
            <span className="text-[10px] sm:text-xs font-black tracking-wider sm:tracking-widest text-white uppercase font-mono truncate">
              DIE SCHNITZEL SCHMIEDE <span className="hidden xs:inline">· MG</span>
            </span>
          </div>

          {/* Main Hero Headline with Golden Metallic Shimmer (Fluid Responsive Sizing) */}
          <h1 className="text-xl xs:text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white font-serif leading-[1.2] max-w-3xl mx-auto drop-shadow-md break-words px-2">
            {isEn ? (
              <>
                WHERE CRAFT MEETS THE{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffecd2] via-[#d99036] to-[#ffecd2] underline decoration-[#d99036]/60 underline-offset-4 block sm:inline mt-1 sm:mt-0">
                  GOLDEN CRUST.
                </span>
              </>
            ) : (
              <>
                WO ECHTES HANDWERK AUF DIE{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffecd2] via-[#d99036] to-[#ffecd2] underline decoration-[#d99036]/60 underline-offset-4 block sm:inline mt-1 sm:mt-0">
                  GOLDENE KRUSTE TRIFFT.
                </span>
              </>
            )}
          </h1>

          {/* Kitchen Live Pulse Banner */}
          <p className="text-[11px] sm:text-sm text-[#ffecd2]/90 font-mono tracking-wide max-w-2xl mx-auto drop-shadow-sm px-2">
            {isEn
              ? '✨ 100% Clarified Butter · Freshly Pounded by Hand · Zero Deep Fryer'
              : '✨ 100% Reines Butterschmalz · Täglich frisch von Hand geklopft · 0% Fritteuse'}
          </p>
        </div>

        {/* =========================================================================
            VISUAL CENTERPIECE: INTERACTIVE MASTERPIECE SHOWCASE & SIZZLE CONSOLE
            ========================================================================= */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative rounded-2xl bg-white/95 backdrop-blur-xl p-2 sm:p-5 border-2 border-white shadow-[0_25px_60px_rgba(26,58,82,0.18)] overflow-hidden"
        >
          {/* Top Golden Border Beam */}
          <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-[#d99036] to-transparent opacity-90" />

          {/* Video / Cinema Stage Container */}
          <div className="relative w-full h-72 sm:h-auto sm:aspect-[21/9] rounded-xl overflow-hidden border border-[#b8d4e8]/60 bg-[#163044] shadow-inner group">
            {/* Live Kitchen Video */}
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

            {/* Cinematic Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#163044]/95 via-[#163044]/20 to-black/40 pointer-events-none" />

            {/* TOP CONTROLS & LIVE SKILLET HEAT BAR (Mobile-Optimized Padding) */}
            <div className="absolute top-2 inset-x-2 sm:top-3 sm:inset-x-3 flex items-center justify-between z-20 gap-1 sm:gap-2">
              {/* Heat Status Indicator */}
              <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] sm:text-xs font-mono font-bold shrink-0">
                <Thermometer className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#d99036]" />
                <span className="text-[#ffecd2]">{temperature}°C</span>
                <span className="hidden sm:inline text-white/60">| Butterschmalz</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5 sm:gap-2 ml-auto shrink-0">
                {/* Play / Pause Toggle */}
                <button
                  type="button"
                  onClick={handleTogglePlay}
                  className="h-7 w-7 sm:h-9 sm:w-9 flex items-center justify-center rounded-lg bg-white/95 hover:bg-white text-[#1a3a52] backdrop-blur-md border border-white transition-all shadow-md cursor-pointer active:scale-95"
                  title={isPlayingVideo ? 'Video pausieren' : 'Video abspielen'}
                  aria-label="Video Play/Pause"
                >
                  {isPlayingVideo ? <Pause className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> : <Play className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-current" />}
                </button>

                {/* Mute / Unmute Toggle */}
                <button
                  type="button"
                  onClick={handleToggleMute}
                  className="h-7 w-7 sm:h-9 sm:w-9 flex items-center justify-center rounded-lg bg-white/95 hover:bg-white text-[#1a3a52] backdrop-blur-md border border-white transition-all shadow-md cursor-pointer active:scale-95"
                  title={isMuted ? 'Ton einschalten' : 'Stummschalten'}
                  aria-label="Video Sound"
                >
                  {isMuted ? <VolumeX className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#2e5f7e]" /> : <Volume2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-emerald-600" />}
                </button>

                {/* Interactive Sizzle Ignition Button (Interactive Wow Element) */}
                <button
                  type="button"
                  onClick={handleTriggerSizzle}
                  className={`h-7 sm:h-9 px-2 sm:px-4 rounded-lg text-[10px] sm:text-xs font-mono font-bold tracking-wider flex items-center gap-1 sm:gap-2 transition-all shadow-lg cursor-pointer active:scale-95 border ${
                    isSizzlingActive
                      ? 'bg-[#d99036] text-white border-white shadow-[#d99036]/50 animate-pulse'
                      : 'bg-white/95 text-[#1a3a52] border-white/80 hover:bg-[#ffecd2]'
                  }`}
                >
                  <Flame className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${isSizzlingActive ? 'animate-bounce text-white' : 'text-[#d99036]'}`} />
                  {isSizzlingActive ? (
                    <span className="flex items-center gap-1">
                      <span className="flex gap-0.5 items-end h-2.5">
                        <span className="w-0.5 bg-white rounded-full animate-wave-1" />
                        <span className="w-0.5 bg-white rounded-full animate-wave-2" />
                        <span className="w-0.5 bg-white rounded-full animate-wave-3" />
                      </span>
                      <span>182°C!</span>
                    </span>
                  ) : (
                    <span>Hitze 🔊</span>
                  )}
                </button>
              </div>
            </div>

            {/* BOTTOM DISH IDENTIFIER (No Text Overflow) */}
            <div className="absolute bottom-2 inset-x-2 sm:bottom-3 sm:inset-x-3 flex items-end justify-between text-white pointer-events-none gap-2">
              <div className="pr-1 min-w-0">
                <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#d99036] text-white text-[9px] sm:text-[10px] font-mono font-black uppercase tracking-wider mb-0.5">
                  <span>★ Bestseller Nr. 01</span>
                </div>
                <h3 className="text-sm xs:text-base sm:text-2xl font-bold font-serif text-white drop-shadow truncate">
                  Original Wiener Schnitzel
                </h3>
                <p className="text-[10px] sm:text-xs text-[#ffecd2] font-mono hidden xs:block truncate">
                  Zartes Kalbfleisch · In Butterschmalz souffliert
                </p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xl sm:text-3xl font-black font-mono tracking-tight text-[#ffecd2] drop-shadow">
                  12,90 €
                </span>
              </div>
            </div>
          </div>

          {/* =========================================================================
              HIGH-END "WOW" INTERACTIVE FEATURE: DIE SOUFFLIERTE KRUSTEN-ANALYSE
              ========================================================================= */}
          <div className="mt-3 sm:mt-4 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-[#1a3a52] to-[#244b68] text-white border border-[#2e5f7e]/50 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-white/10">
              <div>
                <span className="text-[9px] sm:text-[10px] font-mono font-bold text-[#d99036] uppercase tracking-widest block">
                  DAS SCHMIEDE-GEHEIMNIS
                </span>
                <h4 className="text-xs sm:text-base font-bold font-serif text-white flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span>Warum unsere Panade weltklasse souffliert</span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[9px] font-mono font-semibold border border-emerald-500/30">
                    Handwerk
                  </span>
                </h4>
              </div>

              {/* Interactive Tabs */}
              <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg self-start sm:self-auto shrink-0">
                <button
                  type="button"
                  onClick={() => setSelectedCrustTab('schmiede')}
                  className={`px-2 py-1 rounded text-[11px] sm:text-xs font-mono font-bold transition-all ${
                    selectedCrustTab === 'schmiede'
                      ? 'bg-[#d99036] text-white shadow'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  ⭐ Schmiede-Kruste
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCrustTab('standard')}
                  className={`px-2 py-1 rounded text-[11px] sm:text-xs font-mono font-bold transition-all ${
                    selectedCrustTab === 'standard'
                      ? 'bg-white/20 text-white shadow'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  Fritteuse (Standard)
                </button>
              </div>
            </div>

            {/* Tab Details with Crunch Sound Trigger */}
            <div className="pt-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
              <div className="space-y-1">
                {selectedCrustTab === 'schmiede' ? (
                  <p className="text-[#ffecd2] leading-relaxed text-[11px] sm:text-xs">
                    <strong className="text-white">Goldgelbe Wellenkruste:</strong> Das Schnitzel schwimmt frei in siedendem Butterschmalz. Durch ständiges Schwenken der Pfanne löst sich die Panade luftig vom Kalbfleisch – saftig im Kern, knusprig außen.
                  </p>
                ) : (
                  <p className="text-white/80 leading-relaxed text-[11px] sm:text-xs">
                    <strong className="text-rose-300">Flach & Ölig:</strong> In gewöhnlichen Fritteusen klebt die Panade platt am Fleisch, saugt altes Pflanzenöl auf und wird schnell zäh oder labbrig.
                  </p>
                )}
              </div>

              {/* Interactive Acoustic Crunch Button */}
              <button
                type="button"
                onClick={handleCrunchTest}
                className="shrink-0 self-start sm:self-center px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#d99036] text-white font-mono font-bold text-xs border border-white/20 transition-all active:scale-95 flex items-center gap-1.5"
                title="Klicken, um den Knusper-Ton anzuhören"
              >
                <span>Knusper-Test hören</span>
                <span>🔊</span>
              </button>
            </div>
          </div>

          {/* 4 Quick Anatomical Pillars */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3.5">
            <div className="p-2.5 sm:p-3 rounded-lg bg-[#edf7fc]/80 border border-[#b8d4e8]/60">
              <span className="text-[10px] font-mono font-bold text-[#1a3a52] block">
                [01] SOUFFLÉ-PANADE
              </span>
              <p className="text-xs text-[#1a3a52] font-black mt-0.5">
                {isEn ? 'Airy wave crust' : 'Luftige Wellenstruktur'}
              </p>
            </div>
            <div className="p-2.5 sm:p-3 rounded-lg bg-[#edf7fc]/80 border border-[#b8d4e8]/60">
              <span className="text-[10px] font-mono font-bold text-[#1a3a52] block">
                [02] KALB & GEFLÜGEL
              </span>
              <p className="text-xs text-[#1a3a52] font-black mt-0.5">
                {isEn ? 'Hand pounded cutlet' : 'Täglich frisch geklopft'}
              </p>
            </div>
            <div className="p-2.5 sm:p-3 rounded-lg bg-[#edf7fc]/80 border border-[#b8d4e8]/60">
              <span className="text-[10px] font-mono font-bold text-[#1a3a52] block">
                [03] BUTTERSCHMALZ
              </span>
              <p className="text-xs text-[#1a3a52] font-black mt-0.5">
                {isEn ? 'Clarified butter sizzle' : 'Reines Butterschmalz'}
              </p>
            </div>
            <div className="p-2.5 sm:p-3 rounded-lg bg-[#edf7fc]/80 border border-[#b8d4e8]/60">
              <span className="text-[10px] font-mono font-bold text-[#1a3a52] block">
                [04] BIO-ZITRONE
              </span>
              <p className="text-xs text-[#1a3a52] font-black mt-0.5">
                {isEn ? 'Fresh aromatic oils' : 'Frische Zitrus-Öle'}
              </p>
            </div>
          </div>
        </div>

        {/* =========================================================================
            MAJOR CALL TO ACTION BUTTONS
            ========================================================================= */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
          {/* High-Converting Order Button with Gold Shimmer */}
          <Link
            href="/speisekarte"
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-[#d99036] to-[#b37324] hover:from-[#c27f2e] hover:to-[#9e631d] text-white font-black text-sm tracking-wider uppercase shadow-xl shadow-[#d99036]/30 transition-all active:scale-95 border-2 border-white cursor-pointer"
            onMouseEnter={playSizzleSound}
          >
            <Bike className="h-5 w-5" />
            <span>{isEn ? 'ORDER SCHNITZELTAXI' : 'SCHNITZELTAXI BESTELLEN'}</span>
          </Link>

          {/* Explore Menu */}
          <a
            href="#speisekarte-section"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white/95 hover:bg-[#ffecd2] text-[#1a3a52] font-black text-sm tracking-wider uppercase border-2 border-[#b8d4e8] transition-all shadow-md cursor-pointer"
          >
            <Utensils className="h-4 w-4 text-[#1a3a52]" />
            <span>{isEn ? 'EXPLORE MENU' : 'SPEISEKARTE ÖFFNEN'}</span>
          </a>

          {/* Table Reservation */}
          <Link
            href="/reservierung"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white/95 hover:bg-white text-[#1a3a52] font-black text-sm tracking-wider uppercase border-2 border-[#b8d4e8] transition-all shadow-md cursor-pointer"
          >
            <Calendar className="h-4 w-4 text-[#1a3a52]" />
            <span>{isEn ? 'RESERVE TABLE' : 'TISCH RESERVIEREN'}</span>
          </Link>
        </div>

        {/* =========================================================================
            QUICK ACCESS BENTO GRID - OWNER PRIORITY & REAL TRUST ANCHORS
            ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* Bento Item 1: Verified Google Rating */}
          <div className="p-4 rounded-xl bg-white/95 border border-[#b8d4e8]/60 shadow-sm flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1 text-[#d99036]">
                <Star className="h-4 w-4 fill-current text-[#d99036]" />
                <span className="text-sm font-black text-[#d99036]">4.9 / 5.0</span>
              </div>
              <p className="text-xs text-[#1a3a52] font-bold">
                {isEn ? 'From 850+ Guests' : 'Aus 850+ Gäste-Bewertungen'}
              </p>
              <p className="text-[11px] text-emerald-700 font-extrabold uppercase">
                {isEn ? 'VERIFIED HANDMADE' : 'VERIFIZIERTES HANDWERK'}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xl font-bold font-serif text-[#1a3a52]">Top 1%</span>
              <span className="block text-xs font-semibold text-[#2e5f7e]">Mönchengladbach</span>
            </div>
          </div>

          {/* Bento Item 2: Physical Address & Call Direct */}
          <div className="p-4 rounded-xl bg-white/95 border border-[#b8d4e8]/60 shadow-sm flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs font-mono text-[#2e5f7e] uppercase font-black flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-[#1a3a52]" />
                STANDORT
              </span>
              <p className="text-xs sm:text-sm text-[#1a3a52] font-bold">
                Dohler Str. 269
              </p>
              <p className="text-xs font-medium text-[#2e5f7e]">
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

          {/* Bento Item 3: Direct WhatsApp Fast-Lane with Owner Umar Jabbar */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-emerald-600/15 border-2 border-emerald-500/60 shadow-sm flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs font-mono text-emerald-900 uppercase font-black flex items-center gap-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <MessageSquare className="h-3.5 w-3.5 text-emerald-600 fill-emerald-600" />
                INHABER DIREKT-CHAT
              </span>
              <p className="text-xs sm:text-sm text-emerald-950 font-black">
                Umar Jabbar · 0176 70341602
              </p>
              <p className="text-[11px] text-emerald-700 font-semibold">
                {isEn ? 'Fastest Response via WhatsApp' : 'Schnellste Antwort via WhatsApp'}
              </p>
            </div>
            <a
              href={whatsappHeroUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono font-black text-white bg-emerald-600 hover:bg-emerald-700 px-3.5 py-2.5 rounded-lg shadow-md transition-all active:scale-95 flex items-center gap-1.5 shrink-0"
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
