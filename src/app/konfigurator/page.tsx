import React from 'react';
import { SchnitzelBuilder } from '@/components/customizer/SchnitzelBuilder';

export const metadata = {
  title: 'Schnitzel-Baukasten 2026 | Schnitzel Schmiede Mönchengladbach',
  description:
    'Bauen Sie Ihr individuelles Schnitzel nach Wunsch: Fleischart, Größe, Knusperpanade, hausgemachte Saucen und Beilagen. Mit Knusper-Garantie geliefert.',
};

export default function KonfiguratorPage() {
  return (
    <div className="py-6 sm:py-10">
      <SchnitzelBuilder />
    </div>
  );
}
