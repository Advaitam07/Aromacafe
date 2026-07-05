import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import BrewCustomizer from './components/BrewCustomizer';
import Special from './components/Special';
import WhyChooseUs from './components/WhyChooseUs';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import Reservation from './components/Reservation';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cart from './components/Cart';
import FloatingButtons from './components/FloatingButtons';
import { MenuItem, CartItem } from './types';

export default function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Active section scroll state
  const [activeSection, setActiveSection] = useState('hero');

  // Handle dark mode side effects
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Handle active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120; // 80px navbar + padding offset
      const sections = [
        'hero',
        'about',
        'menu',
        'brew-customizer',
        'special',
        'why-us',
        'gallery',
        'reviews',
        'reservation',
        'contact',
      ];

      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sec);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = (item: MenuItem) => {
    setCartItems((prev) => {
      const existing = prev.find((cartItem) => cartItem.id === item.id);
      if (existing) {
        return prev.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      }
      return [...prev, { id: item.id, menuItem: item, quantity: 1 }];
    });
    // Open cart automatically so guests see visual feedback
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((cartItem) => {
          if (cartItem.id === id) {
            return { ...cartItem, quantity: cartItem.quantity + delta };
          }
          return cartItem;
        })
        .filter((cartItem) => cartItem.quantity > 0)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((cartItem) => cartItem.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-cream dark:bg-charcoal text-coffee dark:text-cream transition-colors duration-300">
      {/* Navigation */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartToggle={() => setIsCartOpen(!isCartOpen)}
        activeSection={activeSection}
      />

      <div className="pt-[72px] lg:pt-[76px]">
        {/* Full-width premium single-page scrolling layout following first-class UI/UX */}
        <Hero
          onViewMenu={() => handleScrollToSection('menu')}
          onOrderNow={() => handleScrollToSection('menu')}
        />
        <About />
        <Menu onAddToCart={handleAddToCart} />
        <BrewCustomizer onAddToCart={handleAddToCart} />
        <Special onAddToCart={handleAddToCart} />
        <WhyChooseUs />
        <Gallery />
        <Reviews />
        <Reservation />
        <Contact />
        <Footer />
      </div>

      {/* Shopping Cart Slider Drawer */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Floating Action Panels */}
      <FloatingButtons />
    </div>
  );
}
