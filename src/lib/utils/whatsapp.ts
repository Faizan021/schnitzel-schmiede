import { CartItem, CustomerDetails, DELIVERY_ZONES } from '../types/order';
import {
  MEAT_OPTIONS,
  SIZE_OPTIONS,
  CRUST_OPTIONS,
  SAUCE_OPTIONS,
  SIDE_OPTIONS,
  EXTRA_OPTIONS,
} from '../schemas/configurator';

export interface OrderCalculation {
  subtotal: number;
  pickupDiscount: number;
  deliveryFee: number;
  tipAmount: number;
  total: number;
  taxFood7: number;
  taxDrinks19: number;
}

export function calculateOrderSummary(
  items: CartItem[],
  fulfillmentType: 'pickup' | 'delivery',
  postalCode: string,
  tipPercentage: number = 0
): OrderCalculation {
  let subtotal = 0;
  let drinksTotal = 0;
  let foodTotal = 0;

  for (const item of items) {
    if (item.type === 'standard') {
      const linePrice = item.item.price * item.quantity;
      subtotal += linePrice;
      if (item.item.category === 'drinks') {
        drinksTotal += linePrice;
      } else {
        foodTotal += linePrice;
      }
    } else {
      const linePrice = item.config.unitPrice * item.quantity;
      subtotal += linePrice;
      foodTotal += linePrice;
    }
  }

  // 10% discount on food & drinks if self-pickup
  const pickupDiscount = fulfillmentType === 'pickup' ? Math.round(subtotal * 0.1 * 100) / 100 : 0.0;

  let deliveryFee = 0;
  if (fulfillmentType === 'delivery') {
    const zone = DELIVERY_ZONES.find((z) => z.postalCodes.includes(postalCode)) || DELIVERY_ZONES[0];
    if (subtotal >= zone.freeDeliveryThreshold) {
      deliveryFee = 0.0;
    } else {
      deliveryFee = zone.deliveryFee;
    }
  }

  const billAfterDiscount = Math.max(0, subtotal - pickupDiscount);
  const tipAmount = Math.round(billAfterDiscount * (tipPercentage / 100) * 100) / 100;
  const total = Math.round((billAfterDiscount + deliveryFee + tipAmount) * 100) / 100;

  // German VAT breakdown (7% Takeaway Food, 19% Drinks & Delivery/Service)
  const taxFood7 = Math.round((foodTotal - pickupDiscount * (foodTotal / (subtotal || 1))) * (7 / 107) * 100) / 100;
  const taxDrinks19 = Math.round((drinksTotal + deliveryFee) * (19 / 119) * 100) / 100;

  return {
    subtotal,
    pickupDiscount,
    deliveryFee,
    tipAmount,
    total,
    taxFood7,
    taxDrinks19,
  };
}

export const DEFAULT_WHATSAPP_PHONE =
  process.env.NEXT_PUBLIC_RESTAURANT_WHATSAPP || '4917612345678';

export function getKitchenWhatsAppNumber(): string {
  return DEFAULT_WHATSAPP_PHONE;
}

export function generateReferenceId(prefix: string): string {
  return `${prefix}-${Date.now().toString().slice(-4)}`;
}

