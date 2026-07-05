import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag } from 'lucide-react';
import { MenuItem } from '../types';

const todaysSpecialImg = '/src/assets/images/todays_special_drink_1783245236185.jpg';

interface SpecialProps {
  onAddToCart: (item: MenuItem) => void;
}

export default function Special({ onAddToCart }: SpecialProps) {
  const specialItem: MenuItem = {
    id: 'special-today-1',
    name: 'Caramel Macchiato',
    description: 'Smooth espresso, steamed milk, caramel drizzle - pure bliss in every sip.',
    price: 249,
    category: 'Cold Coffee',
    image: todaysSpecialImg,
    tag: 'Special'
  };

  return (
    <section id="special" className="py-12 bg-white dark:bg-charcoal border-b border-coffee/10 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dark Golden-Brown Card */}
        <div className="relative overflow-hidden bg-[#241A12] dark:bg-[#1A120B] p-8 sm:p-10 border border-white/10 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Text Content Column */}
            <div className="md:col-span-7 space-y-5">
              <span className="text-xs font-serif tracking-wider text-gold uppercase font-bold block">
                Today's Special
              </span>
              
              <h3 className="font-serif text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Caramel Macchiato
              </h3>

              <p className="text-cream-dark/90 text-sm leading-relaxed max-w-md">
                Smooth espresso, steamed milk, caramel drizzle - pure bliss in every sip.
              </p>

              {/* Pricing section */}
              <div className="flex items-center space-x-4 pt-2">
                <span className="font-mono text-2xl sm:text-3xl font-bold text-white">
                  ₹249
                </span>
                <span className="font-mono text-sm line-through text-cream-dark/50">
                  ₹299
                </span>
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-gold text-white uppercase tracking-wider">
                  17% OFF
                </span>
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <button
                  onClick={() => onAddToCart(specialItem)}
                  className="px-7 py-3 text-white font-bold text-xs uppercase tracking-widest transition duration-300 hover:brightness-110 flex items-center space-x-2 rounded-none cursor-pointer"
                  style={{ backgroundColor: '#C89B3C' }}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Order Now</span>
                </button>
              </div>
            </div>

            {/* Coffee Glass Image Column */}
            <div className="md:col-span-5 relative flex justify-center">
              <div className="relative w-48 h-64 sm:w-56 sm:h-72 overflow-hidden shadow-md border border-white/10">
                <img
                  src={todaysSpecialImg}
                  alt="Caramel Macchiato special"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
