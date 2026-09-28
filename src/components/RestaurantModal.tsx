import React, { useState } from 'react';
import {
  X,
  Star,
  Clock,
  MapPin,
  Phone,
  Tag,
  Check,
  ShoppingBag,
  Heart,
  Share2,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MenuItem } from '../types';

export const RestaurantModal: React.FC = () => {
  const {
    selectedRestaurantModal,
    setSelectedRestaurantModal,
    addToCart,
    cart,
    updateQuantity,
    toggleSavedRestaurant,
    isRestaurantSaved,
    showToast,
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  if (!selectedRestaurantModal) return null;

  const rest = selectedRestaurantModal;
  const isSaved = isRestaurantSaved(rest.id);

  // Group menu categories
  const categories = ['All', ...Array.from(new Set(rest.menuItems.map((m) => m.category)))];

  const filteredMenuItems = rest.menuItems.filter(
    (m) => activeCategory === 'All' || m.category === activeCategory
  );

  const getItemQuantityInCart = (itemId: string) => {
    const item = cart.find((c) => c.itemId === itemId);
    return item ? item.quantity : 0;
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Restaurant link copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Top Header with Photo Gallery & Controls */}
        <div className="relative aspect-[21/9] sm:aspect-[24/9] bg-slate-900 overflow-hidden shrink-0">
          <img
            src={rest.photos[selectedPhotoIndex] || rest.photos[0]}
            alt={rest.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Action buttons on top right */}
          <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
            <button
              onClick={() => toggleSavedRestaurant(rest.id)}
              aria-label="Save restaurant"
              className={`p-2.5 rounded-full backdrop-blur-md transition-colors ${
                isSaved ? 'bg-rose-50 text-rose-600' : 'bg-white/80 hover:bg-white text-slate-800'
              }`}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-600' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              aria-label="Share restaurant"
              className="p-2.5 rounded-full bg-white/80 hover:bg-white text-slate-800 backdrop-blur-md transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSelectedRestaurantModal(null)}
              aria-label="Close details"
              className="p-2.5 rounded-full bg-white/90 hover:bg-white text-slate-900 shadow-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Info overlay inside hero */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2 py-0.5 bg-orange-600 rounded text-white">
                {rest.cuisine.split(',')[0]}
              </span>
              {rest.isBestValue && (
                <span className="text-xs font-bold px-2 py-0.5 bg-amber-400 text-slate-950 rounded flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Best Value Pick
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight drop-shadow-sm">
              {rest.name}
            </h2>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-slate-200 mt-1">
              <div className="flex items-center gap-1 font-bold text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{rest.rating}</span>
                <span className="text-slate-300 font-normal">({rest.reviewsCount} reviews)</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{rest.deliveryTimeMinutes} mins delivery</span>
              </div>
              <span>·</span>
              <span>
                {rest.deliveryFee === 0 ? <strong className="text-emerald-400">Free Delivery</strong> : `₹${rest.deliveryFee} Fee`}
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Key Facts & Contact Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-slate-700">
                <MapPin className="w-4 h-4 text-orange-600 shrink-0" />
                <span>{rest.address}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Phone className="w-4 h-4 text-orange-600 shrink-0" />
                <span>{rest.contactPhone}</span>
              </div>
            </div>
            <div className="space-y-1.5 sm:border-l sm:border-slate-200 sm:pl-4">
              <div className="flex items-center gap-2 text-slate-700">
                <Clock className="w-4 h-4 text-orange-600 shrink-0" />
                <span>Hours: {rest.openingHours}</span>
              </div>
              <div className="text-slate-600">
                Avg meal cost: <strong className="text-slate-900 font-mono">₹{rest.avgMealPrice}</strong>
              </div>
            </div>
          </div>

          {/* Active Offers Pill Bar */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-emerald-600" />
              <span>Active Offers & Discount Vouchers</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {rest.currentOffers.map((offerText, idx) => (
                <div
                  key={idx}
                  className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold px-3 py-2 rounded-xl flex items-center justify-between"
                >
                  <span>{offerText}</span>
                  <span className="text-[10px] text-emerald-700 uppercase bg-emerald-100 px-1.5 py-0.5 rounded font-bold">
                    Active
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Menu Section */}
          <div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
              <h3 className="text-base font-bold text-slate-900">
                Restaurant Menu ({rest.menuItems.length} items)
              </h3>

              {/* Category tabs */}
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar max-w-xs">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                      activeCategory === cat
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Items List */}
            <div className="divide-y divide-slate-100">
              {filteredMenuItems.map((item) => {
                const qty = getItemQuantityInCart(item.id);
                return (
                  <div key={item.id} className="py-3.5 flex items-start justify-between gap-4">
                    <div className="space-y-1 max-w-md">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-sm border ${item.isVeg ? 'border-emerald-600' : 'border-rose-600'} flex items-center justify-center shrink-0`}>
                          <span className={`w-1 h-1 rounded-full ${item.isVeg ? 'bg-emerald-600' : 'bg-rose-600'}`} />
                        </span>
                        <h4 className="text-sm font-bold text-slate-900">{item.name}</h4>
                        {item.isBestseller && (
                          <span className="text-[10px] font-extrabold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded">
                            Bestseller
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
                      <div className="flex items-baseline gap-2 pt-0.5 tabular-nums">
                        <span className="text-sm font-bold text-slate-900">₹{item.offerPrice}</span>
                        {item.originalPrice > item.offerPrice && (
                          <span className="text-xs text-slate-400 line-through">₹{item.originalPrice}</span>
                        )}
                      </div>
                    </div>

                    {/* Add to Cart with quantity stepper */}
                    <div className="shrink-0 flex items-center">
                      {qty > 0 ? (
                        <div className="flex items-center gap-2 bg-orange-600 text-white rounded-xl px-2 py-1 shadow-xs">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-6 h-6 flex items-center justify-center font-bold text-sm hover:bg-orange-700 rounded"
                          >
                            -
                          </button>
                          <span className="text-xs font-bold font-mono px-1">{qty}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-6 h-6 flex items-center justify-center font-bold text-sm hover:bg-orange-700 rounded"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() =>
                            addToCart({
                              itemId: item.id,
                              name: item.name,
                              price: item.originalPrice,
                              offerPrice: item.offerPrice,
                              restaurantId: rest.id,
                              restaurantName: rest.name,
                              isVeg: item.isVeg,
                              image: item.image || rest.photos[0],
                            })
                          }
                          className="px-3.5 py-1.5 bg-orange-50 hover:bg-orange-600 text-orange-700 hover:text-white border border-orange-200 hover:border-transparent font-bold text-xs rounded-xl transition-all shadow-xs flex items-center gap-1 cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>ADD</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Modal Footer with quick view */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
          <div className="text-slate-500">
            Selected: <strong className="text-slate-800">{rest.name}</strong> · Takeaway & Delivery Ready
          </div>
          <button
            onClick={() => setSelectedRestaurantModal(null)}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