export function generateWhatsAppOrderMessage(
  orderNumber: string,
  items: CartItem[],
  details: CustomerDetails,
  calc: OrderCalculation
): string {
  const fulfillmentTitle =
    details.fulfillmentType === 'pickup'
      ? '🥡 *SELBSTABHOLUNG* (10% Rabatt)'
      : `🚗 *LIEFERUNG* (PLZ: ${details.postalCode} Mönchengladbach)`;

  const paymentLabels: Record<string, string> = {
    cash: '💵 Bar passend an der Haustür / Theke',
    card: '💳 EC / Kreditkarte vor Ort (SumUp)',
    paypal: '📱 PayPal QR-Code direkt vor Ort',
  };

  const lines: string[] = [
    `🔥 [SCHNITZEL-SCHMIEDE] 🥩 BESTELLUNG #${orderNumber}`,
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    `📍 Art: ${fulfillmentTitle}`,
    `⏰ Wunschzeit: *${details.preferredTime}*`,
    '',
    '👤 *KUNDENDATEN:*',
    `Name: *${details.name}*`,
    `Telefon: ${details.phone}`,
  ];

  if (details.fulfillmentType === 'delivery') {
    lines.push(`Adresse: ${details.street} ${details.houseNumber}`);
    lines.push(`PLZ / Ort: ${details.postalCode} Mönchengladbach`);
    if (details.floorNotes) {
      lines.push(`Hinweis: ${details.floorNotes}`);
    }
  } else {
    lines.push('Abholort: Schnitzel Schmiede Mönchengladbach');
  }

  lines.push('');
  lines.push('📦 *BESTELLTE POSITIONEN:*');

  items.forEach((item) => {
    if (item.type === 'standard') {
      const allergensStr = item.item.allergens.length > 0 ? ` (Allergene: ${item.item.allergens.join(', ')})` : '';
      lines.push(
        `${item.quantity}x *${item.item.name}* — ${(item.item.price * item.quantity).toFixed(2).replace('.', ',')} €${allergensStr}`
      );
      if (item.notes) {
        lines.push(`   ↳ Wunsch: ${item.notes}`);
      }
    } else {
      const cfg = item.config;
      const meatLabel = MEAT_OPTIONS[cfg.meat]?.name || cfg.meat;
      const sizeLabel = SIZE_OPTIONS[cfg.size]?.name || cfg.size;
      const crustLabel = CRUST_OPTIONS[cfg.crust]?.name || cfg.crust;
      const sauceLabel = SAUCE_OPTIONS[cfg.sauce]?.name || cfg.sauce;
      const sideLabel = SIDE_OPTIONS[cfg.side]?.name || cfg.side;
      const extrasLabels = cfg.extras.map((e) => EXTRA_OPTIONS[e]?.name || e).join(', ');
      const saucePackaging = cfg.sauceSeparated ? '*(separat im Glas/Becher verpackt)*' : '(über Schnitzel serviert)';

      lines.push(
        `${item.quantity}x 👑 *MEIN SCHMIEDE-CUSTOM SCHNITZEL* — ${(cfg.unitPrice * item.quantity).toFixed(2).replace('.', ',')} €`
      );
      lines.push(`   • Fleisch: ${meatLabel}`);
      lines.push(`   • Größe: ${sizeLabel}`);
      lines.push(`   • Panade: ${crustLabel}`);
      lines.push(`   • Sauce: ${sauceLabel} ${saucePackaging}`);
      lines.push(`   • Beilage: ${sideLabel}`);
      if (extrasLabels) {
        lines.push(`   • Extras: ${extrasLabels}`);
      }
      if (cfg.specialInstructions) {
        lines.push(`   • Notiz: ${cfg.specialInstructions}`);
      }
    }
  });

  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  lines.push('💰 *RECHNUNGSBETRAG:*');
  lines.push(`Zwischensumme: ${calc.subtotal.toFixed(2).replace('.', ',')} €`);

  if (calc.pickupDiscount > 0) {
    lines.push(`Selbstabholer-Rabatt (-10%): -${calc.pickupDiscount.toFixed(2).replace('.', ',')} €`);
  }

  if (details.fulfillmentType === 'delivery') {
    lines.push(
      `Liefergebühr: ${calc.deliveryFee === 0 ? '0,00 € (Frei Haus)' : `${calc.deliveryFee.toFixed(2).replace('.', ',')} €`}`
    );
  }

  if (calc.tipAmount > 0) {
    lines.push(`Trinkgeld für das Schmiede-Team: ${calc.tipAmount.toFixed(2).replace('.', ',')} €`);
  }

  lines.push(`*GESAMTBETRAG: ${calc.total.toFixed(2).replace('.', ',')} €*`);
  lines.push(`(inkl. ges. MwSt.: 7% ${calc.taxFood7.toFixed(2).replace('.', ',')} €, 19% ${calc.taxDrinks19.toFixed(2).replace('.', ',')} €)`);
  lines.push(`💳 Zahlungsart: ${paymentLabels[details.paymentMethod] || details.paymentMethod}`);

  if (details.notes) {
    lines.push('');
    lines.push(`💬 *Zusatznotiz an die Küche:* "${details.notes}"`);
  }

  lines.push('');
  lines.push('✅ _Bestellung übermittelt via schnitzel-schmiede-mg.de_');
  lines.push('Bitte um kurze Bestätigung mit Angabe der aktuellen Zubereitungszeit.');

  return lines.join('\n');
}

export function buildWhatsAppLink(
  orderNumber: string,
  items: CartItem[],
  details: CustomerDetails,
  calc: OrderCalculation,
  kitchenPhone: string = getKitchenWhatsAppNumber()
): string {
  const text = generateWhatsAppOrderMessage(orderNumber, items, details, calc);
  return `https://wa.me/${kitchenPhone}?text=${encodeURIComponent(text)}`;
}
