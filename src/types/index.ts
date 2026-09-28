export type CuisineType = 
  | 'All'
  | 'Pizza'
  | 'Burgers'
  | 'Chicken'
  | 'Chinese'
  | 'Indian'
  | 'Fast Food'
  | 'Healthy Food'
  | 'Desserts'
  | 'Italian'
  | 'Mexican';

export type FoodCategory =
  | 'Pizza'
  | 'Burgers'
  | 'Chicken'
  | 'Chinese'
  | 'Indian'
  | 'Fast Food'
  | 'Healthy Food'
  | 'Desserts';

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  originalPrice: number;
  offerPrice: number;
  isVeg: boolean;
  description: string;
  isBestseller?: boolean;
  image?: string;
}

export interface RestaurantReview {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  location: string;
  rating: number;
  reviewsCount: number;
  avgMealPrice: number;
  discountOffer: string;
  discountPercent: number;
  deliveryFee: number;
  deliveryTimeMinutes: number;
  distanceKm: number;
  isBestValue: boolean;
  bestValueReason?: string;
  valueScore: number; // 1 to 100 calculated transparently
  address: string;
  openingHours: string;
  contactPhone: string;
  photos: string[];
  menuItems: MenuItem[];
  tags: string[];
  isPureVeg: boolean;
  isTakeawayAvailable: boolean;
  currentOffers: string[];
}

export interface Offer {
  id: string;
  title: string;
  subtitle: string;
  category: FoodCategory;
  restaurantId: string;
  restaurantName: string;
  originalPrice: number;
  offerPrice: number;
  discountPercentage: number;
  rating: number;
  reviewCount: number;
  isBestDeal: boolean;
  isTodayDeal?: boolean;
  dealEndsInSeconds?: number;
  image: string;
  isVeg: boolean;
  description: string;
  portionInfo: string;
  deliveryTime: string;
  freeDelivery?: boolean;
}

export interface CartItem {
  id: string;
  itemId: string;
  name: string;
  price: number;
  offerPrice: number;
  quantity: number;
  restaurantId: string;
  restaurantName: string;
  isVeg: boolean;
  image?: string;
}

export interface Coupon {
  code: string;
  title: string;
  discountType: 'percentage' | 'flat';
  value: number;
  minOrder: number;
  description: string;
  expiresIn?: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discountSavings: number;
  couponDiscount: number;
  deliveryFee: number;
  finalTotal: number;
  restaurantName: string;
  status: 'Preparing' | 'Out for Delivery' | 'Delivered';
  deliveryAddress: string;
  deliveryType: 'Delivery' | 'Takeaway';
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  isLoggedIn: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  isUnread: boolean;
  type: 'offer' | 'price_drop' | 'order';
}
