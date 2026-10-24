import React from 'react';
import { CateringCalculator } from '@/components/catering/CateringCalculator';

export const metadata = {
  title: 'Catering & Live-Cooking Mönchengladbach | Schnitzel Schmiede MG',
  description:
    'Catering, Buffets und Live-Cooking für Firmenfeiern, Geburtstage und Vereinsfeste in Mönchengladbach, Krefeld und Neuss. Interaktiver Kostenrechner.',
};

export default function CateringPage() {
  return (
    <div className="py-6 sm:py-10">
      <CateringCalculator />
    </div>
  );
}
