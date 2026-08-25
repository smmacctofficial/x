import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServiceCard } from './components/ServiceCard';
import { ServiceDetailPage } from './components/ServiceDetailPage';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';
import { FloatingChat } from './components/FloatingChat';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { FaqPage } from './components/FaqPage';
import { BlogPage } from './components/BlogPage';
import { LegalPage, LegalPolicyType } from './components/LegalPage';
import { NotFoundPage } from './components/NotFoundPage';
import { SeoHead } from './components/SeoHead';
import { allServices, getServiceByIdOrSlug, searchServices, CATEGORIES_META } from './data/servicesData';
import { CategoryType, ServiceItem, CartItem } from './types';
import { Sparkles, ArrowUpDown, Send, PhoneCall } from 'lucide-react';
import { SITE_CONFIG } from './data/siteConfig';

type PageRoute =
  | 'catalog'
  | 'service'
  | 'about'
  | 'contact'
  | 'faq'
  | 'blog'
  | 'privacy-policy'
  | 'terms'
  | 'refund-policy'
  | '404';

export default function App() {
  const [activePage, setActivePage] = useState<PageRoute>('catalog');
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'rating'>('popular');

  // Cart state with localStorage persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('bma_cart') || '[]');
    } catch {
      return [];
    }
  });

  // Modal visibility states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutDiscount, setCheckoutDiscount] = useState(0);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bma_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  // Handle URL Hash navigation
  useEffect(() => {
    const handleHashRouting = () => {
      const hash = window.location.hash;

      if (!hash || hash === '#' || hash === '#/') {
        setActivePage('catalog');
        setSelectedServiceId(null);
        setSelectedBlogSlug(null);
      } else if (hash.startsWith('#service/')) {
        const slugOrId = hash.replace('#service/', '');
        const found = getServiceByIdOrSlug(slugOrId);
        if (found) {
          setSelectedServiceId(found.id);
          setActivePage('service');
        } else {
          setActivePage('404');
        }
      } else if (hash.startsWith('#category/')) {
        const cat = hash.replace('#category/', '') as CategoryType;
        if (['all', 'gmail', 'github', 'bank', 'other'].includes(cat)) {
          setActiveCategory(cat);
          setActivePage('catalog');
          setSelectedServiceId(null);
        } else {
          setActivePage('404');
        }
      } else if (hash === '#about') {
        setActivePage('about');
        setSelectedServiceId(null);
      } else if (hash === '#contact') {
        setActivePage('contact');
        setSelectedServiceId(null);
      } else if (hash === '#faq') {
        setActivePage('faq');
        setSelectedServiceId(null);
      } else if (hash.startsWith('#blog')) {
        const parts = hash.split('/');
        if (parts.length > 1 && parts[1]) {
          setSelectedBlogSlug(parts[1]);
        } else {
          setSelectedBlogSlug(null);
        }
        setActivePage('blog');
        setSelectedServiceId(null);
      } else if (hash === '#privacy-policy') {
        setActivePage('privacy-policy');
        setSelectedServiceId(null);
      } else if (hash === '#terms') {
        setActivePage('terms');
        setSelectedServiceId(null);
      } else if (hash === '#refund-policy') {
        setActivePage('refund-policy');
        setSelectedServiceId(null);
      } else {
        setActivePage('404');
      }
    };

    handleHashRouting();
    window.addEventListener('hashchange', handleHashRouting);
    return () => window.removeEventListener('hashchange', handleHashRouting);
  }, []);

  // Filtered & sorted services list for catalog
  const filteredServices = useMemo(() => {
    let result = searchServices(searchQuery, activeCategory);

    if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => a.startingPrice - b.startingPrice);
    } else if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => b.startingPrice - a.startingPrice);
    } else if (sortBy === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    } else {
      result = [...result].sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    return result;
  }, [searchQuery, activeCategory, sortBy]);

  // Add to cart handler
  const handleAddToCart = (service: ServiceItem, tierId: string) => {
    const tier = service.pricingTiers.find((t) => t.id === tierId) || service.pricingTiers[0];
    if (!tier) return;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.serviceId === service.id && item.tierId === tier.id
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }

      return [
        ...prev,
        {
          serviceId: service.id,
          tierId: tier.id,
          serviceTitle: service.title,
          tierName: tier.name,
          price: tier.price,
          quantity: 1,
          iconType: service.iconType,
          categoryName: service.categoryName,
        },
      ];
    });
  };

  // Direct checkout handler (e.g. from service detail page)
  const handleDirectCryptoCheckout = (service: ServiceItem, tierId: string) => {
    handleAddToCart(service, tierId);
    setIsCheckoutOpen(true);
  };

  // Quantity updater
  const handleUpdateQuantity = (serviceId: string, tierId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(serviceId, tierId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.serviceId === serviceId && item.tierId === tierId ? { ...item, quantity } : item
      )
    );
  };

  // Remove item
  const handleRemoveItem = (serviceId: string, tierId: string) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.serviceId === serviceId && item.tierId === tierId))
    );
  };

  // Clear cart
  const handleClearCart = () => {
    setCartItems([]);
  };

  // Navigation handlers
  const handleSelectService = (serviceId: string) => {
    const found = getServiceByIdOrSlug(serviceId);
    if (found) {
      window.location.hash = `#service/${found.slug}`;
    }
  };

  const handleSelectCategory = (cat: CategoryType) => {
    setActiveCategory(cat);
    if (activePage !== 'catalog') {
      window.location.hash = `#category/${cat}`;
    }
  };

  const handleGoHome = () => {
    window.location.hash = '';
    setActivePage('catalog');
    setSelectedServiceId(null);
    setSearchQuery('');
  };

  const handleNavigateToPage = (hash: string) => {
    window.location.hash = hash;
  };

  const currentService = selectedServiceId ? getServiceByIdOrSlug(selectedServiceId) : null;

  // Root Schema JSON for Homepage
  const rootSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://buymailaccounts.com/#organization',
        name: 'BuyMailAccounts.com',
        url: 'https://buymailaccounts.com',
        logo: 'https://buymailaccounts.com/logo.png',
        description: 'World leading provider of verified USA Gmail accounts, developer GitHub accounts, and KYC-verified banking gateways.',
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: SITE_CONFIG.supportEmail,
          telephone: SITE_CONFIG.whatsappDisplay,
          availableLanguage: ['English', 'Spanish', 'German', 'Bengali']
        }
      },
      {
        '@type': 'WebSite',
        '@id': 'https://buymailaccounts.com/#website',
        url: 'https://buymailaccounts.com',
        name: 'BuyMailAccounts.com',
        description: 'Buy Verified USA Gmail, GitHub, Bank & Social Media Accounts with 48H Replacement Warranty',
        publisher: {
          '@id': 'https://buymailaccounts.com/#organization'
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between selection:bg-indigo-500 selection:text-white font-sans antialiased">
      {/* Dynamic SEO Meta for Homepage */}
      {activePage === 'catalog' && (
        <SeoHead
          title="BuyMailAccounts.com | Buy Verified USA Gmail, GitHub & Bank Accounts (2026)"
          description="Buy 100% verified USA Gmail accounts (PVA & Aged), developer GitHub profiles with commit history, verified PayPal/banking gateways, and Outlook in bulk. Instant delivery with 48-hour warranty."
          canonicalUrl="https://buymailaccounts.com/"
          keywords={[
            'buy gmail accounts',
            'buy usa gmail accounts',
            'buy pva gmail',
            'buy aged gmail',
            'buy github account with commits',
            'buy verified paypal account',
            'buy cash app accounts',
            'buy outlook accounts bulk',
            'buy google voice accounts'
          ]}
          schemaJson={rootSchema}
        />
      )}

      {/* Top Navbar */}
      <Navbar
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        onSelectService={handleSelectService}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (activePage !== 'catalog') {
            handleGoHome();
          }
        }}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onGoHome={handleGoHome}
        onNavigateToPage={handleNavigateToPage}
      />

      {/* Main Routed Content Area */}
      <main className="flex-1">
        {activePage === 'service' && currentService ? (
          <ServiceDetailPage
            service={currentService}
            onBack={handleGoHome}
            onSelectService={handleSelectService}
            onAddToCart={handleAddToCart}
            onDirectCryptoCheckout={handleDirectCryptoCheckout}
          />
        ) : activePage === 'about' ? (
          <AboutPage onNavigateHome={handleGoHome} onSelectCategory={handleSelectCategory} />
        ) : activePage === 'contact' ? (
          <ContactPage
            onNavigateHome={handleGoHome}
            onNavigateToFaq={() => handleNavigateToPage('#faq')}
          />
        ) : activePage === 'faq' ? (
          <FaqPage onNavigateHome={handleGoHome} />
        ) : activePage === 'blog' ? (
          <BlogPage
            selectedArticleSlug={selectedBlogSlug || undefined}
            onSelectArticle={(slug) => {
              window.location.hash = `#blog/${slug}`;
            }}
            onSelectService={handleSelectService}
            onBackToBlogList={() => {
              window.location.hash = '#blog';
            }}
          />
        ) : activePage === 'privacy-policy' || activePage === 'terms' || activePage === 'refund-policy' ? (
          <LegalPage
            policyType={
              activePage === 'privacy-policy'
                ? 'privacy'
                : activePage === 'terms'
                ? 'terms'
                : 'refund'
            }
            onSelectPolicy={(p) => {
              if (p === 'privacy') window.location.hash = '#privacy-policy';
              else if (p === 'terms') window.location.hash = '#terms';
              else window.location.hash = '#refund-policy';
            }}
            onNavigateHome={handleGoHome}
          />
        ) : activePage === '404' ? (
          <NotFoundPage
            onNavigateHome={handleGoHome}
            onSelectCategory={(cat) => {
              setActiveCategory(cat);
              handleGoHome();
            }}
            onSelectService={handleSelectService}
          />
        ) : (
          /* Main Marketplace & Catalog View */
          <div className="space-y-10">
            {/* Hero Section with Quick Search & Testing Callout */}
            <HeroSection
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onSelectCategory={setActiveCategory}
            />

            {/* Catalog Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              {/* Filter and Sort Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                    <span>
                      {CATEGORIES_META.find((c) => c.id === activeCategory)?.name || 'All Services'}
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold">
                      {filteredServices.length} available
                    </span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    {CATEGORIES_META.find((c) => c.id === activeCategory)?.description ||
                      'Browse all 35+ verified email, GitHub, banking, and social accounts'}
                  </p>
                </div>

                {/* Sort Controls */}
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-600 font-bold hidden sm:inline flex items-center gap-1">
                    <ArrowUpDown className="w-3.5 h-3.5 text-indigo-600" /> Sort:
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs font-semibold focus:outline-none focus:border-indigo-600 cursor-pointer"
                  >
                    <option value="popular">Most Popular &amp; Reviews</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Highest Rated (5.0★)</option>
                  </select>
                </div>
              </div>

              {/* Service Cards Grid */}
              {filteredServices.length === 0 ? (
                <div className="py-16 text-center space-y-4 bg-slate-50 border border-slate-200 rounded-3xl p-8">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">No services found matching "{searchQuery}"</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    We offer custom accounts for all platforms. Contact our team directly on Telegram or WhatsApp for custom requests.
                  </p>
                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setActiveCategory('all');
                      }}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                    >
                      Reset Filters
                    </button>
                    <a
                      href={SITE_CONFIG.telegramLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold rounded-xl transition-all"
                    >
                      Contact on Telegram
                    </a>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {filteredServices.map((service) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      onSelectService={handleSelectService}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              )}

              {/* Bottom Testing & Custom Order Banner */}
              <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-50/80 via-slate-50 to-sky-50/80 border border-indigo-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
                <div className="space-y-2 text-center md:text-left">
                  <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200">
                    DIRECT SUPPORT &amp; TESTING
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                    Need Custom Bulk Pricing or Test Verification?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                    For orders of 500+ accounts, customized geo-locations, custom aged domain setups, or test samples, chat directly with our team.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
                  <a
                    href={SITE_CONFIG.telegramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm rounded-2xl shadow-sm shadow-sky-500/20 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Telegram @{SITE_CONFIG.telegramUsername}</span>
                  </a>

                  <a
                    href={SITE_CONFIG.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-2xl shadow-sm shadow-emerald-600/20 transition-all"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>WhatsApp {SITE_CONFIG.whatsappNumber}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onProceedToCheckout={(discount) => {
          setCheckoutDiscount(discount);
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        discountAmount={checkoutDiscount}
        onOrderSuccess={() => {
          handleClearCart();
        }}
      />

      {/* 24/7 Floating Chat Widget */}
      <FloatingChat />

      {/* SEO Footer with Full Internal Linking */}
      <Footer
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          handleGoHome();
        }}
        onSelectService={handleSelectService}
        onNavigateToPage={handleNavigateToPage}
      />
    </div>
  );
}
