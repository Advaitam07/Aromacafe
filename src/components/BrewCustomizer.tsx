import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Coffee, 
  Sparkles, 
  Flame, 
  RotateCcw, 
  Check, 
  Plus, 
  Minus, 
  Info, 
  Cookie,
  ShoppingCart
} from 'lucide-react';
import { MenuItem, Category } from '../types';

// Constants for customizable options
const DRINK_BASES = [
  { id: 'espresso', name: 'Espresso', price: 160, caffeine: 120, calories: 5, color: '#2B1B17', desc: 'Bold, pure espresso extract.' },
  { id: 'latte', name: 'Latte', price: 210, caffeine: 80, calories: 120, color: '#D2B48C', desc: 'Espresso with steamed milk & a light foam layer.' },
  { id: 'macchiato', name: 'Macchiato', price: 190, caffeine: 80, calories: 90, color: '#8B5A2B', desc: 'Espresso marked with a dollop of milk foam.' },
  { id: 'cappuccino', name: 'Cappuccino', price: 200, caffeine: 80, calories: 110, color: '#C19A6B', desc: 'Equal parts espresso, steamed milk, and milk foam.' },
  { id: 'mocha', name: 'Mocha Cafe', price: 230, caffeine: 90, calories: 250, color: '#4E3629', desc: 'Espresso, rich dark chocolate, and milk.' }
];

const MILK_BASES = [
  { id: 'none', name: 'None (Black)', price: 0, calories: 0, color: 'transparent' },
  { id: 'whole', name: 'Whole Milk', price: 0, calories: 120, color: '#FFFDF9' },
  { id: 'oat', name: 'Premium Oat Milk', price: 40, calories: 80, color: '#FAF6E9' },
  { id: 'almond', name: 'Almond Milk', price: 40, calories: 50, color: '#FDFCF7' },
  { id: 'soy', name: 'Organic Soy Milk', price: 30, calories: 70, color: '#F8F6F0' }
];

const FLAVOR_SYRUPS = [
  { id: 'none', name: 'No Syrup', price: 0, calories: 0, color: 'transparent' },
  { id: 'caramel', name: 'Salted Caramel', price: 30, calories: 60, color: '#D4AF37' },
  { id: 'vanilla', name: 'Madagascar Vanilla', price: 30, calories: 50, color: '#F3E5AB' },
  { id: 'hazelnut', name: 'Toasted Hazelnut', price: 30, calories: 55, color: '#C2B280' },
  { id: 'mocha_sauce', name: 'Gourmet Dark Chocolate', price: 40, calories: 80, color: '#3D251E' }
];

const TOPPINGS = [
  { id: 'cinnamon', name: 'Cinnamon Dust', price: 15, calories: 5, color: '#C2B280' },
  { id: 'cocoa', name: 'Cocoa Powder Shavings', price: 15, calories: 8, color: '#4E3629' },
  { id: 'whipped', name: 'Whipped Cream Peak', price: 30, calories: 90, color: '#FFFFFF' },
  { id: 'caramel_drizzle', name: 'Caramel Drizzle Grid', price: 20, calories: 45, color: '#D4AF37' }
];

const FOOD_PAIRINGS = [
  { base: 'espresso', name: 'Almond Croissant', desc: 'Flaky pastry cuts the intense dark notes.', id: 'food-croissant' },
  { base: 'latte', name: 'Classic Chocolate Fudge Cake', desc: 'Velvety fudge pairs beautifully with milky froth.', id: 'food-cake' },
  { base: 'macchiato', name: 'Blueberry Muffin', desc: 'Zesty berries highlight subtle espresso caramelization.', id: 'food-muffin' },
  { base: 'cappuccino', name: 'New York Cheesecake', desc: 'Tangy cheesecake enhances rich milk-foam texture.', id: 'food-cheesecake' },
  { base: 'mocha', name: 'Chocolate Chip Cookie', desc: 'Double down on the ultimate warm chocolate experience.', id: 'food-cookie' }
];

