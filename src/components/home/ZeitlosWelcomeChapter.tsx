'use client';

import React from 'react';
import { Flame, Sparkles, ChefHat, HeartHandshake, Award, BookOpen, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../providers/LanguageContext';

export function ZeitlosWelcomeChapter() {
  const { lang } = useLanguage();
  const isEn = lang === 'en';

  return (
    <section className="relative py-20 sm:py-28 bg-gradient-to-b from-[#faf7f2] via-[#f5efe6] to-[#faf7f2] border-t border-[#e6d7c3]/70 overflow-hidden [contain:paint]">
      {/* Subtle warm amber ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[600px] h-[300px] bg-[#d99036]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Poetic Flourish Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#e6d7c3] bg-white/90 backdrop-blur-md px-4 py-1.5 text-xs font-mono font-bold text-[#b45309] mb-6 shadow-sm">
          <Sparkles className="h-3.5 w-3.5 text-[#d99036]" />
          <span>{isEn ? 'GASTRONOMY WITH SOUL · MÖNCHENGLADBACH' : 'GASTRONOMIE MIT HERZ & HANDWERK · MÖNCHENGLADBACH'}</span>
        </div>

        {/* Poetic Italic Flourish + Luxury Serif Headline */}
        <div className="space-y-2 mb-8">
          <p className="text-xl sm:text-2xl lg:text-3xl font-serif italic text-[#b45309] tracking-wide">
            {isEn ? '“Forget the rush…”' : '„Vergiss die Hektik des Alltags…“'}
          </p>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#16202a] font-serif tracking-tight leading-tight">
            {isEn ? (
              <>
                True craftsmanship. <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b45309] via-[#d99036] to-[#b45309]">
                  Pure butter. Zero compromise.
                </span>
              </>
            ) : (
              <>
                Echte Handwerkskunst. <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b45309] via-[#d99036] to-[#b45309]">
                  Reines Butterschmalz. Ohne Kompromisse.
                </span>
              </>
            )}
          </h2>
        </div>

        {/* Narrative Description (Zeitlos-style warm hospitality) - High Contrast */}
        <p className="max-w-3xl mx-auto text-sm sm:text-base text-[#4b3b2f] font-medium leading-relaxed mb-12">
          {isEn
            ? 'Welcome to Die Schnitzel Schmiede in Mönchengladbach. Here, time pauses for authentic culinary passion. Every single schnitzel is freshly hand-pounded only when ordered, gently souffléed in 100% clarified butter, and served with love. Sauces travel separately in sealed jars to guarantee that legendary crunch at your table or right at your door.'
            : 'Herzlich willkommen in der Schnitzelschmiede Mönchengladbach – einem Ort, an dem wahre Handwerkskunst und ehrliche Gastfreundschaft zusammenkommen. Jedes Schnitzel wird erst auf Bestellung frisch von Hand plattiert, in reinem Butterschmalz wellenförmig souffliert und heiß serviert. Saucen reisen stets im separaten Glas, damit die goldene Panade bis zum letzten Bissen unvergleichlich knusprig bleibt.'}
        </p>

        {/* 3 Pillars of Gastronomy */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-[#e6d7c3]/80 text-left">
          <div className="p-6 rounded-2xl bg-white/95 backdrop-blur-md border border-[#e6d7c3] shadow-md shadow-[#16202a]/5 hover:border-[#d99036] hover:shadow-[0_16px_35px_rgba(217,144,54,0.12)] transition-all">
            <div className="h-11 w-11 rounded-xl bg-[#ffedd5] flex items-center justify-center text-[#b45309] mb-4">
              <ChefHat className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-[#16202a] font-serif mb-1.5">
              {isEn ? '100% Freshly Pounded' : '100% Frisch geklopft'}
            </h3>
            <p className="text-xs sm:text-sm text-[#4b3b2f] leading-relaxed">
              {isEn
                ? 'No frozen conveyor belts. Hand-tenderized meat prepared to order with supreme precision.'
                : 'Keine vorgefertigte TK-Ware. Jedes Schnitzel wird von Meisterhand frisch portioniert und plattiert.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/95 backdrop-blur-md border border-[#e6d7c3] shadow-md shadow-[#16202a]/5 hover:border-[#d99036] hover:shadow-[0_16px_35px_rgba(217,144,54,0.12)] transition-all">
            <div className="h-11 w-11 rounded-xl bg-[#ffedd5] flex items-center justify-center text-[#b45309] mb-4">
              <Flame className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-[#16202a] font-serif mb-1.5">
              {isEn ? 'Pure Clarified Butter' : 'Reines Butterschmalz'}
            </h3>
            <p className="text-xs sm:text-sm text-[#4b3b2f] leading-relaxed">
              {isEn
                ? 'Swum floating at high heat for that distinctive golden-brown souffléed crust.'
                : 'Schwimmend gebacken für die charakteristische, federleichte und goldgelb gewellte Panade.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/95 backdrop-blur-md border border-[#e6d7c3] shadow-md shadow-[#16202a]/5 hover:border-[#d99036] hover:shadow-[0_16px_35px_rgba(217,144,54,0.12)] transition-all">
            <div className="h-11 w-11 rounded-xl bg-[#ffedd5] flex items-center justify-center text-[#b45309] mb-4">
              <HeartHandshake className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-[#16202a] font-serif mb-1.5">
              {isEn ? 'Rhenish Hospitality' : 'Rheinische Gastlichkeit'}
            </h3>
            <p className="text-xs sm:text-sm text-[#4b3b2f] leading-relaxed">
              {isEn
                ? 'Warm atmosphere, generous portions, and personal care on Dohler Straße.'
                : 'Herzliche Gastfreundschaft, ehrliche Portionen und persönliche Betreuung auf der Dohler Straße.'}
            </p>
          </div>
        </div>

        {/* Editorial Feature Card: EineStadt-Fest & Speisely Magazin Story */}
        <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#fffbf5] via-[#fdf7ed] to-[#f7eedf] border border-[#e6d7c3] shadow-md shadow-[#16202a]/5 text-left flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-[#d99036]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-2 max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fef3c7] border border-[#fde68a] text-[11px] font-bold text-[#b45309] uppercase tracking-wider">
              <Award className="h-3.5 w-3.5 text-[#d99036]" />
              <span>{isEn ? '13 Years Tradition · Gourmet Mile MG' : '13 Jahre Tradition · Gourmet-Meile MG'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-[#16202a] font-serif">
              {isEn ? 'A Familiar Stop on the Mönchengladbach Gourmet Mile' : 'Fester Treffpunkt auf der Mönchengladbacher Gourmet-Meile'}
            </h3>
            <p className="text-xs sm:text-sm text-[#4b3b2f] leading-relaxed">
              {isEn
                ? 'Since 2013, Schnitzel Schmiede has been welcoming visitors on the Gourmet Mile along Brucknerallee. Read the culinary feature in Speisely Magazine.'
                : 'Bereits seit 2013 begeistert die Schnitzel Schmiede Besucher auf der Gourmet-Meile an der Brucknerallee mit frisch zubereiteten Schnitzeln. Lies das kulinarische Porträt im Speisely Magazin.'}
            </p>
          </div>

          <a
            href="https://speisely.de/magazin/schnitzel-schmiede"
            target="_blank"
            rel="noopener"
            className="group inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-[#16202a] hover:bg-[#b45309] text-white text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-md shrink-0 active:scale-95 cursor-pointer relative z-10"
          >
            <BookOpen className="h-4 w-4 text-[#d99036] group-hover:text-white transition-colors" />
            <span>{isEn ? 'Read on Speisely Magazine' : 'Artikel im Speisely Magazin'}</span>
            <ArrowUpRight className="h-4 w-4 text-[#e8d5be] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
