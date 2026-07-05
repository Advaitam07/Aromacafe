import React, { useState, useEffect } from 'react';
import { Coffee, Sun, Moon, ShoppingBag, Menu as MenuIcon, X } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  cartCount: number;
  onCartToggle: () => void;
  activeSection: string;
}

export default function Navbar({
  darkMode,
  setDarkMode,
  cartCount,
  onCartToggle,
  activeSection,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', name: 'Home' },
    { id: 'about', name: 'About' },
    { id: 'menu', name: 'Menu' },
    { id: 'brew-customizer', name: 'Brew Lab' },
    { id: 'gallery', name: 'Gallery' },
    { id: 'reservation', name: 'Reservation' },
    { id: 'contact', name: 'Contact' },
  ];

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticky navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-cream/95 dark:bg-charcoal-dark/95 shadow-sm backdrop-blur-md py-4 border-coffee/20 dark:border-white/10'
          : 'bg-transparent py-5 border-coffee/10 dark:border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => handleScrollTo('hero')}
            className="flex items-center space-x-2.5 cursor-pointer group shrink-0"
          >
            <div className="w-8.5 h-8.5 rounded-none bg-gold flex items-center justify-center border border-white/20 transition-transform duration-300 group-hover:rotate-12">
              <span className="text-white text-base font-serif font-bold">B</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-serif text-lg tracking-wider uppercase font-bold text-coffee dark:text-cream">
                BREW & <span className="text-gold">BEANS</span>
              </span>
              <span className="text-[7px] font-mono tracking-[0.25em] text-coffee-light/60 dark:text-cream-dark/50 uppercase font-bold">
                COFFEE HOUSE
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleScrollTo(link.id)}
                className={`px-3 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 relative cursor-pointer ${
                  activeSection === link.id
                    ? 'text-gold'
                    : 'text-coffee dark:text-cream-dark hover:text-gold dark:hover:text-gold'
                }`}
              >
                {link.name}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gold rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-none bg-cream-dark/30 dark:bg-charcoal hover:bg-gold hover:text-cream dark:hover:bg-gold dark:hover:text-charcoal-dark text-coffee dark:text-cream transition-colors duration-300 cursor-pointer border border-coffee/15 dark:border-white/10"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onCartToggle}
              className="p-2.5 rounded-none bg-cream-dark/30 dark:bg-charcoal hover:bg-gold hover:text-cream dark:hover:bg-gold dark:hover:text-charcoal-dark text-coffee dark:text-cream transition-colors duration-300 relative cursor-pointer border border-coffee/15 dark:border-white/10"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-charcoal-dark text-[10px] font-bold w-5 h-5 rounded-none flex items-center justify-center animate-bounce shadow-md">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Order Now Button - Desktop */}
            <button
              onClick={() => handleScrollTo('menu')}
              className="hidden sm:inline-block px-5 py-2 text-[11px] font-bold uppercase tracking-widest text-white transition hover:brightness-110 cursor-pointer rounded-none"
              style={{ backgroundColor: '#C89B3C' }}
            >
              Order Now
            </button>

            {/* Mobile Menu Icon */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-none text-coffee dark:text-cream hover:bg-cream-dark/30 dark:hover:bg-charcoal transition-colors duration-300 cursor-pointer border border-coffee/15 dark:border-white/10"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden fixed inset-0 top-[72px] z-30 bg-cream/98 dark:bg-charcoal-dark/98 backdrop-blur-md transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        <div className="px-6 py-12 space-y-3 flex flex-col items-center justify-start h-[calc(100vh-72px)] overflow-y-auto">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleScrollTo(link.id)}
              className={`w-full max-w-xs text-center py-3.5 text-base font-serif font-bold uppercase tracking-widest rounded-none border transition-all duration-300 cursor-pointer ${
                activeSection === link.id
                  ? 'bg-coffee border-coffee text-cream dark:bg-gold dark:border-gold dark:text-charcoal-dark shadow-sm'
                  : 'border-coffee/10 dark:border-white/10 text-coffee dark:text-cream hover:bg-cream-dark/50 dark:hover:bg-charcoal/50'
              }`}
            >
              {link.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
