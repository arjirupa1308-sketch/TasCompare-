import React from 'react';
import { X, Star, Sparkles, Check, ArrowRight, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CompareDrawer: React.FC = () => {
  const {
    compareList,
    toggleCompareRestaurant,
    clearCompareList,
    isCompareDrawerOpen,
    setIsCompareDrawerOpen,
    setSelectedRestaurantModal,
  } = useApp();

  if (!isCompareDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider text-orange-600 font-bold">
              Direct Spec Breakdown
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              Head-to-Head Restaurant Comparison
            </h3>
          </div>
          <div className="flex items-center gap-3">
            {compareList.length > 0 && (
              <button
                onClick={clearCompareList}
                className="text-xs text-slate-500 hover:text-rose-600 flex items-center gap-1 font-semibold"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}
            <button
              onClick={() => setIsCompareDrawerOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto flex-1">
          {compareList.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm">
              <p>No restaurants selected for comparison yet.</p>
              <p className="text-xs text-slate-400 mt-1">
                Click "+ Compare" on any restaurant card to benchmark prices and ratings side by side!
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className="grid grid-cols-3 gap-4 min-w-[650px]">
                {compareList.map((rest) => (
                  <div
                    key={rest.id}
                    className="bg-slate-50 rounded-2xl border border-slate-200 p-4 flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Bar with Remove */}
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-xs font-semibold px-2 py-0.5 bg-slate-200 text-slate-800 rounded">
                          {rest.cuisine.split(',')[0]}
                        </span>
                        <button
                          onClick={() => toggleCompareRestaurant(rest)}
                          className="text-slate-400 hover:text-rose-600 p-1"
                          title="Remove from comparison"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Photo & Name */}
                      <img
                        src={rest.photos[0]}
                        alt={rest.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-28 object-cover rounded-xl border border-slate-200 mb-3"
                      />
                      <h4 className="font-extrabold text-slate-900 text-sm">{rest.name}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{rest.location}</p>

                      {/* Best Value Ribbon */}
                      {rest.isBestValue && (
                        <div className="mt-2 text-[10px] font-bold text-orange-800 bg-orange-100 px-2 py-0.5 rounded flex items-center gap-1 w-max">
                          <Sparkles className="w-3 h-3 text-orange-600" />
                          <span>Top Value Pick (Score: {rest.valueScore}/100)</span>
                        </div>
                      )}

                      {/* Spec Matrix List */}
                      <div className="mt-4 space-y-2.5 text-xs">
                        <div className="flex justify-between pb-1 border-b border-slate-200/60">
                          <span className="text-slate-500">Customer Rating</span>
                          <span className="font-bold text-slate-900 flex items-center gap-1">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                            {rest.rating} ({rest.reviewsCount})
                          </span>
                        </div>

                        <div className="flex justify-between pb-1 border-b border-slate-200/60">
                          <span className="text-slate-500">Average Meal Price</span>
                          <span className="font-mono font-bold text-slate-900">₹{rest.avgMealPrice}</span>
                        </div>

                        <div className="flex justify-between pb-1 border-b border-slate-200/60">
                          <span className="text-slate-500">Negotiated Discount</span>
                          <span className="font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                            {rest.discountPercent}% OFF
                          </span>
                        </div>

                        <div className="flex justify-between pb-1 border-b border-slate-200/60">
                          <span className="text-slate-500">Delivery Fee</span>
                          <span className="font-semibold text-slate-800">
                            {rest.deliveryFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `₹${rest.deliveryFee}`}
                          </span>
                        </div>

                        <div className="flex justify-between pb-1 border-b border-slate-200/60">
                          <span className="text-slate-500">Delivery Speed</span>
                          <span className="font-mono font-medium text-slate-800">{rest.deliveryTimeMinutes} mins</span>
                        </div>

                        <div className="flex justify-between pb-1 border-b border-slate-200/60">
                          <span className="text-slate-500">Distance</span>
                          <span className="font-mono font-medium text-slate-800">{rest.distanceKm} km</span>
                        </div>

                        <div className="pt-1">
                          <span className="text-[11px] text-slate-500 block">Top Bestseller:</span>
                          <span className="text-xs font-semibold text-slate-800">
                            {rest.menuItems[0]?.name} (₹{rest.menuItems[0]?.offerPrice})
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action */}
                    <div className="mt-6 pt-3 border-t border-slate-200">
                      <button
                        onClick={() => {
                          setIsCompareDrawerOpen(false);
                          setSelectedRestaurantModal(rest);
                        }}
                        className="w-full py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
                      >
                        <span>View Menu</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs">
          <span className="text-slate-500">
            Compare up to 3 restaurants to spot hidden charges and best combo deals.
          </span>
          <button
            onClick={() => setIsCompareDrawerOpen(false)}
            className="px-4 py-2 bg-slate-900 text-white font-semibold rounded-xl"
          >
            Close Comparison
          </button>
        </div>

      </div>
    </div>
  );
};
