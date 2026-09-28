import React from 'react';
import { ArrowRight, Search, TrendingUp, ShieldCheck, Zap } from 'lucide-react';
import { HERO_IMAGE } from '../data/mockData';
import { useApp } from '../context/AppContext';

export const HeroSection: React.FC = () => {
  const { searchQuery, setSearchQuery } = useApp();

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[540px] md:min-h-[580px] flex items-center justify-center overflow-hidden bg-slate-950 text-white">
      {/* Background Image with Measured Contrast Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Artisan restaurant table spread with pizza, burgers and pasta"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity scale-105 transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-900/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-transparent" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
        
        {/* Editorial Subtitle Marker */}
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-orange-400 bg-orange-950/60 border border-orange-500/30 px-3.5 py-1.5 rounded-full mb-6 backdrop-blur-sm">
          <Zap className="w-3.5 h-3.5 fill-orange-400" />
          <span>Smart Food Price & Deal Intelligence</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight md:leading-none text-balance">
          Great Food. <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-rose-400 to-amber-300">Better Offers.</span> Best Value.
        </h1>

        {/* Subheading */}
        <p className="mt-5 text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed text-balance">
          Compare restaurant deals and discover delicious meals at prices you’ll love.
        </p>

        {/* Two Prominent Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto">
          <button
            onClick={() => handleScroll('offers')}
            className="w-full sm:w-auto px-7 py-3.5 bg-orange-600 hover:bg-orange-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-orange-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Explore Best Offers</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleScroll('compare')}
            className="w-full sm:w-auto px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-sm rounded-xl backdrop-blur-sm transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Compare Restaurants</span>
          </button>
        </div>

        {/* Search Bar - “Search restaurants, dishes or offers...” */}
        <div className="mt-10 max-w-2xl mx-auto">
          <div className="relative flex items-center bg-white rounded-2xl shadow-2xl p-2 border border-slate-200">
            <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search restaurants, dishes or offers..."
              className="w-full pl-3 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 bg-transparent focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-slate-400 hover:text-slate-600 px-2 py-1"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => handleScroll('restaurants')}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-5 py-2.5 rounded-xl shrink-0 transition-colors"
            >
              Search
            </button>
          </div>
        </div>

        {/* Trust Badges Adjacent to Value Claim */}
        <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-3 gap-2 sm:gap-6 text-center max-w-3xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-sm sm:text-base font-bold text-white tabular-nums">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>₹140+</span>
            </div>
            <div className="text-xs text-slate-400 mt-0.5">Average savings per meal</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-sm sm:text-base font-bold text-white tabular-nums">
              <ShieldCheck className="w-4 h-4 text-orange-400" />
              <span>100% Verified</span>
            </div>
            <div className="text-xs text-slate-400 mt-0.5">Live restaurant menu prices</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-sm sm:text-base font-bold text-white tabular-nums">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Zero Markup</span>
            </div>
            <div className="text-xs text-slate-400 mt-0.5">Direct merchant partner rates</div>
          </div>
        </div>

      </div>
    </section>
  );
};
