'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  Sparkles,
  ShoppingBag,
  Calendar,
  Flame,
  Volume2,
  Award,
  ShieldCheck,
  Star,
  Activity,
} from 'lucide-react';
import { playCrunchSound, playSizzleSound } from './AudioCrunchEngine';
import { AudioTogglePill } from './AudioTogglePill';
import { GlowingButton } from '../ui/GlowingButton';
import confetti from 'canvas-confetti';

export function InteractiveSizzleHero() {
  const [crunchCount, setCrunchCount] = useState(0);
  const [decibels, setDecibels] = useState(88.4);
  const [isCrunching, setIsCrunching] = useState(false);

  // 3D Tilt Spring Physics
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), {
    damping: 20,
    stiffness: 150,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), {
    damping: 20,
    stiffness: 150,
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

  const handleCrunchClick = () => {
    playCrunchSound();
    setIsCrunching(true);
    setCrunchCount((c) => c + 1);
    setDecibels(Math.round((86 + Math.random() * 5) * 10) / 10);

    try {
      confetti({
        particleCount: 25,
        spread: 50,
        origin: { y: 0.65 },
        colors: ['#E6B84A', '#F5C75D', '#FFFFFF'],
      });
    } catch {
      // Ignore
    }

    setTimeout(() => setIsCrunching(false), 300);
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-6 pb-16">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[#0A0A0C] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#E6B84A]/12 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-12 left-10 w-[300px] h-[300px] bg-[#B88526]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Bold Typography & Storytelling */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#E6B84A]/30 bg-[#16161C]/90 px-4 py-1.5 text-xs font-bold text-[#E6B84A] shadow-lg backdrop-blur-md">
                <Flame className="h-4 w-4 fill-[#E6B84A]" />
                <span>Die Manufaktur für echtes Schnitzel · Mönchengladbach</span>
              </div>
              <AudioTogglePill />
            </div>

            {/* Giant Creative Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-[#FDFBF7] font-display leading-[1.05]">
              DIE KUNST DES{' '}
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#E6B84A] via-[#F5C75D] to-[#E6B84A]">
                CRUNCH.
                <span className="absolute -bottom-1 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#E6B84A] to-transparent rounded-full" />
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#C4BFB5] max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Jedes Schnitzel wird erst auf Bestellung frisch von Hand geklopft, in reinem
              Butterschmalz souffliert und mit der patenten{' '}
              <strong className="text-[#FDFBF7]">Knusper-Garantie</strong> geliefert –{' '}
              Saucen reisen stets separat im versiegelten Glas.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <Link href="/speisekarte">
                <GlowingButton
                  size="lg"
                  icon={<ShoppingBag className="h-5 w-5" />}
                  onMouseEnter={playSizzleSound}
                >
                  Speisekarte & Bestellen
                </GlowingButton>
              </Link>

              <Link href="/konfigurator">
                <GlowingButton
                  variant="forge"
                  size="lg"
                  icon={<Sparkles className="h-5 w-5 text-[#E6B84A]" />}
                  onMouseEnter={playSizzleSound}
                >
                  Schnitzel-Baukasten
                </GlowingButton>
              </Link>

              <Link href="/reservierung">
                <GlowingButton
                  variant="outline"
                  size="lg"
                  icon={<Calendar className="h-5 w-5 text-[#E6B84A]" />}
                >
                  Tisch buchen
                </GlowingButton>
              </Link>
            </div>

            {/* Trust Micro-Metrics */}
            <div className="pt-6 border-t border-white/5 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-[#C4BFB5]">
              <div className="flex items-center gap-1.5">
                <div className="flex text-[#E6B84A]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-bold text-[#FDFBF7]">4.9 / 5.0 Google</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>100% Halal Optionen</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="h-4 w-4 text-[#E6B84A]" />
                <span>10% Abholer-Rabatt</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interactive Master Dish with Crunch Sensor */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-full max-w-md perspective-1000"
            >
              {/* Outer Golden Aura */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-[#E6B84A]/20 via-[#F5C75D]/10 to-[#E6B84A]/20 blur-xl opacity-75 animate-pulse pointer-events-none" />

              {/* 3D Motion Card Container */}
              <motion.div
                style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                className="relative rounded-3xl border border-[#E6B84A]/30 bg-[#14141A] p-6 shadow-2xl backdrop-blur-xl"
              >
                {/* Badge Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-bold text-[#FDFBF7]">
                      Frisch in Butterschmalz
                    </span>
                  </div>
                  <span className="rounded-full bg-[#E6B84A]/15 border border-[#E6B84A]/30 px-2.5 py-0.5 text-[10px] font-black uppercase text-[#E6B84A]">
                    Schmiede-Spezialität
                  </span>
                </div>

                {/* Main Dish Visual with Floating Zoom */}
                <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden bg-black/40 group">
                  <Image
                    src="https://images.unsplash.com/photo-1599921841143-8190253a93bb?auto=format&fit=crop&w=900&q=80"
                    alt="Goldbraun souffliertes Schnitzel Wiener Art"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14141A] via-transparent to-transparent opacity-80" />

                  {/* Rising Steam Effect Overlay */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-1 opacity-40 pointer-events-none">
                    <div className="w-1.5 h-12 bg-white/20 rounded-full blur-sm animate-pulse" />
                    <div className="w-1 h-14 bg-white/30 rounded-full blur-sm animate-pulse delay-75" />
                    <div className="w-1.5 h-10 bg-white/20 rounded-full blur-sm animate-pulse delay-150" />
                  </div>

                  {/* Dish Title Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <div>
                      <h3 className="text-base font-black text-[#FDFBF7]">
                        Schnitzel Wiener Art (220g)
                      </h3>
                      <p className="text-[11px] text-[#E6B84A]">
                        Soufflierte Goldpanade · Bio-Zitrone · Pommes
                      </p>
                    </div>
                    <span className="font-mono text-base font-extrabold text-[#E6B84A]">
                      15,90 €
                    </span>
                  </div>
                </div>

                {/* Interactive Crunch Decibel Sensor */}
                <div className="mt-5 rounded-2xl border border-white/5 bg-[#1A1A22] p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-[#C4BFB5]">
                      <Activity className="h-4 w-4 text-[#E6B84A]" />
                      <span className="font-semibold">Akustik-Sensor:</span>
                    </div>
                    <span className="font-mono text-sm font-bold text-[#E6B84A]">
                      {decibels} dB (Ultra-Kross)
                    </span>
                  </div>

                  {/* Interactive Crunch Trigger Button */}
                  <button
                    onClick={handleCrunchClick}
                    className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-xs font-black transition-all cursor-pointer select-none ${
                      isCrunching
                        ? 'bg-[#F5C75D] text-[#0A0A0C] scale-95 shadow-inner'
                        : 'bg-gradient-to-r from-[#E6B84A] via-[#F5C75D] to-[#E6B84A] text-[#0A0A0C] hover:brightness-110 shadow-lg shadow-[#E6B84A]/25'
                    }`}
                  >
                    <Volume2 className="h-4 w-4" />
                    <span>
                      {crunchCount === 0
                        ? 'Hier klicken für Crunch-Test 🔊'
                        : `Geknuspert (${crunchCount}x) · Nochmal!`}
                    </span>
                  </button>

                  <div className="flex justify-between items-center text-[10px] text-[#C4BFB5]/80 pt-1">
                    <span>Synthetischer Sound via Web Audio API</span>
                    <span className="text-[#E6B84A]">Knusper-Garantie</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
