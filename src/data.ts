import { MenuItem, Testimonial, GalleryItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  // --- ESPRESSO ---
  {
    id: 'esp-1',
    name: 'Classic Espresso',
    description: 'Double shot of our signature house blend with a thick, golden crema.',
    price: 3.25,
    category: 'Espresso',
    image: '/src/assets/images/classic_espresso_1783255986969.jpg',
    tag: 'Strong'
  },
  {
    id: 'esp-2',
    name: 'Espresso Macchiato',
    description: 'Classic double shot of espresso marked with a dollop of velvety milk foam.',
    price: 3.50,
    category: 'Espresso',
    image: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&q=80&w=600'
  },

  // --- CAPPUCCINO ---
  {
    id: 'cap-1',
    name: 'Classic Cappuccino',
    description: 'Equal parts rich espresso, steamed milk, and dense milk foam, dusted with cocoa.',
    price: 4.50,
    category: 'Cappuccino',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80&w=600',
    tag: 'Classic'
  },
  {
    id: 'cap-2',
    name: 'Gold Dust Cappuccino',
    description: 'Our signature cappuccino garnished with edible 24k gold leaf and premium organic honey.',
    price: 5.95,
    category: 'Cappuccino',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&q=80&w=600',
    tag: 'Signature'
  },

  // --- LATTE ---
  {
    id: 'lat-1',
    name: 'Vanilla Bean Latte',
    description: 'Rich espresso, steamed milk, and sweet Madagascar vanilla syrup with elegant foam art.',
    price: 4.95,
    category: 'Latte',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=600',
    tag: 'Best Seller'
  },
  {
    id: 'lat-2',
    name: 'Spanish Rose Latte',
    description: 'Steamed condensed milk and espresso infused with real organic rose-water extract.',
    price: 5.25,
    category: 'Latte',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600'
  },

  // --- COLD COFFEE ---
  {
    id: 'cc-1',
    name: 'Aroma Sea Salt Cold Brew',
    description: '18-hour slow-dripped organic cold brew topped with sea salt sweet cream cold foam.',
    price: 5.50,
    category: 'Cold Coffee',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=600',
    tag: 'Barista Choice'
  },
  {
    id: 'cc-2',
    name: 'Classic Vietnamese Iced Coffee',
    description: 'Slow-drip dark roast coffee sweetened with organic condensed milk over crushed ice.',
    price: 4.95,
    category: 'Cold Coffee',
    image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&q=80&w=600'
  },

  // --- MOCHA ---
  {
    id: 'moc-1',
    name: 'Gourmet Dark Chocolate Mocha',
    description: 'Rich dark espresso, gourmet dark cocoa syrup, and steamed milk topped with fresh whipped cream.',
    price: 5.25,
    category: 'Mocha',
    image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&q=80&w=600',
    tag: 'Indulgent'
  },

  // --- ICED AMERICANO ---
  {
    id: 'ame-1',
    name: 'Craft Iced Americano',
    description: 'Chilled double shot of espresso over ice cubes, diluted with pure cold water.',
    price: 3.95,
    category: 'Iced Americano',
    image: 'https://images.unsplash.com/photo-1551046713-bc47f9987f09?auto=format&fit=crop&q=80&w=600'
  },

  // --- TEA ---
  {
    id: 'tea-1',
    name: 'Matcha Green Tea Latte',
    description: 'Premium stone-ground Japanese matcha whisked with steamed oat milk and organic agave.',
    price: 5.50,
    category: 'Tea',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&q=80&w=600',
    tag: 'Organic'
  },
  {
    id: 'tea-2',
    name: 'Royal Earl Grey Lavender',
    description: 'Finest Earl Grey tea steeped with culinary lavender buds and a dash of sweet cream.',
    price: 4.75,
    category: 'Tea',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=600'
  },

  // --- FRESH JUICES ---
  {
    id: 'jui-1',
    name: 'Cold-Pressed Sunrise Glow',
    description: '100% natural cold-pressed orange, carrot, fresh ginger, and turmeric juice.',
    price: 5.95,
    category: 'Fresh Juices',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=600',
    tag: 'Healthy'
  },

  // --- SANDWICHES ---
  {
    id: 'san-1',
    name: 'Truffle Mushroom Avocado Toast',
    description: 'Sourdough slice topped with mashed Hass avocado, sautéed wild truffle mushrooms, and feta.',
    price: 9.95,
    category: 'Sandwiches',
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&q=80&w=600',
    tag: 'Chef Special'
  },
  {
    id: 'san-2',
    name: 'Smoked Pesto Chicken Panini',
    description: 'Artisanal pan-seared chicken with house-made basil pesto, heirloom tomatoes, and melted mozzarella.',
    price: 11.50,
    category: 'Sandwiches',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=600'
  },

  // --- BURGERS ---
  {
    id: 'bur-1',
    name: 'Aroma Signature Brioche Burger',
    description: 'Hand-pressed organic wagyu beef patty, sharp cheddar, caramelized onions, house truffle aioli on toasted brioche.',
    price: 14.50,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600',
    tag: 'Best Seller'
  },

  // --- PASTA ---
  {
    id: 'pas-1',
    name: 'Truffle Mushroom Rigatoni',
    description: 'Al dente rigatoni tossed in a velvety wild mushroom and black truffle cream sauce with parmesan.',
    price: 15.95,
    category: 'Pasta',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=600',
    tag: 'Signature'
  },

  // --- PIZZA ---
  {
    id: 'piz-1',
    name: 'Artisanal Burrata & Prosciutto Pizza',
    description: 'Wood-fired sourdough base topped with San Marzano tomatoes, fresh burrata cheese, prosciutto, and wild arugula.',
    price: 16.50,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600',
    tag: 'Wood-Fired'
  },

  // --- DESSERTS ---
  {
    id: 'des-1',
    name: 'Classic French Macaron Box',
    description: 'A delicate selection of 5 gluten-free hand-crafted macarons (pistachio, salted caramel, rose, chocolate, vanilla).',
    price: 8.50,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=600',
    tag: 'Sweet Selection'
  },

  // --- CAKES ---
  {
    id: 'cak-1',
    name: 'Decadent Chocolate Fudge Lava',
    description: 'Warm rich Belgian dark chocolate lava cake with molten core, served with organic vanilla bean gelato.',
    price: 7.95,
    category: 'Cakes',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600',
    tag: 'Indulgent'
  },
  {
    id: 'cak-2',
    name: 'Classic Salted Caramel Cheesecake',
    description: 'Creamy New York style baked cheesecake layered with thick sea-salt caramel and a pecan graham crust.',
    price: 8.25,
    category: 'Cakes',
    image: 'https://images.unsplash.com/photo-1524351199679-46cddf530c04?auto=format&fit=crop&q=80&w=600'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'rev-1',
    name: 'Sophia Harrison',
    role: 'Local Food Critic & Designer',
    comment: 'The atmosphere is an absolute masterpiece of warm tones and beautiful lighting. Their Vanilla Bean Latte is easily the best in the city, and the brioche burger is a pure culinary delight.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 'rev-2',
    name: 'Dr. Liam Mitchell',
    role: 'Regular Patron / Researcher',
    comment: 'With their high-speed fiber Wi-Fi and premium quiet seating options, Brew & Beans has become my second workspace. The experienced baristas truly understand temperature and flavor notes.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 'rev-3',
    name: 'Amara Lopez',
    role: 'Gourmet Baker',
    comment: 'As a baker, I am extremely critical of pastries and desserts. The French Macarons are exceptionally light, crisp, and beautifully flavored. Highly recommend the truffle mushroom rigatoni too!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    category: 'interior',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800',
    caption: 'Cozy fireplace seating area'
  },
  {
    id: 'gal-2',
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?auto=format&fit=crop&q=80&w=800',
    caption: 'Pour-over coffee slow-brewing'
  },
  {
    id: 'gal-3',
    category: 'food',
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&q=80&w=800',
    caption: 'Gourmet organic avocado sourdough'
  },
  {
    id: 'gal-4',
    category: 'outdoor',
    image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=800',
    caption: 'Sunny Parisian-style patio garden'
  },
  {
    id: 'gal-5',
    category: 'interior',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800',
    caption: 'Modern modular wooden counter and barista bar'
  },
  {
    id: 'gal-6',
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=800',
    caption: 'Pouring beautiful maple latte art'
  }
];
