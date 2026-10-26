export function getRestaurantJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'Schnitzel Schmiede Mönchengladbach',
    alternateName: 'Schnitzel Schmiede MG',
    image: [
      'https://schnitzel-schmiede-mg.de/images/stitch/schnitzel-hero-stitch.jpg',
      'https://schnitzel-schmiede-mg.de/images/stitch/sauce-pan-stitch.jpg',
    ],
    creator: {
      '@type': 'Organization',
      '@id': 'https://speisely.de/#organization',
      name: 'Speisely',
      url: 'https://speisely.de',
      description: 'Deutschlands Gastronomie- & Catering-Technologie-Netzwerk',
    },
    memberOf: {
      '@type': 'Organization',
      '@id': 'https://speisely.de/#organization',
      name: 'Speisely Gastro-Netzwerk',
      url: 'https://speisely.de',
    },
    '@id': 'https://schnitzel-schmiede-mg.de',
    url: 'https://schnitzel-schmiede-mg.de',
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
    hasMenu: 'https://schnitzel-schmiede-mg.de/speisekarte',
    potentialAction: [
      {
        '@type': 'ReserveAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://schnitzel-schmiede-mg.de/reservierung',
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
          urlTemplate: 'https://schnitzel-schmiede-mg.de/speisekarte',
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
