import React, { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight, Sparkles, TrendingDown, ShoppingBag } from 'lucide-react';
import { WHY_PAY_MORE_EXAMPLES, RESTAURANTS } from '../data/mockData';
import { useApp } from '../context/AppContext';

export const WhyPayMoreSection: React.FC = () => {
  const [selectedExampleIndex, setSelectedExampleIndex] = useState(0);
  const { addToCart, setIsCartOpen, setSelectedRestaurantModal } = useApp();

  const currentExample = WHY_PAY_MORE_EXAMPLES[selectedExampleIndex];

  const handleCompareAndSave = () => {
    // Add winning meal directly to cart
    addToCart({
      itemId: currentExample.tasteCompare.offerId,
      name: currentExample.dishName,
      price: currentExample.competitor.total,
      offerPrice: currentExample.tasteCompare.total,
      restaurantId: currentExample.tasteCompare.restaurantId,
      restaurantName: currentExample.tasteCompare.name.replace(' (TasteCompare Pick)', ''),
      isVeg: currentExample.category !== 'Chicken',
    });
    setIsCartOpen(true);
  };

  return (
    <section id="whypaymore" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full mb-3">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>TRANSPARENT VALUE ENGINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Pay More?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl mx-auto">
            Standard delivery apps inflate menu prices and tack on hidden fees. See how much you keep in your pocket with TasteCompare verified deals.
          </p>
        </div>

        {/* Meal Selector Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {WHY_PAY_MORE_EXAMPLES.map((ex, idx) => (
            <button
              key={ex.id}
              onClick={() => setSelectedExampleIndex(idx)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedExampleIndex === idx
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {ex.dishName}
            </button>
          ))}
        </div>

        {/* Comparison Showcase Container */}
        <div className="bg-slate-50 border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm max-w-4xl mx-auto">
          
          <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
            <div>
              <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Comparing Item</div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">{currentExample.dishName}</h3>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                Save {currentExample.savingsPercent}% on this meal
              </span>
            </div>
          </div>

          {/* Side-by-Side Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            
            {/* Competitor / Restaurant A (Standard App) */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs opacity-90">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded">
                    Restaurant A
                  </span>
                  <h4 className="text-sm font-semibold text-slate-700 mt-1">{currentExample.competitor.name}</h4>
                </div>
                <div className="text-xs text-slate-500 flex items-center gap-1">
                  <span>⭐ {currentExample.competitor.rating}</span>
                </div>
              </div>

              {/* Itemized Breakdown */}
              <div className="space-y-2 text-xs text-slate-600 py-3 border-y border-slate-100">
                <div className="flex justify-between">
                  <span>Item Base Price</span>
                  <span className="font-mono tabular-nums">₹{currentExample.competitor.mealPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Standard Delivery Fee</span>
                  <span className="font-mono tabular-nums">₹{currentExample.competitor.deliveryFee}</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform & Surge Fee</span>
                  <span className="font-mono tabular-nums">₹{currentExample.competitor.platformFee}</span>
                </div>
              </div>

              <div className="pt-4 flex items-baseline justify-between">
                <span className="text-xs font-medium text-slate-500">Total Out of Pocket:</span>
                <span className="text-xl font-extrabold text-slate-600 tabular-nums line-through">
                  ₹{currentExample.competitor.total}
                </span>
              </div>
            </div>

            {/* TasteCompare Pick / Restaurant B */}
            <div className="bg-white rounded-2xl p-6 border-2 border-orange-500/80 shadow-md relative ring-4 ring-orange-500/10">
              <div className="absolute -top-3 right-6 bg-orange-600 text-white text-[11px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>TasteCompare Pick</span>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-xs font-bold text-orange-700 bg-orange-50 px-2.5 py-0.5 rounded">
                    Restaurant B
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 mt-1">{currentExample.tasteCompare.name}</h4>
                </div>
                <div className="text-xs text-amber-700 font-semibold flex items-center gap-1">
                  <span>⭐ {currentExample.tasteCompare.rating}</span>
                </div>
              </div>

              {/* Itemized Breakdown */}
              <div className="space-y-2 text-xs text-slate-600 py-3 border-y border-slate-100">
                <div className="flex justify-between">
                  <span>Negotiated Deal Price</span>
                  <span className="font-mono tabular-nums font-semibold text-slate-900">
                    ₹{currentExample.tasteCompare.mealPrice}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-mono tabular-nums font-semibold text-emerald-700">
                    {currentExample.tasteCompare.deliveryFee === 0 ? 'FREE' : `₹${currentExample.tasteCompare.deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Platform Fee</span>
                  <span className="font-mono tabular-nums text-emerald-700 font-semibold">₹0 (Waived)</span>
                </div>
              </div>

              <div className="pt-4 flex items-baseline justify-between">
                <span className="text-xs font-medium text-slate-500">Your Price:</span>
                <span className="text-2xl font-extrabold text-orange-600 tabular-nums">
                  ₹{currentExample.tasteCompare.total}
                </span>
              </div>
            </div>

          </div>

          {/* You Save Highlight Banner */}
          <div className="mt-8 bg-emerald-50 border border-emerald-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shrink-0">
                🎉
              </div>
              <div>
                <div className="text-base sm:text-lg font-extrabold text-emerald-900">
                  You save ₹{currentExample.savings} on this single order!
                </div>
                <div className="text-xs text-emerald-700">
                  Better food quality, verified 4.8⭐ reviews, and ₹0 hidden fees.
                </div>
              </div>
            </div>

            {/* “Compare & Save” Button */}
            <button
              onClick={handleCompareAndSave}
              className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Compare & Save ₹{currentExample.savings}</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
