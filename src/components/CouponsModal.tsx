import React from 'react';
import { X, Tag, Check, Copy } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AVAILABLE_COUPONS } from '../data/mockData';

export const CouponsModal: React.FC = () => {
  const { isCouponModalOpen, setIsCouponModalOpen, activeCoupon, applyCoupon, showToast, setIsCartOpen } = useApp();

  if (!isCouponModalOpen) return null;

  const handleApply = (code: string) => {
    applyCoupon(code);
    setIsCouponModalOpen(false);
    setIsCartOpen(true);
  };

  const handleCopy = (code: string) => {
    navigator.clipboard?.writeText(code);
    showToast(`Code ${code} copied to clipboard!`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900">
              Coupon Wallet & Promo Codes
            </h3>
          </div>
          <button
            onClick={() => setIsCouponModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Coupons List */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {AVAILABLE_COUPONS.map((cpn) => {
            const isCurrent = activeCoupon?.code === cpn.code;
            return (
              <div
                key={cpn.code}
                className={`p-4 rounded-2xl border ${
                  isCurrent ? 'border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-500/20' : 'border-slate-200 bg-white'
                } relative shadow-xs`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-extrabold text-sm text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200 tracking-wider">
                        {cpn.code}
                      </span>
                      <button
                        onClick={() => handleCopy(cpn.code)}
                        className="text-slate-400 hover:text-slate-600 p-1"
                        title="Copy code"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-sm font-bold text-emerald-800 mt-2">
                      {cpn.title}
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {cpn.description}
                    </p>
                    <div className="text-[11px] text-slate-400 mt-2">
                      Min order ₹{cpn.minOrder} · {cpn.expiresIn}
                    </div>
                  </div>

                  <div className="shrink-0">
                    {isCurrent ? (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-xl flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        Applied
                      </span>
                    ) : (
                      <button
                        onClick={() => handleApply(cpn.code)}
                        className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-colors shadow-xs"
                      >
                        Apply Code
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500">
          Coupons are automatically validated against your cart value.
        </div>

      </div>
    </div>
  );
};
