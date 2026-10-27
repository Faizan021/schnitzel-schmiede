'use client';

import React, { useState } from 'react';
import { Soup, Check } from 'lucide-react';
import { playSizzleSound } from './AudioCrunchEngine';
import { useLanguage } from '../providers/LanguageContext';

interface SauceFlavor {
  id: string;
  name: string;
  nameEn: string;
  subtitle: string;
  subtitleEn: string;
  description: string;
  descriptionEn: string;
  heat: number; // 0 - 5
  creaminess: number; // 0 - 5
  depth: number; // 0 - 5
  bestPair: string;
  bestPairEn: string;
  color: string;
}

export function SauceDipInteractive() {
  const { t, lang } = useLanguage();
  const isEn = lang === 'en';
  const [selectedSauce, setSelectedSauce] = useState<string>('champignon_rahm');

  const sauces: SauceFlavor[] = [
    {
      id: 'champignon_rahm',
      name: 'Schmiede Champignon-Rahm',
      nameEn: 'Forge Mushroom Cream Sauce',
      subtitle: 'Der unangefochtene Haus-Favorit',
      subtitleEn: 'The undisputed house favorite',
      description:
        'Täglich frisch geschnittene braune Champignons, feine Schalotten, frischer Rahm und glatte Petersilie – langsam einreduziert.',
      descriptionEn:
        'Daily fresh sliced brown mushrooms, shallots, rich cream, and flat-leaf parsley – gently simmered and reduced.',
      heat: 0,
      creaminess: 5,
      depth: 4,
      bestPair: 'Wiener Kalbsschnitzel & Bratkartoffeln',
      bestPairEn: 'Wiener Veal Schnitzel & Fried Potatoes',
      color: '#C4975A',
    },
    {
      id: 'puszta_fire',
      name: 'Paprikasauce "Puszta Fire"',
      nameEn: 'Bell Pepper Sauce "Puszta Fire"',
      subtitle: 'Fruchtig-pikant mit geschmorten Paprikastreifen',
      subtitleEn: 'Fruity & piquant with roasted bell pepper strips',
      description:
        'Traditioneller Paprikasud nach ungarischer Art mit milder Schärfe, Tomatenessenz und frischen Zwiebeln.',
      descriptionEn:
        'Traditional Hungarian style bell pepper reduction with mild heat, tomato essence, and sweet onions.',
      heat: 3,
      creaminess: 1,
      depth: 5,
      bestPair: 'Hähnchen-Schnitzel mit Knusper-Pommes',
      bestPairEn: 'Chicken Schnitzel with Crispy Fries',
      color: '#DC2626',
    },
    {
      id: 'pfeffer_cognac',
      name: 'Madagaskar Pfeffer-Cognac',
      nameEn: 'Madagascar Green Peppercorn Cognac',
      subtitle: 'Ganze grüne Pfefferkörner mit edlem Weinbrand',
      subtitleEn: 'Whole green peppercorns flambéed with fine cognac',
      description:
        'Flambierte grüne Pfefferkörner, abgelöscht mit edlem Cognac und vollendet mit geschlagenem Rahm.',
      descriptionEn:
        'Flambéed green peppercorns deglazed with fine cognac, finished with silky heavy cream.',
      heat: 2,
      creaminess: 4,
      depth: 5,
      bestPair: 'Schweinesteak im Panko-Crunch',
      bestPairEn: 'Pork Cutlet with Panko Crunch',
      color: '#65A30D',
    },
    {
      id: 'hollandaise_kraeuter',
      name: 'Schmiede Kräuter-Hollandaise',
      nameEn: 'Forge Herb Hollandaise',
      subtitle: 'Frisch aufgeschlagene Butter mit Estragon',
      subtitleEn: 'Freshly whipped butter with garden tarragon',
      description:
        'Samtige Buttersauce nach französischer Art mit Land-Eigelb, Zitrone und feinem Garten-Estragon.',
      descriptionEn:
        'Velvety French-style butter emulsion with country egg yolks, lemon, and fine garden tarragon.',
      heat: 0,
      creaminess: 5,
      depth: 3,
      bestPair: 'Holstein Schnitzel & Pommes',
      bestPairEn: 'Holstein Schnitzel & Fries',
      color: '#EAB308',
    },
  ];

  const current = sauces.find((s) => s.id === selectedSauce) || sauces[0];

  return (
    <section className="py-20 bg-gradient-to-b from-[#faf7f2] via-[#f5efe6] to-[#faf7f2] border-t border-[#e8d5be]/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e8d5be] bg-white/90 backdrop-blur-md px-4 py-1.5 text-xs font-bold text-[#b45309] mb-3 shadow-sm">
            <Soup className="h-3.5 w-3.5 text-[#d99036]" />
            <span>{t.sauce.tagline}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#16202a] font-serif">
            {t.sauce.heading}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#4b3b2f]">
            {t.sauce.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          {/* Sauce Selector Pills */}
          <div className="lg:col-span-5 space-y-3">
            {sauces.map((sauce) => {
              const isSelected = selectedSauce === sauce.id;
              const name = isEn ? sauce.nameEn : sauce.name;
              const subtitle = isEn ? sauce.subtitleEn : sauce.subtitle;
              return (
                <button
                  key={sauce.id}
                  onClick={() => {
                    setSelectedSauce(sauce.id);
                    playSizzleSound();
                  }}
                  className={`w-full text-left rounded-2xl p-4 transition-all border flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'border-[#d99036] bg-[#ffedd5] shadow-md shadow-[#d99036]/15 font-bold'
                      : 'border-[#e8d5be] bg-white/90 hover:border-[#d99036]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      style={{ backgroundColor: sauce.color }}
                      className="h-4 w-4 rounded-full shrink-0 shadow-sm"
                    />
                    <div>
                      <div className="text-sm font-bold text-[#16202a] font-serif">{name}</div>
                      <div className="text-[11px] text-[#4b3b2f]">{subtitle}</div>
                    </div>
                  </div>
                  {isSelected && <Check className="h-4 w-4 text-[#b45309]" />}
                </button>
              );
            })}
          </div>

          {/* Interactive Flavor Radar Card */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-[#e8d5be] bg-white/95 backdrop-blur-md p-6 sm:p-8 shadow-xl shadow-[#16202a]/5 relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-[#e8d5be]/70">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#b45309]">
                    {t.sauce.flavorProfile}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#16202a] font-serif mt-0.5">
                    {isEn ? current.nameEn : current.name}
                  </h3>
                </div>
                <span className="rounded-full bg-[#ffedd5] border border-[#fed7aa] px-3 py-1 text-xs font-bold text-[#b45309]">
                  {t.sauce.packedSeparately}
                </span>
              </div>

              <p className="mt-4 text-xs sm:text-sm text-[#4b3b2f] leading-relaxed">
                {isEn ? current.descriptionEn : current.description}
              </p>

              {/* Flavor Meters */}
              <div className="mt-6 space-y-3 bg-[#fffbf5] p-4 rounded-2xl border border-[#e8d5be]">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-[#4b3b2f]">{t.sauce.creaminess}:</span>
                    <span className="text-[#16202a] font-bold">{current.creaminess} / 5</span>
                  </div>
                  <div className="h-2 w-full bg-[#f4ede4] rounded-full overflow-hidden">
                    <div
                      style={{ width: `${(current.creaminess / 5) * 100}%` }}
                      className="h-full bg-gradient-to-r from-[#d99036] to-[#f59e0b] rounded-full transition-all duration-500"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-[#4b3b2f]">{t.sauce.heat}:</span>
                    <span className="text-[#16202a] font-bold">{current.heat} / 5</span>
                  </div>
                  <div className="h-2 w-full bg-[#f4ede4] rounded-full overflow-hidden">
                    <div
                      style={{ width: `${(current.heat / 5) * 100}%` }}
                      className="h-full bg-gradient-to-r from-[#ea580c] to-[#dc2626] rounded-full transition-all duration-500"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-[#4b3b2f]">{t.sauce.depth}:</span>
                    <span className="text-[#16202a] font-bold">{current.depth} / 5</span>
                  </div>
                  <div className="h-2 w-full bg-[#f4ede4] rounded-full overflow-hidden">
                    <div
                      style={{ width: `${(current.depth / 5) * 100}%` }}
                      className="h-full bg-gradient-to-r from-[#b45309] to-[#78350f] rounded-full transition-all duration-500"
                    />
                  </div>
                </div>
              </div>

              {/* Recommendation */}
              <div className="mt-4 pt-4 border-t border-[#e8d5be]/70 flex items-center justify-between text-xs">
                <span className="text-[#4b3b2f]">{t.sauce.perfectPair}:</span>
                <span className="font-bold text-[#16202a] font-serif">
                  {isEn ? current.bestPairEn : current.bestPair}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
