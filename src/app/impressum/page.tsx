import React from 'react';
import Link from 'next/link';
import { ExternalLink, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Impressum | Schnitzelschmiede Mönchengladbach',
  description: 'Rechtliche Angaben und Impressum der Schnitzelschmiede Mönchengladbach gemäß § 5 DDG.',
};

export default function ImpressumPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 text-xs sm:text-sm text-[#2e5f7e] space-y-6">
      <div className="flex items-center gap-2 text-[#1a3a52]">
        <ShieldCheck className="h-5 w-5" />
        <span className="text-xs uppercase tracking-widest font-bold">Rechtliche Transparenz</span>
      </div>
      <h1 className="text-2xl sm:text-4xl font-extrabold text-[#1a3a52] font-serif">
        Impressum
      </h1>
      <p className="text-[#2e5f7e]">Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG):</p>

      <div className="rounded-2xl border border-[#b8d4e8] bg-white/85 backdrop-blur-md p-6 sm:p-8 space-y-6 text-[#1a3a52] shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-[#1a3a52] font-serif mb-2">Betreiber der Website</h2>
          <p className="leading-relaxed text-[#2e5f7e]">
            <strong className="text-[#1a3a52]">Schnitzelschmiede</strong>
            <br />
            Inhaber: Umar Jabbar
            <br />
            Dohler Str. 269
            <br />
            41238 Mönchengladbach
            <br />
            Deutschland
          </p>
        </div>

        <div>
          <h3 className="text-base font-bold text-[#1a3a52] font-serif mb-2">Kontakt</h3>
          <p className="leading-relaxed text-[#2e5f7e]">
            Telefon:{' '}
            <a href="tel:+4921669786951" className="text-[#1a3a52] hover:underline font-mono font-bold">
              02166 9786951
            </a>
            <br />
            E-Mail:{' '}
            <a
              href="mailto:umarjabbar@yahoo.com?subject=Anfrage%20Schnitzelschmiede"
              className="text-[#1a3a52] hover:underline font-bold"
            >
              umarjabbar@yahoo.com
            </a>
            <br />
            Website:{' '}
            <span className="text-[#1a3a52] font-medium">https://schnitzel-schmiede-mg.de</span>
          </p>
        </div>

        <div>
          <h3 className="text-base font-bold text-[#1a3a52] font-serif mb-2">Öffnungszeiten & Lieferzeiten</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-[#1C1A18] border border-[#312B26]">
              <span className="font-bold text-[#E5B24E] block mb-1">Vor Ort & Abholung:</span>
              <p className="space-y-0.5 text-[#D5CEBF]">
                Montag – Freitag: 16:30 – 21:45 Uhr<br />
                Samstag: 16:00 – 21:45 Uhr<br />
                Sonntag: 12:00 – 21:45 Uhr
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#1C1A18] border border-[#312B26]">
              <span className="font-bold text-[#E5B24E] block mb-1">Lieferzeiten:</span>
              <p className="space-y-0.5 text-[#D5CEBF]">
                Montag – Freitag: 16:00 – 21:45 Uhr<br />
                Samstag: 14:00 – 21:45 Uhr<br />
                Sonntag: 11:30 – 21:45 Uhr
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-base font-bold text-[#FDFBF7] font-serif mb-2">Aufsichtsbehörde</h3>
          <p className="leading-relaxed">
            Ordnungsamt der Stadt Mönchengladbach
            <br />
            Fliethstraße 86–90, 41238 Mönchengladbach
          </p>
        </div>

        <div>
          <h3 className="text-base font-bold text-[#FDFBF7] font-serif mb-2">Streitschlichtung</h3>
          <p className="leading-relaxed">
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
            <a
              href="https://ec.europa.eu/consumers/odr/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E5B24E] hover:underline"
            >
              https://ec.europa.eu/consumers/odr/
            </a>
            . Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </div>

        <div className="pt-4 border-t border-[#312B26]">
          <h4 className="text-xs uppercase tracking-wider text-[#C4BFB5] mb-2 font-bold">
            Offizielle Speisebaron Rechtstexte
          </h4>
          <div className="flex flex-wrap gap-3">
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
              href="https://speisebaron.de/webseite/664f673709580c0011f7c7d7/datenschutz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#23201C] border border-[#312B26] text-xs font-semibold text-[#E5B24E] hover:bg-[#2C2723] transition-colors"
            >
              <span>Speisebaron Datenschutz</span>
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
