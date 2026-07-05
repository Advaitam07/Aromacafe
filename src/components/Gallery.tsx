import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

const galleryPhotos = [
  {
    id: 'mom-1',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1200',
    alt: 'Lit cafe interior table and chairs',
    caption: 'Cozy Fireplace Lounge Seating'
  },
  {
    id: 'mom-2',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=1200',
    alt: 'Espresso cup close-up latte art',
    caption: 'Handcrafted Espresso Latte Art'
  },
  {
    id: 'mom-3',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=1200',
    alt: 'Delicious chocolate cake slice',
    caption: 'Freshly Baked Chocolate Fudge Cake'
  },
  {
    id: 'mom-4',
    image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=1200',
    alt: 'Botanical greenhouse cafe interior with seating',
    caption: 'Sunny Botanical Glasshouse Cafe Patio'
  }
];

export default function Gallery() {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex + 1) % galleryPhotos.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex - 1 + galleryPhotos.length) % galleryPhotos.length);
    }
  };

  return (
    <section id="gallery" className="py-12 sm:py-16 bg-white dark:bg-charcoal border-b border-coffee/10 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono tracking-widest text-gold uppercase font-bold mb-2 block">
            Visual Story
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-coffee dark:text-cream uppercase tracking-wide">
            Moments at Our Café
          </h2>
          <p className="text-coffee-light/80 dark:text-cream-dark/70 text-xs sm:text-sm mt-2">
            Take a visual tour through our hand-pressed coffees, cozy seating spots, and artisanal pastries.
          </p>
        </div>

        {/* 4-Column Photo Grid (Vertical Style) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {galleryPhotos.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => setActivePhotoIndex(idx)}
              className="relative overflow-hidden aspect-[3/4] border border-coffee/10 dark:border-white/5 shadow-sm group bg-cream-dark/20 cursor-zoom-in"
            >
              <img
                src={item.image}
                alt={item.alt}
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {/* Premium Hover Overlay */}
              <div className="absolute inset-0 bg-coffee-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-center">
                <ZoomIn className="w-6 h-6 text-gold mb-2 transform scale-75 group-hover:scale-100 transition-transform duration-300" />
                <p className="text-[10px] font-mono tracking-wider text-white uppercase font-bold">{item.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Photos Button */}
        <div className="flex justify-center">
          <button
            onClick={() => setActivePhotoIndex(0)}
            className="px-7 py-3 text-white font-bold text-xs uppercase tracking-widest transition duration-300 hover:brightness-110 rounded-none cursor-pointer"
            style={{ backgroundColor: '#C89B3C' }}
          >
            View Live Gallery
          </button>
        </div>

        {/* Lightbox / Full-screen View Modal */}
        <AnimatePresence>
          {activePhotoIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePhotoIndex(null)}
              className="fixed inset-0 z-50 bg-charcoal-dark/95 flex items-center justify-center p-4 md:p-8 backdrop-blur-sm"
            >
              <button
                onClick={() => setActivePhotoIndex(null)}
                className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-gold hover:text-charcoal text-white rounded-none transition-colors cursor-pointer"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center justify-center">
                {/* Previous Button */}
                <button
                  onClick={handlePrev}
                  className="absolute left-2 md:-left-16 p-3 bg-white/5 hover:bg-gold text-white hover:text-charcoal-dark transition-all rounded-none cursor-pointer border border-white/10"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <motion.div
                  key={activePhotoIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-charcoal border border-white/10 p-2 max-w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={galleryPhotos[activePhotoIndex].image}
                    alt={galleryPhotos[activePhotoIndex].alt}
                    className="max-h-[70vh] w-auto object-contain mx-auto border border-white/5"
                    referrerPolicy="no-referrer"
                  />
                  <div className="pt-3 pb-1 text-center">
                    <p className="font-serif text-sm tracking-wide text-white uppercase font-bold">
                      {galleryPhotos[activePhotoIndex].caption}
                    </p>
                  </div>
                </motion.div>

                {/* Next Button */}
                <button
                  onClick={handleNext}
                  className="absolute right-2 md:-right-16 p-3 bg-white/5 hover:bg-gold text-white hover:text-charcoal-dark transition-all rounded-none cursor-pointer border border-white/10"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
