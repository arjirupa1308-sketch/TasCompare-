import React, { useState } from 'react';
import {
  Star,
  ArrowUpDown,
  SlidersHorizontal,
  Sparkles,
  Info,
  Clock,
  MapPin,
  ExternalLink,
  Check,
  Plus,
  Percent,
} from 'lucide-react';
import { RESTAURANTS } from '../data/mockData';
import { Restaurant } from '../types';
import { useApp } from '../context/AppContext';

type SortKey = 'valueScore' | 'avgMealPrice' | 'discountPercent' | 'rating' | 'deliveryFee' | 'distanceKm';

export const RestaurantComparisonSection: React.FC = () => {
  const {
    setSelectedRestaurantModal,
    compareList,
    toggleCompareRestaurant,
    setIsCompareDrawerOpen,
    searchQuery,
    selectedCategory,
  } = useApp();

  const [sortBy, setSortBy] = useState<SortKey>('valueScore');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [selectedCuisine, setSelectedCuisine] = useState<string>('All');
  const [minRating, setMinRating] = useState<number>(0);
  const [minDiscount, setMinDiscount] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(500);
  const [filterTakeaway, setFilterTakeaway] = useState<boolean>(false);
  const [filterPureVeg, setFilterPureVeg] = useState<boolean>(false);
  const [showCriteriaModal, setShowCriteriaModal] = useState<boolean>(false);

  // Extract unique locations
  const locations = ['All', ...Array.from(new Set(RESTAURANTS.map((r) => r.location)))];
  const cuisines = ['All', 'Italian', 'Burgers', 'Chicken', 'Indian', 'Chinese', 'Healthy Food', 'Desserts'];

  // Filtering
  const filtered = RESTAURANTS.filter((r) => {
    if (selectedLocation !== 'All' && r.location !== selectedLocation) return false;
    if (selectedCuisine !== 'All' && !r.cuisine.toLowerCase().includes(selectedCuisine.toLowerCase())) return false;
    if (r.rating < minRating) return false;
    if (r.discountPercent < minDiscount) return false;
    if (r.avgMealPrice > maxPrice) return false;
    if (filterPureVeg && !r.isPureVeg) return false;
    if (filterTakeaway && !r.isTakeawayAvailable) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = r.name.toLowerCase().includes(q);
      const matchCuisine = r.cuisine.toLowerCase().includes(q);
      const matchLocation = r.location.toLowerCase().includes(q);
      const matchOffers = r.currentOffers.some((o) => o.toLowerCase().includes(q));
      if (!matchName && !matchCuisine && !matchLocation && !matchOffers) return false;
    }

    return true;
  });

  // Sorting
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'valueScore') return b.valueScore - a.valueScore;
    if (sortBy === 'avgMealPrice') return a.avgMealPrice - b.avgMealPrice;
    if (sortBy === 'discountPercent') return b.discountPercent - a.discountPercent;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'deliveryFee') return a.deliveryFee - b.deliveryFee;
    if (sortBy === 'distanceKm') return a.distanceKm - b.distanceKm;
    return 0;
  });

  return (
    <section id="compare" className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs uppercase tracking-wider text-orange-600 font-bold mb-1">
              Data-Driven Dining
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Restaurant Comparison Matrix
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Compare nearby eateries across meal pricing, verified discounts, delivery speed, and customer satisfaction scores.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Transparent Criteria Explanation Button */}
            <button
              onClick={() => setShowCriteriaModal(true)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl transition-colors"
            >
              <Info className="w-3.5 h-3.5 text-orange-600" />
              <span>How "Best Value" is Calculated</span>
            </button>

            {/* Compare Selected Button */}
            {compareList.length > 0 && (
              <button
                onClick={() => setIsCompareDrawerOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 px-4 py-2 rounded-xl shadow-xs transition-all"
              >
                <span>Compare {compareList.length} Selected</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-6 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 pb-1 border-b border-slate-200">
            <span className="flex items-center gap-1.5 text-slate-700">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filter & Sort Parameters
            </span>
            <span>{sorted.length} Restaurants Found</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-1">
            {/* Location */}
            <div>
              <label className="text-[11px] font-semibold text-slate-500 block mb-1">Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-orange-500"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Cuisine */}
            <div>
              <label className="text-[11px] font-semibold text-slate-500 block mb-1">Cuisine</label>
              <select
                value={selectedCuisine}
                onChange={(e) => setSelectedCuisine(e.target.value)}
                className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-orange-500"
              >
                {cuisines.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Min Rating */}
            <div>
              <label className="text-[11px] font-semibold text-slate-500 block mb-1">Min Rating</label>
              <select
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-orange-500"
              >
                <option value={0}>All Ratings</option>
                <option value={4.5}>4.5+ ⭐</option>
                <option value={4.7}>4.7+ ⭐</option>
              </select>
            </div>

            {/* Min Discount */}
            <div>
              <label className="text-[11px] font-semibold text-slate-500 block mb-1">Min Discount</label>
              <select
                value={minDiscount}
                onChange={(e) => setMinDiscount(Number(e.target.value))}
                className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-orange-500"
              >
                <option value={0}>Any Discount</option>
                <option value={30}>30%+ OFF</option>
                <option value={40}>40%+ OFF</option>
                <option value={45}>45%+ OFF</option>
              </select>
            </div>

            {/* Max Price */}
            <div>
              <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                Max Avg Meal (₹{maxPrice})
              </label>
              <input
                type="range"
                min="100"
                max="500"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-orange-600 mt-2"
              />
            </div>

            {/* Sort By */}
            <div>
              <label className="text-[11px] font-semibold text-slate-500 block mb-1">Sort Comparison</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortKey)}
                className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2 text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-orange-500"
              >
                <option value="valueScore">✨ Best Value Score</option>
                <option value="avgMealPrice">💰 Lowest Price</option>
                <option value="discountPercent">🏷️ Highest Discount</option>
                <option value="rating">⭐ Customer Rating</option>
                <option value="deliveryFee">🛵 Delivery Charges</option>
                <option value="distanceKm">📍 Nearest Distance</option>
              </select>
            </div>
          </div>

          {/* Quick Toggles */}
          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs">
            <label className="flex items-center gap-1.5 cursor-pointer text-slate-700">
              <input
                type="checkbox"
                checked={filterPureVeg}
                onChange={(e) => setFilterPureVeg(e.target.checked)}
                className="rounded accent-emerald-600"
              />
              <span>Pure Veg Only</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer text-slate-700">
              <input
                type="checkbox"
                checked={filterTakeaway}
                onChange={(e) => setFilterTakeaway(e.target.checked)}
                className="rounded accent-orange-600"
              />
              <span>Takeaway / Pickup Available</span>
            </label>
            {(selectedLocation !== 'All' || selectedCuisine !== 'All' || minRating > 0 || minDiscount > 0 || filterPureVeg || filterTakeaway) && (
              <button
                onClick={() => {
                  setSelectedLocation('All');
                  setSelectedCuisine('All');
                  setMinRating(0);
                  setMinDiscount(0);
                  setMaxPrice(500);
                  setFilterPureVeg(false);
                  setFilterTakeaway(false);
                }}
                className="text-xs text-orange-600 hover:text-orange-700 font-semibold ml-auto"
              >
                Reset All Filters
              </button>
            )}
          </div>
        </div>

        {/* Comparison Table (Desktop View) */}
        <div className="hidden lg:block overflow-hidden rounded-2xl border border-slate-200 shadow-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/80 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                <th className="py-3.5 px-4">Restaurant</th>
                <th className="py-3.5 px-3">Rating</th>
                <th className="py-3.5 px-3">Meal Price</th>
                <th className="py-3.5 px-3">Discount</th>
                <th className="py-3.5 px-3">Delivery</th>
                <th className="py-3.5 px-4">Active Offer</th>
                <th className="py-3.5 px-3">Value Rank</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {sorted.map((rest) => {
                const isCompared = compareList.some((r) => r.id === rest.id);
                return (
                  <tr
                    key={rest.id}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    {/* Restaurant Info */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={rest.photos[0]}
                          alt={rest.name}
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-200"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                              {rest.name}
                            </span>
                            {rest.isBestValue && (
                              <span className="bg-orange-100 text-orange-800 text-[10px] font-extrabold px-2 py-0.5 rounded">
                                Best Value
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            {rest.cuisine} · {rest.location}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Rating */}
                    <td className="py-4 px-3 tabular-nums">
                      <div className="flex items-center gap-1 font-bold text-slate-900">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                        <span>{rest.rating}</span>
                      </div>
                      <div className="text-[10px] text-slate-400">({rest.reviewsCount})</div>
                    </td>

                    {/* Meal Price */}
                    <td className="py-4 px-3 tabular-nums">
                      <span className="text-sm font-extrabold text-slate-900">₹{rest.avgMealPrice}</span>
                      <div className="text-[10px] text-slate-400">avg for one</div>
                    </td>

                    {/* Discount */}
                    <td className="py-4 px-3 tabular-nums">
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        {rest.discountPercent}% OFF
                      </span>
                    </td>

                    {/* Delivery */}
                    <td className="py-4 px-3 tabular-nums">
                      <div className="font-semibold text-slate-800">
                        {rest.deliveryFee === 0 ? (
                          <span className="text-emerald-700 font-bold">FREE</span>
                        ) : (
                          `₹${rest.deliveryFee}`
                        )}
                      </div>
                      <div className="text-[10px] text-slate-500">{rest.deliveryTimeMinutes} mins · {rest.distanceKm} km</div>
                    </td>

                    {/* Offer */}
                    <td className="py-4 px-4">
                      <div className="text-xs font-semibold text-slate-700">
                        {rest.discountOffer}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate max-w-[180px]">
                        {rest.currentOffers[0]}
                      </div>
                    </td>

                    {/* Value Rank */}
                    <td className="py-4 px-3 tabular-nums">
                      <div className="flex items-center gap-1.5">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center font-mono font-bold text-slate-800 text-xs">
                          {rest.valueScore}
                        </div>
                        <span className="text-[10px] text-slate-400">/ 100</span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => toggleCompareRestaurant(rest)}
                          className={`p-2 rounded-lg text-xs font-semibold transition-colors ${
                            isCompared
                              ? 'bg-slate-900 text-white'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          }`}
                          title={isCompared ? 'Remove from compare' : 'Add to compare drawer'}
                        >
                          {isCompared ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={() => setSelectedRestaurantModal(rest)}
                          className="bg-orange-600 hover:bg-orange-700 active:scale-95 text-white font-semibold text-xs px-3 py-2 rounded-xl transition-all"
                        >
                          View Menu
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Responsive Mobile/Tablet Cards */}
        <div className="lg:hidden space-y-4">
          {sorted.map((rest) => {
            const isCompared = compareList.some((r) => r.id === rest.id);
            return (
              <div
                key={rest.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={rest.photos[0]}
                    alt={rest.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-900 text-sm truncate">{rest.name}</h4>
                      {rest.isBestValue && (
                        <span className="bg-orange-100 text-orange-800 text-[10px] font-extrabold px-2 py-0.5 rounded shrink-0">
                          Best Value
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5 truncate">{rest.cuisine}</div>
                    <div className="flex items-center gap-3 text-xs text-slate-600 mt-2">
                      <div className="flex items-center gap-1 font-bold text-slate-900">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                        <span>{rest.rating}</span>
                      </div>
                      <span>·</span>
                      <span className="font-mono font-bold text-slate-900">₹{rest.avgMealPrice}</span>
                      <span>·</span>
                      <span className="font-bold text-emerald-700">{rest.discountPercent}% OFF</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="text-slate-500 text-[11px]">
                    Delivery: {rest.deliveryFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `₹${rest.deliveryFee}`} ({rest.deliveryTimeMinutes}m)
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleCompareRestaurant(rest)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-medium ${
                        isCompared ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {isCompared ? 'Compared' : '+ Compare'}
                    </button>
                    <button
                      onClick={() => setSelectedRestaurantModal(rest)}
                      className="bg-orange-600 text-white font-semibold px-3 py-1.5 rounded-lg text-xs"
                    >
                      Menu
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal: Transparent Value Criteria Explanation */}
        {showCriteriaModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-orange-600" />
                  <h3 className="text-lg font-bold text-slate-900">TasteCompare "Best Value" Formula</h3>
                </div>
                <button
                  onClick={() => setShowCriteriaModal(false)}
                  className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
                >
                  ✕
                </button>
              </div>

              <div className="mt-4 space-y-4 text-xs text-slate-600 leading-relaxed">
                <p>
                  Unlike typical algorithms that simply award badges to the lowest-priced low-quality item or whoever pays the highest advertising fee, <strong>TasteCompare computes an impartial Value Score (0–100)</strong> based on 4 verified pillars:
                </p>

                <div className="space-y-2.5 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-slate-800">1. Discount & Savings Depth (35% weight)</span>
                    <span className="font-mono text-emerald-700 font-bold">35 pts</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Real, verified percentage off standard dine-in menu rates.
                  </p>

                  <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                    <span className="font-semibold text-slate-800">2. Customer Satisfaction & Taste (30% weight)</span>
                    <span className="font-mono text-amber-700 font-bold">30 pts</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Weighted ratings (minimum 4.5⭐ threshold) across verified diners.
                  </p>

                  <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                    <span className="font-semibold text-slate-800">3. Portion & Serving Generosity (20% weight)</span>
                    <span className="font-mono text-blue-700 font-bold">20 pts</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Grammage and caloric yield per rupee spent.
                  </p>

                  <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                    <span className="font-semibold text-slate-800">4. Delivery Surcharge & Speed (15% weight)</span>
                    <span className="font-mono text-indigo-700 font-bold">15 pts</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Zero or low delivery charges and faster arrival within 30 minutes.
                  </p>
                </div>

                <div className="bg-orange-50 text-orange-900 p-3 rounded-xl border border-orange-200 text-[11px]">
                  <strong>Our Guarantee:</strong> Restaurants with a score of 90+ earn our coveted <strong>Best Value</strong> gold marker.
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowCriteriaModal(false)}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl"
                >
                  Understood
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
