
import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, User, Menu, ArrowRight, X, LogOut, ChevronDown, LogIn } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LoginForm } from '../auth/LoginForm';
import { RegisterForm } from '../auth/RegisterForm';

import { productService } from '../../services/productService';
import { contentService } from '../../services/contentService';
import { orderService } from '../../services/orderService';
import { Order, Product } from '../../types';
import ScrollProgressBar from './ScrollProgressBar';
import ScrollToTop from './ScrollToTop';
import Loader from './Loader';

const Header: React.FC<{ onCartOpen: () => void }> = ({ onCartOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const [categories, setCategories] = useState<string[]>(['All']);
  const [headerConfig, setHeaderConfig] = useState({ topBarText: '', announcementEnabled: true });
  const [siteSettings, setSiteSettings] = useState<{ siteName: string; logoUrl: string }>({ siteName: 'Easy Shop and Customer Service', logoUrl: '' });
  const [trackingModalOpen, setTrackingModalOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const [trackingOrderId, setTrackingOrderId] = useState('');
  const [trackingResult, setTrackingResult] = useState<Order | null>(null);
  const [trackingLoading, setTrackingLoading] = useState(false);
  const [trackingError, setTrackingError] = useState<string | null>(null);

  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const announcements = headerConfig.topBarText.split('|').map(t => t.trim());

  useEffect(() => {
    if (announcements.length > 1) {
      const timer = setInterval(() => {
        setCurrentAnnouncement(prev => (prev + 1) % announcements.length);
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [announcements.length]);

  const { totalItems } = useCart();
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cats = await productService.getCategories();
        const catNames = ['All', ...cats.map((c: any) => c.name)];
        setCategories(catNames);
      } catch (err) {
        console.error('Failed to load categories');
      }
    };

    const fetchSettings = async () => {
      try {
        const content = await contentService.getContent('home_page');
        if (content) {
          if (content.siteSettings) {
            setSiteSettings({
              siteName: content.siteSettings.siteName || 'Easy Shop and Customer Service',
              logoUrl: content.siteSettings.logoUrl || ''
            });
            if (content.siteSettings.siteName) document.title = content.siteSettings.siteName;
          }
          if (content.header) {
            setHeaderConfig({
              topBarText: content.header.topBarText || '100% Organic & Fairtrade | Free Shipping',
              announcementEnabled: content.header.announcementEnabled ?? true
            });
          }
        }
      } catch (err) {
        console.error('Failed to load site settings');
      }
    };

    fetchCategories();
    fetchSettings();
  }, []);

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingOrderId) return;
    try {
      setTrackingLoading(true);
      setTrackingError(null);
      setTrackingResult(null);
      const order = await orderService.trackOrder(trackingOrderId);
      setTrackingResult(order);
    } catch (err: any) {
      setTrackingError(err.message || 'Tracking failed. Invalid ID.');
    } finally {
      setTrackingLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.trim().length >= 2) {
        setIsSearching(true);
        try {
          const results = await productService.searchProducts(searchQuery);
          setSuggestions(results);
        } catch (err) {
          console.error('Search failed', err);
          setSuggestions([]);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    setMobileMenuOpen(false);
    if (location.state?.openLogin) {
      setShowLogin(true);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
    }
  };

  const isHome = location.pathname === '/';

  // Styles for Eco-Luxury - Zenith Navbar Redesign
  // Optimized Premium Header - Stable & Intuitive
  const headerClass = `fixed top-0 left-0 w-full z-[100] transition-all duration-300 border-b ${isScrolled
      ? 'bg-white/95 backdrop-blur-md py-4 border-black/10 shadow-lg'
      : 'bg-white py-6 border-black/5'
    }`;

  const linkClass = `text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 text-black/60 hover:text-accent-gold whitespace-nowrap`;

  return (
    <>
      <ScrollProgressBar />
      <ScrollToTop />
      <header className={`${headerClass}`}>
        {headerConfig.announcementEnabled && (
          <div className={`bg-[#0B1215] text-white py-1 relative h-6 overflow-hidden flex items-center justify-center text-[8px] font-black tracking-[0.6em] uppercase transition-all border-b border-white/5 ${isScrolled ? 'hidden' : ''}`}>
            {announcements.map((text, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${idx === currentAnnouncement ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
              >
                {text}
              </div>
            ))}
          </div>
        )}
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-[1fr_auto_1fr] items-center">

          {/* 1. Navigation (Left) */}
          <div className="flex items-center justify-start">
            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 text-black/60 hover:text-accent-gold transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link to="/products" className={linkClass}>Our Collection</Link>

              <div className="relative group h-full flex items-center">
                <button className={`flex items-center gap-2 ${linkClass}`}>
                  Categories <ChevronDown className="h-3 w-3" />
                </button>
                <div className="absolute top-full -left-4 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[200]">
                  <div className="bg-white border border-black/10 p-2 min-w-[200px] shadow-xl">
                    {categories.filter(c => c !== 'All').map((cat) => (
                      <Link
                        key={cat}
                        to={`/products?category=${cat}`}
                        className="block px-6 py-3 text-[9px] font-black uppercase tracking-widest text-black/60 hover:text-accent-gold hover:bg-black/5 transition-all"
                      >
                        {cat}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link to="/about" className={linkClass}>About Us</Link>
              <Link to="/support" className={linkClass}>Support</Link>
            </nav>
          </div>

          {/* 2. Brand Identity (Center) */}
          <div className="flex items-center justify-center">
            <Link
              to="/"
              className="font-sans font-black tracking-tighter uppercase text-xl md:text-2xl text-black group flex items-center justify-center gap-3"
            >
              {siteSettings.logoUrl ? (
                <img src={siteSettings.logoUrl} alt={siteSettings.siteName} className="h-14 md:h-20 max-w-[180px] md:max-w-[280px] w-auto object-contain transition-all duration-500" />
              ) : (
                <span className="whitespace-nowrap"><span className="text-accent-gold">N</span>orthern <span className="text-accent-gold italic">Treasures</span></span>
              )}
            </Link>
          </div>

          {/* 3. Utility & Interaction Hub (Right) */}
          <div className="flex items-center justify-end space-x-4 md:space-x-8 text-black">
            {/* Simple Search Toggle */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-black/60 hover:text-accent-gold transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>

            <div className="hidden sm:flex items-center h-4 w-[1px] bg-black/10 mx-2"></div>

            <button
              onClick={() => setTrackingModalOpen(true)}
              className="hidden md:block text-[9px] font-black uppercase tracking-[0.3em] text-black/40 hover:text-accent-gold transition-colors whitespace-nowrap"
            >
              Track Order
            </button>

            {isLoggedIn ? (
              <Link to="/profile" className="p-2 text-black/60 hover:text-accent-gold transition-colors">
                <User className="h-5 w-5" />
              </Link>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="hidden sm:block text-[9px] font-black uppercase tracking-[0.3em] text-black/40 hover:text-accent-gold transition-colors whitespace-nowrap"
              >
                Sign In
              </button>
            )}

            <button
              onClick={onCartOpen}
              className="relative p-2 text-black/60 hover:text-accent-gold transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-accent-gold text-primary text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search Modal - Ultra-Clean High-End Discovery */}
        {searchOpen && (
          <div className="fixed inset-0 bg-primary/95 backdrop-blur-xl z-[200] flex items-start justify-center pt-32 px-4 shadow-[0_0_100px_rgba(0,0,0,0.8)]" onClick={() => setSearchOpen(false)}>
            <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-4xl font-sans font-black text-white uppercase tracking-tighter">Search <span className="text-accent-gold">Catalog</span></h2>
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-3 text-white/30 hover:text-white transition-colors"
                >
                  <X className="h-8 w-8" />
                </button>
              </div>

              {/* Premium Direct Search Bar */}
              <form onSubmit={handleSearch} className="mb-16">
                <div className="relative group">
                  <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-8 text-accent-gold transition-all group-focus-within:scale-110" />
                  <input
                    autoFocus
                    type="text"
                    placeholder="SEARCH PRODUCTS..."
                    className="w-full pl-16 pr-4 py-8 text-3xl font-sans text-white bg-transparent border-b-2 border-white/10 focus:outline-none focus:border-accent-gold transition-all placeholder:text-white/10 uppercase tracking-tighter"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </form>


              {/* Search results/suggestions */}
              {(isSearching || suggestions.length > 0 || (searchQuery.length >= 2 && !isSearching)) && (
                <div className="mb-16">
                  {isSearching ? (
                    <div className="py-12 flex flex-col items-center justify-center">
                      <div className="h-10 w-10 border-2 border-accent-gold/20 border-t-accent-gold rounded-full animate-spin"></div>
                      <p className="mt-6 text-[10px] font-black text-white/40 uppercase tracking-[0.5em]">Searching...</p>
                    </div>
                  ) : suggestions.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {suggestions.slice(0, 4).map((product) => (
                        <button
                          key={product._id}
                          onClick={() => {
                            navigate(`/products/${product.slug || product._id}`);
                            setSearchOpen(false);
                            setSearchQuery('');
                          }}
                          className="flex items-center gap-6 p-4 bg-white/5 border border-white/5 hover:border-accent-gold/40 transition-all text-left"
                        >
                          <div className="h-16 w-16 bg-white/10 flex-shrink-0">
                            <img src={product.images?.[0]?.url} alt="" className="w-full h-full object-cover grayscale opacity-50" />
                          </div>
                          <div>
                            <p className="text-white font-sans text-lg group-hover:text-accent-gold">{product.name}</p>
                            <p className="text-accent-gold text-[10px] font-black tracking-widest uppercase">PKR {product.price}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : searchQuery.length >= 2 ? (
                    <div className="py-20 text-center">
                      <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.5em]">Inventory scan complete. Result: 0 Matches.</p>
                    </div>
                  ) : null}
                </div>
              )}

              {/* Quick Links/Suggestions */}
              <div>
                <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-8">Vault Quicklinks</p>
                <div className="flex flex-wrap gap-8">
                  {['Emeralds', 'Rubies', 'Sapphires', 'Diamonds'].map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        setSearchQuery(term);
                        navigate(`/products?category=${term}`);
                        setSearchOpen(false);
                      }}
                      className="text-[11px] font-black uppercase tracking-[0.4em] text-white/40 hover:text-accent-gold transition-all"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-[150] lg:hidden transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      <aside
        className={`fixed top-0 left-0 h-full w-[85%] max-w-md bg-primary z-[160] lg:hidden transform transition-transform duration-[600ms] cubic-bezier(0.83, 0, 0.17, 1) ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex flex-col h-full p-10 sm:p-14">
          <div className="flex items-center justify-between mb-10 sm:mb-16">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block">
              {siteSettings.logoUrl ? (
                <img src={siteSettings.logoUrl} alt={siteSettings.siteName} className="h-12 w-auto object-contain" />
              ) : (
                <span className="text-lg sm:text-xl font-sans font-black tracking-tighter text-white">Easy Shop <span className="text-accent-gold">and Customer Service</span></span>
              )}
            </Link>
            <button onClick={() => setMobileMenuOpen(false)} className="p-2 -mr-2">
              <X className="h-6 w-6 text-white/50 hover:text-white" />
            </button>
          </div>

          <nav className="flex flex-col space-y-6 sm:space-y-10">
            <Link to="/" className="text-lg font-black uppercase tracking-[0.4em] !text-white hover:!text-accent-gold transition-colors" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/products" className="text-lg font-black uppercase tracking-[0.4em] !text-white hover:!text-accent-gold transition-colors" onClick={() => setMobileMenuOpen(false)}>Collection</Link>
            <Link to="/about" className="text-lg font-black uppercase tracking-[0.2em] !text-white/50 hover:!text-accent-gold transition-colors" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
            <Link to="/support" className="text-lg font-black uppercase tracking-[0.2em] !text-white/50 hover:!text-accent-gold transition-colors" onClick={() => setMobileMenuOpen(false)}>Support</Link>

            {/* Categories Dropdown */}
            <div className="flex flex-col">
              <button
                onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
                className="text-lg font-black uppercase tracking-[0.4em] !text-white hover:!text-accent-gold transition-colors flex items-center justify-between"
              >
                <span>Collections</span>
                <ChevronDown className={`h-5 w-5 !text-white/40 transition-transform duration-300 ${mobileCategoriesOpen ? 'rotate-180' : ''}`} />
              </button>

              {mobileCategoriesOpen && (
                <div className="flex flex-col space-y-4 mt-6 ml-4 pl-6 border-l border-white/10">
                  {categories.filter(c => c !== 'All').map((cat) => (
                    <Link
                      key={cat}
                      to={`/products?category=${cat}`}
                      className="text-sm font-black uppercase tracking-[0.25em] !text-white/60 hover:!text-accent-gold transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <div className="mt-auto pt-8 border-t border-white/5 space-y-6">
            {!isLoggedIn && (
              <button onClick={() => { setMobileMenuOpen(false); setShowLogin(true); }} className="text-sm font-black uppercase tracking-[0.3em] !text-white flex items-center gap-4">
                <LogIn className="w-5 h-5 !text-accent-gold" />
                <span>Sign In</span>
              </button>
            )}
            {isLoggedIn && (
              <div className="flex flex-col gap-6">
                <Link to="/profile" className="text-sm font-black uppercase tracking-[0.3em] !text-white flex items-center gap-4">
                  <User className="w-5 h-5 !text-accent-gold" />
                  <span>My Account</span>
                </Link>
                <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="text-sm font-black uppercase tracking-[0.3em] !text-red-400 flex items-center gap-4">
                  <LogOut className="w-5 h-5" />
                  <span>Secure Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Auth & Tracking Modals - styling simplified/aligned */}
      {showLogin && (
        <LoginForm
          onClose={() => setShowLogin(false)}
          onSwitchToRegister={() => { setShowLogin(false); setShowRegister(true); }}
        />
      )}

      {showRegister && (
        <RegisterForm
          onClose={() => setShowRegister(false)}
          onSwitchToLogin={() => { setShowRegister(false); setShowLogin(true); }}
        />
      )}

      {/* Tracking Modal (Simplified styling) */}
      {trackingModalOpen && (
        <div className="fixed inset-0 bg-primary/90 backdrop-blur-md z-[200] flex items-center justify-center p-4">
          <div className="bg-primary w-full max-w-md border border-white/10 p-12 shadow-2xl relative">
            <button onClick={() => setTrackingModalOpen(false)} className="absolute top-8 right-8 text-white/20 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-4xl font-sans font-black tracking-tighter text-white mb-2 uppercase">Shipping</h3>
            <p className="text-[10px] uppercase font-black tracking-[0.4em] text-white/20 mb-12 border-b border-white/5 pb-6">Track Your Order</p>
            <form onSubmit={handleTrackOrder} className="space-y-6">
              <input
                type="text"
                value={trackingOrderId}
                onChange={e => setTrackingOrderId(e.target.value)}
                placeholder="ORDER ID"
                className="w-full bg-white/5 p-4 text-white text-[11px] font-black uppercase tracking-widest border border-white/10 outline-none focus:border-accent-gold transition-all"
              />
              <button
                type="submit"
                disabled={trackingLoading}
                className="w-full bg-accent-gold text-primary p-4 font-black uppercase text-[10px] tracking-[0.5em] hover:bg-white transition-all shadow-gold"
              >
                {trackingLoading ? 'Scanning...' : 'Track Order'}
              </button>
            </form>
            {trackingError && <p className="mt-6 text-red-400 text-[10px] font-black uppercase tracking-widest text-center">{trackingError}</p>}
            {trackingResult && (
              <div className="mt-10 pt-10 border-t border-white/5">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-2">Current Status</p>
                <p className="text-2xl font-sans text-accent-gold mb-2">{trackingResult.status}</p>
                <div className="h-[1px] w-full bg-white/5 my-4"></div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Total Value: <span className="text-white">PKR {trackingResult.totalPrice.toFixed(2)}</span></p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
