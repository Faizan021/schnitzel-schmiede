'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar as CalendarIcon,
  Users,
  Clock,
  ShieldAlert,
  CheckCircle2,
  Download,
  Utensils,
  MessageSquare,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../providers/LanguageContext';
import { getKitchenWhatsAppNumber } from '@/lib/utils/whatsapp';

interface TimeSlot {
  time: string;
  availableSeats: number;
  isPeak: boolean;
  isLocked: boolean;
}

export function ReservationForm() {
  const { t, lang } = useLanguage();
  const isEn = lang === 'en';

  const [date, setDate] = useState('2026-10-25');
  const [minDate, setMinDate] = useState('2026-10-25');

  React.useEffect(() => {
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];
    queueMicrotask(() => {
      setDate(dateStr);
      setMinDate(dateStr);
    });
  }, []);

  const [guests, setGuests] = useState(2);
  const [selectedTime, setSelectedTime] = useState('18:30');
  const [seatingArea, setSeatingArea] = useState<'indoor' | 'terrace'>('indoor');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const selectedDayOfWeek = new Date(date).getDay();
  const isSunday = selectedDayOfWeek === 0;
  const isWeekendPeak = selectedDayOfWeek === 5 || selectedDayOfWeek === 6; // Friday / Saturday

  // Dynamic capacity guard slots based on actual opening hours (Mo-Fr 16:30, Sa 16:00, So 12:00)
  const timeSlots: TimeSlot[] = isSunday
    ? [
        { time: '12:00', availableSeats: 20, isPeak: false, isLocked: false },
        { time: '13:00', availableSeats: 16, isPeak: false, isLocked: false },
        { time: '14:30', availableSeats: 18, isPeak: false, isLocked: false },
        { time: '16:00', availableSeats: 20, isPeak: false, isLocked: false },
        { time: '17:00', availableSeats: 24, isPeak: false, isLocked: false },
        { time: '18:00', availableSeats: 14, isPeak: true, isLocked: false },
        { time: '18:30', availableSeats: 12, isPeak: true, isLocked: false },
        { time: '19:00', availableSeats: 8, isPeak: true, isLocked: false },
        { time: '19:30', availableSeats: 10, isPeak: true, isLocked: false },
        { time: '20:30', availableSeats: 22, isPeak: false, isLocked: false },
      ]
    : [
        { time: '16:30', availableSeats: 24, isPeak: false, isLocked: false },
        { time: '17:00', availableSeats: 20, isPeak: false, isLocked: false },
        { time: '17:30', availableSeats: 20, isPeak: false, isLocked: false },
        { time: '18:00', availableSeats: isWeekendPeak ? 4 : 14, isPeak: true, isLocked: isWeekendPeak && guests > 6 },
        { time: '18:30', availableSeats: isWeekendPeak ? 2 : 12, isPeak: true, isLocked: isWeekendPeak && guests > 4 },
        { time: '19:00', availableSeats: isWeekendPeak ? 0 : 8, isPeak: true, isLocked: isWeekendPeak },
        { time: '19:30', availableSeats: isWeekendPeak ? 4 : 10, isPeak: true, isLocked: isWeekendPeak && guests > 6 },
        { time: '20:00', availableSeats: 18, isPeak: false, isLocked: false },
        { time: '20:30', availableSeats: 22, isPeak: false, isLocked: false },
      ];

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!name.trim()) errors.name = isEn ? 'Please enter your name' : 'Bitte Namen eingeben';
    if (!phone.trim() || phone.length < 6) errors.phone = isEn ? 'Phone number required' : 'Telefonnummer für Rückfragen erforderlich';
    if (!email.trim() || !email.includes('@')) errors.email = isEn ? 'Valid email required' : 'Gültige E-Mail erforderlich';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const ref = `TISCH-MG-${Date.now().toString().slice(-4)}`;
    setBookingRef(ref);
    setIsSuccess(true);

    const whatsappText = [
      '🔥 [SCHNITZEL SCHMIEDE MÖNCHENGLADBACH · Dohler Str. 269]',
      '📍 RESTAURANT: Die Schnitzel Schmiede (Dohler Str. 269, 41238 MG)',
      `📅 *TISCHRESERVIERUNG #${ref}*`,
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      `👤 Name: *${name}*`,
      `📞 Telefon: ${phone}`,
      `✉️ E-Mail: ${email}`,
      `👥 Personenanzahl: *${guests} Gäste*`,
      `⏰ Datum & Uhrzeit: *${date} um ${selectedTime} Uhr*`,
      `🪑 Bereich: ${seatingArea === 'indoor' ? 'Gastraum Innen' : 'Außenterrasse'}`,
      specialRequest ? `💬 Wünsche: "${specialRequest}"` : '',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      'Ich bitte um kurze Bestätigung der Tischreservierung.',
    ]
      .filter(Boolean)
      .join('\n');

    const whatsappUrl = `https://wa.me/${getKitchenWhatsAppNumber()}?text=${encodeURIComponent(whatsappText)}`;

    if (typeof window !== 'undefined') {
      window.open(whatsappUrl, '_blank');
    }

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#D4A347', '#E5B24E', '#10B981'],
      });
    } catch {
      // Ignore
    }
  };

  const downloadIcs = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Schnitzel Schmiede MG//Tischreservierung//DE',
      'BEGIN:VEVENT',
      `UID:${bookingRef}@schnitzel-schmiede-mg.de`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTSTART:${date.replace(/-/g, '')}T${selectedTime.replace(':', '')}00`,
      `DTEND:${date.replace(/-/g, '')}T${(parseInt(selectedTime.split(':')[0]) + 2).toString().padStart(2, '0')}${selectedTime.split(':')[1]}00`,
      'SUMMARY:Tischreservierung - Schnitzel Schmiede Mönchengladbach',
      `DESCRIPTION:Reservierung für ${guests} Personen auf den Namen ${name}. Buchungs-Nr: ${bookingRef}. Bereich: ${seatingArea === 'indoor' ? 'Gastraum Innen' : 'Außenterrasse'}.`,
      'LOCATION:Schnitzel Schmiede\\, Dohler Straße 269\\, 41238 Mönchengladbach',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `SchnitzelSchmiede-Reservierung-${date}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#e8d5be] bg-white/80 backdrop-blur-md px-4 py-1.5 text-xs font-bold text-[#16202a] mb-4 shadow-sm">
          <Utensils className="h-3.5 w-3.5 text-[#4b3b2f]" />
          <span>{t.reservation.tagline}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#16202a] font-serif">
          {t.reservation.heading}
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[#4b3b2f]">
          {t.reservation.subtitle}
        </p>
      </div>

      {/* Stitch Screen 05: Atmosphere & Experience Selection */}
      <div className="rounded-2xl border border-white/95 bg-white/85 p-5 sm:p-6 mb-8 shadow-md shadow-[#16202a]/5 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e8d5be]/60 pb-4">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#4b3b2f] uppercase tracking-wider block">
              VIP RESERVIERUNG · DIE PRIVATE TAFEL
            </span>
            <h3 className="text-lg sm:text-xl font-bold font-serif text-[#16202a] mt-0.5">
              Dohler Straße 269 · 41238 Mönchengladbach
            </h3>
          </div>
          <span className="text-xs font-mono font-bold text-[#16202a] bg-[#ffedd5] px-3 py-1.5 rounded-lg border border-[#e8d5be] self-start sm:self-auto">
            KAPAZITÄT: 45 PLÄTZE
          </span>
        </div>

        {/* 3 Experience Choices from Stitch */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
          <div className="p-3.5 rounded-xl bg-[#fffbf5] border border-[#e8d5be]/60 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#16202a]">Schmiede-Taverne</span>
              <span className="text-[9px] font-mono text-emerald-700 font-bold uppercase bg-emerald-100 px-1.5 py-0.5 rounded">1-8 GÄSTE</span>
            </div>
            <p className="text-[11px] text-[#4b3b2f]">
              Hauptsaal mit Sichtküche, knisterndem Schmiedefeuer und offener Bratstation.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-[#fffbf5] border border-[#e8d5be]/60 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#16202a]">The Blacksmith&apos;s Vault</span>
              <span className="text-[9px] font-mono text-[#16202a] font-bold uppercase bg-[#ffedd5] px-1.5 py-0.5 rounded">6-12 PERS.</span>
            </div>
            <p className="text-[11px] text-[#4b3b2f]">
              Exklusiver Gewölbekeller. Absolute Privatsphäre mit eigenem Sommelier.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-[#fffbf5] border border-[#e8d5be]/60 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#16202a]">Chef&apos;s Counter</span>
              <span className="text-[9px] font-mono text-[#16202a] font-bold uppercase bg-[#ffedd5] px-1.5 py-0.5 rounded">MAX. 4 PLÄTZE</span>
            </div>
            <p className="text-[11px] text-[#4b3b2f]">
              Direkt am Feuerofen. 4-Gänge Menübegleitung aus erster Hand vom Küchenchef.
            </p>
          </div>
        </div>
      </div>

      {isSuccess ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl border border-emerald-300 bg-white/95 p-8 text-center shadow-xl max-w-xl mx-auto text-[#16202a]"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 mx-auto mb-4">
            <CheckCircle2 className="h-10 w-10" />
          </div>

          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
            {t.reservation.successTag}
          </span>
          <h2 className="text-2xl font-bold text-[#16202a] font-serif mt-1">
            {t.reservation.successHeading}
          </h2>
          <p className="text-xs text-[#4b3b2f] mt-2">
            {t.reservation.bookingNumber}: <strong className="text-[#16202a]">{bookingRef}</strong>
          </p>

          <div className="my-6 rounded-xl border border-[#e8d5be]/60 bg-[#fffbf5] p-4 text-xs text-left space-y-2">
            <div className="flex justify-between">
              <span className="text-[#4b3b2f]">{t.reservation.guest}:</span>
              <span className="font-bold text-[#16202a]">{name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#4b3b2f]">{t.reservation.dateTime}:</span>
              <span className="font-bold text-[#16202a]">
                {date} {isEn ? 'at' : 'um'} {selectedTime} {isEn ? '' : 'Uhr'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#4b3b2f]">{t.reservation.partySize}:</span>
              <span className="font-bold text-[#16202a]">{guests} {isEn ? 'Guests' : 'Gäste'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#4b3b2f]">{t.reservation.seatingArea}:</span>
              <span className="font-bold text-[#16202a]">
                {seatingArea === 'indoor' ? t.reservation.indoor : t.reservation.terrace}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#4b3b2f]">{t.reservation.location}:</span>
              <span className="font-bold text-[#16202a]">Dohler Str. 269, Mönchengladbach</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`https://wa.me/${getKitchenWhatsAppNumber()}?text=${encodeURIComponent(
                `🔥 [SCHNITZEL SCHMIEDE MÖNCHENGLADBACH · Dohler Str. 269]\n📍 RESTAURANT: Die Schnitzel Schmiede\n\n📅 TISCHRESERVIERUNG #${bookingRef}\nName: ${name}\nGäste: ${guests} Personen\nDatum: ${date} um ${selectedTime} Uhr\nBereich: ${
                  seatingArea === 'indoor' ? 'Innenbereich' : 'Terrasse'
                }${specialRequest ? `\nWunsch: ${specialRequest}` : ''}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#20ba59] transition-colors cursor-pointer shadow-md shadow-[#25D366]/20"
            >
              <MessageSquare className="h-4 w-4" />
              <span>{isEn ? 'Send via WhatsApp' : 'Per WhatsApp bestätigen'}</span>
            </a>
            <button
              onClick={downloadIcs}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#d99036] hover:bg-[#85b0cb] px-5 py-2.5 text-xs font-black text-[#16202a] transition-colors cursor-pointer shadow-sm"
            >
              <Download className="h-4 w-4" />
              <span>{t.reservation.saveCalendar}</span>
            </button>
            <button
              onClick={() => setIsSuccess(false)}
              className="rounded-xl border border-[#e8d5be] px-4 py-2.5 text-xs text-[#4b3b2f] hover:text-[#16202a] transition-colors cursor-pointer"
            >
              {t.reservation.anotherBooking}
            </button>
          </div>
        </motion.div>
      ) : (
        <form
          onSubmit={handleBooking}
          className="rounded-2xl border border-white/95 bg-white/85 p-6 sm:p-8 shadow-md shadow-[#16202a]/5 space-y-6 text-[#16202a]"
        >
          {/* Capacity Guard Info Banner */}
          {isWeekendPeak && (
            <div className="flex items-start gap-3 rounded-xl border border-[#e8d5be] bg-[#ffedd5]/40 p-3.5 text-xs text-[#16202a]">
              <ShieldAlert className="h-5 w-5 shrink-0 text-[#4b3b2f]" />
              <div>
                <strong>Smart Capacity Guard:</strong> {t.reservation.capacityNotice}
              </div>
            </div>
          )}

          {/* Date & Guests */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#4b3b2f] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <CalendarIcon className="h-3.5 w-3.5 text-[#4b3b2f]" />
                <span>{t.reservation.dateLabel}</span>
              </label>
              <input
                type="date"
                value={date}
                min={minDate}
                onChange={(e) => setDate(e.target.value)}
                className={`w-full rounded-xl bg-[#fffbf5] border ${
                  formErrors.date ? 'border-rose-500' : 'border-[#e8d5be]'
                } px-4 py-2.5 text-sm text-[#16202a] focus:border-[#d99036] focus:outline-none`}
              />
              {formErrors.date && (
                <p className="text-xs text-rose-600 mt-1">{formErrors.date}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-[#4b3b2f] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-[#4b3b2f]" />
                <span>{t.reservation.guestsLabel}</span>
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5, 6, 8, '10+'].map((num) => {
                  const val = typeof num === 'string' ? 10 : num;
                  const isSelected = guests === val;
                  return (
                    <button
                      type="button"
                      key={String(num)}
                      onClick={() => setGuests(val)}
                      className={`flex-1 rounded-xl py-2.5 text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#d99036] text-[#16202a] shadow-sm font-black'
                          : 'bg-[#fffbf5] text-[#4b3b2f] hover:text-[#16202a] border border-[#e8d5be]'
                      }`}
                    >
                      {num}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Time Slot Picker with Capacity Feedback */}
          <div>
            <label className="block text-xs font-bold text-[#4b3b2f] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-[#4b3b2f]" />
              <span>{t.reservation.timeLabel}</span>
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
              {timeSlots.map((slot) => {
                const isSelected = selectedTime === slot.time;
                return (
                  <button
                    type="button"
                    key={slot.time}
                    disabled={slot.isLocked}
                    onClick={() => setSelectedTime(slot.time)}
                    className={`flex flex-col items-center justify-center rounded-xl p-2.5 text-xs transition-all border cursor-pointer ${
                      slot.isLocked
                        ? 'bg-neutral-100 border-[#e8d5be]/50 text-neutral-400 cursor-not-allowed opacity-50'
                        : isSelected
                        ? 'border-[#d99036] bg-[#d99036] text-[#16202a] font-black shadow-sm'
                        : 'border-[#e8d5be] bg-[#fffbf5] text-[#16202a] hover:border-[#d99036]'
                    }`}
                  >
                    <span className="font-bold">{slot.time}</span>
                    <span className="text-[9px] mt-0.5 opacity-80">
                      {slot.isLocked ? t.reservation.fullSlot : `${slot.availableSeats} ${t.reservation.seatsLeft}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Area Preference */}
          <div>
            <label className="block text-xs font-bold text-[#4b3b2f] uppercase tracking-wider mb-2">
              {t.reservation.areaLabel}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSeatingArea('indoor')}
                className={`rounded-xl p-3 text-xs font-bold border transition-all cursor-pointer ${
                  seatingArea === 'indoor'
                    ? 'border-[#d99036] bg-[#ffedd5] text-[#16202a] font-black shadow-sm'
                    : 'border-[#e8d5be] bg-[#fffbf5] text-[#4b3b2f]'
                }`}
              >
                🏠 {t.reservation.indoor}
              </button>
              <button
                type="button"
                onClick={() => setSeatingArea('terrace')}
                className={`rounded-xl p-3 text-xs font-bold border transition-all cursor-pointer ${
                  seatingArea === 'terrace'
                    ? 'border-[#d99036] bg-[#ffedd5] text-[#16202a] font-black shadow-sm'
                    : 'border-[#e8d5be] bg-[#fffbf5] text-[#4b3b2f]'
                }`}
              >
                🌿 {t.reservation.terrace}
              </button>
            </div>
          </div>

          {/* Personal Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-[#e8d5be]/60">
            <div>
              <label className="block text-xs font-medium text-[#4b3b2f] mb-1">{t.reservation.nameLabel}</label>
              <input
                type="text"
                placeholder={isEn ? "e.g. John Doe" : "z.B. Familie Schmidt"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full rounded-xl bg-[#fffbf5] border ${
                  formErrors.name ? 'border-rose-500' : 'border-[#e8d5be]'
                } px-3 py-2 text-sm text-[#16202a] focus:border-[#d99036] focus:outline-none`}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#4b3b2f] mb-1">
                {t.reservation.phoneLabel}
              </label>
              <input
                type="tel"
                placeholder="0172 1234567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`w-full rounded-xl bg-[#fffbf5] border ${
                  formErrors.phone ? 'border-rose-500' : 'border-[#e8d5be]'
                } px-3 py-2 text-sm text-[#16202a] focus:border-[#d99036] focus:outline-none`}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#4b3b2f] mb-1">
                {t.reservation.emailLabel}
              </label>
              <input
                type="email"
                placeholder="guest@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full rounded-xl bg-[#fffbf5] border ${
                  formErrors.email ? 'border-rose-500' : 'border-[#e8d5be]'
                } px-3 py-2 text-sm text-[#16202a] focus:border-[#d99036] focus:outline-none`}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#4b3b2f] mb-1">
              {t.reservation.requestsLabel}
            </label>
            <input
              type="text"
              placeholder={t.reservation.requestsPlaceholder}
              value={specialRequest}
              onChange={(e) => setSpecialRequest(e.target.value)}
              className="w-full rounded-xl bg-[#fffbf5] border border-[#e8d5be] px-3 py-2 text-sm text-[#16202a] focus:border-[#d99036] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-[#d99036] hover:bg-[#85b0cb] py-4 text-sm font-black text-[#16202a] shadow-md transition-all cursor-pointer"
          >
            <MessageSquare className="h-5 w-5" />
            <span>
              {isEn
                ? 'Reserve Table & Send via WhatsApp (1-Click)'
                : 'Tisch anfragen & direkt per WhatsApp senden (1-Klick)'}
            </span>
          </button>
        </form>
      )}
    </div>
  );
}
