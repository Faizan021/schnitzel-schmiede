'use client';

import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import { SpotlightCard } from '../ui/SpotlightCard';
import { useLanguage } from '../providers/LanguageContext';

export function ReviewsSection() {
  const { lang } = useLanguage();
  const isEn = lang === 'en';

  const reviews = [
    {
      author: 'Dennis M.',
      location: 'Mönchengladbach-Mitte',
      rating: 5,
      date: isEn ? '3 days ago' : 'Vor 3 Tagen',
      text: isEn
        ? 'Best schnitzel place in the entire region! The concept of delivering the mushroom cream sauce in a separate jar is brilliant – the schnitzel arrived piping hot and ultra-crispy. The truffle fries are addictive!'
        : 'Bester Schnitzel-Laden in ganz MG! Die Idee, die Champignon-Rahmsauce separat zu liefern, ist Gold wert – das Schnitzel kam heiß und super kross an. Die Trüffel-Fries sind süchtig machend!',
      dish: 'Jägerschnitzel "Schmiede Art"',
    },
    {
      author: 'Fatima & Yasin K.',
      location: 'Rheydt',
      rating: 5,
      date: isEn ? '1 week ago' : 'Vor 1 Woche',
      text: isEn
        ? 'Finally a truly premium schnitzel restaurant with authentic clarified butter soufflé pan craft! The meat was extraordinarily tender and juicy. The 1-click WhatsApp order was completed in under 30 seconds.'
        : 'Endlich ein richtig gutes Schnitzel-Restaurant mit echtem Butterschmalz-Handwerk! Das Fleisch war extrem zart und saftig. Auch die WhatsApp-Bestellung ging in unter 30 Sekunden.',
      dish: isEn ? 'Brewery Schnitzel (Crispy Panade)' : 'Brauhaus-Schnitzel (Knusper-Panade)',
    },
    {
      author: 'Stefan B.',
      location: 'Borussia-Fanclub MG',
      rating: 5,
      date: isEn ? '2 weeks ago' : 'Vor 2 Wochen',
      text: isEn
        ? 'Ordered the XXL Schnitzel right before the Borussia home match. Huge portion, real clarified butter flavor, and the fried potatoes with onions were browned to absolute perfection.'
        : 'Hatten das XXL-Schnitzel vor dem Borussia-Heimspiel bestellt. Unglaubliche Portion, echter Butterschmalz-Geschmack und die Bratkartoffeln mit Zwiebeln waren auf den Punkt.',
      dish: 'Schmiede-XXL 440g Duo',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-[#edf7fc] via-[#ddeef7] to-[#edf7fc] border-t border-[#b8d4e8]/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-1.5 text-[#92601e] mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current text-[#92601e]" />
              ))}
              <span className="text-xs sm:text-sm font-black text-[#1a3a52] ml-2">
                {isEn ? '4.9 out of 5 Stars' : '4.9 von 5 Sternen'}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1a3a52] font-serif">
              {isEn ? 'What Guests in Mönchengladbach Say' : 'Das sagen Gäste aus Mönchengladbach'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-[#163044] mt-2 md:mt-0">
            {isEn
              ? 'Over 850+ verified reviews on Google & Delivery networks'
              : 'Über 850+ verifizierte Bewertungen bei Google & Lieferando'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <SpotlightCard
              key={idx}
              className="p-6 bg-white/90 backdrop-blur-md border border-white/95 shadow-md shadow-[#1a3a52]/5 hover:border-[#9bc1d9] flex flex-col justify-between rounded-2xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-[#92601e]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current text-[#92601e]" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-[#163044]">{rev.date}</span>
                </div>

                <p className="text-xs sm:text-sm leading-relaxed text-[#1a3a52] font-medium italic mb-4">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-[#b8d4e8]/60 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#1a3a52] flex items-center gap-1">
                    <span>{rev.author}</span>
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  </div>
                  <div className="text-[10px] text-[#2e5f7e]">{rev.location}</div>
                </div>
                <span className="text-[10px] font-bold text-[#1a3a52] rounded-full bg-[#cce3f1] border border-[#b8d4e8] px-2.5 py-0.5">
                  {rev.dish}
                </span>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
