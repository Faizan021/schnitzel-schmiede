export interface KitchenStatus {
  isOpen: boolean;
  statusBadge: string;
  statusColor: 'emerald' | 'amber' | 'ruby';
  details: string;
  nextOpenNotice?: string;
  acceptsPreOrders: boolean;
}

export function getLiveKitchenStatus(date: Date = new Date(), lang: 'de' | 'en' = 'de'): KitchenStatus {
  const isEn = lang === 'en';
  const day = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const currentTimeVal = hours * 60 + minutes;

  // Monday: Ruhetag
  if (day === 1) {
    return {
      isOpen: false,
      statusBadge: isEn ? 'Monday Closed' : 'Montag Ruhetag',
      statusColor: 'ruby',
      details: isEn
        ? 'Our kitchen is resting. Reopening Tuesday at 12:00 PM.'
        : 'Unsere Küche schöpft neue Kraft. Wieder geöffnet am Dienstag ab 12:00 Uhr.',
      nextOpenNotice: isEn ? 'Tuesday 12:00 PM' : 'Dienstag 12:00 Uhr',
      acceptsPreOrders: true,
    };
  }

  // Tuesday to Friday: 12:00 - 14:30 & 17:00 - 22:00
  if (day >= 2 && day <= 5) {
    const lunchStart = 12 * 60;
    const lunchEnd = 14 * 60 + 30;
    const dinnerStart = 17 * 60;
    const dinnerEnd = 22 * 60;

    if (currentTimeVal >= lunchStart && currentTimeVal < lunchEnd) {
      return {
        isOpen: true,
        statusBadge: isEn ? 'Open Now (Lunch)' : 'Jetzt geöffnet (Mittagstisch)',
        statusColor: 'emerald',
        details: isEn
          ? 'Lunch service open until 2:30 PM · Fast preparation'
          : 'Mittags geöffnet bis 14:30 Uhr · Schnelle Zubereitung',
        acceptsPreOrders: true,
      };
    }

    if (currentTimeVal >= lunchEnd && currentTimeVal < dinnerStart) {
      return {
        isOpen: false,
        statusBadge: isEn ? 'Afternoon Break' : 'Mittagspause',
        statusColor: 'amber',
        details: isEn
          ? 'Reopening for dinner at 5:00 PM. Pre-orders welcome!'
          : 'Abends wieder geöffnet ab 17:00 Uhr. Vorbestellungen jederzeit möglich!',
        nextOpenNotice: isEn ? 'Today 5:00 PM' : 'Heute 17:00 Uhr',
        acceptsPreOrders: true,
      };
    }

    if (currentTimeVal >= dinnerStart && currentTimeVal < dinnerEnd) {
      return {
        isOpen: true,
        statusBadge: isEn ? 'Open Now (Dinner Service)' : 'Jetzt geöffnet (Abend-Service)',
        statusColor: 'emerald',
        details: isEn
          ? 'Hot kitchen until 10:00 PM · Pickup & delivery active'
          : 'Küche heiß bis 22:00 Uhr · Abholung & Lieferung aktiv',
        acceptsPreOrders: true,
      };
    }

    return {
      isOpen: false,
      statusBadge: isEn ? 'Closed' : 'Geschlossen',
      statusColor: 'amber',
      details: isEn
        ? 'Reopening at 12:00 PM. Pre-orders for today are warmly welcomed!'
        : 'Wieder geöffnet ab 12:00 Uhr. Vorbestellungen für heute werden gerne entgegengenommen!',
      nextOpenNotice: isEn ? 'Today 12:00 PM' : 'Heute 12:00 Uhr',
      acceptsPreOrders: true,
    };
  }

  // Saturday & Sunday: 12:00 - 22:00 durchgehend
  const weekendStart = 12 * 60;
  const weekendEnd = 22 * 60;

  if (currentTimeVal >= weekendStart && currentTimeVal < weekendEnd) {
    return {
      isOpen: true,
      statusBadge: isEn ? 'Open Now (Weekend Kitchen)' : 'Jetzt geöffnet (Wochenend-Küche)',
      statusColor: 'emerald',
      details: isEn
        ? 'Continuous hot kitchen until 10:00 PM · Table reservation recommended'
        : 'Durchgehend warme Küche bis 22:00 Uhr · Tischreservierung empfohlen',
      acceptsPreOrders: true,
    };
  }

  return {
    isOpen: false,
    statusBadge: isEn ? 'Closed' : 'Geschlossen',
    statusColor: 'amber',
    details: isEn
      ? 'Reopening at 12:00 PM. Feel free to pre-order or book a table!'
      : 'Wieder geöffnet ab 12:00 Uhr. Gerne für heute vorbestellen oder reservieren!',
    nextOpenNotice: isEn ? '12:00 PM' : '12:00 Uhr',
    acceptsPreOrders: true,
  };
}
