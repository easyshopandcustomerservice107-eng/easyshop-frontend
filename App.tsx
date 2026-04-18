
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import CartSidebar from './components/cart/CartSidebar';
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import UserProfile from './pages/UserProfile';
import { CartProvider, useCart } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

import TrackOrder from './pages/TrackOrder';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdDisplayManager from './components/common/AdDisplayManager';
import CookieConsent from './components/common/CookieConsent';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

// Static Pages
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import ShippingReturns from './pages/ShippingReturns';
import About from './pages/About';
import Support from './pages/Support';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppContent = () => {
  const { isOpen, closeCart, openCart } = useCart();

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden relative w-full">
      <ScrollToTop />
      <Header onCartOpen={openCart} />
      <CartSidebar isOpen={isOpen} onClose={closeCart} />
      <AdDisplayManager />
      <CookieConsent />

      <main className="flex-grow bg-primary grain-texture pt-28 md:pt-32 lg:pt-38 overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/track-order" element={<TrackOrder />} />

          {/* Static Pages */}
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shipping-returns" element={<ShippingReturns />} />
          <Route path="/about" element={<About />} />
          <Route path="/support" element={<Support />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />

          {/* Auth pages */}
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>

      </main>

      <Footer />
    </div >
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Toaster position="bottom-right" reverseOrder={false} />
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
