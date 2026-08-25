import React from 'react';
import { ShieldCheck, Zap, RefreshCw, Send, PhoneCall, Sparkles, Star, Search } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';
import { CategoryType } from '../types';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelectCategory: (cat: CategoryType) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  onSearchChange,
  onSelectCategory,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-200">
      {/* Background Decorative Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-100/60 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-sky-100/60 blur-[90px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          {/* Trust Badge Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-xs">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>#1 Marketplace for Verified &amp; Aged Accounts</span>
            <span className="text-slate-300">•</span>
            <span className="text-amber-600 flex items-center gap-1 font-bold">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> 4.98/5 (2,400+ Reviews)
            </span>
          </div>

          {/* Main Title (H1) */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Buy Verified <span className="text-indigo-600">Gmail, GitHub, Bank</span> &amp; Social Accounts
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            High-authority USA Gmail PVA, Aged GitHub profiles with commit history, fully verified PayPal &amp; Cash App BTC, and phone numbers with <strong className="text-slate-900 font-semibold">instant 10-30 min delivery</strong> and <strong className="text-indigo-600 font-semibold">48-Hour Replacement Warranty</strong>.
          </p>

          {/* Search Bar in Hero */}
          <div className="max-w-xl mx-auto relative pt-2">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search services (e.g. USA Gmail, Cash App, GitHub Aged, WhatsApp)..."
                className="w-full pl-12 pr-28 py-3.5 bg-white border border-slate-300 rounded-2xl text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-md shadow-slate-200/50"
              />
              {searchQuery ? (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 px-3 py-1.5 text-xs font-semibold bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200"
                >
                  Clear
                </button>
              ) : (
                <span className="absolute right-3 px-3 py-1.5 text-xs font-semibold text-slate-500 bg-slate-100 rounded-xl hidden sm:inline">
                  35+ Services
                </span>
              )}
            </div>

            {/* Quick Filter Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-3 text-xs">
              <span className="text-slate-500 font-medium">Quick find:</span>
              <button
                onClick={() => onSelectCategory('gmail')}
                className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-indigo-400 text-slate-700 hover:text-indigo-600 transition-colors shadow-2xs font-medium cursor-pointer"
              >
                USA Gmail
              </button>
              <button
                onClick={() => onSelectCategory('gmail')}
                className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-indigo-400 text-slate-700 hover:text-indigo-600 transition-colors shadow-2xs font-medium cursor-pointer"
              >
                Google Ads Ready
              </button>
              <button
                onClick={() => onSelectCategory('github')}
                className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-indigo-400 text-slate-700 hover:text-indigo-600 transition-colors shadow-2xs font-medium cursor-pointer"
              >
                GitHub Aged
              </button>
              <button
                onClick={() => onSelectCategory('bank')}
                className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-indigo-400 text-slate-700 hover:text-indigo-600 transition-colors shadow-2xs font-medium cursor-pointer"
              >
                Cash App BTC
              </button>
              <button
                onClick={() => onSelectCategory('bank')}
                className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-indigo-400 text-slate-700 hover:text-indigo-600 transition-colors shadow-2xs font-medium cursor-pointer"
              >
                PayPal Verified
              </button>
            </div>
          </div>

          {/* Testing and Sample Contact Strip */}
          <div className="pt-4 max-w-xl mx-auto">
            <div className="p-3.5 bg-gradient-to-r from-indigo-50/80 via-slate-50 to-sky-50/80 border border-indigo-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-left shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Need to Test Any Service?</h4>
                  <p className="text-[11px] text-slate-600">Contact us directly on Telegram or WhatsApp for test samples</p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href={SITE_CONFIG.telegramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1 px-3 py-1.5 bg-sky-500 hover:bg-sky-600 text-white rounded-xl text-xs font-bold transition-all shadow-sm shadow-sky-500/20"
                >
                  <Send className="w-3 h-3" />
                  <span>Telegram</span>
                </a>
                <a
                  href={SITE_CONFIG.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm shadow-emerald-600/20"
                >
                  <PhoneCall className="w-3 h-3" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* 4 Feature Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-left">
            <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-xs">
              <div className="flex items-center gap-2 text-indigo-600 mb-1">
                <Zap className="w-4 h-4" />
                <span className="text-xs font-bold text-slate-900">Instant Delivery</span>
              </div>
              <p className="text-[11px] text-slate-500">10-30 mins automated dispatch</p>
            </div>

            <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-xs">
              <div className="flex items-center gap-2 text-emerald-600 mb-1">
                <RefreshCw className="w-4 h-4" />
                <span className="text-xs font-bold text-slate-900">48H Warranty</span>
              </div>
              <p className="text-[11px] text-slate-500">Guaranteed replacement policy</p>
            </div>

            <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-xs">
              <div className="flex items-center gap-2 text-sky-600 mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs font-bold text-slate-900">100% Real PVA</span>
              </div>
              <p className="text-[11px] text-slate-500">Real SIMs &amp; residential IPs</p>
            </div>

            <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-xs">
              <div className="flex items-center gap-2 text-amber-600 mb-1">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-bold text-slate-900">Crypto Checkout</span>
              </div>
              <p className="text-[11px] text-slate-500">BTC, LTC, ETH, USDT &amp; SOL</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
