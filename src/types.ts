export type Category =
  | 'Espresso'
  | 'Cappuccino'
  | 'Latte'
  | 'Cold Coffee'
  | 'Mocha'
  | 'Iced Americano'
  | 'Tea'
  | 'Fresh Juices'
  | 'Sandwiches'
  | 'Burgers'
  | 'Pasta'
  | 'Pizza'
  | 'Desserts'
  | 'Cakes';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image?: string;
  isSpecial?: boolean;
  tag?: string; // e.g., 'Chef Special', 'Best Seller', 'New'
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
}

export interface ReservationData {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  notes?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
  avatar: string;
}

export interface GalleryItem {
  id: string;
  category: 'interior' | 'drinks' | 'food' | 'outdoor';
  image: string;
  caption: string;
}
