import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ShoppingBag, CreditCard, Sparkles, AlertCircle } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function Cart({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartProps) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  const getItemPrice = (price: number) => {
    return price >= 20 ? price : price * 50;
  };

  const subtotal = cartItems.reduce((acc, item) => acc + getItemPrice(item.menuItem.price) * item.quantity, 0);
  const deliveryFee = subtotal >= 500 || subtotal === 0 ? 0 : 50;
  const tax = subtotal * 0.05; // 5% GST
  const total = subtotal + deliveryFee + tax;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate API request
    setTimeout(() => {
      const generatedId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
      setOrderId(generatedId);
      setIsCheckingOut(false);
      setCheckoutComplete(true);
      onClearCart();
    }, 1500);
  };

  const handleResetCheckout = () => {
    setCheckoutComplete(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-charcoal-dark z-50 cursor-pointer"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-charcoal shadow-xl z-50 flex flex-col justify-between border-l border-coffee/20 dark:border-white/10"
          >
            {/* Header */}
            <div className="p-6 border-b border-coffee/15 dark:border-white/10 flex items-center justify-between bg-white dark:bg-charcoal">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-4 h-4 text-gold" />
                <h3 className="font-serif text-lg font-bold text-coffee dark:text-cream uppercase tracking-wide">
                  Your Coffee Bag
                </h3>
                <span className="bg-gold/15 text-gold text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-none border border-gold/25">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-none hover:bg-cream dark:hover:bg-charcoal-dark text-coffee/60 dark:text-cream-dark/60 hover:text-coffee dark:hover:text-cream cursor-pointer border border-transparent hover:border-coffee/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-grow overflow-y-auto p-6 space-y-4">
              {checkoutComplete ? (
                /* Checkout Success View */
                <div className="text-center py-12 space-y-6">
                  <div className="w-12 h-12 bg-green-50 dark:bg-green-950/20 rounded-none border border-green-200/50 flex items-center justify-center mx-auto text-green-600 dark:text-green-400">
                    <Sparkles className="w-6 h-6 animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-serif text-xl font-bold text-coffee dark:text-cream uppercase tracking-wide">
                      Order Placed!
                    </h4>
                    <p className="text-xs text-coffee-light/90 dark:text-cream-dark/70 px-4 leading-relaxed font-sans">
                      Thank you for choosing Brew & Beans Coffee House. Your freshly crafted order is now being prepared by our barista.
                    </p>
                  </div>
                  <div className="p-4 bg-cream/10 dark:bg-charcoal-dark rounded-none border border-dashed border-gold/35">
                    <p className="text-[10px] text-coffee-light/60 dark:text-cream-dark/50 font-mono uppercase tracking-widest font-bold">ORDER TRACKING ID</p>
                    <p className="font-mono text-xl font-bold text-gold mt-1 tracking-widest uppercase">{orderId}</p>
                  </div>
                  <button
                    onClick={handleResetCheckout}
                    className="w-full py-3.5 text-xs font-bold uppercase tracking-widest text-white dark:text-charcoal-dark transition duration-300 hover:brightness-110 rounded-none cursor-pointer"
                    style={{ backgroundColor: '#2C2C2C' }}
                  >
                    Keep Browsing
                  </button>
                </div>
              ) : cartItems.length === 0 ? (
                /* Empty bag view */
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="p-4 rounded-none bg-cream/30 dark:bg-charcoal-dark border border-coffee/15 text-coffee/60 dark:text-white/20">
                    <ShoppingBag className="w-10 h-10" />
                  </div>
                  <p className="text-coffee dark:text-cream font-bold text-sm uppercase tracking-wider">Your coffee bag is empty</p>
                  <p className="text-xs text-coffee-light/80 dark:text-cream-dark/60 max-w-xs leading-relaxed font-sans">
                    Browse our signature categories and add premium handcrafted hot lattes or desserts!
                  </p>
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 border border-gold text-gold hover:bg-gold hover:text-white font-bold text-xs uppercase tracking-widest rounded-none transition-all cursor-pointer"
                  >
                    View Menu
                  </button>
                </div>
              ) : (
                /* Item list */
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-none bg-white dark:bg-charcoal border border-coffee/15 dark:border-white/10 flex gap-4 items-center group shadow-sm"
                  >
                    {/* Item Thumbnail */}
                    <div className="w-16 h-16 rounded-none overflow-hidden shrink-0 bg-cream-dark dark:bg-charcoal-dark border border-coffee/10 dark:border-white/5">
                      <img
                        src={item.menuItem.image || 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=150'}
                        alt={item.menuItem.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-sm font-bold text-coffee dark:text-cream leading-tight">
                          {item.menuItem.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-coffee-light/40 hover:text-red-600 dark:hover:text-red-400 p-1 rounded-none transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-gold font-mono font-bold mt-1">
                        ₹{Math.round(getItemPrice(item.menuItem.price))} each
                      </p>

                      {/* Quantity Toggles */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center space-x-1 bg-white dark:bg-charcoal border border-coffee/15 dark:border-white/10 rounded-none p-0.5">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 text-coffee hover:bg-cream/45 rounded-none dark:text-cream dark:hover:bg-charcoal-dark cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono text-xs font-bold px-2 text-coffee dark:text-cream">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 text-coffee hover:bg-cream/45 rounded-none dark:text-cream dark:hover:bg-charcoal-dark cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="font-mono text-sm font-bold text-coffee dark:text-cream">
                          ₹{Math.round(getItemPrice(item.menuItem.price) * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Calculations & Checkout Button */}
            {!checkoutComplete && cartItems.length > 0 && (
              <div className="p-6 border-t border-coffee/15 dark:border-white/10 bg-cream/10 dark:bg-charcoal-dark/20 space-y-4">
                {/* Free shipping banner */}
                {subtotal >= 500 ? (
                  <div className="p-3 bg-green-50 dark:bg-green-950/20 text-green-800 dark:text-green-400 rounded-none flex items-center space-x-2 text-xs font-medium border border-green-200/50">
                    <Sparkles className="w-3.5 h-3.5 text-green-600 shrink-0" />
                    <span className="font-sans text-[11px]">Congrats! You earned Free Premium Delivery.</span>
                  </div>
                ) : (
                  <div className="p-3 bg-gold/5 text-coffee-light dark:text-cream-dark rounded-none flex items-center space-x-2 text-xs border border-gold/20">
                    <AlertCircle className="w-3.5 h-3.5 text-gold shrink-0" />
                    <span className="font-sans text-[11px]">Add <strong>₹{Math.round(500 - subtotal)}</strong> more for free delivery!</span>
                  </div>
                )}

                {/* Bill details */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-coffee-light dark:text-cream-dark/70">
                    <span>Subtotal</span>
                    <span className="font-mono">₹{Math.round(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-coffee-light dark:text-cream-dark/70">
                    <span>GST (5%)</span>
                    <span className="font-mono">₹{Math.round(tax)}</span>
                  </div>
                  <div className="flex justify-between text-coffee-light dark:text-cream-dark/70">
                    <span>Premium Delivery</span>
                    <span className="font-mono">{deliveryFee === 0 ? 'FREE' : `₹${Math.round(deliveryFee)}`}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-coffee dark:text-cream pt-2 border-t border-dashed border-coffee/20 dark:border-white/20">
                    <span>Total Amount</span>
                    <span className="font-mono text-gold text-base">₹{Math.round(total)}</span>
                  </div>
                </div>

                {/* Checkout button */}
                <button
                  disabled={isCheckingOut}
                  onClick={handleCheckout}
                  className="w-full py-3.5 text-xs font-bold uppercase tracking-widest text-white transition duration-300 hover:brightness-110 flex items-center justify-center space-x-2 disabled:opacity-55 disabled:pointer-events-none rounded-none cursor-pointer shadow-sm"
                  style={{ backgroundColor: '#2C2C2C' }}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>{isCheckingOut ? 'Simulating Secure Gateway...' : 'Simulate Checkout'}</span>
                </button>
                <p className="text-[9px] text-center text-coffee-light/50 dark:text-cream-dark/50 font-sans leading-tight">
                  Secure checkout simulation. No real money required.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
