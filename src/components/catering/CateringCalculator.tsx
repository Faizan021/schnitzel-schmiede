'use client';

import React, { useState, useMemo } from 'react';
import {
  Users,
  MessageSquare,
  Flame,
  Sparkles,
} from 'lucide-react';
import { getKitchenWhatsAppNumber, generateReferenceId } from '@/lib/utils/whatsapp';
import { useLanguage } from '../providers/LanguageContext';
import confetti from 'canvas-confetti';

interface PackageTier {
  id: string;
  name: string;
  nameEn: string;
  subtitle: string;
  subtitleEn: string;
  pricePerPerson: number;
  description: string;
  descriptionEn: string;
  features: string[];
  featuresEn: string[];
  recommended?: boolean;
}

export function CateringCalculator() {
  const { t, lang } = useLanguage();
  const isEn = lang === 'en';

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
      nameEn: 'Forge Classic Buffet',
      subtitle: 'Der bewährte Party-Hit',
      subtitleEn: 'The proven crowd favorite',
      pricePerPerson: 18.90,
      description: 'Heiß geliefertes Buffet mit professionellen Chafing Dishes (Warmhaltebehältern).',
      descriptionEn: 'Hot delivered buffet equipped with professional stainless chafing dishes.',
      features: [
        'Hähnchen- & Schweineschnitzel in Goldpanade (Regionale Fleischqualitäten)',
        'Schmiede Champignon-Rahmsauce & Paprikasauce',
        'Knusprige Bratkartoffeln mit Zwiebeln & Kartoffelsalat',
        'Rheinischer Gurkensalat & knackiger Marktsalat',
        'Inkl. Vorlegebesteck & Chafing Dishes',
      ],
      featuresEn: [
        'Chicken & pork schnitzels in golden crust (Regional cuts)',
        'Forge mushroom cream sauce & bell pepper sauce',
        'Crispy fried potatoes with onions & potato salad',
        'Rhenish cucumber salad & garden salad',
        'Includes serving cutlery & chafing dishes',
      ],
    },
    {
      id: 'live_cooking',
      name: 'Schmiede Live-Cooking Station',
      nameEn: 'Forge Live-Cooking Station',
      subtitle: 'Der Publikumsmagnet für Ihr Event',
      subtitleEn: 'The ultimate attraction for your event',
      pricePerPerson: 27.50,
      recommended: true,
      description: 'Unsere Köche braten die Schnitzel live vor den Augen Ihrer Gäste in Butterschmalz aus!',
      descriptionEn: 'Our chefs fry fresh schnitzels live in clarified butter right before your guests!',
      features: [
        'Live-Zubereitung vor Ort (inkl. Koch & Gussbräter)',
        'Original Kalbsschnitzel & zartes Hähnchenfilet',
        '4 Saucen-Kreationen inkl. Pfeffer-Cognac & Hollandaise',
        'Süßkartoffel-Fries & Trüffel-Parmesan Topping',
        'Live zubereiteter Schmiede-Kaiserschmarrn als Dessert',
      ],
      featuresEn: [
        'On-site live cooking (chef & cast-iron skillets included)',
        'Original veal schnitzels & tender chicken breast',
        '4 sauce variations incl. Peppercorn-Cognac & Hollandaise',
        'Sweet potato fries & Truffle-Parmesan topping',
        'Live caramelized Kaiserschmarrn pancake dessert',
      ],
    },
    {
      id: 'burger_streetfood',
      name: 'Streetfood & Burger Schmiede',
      nameEn: 'Streetfood & Burger Forge',
      subtitle: 'Locker & modern für Vereine & Geburtstage',
      subtitleEn: 'Casual & modern for birthdays & parties',
      pricePerPerson: 22.90,
      description: 'Interaktive Burger- & Loaded-Fries Station für informelle Feiern.',
      descriptionEn: 'Interactive burger & loaded fries station for informal celebrations.',
      features: [
        'Mini-Schnitzel-Burger im Brioche Bun',
        'Loaded Fries Station mit Pulled Pork & Käsesauce',
        'Veggie Schnitzel-Häppchen mit Kräuterdip',
        'Fingerfood-Spieße & Dips',
        'Unkompliziertes Handling für Stehpartys',
      ],
      featuresEn: [
        'Mini schnitzel sliders in brioche buns',
        'Loaded fries station with pulled pork & warm cheese sauce',
        'Veggie schnitzel bites with fresh herb dip',
        'Fingerfood skewers & gourmet dips',
        'Easy handling for stand-up cocktail receptions',
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

    const refId = generateReferenceId('CAT-MG');
    const message = [
      '🔥 [SCHNITZEL SCHMIEDE MÖNCHENGLADBACH · Dohler Str. 269]',
      '📍 RESTAURANT: Die Schnitzel Schmiede (Dohler Str. 269, 41238 MG)',
      `🎪 *CATERING ANFRAGE #${refId}*`,
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      `Event-Art: ${eventType === 'company' ? 'Firmenfeier' : eventType === 'birthday' ? 'Geburtstag' : 'Vereins-/Sportfeier'}`,
      `Gästeanzahl: *${guests} Personen*`,
      `Gewähltes Paket: *${isEn ? currentPkg.nameEn : currentPkg.name}* (${currentPkg.pricePerPerson.toFixed(2).replace('.', ',')} € p.P.)`,
      `Geschätztes Budget: *ca. ${totalEstimate.toFixed(2).replace('.', ',')} € netto*`,
      `Wunschdatum: ${date || (isEn ? 'Still flexible' : 'Noch flexibel')}`,
      `Veranstaltungsort: ${city}`,
      '',
      '👤 *KONTAKTPERSON:*',
      `Name: ${contactName}`,
      `Telefon: ${phone}`,
      `E-Mail: ${email || (isEn ? 'Not specified' : 'Nicht angegeben')}`,
      notes ? `Notiz: "${notes}"` : '',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      'Bitte um Zusendung eines unverbindlichen Catering-Angebots.',
    ]
      .filter(Boolean)
      .join('\n');

    const kitchenPhone = getKitchenWhatsAppNumber();
    const url = `https://wa.me/${kitchenPhone}?text=${encodeURIComponent(message)}`;
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
        <div className="inline-flex items-center gap-2 rounded-full border border-[#e8d5be] bg-white/80 backdrop-blur-md px-4 py-1.5 text-xs font-bold text-[#16202a] mb-4 shadow-sm">
          <Flame className="h-3.5 w-3.5 text-[#4b3b2f]" />
          <span>{t.catering.tagline}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#16202a] font-serif">
          {t.catering.heading}
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[#4b3b2f]">
          {t.catering.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Calculator Configuration */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-2xl border border-white/95 bg-white/85 p-6 shadow-md shadow-[#16202a]/5 space-y-6 text-[#16202a]">
            {/* Event Type */}
            <div>
              <label className="block text-xs font-bold text-[#4b3b2f] uppercase tracking-wider mb-2">
                {t.catering.eventType}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'company', label: t.catering.company },
                  { id: 'birthday', label: t.catering.birthday },
                  { id: 'club', label: t.catering.club },
                ].map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setEventType(item.id)}
                    className={`rounded-xl py-2.5 px-3 text-xs font-bold border transition-all cursor-pointer ${
                      eventType === item.id
                        ? 'border-[#d99036] bg-[#ffedd5] text-[#16202a] font-black shadow-sm'
                        : 'border-[#e8d5be] bg-[#fffbf5] text-[#4b3b2f]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Guests Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-[#4b3b2f] uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-[#4b3b2f]" />
                  <span>{t.catering.guestSlider}</span>
                </label>
                <span className="font-mono text-xl font-black text-[#16202a]">
                  {guests} {isEn ? 'Guests' : 'Personen'}
                </span>
              </div>
              <input
                type="range"
                min="15"
                max="250"
                step="5"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full accent-[#d99036] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#4b3b2f] mt-1">
                <span>{t.catering.minSize}</span>
                <span>100 {isEn ? 'Guests' : 'Gäste'}</span>
                <span>{t.catering.largeEvent}</span>
              </div>
            </div>

            {/* Package Selection */}
            <div>
              <label className="block text-xs font-bold text-[#4b3b2f] uppercase tracking-wider mb-3">
                {t.catering.packageHeading}
              </label>
              <div className="space-y-3">
                {packages.map((pkg) => {
                  const isSelected = selectedTier === pkg.id;
                  const name = isEn ? pkg.nameEn : pkg.name;
                  const subtitle = isEn ? pkg.subtitleEn : pkg.subtitle;
                  const desc = isEn ? pkg.descriptionEn : pkg.description;
                  const features = isEn ? pkg.featuresEn : pkg.features;

                  return (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedTier(pkg.id)}
                      className={`cursor-pointer rounded-xl border p-4 sm:p-5 transition-all relative ${
                        isSelected
                          ? 'border-2 border-[#16202a] bg-[#ffedd5]/70 shadow-md'
                          : 'border-[#e8d5be] bg-[#fffbf5] hover:border-[#d99036]'
                      }`}
                    >
                      {/* Bestseller Badge - Elevated on upper card border to eliminate overlap */}
                      {pkg.recommended && (
                        <span className="absolute -top-2.5 right-4 rounded-full bg-[#16202a] text-white px-3 py-0.5 text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1 border border-white">
                          <Sparkles className="h-3 w-3 text-[#ffecd2]" />
                          <span>{t.catering.bestseller}</span>
                        </span>
                      )}
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="text-sm sm:text-base font-bold text-[#16202a]">{name}</h4>
                          <p className="text-xs text-[#163044] font-semibold mt-0.5">{subtitle}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="font-mono text-base sm:text-lg font-black text-[#16202a]">
                            {pkg.pricePerPerson.toFixed(2).replace('.', ',')} €{' '}
                            <span className="text-[11px] text-[#163044] font-medium">{t.catering.perPerson}</span>
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-[#163044] leading-relaxed mt-2">{desc}</p>
                      <ul className="mt-3 space-y-1.5 text-xs text-[#163044]">
                        {features.map((f, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <span className="text-[#16202a] font-black">✓</span>
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
          <div className="rounded-2xl border border-[#e8d5be] bg-white/90 backdrop-blur-md p-6 shadow-xl text-[#16202a]">
            <span className="text-[11px] font-bold text-[#4b3b2f] uppercase tracking-widest">
              {t.catering.liveEstimate}
            </span>
            <div className="mt-2 flex items-baseline justify-between border-b border-[#e8d5be]/60 pb-4">
              <div>
                <span className="text-2xl sm:text-3xl font-black font-mono text-[#16202a]">
                  ca. {totalEstimate.toFixed(2).replace('.', ',')} €
                </span>
                <span className="block text-[11px] text-[#4b3b2f]">
                  ({guests} x {currentPkg.pricePerPerson.toFixed(2).replace('.', ',')} € {isEn ? 'plus VAT' : 'zzgl. ges. MwSt.'})
                </span>
              </div>
            </div>

            <form onSubmit={handleInquiry} className="mt-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#16202a]">
                {t.catering.inquiryHeading}
              </h4>

              <div>
                <input
                  type="text"
                  required
                  placeholder={t.catering.nameCompany}
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full rounded-xl bg-[#fffbf5] border border-[#e8d5be] px-3 py-2 text-xs text-[#16202a] focus:border-[#d99036] focus:outline-none"
                />
              </div>

              <div>
                <input
                  type="tel"
                  required
                  placeholder={t.catering.phone}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl bg-[#fffbf5] border border-[#e8d5be] px-3 py-2 text-xs text-[#16202a] focus:border-[#d99036] focus:outline-none"
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder={isEn ? "Email Address (optional)" : "E-Mail-Adresse (optional)"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl bg-[#fffbf5] border border-[#e8d5be] px-3 py-2 text-xs text-[#16202a] focus:border-[#d99036] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  placeholder={t.catering.date}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-xl bg-[#fffbf5] border border-[#e8d5be] px-3 py-2 text-xs text-[#16202a] focus:border-[#d99036] focus:outline-none"
                />
                <input
                  type="text"
                  placeholder={t.catering.city}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full rounded-xl bg-[#fffbf5] border border-[#e8d5be] px-3 py-2 text-xs text-[#16202a] focus:border-[#d99036] focus:outline-none"
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder={t.catering.wishes}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full rounded-xl bg-[#fffbf5] border border-[#e8d5be] px-3 py-2 text-xs text-[#16202a] focus:border-[#d99036] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] py-4 text-xs font-black text-white hover:brightness-105 shadow-md shadow-[#25D366]/20 transition-all cursor-pointer active:scale-98"
              >
                <MessageSquare className="h-4 w-4 fill-current" />
                <span>{t.catering.inquiryWhatsappBtn} · 0176 70341602</span>
              </button>

              {isSent && (
                <div className="rounded-lg bg-emerald-50 border border-emerald-300 p-2 text-center text-xs text-emerald-800 font-bold">
                  {t.catering.openedNotice}
                </div>
              )}

              <p className="text-[11px] text-center text-[#163044] font-semibold">
                {isEn ? 'Direct Line to Owner Umar Jabbar (+49 176 70341602) · Reply in < 30 Min' : 'Direkter Draht zu Inhaber Umar Jabbar (0176 70341602) · Antwort in < 30 Min'}
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
