import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Flame, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { MenuItem, Category } from '../types';
import { MENU_ITEMS } from '../data';

interface MenuProps {
  onAddToCart: (item: MenuItem) => void;
}

const CATEGORIES: Category[] = [
  'Espresso',
  'Cappuccino',
  'Latte',
  'Cold Coffee',
  'Mocha',
  'Iced Americano',
  'Tea',
  'Fresh Juices',
  'Sandwiches',
  'Burgers',
  'Pasta',
  'Pizza',
  'Desserts',
  'Cakes',
];

export default function Menu({ onAddToCart }: MenuProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category>('Espresso');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredItems = MENU_ITEMS.filter((item) => item.category === selectedCategory);

  const scrollTabs = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Helper to get fallback images if needed
  const getFallbackImage = (item: MenuItem) => {
    if (item.image) return item.image;
    // fallback based on item category or general premium coffee
    return 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=600';
  };

  return (
    <section id="menu" className="py-12 bg-white dark:bg-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest text-gold uppercase font-semibold mb-3 block">
            Signature Menu
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-coffee dark:text-cream mb-4">
            Taste the Craftsmanship
          </h2>
          <p className="text-coffee-light/80 dark:text-cream-dark/70 text-sm sm:text-base">
            Every cup and dish is individually prepared by skilled baristas and culinary experts, 
            using freshly roasted single-origin organic beans and sustainable ingredients.
          </p>
        </div>

        {/* Category Tabs Wrapper with Navigation Arrows */}
        <div className="relative mb-12 px-4">
          <button
            onClick={() => scrollTabs('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full bg-cream-dark dark:bg-charcoal-light shadow-md hover:bg-gold hover:text-cream dark:hover:bg-gold text-coffee dark:text-cream transition-colors duration-300 md:hidden cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div
            ref={scrollContainerRef}
            className="flex items-center space-x-2 overflow-x-auto scrollbar-hide py-3 px-4 -mx-4 mask-gradient scroll-smooth select-none snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all duration-300 border cursor-pointer snap-center ${
                  selectedCategory === cat
                    ? 'bg-coffee border-coffee text-cream dark:bg-gold dark:border-gold dark:text-charcoal-dark shadow-sm'
                    : 'bg-white dark:bg-charcoal border-coffee/15 dark:border-white/10 text-coffee dark:text-cream-dark hover:border-gold dark:hover:border-gold hover:text-gold'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollTabs('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-cream-dark/50 dark:bg-charcoal border border-coffee/15 dark:border-white/10 shadow-sm hover:bg-gold hover:text-cream dark:hover:bg-gold text-coffee dark:text-cream transition-colors duration-300 md:hidden cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Active Category Display */}
        <div className="mb-8 flex items-center justify-between border-b border-coffee/15 dark:border-white/10 pb-4">
          <h3 className="font-serif text-2xl font-bold text-coffee dark:text-cream flex items-center space-x-2">
            <span>{selectedCategory} Specialties</span>
            <span className="text-[10px] bg-gold/10 text-gold font-mono px-2.5 py-0.5 border border-gold/20 font-bold uppercase tracking-wider">
              {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
            </span>
          </h3>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, idx) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="group flex flex-col h-full bg-white dark:bg-charcoal rounded-none overflow-hidden border border-coffee/15 dark:border-white/10 shadow-sm hover:shadow-md hover:border-gold/40 dark:hover:border-gold/40 transition-all duration-300"
                >
                  {/* Item Image & Badge */}
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-cream-dark dark:bg-charcoal-dark border-b border-coffee/10 dark:border-white/5">
                    <img
                      src={getFallbackImage(item)}
                      alt={item.name}
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-102"
                      referrerPolicy="no-referrer"
                    />
                    {/* Dark gradient cover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Premium Tag Badge */}
                    {item.tag && (
                      <div className="absolute top-4 left-4 inline-flex items-center space-x-1 px-3 py-1 rounded-none bg-gold text-white text-[9px] font-bold tracking-widest uppercase shadow-sm border border-white/10">
                        <Star className="w-3 h-3 fill-current" />
                        <span>{item.tag}</span>
                      </div>
                    )}
                  </div>

                  {/* Item Details */}
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex items-start justify-between mb-2 gap-2">
                      <h4 className="font-serif text-base font-bold text-coffee dark:text-cream group-hover:text-gold transition-colors duration-300 leading-snug">
                        {item.name}
                      </h4>
                      <p className="font-mono text-base font-bold text-gold shrink-0">
                        {item.price >= 20 ? `₹${Math.round(item.price)}` : `₹${Math.round(item.price * 50)}`}
                      </p>
                    </div>

                    <p className="text-xs text-coffee-light/90 dark:text-cream-dark/70 leading-relaxed mb-6 flex-grow">
                      {item.description || 'Delicately prepared with artisanal expertise, premium ingredients, and organic flavors.'}
                    </p>

                    {/* Add to Cart button */}
                    <button
                      onClick={() => onAddToCart(item)}
                      className="w-full py-2.5 bg-transparent hover:bg-gold text-coffee dark:text-cream hover:text-white dark:hover:text-charcoal border border-coffee/20 hover:border-gold dark:border-white/20 dark:hover:border-gold font-bold text-xs uppercase tracking-widest rounded-none transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <p className="text-coffee-light dark:text-cream-dark/60">
                  Adding freshly prepared signature items. Please choose another category.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
