export function getRestaurantJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'Schnitzel Schmiede Mönchengladbach',
    alternateName: 'Schnitzel Schmiede MG',
    image: [
      'https://www.schnitzelschmiede-mg.de/images/stitch/schnitzel-hero-stitch.jpg',
      'https://www.schnitzelschmiede-mg.de/images/stitch/sauce-pan-stitch.jpg',
    ],
    creator: {
      '@type': 'Organization',
      '@id': 'https://speisely.de/#organization',
      name: 'Speisely',
      url: 'https://speisely.de',
      description: 'Deutschlands Gastronomie- & Catering-Technologie-Netzwerk',
      sameAs: [
        'https://speisely.de',
        'https://speisely.de/catering/ort/moenchengladbach',
      ],
    },
    memberOf: {
      '@type': 'Organization',
      '@id': 'https://speisely.de/#organization',
      name: 'Speisely Gastro-Netzwerk',
      url: 'https://speisely.de',
    },
    parentOrganization: {
      '@type': 'Organization',
      '@id': 'https://speisely.de/#organization',
      name: 'Speisely',
      url: 'https://speisely.de',
    },
    '@id': 'https://www.schnitzelschmiede-mg.de',
    url: 'https://www.schnitzelschmiede-mg.de',
    telephone: '+4921669786951',
    email: 'umarjabbar@yahoo.com',
    priceRange: '€€',
    servesCuisine: ['German', 'Austrian', 'Schnitzel', 'Craft Gastronomy', 'Regional Specialties'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Dohler Str. 269',
      addressLocality: 'Mönchengladbach',
      postalCode: '41238',
      addressRegion: 'Nordrhein-Westfalen',
      addressCountry: 'DE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 51.1963,
      longitude: 6.4419,
    },
    areaServed: [
      {
        '@type': 'AdministrativeArea',
        name: 'Mönchengladbach',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Rheydt',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Niederrhein',
      },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '16:30',
        closes: '21:45',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '16:00',
        closes: '21:45',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday'],
        opens: '12:00',
        closes: '21:45',
      },
    ],
    hasMenu: 'https://www.schnitzelschmiede-mg.de/speisekarte',
    potentialAction: [
      {
        '@type': 'ReserveAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://www.schnitzelschmiede-mg.de/reservierung',
          inLanguage: 'de-DE',
          actionPlatform: [
            'http://schema.org/DesktopWebPlatform',
            'http://schema.org/MobileWebPlatform',
          ],
        },
        result: {
          '@type': 'FoodEstablishmentReservation',
          name: 'Tischreservierung Schnitzel Schmiede MG',
        },
      },
      {
        '@type': 'OrderAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://www.schnitzelschmiede-mg.de/speisekarte',
          inLanguage: 'de-DE',
          actionPlatform: [
            'http://schema.org/DesktopWebPlatform',
            'http://schema.org/MobileWebPlatform',
          ],
        },
      },
    ],
  };
}