interface BrewCustomizerProps {
  onAddToCart: (item: MenuItem) => void;
}

export default function BrewCustomizer({ onAddToCart }: BrewCustomizerProps) {
  // Config State
  const [selectedBase, setSelectedBase] = useState(DRINK_BASES[1]); // Default to Latte
  const [selectedMilk, setSelectedMilk] = useState(MILK_BASES[1]); // Default to Whole Milk
  const [selectedSyrup, setSelectedSyrup] = useState(FLAVOR_SYRUPS[0]); // Default to No Syrup
  const [selectedToppings, setSelectedToppings] = useState<typeof TOPPINGS>([]);
  const [shotsCount, setShotsCount] = useState(1);
  const [isIced, setIsIced] = useState(false);
  const [sweetnessLevel, setSweetnessLevel] = useState(50); // 0% to 100%
  const [addedAnimationTrigger, setAddedAnimationTrigger] = useState(false);

  // Stats calculation
  const totalCaffeine = selectedBase.caffeine * shotsCount;
  const totalCalories = selectedBase.calories + 
    selectedMilk.calories + 
    selectedSyrup.calories + 
    selectedToppings.reduce((acc, t) => acc + t.calories, 0) +
    Math.round((sweetnessLevel / 100) * 40);

  const totalPrice = selectedBase.price + 
    selectedMilk.price + 
    selectedSyrup.price + 
    selectedToppings.reduce((acc, t) => acc + t.price, 0) +
    (shotsCount > 1 ? (shotsCount - 1) * 50 : 0);

  // Dynamic food pairing matching drink base
  const recommendedPairing = FOOD_PAIRINGS.find(p => p.base === selectedBase.id) || FOOD_PAIRINGS[0];

  // Toggle selection for toppings
  const handleToggleTopping = (topping: typeof TOPPINGS[0]) => {
    if (selectedToppings.some(t => t.id === topping.id)) {
      setSelectedToppings(prev => prev.filter(t => t.id !== topping.id));
    } else {
      setSelectedToppings(prev => [...prev, topping]);
    }
  };

  const handleReset = () => {
    setSelectedBase(DRINK_BASES[1]);
    setSelectedMilk(MILK_BASES[1]);
    setSelectedSyrup(FLAVOR_SYRUPS[0]);
    setSelectedToppings([]);
    setShotsCount(1);
    setIsIced(false);
    setSweetnessLevel(50);
  };

  const handleAddCustomToCart = () => {
    // Generate distinct detailed description
    const toppingsStr = selectedToppings.length > 0 
      ? ` + ${selectedToppings.map(t => t.name).join(', ')}`
      : '';
    const description = `Custom Brew: ${shotsCount} Shot(s) ${selectedBase.name}, ${selectedMilk.name}, ${selectedSyrup.name}, ${sweetnessLevel}% Sweetness, ${isIced ? 'Iced' : 'Steamed'}${toppingsStr}.`;

    const customBrewItem: MenuItem = {
      id: `custom-brew-${Date.now()}`,
      name: `Signature Custom ${selectedBase.name}`,
      description: description,
      price: totalPrice,
      category: 'Latte', // Fit under Latte category for easy storage/rendering
      image: '/src/assets/images/todays_special_drink_1783245236185.jpg', // Use high-quality special asset
      isSpecial: true,
      tag: 'Custom Lab'
    };

    onAddToCart(customBrewItem);
    
    // Success micro-interaction trigger
    setAddedAnimationTrigger(true);
    setTimeout(() => {
      setAddedAnimationTrigger(false);
    }, 2000);
  };

  return (
    <section id="brew-customizer" className="py-12 sm:py-16 lg:py-24 bg-cream-dark/10 dark:bg-[#121212] border-b border-coffee/10 dark:border-white/5 relative overflow-hidden">
      {/* Decorative Blur Backdrops */}
      <div className="absolute top-1/2 left-10 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-coffee/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest text-gold uppercase font-bold mb-2 block">
            Brew Lab
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-coffee dark:text-cream uppercase tracking-wide">
            Design Your Perfect Brew
          </h2>
          <p className="text-coffee-light/80 dark:text-cream-dark/70 text-xs sm:text-sm mt-2 max-w-xl mx-auto">
            Experiment with ingredients, coffee beans, syrups, and textures. Watch your creation layer in real-time and order your customized masterpiece.
          </p>
        </div>

        {/* Customizer Playground Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT COLUMN: Visual Animated Cup - occupies 5 cols */}
          <div className="lg:col-span-5 bg-white dark:bg-[#1A1A1A] border border-coffee/15 dark:border-white/10 p-8 flex flex-col justify-between items-center relative text-center">
            
            {/* Header info */}
            <div className="w-full flex justify-between items-center border-b border-coffee/5 dark:border-white/5 pb-4 mb-6">
              <div className="text-left">
                <p className="text-[10px] font-mono tracking-wider text-gold uppercase font-bold">Customizer Live Visualizer</p>
                <h3 className="font-serif text-lg font-bold text-coffee dark:text-cream leading-tight">The {selectedBase.name} Profile</h3>
              </div>
              <button 
                onClick={handleReset}
                className="text-xs font-mono text-coffee-light hover:text-gold dark:text-cream-dark dark:hover:text-gold flex items-center gap-1 transition-colors uppercase font-bold cursor-pointer"
                title="Reset customizer defaults"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            </div>

            {/* Simulated Live Interactive Mug Display */}
            <div className="my-auto py-12 flex flex-col items-center justify-center relative w-full h-[280px]">
              
              {/* Steaming Smoke Effect (Only if not iced) */}
              {!isIced && (
                <div className="absolute top-4 flex justify-center items-center space-x-2.5 z-20">
                  <motion.div 
                    animate={{ y: [0, -16, 0], opacity: [0.1, 0.7, 0.1], scale: [0.9, 1.1, 0.9] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="w-1.5 h-10 bg-gradient-to-t from-white/30 to-transparent blur-sm rounded-full"
                  />
                  <motion.div 
                    animate={{ y: [0, -22, 0], opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                    className="w-2 h-12 bg-gradient-to-t from-white/40 to-transparent blur-sm rounded-full"
                  />
                  <motion.div 
                    animate={{ y: [0, -18, 0], opacity: [0.1, 0.6, 0.1], scale: [0.9, 1.1, 0.9] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                    className="w-1.5 h-10 bg-gradient-to-t from-white/30 to-transparent blur-sm rounded-full"
                  />
                </div>
              )}

              {/* Coffee Cup Container with layers inside */}
              <div className="relative w-44 h-40 mt-6 bg-transparent z-10">
                {/* Cup Body Structure */}
                <div className="absolute inset-0 border-4 border-t-0 border-coffee/20 dark:border-white/20 rounded-b-[40px] overflow-hidden flex flex-col justify-end bg-cream/20 dark:bg-charcoal-dark/30 backdrop-blur-xs">
                  
                  {/* Dynamic Toppings Visualization Layer (Top) */}
                  {selectedToppings.length > 0 && (
                    <div className="absolute top-0 inset-x-0 h-4 z-20 flex justify-center items-center overflow-hidden">
                      {selectedToppings.map((t, idx) => (
                        <motion.div
                          key={t.id}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute inset-x-0 h-full flex items-center justify-around px-2"
                        >
                          {t.id === 'whipped' ? (
                            <div className="w-full h-8 bg-white rounded-t-full border-b border-cream shadow-inner opacity-95 translate-y-1" />
                          ) : t.id === 'cinnamon' ? (
                            <div className="w-full h-1 bg-amber-700/60 blur-[1px] rotate-2" />
                          ) : t.id === 'cocoa' ? (
                            <div className="w-full h-1.5 bg-[#4E3629]/70 blur-[1px] -rotate-1" />
                          ) : (
                            <div className="w-full h-2 bg-yellow-600/50 flex space-x-1 opacity-75">
                              <span className="w-1 h-1 bg-yellow-600 rounded-full" />
                              <span className="w-1 h-1 bg-yellow-600 rounded-full" />
                              <span className="w-1 h-1 bg-yellow-600 rounded-full" />
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Foam / Microfoam top layer (Dynamic size based on base) */}
                  <div className="h-6 bg-neutral-100/90 dark:bg-neutral-200/90 border-b border-amber-800/10 flex items-center justify-center text-[9px] font-mono tracking-widest text-coffee-light uppercase font-bold text-center select-none z-10 shadow-inner">
                    Velvet Froth
                  </div>

                  {/* Liquid Base / Coffee Layer */}
                  <motion.div 
                    animate={{ height: selectedMilk.id !== 'none' ? '45%' : '80%' }}
                    transition={{ type: "spring", stiffness: 100 }}
                    style={{ backgroundColor: selectedBase.color }}
                    className="w-full relative transition-colors duration-500 flex items-center justify-center text-white/50 text-[10px] font-mono tracking-wider font-bold shadow-inner"
                  >
                    {selectedBase.name}
                    {/* Coffee steam texture inside */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                  </motion.div>

                  {/* Milk Layer (Steamed or Cold) */}
                  {selectedMilk.id !== 'none' && (
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: '35%' }}
                      transition={{ type: "spring", stiffness: 80 }}
                      style={{ backgroundColor: selectedMilk.color }}
                      className="w-full relative transition-colors duration-500 flex items-center justify-center text-coffee-light/60 text-[10px] font-mono tracking-wider font-bold shadow-inner border-t border-coffee/5"
                    >
                      {selectedMilk.name}
                    </motion.div>
                  )}

                  {/* Syrup Layer (Dense, settles at the bottom) */}
                  {selectedSyrup.id !== 'none' && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: '15%' }}
                      style={{ backgroundColor: selectedSyrup.color }}
                      className="w-full relative transition-colors duration-500 flex items-center justify-center text-white/70 text-[9px] font-mono tracking-wider font-bold shadow-2xl border-t border-black/10"
                    >
                      {selectedSyrup.name}
                    </motion.div>
                  )}
                </div>

                {/* Cup Handle (Right side) */}
                <div className="absolute top-1/4 -right-6 w-8 h-20 border-4 border-coffee/20 dark:border-white/20 rounded-r-3xl z-0" />
                
                {/* Iced Cubes Overlay inside Cup */}
                {isIced && (
                  <div className="absolute inset-x-4 bottom-4 top-8 z-30 pointer-events-none flex flex-wrap justify-around content-center gap-2 opacity-85">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-5 h-5 bg-sky-200/50 dark:bg-sky-400/30 border border-white/40 rounded-sm rotate-12 flex items-center justify-center text-[8px] font-bold text-sky-800">❄</motion.div>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1, delay: 0.1 }} className="w-5 h-5 bg-sky-200/50 dark:bg-sky-400/30 border border-white/40 rounded-sm -rotate-12 flex items-center justify-center text-[8px] font-bold text-sky-800">❄</motion.div>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1, delay: 0.2 }} className="w-5 h-5 bg-sky-200/50 dark:bg-sky-400/30 border border-white/40 rounded-sm rotate-45 flex items-center justify-center text-[8px] font-bold text-sky-800">❄</motion.div>
                  </div>
                )}
              </div>

              {/* Saucer under the cup */}
              <div className="w-52 h-3.5 bg-coffee/15 dark:bg-white/10 rounded-full mt-1.5 border border-coffee/5 dark:border-white/5" />
            </div>

            {/* Nutrients & Stats Section */}
            <div className="w-full mt-6 bg-cream/30 dark:bg-charcoal-dark/40 border border-coffee/5 dark:border-white/5 p-4 flex justify-around items-center rounded-none">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-coffee-light/70 dark:text-cream-dark/60">Caffeine</p>
                <p className="font-mono text-base font-bold text-coffee dark:text-cream">{totalCaffeine} <span className="text-[10px] font-normal text-coffee-light/80 dark:text-cream-dark/60">mg</span></p>
              </div>
              <div className="w-px h-8 bg-coffee/10 dark:bg-white/10" />
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-coffee-light/70 dark:text-cream-dark/60">Est. Calories</p>
                <p className="font-mono text-base font-bold text-coffee dark:text-cream">{totalCalories} <span className="text-[10px] font-normal text-coffee-light/80 dark:text-cream-dark/60">kcal</span></p>
              </div>
              <div className="w-px h-8 bg-coffee/10 dark:bg-white/10" />
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-coffee-light/70 dark:text-cream-dark/60">Estimated Price</p>
                <p className="font-mono text-base font-bold text-gold">₹{totalPrice}</p>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Configuration Control Center - occupies 7 cols */}
          <div className="lg:col-span-7 bg-white dark:bg-[#1A1A1A] border border-coffee/15 dark:border-white/10 p-6 sm:p-8 flex flex-col justify-between">
            
            <div className="space-y-6">
              
              {/* Step 1: Beverage Base */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-gold uppercase tracking-widest font-bold">Step 1: Choose Drink Base</span>
                  <span className="text-xs font-serif italic text-coffee-light dark:text-cream-dark">{selectedBase.desc}</span>
                </div>
                <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-5 gap-2">
                  {DRINK_BASES.map((base) => {
                    const isSelected = selectedBase.id === base.id;
                    return (
                      <button
                        key={base.id}
                        onClick={() => setSelectedBase(base)}
                        className={`py-2.5 px-2 text-center rounded-none border text-xs transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                          isSelected 
                            ? 'bg-coffee text-white border-gold dark:bg-gold dark:text-charcoal' 
                            : 'border-coffee/10 hover:border-gold/50 bg-cream/10 dark:bg-charcoal dark:border-white/5 text-coffee-light dark:text-cream-dark hover:bg-cream/20'
                        }`}
                      >
                        <Coffee className={`w-3.5 h-3.5 ${isSelected ? 'text-gold dark:text-charcoal' : 'text-coffee-light dark:text-cream-dark'}`} />
                        <span className="font-bold truncate w-full">{base.name}</span>
                        <span className="text-[10px] opacity-80">₹{base.price}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Milk Base & Temperature Toggle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Milk Selector */}
                <div>
                  <span className="text-xs font-mono text-gold uppercase tracking-widest font-bold block mb-3">Step 2: Steamed Milk</span>
                  <div className="grid grid-cols-2 sm:grid-cols-1 gap-1.5">
                    {MILK_BASES.map((milk) => {
                      const isSelected = selectedMilk.id === milk.id;
                      return (
                        <button
                          key={milk.id}
                          onClick={() => setSelectedMilk(milk)}
                          className={`w-full py-2 px-3 text-left rounded-none border text-xs transition-all flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? 'bg-coffee/5 border-gold dark:bg-gold/10 dark:border-gold text-coffee dark:text-cream font-bold'
                              : 'border-coffee/10 hover:border-gold/30 bg-cream/10 dark:bg-charcoal dark:border-white/5 text-coffee-light dark:text-cream-dark'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span 
                              className="w-3.5 h-3.5 rounded-full border border-coffee/20 dark:border-white/20 shadow-xs block" 
                              style={{ backgroundColor: milk.color === 'transparent' ? '#333' : milk.color }}
                            />
                            {milk.name}
                          </span>
                          <span className="text-[10px] font-mono text-coffee-light dark:text-cream-dark">
                            {milk.price > 0 ? `+₹${milk.price}` : 'Free'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Temperature & Espresso Shots controls */}
                <div className="flex flex-col justify-between">
                  
                  {/* Temperature Toggle */}
                  <div>
                    <span className="text-xs font-mono text-gold uppercase tracking-widest font-bold block mb-3">Step 3: Brewing Style</span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setIsIced(false)}
                        className={`py-3 px-2 text-center rounded-none border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          !isIced 
                            ? 'bg-red-500/10 border-red-500/75 text-red-600 dark:text-red-400' 
                            : 'border-coffee/10 bg-cream/10 dark:bg-charcoal dark:border-white/5 text-coffee-light dark:text-cream-dark'
                        }`}
                      >
                        <Flame className="w-3.5 h-3.5 animate-pulse" />
                        HOT BREWED
                      </button>
                      <button
                        onClick={() => setIsIced(true)}
                        className={`py-3 px-2 text-center rounded-none border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          isIced 
                            ? 'bg-sky-500/10 border-sky-500/75 text-sky-600 dark:text-sky-400' 
                            : 'border-coffee/10 bg-cream/10 dark:bg-charcoal dark:border-white/5 text-coffee-light dark:text-cream-dark'
                        }`}
                      >
                        <span>❄</span>
                        ICED CHILLED
                      </button>
                    </div>
                  </div>

                  {/* Espresso Shots adjust */}
                  <div className="mt-4">
                    <span className="text-xs font-mono text-gold uppercase tracking-widest font-bold block mb-2">Step 4: Espresso Strength</span>
                    <div className="flex items-center justify-between bg-cream/20 dark:bg-charcoal-dark/40 border border-coffee/10 dark:border-white/5 p-2 px-3">
                      <span className="text-xs font-bold text-coffee dark:text-cream">
                        {shotsCount} {shotsCount === 1 ? 'Single Shot' : shotsCount === 2 ? 'Double Shot' : 'Triple Shot (Extra Kick)'}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setShotsCount(prev => Math.max(1, prev - 1))}
                          className="w-7 h-7 bg-coffee dark:bg-gold text-cream dark:text-charcoal flex items-center justify-center rounded-none transition-opacity hover:opacity-90 disabled:opacity-30 cursor-pointer"
                          disabled={shotsCount <= 1}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => setShotsCount(prev => Math.min(3, prev + 1))}
                          className="w-7 h-7 bg-coffee dark:bg-gold text-cream dark:text-charcoal flex items-center justify-center rounded-none transition-opacity hover:opacity-90 disabled:opacity-30 cursor-pointer"
                          disabled={shotsCount >= 3}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <span className="text-[10px] text-coffee-light/80 dark:text-cream-dark/60 mt-1 block">
                      {shotsCount > 1 ? `+₹${(shotsCount - 1) * 50} for extra shots` : 'Standard shot included'}
                    </span>
                  </div>

                </div>

              </div>

              {/* Step 3: Sweetness Slider & Syrups */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Syrups select */}
                <div>
                  <span className="text-xs font-mono text-gold uppercase tracking-widest font-bold block mb-3">Step 5: Flavor Syrups</span>
                  <div className="grid grid-cols-2 sm:grid-cols-1 gap-1.5">
                    {FLAVOR_SYRUPS.map((syrup) => {
                      const isSelected = selectedSyrup.id === syrup.id;
                      return (
                        <button
                          key={syrup.id}
                          onClick={() => setSelectedSyrup(syrup)}
                          className={`w-full py-2 px-3 text-left rounded-none border text-xs transition-all flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? 'bg-coffee/5 border-gold dark:bg-gold/10 dark:border-gold text-coffee dark:text-cream font-bold'
                              : 'border-coffee/10 hover:border-gold/30 bg-cream/10 dark:bg-charcoal dark:border-white/5 text-coffee-light dark:text-cream-dark'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span 
                              className="w-2 h-2 rounded-full block" 
                              style={{ backgroundColor: syrup.color === 'transparent' ? '#666' : syrup.color }}
                            />
                            {syrup.name}
                          </span>
                          <span className="text-[10px] font-mono text-coffee-light dark:text-cream-dark">
                            {syrup.price > 0 ? `+₹${syrup.price}` : 'Free'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Sweetness Slider */}
                <div>
                  <span className="text-xs font-mono text-gold uppercase tracking-widest font-bold block mb-3">Step 6: Sweetness Level</span>
                  <div className="bg-cream/10 dark:bg-charcoal/50 border border-coffee/10 dark:border-white/5 p-4 rounded-none h-[142px] flex flex-col justify-around">
                    <div className="flex justify-between items-center text-xs font-bold text-coffee dark:text-cream mb-2">
                      <span>Sweetness</span>
                      <span className="text-gold font-mono">{sweetnessLevel}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="25"
                      value={sweetnessLevel}
                      onChange={(e) => setSweetnessLevel(Number(e.target.value))}
                      className="w-full accent-gold bg-coffee-light/30 h-1 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-coffee-light/70 dark:text-cream-dark/50 mt-2 font-bold">
                      <span>Unsweetened</span>
                      <span>Regular</span>
                      <span>Extra Sweet</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Step 4: Toppings Multi-select */}
              <div>
                <span className="text-xs font-mono text-gold uppercase tracking-widest font-bold block mb-3">Step 7: Premium Toppings (Optional)</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {TOPPINGS.map((topping) => {
                    const isSelected = selectedToppings.some(t => t.id === topping.id);
                    return (
                      <button
                        key={topping.id}
                        onClick={() => handleToggleTopping(topping)}
                        className={`py-2 px-2 text-center rounded-none border text-xs transition-all flex items-center justify-between cursor-pointer ${
                          isSelected 
                            ? 'bg-gold/10 border-gold text-coffee dark:text-cream font-bold' 
                            : 'border-coffee/10 hover:border-gold/30 bg-cream/10 dark:bg-charcoal dark:border-white/5 text-coffee-light dark:text-cream-dark'
                        }`}
                      >
                        <span className="truncate">{topping.name}</span>
                        <span className="text-[10px] font-mono text-gold shrink-0">
                          {isSelected ? <Check className="w-3 h-3 text-gold inline ml-1" /> : `+₹${topping.price}`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Bottom Actions Block with Food Pairing Recommendation */}
            <div className="mt-8 pt-6 border-t border-coffee/5 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 bg-cream/10 dark:bg-charcoal/30 p-4">
              
              {/* Bakery Suggestion */}
              <div className="flex items-start gap-3 text-left max-w-sm">
                <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center text-gold shrink-0 mt-0.5">
                  <Cookie className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-gold font-bold">Perfect Pairing</span>
                    <Sparkles className="w-3 h-3 text-gold animate-bounce" />
                  </div>
                  <h4 className="font-serif text-xs font-bold text-coffee dark:text-cream leading-snug">{recommendedPairing.name}</h4>
                  <p className="text-[10px] text-coffee-light/80 dark:text-cream-dark/60 leading-tight mt-0.5">{recommendedPairing.desc}</p>
                </div>
              </div>

              {/* Action Button */}
              <div className="w-full sm:w-auto relative shrink-0">
                <AnimatePresence>
                  {addedAnimationTrigger && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute -top-10 left-1/2 -translate-x-1/2 bg-coffee dark:bg-gold text-cream dark:text-charcoal text-[10px] font-mono tracking-widest px-3 py-1 uppercase font-bold z-30"
                    >
                      Added Custom Brew!
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <button
                  onClick={handleAddCustomToCart}
                  className="w-full sm:w-auto px-8 py-3.5 bg-gold text-charcoal font-bold text-xs uppercase tracking-widest transition-transform duration-300 hover:brightness-105 active:scale-95 flex items-center justify-center gap-2 rounded-none cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4 text-charcoal" />
                  Order Custom Brew (₹{totalPrice})
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
