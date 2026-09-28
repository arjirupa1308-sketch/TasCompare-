import React, { useState } from 'react';
import { Sparkles, Mail, Send, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { showToast } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    showToast('Subscribed to TasteCompare Weekly Deal Radar! 🎉');
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-1.5 text-2xl font-extrabold text-white">
              <Sparkles className="w-5 h-5 text-orange-500 fill-orange-500" />
              <span className="text-orange-500">Taste</span>
              <span>Compare</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The honest restaurant price and deal intelligence platform. We benchmark live menu rates, discounts, portion sizes, and delivery surcharges so you always get maximum taste for your hard-earned money.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <span className="text-xs font-semibold text-slate-200 block mb-2">
                Subscribe to Daily Price Drop Alerts
              </span>
              {subscribed ? (
                <div className="text-xs text-emerald-400 flex items-center gap-1.5 font-semibold bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-800/50">
                  <Check className="w-4 h-4" />
                  <span>You're subscribed! We will send only top verified deals.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full text-xs bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs font-semibold transition-colors shrink-0 flex items-center gap-1"
                  >
                    <span>Join</span>
                    <Send className="w-3 h-3" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Column 2: Discover */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Discover</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => scrollTo('offers')} className="hover:text-white transition-colors">
                  Best Offers
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('todaydeals')} className="hover:text-white transition-colors">
                  Today's Deals
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('whypaymore')} className="hover:text-white transition-colors">
                  Why Pay More?
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('compare')} className="hover:text-white transition-colors">
                  Price Comparison
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('restaurants')} className="hover:text-white transition-colors">
                  Featured Restaurants
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Restaurants & Partners */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Restaurants</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#restaurants" className="hover:text-white transition-colors">Partner With Us</a>
              </li>
              <li>
                <a href="#restaurants" className="hover:text-white transition-colors">Merchant Portal</a>
              </li>
              <li>
                <a href="#compare" className="hover:text-white transition-colors">Zero-Commission Model</a>
              </li>
              <li>
                <a href="#offers" className="hover:text-white transition-colors">Combo Meal Strategy</a>
              </li>
              <li>
                <a href="#compare" className="hover:text-white transition-colors">Verified Hygiene Badges</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Support & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Help & Legal</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Contact Support</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Refund & Cancellation</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar with Socials & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} TasteCompare Technologies Inc. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Instagram</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Twitter / X</a>
            <a href="#" className="hover:text-slate-300 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-slate-300 transition-colors">YouTube</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
