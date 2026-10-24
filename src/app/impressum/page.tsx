import React from 'react';

export const metadata = {
  title: 'Impressum | Schnitzel Schmiede Mönchengladbach',
  description: 'Rechtliche Angaben und Impressum gemäß § 5 DDG.',
};

export default function ImpressumPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 text-xs sm:text-sm text-[#C4BFB5] space-y-6">
      <h1 className="text-2xl sm:text-4xl font-extrabold text-[#FDFBF7]">
        Impressum
      </h1>
      <p className="text-[#C4BFB5]">Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG):</p>

      <div className="rounded-2xl border border-white/10 bg-[#141418] p-6 space-y-4">
        <h2 className="text-lg font-bold text-[#FDFBF7]">Betreiber der Plattform</h2>
        <p>
          Schnitzel Schmiede Mönchengladbach
          <br />
          Inhaber: Max Schmiede
          <br />
          Bismarckstraße 45
          <br />
          41061 Mönchengladbach
          <br />
          Deutschland
        </p>

        <h3 className="text-base font-bold text-[#FDFBF7] pt-2">Kontakt</h3>
        <p>
          Telefon: 02161 / 123456
          <br />
          WhatsApp: 0176 12345678
          <br />
          E-Mail: bestellung@schnitzel-schmiede-mg.de
          <br />
          Internet: https://schnitzel-schmiede-mg.de
        </p>

        <h3 className="text-base font-bold text-[#FDFBF7] pt-2">Umsatzsteuer-ID</h3>
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
          <br />
          DE 312 456 789
        </p>

        <h3 className="text-base font-bold text-[#FDFBF7] pt-2">Aufsichtsbehörde</h3>
        <p>
          Ordnungsamt der Stadt Mönchengladbach
          <br />
          Fliethstraße 86–90, 41061 Mönchengladbach
        </p>

        <h3 className="text-base font-bold text-[#FDFBF7] pt-2">Streitschlichtung</h3>
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
          https://ec.europa.eu/consumers/odr/. Wir sind nicht verpflichtet oder bereit, an
          Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </div>
    </div>
  );
}
