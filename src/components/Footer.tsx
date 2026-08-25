import React from 'react';
import {
  Send,
  PhoneCall,
  Mail,
  ShieldCheck,
  Clock,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  BookOpen,
  HelpCircle,
  FileText,
  Lock
} from 'lucide-react';
import { SITE_CONFIG, CRYPTO_WALLETS } from '../data/siteConfig';
import { CategoryType } from '../types';
import { BrandIcon } from './BrandIcon';

interface FooterProps {
  onSelectCategory: (cat: CategoryType) => void;
  onSelectService: (serviceId: string) => void;
  onNavigateToPage?: (pageHash: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onSelectService,
  onNavigateToPage
}) => {
  const handleNav = (hash: string) => {
    if (onNavigateToPage) {
      onNavigateToPage(hash);
    } else {
      window.location.hash = hash;
    }
  };

  return (
    <footer className="bg-slate-50 border-t border-slate-200 text-slate-600 mt-20">
      {/* Guarantees & Features Bar */}
      <div className="border-b border-slate-200 bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">10-30 Min Delivery</h4>
                <p className="text-xs text-slate-500 font-medium">Automated &amp; 24/7 manual dispatch</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shrink-0">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">48-Hour Warranty</h4>
                <p className="text-xs text-slate-500 font-medium">Instant replacement guarantee</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">100% PVA &amp; Verified</h4>
                <p className="text-xs text-slate-500 font-medium">Real SIMs &amp; clean residential IPs</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Crypto Checkout</h4>
                <p className="text-xs text-slate-500 font-medium">BTC, LTC, ETH, USDT &amp; SOL</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => handleNav('')}
            >
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-600/30">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900">
                Buy<span className="text-indigo-600">Mail</span>Accounts<span className="text-slate-400">.com</span>
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed max-w-sm font-normal">
              BuyMailAccounts.com is the world's leading marketplace for phone-verified USA Gmail accounts, developer GitHub accounts, KYC-verified banking gateways, and social media accounts with instant delivery and 24/7 technical support.
            </p>

            {/* Direct Testing Notice Box */}
            <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl space-y-1 max-w-sm">
              <div className="flex items-center gap-1.5 text-indigo-800 text-xs font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                <span>Custom &amp; Sample Testing</span>
              </div>
              <p className="text-[11px] text-slate-600 font-medium">
                <strong className="text-slate-800">Note:</strong> For testing all services, custom bulk orders, or sample verification, please contact our team directly on Telegram or WhatsApp.
              </p>
            </div>

            {/* Official Contacts */}
            <div className="space-y-2 pt-1 text-xs font-medium">
              <a
                href={SITE_CONFIG.telegramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-700 hover:text-sky-600 transition-colors"
              >
                <div className="w-6 h-6 rounded bg-sky-100 flex items-center justify-center text-sky-600">
                  <Send className="w-3.5 h-3.5" />
                </div>
                <span>Telegram: <strong className="text-slate-900">@{SITE_CONFIG.telegramUsername}</strong></span>
              </a>

              <a
                href={SITE_CONFIG.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-700 hover:text-emerald-600 transition-colors"
              >
                <div className="w-6 h-6 rounded bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <PhoneCall className="w-3.5 h-3.5" />
                </div>
                <span>WhatsApp: <strong className="text-slate-900">{SITE_CONFIG.whatsappNumber}</strong></span>
              </a>

              <a
                href={`mailto:${SITE_CONFIG.supportEmail}`}
                className="flex items-center gap-2 text-slate-700 hover:text-indigo-600 transition-colors"
              >
                <div className="w-6 h-6 rounded bg-indigo-100 flex items-center justify-center text-indigo-600">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span>Email: <strong className="text-slate-900">{SITE_CONFIG.supportEmail}</strong></span>
              </a>
            </div>
          </div>

          {/* Column 1: Core Company & Important Pages */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>Important Pages</span>
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button
                  onClick={() => handleNav('#faq')}
                  className="text-slate-600 hover:text-indigo-600 transition-colors text-left cursor-pointer flex items-center gap-1.5"
                >
                  <HelpCircle className="w-3 h-3 text-slate-400" />
                  <span>Knowledge Base &amp; FAQ</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('#blog')}
                  className="text-slate-600 hover:text-indigo-600 transition-colors text-left cursor-pointer flex items-center gap-1.5"
                >
                  <BookOpen className="w-3 h-3 text-slate-400" />
                  <span>Deliverability &amp; SEO Blog</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('#about')}
                  className="text-slate-600 hover:text-indigo-600 transition-colors text-left cursor-pointer flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3 h-3 text-slate-400" />
                  <span>About Us &amp; Infrastructure</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('#contact')}
                  className="text-slate-600 hover:text-indigo-600 transition-colors text-left cursor-pointer flex items-center gap-1.5"
                >
                  <Send className="w-3 h-3 text-slate-400" />
                  <span>Contact 24/7 Support Desk</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('#refund-policy')}
                  className="text-emerald-700 hover:text-emerald-800 font-bold transition-colors text-left cursor-pointer flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3 h-3 text-emerald-600" />
                  <span>48-Hour Replacement Policy</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('#privacy-policy')}
                  className="text-slate-600 hover:text-indigo-600 transition-colors text-left cursor-pointer flex items-center gap-1.5"
                >
                  <Lock className="w-3 h-3 text-slate-400" />
                  <span>Privacy Policy (GDPR)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('#terms')}
                  className="text-slate-600 hover:text-indigo-600 transition-colors text-left cursor-pointer flex items-center gap-1.5"
                >
                  <FileText className="w-3 h-3 text-slate-400" />
                  <span>Terms of Service</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Top Email & GitHub Accounts */}
          <div className="space-y-3">
            <h4
              onClick={() => onSelectCategory('gmail')}
              className="text-sm font-bold text-slate-900 uppercase tracking-wider cursor-pointer hover:text-indigo-600 transition-colors flex items-center gap-1.5"
            >
              <BrandIcon name="gmail" className="w-4 h-4" />
              <span>Email &amp; GitHub</span>
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button
                  onClick={() => onSelectService('buy-usa-gmail-accounts')}
                  className="text-slate-600 hover:text-indigo-600 transition-colors text-left cursor-pointer"
                >
                  Buy USA Gmail Accounts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectService('buy-pva-gmail-accounts')}
                  className="text-slate-600 hover:text-indigo-600 transition-colors text-left cursor-pointer"
                >
                  Buy PVA Gmail Accounts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectService('buy-aged-gmail-accounts-for-google-ads')}
                  className="text-slate-600 hover:text-indigo-600 transition-colors text-left cursor-pointer"
                >
                  Aged Gmail For Google Ads
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectService('buy-new-github-accounts')}
                  className="text-slate-600 hover:text-indigo-600 transition-colors text-left cursor-pointer"
                >
                  Buy New GitHub Accounts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectService('buy-aged-github-accounts')}
                  className="text-slate-600 hover:text-indigo-600 transition-colors text-left cursor-pointer"
                >
                  Buy Aged GitHub Accounts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectService('buy-github-account-with-commits')}
                  className="text-slate-600 hover:text-indigo-600 transition-colors text-left cursor-pointer"
                >
                  GitHub with Commits
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectService('buy-github-account-with-followers')}
                  className="text-slate-600 hover:text-indigo-600 transition-colors text-left cursor-pointer"
                >
                  GitHub with Followers
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Banks, Social & Numbers */}
          <div className="space-y-3">
            <h4
              onClick={() => onSelectCategory('bank')}
              className="text-sm font-bold text-slate-900 uppercase tracking-wider cursor-pointer hover:text-indigo-600 transition-colors flex items-center gap-1.5"
            >
              <BrandIcon name="paypal" className="w-4 h-4" />
              <span>Banks &amp; Social</span>
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button
                  onClick={() => onSelectService('buy-verified-paypal-account')}
                  className="text-slate-600 hover:text-indigo-600 transition-colors text-left cursor-pointer"
                >
                  Verified PayPal (Personal/Biz)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectService('buy-verified-cash-app-accounts')}
                  className="text-slate-600 hover:text-indigo-600 transition-colors text-left cursor-pointer"
                >
                  Verified Cash App BTC
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectService('buy-verified-chase-bank-accounts')}
                  className="text-slate-600 hover:text-indigo-600 transition-colors text-left cursor-pointer"
                >
                  Verified Chase Bank
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectService('buy-google-voice-accounts')}
                  className="text-slate-600 hover:text-indigo-600 transition-colors text-left cursor-pointer"
                >
                  Google Voice Numbers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectService('buy-outlook-accounts')}
                  className="text-slate-600 hover:text-indigo-600 transition-colors text-left cursor-pointer"
                >
                  Microsoft Outlook Bulk
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectService('buy-facebook-accounts')}
                  className="text-slate-600 hover:text-indigo-600 transition-colors text-left cursor-pointer"
                >
                  Facebook Marketplace Accounts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectService('buy-whatsapp-account-numbers')}
                  className="text-slate-600 hover:text-indigo-600 transition-colors text-left cursor-pointer"
                >
                  WhatsApp Number Accounts
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Crypto Wallets Accepted Badge Strip */}
        <div className="mt-12 pt-6 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <span className="font-bold text-slate-800">Accepted Crypto:</span>
              <div className="flex items-center gap-2 flex-wrap">
                {CRYPTO_WALLETS.map((w) => (
                  <span
                    key={w.symbol}
                    className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[11px] font-bold text-slate-700 flex items-center gap-1 shadow-2xs"
                  >
                    <BrandIcon name={w.icon} className="w-3.5 h-3.5" />
                    {w.symbol}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-xs text-slate-500 font-medium">
              &copy; {new Date().getFullYear()} {SITE_CONFIG.domain}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
