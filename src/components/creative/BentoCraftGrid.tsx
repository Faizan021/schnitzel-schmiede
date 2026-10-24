'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  MapPin,
  Layers,
  ChefHat,
  Volume2,
  CheckCircle2,
} from 'lucide-react';
import { SpotlightCard } from '../ui/SpotlightCard';
import { playCrunchSound, playSizzleSound } from './AudioCrunchEngine';
import { getKitchenWhatsAppNumber } from '@/lib/utils/whatsapp';

export function BentoCraftGrid() {
  const [activeStep, setActiveStep] = useState(3); // Default to Butterschmalz
  const whatsappPhone = getKitchenWhatsAppNumber();

  const panierSteps = [
    {
      step: 1,
      title: 'Handgeklopft',
      desc: 'Saftiges Fleisch wird hauchdünn mit dem Plattiereisen geklopft.',
    },
    {
      step: 2,
      title: 'Mehl & Land-Ei',
      desc: 'Feinstes Weizenmehl und frische Eier für die perfekte Bindung.',
    },
    {
      step: 3,
      title: 'Knusper-Panade',
      desc: 'Klassische Semmelbrösel, Panko-Flocken oder bayerische Brezelkruste.',
    },
    {
      step: 4,
      title: 'Butterschmalz-Pfanne',
      desc: 'Schwimmend bei 175°C wellenförmig souffliert – goldgelb und federleicht.',
    },
  ];

  return (
    <section className="py-20 bg-[#0C0C10] border-t border-white/5 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#E6B84A] uppercase tracking-widest">
            2026 Craft Gastronomy Bento
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#FDFBF7] mt-2 font-display">
            Das Geheimnis der Schmiede
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#C4BFB5]">
            Vier Säulen, die jedes Schmiede-Schnitzel zu einem unvergleichlichen Geschmackserlebnis
            machen.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Interactive Panierstraße (Span 2) */}
          <SpotlightCard className="md:col-span-2 p-6 sm:p-8 bg-[#14141A] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E6B84A]/10 border border-[#E6B84A]/30 px-3 py-1 text-xs font-bold text-[#E6B84A]">
                  <Layers className="h-3.5 w-3.5" />
                  <span>Schritt für Schritt</span>
                </span>
                <span className="text-xs text-[#C4BFB5]">Täglich frisch vor Ihren Augen</span>
              </div>

              <h3 className="text-2xl font-black text-[#FDFBF7]">
                Die Mönchengladbacher Panierstraße
              </h3>
              <p className="text-xs text-[#C4BFB5] mt-1 max-w-md">
                Klicken Sie auf die Stationen, um das Geheimnis unserer soufflierten Kruste zu
                entdecken.
              </p>

              {/* Interactive Step Selector */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
                {panierSteps.map((s, idx) => {
                  const isActive = activeStep === idx;
                  return (
                    <button
                      key={s.step}
                      onClick={() => {
                        setActiveStep(idx);
                        playSizzleSound();
                      }}
                      className={`rounded-2xl p-3.5 text-left transition-all border ${
                        isActive
                          ? 'border-[#E6B84A] bg-[#E6B84A]/15 shadow-md shadow-[#E6B84A]/20'
                          : 'border-white/5 bg-[#1B1B24] hover:border-white/20'
                      }`}
                    >
                      <div className="text-[10px] font-black uppercase text-[#E6B84A]">
                        Station 0{s.step}
                      </div>
                      <div className="text-xs font-bold text-[#FDFBF7] mt-1">{s.title}</div>
                    </button>
                  );
                })}
              </div>

              {/* Active Step Showcase */}
              <div className="mt-5 rounded-2xl border border-white/5 bg-[#1B1B24] p-4 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E6B84A] text-[#0A0A0C]">
                  <ChefHat className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#FDFBF7]">
                    {panierSteps[activeStep].title}
                  </h4>
                  <p className="text-xs text-[#C4BFB5] mt-0.5">
                    {panierSteps[activeStep].desc}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-[#C4BFB5]">
              <span>Handwerk statt Fließband-TK</span>
              <span className="text-[#E6B84A] font-semibold">100% Butterschmalz</span>
            </div>
          </SpotlightCard>

          {/* Card 2: Der Crunch-Faktor Audio-Visualizer (Span 1) */}
          <SpotlightCard className="p-6 sm:p-8 bg-[#14141A] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E6B84A]/10 text-[#E6B84A] mb-4">
                <Volume2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-black text-[#FDFBF7]">Der Crunch-Faktor</h3>
              <p className="text-xs text-[#C4BFB5] mt-1">
                Akustisch verifizierte Knusprigkeit bei jedem Biss.
              </p>

              {/* Animated Decibel Waveform */}
              <div className="my-6 rounded-2xl bg-[#1A1A22] border border-white/5 p-4 flex items-center justify-center gap-1.5 h-24">
                {[40, 65, 85, 95, 75, 90, 60, 88, 70, 92, 50, 80, 98, 65, 45].map((h, i) => (
                  <div
                    key={i}
                    style={{ height: `${h}%` }}
                    className="w-1.5 rounded-full bg-gradient-to-t from-[#B88526] via-[#E6B84A] to-[#F5C75D] animate-pulse"
                  />
                ))}
              </div>

              <div className="text-center">
                <span className="font-mono text-3xl font-black text-[#E6B84A]">89.4 dB</span>
                <span className="block text-[11px] text-[#C4BFB5]">
                  Gemessene Knusprigkeit der soufflierten Panade
                </span>
              </div>
            </div>

            <button
              onClick={playCrunchSound}
              className="mt-6 w-full rounded-xl border border-[#E6B84A]/30 bg-[#E6B84A]/10 py-2.5 text-xs font-bold text-[#E6B84A] hover:bg-[#E6B84A] hover:text-[#0A0A0C] transition-colors"
            >
              Akustik-Test abspielen 🔊
            </button>
          </SpotlightCard>

          {/* Card 3: Sauce-Separation Garantie (Span 1) */}
          <SpotlightCard className="p-6 sm:p-8 bg-[#14141A] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 mb-4">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-black text-[#FDFBF7]">Knusper-Garantie</h3>
              <p className="text-xs text-[#C4BFB5] mt-1">
                Warum unsere Schnitzel niemals matschig bei Ihnen ankommen.
              </p>

              <div className="my-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 space-y-2 text-xs text-emerald-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Saucen reisen im separaten Glas</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Dampfdurchlässige Kartonagen</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Erst vor Ort dippen oder übergießen</span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-[#C4BFB5] italic">
              &ldquo;Das einzige Schnitzel in Mönchengladbach, das nach 20 Minuten Fahrt noch
              kracht.&rdquo;
            </p>
          </SpotlightCard>

          {/* Card 4: Mönchengladbacher Lokale Schmiede & Blitz-Lieferung (Span 2) */}
          <SpotlightCard className="md:col-span-2 p-6 sm:p-8 bg-[#14141A] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E6B84A]/10 border border-[#E6B84A]/30 px-3 py-1 text-xs font-bold text-[#E6B84A]">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Lokal verwurzelt</span>
                </span>
                <span className="text-xs text-[#E6B84A] font-bold">Mönchengladbach & Umland</span>
              </div>

              <h3 className="text-2xl font-black text-[#FDFBF7]">
                Von Bismarckstraße direkt auf Ihren Tisch
              </h3>
              <p className="text-xs text-[#C4BFB5] mt-1 max-w-lg">
                Zentral in Mönchengladbach gelegen beliefern wir die Stadtteile Mitte, Rheydt,
                Odenkirchen, Lürrip, Windberg sowie Teile von Korschenbroich in kürzester Zeit.
              </p>

              {/* Delivery Speed Metric Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
                <div className="rounded-xl bg-[#1B1B24] p-3.5 border border-white/5">
                  <div className="text-xs text-[#C4BFB5]">Durchschnittliche Zeit</div>
                  <div className="text-lg font-black text-[#E6B84A] mt-0.5">32 Minuten</div>
                  <div className="text-[10px] text-[#C4BFB5]">Lieferung heiß & kross</div>
                </div>

                <div className="rounded-xl bg-[#1B1B24] p-3.5 border border-white/5">
                  <div className="text-xs text-[#C4BFB5]">Selbstabholung</div>
                  <div className="text-lg font-black text-emerald-400 mt-0.5">-10% Rabatt</div>
                  <div className="text-[10px] text-[#C4BFB5]">Direkt an der Theke</div>
                </div>

                <div className="rounded-xl bg-[#1B1B24] p-3.5 border border-white/5">
                  <div className="text-xs text-[#C4BFB5]">Liefergebiet</div>
                  <div className="text-lg font-black text-[#FDFBF7] mt-0.5">9 PLZ-Zonen</div>
                  <div className="text-[10px] text-[#C4BFB5]">Ab 15 € Mindestbestellwert</div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-[#C4BFB5]">
              <span>Bismarckstraße 45, 41061 Mönchengladbach</span>
              <a
                href={`https://wa.me/${whatsappPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#25D366] font-bold hover:underline"
              >
                Frage stellen via WhatsApp &rarr;
              </a>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
