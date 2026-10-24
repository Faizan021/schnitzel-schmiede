'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Calendar as CalendarIcon,
  Users,
  Clock,
  ShieldAlert,
  CheckCircle2,
  Download,
  Utensils,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../providers/LanguageContext';

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
    if (today.getDay() === 1) {
      today.setDate(today.getDate() + 1);
    }
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

  // Check if selected date is Monday
  const selectedDayOfWeek = new Date(date).getDay();
  const isMondayRuhetag = selectedDayOfWeek === 1;
  const isWeekendPeak = selectedDayOfWeek === 5 || selectedDayOfWeek === 6; // Friday / Saturday

  // Dynamic capacity guard slots
  const timeSlots: TimeSlot[] = [
    { time: '12:00', availableSeats: 24, isPeak: false, isLocked: false },
    { time: '13:00', availableSeats: 16, isPeak: false, isLocked: false },
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
    if (isMondayRuhetag) errors.date = t.reservation.mondayError;

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const ref = `TISCH-MG-${Date.now().toString().slice(-4)}`;
    setBookingRef(ref);
    setIsSuccess(true);

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
      'LOCATION:Schnitzel Schmiede\\, Bismarckstraße 45\\, 41061 Mönchengladbach',
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
        <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A347]/30 bg-[#D4A347]/10 px-4 py-1.5 text-xs font-bold text-[#E5B24E] mb-4">
          <Utensils className="h-3.5 w-3.5" />
          <span>{t.reservation.tagline}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#FBF9F5] font-serif">
          {t.reservation.heading}
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[#D5CEBF]">
          {t.reservation.subtitle}
        </p>
      </div>

      {/* Real Restaurant Atmosphere Showcase */}
      <div className="relative h-52 sm:h-72 w-full rounded-2xl overflow-hidden mb-8 border border-[#312B26] shadow-2xl group">
        <Image
          src="/images/restaurant/gastraum-interior.jpg"
          alt={isEn ? "Schnitzel Schmiede Restaurant Dining Room" : "Schnitzel Schmiede Mönchengladbach Gastraum"}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 896px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121110] via-transparent to-black/30" />
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div>
            <span className="rounded-md bg-[#D4A347] text-[#121110] px-2 py-0.5 text-[10px] font-black uppercase">
              {isEn ? "Authentic Gastraum" : "Original Gastraum"}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-[#FBF9F5] font-serif mt-1">
              Bismarckstraße 45, 41061 Mönchengladbach
            </h3>
          </div>
          <span className="text-xs text-[#E5B24E] font-semibold hidden sm:inline-block">
            {isEn ? "Cozy dining room · Warm brick fireplace" : "Gemütlicher Gastraum mit Kamin · 40 Plätze"}
          </span>
        </div>
      </div>

      {isSuccess ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl border border-emerald-500/30 bg-[#1C1A18] p-8 text-center shadow-2xl max-w-xl mx-auto"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 mx-auto mb-4">
            <CheckCircle2 className="h-10 w-10" />
          </div>

          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
            {t.reservation.successTag}
          </span>
          <h2 className="text-2xl font-bold text-[#FBF9F5] font-serif mt-1">
            {t.reservation.successHeading}
          </h2>
          <p className="text-xs text-[#D5CEBF] mt-2">
            {t.reservation.bookingNumber}: <strong className="text-[#E5B24E]">{bookingRef}</strong>
          </p>

          <div className="my-6 rounded-xl border border-[#312B26] bg-[#24211D] p-4 text-xs text-left space-y-2">
            <div className="flex justify-between">
              <span className="text-[#C4BFB5]">{t.reservation.guest}:</span>
              <span className="font-bold text-[#FBF9F5]">{name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#C4BFB5]">{t.reservation.dateTime}:</span>
              <span className="font-bold text-[#E5B24E]">
                {date} {isEn ? 'at' : 'um'} {selectedTime} {isEn ? '' : 'Uhr'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#C4BFB5]">{t.reservation.partySize}:</span>
              <span className="font-bold text-[#FBF9F5]">{guests} {isEn ? 'Guests' : 'Gäste'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#C4BFB5]">{t.reservation.seatingArea}:</span>
              <span className="font-bold text-[#FBF9F5]">
                {seatingArea === 'indoor' ? t.reservation.indoor : t.reservation.terrace}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#C4BFB5]">{t.reservation.location}:</span>
              <span className="font-bold text-[#FBF9F5]">Bismarckstr. 45, Mönchengladbach</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={downloadIcs}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#D4A347] px-5 py-2.5 text-xs font-bold text-[#121110] hover:bg-[#E5B24E] transition-colors cursor-pointer"
            >
              <Download className="h-4 w-4" />
              <span>{t.reservation.saveCalendar}</span>
            </button>
            <button
              onClick={() => setIsSuccess(false)}
              className="rounded-xl border border-[#312B26] px-4 py-2.5 text-xs text-[#D5CEBF] hover:text-[#FBF9F5] transition-colors cursor-pointer"
            >
              {t.reservation.anotherBooking}
            </button>
          </div>
        </motion.div>
      ) : (
        <form
          onSubmit={handleBooking}
          className="rounded-2xl border border-[#312B26] bg-[#1C1A18] p-6 sm:p-8 shadow-xl space-y-6"
        >
          {/* Capacity Guard Info Banner */}
          {isWeekendPeak && (
            <div className="flex items-start gap-3 rounded-xl border border-[#D4A347]/30 bg-[#D4A347]/10 p-3.5 text-xs text-[#E5B24E]">
              <ShieldAlert className="h-5 w-5 shrink-0" />
              <div>
                <strong>Smart Capacity Guard:</strong> {t.reservation.capacityNotice}
              </div>
            </div>
          )}

          {/* Date & Guests */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#D5CEBF] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <CalendarIcon className="h-3.5 w-3.5 text-[#E5B24E]" />
                <span>{t.reservation.dateLabel}</span>
              </label>
              <input
                type="date"
                value={date}
                min={minDate}
                onChange={(e) => setDate(e.target.value)}
                className={`w-full rounded-xl bg-[#24211D] border ${
                  formErrors.date ? 'border-rose-500' : 'border-[#312B26]'
                } px-4 py-2.5 text-sm text-[#FBF9F5] focus:border-[#D4A347] focus:outline-none`}
              />
              {isMondayRuhetag ? (
                <p className="text-xs text-rose-400 mt-1">
                  {t.reservation.mondayError}
                </p>
              ) : formErrors.date ? (
                <p className="text-xs text-rose-400 mt-1">{formErrors.date}</p>
              ) : null}
            </div>

            <div>
              <label className="block text-xs font-bold text-[#D5CEBF] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-[#E5B24E]" />
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
                          ? 'bg-[#D4A347] text-[#121110] shadow-md shadow-[#D4A347]/20'
                          : 'bg-[#24211D] text-[#D5CEBF] hover:text-[#FBF9F5] border border-[#312B26]'
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
            <label className="block text-xs font-bold text-[#D5CEBF] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-[#E5B24E]" />
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
                        ? 'bg-neutral-900 border-[#312B26] text-neutral-600 cursor-not-allowed opacity-50'
                        : isSelected
                        ? 'border-[#D4A347] bg-[#D4A347] text-[#121110] font-black'
                        : 'border-[#312B26] bg-[#24211D] text-[#FBF9F5] hover:border-[#D4A347]/40'
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
            <label className="block text-xs font-bold text-[#D5CEBF] uppercase tracking-wider mb-2">
              {t.reservation.areaLabel}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSeatingArea('indoor')}
                className={`rounded-xl p-3 text-xs font-bold border transition-all cursor-pointer ${
                  seatingArea === 'indoor'
                    ? 'border-[#D4A347] bg-[#D4A347]/15 text-[#FBF9F5]'
                    : 'border-[#312B26] bg-[#24211D] text-[#D5CEBF]'
                }`}
              >
                🏠 {t.reservation.indoor}
              </button>
              <button
                type="button"
                onClick={() => setSeatingArea('terrace')}
                className={`rounded-xl p-3 text-xs font-bold border transition-all cursor-pointer ${
                  seatingArea === 'terrace'
                    ? 'border-[#D4A347] bg-[#D4A347]/15 text-[#FBF9F5]'
                    : 'border-[#312B26] bg-[#24211D] text-[#D5CEBF]'
                }`}
              >
                🌿 {t.reservation.terrace}
              </button>
            </div>
          </div>

          {/* Personal Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-[#312B26]">
            <div>
              <label className="block text-xs font-medium text-[#D5CEBF] mb-1">{t.reservation.nameLabel}</label>
              <input
                type="text"
                placeholder={isEn ? "e.g. John Doe" : "z.B. Familie Schmidt"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full rounded-xl bg-[#24211D] border ${
                  formErrors.name ? 'border-rose-500' : 'border-[#312B26]'
                } px-3 py-2 text-sm text-[#FBF9F5] focus:border-[#D4A347] focus:outline-none`}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#D5CEBF] mb-1">
                {t.reservation.phoneLabel}
              </label>
              <input
                type="tel"
                placeholder="0172 1234567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`w-full rounded-xl bg-[#24211D] border ${
                  formErrors.phone ? 'border-rose-500' : 'border-[#312B26]'
                } px-3 py-2 text-sm text-[#FBF9F5] focus:border-[#D4A347] focus:outline-none`}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#D5CEBF] mb-1">
                {t.reservation.emailLabel}
              </label>
              <input
                type="email"
                placeholder="guest@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full rounded-xl bg-[#24211D] border ${
                  formErrors.email ? 'border-rose-500' : 'border-[#312B26]'
                } px-3 py-2 text-sm text-[#FBF9F5] focus:border-[#D4A347] focus:outline-none`}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#D5CEBF] mb-1">
              {t.reservation.requestsLabel}
            </label>
            <input
              type="text"
              placeholder={t.reservation.requestsPlaceholder}
              value={specialRequest}
              onChange={(e) => setSpecialRequest(e.target.value)}
              className="w-full rounded-xl bg-[#24211D] border border-[#312B26] px-3 py-2 text-sm text-[#FBF9F5] focus:border-[#D4A347] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#D4A347] via-[#E5B24E] to-[#D4A347] py-4 text-sm font-bold text-[#121110] shadow-lg shadow-[#D4A347]/25 hover:brightness-110 transition-all cursor-pointer"
          >
            <CheckCircle2 className="h-5 w-5" />
            <span>{t.reservation.submitBtn}</span>
          </button>
        </form>
      )}
    </div>
  );
}
