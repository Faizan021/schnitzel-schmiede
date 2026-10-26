export type Language = 'de' | 'en';

export interface Translations {
  // Navigation
  nav: {
    menu: string;
    configurator: string;
    reservation: string;
    catering: string;
    bookTable: string;
    cart: string;
    positions: string;
    callUs: string;
  };
  // Kitchen status
  kitchen: {
    openLunch: string;
    openDinner: string;
    openWeekend: string;
    breakTime: string;
    closed: string;
    mondayRest: string;
    reopenTuesday: string;
    speedPrep: string;
    hotKitchen: string;
    allDayCooking: string;
    preordersWelcome: string;
    preordersAccepted: string;
  };
  // Hero
  hero: {
    tagline: string;
    titleStart: string;
    titleHighlight: string;
    description: string;
    orderCta: string;
    customizerCta: string;
    reserveCta: string;
    ratingGoogle: string;
    regionalBadge: string;
    pickupBadge: string;
    sauceBadge: string;
    audioLabel: string;
    crunchSensorTitle: string;
    crunchButtonDefault: string;
    crunchButtonDone: string;
    crunchSubtitle: string;
    crunchGuarantee: string;
    inButter: string;
    specialty: string;
  };
  // Marquee
  marquee: {
    inButter: string;
    regional: string;
    saucesSeparate: string;
    manufaktur: string;
    whatsappOrder: string;
    pickupDiscount: string;
  };
  // Bento Grid
  bento: {
    tagline: string;
    heading: string;
    subtitle: string;
    stationTitle: string;
    stationSubtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
    handcraftedTag: string;
    crunchTitle: string;
    crunchDesc: string;
    crunchPlay: string;
    guaranteeTitle: string;
    guaranteeDesc: string;
    sauceGlass: string;
    breathableBox: string;
    dipAtHome: string;
    quote: string;
    radarTag: string;
    radarHeading: string;
    radarDesc: string;
    speedAvg: string;
    speedMinutes: string;
    speedDesc: string;
    pickupTag: string;
    pickupDiscount: string;
    pickupDesc: string;
    zonesTag: string;
    zonesCount: string;
    zonesMin: string;
    askWhatsapp: string;
  };
  // Sauce tasting
  sauce: {
    tagline: string;
    heading: string;
    subtitle: string;
    flavorProfile: string;
    packedSeparately: string;
    creaminess: string;
    heat: string;
    depth: string;
    perfectPair: string;
  };
  // Menu Section
  menu: {
    featuredTag: string;
    popularTitle: string;
    openAll: string;
    searchPlaceholder: string;
    clearSearch: string;
    allDishes: string;
    catClassics: string;
    catSpecials: string;
    catBurgers: string;
    catFries: string;
    catKids: string;
    catDesserts: string;
    catDrinks: string;
    filterAll: string;
    filterRegional: string;
    filterVeggie: string;
    filterBestseller: string;
    filterChef: string;
    noDishesFound: string;
    noDishesDesc: string;
    resetFilters: string;
    configureBtn: string;
    addToCartBtn: string;
    addedBtn: string;
    allergensLabel: string;
    viewAllergens: string;
    none: string;
  };
  // Customizer / Baukasten
  customizer: {
    tagline: string;
    heading: string;
    subtitle: string;
    step1: string;
    step2: string;
    step3: string;
    step4: string;
    meatHeading: string;
    meatSub: string;
    sizeHeading: string;
    sizeSub: string;
    crustHeading: string;
    crustSub: string;
    sauceHeading: string;
    sauceSub: string;
    sauceToggleTitle: string;
    sauceToggleDesc: string;
    sidesHeading: string;
    extrasHeading: string;
    extrasSub: string;
    notesLabel: string;
    notesPlaceholder: string;
    backBtn: string;
    nextBtn: string;
    addCustomBtn: string;
    liveConfigTitle: string;
    liveConfigHeading: string;
    baseLabel: string;
    sizeLabel: string;
    crustLabel: string;
    sauceLabel: string;
    sidesLabel: string;
    extrasLabel: string;
    priceIncVat: string;
    included: string;
    standardPortion: string;
    separateNotice: string;
  };
  // Cart & Checkout
  cart: {
    title: string;
    positions: string;
    emptyTitle: string;
    emptyDesc: string;
    exploreMenu: string;
    pickupTab: string;
    pickupDiscountBadge: string;
    deliveryTab: string;
    deliveryArea: string;
    belowMinOrder: string;
    missingAmount: string;
    tabPositions: string;
    tabCheckout: string;
    tipLabel: string;
    tipCustom: string;
    noneTip: string;
    contactHeading: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    streetLabel: string;
    houseNumberLabel: string;
    floorNotesLabel: string;
    floorNotesPlaceholder: string;
    preferredTimeLabel: string;
    paymentHeading: string;
    kitchenNoteLabel: string;
    kitchenNotePlaceholder: string;
    privacyConsent: string;
    subtotal: string;
    pickupDiscount: string;
    deliveryFee: string;
    freeDelivery: string;
    tip: string;
    totalAmount: string;
    taxFood: string;
    taxDrinks: string;
    dispatchWhatsappBtn: string;
    whatsappOpenedNotice: string;
  };
  // Reservation
  reservation: {
    tagline: string;
    heading: string;
    subtitle: string;
    successTag: string;
    successHeading: string;
    bookingNumber: string;
    guest: string;
    dateTime: string;
    partySize: string;
    seatingArea: string;
    indoor: string;
    terrace: string;
    location: string;
    saveCalendar: string;
    anotherBooking: string;
    capacityNotice: string;
    dateLabel: string;
    mondayError: string;
    guestsLabel: string;
    timeLabel: string;
    seatsLeft: string;
    fullSlot: string;
    areaLabel: string;
    personalHeading: string;
    nameLabel: string;
    phoneLabel: string;
    emailLabel: string;
    requestsLabel: string;
    requestsPlaceholder: string;
    submitBtn: string;
  };
  // Catering
  catering: {
    tagline: string;
    heading: string;
    subtitle: string;
    eventType: string;
    company: string;
    birthday: string;
    club: string;
    guestSlider: string;
    minSize: string;
    largeEvent: string;
    packageHeading: string;
    bestseller: string;
    perPerson: string;
    liveEstimate: string;
    inquiryHeading: string;
    nameCompany: string;
    phone: string;
    date: string;
    city: string;
    wishes: string;
    inquiryWhatsappBtn: string;
    replyGuarantee: string;
    openedNotice: string;
  };
  // Footer & Tech
  footer: {
    craftDescription: string;
    regionalTag: string;
    butterTag: string;
    openingHours: string;
    mondayRest: string;
    weekendAllDay: string;
    locationContact: string;
    legalTransparency: string;
    menuLink: string;
    reserveLink: string;
    cateringLink: string;
    imprintLink: string;
    privacyLink: string;
    allRightsReserved: string;
    pricesVatNotice: string;
    platformTechBy: string;
    partnerNetwork: string;
    zeroCommission: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  de: {
    nav: {
      menu: 'Speisekarte',
      configurator: 'Schnitzel-Baukasten',
      reservation: 'Tisch reservieren',
      catering: 'Catering & Feiern',
      bookTable: 'Tisch buchen',
      cart: 'Warenkorb',
      positions: 'Positionen',
      callUs: 'anrufen',
    },
    kitchen: {
      openLunch: 'Jetzt geöffnet (Mittagstisch)',
      openDinner: 'Jetzt geöffnet (Abend-Service)',
      openWeekend: 'Jetzt geöffnet (Wochenend-Küche)',
      breakTime: 'Mittagspause',
      closed: 'Geschlossen',
      mondayRest: 'Mo–Fr ab 16:30 Uhr geöffnet',
      reopenTuesday: 'Dienstag 12:00 Uhr',
      speedPrep: 'Mittags geöffnet bis 14:30 Uhr · Schnelle Zubereitung',
      hotKitchen: 'Küche heiß bis 22:00 Uhr · Abholung & Lieferung aktiv',
      allDayCooking: 'Durchgehend warme Küche bis 22:00 Uhr · Tischreservierung empfohlen',
      preordersWelcome: 'Abends wieder geöffnet ab 17:00 Uhr. Vorbestellungen jederzeit möglich!',
      preordersAccepted: 'Wieder geöffnet ab 12:00 Uhr. Vorbestellungen gerne entgegengenommen!',
    },
    hero: {
      tagline: 'Die Manufaktur für echtes Schnitzel · Mönchengladbach',
      titleStart: 'DIE KUNST DES ',
      titleHighlight: 'CRUNCH.',
      description:
        'Jedes Schnitzel wird erst auf Bestellung frisch von Hand geklopft, in reinem Butterschmalz souffliert und mit der patenten Knusper-Garantie geliefert – Saucen reisen stets separat im versiegelten Glas.',
      orderCta: 'Speisekarte & Bestellen',
      customizerCta: 'Schnitzel-Baukasten',
      reserveCta: 'Tisch buchen',
      ratingGoogle: '4.9 / 5.0 Google Reviews',
      regionalBadge: 'Regionale Fleischqualität',
      pickupBadge: '10% Abholer-Rabatt',
      sauceBadge: 'Saucen separat verpackt',
      audioLabel: 'Crunch-Audio',
      crunchSensorTitle: 'Akustik-Sensor',
      crunchButtonDefault: 'Hier klicken für Crunch-Test 🔊',
      crunchButtonDone: 'Geknuspert',
      crunchSubtitle: 'Synthetischer Sound via Web Audio API',
      crunchGuarantee: 'Knusper-Garantie',
      inButter: 'Frisch in Butterschmalz',
      specialty: 'Schmiede-Spezialität',
    },
    marquee: {
      inButter: 'In reinem Butterschmalz souffliert',
      regional: 'Regionales Fleisch & Echtes Kalb',
      saucesSeparate: 'Saucen stets separat verpackt',
      manufaktur: 'Mönchengladbachs Schnitzel-Manufaktur',
      whatsappOrder: '1-Klick WhatsApp Blitz-Bestellung',
      pickupDiscount: '10% Rabatt bei Selbstabholung',
    },
    bento: {
      tagline: '2026 Craft Gastronomy Bento',
      heading: 'Das Geheimnis der Schmiede',
      subtitle:
        'Vier Säulen, die jedes Schmiede-Schnitzel zu einem unvergleichlichen Geschmackserlebnis machen.',
      stationTitle: 'Die Mönchengladbacher Panierstraße',
      stationSubtitle: 'Klicken Sie auf die Stationen, um das Geheimnis unserer soufflierten Kruste zu entdecken.',
      step1Title: 'Handgeklopft',
      step1Desc: 'Saftiges Fleisch wird hauchdünn mit dem Plattiereisen geklopft.',
      step2Title: 'Mehl & Land-Ei',
      step2Desc: 'Feinstes Weizenmehl und frische Eier für die perfekte Bindung.',
      step3Title: 'Knusper-Panade',
      step3Desc: 'Klassische Semmelbrösel, Panko-Flocken oder bayerische Brezelkruste.',
      step4Title: 'Butterschmalz-Pfanne',
      step4Desc: 'Schwimmend bei 175°C wellenförmig souffliert – goldgelb und federleicht.',
      handcraftedTag: 'Handwerk statt Fließband-TK',
      crunchTitle: 'Der Crunch-Faktor',
      crunchDesc: 'Akustisch verifizierte Knusprigkeit bei jedem Biss.',
      crunchPlay: 'Akustik-Test abspielen 🔊',
      guaranteeTitle: 'Knusper-Garantie',
      guaranteeDesc: 'Warum unsere Schnitzel niemals matschig bei Ihnen ankommen.',
      sauceGlass: 'Saucen reisen im separaten Glas',
      breathableBox: 'Dampfdurchlässige Kartonagen',
      dipAtHome: 'Erst vor Ort dippen oder übergießen',
      quote: '„Das einzige Schnitzel in Mönchengladbach, das nach 20 Minuten Fahrt noch kracht.“',
      radarTag: 'Lokal verwurzelt',
      radarHeading: 'Von Dohler Straße direkt auf Ihren Tisch',
      radarDesc:
        'Zentral in Mönchengladbach gelegen beliefern wir die Stadtteile Mitte, Rheydt, Odenkirchen, Lürrip, Windberg sowie Teile von Korschenbroich in kürzester Zeit.',
      speedAvg: 'Durchschnittliche Zeit',
      speedMinutes: '32 Minuten',
      speedDesc: 'Lieferung heiß & kross',
      pickupTag: 'Selbstabholung',
      pickupDiscount: '-10% Rabatt',
      pickupDesc: 'Direkt an der Theke',
      zonesTag: 'Liefergebiet',
      zonesCount: '9 PLZ-Zonen',
      zonesMin: 'Ab 15 € Mindestbestellwert',
      askWhatsapp: 'Frage stellen via WhatsApp →',
    },
    sauce: {
      tagline: 'Interaktive Saucen-Manufaktur',
      heading: 'Entdecken Sie Ihr Saucen-Match',
      subtitle:
        'Jede Sauce wird in unserer Küche frisch eingekocht und für den Transport separat im Becher versiegelt.',
      flavorProfile: 'Geschmacksprofil',
      packedSeparately: 'Separat verpackt',
      creaminess: 'Cremigkeit',
      heat: 'Schärfe / Pikanz',
      depth: 'Geschmackstiefe',
      perfectPair: 'Perfekt kombiniert mit:',
    },
    menu: {
      featuredTag: 'Aus unserer Schmiede-Küche',
      popularTitle: 'Die beliebtesten Kreationen',
      openAll: 'Gesamte Speisekarte öffnen',
      searchPlaceholder: 'Gericht suchen (z.B. Jäger, Kalb, Panko)...',
      clearSearch: '✕',
      allDishes: 'Alle Gerichte',
      catClassics: 'Klassiker',
      catSpecials: 'Schmiede Specials',
      catBurgers: 'Burger & Sandwiches',
      catFries: 'Loaded Fries',
      catKids: 'Schmiede Zwerge',
      catDesserts: 'Desserts',
      catDrinks: 'Getränke',
      filterAll: 'Alle',
      filterRegional: 'Regionales Fleisch',
      filterVeggie: 'Vegetarisch',
      filterBestseller: 'Bestseller',
      filterChef: 'Schmiede-Tipp',
      noDishesFound: 'Keine Gerichte gefunden',
      noDishesDesc: 'Probieren Sie einen anderen Suchbegriff oder setzen Sie die Filter zurück.',
      resetFilters: 'Filter zurücksetzen',
      configureBtn: 'Baukasten',
      addToCartBtn: 'In den Korb',
      addedBtn: 'Hinzugefügt!',
      allergensLabel: 'Allergene:',
      viewAllergens: '(Ansehen)',
      none: 'Keine',
    },
    customizer: {
      tagline: 'LIVE FORGE // SCHRITT-FÜR-SCHRITT',
      heading: 'Schmiede-Konfigurator',
      subtitle:
        'Definiere Legierung, Krustenstruktur & Schmelzpunkt deines Meisterstücks nach traditioneller Handwerksart. 100% Butterschmalz.',
      step1: '1. Fleisch',
      step2: '2. Panade',
      step3: '3. Sauce',
      step4: '4. Beilagen',
      meatHeading: '1. Wählen Sie Ihre Fleischart',
      meatSub: 'Frisch aus regionaler Schlachtung',
      sizeHeading: 'Größe & Einwaage',
      sizeSub: 'Frischfleisch-Einwaage',
      crustHeading: '2. Wählen Sie Ihre Knusper-Panade',
      crustSub: 'Souffliert in reinem Butterschmalz',
      sauceHeading: '3. Hausgemachte Schmiede-Sauce',
      sauceSub: 'Täglich frisch eingekocht',
      sauceToggleTitle: 'Knusper-Garantie: Sauce separat verpacken',
      sauceToggleDesc: 'Verhindert matschige Panade beim Transport und zu Hause.',
      sidesHeading: '4. Wählen Sie Ihre Hauptbeilage',
      extrasHeading: 'Gourmet-Extras & Toppings',
      extrasSub: 'Mehrfachauswahl möglich',
      notesLabel: 'Besondere Zubereitungswünsche an die Schmiede (optional)',
      notesPlaceholder: 'z.B. Zitrone extra dick schneiden, Sauce sehr heiß',
      backBtn: '← Zurück',
      nextBtn: 'Weiter zu Schritt',
      addCustomBtn: 'In den Warenkorb',
      liveConfigTitle: 'Live Konfiguration',
      liveConfigHeading: 'Ihr Schmiede-Unikat',
      baseLabel: 'Basis:',
      sizeLabel: 'Portion:',
      crustLabel: 'Kruste:',
      sauceLabel: 'Sauce:',
      sidesLabel: 'Beilage:',
      extrasLabel: 'Extras:',
      priceIncVat: 'Preis inkl. MwSt.:',
      included: 'Im Basispreis enthalten',
      standardPortion: 'Standard-Portion',
      separateNotice: 'separat verpackt',
    },
    cart: {
      title: 'Ihr Schmiede-Warenkorb',
      positions: 'Positionen · Frische Zubereitung',
      emptyTitle: 'Ihr Warenkorb ist noch leer',
      emptyDesc: 'Entdecken Sie unsere legendären Schnitzel-Kreationen oder konfigurieren Sie Ihr Wunsch-Schnitzel nach Maß.',
      exploreMenu: 'Zur Speisekarte',
      pickupTab: 'Selbstabholung',
      pickupDiscountBadge: '-10% Rabatt',
      deliveryTab: 'Lieferung (MG)',
      deliveryArea: 'Liefergebiet in Mönchengladbach:',
      belowMinOrder: 'Mindestbestellwert noch nicht erreicht',
      missingAmount: 'Noch bis zum Mindestbestellwert:',
      tabPositions: '1. Positionen',
      tabCheckout: '2. Kundendaten & Bezahlung',
      tipLabel: 'Trinkgeld für das Schmiede-Team:',
      tipCustom: 'Trinkgeld',
      noneTip: 'Kein',
      contactHeading: 'Kontaktdaten für die Bestellung',
      nameLabel: 'Vollständiger Name *',
      namePlaceholder: 'z.B. Max Mustermann',
      phoneLabel: 'Telefonnummer (für Rückfragen / Fahrer) *',
      phonePlaceholder: 'z.B. 0172 1234567',
      streetLabel: 'Straße *',
      houseNumberLabel: 'Hausnr. *',
      floorNotesLabel: 'Zusatzangaben (Etage, Klingelname, Hinterhaus)',
      floorNotesPlaceholder: 'z.B. 2. OG rechts, Klingel Mustermann',
      preferredTimeLabel: 'Wunschzeit',
      paymentHeading: 'Gewünschte Zahlungsart vor Ort',
      kitchenNoteLabel: 'Notiz an die Schmiede-Küche (optional)',
      kitchenNotePlaceholder: 'z.B. Bitte Besteck beilegen, Sauce extra heiß',
      privacyConsent:
        'Ich willige in die Datenübermittlung zur Auftragsabwicklung gemäß der Datenschutzerklärung ein. Alle Preise verstehen sich inkl. ges. MwSt. (§ 312j BGB).',
      subtotal: 'Zwischensumme:',
      pickupDiscount: 'Selbstabholer-Rabatt (10%):',
      deliveryFee: 'Lieferkosten:',
      freeDelivery: 'Kostenlos (Frei Haus)',
      tip: 'Trinkgeld für das Team:',
      totalAmount: 'Gesamtbetrag:',
      taxFood: 'inkl. 7% MwSt. auf Speisen:',
      taxDrinks: '19% MwSt.:',
      dispatchWhatsappBtn: 'Bestellung via WhatsApp aufgeben (1-Klick)',
      whatsappOpenedNotice: 'WhatsApp wurde geöffnet! Bitte senden Sie die Nachricht jetzt ab.',
    },
    reservation: {
      tagline: 'Echtzeit-Kapazitätsgarantie',
      heading: 'Tisch reservieren',
      subtitle:
        'Genießen Sie knusprige Spezialitäten im rustikal-modernen Schmiede-Ambiente in Mönchengladbach. Mit Sofort-Bestätigung & Kalendereintrag.',
      successTag: 'Erfolgreich bestätigt',
      successHeading: 'Wir freuen uns auf Ihren Besuch!',
      bookingNumber: 'Buchungsnummer:',
      guest: 'Gast:',
      dateTime: 'Datum & Uhrzeit:',
      partySize: 'Personenanzahl:',
      seatingArea: 'Bereich:',
      indoor: 'Gemütlicher Gastraum',
      terrace: 'Sonnige Außenterrasse (wetterabhängig)',
      location: 'Ort:',
      saveCalendar: 'In Kalender speichern (.ics)',
      anotherBooking: 'Weitere Reservierung aufgeben',
      capacityNotice:
        'Smart Capacity Guard aktiv: Freitag- & Samstagabend ist unsere Schmiede stark frequentiert. Plätze werden in Echtzeit geschützt.',
      dateLabel: 'Datum wählen *',
      mondayError: 'Öffnungszeit beachten: Mo-Fr ab 16:30 Uhr.',
      guestsLabel: 'Gästeanzahl *',
      timeLabel: 'Verfügbare Uhrzeit *',
      seatsLeft: 'Plätze',
      fullSlot: 'Voll',
      areaLabel: 'Sitzbereich',
      personalHeading: 'Ihre Kontaktdaten',
      nameLabel: 'Ihr Name *',
      phoneLabel: 'Telefonnummer *',
      emailLabel: 'E-Mail-Adresse *',
      requestsLabel: 'Besondere Wünsche (z.B. Kinderstuhl, Geburtstag, Rollstuhlplatz)',
      requestsPlaceholder: 'z.B. Wir feiern einen 50. Geburtstag, bitte einen ruhigen Tisch',
      submitBtn: 'Jetzt verbindlich reservieren',
    },
    catering: {
      tagline: 'Mönchengladbach · Krefeld · Neuss · Viersen',
      heading: 'Catering & Live-Cooking Event-Rechner',
      subtitle:
        'Ob Firmenjubiläum, Geburtstag oder Vereinsfeier: Berechnen Sie Ihr Wunsch-Catering in Echtzeit und erhalten Sie sofort ein Schmiede-Angebot.',
      eventType: '1. Art der Veranstaltung',
      company: 'Firmenfeier',
      birthday: 'Geburtstag',
      club: 'Verein / Sport',
      guestSlider: '2. Gästeanzahl planen',
      minSize: '15 Gäste (Mindestgröße)',
      largeEvent: '250+ Gäste (Großevent)',
      packageHeading: '3. Catering-Paket wählen',
      bestseller: 'Bestseller',
      perPerson: 'p.P.',
      liveEstimate: 'Live-Kostenschätzung',
      inquiryHeading: 'Unverbindliches Angebot per WhatsApp anfordern',
      nameCompany: 'Ihr Name / Firma *',
      phone: 'Telefonnummer *',
      date: 'Wunschdatum',
      city: 'Ort (z.B. MG-Nord)',
      wishes: 'Zusätzliche Wünsche (z.B. Besteck, Servicekraft)',
      inquiryWhatsappBtn: 'Angebot via WhatsApp anfragen (1-Klick)',
      replyGuarantee: 'Kostenlose & unverbindliche Angebotserstellung innerhalb von 2 Stunden.',
      openedNotice: '✓ WhatsApp wurde geöffnet! Wir melden uns innerhalb von 2 Stunden.',
    },
    footer: {
      craftDescription:
        'Traditionelle Handwerksgastronomie in Mönchengladbach. Goldbraun soufflierte Schnitzel, saftiges Fleisch, hausgemachte Saucen und knusprige Beilagen ohne Kompromisse.',
      regionalTag: '✓ 100% Regionales Fleisch',
      butterTag: '✓ Frisches Butterschmalz',
      openingHours: 'Öffnungszeiten',
      mondayRest: 'Mo–Fr 16:30–21:45',
      weekendAllDay: 'Durchgehend warme Küche am Wochenende.',
      locationContact: 'Standort & Kontakt',
      legalTransparency: 'Rechtliches & Transparenz',
      menuLink: 'Digitale Speisekarte',
      reserveLink: 'Tisch online reservieren',
      cateringLink: 'Catering-Rechner Mönchengladbach',
      imprintLink: 'Impressum (§ 5 DDG)',
      privacyLink: 'Datenschutzerklärung (DSGVO)',
      allRightsReserved: 'Schnitzel Schmiede Mönchengladbach. Alle Rechte vorbehalten.',
      pricesVatNotice: 'Alle Preise inkl. gesetzlicher MwSt. (§ 312j BGB / PAngV)',
      platformTechBy: 'Plattform & Technologie von',
      partnerNetwork: 'Partner im Speisely Netzwerk Mönchengladbach',
      zeroCommission: 'Zero-Commission Direct Ordering Engine',
    },
  },
  en: {
    nav: {
      menu: 'Menu',
      configurator: 'Schnitzel Builder',
      reservation: 'Table Booking',
      catering: 'Catering & Events',
      bookTable: 'Book Table',
      cart: 'Cart',
      positions: 'items',
      callUs: 'Call',
    },
    kitchen: {
      openLunch: 'Open Now (Lunch Service)',
      openDinner: 'Open Now (Dinner Service)',
      openWeekend: 'Open Now (Weekend Kitchen)',
      breakTime: 'Afternoon Break',
      closed: 'Closed',
      mondayRest: 'Mon–Fri open from 4:30 PM',
      reopenTuesday: 'Tuesday at 12:00 PM',
      speedPrep: 'Open until 2:30 PM · Quick Artisanal Preparation',
      hotKitchen: 'Hot Kitchen until 10:00 PM · Pickup & Delivery Active',
      allDayCooking: 'Continuous warm kitchen until 10:00 PM · Reservations Recommended',
      preordersWelcome: 'Dinner service starts at 5:00 PM. Pre-orders welcome anytime!',
      preordersAccepted: 'Re-opens at 12:00 PM. Pre-orders gladly accepted!',
    },
    hero: {
      tagline: 'Artisanal Schnitzel Craft · Mönchengladbach, Germany',
      titleStart: 'THE ART OF ',
      titleHighlight: 'CRUNCH.',
      description:
        'Every schnitzel is freshly pounded by hand upon ordering, soufflé-fried in pure clarified butter, and delivered with our Crunch Guarantee — sauces are always packed separately in sealed jars.',
      orderCta: 'Explore Menu & Order',
      customizerCta: 'Custom Schnitzel Builder',
      reserveCta: 'Book a Table',
      ratingGoogle: '4.9 / 5.0 Google Reviews',
      regionalBadge: 'Regional Meat Quality',
      pickupBadge: '10% Pickup Discount',
      sauceBadge: 'Sauces Packed Separately',
      audioLabel: 'Crunch Audio',
      crunchSensorTitle: 'Acoustic Sensor',
      crunchButtonDefault: 'Click here for Crunch Test 🔊',
      crunchButtonDone: 'Crunched',
      crunchSubtitle: 'Synthetic sound synthesized via Web Audio API',
      crunchGuarantee: 'Crunch Guarantee',
      inButter: 'Freshly Fried in Clarified Butter',
      specialty: 'Forge Specialty',
    },
    marquee: {
      inButter: 'Soufflé-Fried in Pure Clarified Butter',
      regional: 'Regional Cuts & Authentic Veal',
      saucesSeparate: 'Sauces Always Packed Separately',
      manufaktur: "Mönchengladbach's #1 Schnitzel Forge",
      whatsappOrder: '1-Click WhatsApp Instant Ordering',
      pickupDiscount: '10% Discount on Pickup Orders',
    },
    bento: {
      tagline: '2026 Craft Gastronomy Bento',
      heading: 'The Secret of the Forge',
      subtitle:
        'Four craftsmanship pillars that make every Schmiede Schnitzel an unforgettable culinary experience.',
      stationTitle: 'The Mönchengladbach Breading Line',
      stationSubtitle: 'Click on each station to discover the secret behind our soufflé crust.',
      step1Title: 'Hand-Pounded',
      step1Desc: 'Tender cuts pounded paper-thin by hand for peak juiciness.',
      step2Title: 'Flour & Farm Eggs',
      step2Desc: 'Finest wheat flour and fresh country eggs for seamless crumb adhesion.',
      step3Title: 'Crunchy Breadcrumbs',
      step3Desc: 'Classic golden breadcrumbs, Japanese panko flakes, or Bavarian pretzel crumbs.',
      step4Title: 'Clarified Butter Pan',
      step4Desc: 'Floated at 175°C and waved for cloud-like soufflé blistering — golden & feather-light.',
      handcraftedTag: 'Craftsmanship Over Frozen Mass Production',
      crunchTitle: 'The Crunch Factor',
      crunchDesc: 'Acoustically certified crispness in every single bite.',
      crunchPlay: 'Play Acoustic Test 🔊',
      guaranteeTitle: 'Crunch Guarantee',
      guaranteeDesc: 'Why our schnitzels never arrive soggy at your doorstep.',
      sauceGlass: 'Sauces travel in a separate sealed jar',
      breathableBox: 'Steam-permeable custom packaging',
      dipAtHome: 'Dip or pour freshly at your table',
      quote: '“The only schnitzel delivery in town that still crunches after a 20-minute drive.”',
      radarTag: 'Locally Rooted',
      radarHeading: 'From Dohler Straße Straight to Your Door',
      radarDesc:
        'Centrally situated in Mönchengladbach, delivering to City Centre, Rheydt, Odenkirchen, Lürrip, Windberg, and Korschenbroich in record time.',
      speedAvg: 'Average Delivery Time',
      speedMinutes: '32 Minutes',
      speedDesc: 'Delivered hot & crispy',
      pickupTag: 'Self-Pickup',
      pickupDiscount: '-10% Discount',
      pickupDesc: 'Directly at our front counter',
      zonesTag: 'Delivery Area',
      zonesCount: '9 Postal Zones',
      zonesMin: 'Starting at €15 minimum order',
      askWhatsapp: 'Ask a question via WhatsApp →',
    },
    sauce: {
      tagline: 'Interactive Sauce Lab',
      heading: 'Discover Your Sauce Match',
      subtitle:
        'Every sauce is slow-cooked from scratch daily and sealed in a dedicated jar for transportation.',
      flavorProfile: 'Flavor Profile',
      packedSeparately: 'Packed Separately',
      creaminess: 'Creaminess',
      heat: 'Spiciness / Heat',
      depth: 'Flavor Depth',
      perfectPair: 'Pairs perfectly with:',
    },
    menu: {
      featuredTag: 'From Our Forge Kitchen',
      popularTitle: 'Our Most Loved Dishes',
      openAll: 'View Full Digital Menu',
      searchPlaceholder: 'Search dish (e.g. Hunter, Veal, Panko, Truffle)...',
      clearSearch: '✕',
      allDishes: 'All Dishes',
      catClassics: 'Classics',
      catSpecials: 'Forge Specials',
      catBurgers: 'Burgers & Sandwiches',
      catFries: 'Loaded Fries',
      catKids: 'Kids Menu',
      catDesserts: 'Desserts',
      catDrinks: 'Drinks',
      filterAll: 'All',
      filterRegional: 'Regionales Fleisch',
      filterVeggie: 'Vegetarian',
      filterBestseller: 'Bestseller',
      filterChef: "Chef's Choice",
      noDishesFound: 'No dishes found',
      noDishesDesc: 'Try another search keyword or reset active filters.',
      resetFilters: 'Reset Filters',
      configureBtn: 'Customize',
      addToCartBtn: 'Add to Cart',
      addedBtn: 'Added!',
      allergensLabel: 'Allergens:',
      viewAllergens: '(View Sheet)',
      none: 'None',
    },
    customizer: {
      tagline: 'LIVE FORGE // STEP-BY-STEP',
      heading: 'Schmiede Configurator',
      subtitle:
        'Define meat cut, crust texture & molten sauce of your culinary masterpiece according to traditional pan craft.',
      step1: '1. Meat Base',
      step2: '2. Crust',
      step3: '3. Sauce',
      step4: '4. Sides',
      meatHeading: '1. Choose Your Meat Base',
      meatSub: 'Fresh regional provenance',
      sizeHeading: 'Portion & Weight',
      sizeSub: 'Raw cut weight',
      crustHeading: '2. Select Your Crisp Crust',
      crustSub: 'Soufflé-fried in pure clarified butter',
      sauceHeading: '3. Homemade Forge Sauce',
      sauceSub: 'Slow-simmered daily',
      sauceToggleTitle: 'Crunch Guarantee: Pack sauce separately',
      sauceToggleDesc: 'Prevents soggy crust during delivery and transit.',
      sidesHeading: '4. Choose Your Primary Side',
      extrasHeading: 'Gourmet Extras & Toppings',
      extrasSub: 'Multiple selections possible',
      notesLabel: 'Special preparation requests for our chefs (optional)',
      notesPlaceholder: 'e.g. Cut lemon slice extra thick, sauce very hot',
      backBtn: '← Back',
      nextBtn: 'Next Step',
      addCustomBtn: 'Add to Cart',
      liveConfigTitle: 'Live Configuration',
      liveConfigHeading: 'Your Custom Forge Schnitzel',
      baseLabel: 'Base:',
      sizeLabel: 'Portion:',
      crustLabel: 'Crust:',
      sauceLabel: 'Sauce:',
      sidesLabel: 'Side:',
      extrasLabel: 'Extras:',
      priceIncVat: 'Price incl. VAT:',
      included: 'Included in base price',
      standardPortion: 'Standard Portion',
      separateNotice: 'packed separately',
    },
    cart: {
      title: 'Your Schmiede Cart',
      positions: 'items · Fresh Artisan Prep',
      emptyTitle: 'Your cart is currently empty',
      emptyDesc: 'Discover our legendary schnitzel variations or build your custom schnitzel to taste.',
      exploreMenu: 'Explore Menu',
      pickupTab: 'Self-Pickup',
      pickupDiscountBadge: '-10% Discount',
      deliveryTab: 'Delivery (MG)',
      deliveryArea: 'Delivery Area in Mönchengladbach:',
      belowMinOrder: 'Minimum order amount not reached yet',
      missingAmount: 'Remaining to meet minimum order:',
      tabPositions: '1. Items',
      tabCheckout: '2. Details & Payment',
      tipLabel: 'Tip for the Kitchen Crew:',
      tipCustom: 'Tip',
      noneTip: 'None',
      contactHeading: 'Contact Details for Order',
      nameLabel: 'Full Name *',
      namePlaceholder: 'e.g. John Doe',
      phoneLabel: 'Phone Number (for courier / questions) *',
      phonePlaceholder: 'e.g. +49 170 1234567',
      streetLabel: 'Street *',
      houseNumberLabel: 'House No. *',
      floorNotesLabel: 'Additional details (Apartment floor, doorbell name)',
      floorNotesPlaceholder: 'e.g. 2nd floor, bell on right Doe',
      preferredTimeLabel: 'Desired Delivery / Pickup Time',
      paymentHeading: 'Preferred On-Site Payment Method',
      kitchenNoteLabel: 'Note to the Kitchen (optional)',
      kitchenNotePlaceholder: 'e.g. Please include cutlery, extra napkins',
      privacyConsent:
        'I consent to data transmission for order fulfillment pursuant to the Privacy Policy. All prices include statutory German VAT (§ 312j BGB).',
      subtotal: 'Subtotal:',
      pickupDiscount: 'Self-Pickup Discount (10%):',
      deliveryFee: 'Delivery Fee:',
      freeDelivery: 'Free Delivery',
      tip: 'Tip for the Team:',
      totalAmount: 'Total Amount:',
      taxFood: 'incl. 7% VAT on Food:',
      taxDrinks: '19% VAT on Drinks/Service:',
      dispatchWhatsappBtn: 'Order via WhatsApp (1-Click)',
      whatsappOpenedNotice: 'WhatsApp was opened! Please hit send to submit your ticket.',
    },
    reservation: {
      tagline: 'Real-Time Capacity Guard',
      heading: 'Book a Table',
      subtitle:
        'Experience crispy artisanal delicacies in our modern craft gastronomy ambience in Mönchengladbach. Instant confirmation & calendar invite.',
      successTag: 'Successfully Confirmed',
      successHeading: 'We look forward to welcoming you!',
      bookingNumber: 'Booking Reference:',
      guest: 'Guest:',
      dateTime: 'Date & Time:',
      partySize: 'Party Size:',
      seatingArea: 'Area:',
      indoor: 'Cozy Dining Room',
      terrace: 'Sunny Outdoor Terrace (weather permitting)',
      location: 'Location:',
      saveCalendar: 'Save to Calendar (.ics)',
      anotherBooking: 'Book Another Table',
      capacityNotice:
        'Smart Capacity Guard active: Friday & Saturday evenings are highly frequented. Table seats are protected in real time to guarantee kitchen speed.',
      dateLabel: 'Select Date *',
      mondayError: 'Monday is our day of rest. Please pick Tue–Sun.',
      guestsLabel: 'Number of Guests *',
      timeLabel: 'Available Time Slot *',
      seatsLeft: 'seats',
      fullSlot: 'Full',
      areaLabel: 'Seating Preference',
      personalHeading: 'Your Contact Information',
      nameLabel: 'Your Name *',
      phoneLabel: 'Phone Number *',
      emailLabel: 'Email Address *',
      requestsLabel: 'Special Requests (e.g. High chair, birthday table, wheelchair access)',
      requestsPlaceholder: 'e.g. Celebrating a 50th birthday, please arrange a quiet table',
      submitBtn: 'Confirm Table Reservation',
    },
    catering: {
      tagline: 'Mönchengladbach · Krefeld · Neuss · Viersen',
      heading: 'Catering & Live-Cooking Calculator',
      subtitle:
        'Corporate anniversary, birthday party, or sports club event: Calculate your custom catering in real time and receive a direct quote.',
      eventType: '1. Event Type',
      company: 'Corporate Event',
      birthday: 'Birthday Party',
      club: 'Club / Sports Event',
      guestSlider: '2. Plan Guest Count',
      minSize: '15 Guests (Minimum size)',
      largeEvent: '250+ Guests (Large scale)',
      packageHeading: '3. Select Catering Package',
      bestseller: 'Bestseller',
      perPerson: 'per guest',
      liveEstimate: 'Live Cost Estimate',
      inquiryHeading: 'Request Non-Binding Quote via WhatsApp',
      nameCompany: 'Your Name / Company *',
      phone: 'Phone Number *',
      date: 'Desired Date',
      city: 'Location (e.g. MG-Nord)',
      wishes: 'Special requests (e.g. Cutlery, service staff)',
      inquiryWhatsappBtn: 'Request Quote via WhatsApp (1-Click)',
      replyGuarantee: 'Free & non-binding quote within 2 business hours.',
      openedNotice: '✓ WhatsApp was opened! We will get in touch within 2 hours.',
    },
    footer: {
      craftDescription:
        'Traditional artisanal gastronomy in Mönchengladbach. Gold-souffléd schnitzels, tender cuts, homemade sauces, and crispy sides with zero compromises.',
      regionalTag: '✓ 100% Regional Meat',
      butterTag: '✓ Pure Clarified Butter',
      openingHours: 'Opening Hours',
      mondayRest: 'Mon–Fri 4:30–9:45 PM',
      weekendAllDay: 'Continuous hot kitchen on weekends.',
      locationContact: 'Location & Contact',
      legalTransparency: 'Legal & Transparency',
      menuLink: 'Digital Menu',
      reserveLink: 'Book a Table Online',
      cateringLink: 'Catering Calculator Mönchengladbach',
      imprintLink: 'Imprint (§ 5 DDG)',
      privacyLink: 'Privacy Policy (GDPR)',
      allRightsReserved: 'Schnitzel Schmiede Mönchengladbach. All rights reserved.',
      pricesVatNotice: 'All prices include German statutory VAT (§ 312j BGB / PAngV)',
      platformTechBy: 'Platform & Technology by',
      partnerNetwork: 'Partner in the Speisely Network Mönchengladbach',
      zeroCommission: 'Zero-Commission Direct Ordering Engine',
    },
  },
};
