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
  Flame,
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
import { useLanguage } from '../providers/LanguageContext';
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

  const { t, lang } = useLanguage();
  const isEn = lang === 'en';

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
    if (!customerDetails.name.trim()) {
      errors.name = isEn ? 'Please enter your name' : 'Bitte Namen eingeben';
    }
    if (!customerDetails.phone.trim() || customerDetails.phone.length < 6) {
      errors.phone = isEn ? 'Valid phone number required' : 'Gültige Telefonnummer erforderlich';
    }

    if (fulfillmentType === 'delivery') {
      if (!customerDetails.street.trim()) {
        errors.street = isEn ? 'Street required' : 'Straße erforderlich';
      }
      if (!customerDetails.houseNumber.trim()) {
        errors.houseNumber = isEn ? 'House number required' : 'Hausnr. erforderlich';
      }
    }

    if (!customerDetails.privacyAgreed) {
      errors.privacy = isEn
        ? 'Please agree to the order terms'
        : 'Bitte stimmen Sie den Bestellbedingungen zu';
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

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E6B84A', '#F5C75D', '#FFFFFF'],
      });
    } catch {
      // Ignore
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
            className="relative z-10 flex h-full w-full max-w-xl flex-col bg-white/95 backdrop-blur-xl border-l border-[#b8d4e8] shadow-2xl text-[#1a3a52]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#b8d4e8]/60 p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#cce3f1] text-[#1a3a52]">
                  <ShoppingBag className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#1a3a52]">{t.cart.title}</h2>
                  <p className="text-xs text-[#2e5f7e]">
                    {itemCount} {t.cart.positions} · {isEn ? 'Fresh Preparation' : 'Frische Zubereitung'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="rounded-lg p-2 text-xs text-[#2e5f7e] hover:text-rose-600 hover:bg-[#f0f7fb] transition-colors cursor-pointer"
                    title={isEn ? "Clear Cart" : "Warenkorb leeren"}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
                <button
                  onClick={closeCart}
                  className="rounded-xl p-2 text-[#2e5f7e] hover:bg-[#f0f7fb] hover:text-[#1a3a52] transition-colors cursor-pointer"
                  aria-label={isEn ? "Close Cart" : "Schließen"}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Empty State */}
            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#f0f7fb] text-[#1a3a52] mb-4">
                  <ShoppingBag className="h-10 w-10 opacity-70" />
                </div>
                <h3 className="text-xl font-bold text-[#1a3a52]">{t.cart.emptyTitle}</h3>
                <p className="mt-2 text-sm text-[#2e5f7e] max-w-xs">
                  {t.cart.emptyDesc}
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={closeCart}
                    className="rounded-xl bg-[#9bc1d9] hover:bg-[#85b0cb] px-5 py-2.5 text-sm font-black text-[#1a3a52] transition-colors cursor-pointer shadow-sm"
                  >
                    {t.cart.exploreMenu}
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Fulfillment Tabs */}
                <div className="grid grid-cols-2 gap-2 p-4 border-b border-[#b8d4e8]/60 bg-[#edf7fc]">
                  <button
                    onClick={() => {
                      setFulfillmentType('pickup');
                      updateCustomerDetails({ fulfillmentType: 'pickup' });
                    }}
                    className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition-all cursor-pointer ${
                      fulfillmentType === 'pickup'
                        ? 'bg-[#9bc1d9] text-[#1a3a52] shadow-sm font-black'
                        : 'bg-white text-[#2e5f7e] hover:text-[#1a3a52] border border-[#b8d4e8]'
                    }`}
                  >
                    <Store className="h-4 w-4" />
                    <span>{t.cart.pickupTab}</span>
                    <span className="rounded-md bg-white/60 px-1.5 py-0.5 text-[10px]">
                      {t.cart.pickupDiscountBadge}
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setFulfillmentType('delivery');
                      updateCustomerDetails({ fulfillmentType: 'delivery' });
                    }}
                    className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition-all cursor-pointer ${
                      fulfillmentType === 'delivery'
                        ? 'bg-[#9bc1d9] text-[#1a3a52] shadow-sm font-black'
                        : 'bg-white text-[#2e5f7e] hover:text-[#1a3a52] border border-[#b8d4e8]'
                    }`}
                  >
                    <Car className="h-4 w-4" />
                    <span>{t.cart.deliveryTab}</span>
                  </button>
                </div>

                {/* Delivery Zone / PLZ Picker */}
                {fulfillmentType === 'delivery' && (
                  <div className="bg-[#f0f7fb] px-4 py-3 border-b border-[#b8d4e8]/60">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-[#2e5f7e]">{t.cart.deliveryArea}:</span>
                      <span className="font-semibold text-[#1a3a52]">{selectedZone.name}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={postalCode}
                        onChange={(e) => {
                          setPostalCode(e.target.value);
                          updateCustomerDetails({ postalCode: e.target.value });
                        }}
                        className="rounded-lg bg-white px-3 py-1.5 text-xs text-[#1a3a52] border border-[#b8d4e8] focus:border-[#9bc1d9] focus:outline-none"
                      >
                        <option value="41238">41238 (Bonnenbroich / Dohler Str.)</option>
                        <option value="41063">41063 (Windberg / Eicken)</option>
                        <option value="41065">41065 (Lürrip / Volksgarten)</option>
                        <option value="41066">41066 (Neuwerk / Bettrath)</option>
                        <option value="41236">41236 (Rheydt-Mitte)</option>
                        <option value="41238">41238 (Giesenkirchen)</option>
                        <option value="41239">41239 (Odenkirchen)</option>
                        <option value="41352">41352 (Korschenbroich Umland)</option>
                        <option value="41748">41748 (Viersen Süd)</option>
                      </select>

                      <div className="text-[11px] text-[#2e5f7e] flex-1">
                        Min. {selectedZone.minOrder.toFixed(2).replace('.', ',')} € ·{' '}
                        {calculations.subtotal >= selectedZone.freeDeliveryThreshold
                          ? (isEn ? '🎉 Free Delivery' : '🎉 Frei Haus')
                          : `${isEn ? 'Delivery' : 'Lieferung'} ${selectedZone.deliveryFee.toFixed(2).replace('.', ',')} €`}
                      </div>
                    </div>

                    {isBelowMinOrder && (
                      <div className="mt-2 flex items-center gap-2 rounded-lg bg-rose-50 p-2 text-xs text-rose-800 border border-rose-300">
                        <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
                        <span>
                          {isEn ? 'Still ' : 'Noch '}
                          <strong>{missingForMinOrder.toFixed(2).replace('.', ',')} €</strong>{' '}
                          {isEn
                            ? 'needed for minimum order in this postal code.'
                            : 'bis zum Mindestbestellwert für Ihr PLZ-Gebiet.'}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Sub-Tabs: Positions vs Checkout Details */}
                <div className="flex border-b border-[#b8d4e8]/60 bg-[#ddeef7]/50 px-4">
                  <button
                    onClick={() => setActiveTab('cart')}
                    className={`py-2.5 px-4 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
                      activeTab === 'cart'
                        ? 'border-[#1a3a52] text-[#1a3a52]'
                        : 'border-transparent text-[#2e5f7e] hover:text-[#1a3a52]'
                    }`}
                  >
                    {t.cart.tabPositions} ({itemCount})
                  </button>
                  <button
                    onClick={() => setActiveTab('checkout')}
                    className={`py-2.5 px-4 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
                      activeTab === 'checkout'
                        ? 'border-[#1a3a52] text-[#1a3a52]'
                        : 'border-transparent text-[#2e5f7e] hover:text-[#1a3a52]'
                    }`}
                  >
                    {t.cart.tabCheckout}
                  </button>
                </div>

                {/* Scrollable Body */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {activeTab === 'cart' ? (
                    <>
                      {items.map((item) => (
                        <div
                          key={item.cartItemId}
                          className="rounded-xl border border-[#b8d4e8] bg-white p-3.5 transition-all shadow-sm"
                        >
                          {item.type === 'standard' ? (
                            <div className="flex gap-3">
                              {item.item.image ? (
                                <Image
                                  src={item.item.image}
                                  alt={isEn && item.item.nameEn ? item.item.nameEn : item.item.name}
                                  width={64}
                                  height={64}
                                  className="h-16 w-16 rounded-lg object-cover"
                                />
                              ) : (
                                <div className="h-16 w-16 rounded-lg bg-[#f0f7fb] border border-[#b8d4e8]/60 flex items-center justify-center shrink-0 text-[#1a3a52]">
                                  <Flame className="h-6 w-6" />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between">
                                  <h4 className="font-semibold text-sm text-[#1a3a52] truncate">
                                    {isEn && item.item.nameEn ? item.item.nameEn : item.item.name}
                                  </h4>
                                  <button
                                    onClick={() => removeItem(item.cartItemId)}
                                    className="text-[#2e5f7e] hover:text-rose-600 p-1 cursor-pointer"
                                    title={isEn ? "Remove" : "Entfernen"}
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                                <p className="text-xs text-[#2e5f7e] mt-0.5 line-clamp-1">
                                  {isEn && item.item.subtitleEn
                                    ? item.item.subtitleEn
                                    : (item.item.subtitle || item.item.description)}
                                </p>
                                <div className="mt-2.5 flex items-center justify-between">
                                  <span className="font-mono text-sm font-bold text-[#1a3a52]">
                                    {(item.item.price * item.quantity)
                                      .toFixed(2)
                                      .replace('.', ',')}{' '}
                                    €
                                  </span>
                                  <div className="flex items-center gap-2 rounded-lg bg-[#f0f7fb] border border-[#b8d4e8]/60 px-2 py-1">
                                    <button
                                      onClick={() => updateQuantity(item.cartItemId, -1)}
                                      className="text-[#2e5f7e] hover:text-[#1a3a52] p-0.5 cursor-pointer"
                                    >
                                      <Minus className="h-3.5 w-3.5" />
                                    </button>
                                    <span className="text-xs font-bold text-[#1a3a52] w-4 text-center">
                                      {item.quantity}
                                    </span>
                                    <button
                                      onClick={() => updateQuantity(item.cartItemId, 1)}
                                      className="text-[#2e5f7e] hover:text-[#1a3a52] p-0.5 cursor-pointer"
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
                                  <span className="flex h-5 items-center rounded-md bg-[#cce3f1] px-2 text-[10px] font-bold text-[#1a3a52] uppercase tracking-wider">
                                    Custom Schnitzel
                                  </span>
                                  <h4 className="font-semibold text-sm text-[#1a3a52]">
                                    {MEAT_OPTIONS[item.config.meat]?.name}
                                  </h4>
                                </div>
                                <button
                                  onClick={() => removeItem(item.cartItemId)}
                                  className="text-[#2e5f7e] hover:text-rose-600 p-1 cursor-pointer"
                                  title={isEn ? "Remove" : "Entfernen"}
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>

                              <div className="mt-2 space-y-1 text-xs text-[#2e5f7e] bg-[#f0f7fb] p-2.5 rounded-lg border border-[#b8d4e8]/60">
                                <div>
                                  • <strong className="text-[#1a3a52]">{t.customizer.sizeLabel}:</strong>{' '}
                                  {SIZE_OPTIONS[item.config.size]?.name}
                                </div>
                                <div>
                                  • <strong className="text-[#1a3a52]">{t.customizer.crustLabel}:</strong>{' '}
                                  {CRUST_OPTIONS[item.config.crust]?.name}
                                </div>
                                <div>
                                  • <strong className="text-[#1a3a52]">{t.customizer.sauceLabel}:</strong>{' '}
                                  {SAUCE_OPTIONS[item.config.sauce]?.name}
                                  {item.config.sauceSeparated && (
                                    <span className="ml-1 text-[#1a3a52] font-bold text-[11px]">
                                      ({isEn ? 'packaged separately' : 'separat im Becher'})
                                    </span>
                                  )}
                                </div>
                                <div>
                                  • <strong className="text-[#1a3a52]">{t.customizer.sidesLabel}:</strong>{' '}
                                  {SIDE_OPTIONS[item.config.side]?.name}
                                </div>
                                {item.config.extras.length > 0 && (
                                  <div>
                                    • <strong className="text-[#1a3a52]">{t.customizer.extrasLabel}:</strong>{' '}
                                    {item.config.extras
                                      .map((e) => EXTRA_OPTIONS[e]?.name)
                                      .join(', ')}
                                  </div>
                                )}
                              </div>

                              <div className="mt-3 flex items-center justify-between">
                                <span className="font-mono text-sm font-bold text-[#1a3a52]">
                                  {(item.config.unitPrice * item.quantity)
                                    .toFixed(2)
                                    .replace('.', ',')}{' '}
                                  €
                                </span>
                                <div className="flex items-center gap-2 rounded-lg bg-[#f0f7fb] border border-[#b8d4e8]/60 px-2 py-1">
                                  <button
                                    onClick={() => updateQuantity(item.cartItemId, -1)}
                                    className="text-[#2e5f7e] hover:text-[#1a3a52] p-0.5 cursor-pointer"
                                  >
                                    <Minus className="h-3.5 w-3.5" />
                                  </button>
                                  <span className="text-xs font-bold text-[#1a3a52] w-4 text-center">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => updateQuantity(item.cartItemId, 1)}
                                    className="text-[#2e5f7e] hover:text-[#1a3a52] p-0.5 cursor-pointer"
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
                      <div className="mt-4 rounded-xl border border-[#b8d4e8] bg-white p-3.5 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-[#1a3a52] flex items-center gap-1.5">
                            <Sparkles className="h-3.5 w-3.5 text-[#2e5f7e]" />
                            {t.cart.tipLabel}
                          </span>
                          <span className="text-xs font-mono font-bold text-[#1a3a52]">
                            {calculations.tipAmount.toFixed(2).replace('.', ',')} €
                          </span>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          {[0, 10, 15, 20].map((pct) => (
                            <button
                              key={pct}
                              onClick={() => setTipPercent(pct)}
                              className={`rounded-lg py-1.5 text-xs font-bold transition-all cursor-pointer ${
                                tipPercent === pct
                                  ? 'bg-[#9bc1d9] text-[#1a3a52] shadow-sm font-black'
                                  : 'bg-[#f0f7fb] text-[#2e5f7e] hover:text-[#1a3a52] border border-[#b8d4e8]/60'
                              }`}
                            >
                              {pct === 0 ? t.cart.noneTip : `${pct}%`}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    /* Checkout Tab */
                    <div className="space-y-3.5">
                      <div className="rounded-xl border border-[#b8d4e8] bg-white p-3.5 space-y-3 shadow-sm">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#1a3a52]">
                          {t.cart.contactHeading}
                        </h4>

                        <div>
                          <label className="block text-xs font-medium text-[#2e5f7e] mb-1">
                            {t.cart.nameLabel}
                          </label>
                          <input
                            type="text"
                            placeholder={t.cart.namePlaceholder}
                            value={customerDetails.name}
                            onChange={(e) => updateCustomerDetails({ name: e.target.value })}
                            className={`w-full rounded-lg bg-[#f0f7fb] px-3 py-2 text-sm text-[#1a3a52] border ${
                              formErrors.name ? 'border-rose-500' : 'border-[#b8d4e8]'
                            } focus:border-[#9bc1d9] focus:outline-none`}
                          />
                          {formErrors.name && (
                            <p className="text-[11px] text-rose-600 mt-1">{formErrors.name}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-[#2e5f7e] mb-1">
                            {t.cart.phoneLabel}
                          </label>
                          <input
                            type="tel"
                            placeholder={t.cart.phonePlaceholder}
                            value={customerDetails.phone}
                            onChange={(e) => updateCustomerDetails({ phone: e.target.value })}
                            className={`w-full rounded-lg bg-[#f0f7fb] px-3 py-2 text-sm text-[#1a3a52] border ${
                              formErrors.phone ? 'border-rose-500' : 'border-[#b8d4e8]'
                            } focus:border-[#9bc1d9] focus:outline-none`}
                          />
                          {formErrors.phone && (
                            <p className="text-[11px] text-rose-600 mt-1">{formErrors.phone}</p>
                          )}
                        </div>

                        {fulfillmentType === 'delivery' && (
                          <div className="grid grid-cols-3 gap-2">
                            <div className="col-span-2">
                              <label className="block text-xs font-medium text-[#2e5f7e] mb-1">
                                {t.cart.streetLabel}
                              </label>
                              <input
                                type="text"
                                placeholder="Dohler Straße"
                                value={customerDetails.street}
                                onChange={(e) => updateCustomerDetails({ street: e.target.value })}
                                className={`w-full rounded-lg bg-[#f0f7fb] px-3 py-2 text-sm text-[#1a3a52] border ${
                                  formErrors.street ? 'border-rose-500' : 'border-[#b8d4e8]'
                                } focus:border-[#9bc1d9] focus:outline-none`}
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-[#2e5f7e] mb-1">
                                {t.cart.houseNumberLabel}
                              </label>
                              <input
                                type="text"
                                placeholder="45"
                                value={customerDetails.houseNumber}
                                onChange={(e) =>
                                  updateCustomerDetails({ houseNumber: e.target.value })
                                }
                                className={`w-full rounded-lg bg-[#f0f7fb] px-3 py-2 text-sm text-[#1a3a52] border ${
                                  formErrors.houseNumber ? 'border-rose-500' : 'border-[#b8d4e8]'
                                } focus:border-[#9bc1d9] focus:outline-none`}
                              />
                            </div>
                            <div className="col-span-3">
                              <label className="block text-xs font-medium text-[#2e5f7e] mb-1">
                                {t.cart.floorNotesLabel}
                              </label>
                              <input
                                type="text"
                                placeholder={t.cart.floorNotesPlaceholder}
                                value={customerDetails.floorNotes || ''}
                                onChange={(e) =>
                                  updateCustomerDetails({ floorNotes: e.target.value })
                                }
                                className="w-full rounded-lg bg-[#f0f7fb] px-3 py-2 text-sm text-[#1a3a52] border border-[#b8d4e8] focus:border-[#9bc1d9] focus:outline-none"
                              />
                            </div>
                          </div>
                        )}

                        <div>
                          <label className="block text-xs font-medium text-[#2e5f7e] mb-1">
                            {t.cart.preferredTimeLabel}
                          </label>
                          <select
                            value={customerDetails.preferredTime}
                            onChange={(e) =>
                              updateCustomerDetails({ preferredTime: e.target.value })
                            }
                            className="w-full rounded-lg bg-[#f0f7fb] px-3 py-2 text-sm text-[#1a3a52] border border-[#b8d4e8] focus:border-[#9bc1d9] focus:outline-none"
                          >
                            <option>{isEn ? 'As soon as possible (~30–45 mins)' : 'Schnellstmöglich (ca. 30–45 Min)'}</option>
                            <option>{isEn ? 'In approx. 60 minutes' : 'In ca. 60 Minuten'}</option>
                            <option>{isEn ? 'In approx. 90 minutes' : 'In ca. 90 Minuten'}</option>
                            <option>{isEn ? 'Pre-order for tonight 6:30 PM' : 'Vorbestellung für heute Abend 18:30 Uhr'}</option>
                            <option>{isEn ? 'Pre-order for tonight 7:30 PM' : 'Vorbestellung für heute Abend 19:30 Uhr'}</option>
                            <option>{isEn ? 'Pre-order for tonight 8:30 PM' : 'Vorbestellung für heute Abend 20:30 Uhr'}</option>
                          </select>
                        </div>
                      </div>

                      {/* Payment Method Pre-Selection */}
                      <div className="rounded-xl border border-[#b8d4e8] bg-white p-3.5 space-y-2 shadow-sm">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#1a3a52]">
                          {t.cart.paymentHeading}
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {[
                            {
                              id: 'cash',
                              label: isEn ? 'Exact Cash' : 'Bar passend',
                              icon: DollarSign,
                              desc: isEn ? 'At door / counter' : 'An Haustür / Theke',
                            },
                            {
                              id: 'card',
                              label: isEn ? 'EC / Card' : 'EC / Karte',
                              icon: CreditCard,
                              desc: isEn ? 'Mobile terminal' : 'Mobiles SumUp Terminal',
                            },
                            {
                              id: 'paypal',
                              label: 'PayPal QR',
                              icon: QrCode,
                              desc: isEn ? 'Via App on-site' : 'Per App vor Ort',
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
                                className={`flex flex-col items-center justify-center rounded-xl p-2.5 text-center transition-all border cursor-pointer ${
                                  isSelected
                                    ? 'border-[#9bc1d9] bg-[#cce3f1] text-[#1a3a52] font-bold shadow-sm'
                                    : 'border-[#b8d4e8]/60 bg-[#f0f7fb] text-[#2e5f7e] hover:border-[#9bc1d9]'
                                }`}
                              >
                                <Icon
                                  className={`h-5 w-5 mb-1 ${
                                    isSelected ? 'text-[#1a3a52]' : 'text-[#2e5f7e]'
                                  }`}
                                />
                                <span className="text-xs font-bold">{pay.label}</span>
                                <span className="text-[10px] text-[#2e5f7e] mt-0.5">{pay.desc}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Kitchen Note */}
                      <div className="rounded-xl border border-[#b8d4e8] bg-white p-3.5 shadow-sm">
                        <label className="block text-xs font-medium text-[#2e5f7e] mb-1">
                          {t.cart.kitchenNoteLabel}
                        </label>
                        <input
                          type="text"
                          placeholder={t.cart.kitchenNotePlaceholder}
                          value={customerDetails.notes || ''}
                          onChange={(e) => updateCustomerDetails({ notes: e.target.value })}
                          className="w-full rounded-lg bg-[#f0f7fb] px-3 py-2 text-sm text-[#1a3a52] border border-[#b8d4e8] focus:border-[#9bc1d9] focus:outline-none"
                        />
                      </div>

                      {/* Legal Compliance Checkbox */}
                      <div className="rounded-xl border border-[#b8d4e8] bg-white p-3 shadow-sm">
                        <label className="flex items-start gap-2.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={customerDetails.privacyAgreed}
                            onChange={(e) =>
                              updateCustomerDetails({ privacyAgreed: e.target.checked })
                            }
                            className="mt-1 h-4 w-4 rounded border-[#b8d4e8] text-[#1a3a52] focus:ring-0"
                          />
                          <span className="text-xs text-[#2e5f7e] leading-relaxed">
                            {t.cart.privacyConsent}
                          </span>
                        </label>
                        {formErrors.privacy && (
                          <p className="text-[11px] text-rose-600 mt-1.5 ml-6">
                            {formErrors.privacy}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer with Calculations & 1-Click WhatsApp Button */}
                <div className="border-t border-[#b8d4e8] bg-[#edf7fc] p-4 sm:p-5 space-y-3">
                  <div className="space-y-1.5 text-xs text-[#2e5f7e]">
                    <div className="flex justify-between">
                      <span>{t.cart.subtotal}:</span>
                      <span className="font-mono text-[#1a3a52] font-semibold">
                        {calculations.subtotal.toFixed(2).replace('.', ',')} €
                      </span>
                    </div>

                    {calculations.pickupDiscount > 0 && (
                      <div className="flex justify-between text-emerald-700 font-semibold">
                        <span>{t.cart.pickupDiscount} (10%):</span>
                        <span className="font-mono">
                          -{calculations.pickupDiscount.toFixed(2).replace('.', ',')} €
                        </span>
                      </div>
                    )}

                    {fulfillmentType === 'delivery' && (
                      <div className="flex justify-between">
                        <span>{t.cart.deliveryFee} ({selectedZone.name.split('(')[0].trim()}):</span>
                        <span className="font-mono text-[#1a3a52] font-semibold">
                          {calculations.deliveryFee === 0
                            ? (isEn ? 'Free Delivery' : 'Kostenlos (Frei Haus)')
                            : `${calculations.deliveryFee.toFixed(2).replace('.', ',')} €`}
                        </span>
                      </div>
                    )}

                    {calculations.tipAmount > 0 && (
                      <div className="flex justify-between">
                        <span>{t.cart.tip}:</span>
                        <span className="font-mono text-[#1a3a52] font-semibold">
                          {calculations.tipAmount.toFixed(2).replace('.', ',')} €
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between pt-2 border-t border-[#b8d4e8]/60 text-base font-bold text-[#1a3a52]">
                      <span>{t.cart.totalAmount}:</span>
                      <span className="font-mono text-xl text-[#1a3a52]">
                        {calculations.total.toFixed(2).replace('.', ',')} €
                      </span>
                    </div>

                    <div className="text-[10px] text-[#2e5f7e]/80 flex justify-between">
                      <span>{t.cart.taxFood}: {calculations.taxFood7.toFixed(2).replace('.', ',')} €</span>
                      <span>{t.cart.taxDrinks}: {calculations.taxDrinks19.toFixed(2).replace('.', ',')} €</span>
                    </div>
                  </div>

                  {/* Primary WhatsApp Dispatch Button */}
                  <button
                    disabled={isBelowMinOrder}
                    onClick={handleWhatsAppDispatch}
                    className={`w-full relative flex items-center justify-center gap-2.5 rounded-xl py-3.5 px-4 text-sm font-black transition-all cursor-pointer ${
                      isBelowMinOrder
                        ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white hover:brightness-105 shadow-lg shadow-[#25D366]/20'
                    }`}
                  >
                    <MessageSquare className="h-5 w-5 fill-current" />
                    <span>{t.cart.dispatchWhatsappBtn}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  {orderSent && (
                    <div className="rounded-lg bg-emerald-50 border border-emerald-300 p-2.5 text-center text-xs text-emerald-800 flex items-center justify-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>{t.cart.whatsappOpenedNotice}</span>
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
