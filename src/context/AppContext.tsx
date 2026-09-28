import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CartItem,
  Coupon,
  FoodCategory,
  NotificationItem,
  Offer,
  Order,
  Restaurant,
  UserProfile,
} from '../types';
import { AVAILABLE_COUPONS, RESTAURANTS, SAMPLE_NOTIFICATIONS } from '../data/mockData';

interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  // Cart
  cart: CartItem[];
  addToCart: (item: {
    itemId: string;
    name: string;
    price: number;
    offerPrice: number;
    restaurantId: string;
    restaurantName: string;
    isVeg: boolean;
    image?: string;
  }) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Pricing calculations
  cartSubtotal: number;
  dealSavings: number;
  couponDiscount: number;
  deliveryFee: number;
  finalTotal: number;

  // Coupon
  activeCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (offerId: string) => void;
  isWishlisted: (offerId: string) => boolean;

  // Saved Restaurants
  savedRestaurants: string[];
  toggleSavedRestaurant: (restaurantId: string) => void;
  isRestaurantSaved: (restaurantId: string) => boolean;

  // Orders
  orders: Order[];
  placeOrder: (deliveryType: 'Delivery' | 'Takeaway', address: string) => Order | null;
  reorder: (order: Order) => void;

  // User
  user: UserProfile;
  login: (name: string, email: string) => void;
  logout: () => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;

  // Modals & Navigation
  isWishlistModalOpen: boolean;
  setIsWishlistModalOpen: (open: boolean) => void;
  isOrderHistoryOpen: boolean;
  setIsOrderHistoryOpen: (open: boolean) => void;
  isCouponModalOpen: boolean;
  setIsCouponModalOpen: (open: boolean) => void;
  selectedRestaurantModal: Restaurant | null;
  setSelectedRestaurantModal: (restaurant: Restaurant | null) => void;

  // Compare Drawer
  compareList: Restaurant[];
  toggleCompareRestaurant: (restaurant: Restaurant) => void;
  clearCompareList: () => void;
  isCompareDrawerOpen: boolean;
  setIsCompareDrawerOpen: (open: boolean) => void;

  // Global search & category
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: FoodCategory | 'All';
  setSelectedCategory: (cat: FoodCategory | 'All') => void;

  // Notifications
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  markNotificationsAsRead: () => void;

  // Toast
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // LocalStorage loaders
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('tc_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('tc_wishlist');
      return saved ? JSON.parse(saved) : ['offer-1', 'offer-5'];
    } catch {
      return ['offer-1', 'offer-5'];
    }
  });

  const [savedRestaurants, setSavedRestaurants] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('tc_saved_restaurants');
      return saved ? JSON.parse(saved) : ['rest-1', 'rest-3'];
    } catch {
      return ['rest-1', 'rest-3'];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('tc_orders');
      if (saved) return JSON.parse(saved);
      // Default sample past order
      return [
        {
          id: 'ORD-9821',
          date: 'Yesterday, 8:40 PM',
          items: [
            {
              id: 'c-1',
              itemId: 'offer-1',
              name: 'Woodfired Pizza Combo',
              price: 349,
              offerPrice: 199,
              quantity: 1,
              restaurantId: 'rest-1',
              restaurantName: 'The Pizza Atelier',
              isVeg: true,
            },
          ],
          subtotal: 349,
          discountSavings: 150,
          couponDiscount: 50,
          deliveryFee: 0,
          finalTotal: 149,
          restaurantName: 'The Pizza Atelier',
          status: 'Delivered',
          deliveryAddress: 'Flat 402, Sunset Heights, 80 Feet Road',
          deliveryType: 'Delivery',
        },
      ];
    } catch {
      return [];
    }
  });

  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('tc_user');
      return saved
        ? JSON.parse(saved)
        : {
            name: 'Rohit Sharma',
            email: 'rohit@tastecompare.in',
            phone: '+91 98765 12345',
            address: 'Flat 402, Sunset Heights, 80 Feet Road, Downtown',
            isLoggedIn: true,
          };
    } catch {
      return {
        name: 'Rohit Sharma',
        email: 'rohit@tastecompare.in',
        phone: '+91 98765 12345',
        address: 'Flat 402, Sunset Heights, 80 Feet Road, Downtown',
        isLoggedIn: true,
      };
    }
  });

  const [activeCoupon, setActiveCoupon] = useState<Coupon | null>(AVAILABLE_COUPONS[0]);
  const [notifications, setNotifications] = useState<NotificationItem[]>(SAMPLE_NOTIFICATIONS);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isWishlistModalOpen, setIsWishlistModalOpen] = useState(false);
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [isCompareDrawerOpen, setIsCompareDrawerOpen] = useState(false);
  const [selectedRestaurantModal, setSelectedRestaurantModal] = useState<Restaurant | null>(null);
  const [compareList, setCompareList] = useState<Restaurant[]>([RESTAURANTS[0], RESTAURANTS[1]]);

  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory | 'All'>('All');

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('tc_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('tc_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('tc_saved_restaurants', JSON.stringify(savedRestaurants));
  }, [savedRestaurants]);

  useEffect(() => {
    localStorage.setItem('tc_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('tc_user', JSON.stringify(user));
  }, [user]);

  // Toast helper
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString().substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  // Cart operations
  const addToCart = (item: {
    itemId: string;
    name: string;
    price: number;
    offerPrice: number;
    restaurantId: string;
    restaurantName: string;
    isVeg: boolean;
    image?: string;
  }) => {
    setCart((prev) => {
      // Check if from different restaurant
      if (prev.length > 0 && prev[0].restaurantId !== item.restaurantId) {
        showToast(`Started a fresh cart with ${item.restaurantName}`, 'info');
        return [
          {
            id: 'cart-' + Date.now(),
            ...item,
            quantity: 1,
          },
        ];
      }

      const existingIndex = prev.findIndex((c) => c.itemId === item.itemId);
      if (existingIndex >= 0) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + 1,
        };
        showToast(`Increased quantity of ${item.name}`);
        return next;
      } else {
        showToast(`Added ${item.name} to cart!`);
        return [
          ...prev,
          {
            id: 'cart-' + Date.now(),
            ...item,
            quantity: 1,
          },
        ];
      }
    });
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.itemId === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((i) => i.itemId !== itemId));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Totals calculations
  const rawSubtotal = cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
  const cartSubtotal = cart.reduce((acc, curr) => acc + curr.offerPrice * curr.quantity, 0);
  const dealSavings = rawSubtotal - cartSubtotal;

  let deliveryFee = cart.length > 0 ? 25 : 0;
  // If restaurant has free delivery or coupon FREEDEL
  if (cart.length > 0) {
    const rest = RESTAURANTS.find((r) => r.id === cart[0].restaurantId);
    if (rest && rest.deliveryFee === 0) {
      deliveryFee = 0;
    }
  }

  let couponDiscount = 0;
  if (activeCoupon && cartSubtotal >= activeCoupon.minOrder) {
    if (activeCoupon.discountType === 'flat') {
      if (activeCoupon.code === 'FREEDEL') {
        couponDiscount = deliveryFee;
      } else {
        couponDiscount = activeCoupon.value;
      }
    } else {
      couponDiscount = Math.round((cartSubtotal * activeCoupon.value) / 100);
    }
  }

  const finalTotal = Math.max(0, cartSubtotal + deliveryFee - couponDiscount);

  // Coupon handling
  const applyCoupon = (code: string) => {
    const found = AVAILABLE_COUPONS.find((c) => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!found) {
      showToast('Invalid coupon code', 'error');
      return { success: false, message: 'Invalid coupon code' };
    }
    if (cartSubtotal < found.minOrder) {
      showToast(`Add ₹${found.minOrder - cartSubtotal} more to apply this coupon`, 'error');
      return { success: false, message: `Minimum order value is ₹${found.minOrder}` };
    }
    setActiveCoupon(found);
    showToast(`Coupon "${found.code}" applied! You save ₹${found.value}`, 'success');
    return { success: true, message: `Coupon ${found.code} applied successfully` };
  };

  const removeCoupon = () => {
    setActiveCoupon(null);
    showToast('Coupon removed', 'info');
  };

  // Wishlist
  const toggleWishlist = (offerId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(offerId);
      if (exists) {
        showToast('Removed from wishlist', 'info');
        return prev.filter((id) => id !== offerId);
      } else {
        showToast('Added to wishlist ❤️', 'success');
        return [...prev, offerId];
      }
    });
  };

  const isWishlisted = (offerId: string) => wishlist.includes(offerId);

  // Saved Restaurants
  const toggleSavedRestaurant = (restaurantId: string) => {
    setSavedRestaurants((prev) => {
      const exists = prev.includes(restaurantId);
      if (exists) {
        showToast('Restaurant removed from saved', 'info');
        return prev.filter((id) => id !== restaurantId);
      } else {
        showToast('Restaurant bookmarked!', 'success');
        return [...prev, restaurantId];
      }
    });
  };

  const isRestaurantSaved = (restaurantId: string) => savedRestaurants.includes(restaurantId);

  // Orders
  const placeOrder = (deliveryType: 'Delivery' | 'Takeaway', address: string): Order | null => {
    if (cart.length === 0) return null;

    const newOrder: Order = {
      id: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
      date: 'Just now',
      items: [...cart],
      subtotal: rawSubtotal,
      discountSavings: dealSavings,
      couponDiscount,
      deliveryFee: deliveryType === 'Takeaway' ? 0 : deliveryFee,
      finalTotal: deliveryType === 'Takeaway' ? Math.max(0, cartSubtotal - couponDiscount) : finalTotal,
      restaurantName: cart[0].restaurantName,
      status: 'Preparing',
      deliveryAddress: address || user.address,
      deliveryType,
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    showToast(`Order #${newOrder.id} placed successfully! 🎉`, 'success');
    return newOrder;
  };

  const reorder = (order: Order) => {
    setCart(order.items);
    setIsCartOpen(true);
    showToast('Items added to cart from past order!', 'success');
  };

  // User
  const login = (name: string, email: string) => {
    setUser({
      name,
      email,
      phone: '+91 98765 43210',
      address: 'Flat 402, Sunset Heights, 80 Feet Road, Downtown',
      isLoggedIn: true,
    });
    setIsAuthModalOpen(false);
    showToast(`Welcome back, ${name}!`);
  };

  const logout = () => {
    setUser({
      name: 'Guest User',
      email: '',
      phone: '',
      address: '',
      isLoggedIn: false,
    });
    showToast('Logged out safely', 'info');
  };

  // Compare drawer
  const toggleCompareRestaurant = (restaurant: Restaurant) => {
    setCompareList((prev) => {
      const exists = prev.some((r) => r.id === restaurant.id);
      if (exists) {
        showToast(`Removed ${restaurant.name} from comparison`, 'info');
        return prev.filter((r) => r.id !== restaurant.id);
      } else {
        if (prev.length >= 3) {
          showToast('You can compare up to 3 restaurants at a time', 'info');
          return [prev[1], prev[2], restaurant];
        }
        showToast(`Added ${restaurant.name} to comparison!`);
        return [...prev, restaurant];
      }
    });
  };

  const clearCompareList = () => {
    setCompareList([]);
  };

  // Notifications
  const unreadNotificationCount = notifications.filter((n) => n.isUnread).length;
  const markNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isUnread: false })));
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,

        cartSubtotal,
        dealSavings,
        couponDiscount,
        deliveryFee,
        finalTotal,

        activeCoupon,
        applyCoupon,
        removeCoupon,

        wishlist,
        toggleWishlist,
        isWishlisted,

        savedRestaurants,
        toggleSavedRestaurant,
        isRestaurantSaved,

        orders,
        placeOrder,
        reorder,

        user,
        login,
        logout,
        isAuthModalOpen,
        setIsAuthModalOpen,

        isWishlistModalOpen,
        setIsWishlistModalOpen,
        isOrderHistoryOpen,
        setIsOrderHistoryOpen,
        isCouponModalOpen,
        setIsCouponModalOpen,
        selectedRestaurantModal,
        setSelectedRestaurantModal,

        compareList,
        toggleCompareRestaurant,
        clearCompareList,
        isCompareDrawerOpen,
        setIsCompareDrawerOpen,

        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,

        notifications,
        unreadNotificationCount,
        markNotificationsAsRead,

        toasts,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
