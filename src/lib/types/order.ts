import { SchnitzelConfig } from '../schemas/configurator';
import { MenuItem } from './menu';

export type FulfillmentType = 'pickup' | 'delivery';

export type PaymentMethod = 'cash' | 'card' | 'paypal';

export interface DeliveryZone {
  id: string;
  name: string;
  postalCodes: string[];
  minOrder: number;
  deliveryFee: number;
  freeDeliveryThreshold: number;
}

export const DELIVERY_ZONES: DeliveryZone[] = [
  {
    id: 'zone-1',
    name: 'MG Kern & Mitte (41061, 41063, 41065, 41066)',
    postalCodes: ['41061', '41063', '41065', '41066'],
    minOrder: 15.0,
    deliveryFee: 2.0,
    freeDeliveryThreshold: 35.0,
  },
  {
    id: 'zone-2',
    name: 'MG Rheydt & Odenkirchen (41236, 41238, 41239)',
    postalCodes: ['41236', '41238', '41239'],
    minOrder: 25.0,
    deliveryFee: 3.5,
    freeDeliveryThreshold: 50.0,
  },
  {
    id: 'zone-3',
    name: 'Umland Korschenbroich / Viersen Süd (41352, 41748)',
    postalCodes: ['41352', '41748'],
    minOrder: 35.0,
    deliveryFee: 5.0,
    freeDeliveryThreshold: 60.0,
  },
];

export interface CartStandardItem {
  type: 'standard';
  cartItemId: string;
  item: MenuItem;
  quantity: number;
  notes?: string;
}

export interface CartCustomSchnitzelItem {
  type: 'custom_schnitzel';
  cartItemId: string;
  config: SchnitzelConfig;
  quantity: number;
}

export type CartItem = CartStandardItem | CartCustomSchnitzelItem;

export interface CustomerDetails {
  name: string;
  phone: string;
  postalCode: string;
  street: string;
  houseNumber: string;
  floorNotes?: string;
  fulfillmentType: FulfillmentType;
  preferredTime: string; // e.g. "Schnellstmöglich (ca. 30-45 Min)" or time string
  paymentMethod: PaymentMethod;
  notes?: string;
  privacyAgreed: boolean;
}
