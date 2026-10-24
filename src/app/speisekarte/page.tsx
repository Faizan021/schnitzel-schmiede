import React from 'react';
import { MenuSection } from '@/components/menu/MenuSection';
import { UtensilsCrossed } from 'lucide-react';

export const metadata = {
  title: 'Speisekarte & Online Bestellen | Schnitzel Schmiede Mönchengladbach',
  description:
    'Entdecken Sie unsere handpanierten Schnitzel, Burger, Loaded Fries und hausgemachten Saucen. 100% Halal Optionen verfügbar. 10% Rabatt bei Selbstabholung.',
};

export default function SpeisekartePage() {
  return (
    <div className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center max-w-3xl mb-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#E6B84A]/30 bg-[#E6B84A]/10 px-4 py-1.5 text-xs font-bold text-[#E6B84A] mb-3">
          <UtensilsCrossed className="h-3.5 w-3.5" />
          <span>Direkt & Provisionsfrei Bestellen</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#FDFBF7] font-display">
          Unsere Speisekarte
        </h1>
        <p className="mt-2 text-sm text-[#C4BFB5]">
          Wählen Sie Ihre Lieblingsgerichte für die schnelle Lieferung in Mönchengladbach
          oder zur Selbstabholung mit 10% Preisvorteil.
        </p>
      </div>

      <MenuSection />
    </div>
  );
}
