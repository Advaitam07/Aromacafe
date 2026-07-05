import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Users, Phone, Mail, User, Clock, CheckCircle2, Trash2 } from 'lucide-react';
import { ReservationData } from '../types';

export default function Reservation() {
  const [formData, setFormData] = useState<ReservationData>({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '18:00',
    guests: 2,
    notes: '',
  });

  const [bookings, setBookings] = useState<Array<ReservationData & { id: string }>>([]);
  const [showReceipt, setShowReceipt] = useState(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);
  const [latestBooking, setLatestBooking] = useState<ReservationData & { id: string } | null>(null);

  // Load bookings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('brew_beans_reservations');
    if (saved) {
      try {
        setBookings(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'guests' ? parseInt(value) || 2 : value,
    }));
  };

  const handleIncrementGuests = () => {
    setFormData((prev) => ({ ...prev, guests: Math.min(10, prev.guests + 1) }));
  };

  const handleDecrementGuests = () => {
    setFormData((prev) => ({ ...prev, guests: Math.max(1, prev.guests - 1) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorNotice(null);
    if (!formData.name || !formData.phone || !formData.email || !formData.date || !formData.time) {
      setErrorNotice('Please fill out all required fields');
      return;
    }

    const bookingId = 'RES-' + Math.floor(100000 + Math.random() * 900000);
    const newBooking = { ...formData, id: bookingId };
    
    const updatedBookings = [newBooking, ...bookings];
    setBookings(updatedBookings);
    localStorage.setItem('brew_beans_reservations', JSON.stringify(updatedBookings));

    setLatestBooking(newBooking);
    setShowReceipt(true);

    // Reset Form
    setFormData({
      name: '',
      phone: '',
      email: '',
      date: '',
      time: '18:00',
      guests: 2,
      notes: '',
    });
  };

  const handleDeleteBooking = (id: string) => {
    const filtered = bookings.filter((b) => b.id !== id);
    setBookings(filtered);
    localStorage.setItem('brew_beans_reservations', JSON.stringify(filtered));
  };

  return (
    <section id="reservation" className="py-12 bg-cream/10 dark:bg-charcoal-dark/25 relative border-b border-coffee/10 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-mono tracking-widest text-gold uppercase font-bold mb-2 block">
            Table Booking
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-coffee dark:text-cream mb-2 uppercase tracking-wide">
            Reserve Your Table
          </h2>
          <p className="text-coffee-light/80 dark:text-cream-dark/70 text-xs sm:text-sm">
            Secure your cozy spot in advance. Whether it is a business meeting, casual remote work session, or a quiet dinner, we will reserve the perfect seating for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Booking Form Card */}
          <div className="lg:col-span-7 bg-white dark:bg-charcoal rounded-none p-6 sm:p-8 shadow-sm border border-coffee/15 dark:border-white/10">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {errorNotice && (
                <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 text-red-700 dark:text-red-400 text-xs font-medium">
                  {errorNotice}
                </div>
              )}
              
              {/* Name & Email Group */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-mono tracking-widest text-coffee/80 dark:text-cream-dark/80 uppercase mb-2 font-bold">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold" />
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className="w-full pl-11 pr-4 py-3 rounded-none border border-coffee/15 dark:border-white/10 bg-cream/20 dark:bg-charcoal-dark text-coffee dark:text-cream focus:outline-none focus:border-gold transition-all text-sm font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono tracking-widest text-coffee/80 dark:text-cream-dark/80 uppercase mb-2 font-bold">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold" />
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@example.com"
                      className="w-full pl-11 pr-4 py-3 rounded-none border border-coffee/15 dark:border-white/10 bg-cream/20 dark:bg-charcoal-dark text-coffee dark:text-cream focus:outline-none focus:border-gold transition-all text-sm font-sans"
                    />
                  </div>
                </div>
              </div>

              {/* Phone & Guests Group */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-mono tracking-widest text-coffee/80 dark:text-cream-dark/80 uppercase mb-2 font-bold">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold" />
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full pl-11 pr-4 py-3 rounded-none border border-coffee/15 dark:border-white/10 bg-cream/20 dark:bg-charcoal-dark text-coffee dark:text-cream focus:outline-none focus:border-gold transition-all text-sm font-sans"
                    />
                  </div>
                </div>

                {/* Number of Guests Selector with Custom Buttons */}
                <div>
                  <label className="block text-[10px] font-mono tracking-widest text-coffee/80 dark:text-cream-dark/80 uppercase mb-2 font-bold">
                    Number of Guests *
                  </label>
                  <div className="flex items-center justify-between border border-coffee/15 dark:border-white/10 bg-cream/20 dark:bg-charcoal-dark rounded-none p-1.5 h-[46px]">
                    <button
                      type="button"
                      onClick={handleDecrementGuests}
                      className="w-9 h-9 rounded-none bg-white dark:bg-charcoal border border-coffee/10 dark:border-white/5 flex items-center justify-center font-bold text-coffee dark:text-cream hover:bg-gold hover:text-white dark:hover:text-charcoal-dark shadow-sm transition-colors cursor-pointer"
                    >
                      -
                    </button>
                    <span className="font-mono text-sm font-bold text-coffee dark:text-cream flex items-center space-x-1.5">
                      <Users className="w-4 h-4 text-gold" />
                      <span>{formData.guests} {formData.guests === 1 ? 'Guest' : 'Guests'}</span>
                    </span>
                    <button
                      type="button"
                      onClick={handleIncrementGuests}
                      className="w-9 h-9 rounded-none bg-white dark:bg-charcoal border border-coffee/10 dark:border-white/5 flex items-center justify-center font-bold text-coffee dark:text-cream hover:bg-gold hover:text-white dark:hover:text-charcoal-dark shadow-sm transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Date & Time Group */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-mono tracking-widest text-coffee/80 dark:text-cream-dark/80 uppercase mb-2 font-bold">
                    Booking Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold z-10 pointer-events-none" />
                    <input
                      required
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 rounded-none border border-coffee/15 dark:border-white/10 bg-cream/20 dark:bg-charcoal-dark text-coffee dark:text-cream focus:outline-none focus:border-gold transition-all text-sm font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono tracking-widest text-coffee/80 dark:text-cream-dark/80 uppercase mb-2 font-bold">
                    Preferred Time *
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold z-10 pointer-events-none" />
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 rounded-none border border-coffee/15 dark:border-white/10 bg-cream/20 dark:bg-charcoal-dark text-coffee dark:text-cream focus:outline-none focus:border-gold transition-all text-sm font-sans appearance-none"
                    >
                      <option value="08:00">08:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="14:00">02:00 PM</option>
                      <option value="16:00">04:00 PM</option>
                      <option value="18:00">06:00 PM</option>
                      <option value="20:00">08:00 PM</option>
                      <option value="22:00">10:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Special Instructions */}
              <div>
                <label className="block text-[10px] font-mono tracking-widest text-coffee/80 dark:text-cream-dark/80 uppercase mb-2 font-bold">
                  Special Notes / Diet Details (Optional)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  placeholder="E.g., Window seat preferred, celebrating an anniversary, vegetarian dishes, etc..."
                  className="w-full px-4 py-3 rounded-none border border-coffee/15 dark:border-white/10 bg-cream/20 dark:bg-charcoal-dark text-coffee dark:text-cream focus:outline-none focus:border-gold transition-all text-sm font-sans"
                />
              </div>

              {/* Book button */}
              <button
                type="submit"
                className="w-full py-3.5 text-xs font-bold uppercase tracking-widest text-white dark:text-charcoal-dark transition duration-300 hover:brightness-110 flex items-center justify-center space-x-2 rounded-none cursor-pointer shadow-sm"
                style={{ backgroundColor: '#2C2C2C' }}
              >
                <Calendar className="w-4 h-4" />
                <span>Confirm Reservation</span>
              </button>

            </form>
          </div>

          {/* Live History & Info Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            {/* Quick Policies / Banner */}
            <div className="bg-coffee text-cream dark:bg-charcoal-dark dark:border dark:border-white/10 rounded-none p-8 relative overflow-hidden flex-grow shadow-sm border border-coffee/10">
              <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-48 h-48 bg-gold/5 rounded-full blur-2xl" />
              <h4 className="font-serif text-xl font-bold text-gold mb-4">Reservation Policies</h4>
              <ul className="space-y-4 text-sm text-cream-dark/85">
                <li className="flex items-start space-x-2">
                  <span className="text-gold mt-1">•</span>
                  <span><strong>Grace Period:</strong> We hold reserved tables for up to 15 minutes after your scheduled time.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-gold mt-1">•</span>
                  <span><strong>Group Bookings:</strong> For groups larger than 10, please contact us directly via phone.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-gold mt-1">•</span>
                  <span><strong>Quiet Zones:</strong> Please specify if you require quiet corners with power sockets.</span>
                </li>
              </ul>
            </div>

            {/* Local Storage Saved Bookings list */}
            {bookings.length > 0 && (
              <div className="bg-white dark:bg-charcoal rounded-none p-8 border border-coffee/15 dark:border-white/10 shadow-sm max-h-[300px] overflow-y-auto">
                <h4 className="font-serif text-lg font-bold text-coffee dark:text-cream mb-4 flex items-center justify-between">
                  <span>Your active reservations</span>
                  <span className="text-xs font-mono bg-gold/10 text-gold px-2.5 py-0.5 rounded-none font-bold">{bookings.length}</span>
                </h4>
                <div className="space-y-3">
                  {bookings.map((b) => (
                    <div
                      key={b.id}
                      className="p-4 bg-cream/20 dark:bg-charcoal-dark/50 rounded-none border border-coffee/10 dark:border-white/5 flex items-center justify-between"
                    >
                      <div className="space-y-1">
                        <p className="font-mono text-xs font-bold text-gold">{b.id}</p>
                        <p className="text-sm font-bold text-coffee dark:text-cream">{b.name}</p>
                        <p className="text-xs text-coffee-light dark:text-cream-dark/60">
                          {b.date} • {b.time} • {b.guests} guest{b.guests > 1 ? 's' : ''}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteBooking(b.id)}
                        className="p-2 text-coffee-light/50 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-none transition-colors cursor-pointer"
                        title="Cancel reservation"
                      >
                        <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          </div>
        </div>
      </div>

      {/* Success Modal Receipt */}
      <AnimatePresence>
        {showReceipt && latestBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-dark/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              className="bg-white dark:bg-charcoal rounded-none max-w-md w-full shadow-lg overflow-hidden border border-coffee/20 dark:border-white/10"
            >
              {/* Receipt Header */}
              <div className="bg-gold p-6 text-center text-white relative border-b border-coffee/15">
                <div className="absolute top-4 right-4 cursor-pointer text-white/80 hover:text-white" onClick={() => setShowReceipt(false)}>
                  <span className="font-mono text-lg">✕</span>
                </div>
                <CheckCircle2 className="w-10 h-10 text-white mx-auto mb-2 fill-white/10" />
                <h3 className="font-serif text-2xl font-bold uppercase tracking-wide">Booking Confirmed</h3>
                <p className="text-[10px] font-mono tracking-widest opacity-90 mt-1">BREW & BEANS COFFEE HOUSE DIGITAL RECEIPT</p>
              </div>

              {/* Receipt Body */}
              <div className="p-8 space-y-6 bg-cream/20 dark:bg-charcoal-dark/20 relative">
                {/* Torn paper effect spacer */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white dark:via-charcoal to-transparent opacity-50" />

                <div className="text-center">
                  <span className="text-xs font-mono text-coffee-light/60 dark:text-cream-dark/50">RESERVATION ID</span>
                  <p className="font-mono text-xl font-bold text-gold tracking-widest">{latestBooking.id}</p>
                </div>

                <div className="border-t border-b border-dashed border-coffee/20 dark:border-white/20 py-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-coffee-light dark:text-cream-dark/60">Guest Name</span>
                    <span className="font-semibold text-coffee dark:text-cream">{latestBooking.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-coffee-light dark:text-cream-dark/60">Table For</span>
                    <span className="font-semibold text-coffee dark:text-cream">{latestBooking.guests} People</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-coffee-light dark:text-cream-dark/60">Date</span>
                    <span className="font-semibold text-coffee dark:text-cream">{latestBooking.date}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-coffee-light dark:text-cream-dark/60">Arrival Time</span>
                    <span className="font-semibold text-coffee dark:text-cream">{latestBooking.time}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-coffee-light dark:text-cream-dark/60">Phone Contact</span>
                    <span className="font-semibold text-coffee dark:text-cream">{latestBooking.phone}</span>
                  </div>
                </div>

                <div className="text-center text-xs text-coffee-light/80 dark:text-cream-dark/60 leading-relaxed">
                  Please show this receipt to the host upon your arrival. We look forward to welcoming you!
                </div>

                <button
                  onClick={() => setShowReceipt(false)}
                  className="w-full py-3 bg-coffee dark:bg-gold text-cream dark:text-charcoal-dark font-bold rounded-none transition-all hover:bg-coffee-light cursor-pointer uppercase tracking-widest text-xs"
                >
                  Close Receipt
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
