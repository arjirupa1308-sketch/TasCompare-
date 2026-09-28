import React from 'react';
import { X, History, RotateCcw, CheckCircle2, Bike } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const OrderHistoryModal: React.FC = () => {
  const { orders, isOrderHistoryOpen, setIsOrderHistoryOpen, reorder } = useApp();

  if (!isOrderHistoryOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-slate-800" />
            <h3 className="text-base font-bold text-slate-900">
              Your Past Orders & Receipts ({orders.length})
            </h3>
          </div>
          <button
            onClick={() => setIsOrderHistoryOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {orders.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs">
              <div className="text-3xl mb-2">📜</div>
              <p className="font-semibold text-slate-800">No order history yet</p>
              <p className="text-slate-500 mt-1">Orders placed on TasteCompare will appear here for easy 1-click reordering.</p>
            </div>
          ) : (
            orders.map((ord) => (
              <div
                key={ord.id}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-slate-900">#{ord.id}</span>
                    <span className="text-xs text-slate-500 ml-2">· {ord.date}</span>
                    <h4 className="text-sm font-bold text-slate-900 mt-0.5">{ord.restaurantName}</h4>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {ord.status}
                  </span>
                </div>

                {/* Items */}
                <div className="bg-white rounded-xl p-3 border border-slate-200/60 divide-y divide-slate-100 text-xs">
                  {ord.items.map((item, idx) => (
                    <div key={idx} className="py-1.5 first:pt-0 last:pb-0 flex justify-between">
                      <span className="text-slate-700">
                        {item.quantity}x {item.name}
                      </span>
                      <span className="font-mono tabular-nums text-slate-900">
                        ₹{item.offerPrice * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Totals & Reorder */}
                <div className="flex items-center justify-between pt-1">
                  <div className="text-xs text-slate-600">
                    Paid <strong className="font-mono text-slate-900 font-bold">₹{ord.finalTotal}</strong>
                    <span className="text-emerald-700 font-semibold ml-2">
                      (Saved ₹{ord.discountSavings + ord.couponDiscount})
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      reorder(ord);
                      setIsOrderHistoryOpen(false);
                    }}
                    className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reorder</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
