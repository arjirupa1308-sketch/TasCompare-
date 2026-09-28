import React from 'react';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CategoryBar } from './components/CategoryBar';
import { TodaysDealsSection } from './components/TodaysDealsSection';
import { WhyPayMoreSection } from './components/WhyPayMoreSection';
import { BestOffersSection } from './components/BestOffersSection';
import { RestaurantComparisonSection } from './components/RestaurantComparisonSection';
import { RestaurantsSection } from './components/RestaurantsSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { RestaurantModal } from './components/RestaurantModal';
import { CompareDrawer } from './components/CompareDrawer';
import { WishlistModal } from './components/WishlistModal';
import { CouponsModal } from './components/CouponsModal';
import { OrderHistoryModal } from './components/OrderHistoryModal';
import { AuthModal } from './components/AuthModal';
import { ToastContainer } from './components/ToastContainer';

export function TasteCompareApp() {
  return (
    <div className="min-h-screen bg-[#fafaf9] text-slate-900 flex flex-col selection:bg-orange-500 selection:text-white">
      {/* Top Bar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Culinary Categories Bar */}
        <CategoryBar />

        {/* 3. Today's Deals with Live Timer */}
        <TodaysDealsSection />

        {/* 4. Why Pay More? Real Savings Feature */}
        <WhyPayMoreSection />

        {/* 5. Best Offers Section */}
        <BestOffersSection />

        {/* 6. Restaurant Comparison Table & Filters */}
        <RestaurantComparisonSection />

        {/* 7. Restaurants Directory */}
        <RestaurantsSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Drawers and Modals */}
      <CartDrawer />
      <RestaurantModal />
      <CompareDrawer />
      <WishlistModal />
      <CouponsModal />
      <OrderHistoryModal />
      <AuthModal />
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <TasteCompareApp />
    </AppProvider>
  );
}
