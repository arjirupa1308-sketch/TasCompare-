import React from 'react';
import { Star, Clock, MapPin, Sparkles, Heart } from 'lucide-react';
import { RESTAURANTS } from '../data/mockData';
import { useApp } from '../context/AppContext';

export const RestaurantsSection: React.FC = () => {
  const {
    setSelectedRestaurantModal,
    toggleSavedRestaurant,
    isRestaurantSaved,
    selectedCategory,
    searchQuery,
  } = useApp();

  const filtered = RESTAURANTS.filter((r) => {
    if (selectedCategory !== 'All' && !r.cuisine.toLowerCase().includes(selectedCategory.toLowerCase())) {
      // also check if any menu items match
      const hasCategoryItem = r.menuItems.some((m) => m.category.toLowerCase().includes(selectedCategory.toLowerCase()));
      if (!hasCategoryItem) return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = r.name.toLowerCase().includes(q);
      const matchCuisine = r.cuisine.toLowerCase().includes(q);
      const matchLoc = r.location.toLowerCase().includes(q);
      if (!matchName && !matchCuisine && !matchLoc) return false;
    }
    return true;
  });

  return (
    <section id="restaurants" className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs uppercase tracking-wider text-orange-600 font-bold mb-1">
              Verified Dining Partners
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Featured Restaurants & Kitchens
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Direct access to top-rated partner kitchens offering exclusive TasteCompare discounts and zero markup.
            </p>
          </div>
          <div className="text-xs text-slate-500 font-semibold">
            Showing {filtered.length} of {RESTAURANTS.length} Kitchens
          </div>
        </div>

        {/* Restaurant Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((rest) => {
            const isSaved = isRestaurantSaved(rest.id);
            return (
              <div
                key={rest.id}
                onClick={() => setSelectedRestaurantModal(rest)}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  {/* Photo with Overlay */}
                  <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                    <img
                      src={rest.photos[0]}
                      alt={rest.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Discount Tag */}
                    <div className="absolute top-3 left-3 bg-emerald-700 text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded shadow-sm">
                      {rest.discountOffer}
                    </div>

                    {/* Best Value Badge */}
                    {rest.isBestValue && (
                      <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs text-orange-800 text-[10px] font-extrabold px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-orange-600" />
                        <span>Best Value Pick</span>
                      </div>
                    )}

                    {/* Bookmark Heart */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSavedRestaurant(rest.id);
                      }}
                      aria-label="Save restaurant"
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-xs shadow-xs transition-colors ${
                        isSaved ? 'bg-rose-50 text-rose-600' : 'bg-white/80 hover:bg-white text-slate-600'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-rose-600' : ''}`} />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-4">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-slate-500 font-medium truncate max-w-[170px]">{rest.cuisine}</span>
                      <div className="flex items-center gap-1 font-bold text-slate-800 tabular-nums shrink-0">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                        <span>{rest.rating}</span>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                      {rest.name}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate">{rest.location}</span>
                    </div>

                    {/* Delivery & Pricing Info */}
                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{rest.deliveryTimeMinutes} mins</span>
                      </div>
                      <div>
                        {rest.deliveryFee === 0 ? (
                          <span className="text-emerald-700 font-bold">Free Delivery</span>
                        ) : (
                          <span>₹{rest.deliveryFee} Delivery</span>
                        )}
                      </div>
                      <div className="font-mono font-bold text-slate-900">
                        ₹{rest.avgMealPrice} avg
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="p-4 pt-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedRestaurantModal(rest);
                    }}
                    className="w-full py-2 bg-slate-100 hover:bg-orange-600 hover:text-white text-slate-800 font-semibold text-xs rounded-xl transition-colors text-center"
                  >
                    View Menu & Offers
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
