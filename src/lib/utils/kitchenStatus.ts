export interface KitchenStatus {
  isOpen: boolean;
  statusBadge: string;
  statusColor: 'emerald' | 'amber' | 'ruby';
  details: string;
  nextOpenNotice?: string;
  acceptsPreOrders: boolean;
}

export function getLiveKitchenStatus(date: Date = new Date()): KitchenStatus {
  const day = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const currentTimeVal = hours * 60 + minutes;

  // Monday: Ruhetag
  if (day === 1) {
    return {
      isOpen: false,
      statusBadge: 'Montag Ruhetag',
      statusColor: 'ruby',
      details: 'Unsere Küche schöpft neue Kraft. Wieder geöffnet am Dienstag ab 12:00 Uhr.',
      nextOpenNotice: 'Dienstag 12:00 Uhr',
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
        statusBadge: 'Jetzt geöffnet (Mittagstisch)',
        statusColor: 'emerald',
        details: 'Mittags geöffnet bis 14:30 Uhr · Schnelle Zubereitung',
        acceptsPreOrders: true,
      };
    }

    if (currentTimeVal >= lunchEnd && currentTimeVal < dinnerStart) {
      return {
        isOpen: false,
        statusBadge: 'Mittagspause',
        statusColor: 'amber',
        details: 'Abends wieder geöffnet ab 17:00 Uhr. Vorbestellungen jederzeit möglich!',
        nextOpenNotice: 'Heute 17:00 Uhr',
        acceptsPreOrders: true,
      };
    }

    if (currentTimeVal >= dinnerStart && currentTimeVal < dinnerEnd) {
      return {
        isOpen: true,
        statusBadge: 'Jetzt geöffnet (Abend-Service)',
        statusColor: 'emerald',
        details: 'Küche heiß bis 22:00 Uhr · Abholung & Lieferung aktiv',
        acceptsPreOrders: true,
      };
    }

    return {
      isOpen: false,
      statusBadge: 'Geschlossen',
      statusColor: 'amber',
      details: 'Wieder geöffnet ab 12:00 Uhr. Vorbestellungen für heute werden gerne entgegengenommen!',
      nextOpenNotice: 'Heute 12:00 Uhr',
      acceptsPreOrders: true,
    };
  }

  // Saturday & Sunday: 12:00 - 22:00 durchgehend
  const weekendStart = 12 * 60;
  const weekendEnd = 22 * 60;

  if (currentTimeVal >= weekendStart && currentTimeVal < weekendEnd) {
    return {
      isOpen: true,
      statusBadge: 'Jetzt geöffnet (Wochenend-Küche)',
      statusColor: 'emerald',
      details: 'Durchgehend warme Küche bis 22:00 Uhr · Tischreservierung empfohlen',
      acceptsPreOrders: true,
    };
  }

  return {
    isOpen: false,
    statusBadge: 'Geschlossen',
    statusColor: 'amber',
    details: 'Wieder geöffnet ab 12:00 Uhr. Gerne für heute vorbestellen oder reservieren!',
    nextOpenNotice: '12:00 Uhr',
    acceptsPreOrders: true,
  };
}
