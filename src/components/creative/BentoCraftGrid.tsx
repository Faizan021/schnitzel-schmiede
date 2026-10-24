'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheck,
  MapPin,
  Layers,
  ChefHat,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { SpotlightCard } from '../ui/SpotlightCard';
import { playSizzleSound } from './AudioCrunchEngine';
import { getKitchenWhatsAppNumber } from '@/lib/utils/whatsapp';
import { useLanguage } from '../providers/LanguageContext';

export function BentoCraftGrid() {
  const [activeStep, setActiveStep] = useState(3); // Default to Butterschmalz
  const whatsappPhone = getKitchenWhatsAppNumber();
  const { lang } = useLanguage();
  const isEn = lang === 'en';

  const panierSteps = [
    {
      step: 1,
      title: isEn ? 'Hand-Pounded' : 'Frisch geklopft',
      desc: isEn
        ? 'Tender cuts pounded paper-thin by hand for peak juiciness.'
        : 'Saftiges Fleisch wird erst bei Bestellung hauchdünn mit dem Plattiereisen geklopft.',
    },
    {
      step: 2,
      title: isEn ? 'Flour & Farm Eggs' : 'Mehl & Land-Ei',
      desc: isEn
        ? 'Finest wheat flour and fresh country eggs for seamless crumb adhesion.'
        : 'Feinstes Weizenmehl und frische Eier für die perfekte Bindung.',
    },
    {
      step: 3,
      title: isEn ? 'Golden Crumb' : 'Knusper-Panade',
      desc: isEn
        ? 'Golden breadcrumbs or Bavarian pretzel crust gently coating the cutlet.'
        : 'Klassische goldene Semmelbrösel oder bayerische Brezelkruste – locker aufliegend.',
    },
    {
      step: 4,
      title: isEn ? 'Clarified Butter' : 'Butterschmalz-Pfanne',
      desc: isEn
        ? 'Floated at 175°C and waved for cloud-like soufflé blistering.'
        : 'Schwimmend bei 175°C wellenförmig souffliert – goldgelb und federleicht.',
    },
  ];

  return (
    <section className="py-20 bg-[#161413] border-t border-[#312B26] relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#E5B24E] uppercase tracking-widest">
            {isEn ? 'Culinary Pillars & Tradition' : 'Vier Säulen unserer Schmiede'}
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#FBF9F5] mt-2 font-serif">
            {isEn ? 'The Secret Behind Every Schnitzel' : 'Das Geheimnis echter Schnitzelkultur'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#D5CEBF]">
            {isEn
              ? 'Handcrafted pan-frying, a cozy historic dining room, and packaging designed to keep your crust crispy.'
              : 'Echte Pfannenzubereitung, ein gemütlicher Gastraum und Verpackungen, die Ihre Panade knusprig halten.'}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Interactive Panierstraße (Span 2) */}
          <SpotlightCard className="md:col-span-2 p-6 sm:p-8 bg-[#1C1A18] border border-[#3A332C] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D4A347]/15 border border-[#D4A347]/30 px-3 py-1 text-xs font-bold text-[#E5B24E]">
                  <Layers className="h-3.5 w-3.5" />
                  <span>{isEn ? 'Craftsmanship Line' : 'Traditionelle Panierstraße'}</span>
                </span>
                <span className="text-xs text-[#C4BFB5]">
                  {isEn ? 'Step by step craft' : 'Schritt für Schritt'}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-[#FBF9F5] font-serif">
                {isEn ? 'Souffléed in Pure Clarified Butter' : 'In Butterschmalz souffliert'}
              </h3>
              <p className="text-xs sm:text-sm text-[#D5CEBF] mt-1.5 max-w-lg">
                {isEn
                  ? 'Click through the four stations to see how our crust rises like a golden cloud.'
                  : 'Klicken Sie auf die Stationen, um das Geheimnis unserer wellenförmig abgehobenen Panade zu entdecken.'}
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
                      className={`rounded-2xl p-3.5 text-left transition-all border cursor-pointer ${
                        isActive
                          ? 'border-[#D4A347] bg-[#D4A347]/15 shadow-md shadow-[#D4A347]/20'
                          : 'border-[#312B26] bg-[#23201C] hover:border-[#D4A347]/40'
                      }`}
                    >
                      <div className="text-[10px] font-black uppercase text-[#E5B24E]">
                        Station 0{s.step}
                      </div>
                      <div className="text-xs font-bold text-[#FBF9F5] mt-1">{s.title}</div>
                    </button>
                  );
                })}
              </div>

              {/* Active Step Showcase */}
              <div className="mt-5 rounded-2xl border border-[#3A332C] bg-[#24211D] p-4 flex items-center gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#D4A347] text-[#121110]">
                  <ChefHat className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#FBF9F5]">
                    {panierSteps[activeStep].title}
                  </h4>
                  <p className="text-xs text-[#D5CEBF] mt-0.5">
                    {panierSteps[activeStep].desc}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#312B26] flex items-center justify-between text-xs text-[#C4BFB5]">
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-[#E5B24E]" />
                {isEn ? 'Handmade upon every order' : 'Frisch geklopft statt Tiefkühl-Ware'}
              </span>
              <span className="text-[#E5B24E] font-bold">100% Butterschmalz</span>
            </div>
          </SpotlightCard>

          {/* Card 2: Unser Gastraum auf der Bismarckstraße (Featuring REAL Interior Photo!) */}
          <SpotlightCard className="p-6 sm:p-8 bg-[#1C1A18] border border-[#3A332C] flex flex-col justify-between overflow-hidden relative group">
            <div>
              <div className="relative h-44 w-full rounded-2xl overflow-hidden mb-4 border border-[#D4A347]/25 shadow-md">
                <Image
                  src="/images/restaurant/gastraum-interior.jpg"
                  alt={isEn ? "Cozy dining room with brick fireplace at Schnitzel Schmiede" : "Gemütlicher Gastraum mit Kamin in der Schnitzel Schmiede Mönchengladbach"}
                  fill
                  sizes="(max-width: 768px) 100vw, 360px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A18] via-transparent to-transparent opacity-80" />
                <span className="absolute top-2.5 right-2.5 rounded-full bg-black/80 backdrop-blur-md border border-[#D4A347]/40 px-2 py-0.5 text-[10px] font-bold text-[#E5B24E]">
                  {isEn ? 'Bismarckstraße 45' : 'Bismarckstr. 45'}
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#FBF9F5] font-serif">
                {isEn ? 'Our Historic Gastraum' : 'Unser gemütlicher Gastraum'}
              </h3>
              <p className="text-xs text-[#D5CEBF] mt-1.5 leading-relaxed">
                {isEn
                  ? 'Warm brick fireplace, authentic wooden tables, and cold beer on tap. The perfect setting for family dinners, dates, and celebrations.'
                  : 'Warmer Backsteinkamin, rustikale Gemütlichkeit und frisch gezapftes Bier. Perfekt für Familienabende, Paare und Feiern.'}
              </p>
            </div>

            <Link
              href="/reservierung"
              className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-[#D4A347]/40 bg-[#D4A347]/15 py-2.5 text-xs font-bold text-[#E5B24E] hover:bg-[#D4A347] hover:text-[#121110] transition-all cursor-pointer"
            >
              <Calendar className="h-4 w-4" />
              <span>{isEn ? 'Book a Table' : 'Tisch reservieren'}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </SpotlightCard>

          {/* Card 3: Sauce-Separation Garantie (Span 1) */}
          <SpotlightCard className="p-6 sm:p-8 bg-[#1C1A18] border border-[#3A332C] flex flex-col justify-between">
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-400 mb-4 border border-emerald-500/30">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-[#FBF9F5] font-serif">
                {isEn ? 'Crunch Guarantee' : 'Die Knusper-Garantie'}
              </h3>
              <p className="text-xs text-[#D5CEBF] mt-1 leading-relaxed">
                {isEn
                  ? 'Why our schnitzels never arrive soggy at your doorstep.'
                  : 'Warum unsere Schnitzel auch nach der Lieferung super-knusprig bleiben.'}
              </p>

              <div className="my-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 space-y-2.5 text-xs text-emerald-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>{isEn ? 'Sauce always sealed in separate jar' : 'Sauce reist im separaten Glas'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>{isEn ? 'Steam-permeable custom packaging' : 'Dampfdurchlässige Kartonagen'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>{isEn ? 'Pour or dip freshly at home' : 'Erst am Tisch dippen oder übergießen'}</span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-[#C4BFB5] italic">
              {isEn
                ? '“The only schnitzel in Mönchengladbach that still crunches after a 20-minute drive.”'
                : '„Das einzige Schnitzel in Mönchengladbach, das nach 20 Minuten Fahrt noch kracht.“'}
            </p>
          </SpotlightCard>

          {/* Card 4: Mönchengladbacher Lokale Schmiede & Blitz-Lieferung (Span 2) */}
          <SpotlightCard className="md:col-span-2 p-6 sm:p-8 bg-[#1C1A18] border border-[#3A332C] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D4A347]/15 border border-[#D4A347]/30 px-3 py-1 text-xs font-bold text-[#E5B24E]">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{isEn ? 'Locally Rooted' : 'Lokal verwurzelt'}</span>
                </span>
                <span className="text-xs text-[#E5B24E] font-bold">Mönchengladbach & Umland</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-[#FBF9F5] font-serif">
                {isEn ? 'From Bismarckstraße to Your Table' : 'Von der Bismarckstraße direkt zu Ihnen'}
              </h3>
              <p className="text-xs sm:text-sm text-[#D5CEBF] mt-1.5 max-w-xl">
                {isEn
                  ? 'Centrally located in Mönchengladbach, delivering to City Centre, Rheydt, Odenkirchen, Lürrip, Windberg, and Korschenbroich in record time.'
                  : 'Zentral in Mönchengladbach gelegen beliefern wir die Stadtteile Mitte, Rheydt, Odenkirchen, Lürrip, Windberg sowie Teile von Korschenbroich in kürzester Zeit.'}
              </p>

              {/* Delivery Speed Metric Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-6">
                <div className="rounded-xl bg-[#24211D] p-3.5 border border-[#3A332C]">
                  <div className="text-xs text-[#C4BFB5]">{isEn ? 'Average Time' : 'Durchschnitt'}</div>
                  <div className="text-xl font-bold font-serif text-[#E5B24E] mt-0.5">32 Min.</div>
                  <div className="text-[10px] text-[#C4BFB5]">{isEn ? 'Delivered hot & crispy' : 'Heiß & kross geliefert'}</div>
                </div>

                <div className="rounded-xl bg-[#24211D] p-3.5 border border-[#3A332C]">
                  <div className="text-xs text-[#C4BFB5]">{isEn ? 'Self Pickup' : 'Selbstabholung'}</div>
                  <div className="text-xl font-bold font-serif text-emerald-400 mt-0.5">-10% Rabatt</div>
                  <div className="text-[10px] text-[#C4BFB5]">{isEn ? 'Directly at counter' : 'Direkt an der Theke'}</div>
                </div>

                <div className="rounded-xl bg-[#24211D] p-3.5 border border-[#3A332C]">
                  <div className="text-xs text-[#C4BFB5]">{isEn ? 'Delivery Zones' : 'Liefergebiet'}</div>
                  <div className="text-xl font-bold font-serif text-[#FBF9F5] mt-0.5">9 PLZ-Zonen</div>
                  <div className="text-[10px] text-[#C4BFB5]">{isEn ? 'Starting from 15 €' : 'Ab 15 € Mindestbestellwert'}</div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#312B26] flex items-center justify-between text-xs text-[#C4BFB5]">
              <span>Bismarckstraße 45, 41061 Mönchengladbach</span>
              <a
                href={`https://wa.me/${whatsappPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#25D366] font-bold hover:underline"
              >
                {isEn ? 'Order via WhatsApp →' : 'Bestellen via WhatsApp →'}
              </a>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
