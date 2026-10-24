import React from 'react';
import { ReservationForm } from '@/components/reservation/ReservationForm';

export const metadata = {
  title: 'Tisch reservieren | Schnitzel Schmiede Mönchengladbach',
  description:
    'Reservieren Sie Ihren Tisch in der Schnitzel Schmiede Mönchengladbach. Echtzeit-Kapazitätsgarantie, Sofort-Bestätigung und .ics Kalender-Download.',
};

export default function ReservierungPage() {
  return (
    <div className="py-6 sm:py-10">
      <ReservationForm />
    </div>
  );
}
