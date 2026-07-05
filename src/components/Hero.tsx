import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Coffee } from 'lucide-react';
import heroImg from '../assets/images/hero_coffee_banner_1783245205606.jpg';

interface HeroProps {
  onViewMenu: () => void;
  onOrderNow: () => void;
}

export default function Hero({ onViewMenu, onOrderNow }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-[85vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-charcoal"
    >
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Premium Latte Art Background"
          className="w-full h-full object-cover object-center transform scale-105"
          referrerPolicy="no-referrer"
        />
        {/* Gradients to blend smoothly */}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-dark/95 via-charcoal-dark/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark via-transparent to-charcoal-dark/30" />
      </div>

      {/* Decorative Golden Ambient Glows */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-gold/10 rounded-full blur-3xl z-1 pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-coffee/20 rounded-full blur-3xl z-1 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left w-full pt-10 pb-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Premium Text & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center self-start space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 border border-white/25 bg-white/5 backdrop-blur-sm mb-4 sm:mb-6 rounded-none max-w-full"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse shrink-0" />
              <span className="text-[10px] sm:text-xs font-mono tracking-wider sm:tracking-widest text-cream uppercase font-semibold">
                Est. 2018 • Premium Coffee Roasters
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-4 sm:mb-6 leading-none"
            >
              Every Cup <br />
              <span className="text-gold italic">Tells a Story.</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-sm sm:text-base text-cream/90 mb-6 sm:mb-8 leading-relaxed font-sans max-w-lg"
            >
              Experience hand-roasted single-origin beans, prepared with temperature precision and poured with passion by master baristas.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto sm:items-center"
            >
              <button
                onClick={onViewMenu}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 text-xs font-bold uppercase tracking-widest text-white transition rounded-none cursor-pointer duration-300 hover:brightness-105 active:scale-95 text-center"
                style={{ backgroundColor: '#C89B3C' }}
              >
                Explore Menu
              </button>

              <button
                onClick={onOrderNow}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 text-xs font-bold uppercase tracking-widest text-white bg-transparent border border-white hover:bg-white hover:text-charcoal transition duration-300 rounded-none cursor-pointer active:scale-95 text-center"
              >
                Custom Brew Lab
              </button>
            </motion.div>

            {/* Pagination dots from reference image */}
            <div className="flex items-center space-x-2 mt-8 sm:mt-12">
              <span className="w-2.5 h-2.5 rounded-full bg-gold inline-block" />
              <span className="w-2 h-2 rounded-full bg-white/40 inline-block" />
              <span className="w-2 h-2 rounded-full bg-white/40 inline-block" />
              <span className="w-2 h-2 rounded-full bg-white/40 inline-block" />
            </div>
          </div>

          {/* Right Column: Stunning Glowing Visual Ornament (Desktop only) */}
          <div className="lg:col-span-5 hidden lg:flex justify-center items-center relative h-[450px]">
            
            {/* Outer Luxury Double-framed Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="w-full max-w-[360px] border border-white/10 p-2 bg-charcoal-dark/20 backdrop-blur-sm shadow-2xl relative"
            >
              <div className="border border-gold/30 p-8 flex flex-col items-center justify-between h-[420px] bg-charcoal/80">
                
                {/* Decorative floating dots/sparks inside */}
                <div className="absolute top-4 right-4 text-gold/30"><Sparkles className="w-5 h-5 animate-pulse" /></div>
                <div className="absolute bottom-4 left-4 text-gold/20"><Sparkles className="w-4 h-4" /></div>

                {/* Batch status tag */}
                <div className="px-3 py-1 border border-gold/40 text-[9px] font-mono tracking-widest text-gold uppercase font-bold bg-gold/5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  Live Roastery Active
                </div>

                {/* Center glowing vector cup art */}
                <div className="relative my-auto flex flex-col items-center justify-center">
                  
                  {/* Steam Rising Lines */}
                  <div className="absolute -top-12 flex space-x-2">
                    <motion.div 
                      animate={{ y: [0, -20, 0], opacity: [0, 0.8, 0], scaleY: [0.8, 1.2, 0.8] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                      className="w-1 h-10 bg-gradient-to-t from-gold/40 to-transparent blur-xs"
                    />
                    <motion.div 
                      animate={{ y: [0, -24, 0], opacity: [0, 1, 0], scaleY: [0.7, 1.3, 0.7] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                      className="w-1 h-12 bg-gradient-to-t from-gold/50 to-transparent blur-xs"
                    />
                    <motion.div 
                      animate={{ y: [0, -18, 0], opacity: [0, 0.7, 0], scaleY: [0.9, 1.1, 0.9] }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                      className="w-1 h-10 bg-gradient-to-t from-gold/35 to-transparent blur-xs"
                    />
                  </div>

                  {/* Vector Glowing Coffee Mug */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-32 h-28 border-[3px] border-gold rounded-b-[30px] flex items-center justify-center relative bg-charcoal-dark/40 shadow-[0_0_25px_rgba(200,155,60,0.15)]"
                  >
                    {/* Latte Art line */}
                    <div className="w-14 h-2 border-b-2 border-gold/40 absolute top-4 rounded-full" />
                    
                    {/* Heart graphic inside coffee */}
                    <Coffee className="w-8 h-8 text-gold stroke-[1.5]" />
                    
                    {/* Mug handle */}
                    <div className="absolute top-1/4 -right-4 w-5 h-14 border-[3px] border-gold rounded-r-2xl border-l-0" />
                  </motion.div>

                  {/* Mug shadow */}
                  <div className="w-24 h-1.5 bg-black/40 rounded-full mt-4 blur-xs" />
                </div>

                {/* Bottom Signature tagline */}
                <div className="text-center">
                  <p className="text-[10px] font-mono tracking-[0.3em] text-cream/70 uppercase">Brew & Beans House</p>
                  <p className="text-[9px] text-gold font-bold uppercase tracking-widest mt-0.5">100% Organic Specialty Grade</p>
                </div>

              </div>
            </motion.div>

          </div>

        </div>
      </div>

      {/* Elegant scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity">
        <span className="text-[10px] font-mono tracking-widest text-cream uppercase mb-2">Scroll Down</span>
        <div className="w-5 h-8 border-2 border-cream/50 rounded-full flex justify-center p-1">
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: 'loop',
            }}
            className="w-1.5 h-1.5 bg-gold rounded-full"
          />
        </div>
      </div>
    </section>
  );
}
