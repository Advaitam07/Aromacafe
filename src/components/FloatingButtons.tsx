import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, ChevronUp } from 'lucide-react';

export default function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
      setShowContact(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-center space-y-2.5 pointer-events-none">
      
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={handleScrollToTop}
          className="p-2.5 sm:p-3 bg-white dark:bg-charcoal text-coffee dark:text-cream hover:text-gold dark:hover:text-gold rounded-none shadow-md border border-coffee/15 dark:border-white/10 transition-all duration-300 pointer-events-auto cursor-pointer"
          title="Scroll back to top"
        >
          <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      )}

      {/* Floating Call Button */}
      {showContact && (
        <a
          href="tel:+919876543210"
          className="p-3 sm:p-3.5 bg-coffee dark:bg-charcoal text-cream hover:text-gold dark:hover:text-gold rounded-none shadow-md border border-white/10 dark:border-white/5 transition-all duration-300 pointer-events-auto flex items-center justify-center cursor-pointer"
          title="Call Brew & Beans"
        >
          <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </a>
      )}

      {/* Floating WhatsApp Button */}
      {showContact && (
        <a
          href="https://wa.me/919876543210?text=Hello%20Brew%20%26%20Beans%21%20I%20would%20like%20to%20inquire%20about%20your%20menu%20and%20availabilities."
          target="_blank"
          rel="noreferrer"
          className="p-3 sm:p-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-none shadow-md transition-all duration-300 pointer-events-auto flex items-center justify-center cursor-pointer"
          title="Chat on WhatsApp"
        >
          <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
        </a>
      )}

    </div>
  );
}
