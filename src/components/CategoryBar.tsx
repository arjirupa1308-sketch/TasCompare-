import React from 'react';
import { CATEGORIES } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { FoodCategory } from '../types';

export const CategoryBar: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useApp();

  return (
    <section className="bg-white border-b border-slate-200 py-4 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-1 mb-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Explore by Culinary Category
          </div>
          {selectedCategory !== 'All' && (
            <button
              onClick={() => setSelectedCategory('All')}
              className="text-xs text-orange-600 hover:text-orange-700 font-semibold"
            >
              Reset Filter (Show All)
            </button>
          )}
        </div>

        {/* Scrollable category list */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === 'All'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <span>🍽️</span>
            <span>All Categories</span>
          </button>

          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as FoodCategory)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-orange-600 text-white shadow-xs scale-102'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/70'
                }`}
              >
                <span className="text-base leading-none">{cat.icon}</span>
                <span>{cat.name}</span>
                <span
                  className={`text-[10px] tabular-nums font-mono px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-orange-700 text-orange-100' : 'bg-slate-200/80 text-slate-600'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
