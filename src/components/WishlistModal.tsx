import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BEST_OFFERS, TODAY_DEALS } from '../data/mockData';

export const WishlistModal: React.FC = () => {
  const { wishlist, toggleWishlist, isWishlistModalOpen, setIsWishlistModalOpen, addToCart } = useApp();

  if (!isWishlistModalOpen) return null;

  const allOffers = [...BEST_OFFERS, ...TODAY_DEALS];
  const savedOffers = allOffers.filter((o) => wishlist.includes(o.id));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
            <h3 className="text-base font-bold text-slate-900">
              Saved Offers & Wishlist ({savedOffers.length})
            </h3>
          </div>
          <button
            onClick={() => setIsWishlistModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto flex-1">
          {savedOffers.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs">
              <div className="text-3xl mb-2">❤️</div>
              <p className="font-semibold text-slate-800">Your wishlist is empty</p>
              <p className="text-slate-500 mt-1">Tap the heart icon on any deal or restaurant to save it here for later.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 space-y-3">
              {savedOffers.map((item) => (
                <div key={item.id} className="pt-3 first:pt-0 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-200"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate">{item.title}</h4>
                      <p className="text-[11px] text-slate-500">{item.restaurantName}</p>
                      <div className="flex items-baseline gap-2 font-mono tabular-nums text-xs mt-0.5">
                        <span className="font-bold text-slate-900">₹{item.offerPrice}</span>
                        <span className="text-slate-400 line-through text-[10px]">₹{item.originalPrice}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() =>
                        addToCart({
                          itemId: item.id,
                          name: item.title,
                          price: item.originalPrice,
                          offerPrice: item.offerPrice,
                          restaurantId: item.restaurantId,
                          restaurantName: item.restaurantName,
                          isVeg: item.isVeg,
                          image: item.image,
                        })
                      }
                      className="p-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl shadow-xs transition-colors flex items-center gap-1 text-xs font-semibold px-3"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Order</span>
                    </button>
                    <button
                      onClick={() => toggleWishlist(item.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
