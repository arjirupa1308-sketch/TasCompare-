import React, { useState, useEffect } from 'react';
import { Clock, Flame, ShoppingBag, ArrowRight } from 'lucide-react';
import { TODAY_DEALS, RESTAURANTS } from '../data/mockData';
import { useApp } from '../context/AppContext';

export const TodaysDealsSection: React.FC = () => {
  const { addToCart, setSelectedRestaurantModal } = useApp();

  // Live ticking countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 48,
    seconds: 32,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 3, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const format2 = (n: number) => n.toString().padStart(2, '0');

  return (
    <section id="todaydeals" className="py-12 bg-gradient-to-b from-orange-50/60 to-white border-b border-orange-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Live Timer Banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-700 bg-orange-100 px-2.5 py-1 rounded-md mb-2">
              <Flame className="w-4 h-4 fill-orange-600 text-orange-600 animate-pulse" />
              <span>LIMITED WINDOW DROP</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              🔥 Today’s Best Deals
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Unmatched flash promotions with guaranteed lowest prices in your area.
            </p>
          </div>

          {/* Countdown Clock Display */}
          <div className="flex items-center gap-3 bg-white p-2.5 sm:p-3 rounded-2xl shadow-sm border border-orange-200 self-start md:self-auto">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
              <Clock className="w-4 h-4 text-orange-600" />
              <span>Deals Expire In:</span>
            </div>
            <div className="flex items-center gap-1 font-mono font-bold tabular-nums text-slate-900 text-sm">
              <span className="bg-slate-900 text-white px-2 py-1 rounded-md">{format2(timeLeft.hours)}</span>
              <span className="text-slate-400">:</span>
              <span className="bg-slate-900 text-white px-2 py-1 rounded-md">{format2(timeLeft.minutes)}</span>
              <span className="text-slate-400">:</span>
              <span className="bg-orange-600 text-white px-2 py-1 rounded-md">{format2(timeLeft.seconds)}</span>
            </div>
          </div>
        </div>

        {/* Deal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TODAY_DEALS.map((deal) => {
            const savings = deal.originalPrice - deal.offerPrice;
            return (
              <div
                key={deal.id}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Food Image with Resilient Fallback */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={deal.image}
                      alt={deal.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Discount Tag */}
                    <div className="absolute top-3 left-3 bg-emerald-600 text-white text-xs font-extrabold px-2.5 py-1 rounded-md shadow-md flex items-center gap-1">
                      <span>{deal.discountPercentage}% OFF</span>
                    </div>

                    {deal.isBestDeal && (
                      <div className="absolute top-3 right-3 bg-orange-600 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-md">
                        Best Deal
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    {/* Quiet Metadata with Typographic Separator */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5">
                      <span className="font-medium text-slate-700">{deal.restaurantName}</span>
                      <span aria-hidden="true">·</span>
                      <span>⭐ {deal.rating} ({deal.reviewCount.toLocaleString()})</span>
                      <span aria-hidden="true">·</span>
                      <span>{deal.deliveryTime}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                      {deal.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                      {deal.description}
                    </p>
                    <div className="mt-2 text-[11px] text-slate-400 font-medium">
                      {deal.portionInfo}
                    </div>
                  </div>
                </div>

                {/* Price and Action Footer */}
                <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between mt-4">
                  <div>
                    <div className="flex items-baseline gap-2 tabular-nums">
                      <span className="text-xl font-extrabold text-slate-900">₹{deal.offerPrice}</span>
                      <span className="text-xs text-slate-400 line-through">₹{deal.originalPrice}</span>
                    </div>
                    <div className="text-[11px] font-semibold text-emerald-700">
                      You save ₹{savings} instantly
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const rest = RESTAURANTS.find((r) => r.id === deal.restaurantId);
                        if (rest) setSelectedRestaurantModal(rest);
                      }}
                      className="text-xs text-slate-600 hover:text-slate-900 font-semibold px-2 py-1.5"
                    >
                      Details
                    </button>
                    <button
                      onClick={() =>
                        addToCart({
                          itemId: deal.id,
                          name: deal.title,
                          price: deal.originalPrice,
                          offerPrice: deal.offerPrice,
                          restaurantId: deal.restaurantId,
                          restaurantName: deal.restaurantName,
                          isVeg: deal.isVeg,
                          image: deal.image,
                        })
                      }
                      className="bg-orange-600 hover:bg-orange-700 active:scale-95 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Grab Deal</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
