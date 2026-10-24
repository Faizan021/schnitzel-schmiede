export function getRestaurantJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'Schnitzel Schmiede Mönchengladbach',
    alternateName: 'Schnitzel Schmiede MG',
    image: [
      'https://images.unsplash.com/photo-1599921841143-8190253a93bb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    ],
    '@id': 'https://schnitzel-schmiede-mg.de',
    url: 'https://schnitzel-schmiede-mg.de',
    telephone: '+492161123456',
    priceRange: '€€',
    servesCuisine: ['German', 'Austrian', 'Schnitzel', 'Craft Gastronomy', 'Halal Options'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Bismarckstraße 45',
      addressLocality: 'Mönchengladbach',
      postalCode: '41061',
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
        dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '12:00',
        closes: '14:30',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '17:00',
        closes: '22:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: '12:00',
        closes: '22:00',
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
