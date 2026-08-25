import React, { useState, useRef, useEffect } from 'react';
import {
  ShoppingCart,
  Send,
  PhoneCall,
  Sparkles,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Zap
} from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';
import { CategoryType, ServiceItem } from '../types';
import { CATEGORIES_META, allServices } from '../data/servicesData';
import { BrandIcon } from './BrandIcon';

interface NavbarProps {
  activeCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  onSelectService: (serviceId: string) => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onGoHome: () => void;
  onNavigateToPage?: (pageHash: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeCategory,
  onSelectCategory,
  onSelectService,
  cartCount,
  onOpenCart,
  onGoHome,
  onNavigateToPage
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdownCat, setOpenDropdownCat] = useState<CategoryType | null>(null);
  const [mobileExpandedCat, setMobileExpandedCat] = useState<CategoryType | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (catId: CategoryType) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setOpenDropdownCat(catId);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdownCat(null);
    }, 200);
  };

  const handlePageNav = (hash: string) => {
    setMobileMenuOpen(false);
    if (onNavigateToPage) {
      onNavigateToPage(hash);
    } else {
      window.location.hash = hash;
    }
  };

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  // Filter main categories excluding 'all' for dropdown menus
  const mainCategories = CATEGORIES_META.filter((c) => c.id !== 'all');

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all shadow-xs">
      {/* Top Announcement Bar (Desktop Only) */}
      <div className="hidden lg:block bg-slate-900 text-slate-200 py-1.5 px-4 text-xs font-medium border-b border-slate-800">
        <div className="max-w-7xl mx-auto w-full flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-emerald-400">24/7 Live Delivery:</span>
            <span className="text-slate-300">All accounts verified with 48H Replacement Warranty</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a
              href={SITE_CONFIG.telegramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sky-400 hover:text-sky-300 transition-colors font-medium"
            >
              <Send className="w-3.5 h-3.5" />
              <span>
                Telegram: <strong className="text-white">@{SITE_CONFIG.telegramUsername}</strong>
              </span>
            </a>

            <span className="text-slate-600 hidden sm:inline">•</span>

            <a
              href={SITE_CONFIG.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>
                WhatsApp: <strong className="text-white">{SITE_CONFIG.whatsappNumber}</strong>
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Single-Line Navbar Container: Logo + Category Menus with Sub-Services + Cart */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-18 gap-3 lg:gap-6">
          {/* LEFT: Logo & Brand (Smaller on mobile, full size on desktop) */}
          <div
            className="flex items-center gap-2 cursor-pointer shrink-0"
            onClick={onGoHome}
          >
            <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800 p-0.5 shadow-md shadow-indigo-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-white rounded-[6px] sm:rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-indigo-600" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-extrabold text-sm sm:text-lg tracking-tight text-slate-900">
                  Buy<span className="text-indigo-600">Mail</span>Accounts
                </span>
                <span className="text-[9px] sm:text-xs bg-indigo-50 text-indigo-700 font-semibold px-1 py-0.2 rounded border border-indigo-200">
                  .com
                </span>
              </div>
            </div>
          </div>

          {/* MIDDLE: Integrated Navigation Categories with Dropdown Sub-categories */}
          <nav className="hidden xl:flex items-center gap-1.5 shrink-0">
            {/* Category Dropdowns */}
            {mainCategories.map((cat) => {
              const catServices = allServices.filter((s) => s.category === cat.id);
              const isDropdownOpen = openDropdownCat === cat.id;
              const isActive = activeCategory === cat.id;

              return (
                <div
                  key={cat.id}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(cat.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    onClick={() => {
                      onSelectCategory(cat.id);
                      onGoHome();
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      isActive || isDropdownOpen
                        ? 'bg-indigo-50 text-indigo-700 font-extrabold shadow-2xs'
                        : 'text-slate-700 hover:text-indigo-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-600 font-semibold">
                      {catServices.length}
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isDropdownOpen ? 'rotate-180 text-indigo-600' : 'text-slate-400'
                      }`}
                    />
                  </button>

                  {/* Mega Dropdown Sub-menu of All Services */}
                  {isDropdownOpen && (
                    <div
                      className={`absolute top-full left-0 mt-1 bg-white border border-slate-200 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150 ${
                        catServices.length > 6 ? 'w-[520px]' : 'w-80 sm:w-96'
                      }`}
                    >
                      {/* Header of dropdown */}
                      <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <BrandIcon name={cat.icon} className="w-4 h-4" />
                          <span className="text-xs font-extrabold text-slate-900">
                            {cat.name} ({catServices.length})
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            onSelectCategory(cat.id);
                            setOpenDropdownCat(null);
                            onGoHome();
                          }}
                          className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                        >
                          <span>View category</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Sub-services list (grid if > 6) */}
                      <div
                        className={`max-h-[380px] overflow-y-auto pr-1 ${
                          catServices.length > 6 ? 'grid grid-cols-2 gap-2' : 'space-y-1.5'
                        }`}
                      >
                        {catServices.map((service: ServiceItem) => (
                          <div
                            key={service.id}
                            onClick={() => {
                              onSelectService(service.id);
                              setOpenDropdownCat(null);
                            }}
                            className="p-2.5 rounded-xl hover:bg-indigo-50/70 border border-transparent hover:border-indigo-100 transition-all cursor-pointer group flex items-start gap-2.5"
                          >
                            <div className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-200 p-1 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform mt-0.5">
                              <BrandIcon name={service.iconType} className="w-full h-full object-contain" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-1">
                                <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 truncate">
                                  {service.title}
                                </h4>
                              </div>
                              <div className="flex items-center justify-between gap-1 mt-0.5">
                                <span className="text-[10px] text-slate-500 truncate">
                                  {service.pricingTiers.length} pkgs &bull; {service.deliveryTime}
                                </span>
                                <span className="text-[11px] font-extrabold text-indigo-600">
                                  ${service.startingPrice}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Footer guarantee bar */}
                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-medium">
                        <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                          <Zap className="w-3 h-3 text-emerald-600" /> Instant 10-30m Dispatch
                        </span>
                        <span>48H Replacement Policy</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* RIGHT: Cart Button + Mobile Toggle */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-indigo-600/20 transition-all cursor-pointer shrink-0"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="bg-rose-500 text-white text-[11px] font-extrabold px-1.5 py-0.2 rounded-full min-w-[18px] text-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-600 hover:text-slate-900 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer"
              title="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-out Menu with Accordion Sub-services */}
        {mobileMenuOpen && (
          <div className="xl:hidden py-4 border-t border-slate-200 space-y-3 bg-white max-h-[80vh] overflow-y-auto">
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 mb-2">
                Services &amp; Categories
              </p>

              {/* Categories with Sub-services Accordion */}
              {mainCategories.map((cat) => {
                const catServices = allServices.filter((s) => s.category === cat.id);
                const isExpanded = mobileExpandedCat === cat.id;

                return (
                  <div key={cat.id} className="rounded-xl border border-slate-100 overflow-hidden">
                    <div className="flex items-center justify-between bg-slate-50/70 p-2.5">
                      <button
                        onClick={() => {
                          onSelectCategory(cat.id);
                          setMobileMenuOpen(false);
                          onGoHome();
                        }}
                        className="flex items-center gap-2 text-sm font-bold text-slate-800 hover:text-indigo-600 text-left cursor-pointer"
                      >
                        <BrandIcon name={cat.icon} className="w-4 h-4" />
                        <span>{cat.name}</span>
                        <span className="text-xs text-slate-400 font-normal">({catServices.length})</span>
                      </button>

                      <button
                        onClick={() => setMobileExpandedCat(isExpanded ? null : cat.id)}
                        className="p-1 text-slate-500 hover:text-indigo-600 rounded cursor-pointer"
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        />
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="p-2 space-y-1 bg-white border-t border-slate-100">
                        {catServices.map((service: ServiceItem) => (
                          <button
                            key={service.id}
                            onClick={() => {
                              onSelectService(service.id);
                              setMobileMenuOpen(false);
                            }}
                            className="w-full text-left p-2 rounded-lg hover:bg-indigo-50/50 flex items-center justify-between text-xs text-slate-700 hover:text-indigo-600 font-medium cursor-pointer"
                          >
                            <span className="truncate pr-2">{service.title}</span>
                            <span className="text-indigo-600 font-bold shrink-0">
                              ${service.startingPrice}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
              <button
                onClick={() => handlePageNav('#contact')}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-xl text-xs font-bold"
              >
                <Send className="w-3.5 h-3.5 text-indigo-600" />
                Contact Support Desk
              </button>

              <a
                href={SITE_CONFIG.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                WhatsApp Support ({SITE_CONFIG.whatsappNumber})
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
