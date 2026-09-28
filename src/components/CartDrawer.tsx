import React, { useState } from 'react';
import {
  X,
  Trash2,
  Tag,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  CheckCircle2,
  Clock,
  MapPin,
  Bike,
  Store,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AVAILABLE_COUPONS } from '../data/mockData';
import { Order } from '../types';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    isCartOpen,
    setIsCartOpen,
    cartSubtotal,
    dealSavings,
    couponDiscount,
    deliveryFee,
    finalTotal,
    activeCoupon,
    applyCoupon,
    removeCoupon,
    placeOrder,
    user,
  } = useApp();

  const [deliveryType, setDeliveryType] = useState<'Delivery' | 'Takeaway'>('Delivery');
  const [couponInput, setCouponInput] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState(user.address || 'Flat 402, Sunset Heights, Downtown');
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    const order = placeOrder(deliveryType, deliveryAddress);
    if (order) {
      setConfirmedOrder(order);
    }
  };

  const handleApplyCouponFromList = (code: string) => {
    applyCoupon(code);
    setCouponInput(code);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-orange-600" />
            <h2 className="text-base font-bold text-slate-900">Your Food Cart</h2>
            {cart.length > 0 && (
              <span className="text-xs bg-slate-100 text-slate-700 font-mono px-2 py-0.5 rounded-full">
                {cart.reduce((a, b) => a + b.quantity, 0)} items
              </span>
            )}
          </div>
          <button
            onClick={() => {
              setIsCartOpen(false);
              setConfirmedOrder(null);
            }}
            aria-label="Close cart"
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Confirmed Screen */}
        {confirmedOrder ? (
          <div className="p-6 overflow-y-auto flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              Order Confirmed!
            </span>
            <h3 className="text-xl font-extrabold text-slate-900">
              #{confirmedOrder.id}
            </h3>
            <p className="text-xs text-slate-600 mt-1 max-w-xs">
              <strong>{confirmedOrder.restaurantName}</strong> is preparing your fresh meal.
            </p>

            {/* Tracking Status Box */}
            <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 my-6 text-left space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Estimated Arrival:</span>
                <span className="font-bold text-slate-900 font-mono">25–30 Mins</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Service Mode:</span>
                <span className="font-semibold text-slate-800">{confirmedOrder.deliveryType}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Destination:</span>
                <span className="text-slate-700 truncate max-w-[200px]">{confirmedOrder.deliveryAddress}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-700">Total Money Saved:</span>
                <span className="font-bold font-mono text-emerald-700">
                  ₹{confirmedOrder.discountSavings + confirmedOrder.couponDiscount}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setConfirmedOrder(null);
                setIsCartOpen(false);
              }}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
            >
              Continue Exploring Deals
            </button>
          </div>
        ) : cart.length === 0 ? (
          /* Empty Cart */
          <div className="p-8 flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center text-3xl mb-4">
              🛒
            </div>
            <h3 className="text-base font-bold text-slate-900">Your cart is currently empty</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xs">
              Discover the lowest meal prices and combo savings on TasteCompare today!
            </p>
            <button
              onClick={() => setIsCartOpen(false)}
              className="mt-6 px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs rounded-xl shadow-sm"
            >
              Explore Best Offers
            </button>
          </div>
        ) : (
          /* Populated Cart */
          <div className="flex-1 flex flex-col overflow-y-auto">
            
            {/* Delivery or Takeaway Segmented Control */}
            <div className="p-4 pb-2">
              <div className="flex p-1 bg-slate-100 rounded-xl">
                <button
                  onClick={() => setDeliveryType('Delivery')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    deliveryType === 'Delivery'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Bike className="w-3.5 h-3.5" />
                  <span>Delivery</span>
                </button>
                <button
                  onClick={() => setDeliveryType('Takeaway')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    deliveryType === 'Takeaway'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Store className="w-3.5 h-3.5" />
                  <span>Takeaway (₹0 Fee)</span>
                </button>
              </div>

              {/* Delivery Address */}
              {deliveryType === 'Delivery' && (
                <div className="mt-3 flex items-start gap-2 bg-slate-50 border border-slate-200 rounded-xl p-2.5">
                  <MapPin className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <label className="text-[10px] font-bold uppercase text-slate-400 block">Deliver to</label>
                    <input
                      type="text"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full text-xs text-slate-800 bg-transparent focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Cart Items List */}
            <div className="p-4 space-y-3 flex-1 overflow-y-auto divide-y divide-slate-100">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Items from {cart[0].restaurantName}
              </div>

              {cart.map((item) => (
                <div key={item.id} className="pt-3 first:pt-0 flex items-center justify-between gap-3">
                  <div className="flex items-start gap-2.5 min-w-0">
                    <span className={`w-2.5 h-2.5 rounded-sm border ${item.isVeg ? 'border-emerald-600' : 'border-rose-600'} flex items-center justify-center shrink-0 mt-1`}>
                      <span className={`w-1 h-1 rounded-full ${item.isVeg ? 'bg-emerald-600' : 'bg-rose-600'}`} />
                    </span>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate">{item.name}</h4>
                      <div className="flex items-baseline gap-2 text-xs font-mono tabular-nums">
                        <span className="font-bold text-slate-900">₹{item.offerPrice}</span>
                        {item.price > item.offerPrice && (
                          <span className="text-slate-400 line-through text-[11px]">₹{item.price}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-1.5 bg-slate-100 rounded-lg p-1">
                    <button
                      onClick={() => updateQuantity(item.itemId, -1)}
                      className="w-5 h-5 flex items-center justify-center font-bold text-slate-600 hover:text-slate-900"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold font-mono px-1 text-slate-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.itemId, 1)}
                      className="w-5 h-5 flex items-center justify-center font-bold text-slate-600 hover:text-slate-900"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Coupons Section */}
            <div className="p-4 bg-slate-50/80 border-t border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-orange-600" />
                  Coupons & Savings
                </span>
                {activeCoupon && (
                  <button
                    onClick={removeCoupon}
                    className="text-[11px] text-rose-600 hover:underline font-semibold"
                  >
                    Remove ({activeCoupon.code})
                  </button>
                )}
              </div>

              {/* Coupon input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                  className="flex-1 text-xs uppercase font-mono px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
                <button
                  onClick={() => applyCoupon(couponInput)}
                  className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg"
                >
                  Apply
                </button>
              </div>

              {/* Clickable quick promo tags */}
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {AVAILABLE_COUPONS.map((cpn) => (
                  <button
                    key={cpn.code}
                    onClick={() => handleApplyCouponFromList(cpn.code)}
                    className={`text-[10px] px-2 py-0.5 rounded border transition-colors ${
                      activeCoupon?.code === cpn.code
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {cpn.code} · ₹{cpn.value} OFF
                  </button>
                ))}
              </div>
            </div>

            {/* Price Breakdown Footer */}
            <div className="p-4 border-t border-slate-200 bg-white space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Items Subtotal</span>
                <span className="font-mono tabular-nums">₹{cartSubtotal}</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Direct Deal Savings</span>
                <span className="font-mono tabular-nums">-₹{dealSavings}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Coupon Discount ({activeCoupon?.code})</span>
                  <span className="font-mono tabular-nums">-₹{couponDiscount}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>Delivery Charges</span>
                <span className="font-mono tabular-nums">
                  {deliveryType === 'Takeaway' || deliveryFee === 0 ? (
                    <strong className="text-emerald-700">FREE</strong>
                  ) : (
                    `₹${deliveryFee}`
                  )}
                </span>
              </div>

              {/* Total Row */}
              <div className="pt-2 border-t border-slate-100 flex items-baseline justify-between">
                <div>
                  <div className="text-xs text-slate-500 font-medium">To Pay:</div>
                  <div className="text-xl font-extrabold text-slate-900 font-mono tabular-nums">
                    ₹{deliveryType === 'Takeaway' ? Math.max(0, cartSubtotal - couponDiscount) : finalTotal}
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="px-6 py-3 bg-orange-600 hover:bg-orange-700 active:scale-95 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Place Order</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Total Pocket Savings Notice */}
              <div className="text-center text-[11px] text-emerald-800 bg-emerald-50 py-1.5 rounded-lg font-semibold mt-1">
                🎉 You are keeping ₹{dealSavings + couponDiscount} in your wallet!
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
