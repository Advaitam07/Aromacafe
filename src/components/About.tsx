import React from 'react';
import { motion } from 'motion/react';
import { Users, Coffee, Calendar } from 'lucide-react';
import cafeInteriorImg from '../assets/images/cafe_interior_1783245222593.jpg';

export default function About() {
  return (
    <section id="about" className="py-12 sm:py-16 bg-white dark:bg-charcoal border-b border-coffee/10 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & Story (takes 7 cols on large screens) */}
          <div className="lg:col-span-7">
            {/* Title */}
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-coffee dark:text-cream mb-6 leading-tight uppercase tracking-wide">
              About Our Café
            </h2>

            {/* Description */}
            <p className="text-coffee-light/90 dark:text-cream-dark/90 leading-relaxed mb-8 text-sm sm:text-base max-w-xl">
              At Brew & Beans, we believe coffee is more than a drink - it's an experience. Since 2018, we've been crafting moments of happiness with premium beans, cozy vibes, and heartfelt hospitality.
            </p>

            {/* Statistics Row with premium icons */}
            <div className="grid grid-cols-3 gap-4 border-t border-coffee/15 dark:border-white/10 pt-8">
              <div className="flex items-center space-x-2.5">
                <Users className="w-5 h-5 text-gold shrink-0" />
                <div className="leading-tight">
                  <p className="font-serif text-base sm:text-lg font-bold text-coffee dark:text-cream">10,000+</p>
                  <p className="text-[9px] sm:text-[10px] text-coffee-light/70 dark:text-cream-dark/60 uppercase font-mono font-semibold tracking-wider">Happy Customers</p>
                </div>
              </div>
              <div className="flex items-center space-x-2.5">
                <Coffee className="w-5 h-5 text-gold shrink-0" />
                <div className="leading-tight">
                  <p className="font-serif text-base sm:text-lg font-bold text-coffee dark:text-cream">20+</p>
                  <p className="text-[9px] sm:text-[10px] text-coffee-light/70 dark:text-cream-dark/60 uppercase font-mono font-semibold tracking-wider">Signature Drinks</p>
                </div>
              </div>
              <div className="flex items-center space-x-2.5">
                <Calendar className="w-5 h-5 text-gold shrink-0" />
                <div className="leading-tight">
                  <p className="font-serif text-base sm:text-lg font-bold text-coffee dark:text-cream">Since 2018</p>
                  <p className="text-[9px] sm:text-[10px] text-coffee-light/70 dark:text-cream-dark/60 uppercase font-mono font-semibold tracking-wider">Heritage</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Image with border frame (takes 5 cols on large screens) */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10 overflow-hidden shadow-md group border border-coffee/15 dark:border-white/5 bg-white dark:bg-charcoal rounded-none"
            >
              <img
                src={cafeInteriorImg}
                alt="Brew & Beans Coffee House Interior"
                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
