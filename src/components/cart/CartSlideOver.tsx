'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  MessageSquare,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Car,
  Store,
  DollarSign,
  CreditCard,
  QrCode,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../providers/CartContext';
import { DELIVERY_ZONES, PaymentMethod } from '@/lib/types/order';
import {
  MEAT_OPTIONS,
  SIZE_OPTIONS,
  CRUST_OPTIONS,
  SAUCE_OPTIONS,
  SIDE_OPTIONS,
  EXTRA_OPTIONS,
} from '@/lib/schemas/configurator';
import { buildWhatsAppLink } from '@/lib/utils/whatsapp';

export function CartSlideOver() {
  const {
    items,
    itemCount,
    isOpen,
    closeCart,
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
  } = useCart();

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [orderSent, setOrderSent] = useState(false);
  const [activeTab, setActiveTab] = useState<'cart' | 'checkout'>('cart');

  const selectedZone =
    DELIVERY_ZONES.find((z) => z.postalCodes.includes(postalCode)) || DELIVERY_ZONES[0];
  const isBelowMinOrder =
    fulfillmentType === 'delivery' && calculations.subtotal < selectedZone.minOrder;
  const missingForMinOrder = Math.max(0, selectedZone.minOrder - calculations.subtotal);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!customerDetails.name.trim()) errors.name = 'Bitte Namen eingeben';
    if (!customerDetails.phone.trim() || customerDetails.phone.length < 6)
      errors.phone = 'Gültige Telefonnummer erforderlich';

    if (fulfillmentType === 'delivery') {
      if (!customerDetails.street.trim()) errors.street = 'Straße erforderlich';
      if (!customerDetails.houseNumber.trim()) errors.houseNumber = 'Hausnr. erforderlich';
    }

    if (!customerDetails.privacyAgreed) {
      errors.privacy = 'Bitte stimmen Sie den Bestellbedingungen zu';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleWhatsAppDispatch = () => {
    if (!validateForm()) {
      setActiveTab('checkout');
      return;
    }

    const orderNumber = `SS-${Date.now().toString().slice(-4)}`;
    const url = buildWhatsAppLink(
      orderNumber,
      items,
      { ...customerDetails, fulfillmentType, postalCode },
      calculations
    );

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E6B84A', '#F5C75D', '#FFFFFF'],
      });
    } catch {
      // Ignore if canvas-confetti is not loaded
    }

    setOrderSent(true);
    window.open(url, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Slide-Over Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative z-10 flex h-full w-full max-w-xl flex-col bg-[#0F0F13] border-l border-white/10 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E6B84A]/10 text-[#E6B84A]">
                  <ShoppingBag className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#FDFBF7]">Ihr Schmiede-Warenkorb</h2>
                  <p className="text-xs text-[#C4BFB5]">
                    {itemCount} {itemCount === 1 ? 'Position' : 'Positionen'} · Frische Zubereitung
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="rounded-lg p-2 text-xs text-[#C4BFB5] hover:text-rose-400 hover:bg-white/5 transition-colors"
                    title="Warenkorb leeren"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
                <button
                  onClick={closeCart}
                  className="rounded-xl p-2 text-[#C4BFB5] hover:bg-white/5 hover:text-[#FDFBF7] transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Empty State */}
            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/5 text-[#E6B84A] mb-4">
                  <ShoppingBag className="h-10 w-10 opacity-70" />
                </div>
                <h3 className="text-xl font-bold text-[#FDFBF7]">Ihr Warenkorb ist noch leer</h3>
                <p className="mt-2 text-sm text-[#C4BFB5] max-w-xs">
                  Entdecken Sie unsere legendären Schnitzel-Kreationen oder konfigurieren Sie Ihr
                  Wunsch-Schnitzel nach Maß.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={closeCart}
                    className="rounded-xl bg-[#E6B84A] px-5 py-2.5 text-sm font-bold text-[#0A0A0C] hover:bg-[#F5C75D] transition-colors"
                  >
                    Zur Speisekarte
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Fulfillment Tabs */}
                <div className="grid grid-cols-2 gap-2 p-4 border-b border-white/5 bg-[#141418]">
                  <button
                    onClick={() => {
                      setFulfillmentType('pickup');
                      updateCustomerDetails({ fulfillmentType: 'pickup' });
                    }}
                    className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition-all ${
                      fulfillmentType === 'pickup'
                        ? 'bg-[#E6B84A] text-[#0A0A0C] shadow-md shadow-[#E6B84A]/20'
                        : 'bg-[#1C1C22] text-[#C4BFB5] hover:text-[#FDFBF7]'
                    }`}
                  >
                    <Store className="h-4 w-4" />
                    <span>Selbstabholung</span>
                    <span className="rounded-md bg-black/20 px-1.5 py-0.5 text-[10px]">
                      -10% Rabatt
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setFulfillmentType('delivery');
                      updateCustomerDetails({ fulfillmentType: 'delivery' });
                    }}
                    className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition-all ${
                      fulfillmentType === 'delivery'
                        ? 'bg-[#E6B84A] text-[#0A0A0C] shadow-md shadow-[#E6B84A]/20'
                        : 'bg-[#1C1C22] text-[#C4BFB5] hover:text-[#FDFBF7]'
                    }`}
                  >
                    <Car className="h-4 w-4" />
                    <span>Lieferung (MG)</span>
                  </button>
                </div>

                {/* Delivery Zone / PLZ Picker */}
                {fulfillmentType === 'delivery' && (
                  <div className="bg-[#181820] px-4 py-3 border-b border-white/5">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-[#C4BFB5]">Liefergebiet in Mönchengladbach:</span>
                      <span className="font-semibold text-[#E6B84A]">{selectedZone.name}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={postalCode}
                        onChange={(e) => {
                          setPostalCode(e.target.value);
                          updateCustomerDetails({ postalCode: e.target.value });
                        }}
                        className="rounded-lg bg-[#22222A] px-3 py-1.5 text-xs text-[#FDFBF7] border border-white/10 focus:border-[#E6B84A] focus:outline-none"
                      >
                        <option value="41061">41061 (MG-Mitte / Bismarckstr.)</option>
                        <option value="41063">41063 (Windberg / Eicken)</option>
                        <option value="41065">41065 (Lürrip / Volksgarten)</option>
                        <option value="41066">41066 (Neuwerk / Bettrath)</option>
                        <option value="41236">41236 (Rheydt-Mitte)</option>
                        <option value="41238">41238 (Giesenkirchen)</option>
                        <option value="41239">41239 (Odenkirchen)</option>
                        <option value="41352">41352 (Korschenbroich Umland)</option>
                        <option value="41748">41748 (Viersen Süd)</option>
                      </select>

                      <div className="text-[11px] text-[#C4BFB5] flex-1">
                        Min. {selectedZone.minOrder.toFixed(2).replace('.', ',')} € ·{' '}
                        {calculations.subtotal >= selectedZone.freeDeliveryThreshold
                          ? '🎉 Frei Haus'
                          : `Lieferung ${selectedZone.deliveryFee.toFixed(2).replace('.', ',')} €`}
                      </div>
                    </div>

                    {isBelowMinOrder && (
                      <div className="mt-2 flex items-center gap-2 rounded-lg bg-rose-500/10 p-2 text-xs text-rose-300 border border-rose-500/20">
                        <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
                        <span>
                          Noch{' '}
                          <strong>{missingForMinOrder.toFixed(2).replace('.', ',')} €</strong> bis
                          zum Mindestbestellwert für Ihr PLZ-Gebiet.
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Sub-Tabs: Positions vs Checkout Details */}
                <div className="flex border-b border-white/5 bg-[#121216] px-4">
                  <button
                    onClick={() => setActiveTab('cart')}
                    className={`py-2.5 px-4 text-xs font-bold border-b-2 transition-colors ${
                      activeTab === 'cart'
                        ? 'border-[#E6B84A] text-[#E6B84A]'
                        : 'border-transparent text-[#C4BFB5] hover:text-[#FDFBF7]'
                    }`}
                  >
                    1. Positionen ({itemCount})
                  </button>
                  <button
                    onClick={() => setActiveTab('checkout')}
                    className={`py-2.5 px-4 text-xs font-bold border-b-2 transition-colors ${
                      activeTab === 'checkout'
                        ? 'border-[#E6B84A] text-[#E6B84A]'
                        : 'border-transparent text-[#C4BFB5] hover:text-[#FDFBF7]'
                    }`}
                  >
                    2. Kundendaten & Bezahlung
                  </button>
                </div>

                {/* Scrollable Body */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {activeTab === 'cart' ? (
                    <>
                      {items.map((item) => (
                        <div
                          key={item.cartItemId}
                          className="rounded-xl border border-white/10 bg-[#16161C] p-3.5 transition-all hover:border-[#E6B84A]/30"
                        >
                          {item.type === 'standard' ? (
                            <div className="flex gap-3">
                              <Image
                                src={item.item.image}
                                alt={item.item.name}
                                width={64}
                                height={64}
                                className="h-16 w-16 rounded-lg object-cover"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between">
                                  <h4 className="font-semibold text-sm text-[#FDFBF7] truncate">
                                    {item.item.name}
                                  </h4>
                                  <button
                                    onClick={() => removeItem(item.cartItemId)}
                                    className="text-[#C4BFB5] hover:text-rose-400 p-1"
                                    title="Entfernen"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                                <p className="text-xs text-[#C4BFB5] mt-0.5 line-clamp-1">
                                  {item.item.subtitle || item.item.description}
                                </p>
                                <div className="mt-2.5 flex items-center justify-between">
                                  <span className="font-mono text-sm font-bold text-[#E6B84A]">
                                    {(item.item.price * item.quantity)
                                      .toFixed(2)
                                      .replace('.', ',')}{' '}
                                    €
                                  </span>
                                  <div className="flex items-center gap-2 rounded-lg bg-[#22222A] px-2 py-1">
                                    <button
                                      onClick={() => updateQuantity(item.cartItemId, -1)}
                                      className="text-[#C4BFB5] hover:text-[#FDFBF7] p-0.5"
                                    >
                                      <Minus className="h-3.5 w-3.5" />
                                    </button>
                                    <span className="text-xs font-bold text-[#FDFBF7] w-4 text-center">
                                      {item.quantity}
                                    </span>
                                    <button
                                      onClick={() => updateQuantity(item.cartItemId, 1)}
                                      className="text-[#C4BFB5] hover:text-[#FDFBF7] p-0.5"
                                    >
                                      <Plus className="h-3.5 w-3.5" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div className="flex items-start justify-between">
                                <div className="flex items-center gap-2">
                                  <span className="flex h-5 items-center rounded-md bg-[#E6B84A]/20 px-2 text-[10px] font-bold text-[#E6B84A] uppercase tracking-wider">
                                    Custom Schnitzel
                                  </span>
                                  <h4 className="font-semibold text-sm text-[#FDFBF7]">
                                    {MEAT_OPTIONS[item.config.meat]?.name}
                                  </h4>
                                </div>
                                <button
                                  onClick={() => removeItem(item.cartItemId)}
                                  className="text-[#C4BFB5] hover:text-rose-400 p-1"
                                  title="Entfernen"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>

                              <div className="mt-2 space-y-1 text-xs text-[#C4BFB5] bg-black/20 p-2.5 rounded-lg border border-white/5">
                                <div>
                                  • <strong className="text-[#FDFBF7]">Größe:</strong>{' '}
                                  {SIZE_OPTIONS[item.config.size]?.name}
                                </div>
                                <div>
                                  • <strong className="text-[#FDFBF7]">Panade:</strong>{' '}
                                  {CRUST_OPTIONS[item.config.crust]?.name}
                                </div>
                                <div>
                                  • <strong className="text-[#FDFBF7]">Sauce:</strong>{' '}
                                  {SAUCE_OPTIONS[item.config.sauce]?.name}
                                  {item.config.sauceSeparated && (
                                    <span className="ml-1 text-[#E6B84A] text-[11px] font-medium">
                                      (separat im Becher)
                                    </span>
                                  )}
                                </div>
                                <div>
                                  • <strong className="text-[#FDFBF7]">Beilage:</strong>{' '}
                                  {SIDE_OPTIONS[item.config.side]?.name}
                                </div>
                                {item.config.extras.length > 0 && (
                                  <div>
                                    • <strong className="text-[#FDFBF7]">Extras:</strong>{' '}
                                    {item.config.extras
                                      .map((e) => EXTRA_OPTIONS[e]?.name)
                                      .join(', ')}
                                  </div>
                                )}
                              </div>

                              <div className="mt-3 flex items-center justify-between">
                                <span className="font-mono text-sm font-bold text-[#E6B84A]">
                                  {(item.config.unitPrice * item.quantity)
                                    .toFixed(2)
                                    .replace('.', ',')}{' '}
                                  €
                                </span>
                                <div className="flex items-center gap-2 rounded-lg bg-[#22222A] px-2 py-1">
                                  <button
                                    onClick={() => updateQuantity(item.cartItemId, -1)}
                                    className="text-[#C4BFB5] hover:text-[#FDFBF7] p-0.5"
                                  >
                                    <Minus className="h-3.5 w-3.5" />
                                  </button>
                                  <span className="text-xs font-bold text-[#FDFBF7] w-4 text-center">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => updateQuantity(item.cartItemId, 1)}
                                    className="text-[#C4BFB5] hover:text-[#FDFBF7] p-0.5"
                                  >
                                    <Plus className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}

                      {/* Tip Selector */}
                      <div className="mt-4 rounded-xl border border-white/5 bg-[#141418] p-3.5">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-[#FDFBF7] flex items-center gap-1.5">
                            <Sparkles className="h-3.5 w-3.5 text-[#E6B84A]" />
                            Trinkgeld für das Schmiede-Team:
                          </span>
                          <span className="text-xs font-mono font-bold text-[#E6B84A]">
                            {calculations.tipAmount.toFixed(2).replace('.', ',')} €
                          </span>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          {[0, 10, 15, 20].map((pct) => (
                            <button
                              key={pct}
                              onClick={() => setTipPercent(pct)}
                              className={`rounded-lg py-1.5 text-xs font-bold transition-all ${
                                tipPercent === pct
                                  ? 'bg-[#E6B84A] text-[#0A0A0C]'
                                  : 'bg-[#22222A] text-[#C4BFB5] hover:text-[#FDFBF7]'
                              }`}
                            >
                              {pct === 0 ? 'Kein' : `${pct}%`}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    /* Checkout Tab */
                    <div className="space-y-3.5">
                      <div className="rounded-xl border border-white/10 bg-[#16161C] p-3.5 space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#E6B84A]">
                          Kontaktdaten für die Bestellung
                        </h4>

                        <div>
                          <label className="block text-xs font-medium text-[#C4BFB5] mb-1">
                            Vollständiger Name *
                          </label>
                          <input
                            type="text"
                            placeholder="z.B. Max Mustermann"
                            value={customerDetails.name}
                            onChange={(e) => updateCustomerDetails({ name: e.target.value })}
                            className={`w-full rounded-lg bg-[#22222A] px-3 py-2 text-sm text-[#FDFBF7] border ${
                              formErrors.name ? 'border-rose-500' : 'border-white/10'
                            } focus:border-[#E6B84A] focus:outline-none`}
                          />
                          {formErrors.name && (
                            <p className="text-[11px] text-rose-400 mt-1">{formErrors.name}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-[#C4BFB5] mb-1">
                            Telefonnummer (für Rückfragen / Fahrer) *
                          </label>
                          <input
                            type="tel"
                            placeholder="z.B. 0172 1234567"
                            value={customerDetails.phone}
                            onChange={(e) => updateCustomerDetails({ phone: e.target.value })}
                            className={`w-full rounded-lg bg-[#22222A] px-3 py-2 text-sm text-[#FDFBF7] border ${
                              formErrors.phone ? 'border-rose-500' : 'border-white/10'
                            } focus:border-[#E6B84A] focus:outline-none`}
                          />
                          {formErrors.phone && (
                            <p className="text-[11px] text-rose-400 mt-1">{formErrors.phone}</p>
                          )}
                        </div>

                        {fulfillmentType === 'delivery' && (
                          <div className="grid grid-cols-3 gap-2">
                            <div className="col-span-2">
                              <label className="block text-xs font-medium text-[#C4BFB5] mb-1">
                                Straße *
                              </label>
                              <input
                                type="text"
                                placeholder="Bismarckstraße"
                                value={customerDetails.street}
                                onChange={(e) => updateCustomerDetails({ street: e.target.value })}
                                className={`w-full rounded-lg bg-[#22222A] px-3 py-2 text-sm text-[#FDFBF7] border ${
                                  formErrors.street ? 'border-rose-500' : 'border-white/10'
                                } focus:border-[#E6B84A] focus:outline-none`}
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-[#C4BFB5] mb-1">
                                Hausnr. *
                              </label>
                              <input
                                type="text"
                                placeholder="45"
                                value={customerDetails.houseNumber}
                                onChange={(e) =>
                                  updateCustomerDetails({ houseNumber: e.target.value })
                                }
                                className={`w-full rounded-lg bg-[#22222A] px-3 py-2 text-sm text-[#FDFBF7] border ${
                                  formErrors.houseNumber ? 'border-rose-500' : 'border-white/10'
                                } focus:border-[#E6B84A] focus:outline-none`}
                              />
                            </div>
                            <div className="col-span-3">
                              <label className="block text-xs font-medium text-[#C4BFB5] mb-1">
                                Zusatzangaben (Etage, Klingelname, Hinterhaus)
                              </label>
                              <input
                                type="text"
                                placeholder="z.B. 2. OG rechts, Klingel Mustermann"
                                value={customerDetails.floorNotes || ''}
                                onChange={(e) =>
                                  updateCustomerDetails({ floorNotes: e.target.value })
                                }
                                className="w-full rounded-lg bg-[#22222A] px-3 py-2 text-sm text-[#FDFBF7] border border-white/10 focus:border-[#E6B84A] focus:outline-none"
                              />
                            </div>
                          </div>
                        )}

                        <div>
                          <label className="block text-xs font-medium text-[#C4BFB5] mb-1">
                            Wunschzeit
                          </label>
                          <select
                            value={customerDetails.preferredTime}
                            onChange={(e) =>
                              updateCustomerDetails({ preferredTime: e.target.value })
                            }
                            className="w-full rounded-lg bg-[#22222A] px-3 py-2 text-sm text-[#FDFBF7] border border-white/10 focus:border-[#E6B84A] focus:outline-none"
                          >
                            <option>Schnellstmöglich (ca. 30–45 Min)</option>
                            <option>In ca. 60 Minuten</option>
                            <option>In ca. 90 Minuten</option>
                            <option>Vorbestellung für heute Abend 18:30 Uhr</option>
                            <option>Vorbestellung für heute Abend 19:30 Uhr</option>
                            <option>Vorbestellung für heute Abend 20:30 Uhr</option>
                          </select>
                        </div>
                      </div>

                      {/* Payment Method Pre-Selection */}
                      <div className="rounded-xl border border-white/10 bg-[#16161C] p-3.5 space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#E6B84A]">
                          Gewünschte Zahlungsart vor Ort
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {[
                            {
                              id: 'cash',
                              label: 'Bar passend',
                              icon: DollarSign,
                              desc: 'An Haustür / Theke',
                            },
                            {
                              id: 'card',
                              label: 'EC / Karte',
                              icon: CreditCard,
                              desc: 'Mobiles SumUp Terminal',
                            },
                            {
                              id: 'paypal',
                              label: 'PayPal QR',
                              icon: QrCode,
                              desc: 'Per App vor Ort',
                            },
                          ].map((pay) => {
                            const Icon = pay.icon;
                            const isSelected = customerDetails.paymentMethod === pay.id;
                            return (
                              <button
                                key={pay.id}
                                type="button"
                                onClick={() =>
                                  updateCustomerDetails({
                                    paymentMethod: pay.id as PaymentMethod,
                                  })
                                }
                                className={`flex flex-col items-center justify-center rounded-xl p-2.5 text-center transition-all border ${
                                  isSelected
                                    ? 'border-[#E6B84A] bg-[#E6B84A]/10 text-[#FDFBF7]'
                                    : 'border-white/5 bg-[#22222A] text-[#C4BFB5] hover:border-white/20'
                                }`}
                              >
                                <Icon
                                  className={`h-5 w-5 mb-1 ${
                                    isSelected ? 'text-[#E6B84A]' : 'text-[#C4BFB5]'
                                  }`}
                                />
                                <span className="text-xs font-bold">{pay.label}</span>
                                <span className="text-[10px] text-[#C4BFB5] mt-0.5">{pay.desc}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Kitchen Note */}
                      <div className="rounded-xl border border-white/10 bg-[#16161C] p-3.5">
                        <label className="block text-xs font-medium text-[#C4BFB5] mb-1">
                          Notiz an die Schmiede-Küche (optional)
                        </label>
                        <input
                          type="text"
                          placeholder="z.B. Bitte Besteck beilegen, Sauce extra heiß"
                          value={customerDetails.notes || ''}
                          onChange={(e) => updateCustomerDetails({ notes: e.target.value })}
                          className="w-full rounded-lg bg-[#22222A] px-3 py-2 text-sm text-[#FDFBF7] border border-white/10 focus:border-[#E6B84A] focus:outline-none"
                        />
                      </div>

                      {/* Legal Compliance Checkbox (§ 312j BGB / PAngV) */}
                      <div className="rounded-xl border border-white/5 bg-[#141418] p-3">
                        <label className="flex items-start gap-2.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={customerDetails.privacyAgreed}
                            onChange={(e) =>
                              updateCustomerDetails({ privacyAgreed: e.target.checked })
                            }
                            className="mt-1 h-4 w-4 rounded border-white/20 bg-[#22222A] text-[#E6B84A] focus:ring-0"
                          />
                          <span className="text-xs text-[#C4BFB5] leading-relaxed">
                            Ich willige in die Datenübermittlung zur Auftragsabwicklung gemäß der{' '}
                            <span className="text-[#E6B84A] underline">Datenschutzerklärung</span>{' '}
                            ein. Alle Preise verstehen sich inkl. ges. MwSt. (§ 312j BGB).
                          </span>
                        </label>
                        {formErrors.privacy && (
                          <p className="text-[11px] text-rose-400 mt-1.5 ml-6">
                            {formErrors.privacy}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer with Calculations & 1-Click WhatsApp Button */}
                <div className="border-t border-white/10 bg-[#141418] p-4 sm:p-5 space-y-3">
                  <div className="space-y-1.5 text-xs text-[#C4BFB5]">
                    <div className="flex justify-between">
                      <span>Zwischensumme:</span>
                      <span className="font-mono text-[#FDFBF7]">
                        {calculations.subtotal.toFixed(2).replace('.', ',')} €
                      </span>
                    </div>

                    {calculations.pickupDiscount > 0 && (
                      <div className="flex justify-between text-emerald-400 font-semibold">
                        <span>Selbstabholer-Rabatt (10%):</span>
                        <span className="font-mono">
                          -{calculations.pickupDiscount.toFixed(2).replace('.', ',')} €
                        </span>
                      </div>
                    )}

                    {fulfillmentType === 'delivery' && (
                      <div className="flex justify-between">
                        <span>Lieferkosten ({selectedZone.name.split('(')[0].trim()}):</span>
                        <span className="font-mono text-[#FDFBF7]">
                          {calculations.deliveryFee === 0
                            ? 'Kostenlos (Frei Haus)'
                            : `${calculations.deliveryFee.toFixed(2).replace('.', ',')} €`}
                        </span>
                      </div>
                    )}

                    {calculations.tipAmount > 0 && (
                      <div className="flex justify-between">
                        <span>Trinkgeld für das Team:</span>
                        <span className="font-mono text-[#FDFBF7]">
                          {calculations.tipAmount.toFixed(2).replace('.', ',')} €
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between pt-2 border-t border-white/10 text-base font-bold text-[#FDFBF7]">
                      <span>Gesamtbetrag:</span>
                      <span className="font-mono text-xl text-[#E6B84A]">
                        {calculations.total.toFixed(2).replace('.', ',')} €
                      </span>
                    </div>

                    <div className="text-[10px] text-[#C4BFB5]/70 flex justify-between">
                      <span>inkl. 7% MwSt. auf Speisen: {calculations.taxFood7.toFixed(2).replace('.', ',')} €</span>
                      <span>19% MwSt.: {calculations.taxDrinks19.toFixed(2).replace('.', ',')} €</span>
                    </div>
                  </div>

                  {/* Primary WhatsApp Dispatch Button */}
                  <button
                    disabled={isBelowMinOrder}
                    onClick={handleWhatsAppDispatch}
                    className={`w-full relative flex items-center justify-center gap-2.5 rounded-xl py-3.5 px-4 text-sm font-black transition-all ${
                      isBelowMinOrder
                        ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white hover:brightness-110 shadow-lg shadow-[#25D366]/20'
                    }`}
                  >
                    <MessageSquare className="h-5 w-5 fill-current" />
                    <span>Bestellung via WhatsApp aufgeben (1-Klick)</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  {orderSent && (
                    <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-2.5 text-center text-xs text-emerald-300 flex items-center justify-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      <span>
                        WhatsApp wurde geöffnet! Bitte senden Sie die Nachricht jetzt ab.
                      </span>
                    </div>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
