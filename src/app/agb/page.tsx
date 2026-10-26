import React from 'react';
import Link from 'next/link';
import { ExternalLink, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Allgemeine Geschäftsbedingungen (AGB) | Schnitzelschmiede Mönchengladbach',
  description: 'Allgemeine Geschäftsbedingungen für Bestellungen, Lieferungen und Catering der Schnitzelschmiede.',
};

export default function AgbPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 text-xs sm:text-sm text-[#2e5f7e] space-y-6">
      <div className="flex items-center gap-2 text-[#1a3a52]">
        <ShieldCheck className="h-5 w-5" />
        <span className="text-xs uppercase tracking-widest font-bold">Transparenz & Vertrauen</span>
      </div>
      <h1 className="text-2xl sm:text-4xl font-extrabold text-[#1a3a52] font-serif">
        Allgemeine Geschäftsbedingungen (AGB)
      </h1>
      <p className="text-[#2e5f7e]">
        Schnitzelschmiede Mönchengladbach · Dohler Str. 269, 41238 Mönchengladbach
      </p>

      <div className="rounded-2xl border border-[#b8d4e8] bg-white/85 backdrop-blur-md p-6 sm:p-8 space-y-6 text-[#1a3a52] shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-[#1a3a52] font-serif mb-2">1. Geltungsbereich</h2>
          <p className="leading-relaxed text-[#2e5f7e]">
            Diese Allgemeinen Geschäftsbedingungen gelten für alle Bestellungen, Lieferungen,
            Abholungen und Catering-Vereinbarungen, die Kunden bei der <strong className="text-[#1a3a52]">Schnitzelschmiede</strong> (Dohler Str. 269, 41238 Mönchengladbach)
            über unsere Online-Systeme, telefonisch oder vor Ort aufgeben.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-[#FDFBF7] font-serif mb-2">2. Vertragsschluss & Bestellung</h2>
          <p className="leading-relaxed">
            Die Präsentation unserer Gerichte auf der Website stellt kein rechtlich bindendes Angebot dar,
            sondern eine unverbindliche Aufforderung zur Bestellung. Durch das Absenden einer Bestellung
            (telefonisch, per digitalem System oder vor Ort) gibt der Kunde ein verbindliches Kaufangebot ab.
            Der Vertrag kommt mit der Bestätigung der Bestellung durch die Schnitzelschmiede zustande.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-[#FDFBF7] font-serif mb-2">3. Preise & Zahlung</h2>
          <p className="leading-relaxed">
            Alle angegebenen Preise verstehen sich in Euro inklusive der jeweils geltenden gesetzlichen Mehrwertsteuer.
            Zahlungen können bar bei Lieferung/Abholung, per EC-Karte oder über die im Bestellsystem bereitgestellten
            Zahlungsarten erfolgen.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-[#FDFBF7] font-serif mb-2">4. Lieferung & Liefergebiete</h2>
          <p className="leading-relaxed">
            Lieferungen erfolgen innerhalb unseres definierten Liefergebietes in Mönchengladbach und angrenzenden PLZ-Zonen
            zu den angegebenen Lieferzeiten (Mo–Fr 16:00–21:45 Uhr, Sa 14:00–21:45 Uhr, So 11:30–21:45 Uhr).
            Die Lieferzeiten sind Richtwerte und können wetter- oder verkehrsbedingt variieren.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-[#FDFBF7] font-serif mb-2">5. Catering & Partyservice</h2>
          <p className="leading-relaxed">
            Für Catering-Aufträge (u. a. Schnitzelparty 10er, 20er, 40er sowie Buffets) gelten gesonderte Vereinbarungen
            hinsichtlich Vorbestellfristen und Stornierungsbedingungen, die im Angebot individuell festgelegt werden.
          </p>
        </div>

        <div className="pt-4 border-t border-[#312B26]">
          <h3 className="text-base font-bold text-[#FDFBF7] mb-2">Rechtlicher Hinweis</h3>
          <p className="leading-relaxed mb-4">
            Sie können die vollständigen, offiziellen Rechtstexte auch direkt im Speisebaron-Portal einsehen:
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://speisebaron.de/webseite/664f673709580c0011f7c7d7/agb"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#23201C] border border-[#312B26] text-xs font-semibold text-[#E5B24E] hover:bg-[#2C2723] transition-colors"
            >
              <span>Speisebaron AGB Portal</span>
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
              href="https://speisebaron.de/webseite/664f673709580c0011f7c7d7/datenschutz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#23201C] border border-[#312B26] text-xs font-semibold text-[#E5B24E] hover:bg-[#2C2723] transition-colors"
            >
              <span>Speisebaron Datenschutz</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
