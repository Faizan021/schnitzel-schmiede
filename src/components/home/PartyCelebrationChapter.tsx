'use client';

import React from 'react';
import Link from 'next/link';
import { PartyPopper, Users, Sparkles, MessageSquare, ArrowRight, Utensils, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../providers/LanguageContext';
import { getKitchenWhatsAppNumber } from '@/lib/utils/whatsapp';

export function PartyCelebrationChapter() {
  const { lang } = useLanguage();
  const isEn = lang === 'en';
  const whatsappPhone = getKitchenWhatsAppNumber();

  const partyPackages = [
    {
      id: 'party-10',
      title: isEn ? 'Small Schnitzel Party (10 Schnitzels)' : 'Kleine Schnitzelparty (10 Schnitzel)',
      people: isEn ? '5 – 8 People' : 'Für 5 bis 8 Personen',
      price: '89,90 €',
      features: [
        isEn ? '10 Schnitzels of your choice (Pork / Turkey / Veal)' : '10 Schnitzel nach Wahl (Schwein / Pute / Kalb)',
        isEn ? 'Generous portions of crispy sides (Fries / Croquettes)' : 'Große Portionen Beilagen nach Wahl (Pommes / Kroketten)',
        isEn ? 'Signature homemade sauces in separate jars' : 'Hausgemachte Saucen im separaten Becher',
        isEn ? 'Fresh Rhenish white cabbage salad with vinaigrette' : 'Frischer Krautsalat mit Essig-Öl-Dressing',
      ],
      bestseller: false,
    },
    {
      id: 'party-20',
      title: isEn ? 'Medium Schnitzel Party (20 Schnitzels)' : 'Mittlere Schnitzelparty (20 Schnitzel)',
      people: isEn ? '12 – 18 People' : 'Für 12 bis 18 Personen',
      price: '169,90 €',
      features: [
        isEn ? '20 Schnitzels of your choice freshly fried' : '20 knusprige Schnitzel frisch ausgebacken',
        isEn ? 'Assorted platters of sides & roasted potatoes' : 'Große Platten an Beilagen & Oma\'s Bratkartoffeln',
        isEn ? 'Selection of 3 craft sauces (Hunter / Cream / Paprika)' : 'Große Saucenauswahl (Jäger- / Rahm- / Paprikasauce)',
        isEn ? 'Fresh market coleslaw and dips' : 'Hausgemachter Krautsalat & feine Dips',
      ],
      bestseller: true,
    },
    {
      id: 'party-40',
      title: isEn ? 'Grand Schnitzel Party (40 Schnitzels)' : 'Große Schnitzelparty (40 Schnitzel)',
      people: isEn ? '25 – 40 People' : 'Für 25 bis 40 Personen',
      price: '319,90 €',
      features: [
        isEn ? '40 Golden souffléed craft schnitzels' : '40 goldbraun soufflierte Schnitzel nach Wahl',
        isEn ? 'Mega platters of rustic fries, croquettes & potatoes' : 'Riesige Platten an Pommes, Kroketten & Bratkartoffeln',
        isEn ? 'Full sauce station in thermal transport containers' : 'Komplette Saucen-Station in Thermo-Behältern',
        isEn ? 'Delivered hot to your venue on schedule' : 'Heiß und pünktlich an Ihren Veranstaltungsort geliefert',
      ],
      bestseller: false,
    },
  ];

  const buildPartyInquiryUrl = (pkgName: string) => {
    const text = [
      '🔥 [SCHNITZEL SCHMIEDE MÖNCHENGLADBACH · Dohler Str. 269]',
      '📍 RESTAURANT: Die Schnitzel Schmiede Mönchengladbach',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      `Hallo! Ich interessiere mich für eine Feier / Catering: *${pkgName}*`,
      'Bitte um kurze Information zu Verfügbarkeit und Ablauf.',
    ].join('\n');
    return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-[#edf7fc] via-[#ddeef7] to-[#edf7fc] border-t border-[#b8d4e8]/60 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header: Zeitlos-inspired "Für Ihre Feier reserviert" */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#b8d4e8] bg-white/80 backdrop-blur-md px-4 py-1.5 text-xs font-mono font-bold text-[#1a3a52] mb-3 shadow-sm">
            <PartyPopper className="h-3.5 w-3.5 text-[#2e5f7e]" />
            <span>{isEn ? 'FOR YOUR CELEBRATIONS & EVENTS' : 'FÜR IHRE FEIER & EVENTS RESERVIERT'}</span>
          </div>

          <p className="text-xl sm:text-2xl font-serif italic text-[#2e5f7e] mb-2">
            {isEn ? '“Celebrate with genuine crunch…”' : '„Feiern mit echtem Schmiede-Crunch…“'}
          </p>

          <h2 className="text-3xl sm:text-5xl font-black text-[#1a3a52] font-serif tracking-tight">
            {isEn ? 'The Schnitzel Party & Catering' : 'Die Schnitzel-Party & Partyservice'}
          </h2>

          <p className="mt-4 text-sm sm:text-base text-[#2e5f7e] leading-relaxed">
            {isEn
              ? 'Whether a family birthday, company anniversary, club celebration, or wedding: We deliver our freshly fried craft schnitzels on steaming thermal platters hot and crisp to your venue in Mönchengladbach.'
              : 'Ob runder Geburtstag, Firmenjubiläum, Vereinsfest oder Familienfeier: Unsere originalen Schnitzelparty-Pakete werden heiß in speziellen Thermobehältern geliefert – die Saucen reisen separat, damit alles bis zum Festtisch knusprig bleibt.'}
          </p>
        </div>

        {/* 3 Party Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {partyPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                pkg.bestseller
                  ? 'bg-white/95 backdrop-blur-md border-2 border-[#9bc1d9] shadow-xl shadow-[#1a3a52]/10'
                  : 'bg-white/85 backdrop-blur-md border border-white/90 shadow-md shadow-[#1a3a52]/5 hover:border-[#9bc1d9]'
              }`}
            >
              {pkg.bestseller && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#9bc1d9] text-[#1a3a52] text-[10px] font-black uppercase tracking-wider shadow-md">
                  {isEn ? 'Most Popular Event Deal' : 'Beliebtestes Festpaket'}
                </span>
              )}

              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#2e5f7e] uppercase font-bold mb-2">
                  <Users className="h-3.5 w-3.5 text-[#2e5f7e]" />
                  <span>{pkg.people}</span>
                </div>

                <h3 className="text-xl font-bold text-[#1a3a52] font-serif mb-2">
                  {pkg.title}
                </h3>

                <div className="font-serif text-3xl font-black text-[#1a3a52] mb-6">
                  {pkg.price}
                </div>

                <ul className="space-y-3 text-xs text-[#2e5f7e] mb-8">
                  {pkg.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#2e5f7e] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-[#b8d4e8]/60 space-y-2.5">
                <a
                  href={buildPartyInquiryUrl(pkg.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 active:scale-98"
                  title="Party-Angebot direkt per WhatsApp anfragen"
                >
                  <MessageSquare className="h-4 w-4 fill-emerald-600 text-emerald-600" />
                  <span>{isEn ? 'WhatsApp Inquiry · 0176 70341602' : 'WhatsApp-Anfrage · 0176 70341602'}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Live Catering Calculator Teaser Bar */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white/85 backdrop-blur-md border border-[#b8d4e8] shadow-md shadow-[#1a3a52]/5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-mono font-bold text-[#2e5f7e] uppercase tracking-wider">
              {isEn ? 'INDIVIDUAL BUFFET OR 50+ GUESTS?' : 'INDIVIDUELLES BUFFET ODER 50+ GÄSTE?'}
            </span>
            <h4 className="text-lg sm:text-xl font-bold text-[#1a3a52] font-serif">
              {isEn ? 'Use our Live Catering Event Calculator' : 'Nutzen Sie unseren Live Event- & Catering-Rechner'}
            </h4>
            <p className="text-xs text-[#2e5f7e]">
              {isEn
                ? 'Calculate budgets, guest counts, and warm buffet packages in real time.'
                : 'Berechnen Sie Personenzahl, Buffets und Wünsche in Sekunden mit sofortigem Kostenvoranschlag.'}
            </p>
          </div>

          <Link
            href="/catering"
            className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl bg-[#9bc1d9] hover:bg-[#85b0cb] text-[#1a3a52] font-black text-xs uppercase tracking-wider transition-all shadow-md"
          >
            <span>{isEn ? 'Open Catering Calculator' : 'Zum Catering-Rechner'}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
