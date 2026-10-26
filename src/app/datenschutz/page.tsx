import React from 'react';
import Link from 'next/link';
import { ExternalLink, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Datenschutzerklärung | Schnitzelschmiede Mönchengladbach',
  description: 'Datenschutzerklärung gemäß Datenschutz-Grundverordnung (DSGVO) der Schnitzelschmiede Mönchengladbach.',
};

export default function DatenschutzPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 text-xs sm:text-sm text-[#2e5f7e] space-y-6">
      <div className="flex items-center gap-2 text-[#1a3a52]">
        <ShieldCheck className="h-5 w-5" />
        <span className="text-xs uppercase tracking-widest font-bold">DSGVO-Konformität</span>
      </div>
      <h1 className="text-2xl sm:text-4xl font-extrabold text-[#1a3a52] font-serif">
        Datenschutzerklärung
      </h1>

      <div className="rounded-2xl border border-[#b8d4e8] bg-white/85 backdrop-blur-md p-6 sm:p-8 space-y-6 text-[#1a3a52] shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-[#1a3a52] font-serif mb-2">1. Datenschutz auf einen Blick</h2>
          <p className="leading-relaxed text-[#2e5f7e]">
            Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen. Die folgenden
            Hinweise geben einen verständlichen Überblick darüber, was mit Ihren personenbezogenen Daten
            passiert, wenn Sie unsere Website besuchen oder Bestellungen aufgeben.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-[#1a3a52] font-serif mb-2">2. Verantwortliche Stelle</h2>
          <p className="leading-relaxed text-[#2e5f7e]">
            <strong className="text-[#1a3a52]">Schnitzelschmiede</strong>
            <br />
            Inhaber: Umar Jabbar
            <br />
            Dohler Str. 269, 41238 Mönchengladbach
            <br />
            Telefon:{' '}
            <a href="tel:+4921669786951" className="text-[#1a3a52] hover:underline font-mono font-bold">
              02166 9786951
            </a>
            <br />
            E-Mail:{' '}
            <a
              href="mailto:umarjabbar@yahoo.com?subject=Datenschutz%20Schnitzelschmiede"
              className="text-[#1a3a52] hover:underline font-bold"
            >
              umarjabbar@yahoo.com
            </a>
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-[#FDFBF7] font-serif mb-2">
            3. Datenerfassung bei Bestellungen & Reservierungen
          </h2>
          <p className="leading-relaxed mb-3">
            Die von Ihnen bei der Online-Bestellung oder im Reservierungsformular eingegebenen Daten
            (Name, Telefonnummer, Adresse, E-Mail-Adresse, Speisenauswahl) werden ausschließlich
            zum Zweck der Vertragserfüllung und Auslieferung verarbeitet (Art. 6 Abs. 1 lit. b DSGVO).
          </p>
          <p className="leading-relaxed">
            Falls Sie WhatsApp zur Kommunikation nutzen, wird eine vorgefertigte Textnachricht auf Ihrem
            Gerät erzeugt. Die Übermittlung erfolgt erst mit Klick auf &apos;Senden&apos; über die Infrastruktur
            von WhatsApp Ireland Limited.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-[#FDFBF7] font-serif mb-2">4. Ihre Rechte</h2>
          <p className="leading-relaxed">
            Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Herkunft, Empfänger und Zweck
            Ihrer gespeicherten personenbezogenen Daten sowie ein Recht auf Berichtigung, Sperrung oder
            Löschung dieser Daten.
          </p>
        </div>

        <div className="pt-4 border-t border-[#312B26]">
          <h4 className="text-xs uppercase tracking-wider text-[#C4BFB5] mb-2 font-bold">
            Offizielle Speisebaron Rechtstexte
          </h4>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://speisebaron.de/webseite/664f673709580c0011f7c7d7/datenschutz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#23201C] border border-[#312B26] text-xs font-semibold text-[#E5B24E] hover:bg-[#2C2723] transition-colors"
            >
              <span>Speisebaron Datenschutz Portal</span>
              <ExternalLink className="h-3 w-3" />
            </a>
            <a
              href="https://speisebaron.de/webseite/664f673709580c0011f7c7d7/impressum"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#23201C] border border-[#312B26] text-xs font-semibold text-[#E5B24E] hover:bg-[#2C2723] transition-colors"
            >
              <span>Speisebaron Impressum</span>
              <ExternalLink className="h-3 w-3" />
            </a>
            <a
              href="https://speisebaron.de/webseite/664f673709580c0011f7c7d7/agb"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#23201C] border border-[#312B26] text-xs font-semibold text-[#E5B24E] hover:bg-[#2C2723] transition-colors"
            >
              <span>Speisebaron AGB</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
