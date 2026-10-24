import React from 'react';

export const metadata = {
  title: 'Datenschutzerklärung | Schnitzel Schmiede Mönchengladbach',
  description: 'Datenschutzerklärung gemäß Datenschutz-Grundverordnung (DSGVO).',
};

export default function DatenschutzPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 text-xs sm:text-sm text-[#C4BFB5] space-y-6">
      <h1 className="text-2xl sm:text-4xl font-extrabold text-[#FDFBF7]">
        Datenschutzerklärung
      </h1>

      <div className="rounded-2xl border border-white/10 bg-[#141418] p-6 space-y-4">
        <h2 className="text-lg font-bold text-[#FDFBF7]">1. Datenschutz auf einen Blick</h2>
        <p>
          Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen. Die folgenden
          Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten
          passiert, wenn Sie unsere Website besuchen oder über WhatsApp bestellen.
        </p>

        <h3 className="text-base font-bold text-[#FDFBF7] pt-2">2. Verantwortliche Stelle</h3>
        <p>
          Schnitzel Schmiede Mönchengladbach
          <br />
          Bismarckstraße 45, 41061 Mönchengladbach
          <br />
          E-Mail: bestellung@schnitzel-schmiede-mg.de
        </p>

        <h3 className="text-base font-bold text-[#FDFBF7] pt-2">
          3. Datenerfassung bei Bestellungen via WhatsApp
        </h3>
        <p>
          Wenn Sie unsere Funktion zur WhatsApp-Bestellung nutzen, wird eine vorformatierte
          Nachricht mit Ihren ausgewählten Gerichten, Ihrem Namen, Ihrer Adresse und Telefonnummer
          in der WhatsApp-App auf Ihrem Gerät generiert.
          <br />
          Die tatsächliche Übermittlung erfolgt erst, wenn Sie aktiv in WhatsApp auf &apos;Senden&apos;
          klicken. Anbieter ist die WhatsApp Ireland Limited, 4 Grand Canal Square, Grand Canal
          Harbour, Dublin 2, Irland.
        </p>

        <h3 className="text-base font-bold text-[#FDFBF7] pt-2">4. Tischreservierungen</h3>
        <p>
          Die von Ihnen im Reservierungsformular eingegebenen Daten (Name, Telefonnummer,
          E-Mail-Adresse, Personenanzahl) werden ausschließlich zum Zweck der Abwicklung und
          Bestätigung Ihrer Tischreservierung verarbeitet (Art. 6 Abs. 1 lit. b DSGVO).
        </p>

        <h3 className="text-base font-bold text-[#FDFBF7] pt-2">5. Ihre Rechte</h3>
        <p>
          Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten
          personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der
          Datenverarbeitung sowie ein Recht auf Berichtigung oder Löschung dieser Daten.
        </p>
      </div>
    </div>
  );
}
