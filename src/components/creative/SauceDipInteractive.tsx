'use client';

import React, { useState } from 'react';
import { Soup, Check } from 'lucide-react';
import { playSizzleSound } from './AudioCrunchEngine';

interface SauceFlavor {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  heat: number; // 0 - 5
  creaminess: number; // 0 - 5
  depth: number; // 0 - 5
  bestPair: string;
  color: string;
}

export function SauceDipInteractive() {
  const [selectedSauce, setSelectedSauce] = useState<string>('champignon_rahm');

  const sauces: SauceFlavor[] = [
    {
      id: 'champignon_rahm',
      name: 'Schmiede Champignon-Rahm',
      subtitle: 'Der unangefochtene Haus-Favorit',
      description:
        'Täglich frisch geschnittene braune Champignons, feine Schalotten, frischer Rahm und glatte Petersilie – langsam einreduziert.',
      heat: 0,
      creaminess: 5,
      depth: 4,
      bestPair: 'Wiener Kalbsschnitzel & Bratkartoffeln',
      color: '#C4975A',
    },
    {
      id: 'puszta_fire',
      name: 'Paprikasauce "Puszta Fire"',
      subtitle: 'Fruchtig-pikant mit geschmorten Paprikastreifen',
      description:
        'Traditioneller Paprikasud nach ungarischer Art mit milder Schärfe, Tomatenessenz und frischen Zwiebeln.',
      heat: 3,
      creaminess: 1,
      depth: 5,
      bestPair: 'Hähnchen-Schnitzel mit Knusper-Pommes',
      color: '#DC2626',
    },
    {
      id: 'pfeffer_cognac',
      name: 'Madagaskar Pfeffer-Cognac',
      subtitle: 'Ganze grüne Pfefferkörner mit edlem Weinbrand',
      description:
        'Flambierte grüne Pfefferkörner, abgelöscht mit edlem Cognac und vollendet mit geschlagenem Rahm.',
      heat: 2,
      creaminess: 4,
      depth: 5,
      bestPair: 'Schweinesteak im Panko-Crunch',
      color: '#65A30D',
    },
    {
      id: 'hollandaise',
      name: 'Cremige Sauce Hollandaise',
      subtitle: 'Feine Buttersauce mit Eigelb & Weißweinsäure',
      description:
        'Samtige, warme Emulsion aus reinem Butterschmalz, frischem Eigelb und einer feinen Säurenote.',
      heat: 0,
      creaminess: 5,
      depth: 3,
      bestPair: 'Brezel-Schnitzel mit Spiegelei',
      color: '#FBBF24',
    },
  ];

  const current = sauces.find((s) => s.id === selectedSauce) || sauces[0];

  return (
    <section className="py-20 bg-[#0A0A0C]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E6B84A]/30 bg-[#E6B84A]/10 px-4 py-1.5 text-xs font-bold text-[#E6B84A] mb-3">
            <Soup className="h-3.5 w-3.5" />
            <span>Interaktive Saucen-Manufaktur</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#FDFBF7] font-display">
            Entdecken Sie Ihr Saucen-Match
          </h2>
          <p className="mt-2 text-sm text-[#C4BFB5]">
            Jede Sauce wird in unserer Küche frisch eingekocht und für den Transport separat
            im Becher versiegelt.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          {/* Sauce Selector Pills */}
          <div className="lg:col-span-5 space-y-3">
            {sauces.map((sauce) => {
              const isSelected = selectedSauce === sauce.id;
              return (
                <button
                  key={sauce.id}
                  onClick={() => {
                    setSelectedSauce(sauce.id);
                    playSizzleSound();
                  }}
                  className={`w-full text-left rounded-2xl p-4 transition-all border flex items-center justify-between ${
                    isSelected
                      ? 'border-[#E6B84A] bg-[#1A1A22] shadow-lg shadow-[#E6B84A]/15'
                      : 'border-white/5 bg-[#121216] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      style={{ backgroundColor: sauce.color }}
                      className="h-4 w-4 rounded-full shrink-0 shadow-sm"
                    />
                    <div>
                      <div className="text-sm font-bold text-[#FDFBF7]">{sauce.name}</div>
                      <div className="text-[11px] text-[#C4BFB5]">{sauce.subtitle}</div>
                    </div>
                  </div>
                  {isSelected && <Check className="h-4 w-4 text-[#E6B84A]" />}
                </button>
              );
            })}
          </div>

          {/* Interactive Flavor Radar Card */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-[#E6B84A]/30 bg-[#14141A] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#E6B84A]">
                    Geschmacksprofil
                  </span>
                  <h3 className="text-xl font-black text-[#FDFBF7] mt-0.5">{current.name}</h3>
                </div>
                <span className="rounded-lg bg-[#E6B84A]/10 px-2.5 py-1 text-xs font-bold text-[#E6B84A]">
                  Separat verpackt
                </span>
              </div>

              <p className="mt-4 text-xs sm:text-sm text-[#C4BFB5] leading-relaxed">
                {current.description}
              </p>

              {/* Flavor Meters */}
              <div className="mt-6 space-y-3 bg-[#1A1A22] p-4 rounded-2xl border border-white/5">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-[#C4BFB5]">Cremigkeit:</span>
                    <span className="text-[#E6B84A]">{current.creaminess} / 5</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${(current.creaminess / 5) * 100}%` }}
                      className="h-full bg-[#E6B84A] rounded-full transition-all duration-500"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-[#C4BFB5]">Schärfe / Pikanz:</span>
                    <span className="text-rose-400">{current.heat} / 5</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${(current.heat / 5) * 100}%` }}
                      className="h-full bg-rose-500 rounded-full transition-all duration-500"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-[#C4BFB5]">Geschmackstiefe:</span>
                    <span className="text-[#E6B84A]">{current.depth} / 5</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${(current.depth / 5) * 100}%` }}
                      className="h-full bg-amber-400 rounded-full transition-all duration-500"
                    />
                  </div>
                </div>
              </div>

              {/* Recommendation */}
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-[#C4BFB5]">Perfekt kombiniert mit:</span>
                <span className="font-bold text-[#FDFBF7]">{current.bestPair}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
