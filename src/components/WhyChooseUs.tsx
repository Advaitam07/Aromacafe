import React from 'react';
import { motion } from 'motion/react';
import { Coffee, Leaf, Award, Wifi, Zap, Sparkles } from 'lucide-react';

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: <Coffee className="w-5 h-5 text-gold" />,
      title: 'Freshly Roasted Beans',
      description: 'We source high-grade green Arabica beans and roast them in-house daily to create unmatched flavor profiles.'
    },
    {
      icon: <Leaf className="w-5 h-5 text-gold" />,
      title: 'Organic Ingredients',
      description: 'All syrups, sweetening agents, and kitchen produce are 100% certified organic with no artificial flavors.'
    },
    {
      icon: <Sparkles className="w-5 h-5 text-gold" />,
      title: 'Cozy Ambience',
      description: 'Plush velvet seating, warm geometric lights, and acoustic soundscapes form the perfect relaxing environment.'
    },
    {
      icon: <Wifi className="w-5 h-5 text-gold" />,
      title: 'Free Wi-Fi',
      description: 'Ultra-fast enterprise-grade fiber network makes our café an exceptional remote-work destination.'
    },
    {
      icon: <Zap className="w-5 h-5 text-gold" />,
      title: 'Fast Service',
      description: 'Enjoy premium, freshly brewed beverages and gourmet hot meals in under 10 minutes from placing your order.'
    },
    {
      icon: <Award className="w-5 h-5 text-gold" />,
      title: 'Expert Baristas',
      description: 'Our world-class certified baristas are trained extensively in temperature control and milk texture chemistry.'
    }
  ];

  return (
    <section id="why-us" className="py-12 bg-cream/10 dark:bg-charcoal border-b border-coffee/10 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-mono tracking-widest text-gold uppercase font-bold mb-2 block">
            Our Distinction
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-coffee dark:text-cream mb-2 uppercase tracking-wide">
            Why Choose Brew & Beans
          </h2>
        </div>

        {/* Feature Cards Grid (6 columns responsive) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {reasons.map((reason, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="p-4 rounded-none bg-white dark:bg-[#1C1C1C] border border-coffee/10 dark:border-white/5 shadow-sm hover:border-gold/30 transition-all duration-300"
            >
              {/* Icon container */}
              <div className="w-9 h-9 bg-cream/30 dark:bg-charcoal shadow-sm border border-coffee/10 dark:border-white/5 flex items-center justify-center mb-3">
                {reason.icon}
              </div>

              {/* Title */}
              <h3 className="font-serif text-sm font-bold text-coffee dark:text-cream mb-1">
                {reason.title}
              </h3>

              {/* Description */}
              <p className="text-[11px] text-coffee-light/90 dark:text-cream-dark/70 leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
