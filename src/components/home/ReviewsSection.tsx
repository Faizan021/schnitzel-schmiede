import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import { SpotlightCard } from '../ui/SpotlightCard';

export function ReviewsSection() {
  const reviews = [
    {
      author: 'Dennis M.',
      location: 'Mönchengladbach-Mitte',
      rating: 5,
      date: 'Vor 3 Tagen',
      text: 'Bester Schnitzel-Laden in ganz MG! Die Idee, die Champignon-Rahmsauce separat zu liefern, ist Gold wert – das Schnitzel kam heiß und super kross an. Die Trüffel-Fries sind süchtig machend!',
      dish: 'Jägerschnitzel "Schmiede Art"',
    },
    {
      author: 'Fatima & Yasin K.',
      location: 'Rheydt',
      rating: 5,
      date: 'Vor 1 Woche',
      text: 'Endlich ein richtig gutes Schnitzel-Restaurant mit 100% Halal Hähnchenfleisch! Das Fleisch war extrem zart und saftig. Auch die WhatsApp-Bestellung ging in unter 30 Sekunden.',
      dish: 'Brauhaus-Schnitzel (Halal Hähnchen)',
    },
    {
      author: 'Stefan B.',
      location: 'Borussia-Fanclub MG',
      rating: 5,
      date: 'Vor 2 Wochen',
      text: 'Hatten das XXL-Schnitzel vor dem Borussia-Heimspiel bestellt. Unglaubliche Portion, echter Butterschmalz-Geschmack und die Bratkartoffeln mit Zwiebeln waren auf den Punkt.',
      dish: 'Schmiede-XXL 440g Duo',
    },
  ];

  return (
    <section className="py-20 bg-[#0A0A0C]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-1.5 text-[#E6B84A] mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
              <span className="text-xs font-bold text-[#FDFBF7] ml-2">4.9 von 5 Sternen</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#FDFBF7] font-display">
              Das sagen Gäste aus Mönchengladbach
            </h2>
          </div>
          <p className="text-xs text-[#C4BFB5] mt-2 md:mt-0">
            Über 850+ verifizierte Bewertungen bei Google & Lieferando
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <SpotlightCard
              key={idx}
              className="p-6 bg-[#121216] border border-white/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-[#E6B84A]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#C4BFB5]">{rev.date}</span>
                </div>

                <p className="text-xs leading-relaxed text-[#FDFBF7] italic mb-4">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#FDFBF7] flex items-center gap-1">
                    <span>{rev.author}</span>
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  </div>
                  <div className="text-[10px] text-[#C4BFB5]">{rev.location}</div>
                </div>
                <span className="text-[10px] font-medium text-[#E6B84A] rounded bg-[#E6B84A]/10 px-2 py-0.5">
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
