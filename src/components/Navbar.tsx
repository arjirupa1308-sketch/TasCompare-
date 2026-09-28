import React, { useState } from 'react';
import { ShoppingBag, Heart, Bell, User as UserIcon, Menu, X, Tag, Sparkles, LogOut, History } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const {
    cart,
    wishlist,
    setIsCartOpen,
    setIsWishlistModalOpen,
    setIsAuthModalOpen,
    setIsCouponModalOpen,
    setIsOrderHistoryOpen,
    user,
    logout,
    notifications,
    unreadNotificationCount,
    markNotificationsAsRead,
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const totalCartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-2xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded"
        >
          <span className="text-orange-600 flex items-center gap-1">
            <Sparkles className="w-5 h-5 text-orange-600 fill-orange-500" />
            Taste
          </span>
          <span className="text-slate-900">Compare</span>
        </a>

        {/* Zone 2: 4–6 nav links, single-line text */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => scrollTo('offers')}
            className="hover:text-orange-600 transition-colors cursor-pointer"
          >
            Best Offers
          </button>
          <button
            onClick={() => scrollTo('compare')}
            className="hover:text-orange-600 transition-colors cursor-pointer"
          >
            Compare
          </button>
          <button
            onClick={() => scrollTo('whypaymore')}
            className="hover:text-orange-600 transition-colors cursor-pointer font-semibold text-orange-600"
          >
            Why Pay More?
          </button>
          <button
            onClick={() => scrollTo('todaydeals')}
            className="hover:text-orange-600 transition-colors cursor-pointer"
          >
            Today's Deals
          </button>
          <button
            onClick={() => scrollTo('restaurants')}
            className="hover:text-orange-600 transition-colors cursor-pointer"
          >
            Restaurants
          </button>
          <button
            onClick={() => setIsCouponModalOpen(true)}
            className="hover:text-orange-600 transition-colors cursor-pointer flex items-center gap-1 text-emerald-700"
          >
            <Tag className="w-3.5 h-3.5" />
            Coupons
          </button>
        </nav>

        {/* Zone 3: 1–2 primary actions + functional user utilities */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setIsNotifOpen(!isNotifOpen);
                if (!isNotifOpen) markNotificationsAsRead();
              }}
              aria-label="View notifications"
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors relative"
            >
              <Bell className="w-5 h-5" />
              {unreadNotificationCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-orange-600 rounded-full ring-2 ring-white" />
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-3 z-50 text-left">
                <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-900">Offer Alerts</span>
                  <span className="text-xs text-slate-500">Live Updates</span>
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-3 hover:bg-slate-50 transition-colors">
                      <div className="text-xs font-semibold text-slate-800">{n.title}</div>
                      <div className="text-xs text-slate-600 mt-0.5 leading-relaxed">{n.message}</div>
                      <div className="text-[11px] text-slate-400 mt-1">{n.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={() => setIsWishlistModalOpen(true)}
            aria-label="View wishlist"
            className="p-2 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors relative"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* User Account / Profile */}
          <div className="relative">
            {user.isLoggedIn ? (
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1.5 pl-2.5 pr-2 rounded-lg hover:bg-slate-100 text-slate-800 text-xs font-medium border border-slate-200"
              >
                <div className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-[10px]">
                  {user.name.charAt(0)}
                </div>
                <span className="hidden sm:inline-block max-w-[80px] truncate">{user.name.split(' ')[0]}</span>
              </button>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <UserIcon className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            )}

            {isUserMenuOpen && user.isLoggedIn && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-slate-100">
                  <div className="text-xs font-semibold text-slate-900">{user.name}</div>
                  <div className="text-[11px] text-slate-500 truncate">{user.email}</div>
                </div>
                <button
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    setIsOrderHistoryOpen(true);
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                >
                  <History className="w-3.5 h-3.5 text-slate-500" />
                  Order History
                </button>
                <button
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    setIsCouponModalOpen(true);
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                >
                  <Tag className="w-3.5 h-3.5 text-slate-500" />
                  Available Coupons
                </button>
                <div className="border-t border-slate-100 mt-1 pt-1">
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      logout();
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Cart Button with Total & Counter */}
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="Open cart"
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-3.5 py-2 rounded-lg font-medium text-xs shadow-sm transition-all hover:shadow active:scale-95"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4" />
              {totalCartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-orange-700 font-extrabold text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {totalCartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline font-semibold">Cart</span>
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-center text-xs font-medium">
            <button
              onClick={() => scrollTo('offers')}
              className="p-2.5 bg-slate-50 rounded-lg text-slate-800 hover:bg-orange-50 hover:text-orange-600"
            >
              Best Offers
            </button>
            <button
              onClick={() => scrollTo('compare')}
              className="p-2.5 bg-slate-50 rounded-lg text-slate-800 hover:bg-orange-50 hover:text-orange-600"
            >
              Compare
            </button>
            <button
              onClick={() => scrollTo('whypaymore')}
              className="p-2.5 bg-orange-50 rounded-lg text-orange-700 font-semibold"
            >
              Why Pay More?
            </button>
            <button
              onClick={() => scrollTo('todaydeals')}
              className="p-2.5 bg-slate-50 rounded-lg text-slate-800 hover:bg-orange-50 hover:text-orange-600"
            >
              Today's Deals
            </button>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsOrderHistoryOpen(true);
              }}
              className="text-slate-600 hover:text-slate-900"
            >
              Order History
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsCouponModalOpen(true);
              }}
              className="text-emerald-700 font-semibold"
            >
              Coupons & Codes
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
