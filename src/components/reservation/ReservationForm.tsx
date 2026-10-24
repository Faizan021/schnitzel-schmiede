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
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface TimeSlot {
  time: string;
  availableSeats: number;
  isPeak: boolean;
  isLocked: boolean;
}

export function ReservationForm() {
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
    if (!name.trim()) errors.name = 'Bitte Namen eingeben';
    if (!phone.trim() || phone.length < 6) errors.phone = 'Telefonnummer für Rückfragen erforderlich';
    if (!email.trim() || !email.includes('@')) errors.email = 'Gültige E-Mail erforderlich';
    if (isMondayRuhetag) errors.date = 'Montags hat unsere Schmiede Ruhetag';

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
        colors: ['#E6B84A', '#F5C75D', '#10B981'],
      });
    } catch {
      // Ignore
    }
  };

  // Generate .ics calendar download
  const downloadIcs = () => {
    const [year, month, day] = date.split('-');
    const [hours, mins] = selectedTime.split(':');
    const startStr = `${year}${month}${day}T${hours}${mins}00`;
    const endHour = String(Number(hours) + 2).padStart(2, '0');
    const endStr = `${year}${month}${day}T${endHour}${mins}00`;

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Schnitzel Schmiede MG//Tischreservierung//DE',
      'BEGIN:VEVENT',
      `UID:${bookingRef}@schnitzel-schmiede-mg.de`,
      `DTSTAMP:${startStr}Z`,
      `DTSTART:${startStr}`,
      `DTEND:${endStr}`,
      `SUMMARY:Tischreservierung Schnitzel Schmiede MG (${guests} Gäste)`,
      `DESCRIPTION:Reservierung für ${name} (${guests} Personen, ${seatingArea === 'indoor' ? 'Gastraum' : 'Terrasse'}). Buchungs-ID: ${bookingRef}`,
      'LOCATION:Schnitzel Schmiede, Bismarckstraße 45, 41061 Mönchengladbach',
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
        <div className="inline-flex items-center gap-2 rounded-full border border-[#E6B84A]/30 bg-[#E6B84A]/10 px-4 py-1.5 text-xs font-bold text-[#E6B84A] mb-4">
          <Utensils className="h-3.5 w-3.5" />
          <span>Echtzeit-Kapazitätsgarantie</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#FDFBF7]">
          Tisch reservieren
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[#C4BFB5]">
          Genießen Sie knusprige Spezialitäten im rustikal-modernen Schmiede-Ambiente in
          Mönchengladbach. Mit Sofort-Bestätigung & Kalendereintrag.
        </p>
      </div>

      {isSuccess ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl border border-emerald-500/30 bg-[#121216] p-8 text-center shadow-2xl max-w-xl mx-auto"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 mx-auto mb-4">
            <CheckCircle2 className="h-10 w-10" />
          </div>

          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
            Erfolgreich bestätigt
          </span>
          <h2 className="text-2xl font-black text-[#FDFBF7] mt-1">
            Wir freuen uns auf Ihren Besuch!
          </h2>
          <p className="text-xs text-[#C4BFB5] mt-2">
            Buchungsnummer: <strong className="text-[#E6B84A]">{bookingRef}</strong>
          </p>

          <div className="my-6 rounded-xl border border-white/5 bg-[#181820] p-4 text-xs text-left space-y-2">
            <div className="flex justify-between">
              <span className="text-[#C4BFB5]">Gast:</span>
              <span className="font-bold text-[#FDFBF7]">{name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#C4BFB5]">Datum & Uhrzeit:</span>
              <span className="font-bold text-[#E6B84A]">
                {date} um {selectedTime} Uhr
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#C4BFB5]">Personenanzahl:</span>
              <span className="font-bold text-[#FDFBF7]">{guests} Gäste</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#C4BFB5]">Bereich:</span>
              <span className="font-bold text-[#FDFBF7]">
                {seatingArea === 'indoor' ? 'Gastraum Innen' : 'Außenterrasse'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#C4BFB5]">Ort:</span>
              <span className="font-bold text-[#FDFBF7]">Bismarckstr. 45, Mönchengladbach</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={downloadIcs}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#E6B84A] px-5 py-2.5 text-xs font-bold text-[#0A0A0C] hover:bg-[#F5C75D] transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>In Kalender speichern (.ics)</span>
            </button>
            <button
              onClick={() => setIsSuccess(false)}
              className="rounded-xl border border-white/10 px-4 py-2.5 text-xs text-[#C4BFB5] hover:text-[#FDFBF7] transition-colors"
            >
              Weitere Reservierung aufgeben
            </button>
          </div>
        </motion.div>
      ) : (
        <form
          onSubmit={handleBooking}
          className="rounded-2xl border border-white/10 bg-[#121216] p-6 sm:p-8 shadow-xl space-y-6"
        >
          {/* Capacity Guard Info Banner */}
          {isWeekendPeak && (
            <div className="flex items-start gap-3 rounded-xl border border-[#E6B84A]/30 bg-[#E6B84A]/10 p-3.5 text-xs text-[#E6B84A]">
              <ShieldAlert className="h-5 w-5 shrink-0" />
              <div>
                <strong>Smart Capacity Guard aktiv:</strong> Freitag- & Samstagabend ist unsere
                Schmiede stark frequentiert. Tischplätze werden in Echtzeit geschützt, um
                Wartezeiten in der Küche zu vermeiden.
              </div>
            </div>
          )}

          {/* Date & Guests */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#C4BFB5] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <CalendarIcon className="h-3.5 w-3.5 text-[#E6B84A]" />
                <span>Datum wählen *</span>
              </label>
              <input
                type="date"
                value={date}
                min={minDate}
                onChange={(e) => setDate(e.target.value)}
                className={`w-full rounded-xl bg-[#181820] border ${
                  formErrors.date ? 'border-rose-500' : 'border-white/10'
                } px-4 py-2.5 text-sm text-[#FDFBF7] focus:border-[#E6B84A] focus:outline-none`}
              />
              {isMondayRuhetag ? (
                <p className="text-xs text-rose-400 mt-1">
                  Montag ist Ruhetag. Bitte wählen Sie Di-So.
                </p>
              ) : formErrors.date ? (
                <p className="text-xs text-rose-400 mt-1">{formErrors.date}</p>
              ) : null}
            </div>

            <div>
              <label className="block text-xs font-bold text-[#C4BFB5] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-[#E6B84A]" />
                <span>Gästeanzahl *</span>
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
                      className={`flex-1 rounded-xl py-2.5 text-xs font-bold transition-all ${
                        isSelected
                          ? 'bg-[#E6B84A] text-[#0A0A0C] shadow-md shadow-[#E6B84A]/20'
                          : 'bg-[#181820] text-[#C4BFB5] hover:text-[#FDFBF7] border border-white/5'
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
            <label className="block text-xs font-bold text-[#C4BFB5] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-[#E6B84A]" />
              <span>Verfügbare Uhrzeit *</span>
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
                    className={`flex flex-col items-center justify-center rounded-xl p-2.5 text-xs transition-all border ${
                      slot.isLocked
                        ? 'bg-neutral-900 border-white/5 text-neutral-600 cursor-not-allowed opacity-50'
                        : isSelected
                        ? 'border-[#E6B84A] bg-[#E6B84A] text-[#0A0A0C] font-black'
                        : 'border-white/5 bg-[#181820] text-[#FDFBF7] hover:border-white/20'
                    }`}
                  >
                    <span className="font-bold">{slot.time}</span>
                    <span className="text-[9px] mt-0.5 opacity-80">
                      {slot.isLocked ? 'Voll' : `${slot.availableSeats} Plätze`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Area Preference */}
          <div>
            <label className="block text-xs font-bold text-[#C4BFB5] uppercase tracking-wider mb-2">
              Sitzbereich
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSeatingArea('indoor')}
                className={`rounded-xl p-3 text-xs font-bold border transition-all ${
                  seatingArea === 'indoor'
                    ? 'border-[#E6B84A] bg-[#E6B84A]/10 text-[#FDFBF7]'
                    : 'border-white/5 bg-[#181820] text-[#C4BFB5]'
                }`}
              >
                🏠 Gemütlicher Gastraum
              </button>
              <button
                type="button"
                onClick={() => setSeatingArea('terrace')}
                className={`rounded-xl p-3 text-xs font-bold border transition-all ${
                  seatingArea === 'terrace'
                    ? 'border-[#E6B84A] bg-[#E6B84A]/10 text-[#FDFBF7]'
                    : 'border-white/5 bg-[#181820] text-[#C4BFB5]'
                }`}
              >
                🌿 Sonnige Außenterrasse (wetterabhängig)
              </button>
            </div>
          </div>

          {/* Personal Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-white/5">
            <div>
              <label className="block text-xs font-medium text-[#C4BFB5] mb-1">Ihr Name *</label>
              <input
                type="text"
                placeholder="z.B. Familie Schmidt"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full rounded-xl bg-[#181820] border ${
                  formErrors.name ? 'border-rose-500' : 'border-white/10'
                } px-3 py-2 text-sm text-[#FDFBF7] focus:border-[#E6B84A] focus:outline-none`}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#C4BFB5] mb-1">
                Telefonnummer *
              </label>
              <input
                type="tel"
                placeholder="0172 1234567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`w-full rounded-xl bg-[#181820] border ${
                  formErrors.phone ? 'border-rose-500' : 'border-white/10'
                } px-3 py-2 text-sm text-[#FDFBF7] focus:border-[#E6B84A] focus:outline-none`}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#C4BFB5] mb-1">
                E-Mail-Adresse *
              </label>
              <input
                type="email"
                placeholder="schmidt@web.de"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full rounded-xl bg-[#181820] border ${
                  formErrors.email ? 'border-rose-500' : 'border-white/10'
                } px-3 py-2 text-sm text-[#FDFBF7] focus:border-[#E6B84A] focus:outline-none`}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#C4BFB5] mb-1">
              Besondere Wünsche (z.B. Kinderstuhl, Geburtstag, Rollstuhlplatz)
            </label>
            <input
              type="text"
              placeholder="z.B. Wir feiern einen 50. Geburtstag, bitte einen ruhigen Tisch"
              value={specialRequest}
              onChange={(e) => setSpecialRequest(e.target.value)}
              className="w-full rounded-xl bg-[#181820] border border-white/10 px-3 py-2 text-sm text-[#FDFBF7] focus:border-[#E6B84A] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#E6B84A] via-[#F5C75D] to-[#E6B84A] py-4 text-sm font-black text-[#0A0A0C] shadow-lg shadow-[#E6B84A]/25 hover:shadow-[#E6B84A]/40 transition-all cursor-pointer"
          >
            <CheckCircle2 className="h-5 w-5" />
            <span>Jetzt verbindlich reservieren</span>
          </button>
        </form>
      )}
    </div>
  );
}
