'use client';

import React, { useState, useMemo } from 'react';
import {
  Users,
  MessageSquare,
  Flame,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PackageTier {
  id: string;
  name: string;
  subtitle: string;
  pricePerPerson: number;
  description: string;
  features: string[];
  recommended?: boolean;
}

export function CateringCalculator() {
  const [guests, setGuests] = useState(30);
  const [selectedTier, setSelectedTier] = useState('classic');
  const [eventType, setEventType] = useState('company');
  const [date, setDate] = useState('');
  const [city, setCity] = useState('Mönchengladbach');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [isSent, setIsSent] = useState(false);

  const packages: PackageTier[] = [
    {
      id: 'classic',
      name: 'Schmiede-Klassik Buffet',
      subtitle: 'Der bewährte Party-Hit',
      pricePerPerson: 18.90,
      description: 'Heiß geliefertes Buffet mit professionellen Chafing Dishes (Warmhaltebehältern).',
      features: [
        'Hähnchen- & Schweineschnitzel in Goldpanade (100% Halal Option)',
        'Schmiede Champignon-Rahmsauce & Paprikasauce',
        'Knusprige Bratkartoffeln mit Zwiebeln & Kartoffelsalat',
        'Rheinischer Gurkensalat & knackiger Marktsalat',
        'Inkl. Vorlegebesteck & Chafing Dishes',
      ],
    },
    {
      id: 'live_cooking',
      name: 'Schmiede Live-Cooking Station',
      subtitle: 'Der Publikumsmagnet für Ihr Event',
      pricePerPerson: 27.50,
      recommended: true,
      description: 'Unsere Köche braten die Schnitzel live vor den Augen Ihrer Gäste in Butterschmalz aus!',
      features: [
        'Live-Zubereitung vor Ort (inkl. Koch & Gussbräter)',
        'Original Kalbsschnitzel & zartes Hähnchenfilet',
        '4 Saucen-Kreationen inkl. Pfeffer-Cognac & Hollandaise',
        'Süßkartoffel-Fries & Trüffel-Parmesan Topping',
        'Live zubereiteter Schmiede-Kaiserschmarrn als Dessert',
      ],
    },
    {
      id: 'burger_streetfood',
      name: 'Streetfood & Burger Schmiede',
      subtitle: 'Locker & modern für Vereine & Geburtstage',
      pricePerPerson: 22.90,
      description: 'Interaktive Burger- & Loaded-Fries Station für informelle Feiern.',
      features: [
        'Mini-Schnitzel-Burger im Brioche Bun',
        'Loaded Fries Station mit Pulled Pork & Käsesauce',
        'Veggie Schnitzel-Häppchen mit Kräuterdip',
        'Fingerfood-Spieße & Dips',
        'Unkompliziertes Handling für Stehpartys',
      ],
    },
  ];

  const currentPkg = packages.find((p) => p.id === selectedTier) || packages[0];
  const currentPrice = currentPkg.pricePerPerson;

  const totalEstimate = useMemo(() => {
    return Math.round(guests * currentPrice * 100) / 100;
  }, [guests, currentPrice]);

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !phone) return;

    const message = [
      '🎉 *CATERING ANFRAGE | SCHNITZEL SCHMIEDE MG*',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      `Event-Art: ${eventType === 'company' ? 'Firmenfeier' : eventType === 'birthday' ? 'Geburtstag' : 'Vereins-/Sportfeier'}`,
      `Gästeanzahl: *${guests} Personen*`,
      `Gewähltes Paket: *${currentPkg.name}* (${currentPkg.pricePerPerson.toFixed(2).replace('.', ',')} € p.P.)`,
      `Geschätztes Budget: *ca. ${totalEstimate.toFixed(2).replace('.', ',')} € netto*`,
      `Wunschdatum: ${date || 'Noch flexibel'}`,
      `Veranstaltungsort: ${city}`,
      '',
      '👤 *KONTAKTPERSON:*',
      `Name: ${contactName}`,
      `Telefon: ${phone}`,
      `E-Mail: ${email || 'Nicht angegeben'}`,
      notes ? `Notiz: "${notes}"` : '',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      'Bitte um Zusendung eines unverbindlichen Catering-Angebots.',
    ]
      .filter(Boolean)
      .join('\n');

    const url = `https://wa.me/4917612345678?text=${encodeURIComponent(message)}`;
    setIsSent(true);

    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#E6B84A', '#FFFFFF'],
      });
    } catch {
      // Ignore
    }

    window.open(url, '_blank');
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#E6B84A]/30 bg-[#E6B84A]/10 px-4 py-1.5 text-xs font-bold text-[#E6B84A] mb-4">
          <Flame className="h-3.5 w-3.5" />
          <span>Mönchengladbach · Krefeld · Neuss · Viersen</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#FDFBF7]">
          Catering & Live-Cooking Event-Rechner
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[#C4BFB5]">
          Ob Firmenjubiläum, Geburtstag oder Borussia-Vereinsfeier: Berechnen Sie Ihr Wunsch-Catering
          in Echtzeit und erhalten Sie sofort ein verbindliches Schmiede-Angebot.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Calculator Configuration */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-2xl border border-white/10 bg-[#121216] p-6 shadow-xl space-y-6">
            {/* Event Type */}
            <div>
              <label className="block text-xs font-bold text-[#C4BFB5] uppercase tracking-wider mb-2">
                1. Art der Veranstaltung
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'company', label: 'Firmenfeier' },
                  { id: 'birthday', label: 'Geburtstag' },
                  { id: 'club', label: 'Verein / Sport' },
                ].map((t) => (
                  <button
                    type="button"
                    key={t.id}
                    onClick={() => setEventType(t.id)}
                    className={`rounded-xl py-2.5 px-3 text-xs font-bold border transition-all ${
                      eventType === t.id
                        ? 'border-[#E6B84A] bg-[#E6B84A]/10 text-[#FDFBF7]'
                        : 'border-white/5 bg-[#181820] text-[#C4BFB5]'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Guests Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-[#C4BFB5] uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-[#E6B84A]" />
                  <span>2. Gästeanzahl planen</span>
                </label>
                <span className="font-mono text-xl font-black text-[#E6B84A]">
                  {guests} Personen
                </span>
              </div>
              <input
                type="range"
                min="15"
                max="250"
                step="5"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full accent-[#E6B84A] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#C4BFB5] mt-1">
                <span>15 Gäste (Mindestgröße)</span>
                <span>100 Gäste</span>
                <span>250+ Gäste (Großevent)</span>
              </div>
            </div>

            {/* Package Selection */}
            <div>
              <label className="block text-xs font-bold text-[#C4BFB5] uppercase tracking-wider mb-3">
                3. Catering-Paket wählen
              </label>
              <div className="space-y-3">
                {packages.map((pkg) => {
                  const isSelected = selectedTier === pkg.id;
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedTier(pkg.id)}
                      className={`cursor-pointer rounded-xl border p-4 transition-all relative ${
                        isSelected
                          ? 'border-[#E6B84A] bg-[#E6B84A]/10 shadow-md shadow-[#E6B84A]/10'
                          : 'border-white/5 bg-[#181820] hover:border-white/20'
                      }`}
                    >
                      {pkg.recommended && (
                        <span className="absolute top-3 right-3 rounded-md bg-[#E6B84A] px-2 py-0.5 text-[10px] font-black text-[#0A0A0C] uppercase">
                          Bestseller
                        </span>
                      )}
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-sm font-bold text-[#FDFBF7]">{pkg.name}</h4>
                          <p className="text-xs text-[#E6B84A]">{pkg.subtitle}</p>
                        </div>
                        <span className="font-mono text-base font-bold text-[#FDFBF7]">
                          {pkg.pricePerPerson.toFixed(2).replace('.', ',')} €{' '}
                          <span className="text-[10px] text-[#C4BFB5] font-normal">p.P.</span>
                        </span>
                      </div>
                      <p className="text-xs text-[#C4BFB5] mt-2">{pkg.description}</p>
                      <ul className="mt-3 space-y-1 text-xs text-[#C4BFB5]">
                        {pkg.features.map((f, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <span className="text-[#E6B84A] font-bold">✓</span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Instant Live Estimate & Inquiry Form */}
        <div className="lg:col-span-5 sticky top-24 space-y-4">
          <div className="rounded-2xl border border-[#E6B84A]/30 bg-[#141418] p-6 shadow-2xl">
            <span className="text-[11px] font-bold text-[#E6B84A] uppercase tracking-widest">
              Live-Kostenschätzung
            </span>
            <div className="mt-2 flex items-baseline justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-2xl sm:text-3xl font-black font-mono text-[#FDFBF7]">
                  ca. {totalEstimate.toFixed(2).replace('.', ',')} €
                </span>
                <span className="block text-[11px] text-[#C4BFB5]">
                  ({guests} x {currentPkg.pricePerPerson.toFixed(2).replace('.', ',')} € zzgl. ges. MwSt.)
                </span>
              </div>
            </div>

            <form onSubmit={handleInquiry} className="mt-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#FDFBF7]">
                Unverbindliches Angebot per WhatsApp anfordern
              </h4>

              <div>
                <input
                  type="text"
                  required
                  placeholder="Ihr Name / Firma *"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full rounded-xl bg-[#1E1E26] border border-white/10 px-3 py-2 text-xs text-[#FDFBF7] focus:border-[#E6B84A] focus:outline-none"
                />
              </div>

              <div>
                <input
                  type="tel"
                  required
                  placeholder="Telefonnummer *"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl bg-[#1E1E26] border border-white/10 px-3 py-2 text-xs text-[#FDFBF7] focus:border-[#E6B84A] focus:outline-none"
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="E-Mail-Adresse (optional)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl bg-[#1E1E26] border border-white/10 px-3 py-2 text-xs text-[#FDFBF7] focus:border-[#E6B84A] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  placeholder="Wunschdatum"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-xl bg-[#1E1E26] border border-white/10 px-3 py-2 text-xs text-[#FDFBF7] focus:border-[#E6B84A] focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Ort (z.B. MG-Nord)"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full rounded-xl bg-[#1E1E26] border border-white/10 px-3 py-2 text-xs text-[#FDFBF7] focus:border-[#E6B84A] focus:outline-none"
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Zusätzliche Wünsche (z.B. Besteck, Servicekraft)"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full rounded-xl bg-[#1E1E26] border border-white/10 px-3 py-2 text-xs text-[#FDFBF7] focus:border-[#E6B84A] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] py-3.5 text-xs font-black text-white hover:brightness-110 shadow-lg shadow-[#25D366]/20 transition-all cursor-pointer"
              >
                <MessageSquare className="h-4 w-4 fill-current" />
                <span>Angebot via WhatsApp anfragen (1-Klick)</span>
              </button>

              {isSent && (
                <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-2 text-center text-xs text-emerald-300">
                  ✓ WhatsApp wurde geöffnet! Wir melden uns innerhalb von 2 Stunden.
                </div>
              )}

              <p className="text-[10px] text-center text-[#C4BFB5]/80">
                Kostenlose & unverbindliche Angebotserstellung innerhalb von 2 Stunden.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
