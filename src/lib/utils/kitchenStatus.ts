export interface KitchenStatus {
  isOpen: boolean;
  statusBadge: string;
  statusColor: 'emerald' | 'amber' | 'ruby';
  details: string;
  nextOpenNotice?: string;
  acceptsPreOrders: boolean;
  isDeliveryOpen: boolean;
  deliveryStatusBadge: string;
}

export function getLiveKitchenStatus(date: Date = new Date(), lang: 'de' | 'en' = 'de'): KitchenStatus {
  const isEn = lang === 'en';
  const day = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const currentTimeVal = hours * 60 + minutes;

  // Exact Öffnungszeiten:
  // Mo-Fr (1-5): 16:30 (990) - 21:45 (1305)
  // Sa (6): 16:00 (960) - 21:45 (1305)
  // So (0): 12:00 (720) - 21:45 (1305)

  let openMin = 16 * 60 + 30; // 16:30 default for Mo-Fr
  let closeMin = 21 * 60 + 45; // 21:45
  let nextOpen = '16:30 Uhr';
  let nextOpenEn = '4:30 PM';

  // Exact Lieferzeiten:
  // Mo-Fr (1-5): 16:00 (960) - 21:45 (1305)
  // Sa (6): 14:00 (840) - 21:45 (1305)
  // So (0): 11:30 (690) - 21:45 (1305)
  let delivOpenMin = 16 * 60; // 16:00
  let delivCloseMin = 21 * 60 + 45;

  if (day === 6) {
    // Saturday
    openMin = 16 * 60; // 16:00
    delivOpenMin = 14 * 60; // 14:00
    nextOpen = 'Samstag 16:00 Uhr';
    nextOpenEn = 'Saturday 4:00 PM';
  } else if (day === 0) {
    // Sunday
    openMin = 12 * 60; // 12:00
    delivOpenMin = 11 * 60 + 30; // 11:30
    nextOpen = 'Sonntag 12:00 Uhr';
    nextOpenEn = 'Sunday 12:00 PM';
  } else {
    // Monday to Friday
    openMin = 16 * 60 + 30;
    delivOpenMin = 16 * 60;
    nextOpen = 'Heute 16:30 Uhr';
    nextOpenEn = 'Today 4:30 PM';
  }

  const isPickupOpen = currentTimeVal >= openMin && currentTimeVal <= closeMin;
  const isDeliveryOpen = currentTimeVal >= delivOpenMin && currentTimeVal <= delivCloseMin;

  if (isPickupOpen || isDeliveryOpen) {
    return {
      isOpen: true,
      statusBadge: isEn ? 'Kitchen & Delivery Open' : 'Jetzt geöffnet & Lieferdienst aktiv',
      statusColor: 'emerald',
      details: isEn
        ? 'Fresh craft schnitzel hot from the pan · Pickup & delivery until 9:45 PM'
        : 'Frische Schnitzel heiß aus Butterschmalz · Abholung & Lieferung bis 21:45 Uhr',
      nextOpenNotice: isEn ? 'Open today until 9:45 PM' : 'Heute bis 21:45 Uhr geöffnet',
      acceptsPreOrders: true,
      isDeliveryOpen,
      deliveryStatusBadge: isDeliveryOpen ? (isEn ? 'Delivery active' : 'Lieferung aktiv') : (isEn ? 'Delivery opens soon' : 'Lieferung ab ' + (day === 0 ? '11:30' : day === 6 ? '14:00' : '16:00') + ' Uhr'),
    };
  }

  // Pre-open or closed
  return {
    isOpen: false,
    statusBadge: isEn ? 'Currently Closed' : 'Derzeit geschlossen',
    statusColor: 'amber',
    details: isEn
      ? `Reopening at ${nextOpenEn}. Pre-orders for today are warmly welcomed!`
      : `Wieder geöffnet ab ${nextOpen}. Gerne für heute vorbestellen oder reservieren!`,
    nextOpenNotice: isEn ? nextOpenEn : nextOpen,
    acceptsPreOrders: true,
    isDeliveryOpen: false,
    deliveryStatusBadge: isEn ? 'Pre-order active' : 'Vorbestellung aktiv',
  };
}
