import React, { useState } from 'react';
import { Coffee, Facebook, Instagram, Twitter, Send, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 5000); // clear message after 5s
  };

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const quickLinks = [
    { id: 'hero', name: 'Home' },
    { id: 'about', name: 'About Story' },
    { id: 'menu', name: 'Signature Menu' },
    { id: 'special', name: 'Today\'s Special' },
    { id: 'why-us', name: 'Our Distinctions' },
    { id: 'gallery', name: 'Gallery' },
    { id: 'reviews', name: 'Customer Reviews' },
    { id: 'reservation', name: 'Table Booking' },
    { id: 'contact', name: 'Our Location' }
  ];

  return (
    <footer className="bg-charcoal dark:bg-charcoal-dark text-cream pt-20 pb-10 border-t border-white/5 relative overflow-hidden">
      {/* Background radial overlay */}
      <div className="absolute right-0 bottom-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Logo & Info column */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center space-x-2.5 cursor-pointer group" onClick={() => handleScrollTo('hero')}>
              <div className="w-9 h-9 rounded-none bg-gold flex items-center justify-center border border-white/20">
                <Coffee className="w-4 h-4 text-white" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-wide text-white uppercase">
                BREW & <span className="text-gold">BEANS</span>
              </span>
            </div>
            
            <p className="text-sm text-cream-dark/70 leading-relaxed max-w-sm">
              We cultivate beautiful hospitality, freshly roasted in-house organic coffee beans, 
              and premium culinary creations. Every cup tells a story.
            </p>

            {/* Social media links */}
            <div className="flex items-center space-x-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-white/5 hover:bg-gold hover:text-charcoal-dark rounded-none border border-white/10 transition-colors duration-300"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-white/5 hover:bg-gold hover:text-charcoal-dark rounded-none border border-white/10 transition-colors duration-300"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-white/5 hover:bg-gold hover:text-charcoal-dark rounded-none border border-white/10 transition-colors duration-300"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links columns */}
          <div className="md:col-span-3 space-y-6">
            <h4 className="font-serif text-lg font-bold text-white border-l border-gold pl-3 uppercase tracking-wide">
              Explore
            </h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleScrollTo(link.id)}
                    className="text-cream-dark/85 hover:text-gold transition-colors duration-200 cursor-pointer text-left font-sans"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="md:col-span-4 space-y-6">
            <h4 className="font-serif text-lg font-bold text-white border-l border-gold pl-3 uppercase tracking-wide">
              Weekly Aromas
            </h4>
            <p className="text-sm text-cream-dark/75 leading-relaxed">
              Subscribe to our private club list to receive exclusive coupons, fresh roasting alerts, 
              and holiday table availability.
            </p>

            {/* Form */}
            <form onSubmit={handleSubscribe} className="relative flex items-center bg-white/5 rounded-none border border-white/15 focus-within:border-gold transition-colors duration-300 p-1">
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="bg-transparent text-sm text-cream placeholder-cream/50 pl-4 pr-12 py-3 focus:outline-none w-full"
              />
              <button
                type="submit"
                className="absolute right-1 bg-gold hover:bg-gold-light text-white p-2 rounded-none transition-colors cursor-pointer border border-transparent"
                title="Subscribe"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            {/* Confirmation Alert */}
            {subscribed && (
              <div className="flex items-center space-x-2 text-xs text-green-400 font-mono">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Subscription successful! Welcome to the club.</span>
              </div>
            )}
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-cream-dark/60 font-mono">
          <p>© {new Date().getFullYear()} Brew & Beans Coffee House. All Rights Reserved.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a href="#privacy" className="hover:text-gold transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#terms" className="hover:text-gold transition-colors">Terms of Dining</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
