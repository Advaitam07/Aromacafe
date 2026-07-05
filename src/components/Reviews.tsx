import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export default function Reviews() {
  return (
    <section id="reviews" className="py-12 bg-white dark:bg-charcoal overflow-hidden border-b border-coffee/10 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-mono tracking-widest text-gold uppercase font-bold mb-2 block">
            Guest Voice
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-coffee dark:text-cream mb-2 uppercase tracking-wide">
            Loved by Coffee Lovers
          </h2>
          <p className="text-coffee-light/80 dark:text-cream-dark/70 text-xs sm:text-sm">
            Read honest reviews from food critics, remote developers, and everyday coffee lovers who make Brew & Beans their second home.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="p-8 rounded-none bg-cream/20 dark:bg-charcoal-dark/20 border border-coffee/15 dark:border-white/10 relative flex flex-col justify-between hover:shadow-md hover:border-gold/45 dark:hover:border-gold/45 transition-all duration-300 group"
            >
              {/* Giant decorative Quote Icon */}
              <Quote className="absolute top-6 right-8 w-14 h-14 text-coffee/5 dark:text-white/5 pointer-events-none group-hover:text-gold/10 transition-colors duration-300" />

              <div>
                {/* Star Ratings */}
                <div className="flex items-center space-x-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? 'text-gold fill-current'
                          : 'text-coffee/20 dark:text-white/20'
                      }`}
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-coffee-light/95 dark:text-cream-dark/85 italic leading-relaxed text-sm sm:text-base mb-8">
                  "{review.comment}"
                </p>
              </div>

              {/* Profile details */}
              <div className="flex items-center space-x-4 border-t border-coffee/10 dark:border-white/10 pt-6">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-12 h-12 rounded-none object-cover border border-gold"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-serif font-bold text-coffee dark:text-cream text-base">
                    {review.name}
                  </h4>
                  <p className="text-xs text-coffee-light/60 dark:text-cream-dark/50 font-mono">
                    {review.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
