import React from 'react';
import Link from 'next/link';
import {
  Flame,
  Award,
  ShieldCheck,
  Sparkles,
  HeartHandshake,
} from 'lucide-react';
import { SpotlightCard } from '../ui/SpotlightCard';

export function CraftPhilosophy() {
  const pillars = [
    {
      icon: Flame,
      title: 'Frisch geklopft & souffliert',
      subtitle: 'In reinem Butterschmalz',
      description:
        'Keine vorgefertigte Tiefkühlware. Jedes Schnitzel wird erst bei Bestelleingang hauchdünn von Hand geklopft und in der heißen Pfanne wellenartig souffliert.',
    },
    {
      icon: ShieldCheck,
      title: 'Die Knusper-Garantie',
      subtitle: 'Saucen separat im Becher',
      description:
        'Der größte Fehler beim Schnitzel-Lieferservice ist aufgeweichte Panade. Bei uns reisen Champignon-Rahm, Pfeffer- und Paprikasaucen immer separat im versiegelten Glas.',
    },
    {
      icon: Award,
      title: 'Regionales Fleisch & Kalb',
      subtitle: 'Transparenz für jeden Gast',
      description:
        'Für Feinschmecker bieten wir echtes Kalbfleisch nach Wiener Tradition sowie hausgemachte Veggie-Schnitzel.',
    },
    {
      icon: HeartHandshake,
      title: 'Direkt & Provisionsfrei',
      subtitle: 'Keine 30% Plattform-Abgabe',
      description:
        'Bestellen Sie direkt bei uns via 1-Klick WhatsApp oder Web. Wir geben die Ersparnis an Sie weiter: 10% Sofort-Rabatt auf jede Selbstabholung!',
    },
  ];

  return (
    <section id="manufaktur" className="py-20 bg-[#0C0C10] border-y border-white/5 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#E6B84A] uppercase tracking-widest">
            Unsere Handwerks-Philosophie
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#FDFBF7] mt-2 font-display">
            Warum die Schmiede anders schmeckt
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#C4BFB5]">
            Mönchengladbachs Gastronomie verdient Leidenschaft statt industrieller Massenware.
            Hier ist unser 4-Punkte-Qualitätsversprechen an Sie.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <SpotlightCard
                key={idx}
                className="p-6 bg-[#121216] border border-white/10 hover:border-[#E6B84A]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E6B84A]/10 text-[#E6B84A] mb-5">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#FDFBF7]">{p.title}</h3>
                  <div className="text-xs font-semibold text-[#E6B84A] mt-0.5">{p.subtitle}</div>
                  <p className="mt-3 text-xs leading-relaxed text-[#C4BFB5]">{p.description}</p>
                </div>
              </SpotlightCard>
            );
          })}
        </div>

        {/* Live CTA Teaser */}
        <div className="mt-16 rounded-3xl border border-[#E6B84A]/25 bg-gradient-to-r from-[#14141A] via-[#1A1A24] to-[#14141A] p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="inline-block rounded-full bg-[#E6B84A]/20 px-3 py-1 text-xs font-bold text-[#E6B84A]">
              Heute Lust auf echtes Schnitzel?
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-[#FDFBF7]">
              Konfigurieren Sie Ihr persönliches Meisterstück
            </h3>
            <p className="text-xs sm:text-sm text-[#C4BFB5]">
              Wählen Sie aus 4 Fleischarten, 5 Knusperpanaden und 6 hausgemachten Saucen.
            </p>
            <div className="pt-2">
              <Link
                href="/speisekarte"
                className="inline-flex items-center gap-2 rounded-xl bg-[#E6B84A] px-7 py-3 text-sm font-black text-[#0A0A0C] hover:bg-[#F5C75D] shadow-lg shadow-[#E6B84A]/30 transition-all"
              >
                <Sparkles className="h-4 w-4" />
                <span>Zum Schnitzel-Baukasten</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
