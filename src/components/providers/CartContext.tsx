'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { CartItem, FulfillmentType, CustomerDetails } from '@/lib/types/order';
import { MenuItem } from '@/lib/types/menu';
import { SchnitzelConfig } from '@/lib/schemas/configurator';
import { calculateOrderSummary, OrderCalculation } from '@/lib/utils/whatsapp';

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addStandardItem: (item: MenuItem, notes?: string) => void;
  addCustomSchnitzel: (config: SchnitzelConfig) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  removeItem: (cartItemId: string) => void;
  clearCart: () => void;
  fulfillmentType: FulfillmentType;
  setFulfillmentType: (type: FulfillmentType) => void;
  postalCode: string;
  setPostalCode: (zip: string) => void;
  tipPercent: number;
  setTipPercent: (percent: number) => void;
  calculations: OrderCalculation;
  customerDetails: CustomerDetails;
  updateCustomerDetails: (details: Partial<CustomerDetails>) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const CART_STORAGE_KEY = 'ss_cart_items_v1';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [fulfillmentType, setFulfillmentType] = useState<FulfillmentType>('pickup');
  const [postalCode, setPostalCode] = useState('41061');
  const [tipPercent, setTipPercent] = useState(10);
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    name: '',
    phone: '',
    postalCode: '41061',
    street: '',
    houseNumber: '',
    floorNotes: '',
    fulfillmentType: 'pickup',
    preferredTime: 'Schnellstmöglich (ca. 30–45 Min)',
    paymentMethod: 'cash',
    notes: '',
    privacyAgreed: false,
  });

  // Hydrate from localStorage once on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        queueMicrotask(() => {
          setItems(parsed);
        });
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore
    }
  }, [items]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);

  const addStandardItem = (item: MenuItem, notes?: string) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.type === 'standard' && i.item.id === item.id && (i.notes || '') === (notes || '')
      );
      if (existing) {
        return prev.map((i) =>
          i.cartItemId === existing.cartItemId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          type: 'standard',
          cartItemId: `std-${item.id}-${Date.now()}`,
          item,
          quantity: 1,
          notes,
        },
      ];
    });
    setIsOpen(true);
  };

  const addCustomSchnitzel = (config: SchnitzelConfig) => {
    setItems((prev) => [
      ...prev,
      {
        type: 'custom_schnitzel',
        cartItemId: `custom-${config.id}-${Date.now()}`,
        config,
        quantity: 1,
      },
    ]);
    setIsOpen(true);
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const removeItem = (cartItemId: string) => {
    setItems((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const updateCustomerDetails = (details: Partial<CustomerDetails>) => {
    setCustomerDetails((prev) => ({ ...prev, ...details }));
  };

  const itemCount = useMemo(
    () => items.reduce((acc, curr) => acc + curr.quantity, 0),
    [items]
  );

  const calculations = useMemo(
    () => calculateOrderSummary(items, fulfillmentType, postalCode, tipPercent),
    [items, fulfillmentType, postalCode, tipPercent]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        addStandardItem,
        addCustomSchnitzel,
        updateQuantity,
        removeItem,
        clearCart,
        fulfillmentType,
        setFulfillmentType,
        postalCode,
        setPostalCode,
        tipPercent,
        setTipPercent,
        calculations,
        customerDetails,
        updateCustomerDetails,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
