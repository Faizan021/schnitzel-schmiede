import React from 'react';
import { MenuSection } from '@/components/menu/MenuSection';
import { MenuPageHeader } from '@/components/menu/MenuPageHeader';

export const metadata = {
  title: 'Speisekarte & Online Bestellen | Schnitzel Schmiede Mönchengladbach',
  description:
    'Entdecken Sie unsere handpanierten Schnitzel, Burger, Loaded Fries und hausgemachten Saucen. 100% Halal Optionen verfügbar. 10% Rabatt bei Selbstabholung.',
};

export default function SpeisekartePage() {
  return (
    <div className="py-8 sm:py-12">
      <MenuPageHeader />
      <MenuSection />
    </div>
  );
}
