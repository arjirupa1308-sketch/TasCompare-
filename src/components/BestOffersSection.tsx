import React, { useState } from 'react';
import { Heart, ShoppingBag, Star, Info, Check } from 'lucide-react';
import { BEST_OFFERS, RESTAURANTS } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { Offer } from '../types';

export const BestOffersSection: React.FC = () => {
  const {
    addToCart,
    toggleWishlist,
    isWishlisted,
    setSelectedRestaurantModal,
    selectedCategory,
    searchQuery,
  } = useApp();

  const [filterVegOnly, setFilterVegOnly] = useState(false);
  const [addedItemIds, setAddedItemIds] = useState<string[]>([]);

  // Filter based on category, search, veg
  const filteredOffers = BEST_OFFERS.filter((offer) => {
    if (selectedCategory !== 'All' && offer.category !== selectedCategory) {
      return false;
    }
    if (filterVegOnly && !offer.isVeg) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = offer.title.toLowerCase().includes(q);
      const matchDesc = offer.description.toLowerCase().includes(q);
      const matchRest = offer.restaurantName.toLowerCase().includes(q);
      const matchCat = offer.category.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchRest && !matchCat) return false;
    }
    return true;
  });

  const handleOrderNow = (offer: Offer) => {
    addToCart({
      itemId: offer.id,
      name: offer.title,
      price: offer.originalPrice,
      offerPrice: offer.offerPrice,
      restaurantId: offer.restaurantId,
      restaurantName: offer.restaurantName,
      isVeg: offer.isVeg,
      image: offer.image,
    });
    setAddedItemIds((prev) => [...prev, offer.id]);
    setTimeout(() => {
      setAddedItemIds((prev) => prev.filter((id) => id !== offer.id));
    }, 1800);
  };

  return (
    <section id="offers" className="py-14 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Veg Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs uppercase tracking-wider text-orange-600 font-bold mb-1">
              Curated Savings Matrix
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Best Offers & Combo Meals
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Hand-picked combo deals offering the highest calories, taste, and value per rupee.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Pure Veg Toggle */}
            <label className="flex items-center gap-2 cursor-pointer bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs hover:border-emerald-400 transition-colors">
              <span className="w-3.5 h-3.5 rounded-sm border border-emerald-600 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              </span>
              <span className="text-xs font-semibold text-slate-700">Pure Veg Only</span>
              <input
                type="checkbox"
                checked={filterVegOnly}
                onChange={(e) => setFilterVegOnly(e.target.checked)}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Offer Cards Grid */}
        {filteredOffers.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
            <p className="text-slate-500 text-sm">No combo offers match your current filter.</p>
            <button
              onClick={() => setFilterVegOnly(false)}
              className="mt-3 text-xs font-semibold text-orange-600 hover:text-orange-700"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOffers.map((offer) => {
              const wishlisted = isWishlisted(offer.id);
              const isAdded = addedItemIds.includes(offer.id);
              const savings = offer.originalPrice - offer.offerPrice;

              return (
                <div
                  key={offer.id}
                  className={`bg-white rounded-2xl border ${
                    offer.isBestDeal ? 'border-orange-400 ring-2 ring-orange-500/20 shadow-md' : 'border-slate-200 shadow-xs'
                  } overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between group`}
                >
                  <div>
                    {/* Food Image */}
                    <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                      <img
                        src={offer.image}
                        alt={offer.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Best Deal Badge */}
                      {offer.isBestDeal && (
                        <div className="absolute top-3 left-3 bg-orange-600 text-white text-xs font-extrabold px-3 py-1 rounded-md shadow-md flex items-center gap-1">
                          <span>🏆 Best Deal</span>
                        </div>
                      )}

                      {/* Discount Percentage */}
                      <div className={`absolute ${offer.isBestDeal ? 'top-3 left-28' : 'top-3 left-3'} bg-emerald-700 text-white text-xs font-bold px-2 py-0.5 rounded shadow-sm`}>
                        {offer.discountPercentage}% OFF
                      </div>

                      {/* Veg / Non-Veg Indicator */}
                      <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded shadow-xs flex items-center gap-1.5 text-[11px] font-medium text-slate-700">
                        <span className={`w-2.5 h-2.5 rounded-sm border ${offer.isVeg ? 'border-emerald-600' : 'border-rose-600'} flex items-center justify-center`}>
                          <span className={`w-1 h-1 rounded-full ${offer.isVeg ? 'bg-emerald-600' : 'bg-rose-600'}`} />
                        </span>
                        <span>{offer.isVeg ? 'Veg' : 'Non-Veg'}</span>
                      </div>

                      {/* Wishlist Heart Button */}
                      <button
                        onClick={() => toggleWishlist(offer.id)}
                        aria-label="Save to wishlist"
                        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-xs transition-colors shadow-sm ${
                          wishlisted
                            ? 'bg-rose-50 text-rose-600'
                            : 'bg-white/80 text-slate-600 hover:text-rose-600 hover:bg-white'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-600' : ''}`} />
                      </button>
                    </div>

                    {/* Card Content */}
                    <div className="p-5">
                      
                      {/* Quiet Restaurant and Rating metadata */}
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                        <button
                          onClick={() => {
                            const rest = RESTAURANTS.find((r) => r.id === offer.restaurantId);
                            if (rest) setSelectedRestaurantModal(rest);
                          }}
                          className="font-semibold text-slate-700 hover:text-orange-600 transition-colors text-left truncate max-w-[170px]"
                        >
                          {offer.restaurantName}
                        </button>
                        <div className="flex items-center gap-1 font-semibold text-slate-800 tabular-nums shrink-0">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                          <span>{offer.rating}</span>
                          <span className="text-slate-400 font-normal">({offer.reviewCount})</span>
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                        {offer.title}
                      </h3>
                      <div className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                        {offer.subtitle}
                      </div>

                      <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                        {offer.description}
                      </p>

                      <div className="mt-3 text-[11px] text-slate-400 flex items-center gap-2">
                        <span>{offer.portionInfo}</span>
                        <span>·</span>
                        <span>{offer.deliveryTime}</span>
                        {offer.freeDelivery && (
                          <>
                            <span>·</span>
                            <span className="text-emerald-700 font-semibold">Free Delivery</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Pricing and Action */}
                  <div className="p-5 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-2 tabular-nums">
                        <span className="text-2xl font-extrabold text-slate-900">₹{offer.offerPrice}</span>
                        <span className="text-xs text-slate-400 line-through">₹{offer.originalPrice}</span>
                      </div>
                      <div className="text-[11px] font-semibold text-emerald-700">
                        Save ₹{savings}
                      </div>
                    </div>

                    <button
                      onClick={() => handleOrderNow(offer)}
                      disabled={isAdded}
                      className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 shadow-xs cursor-pointer ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-orange-600 hover:bg-orange-700 active:scale-95 text-white'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Order Now</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
