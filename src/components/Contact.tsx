import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, ShieldCheck } from 'lucide-react';

export default function Contact() {
  const contacts = [
    {
      icon: <MapPin className="w-5 h-5 text-gold" />,
      label: 'Our Location',
      value: '456 Celestial Avenue, Gourmet Quarter, New Delhi',
      link: 'https://maps.google.com'
    },
    {
      icon: <Phone className="w-5 h-5 text-gold" />,
      label: 'Phone Bookings',
      value: '+91 98765 43210',
      link: 'tel:+919876543210'
    },
    {
      icon: <Mail className="w-5 h-5 text-gold" />,
      label: 'Email Queries',
      value: 'hello@brewbeans.com',
      link: 'mailto:hello@brewbeans.com'
    }
  ];

  const hours = [
    { days: 'Monday – Friday', time: '07:00 AM – 10:00 PM' },
    { days: 'Saturday', time: '08:00 AM – 11:00 PM' },
    { days: 'Sunday & Holidays', time: '08:00 AM – 09:00 PM' }
  ];

  return (
    <section id="contact" className="py-12 bg-white dark:bg-charcoal border-b border-coffee/10 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-mono tracking-widest text-gold uppercase font-bold mb-2 block">
            Find Us
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-coffee dark:text-cream mb-2 uppercase tracking-wide">
            Visit Us
          </h2>
          <p className="text-coffee-light/80 dark:text-cream-dark/70 text-xs sm:text-sm">
            Have an inquiry, hosting a private event, or want to check seating capacity? Reach out via phone, email, or stop by our cozy space.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Info Side */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Contact details */}
            <div className="bg-cream/15 dark:bg-charcoal-dark/20 border border-coffee/15 dark:border-white/10 rounded-none p-6 space-y-6 shadow-sm">
              <h3 className="font-serif text-xl font-bold text-coffee dark:text-cream">
                Get In Touch
              </h3>
              
              <div className="space-y-6">
                {contacts.map((contact, idx) => (
                  <a
                    href={contact.link}
                    key={idx}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-start space-x-4 group cursor-pointer"
                  >
                    <div className="p-3 rounded-none bg-white dark:bg-charcoal border border-coffee/15 dark:border-white/10 group-hover:border-gold transition-all duration-300">
                      {contact.icon}
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-coffee-light/60 dark:text-cream-dark/50 uppercase tracking-widest font-bold">
                        {contact.label}
                      </p>
                      <p className="text-sm font-semibold text-coffee dark:text-cream group-hover:text-gold transition-colors duration-300 mt-0.5">
                        {contact.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-cream/15 dark:bg-charcoal-dark/20 border border-coffee/15 dark:border-white/10 rounded-none p-6 shadow-sm">
              <h3 className="font-serif text-xl font-bold text-coffee dark:text-cream mb-4 flex items-center space-x-2">
                <Clock className="w-5 h-5 text-gold" />
                <span>Business Hours</span>
              </h3>
              
              <div className="space-y-4">
                {hours.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between pb-3 border-b border-coffee/10 dark:border-white/10 last:border-b-0 last:pb-0"
                  >
                    <span className="text-sm font-medium text-coffee-light dark:text-cream-dark/70">
                      {item.days}
                    </span>
                    <span className="text-sm font-mono font-bold text-gold">
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Map Side */}
          <div className="lg:col-span-7 h-[350px] lg:h-auto rounded-none overflow-hidden shadow-sm border border-coffee/15 dark:border-white/10">
            <iframe
              title="Brew & Beans Coffee House Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.8384918503893!2d77.21637731508266!3d28.632733982417725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b1d321d3%3A0x86915152a4b8df2!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi%20110001!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'contrast(1.05) saturate(0.95)' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
