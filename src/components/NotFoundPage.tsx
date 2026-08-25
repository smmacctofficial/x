import React from 'react';
import {
  AlertTriangle,
  Home,
  Search,
  ArrowRight,
  ShieldCheck,
  Send
} from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';
import { SeoHead } from './SeoHead';

interface NotFoundPageProps {
  onNavigateHome: () => void;
  onSelectCategory: (category: any) => void;
  onSelectService: (serviceId: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  onNavigateHome,
  onSelectCategory,
  onSelectService
}) => {
  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 flex items-center justify-center p-4 sm:p-8">
      <SeoHead
        title="404 - Page Not Found | BuyMailAccounts.com"
        description="The requested page could not be found. Explore our 35+ verified USA Gmail, GitHub, banking, and social media accounts catalog."
        canonicalUrl="https://buymailaccounts.com/404"
      />

      <div className="max-w-2xl w-full bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center space-y-8 shadow-xl">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Error 404 &bull; Resource Not Found</span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Looks like this page was moved or doesn't exist
          </h1>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Don't worry! All our 35+ verified email, GitHub, banking, and social accounts are active and ready for instant delivery.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-3 pt-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Popular Service Categories:</span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => onSelectCategory('other')}
              className="px-3.5 py-2 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 transition-all cursor-pointer"
            >
              Other &amp; Social Accounts
            </button>
            <button
              onClick={() => onSelectCategory('gmail')}
              className="px-3.5 py-2 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 transition-all cursor-pointer"
            >
              Gmail Accounts (PVA / Aged)
            </button>
            <button
              onClick={() => onSelectCategory('github')}
              className="px-3.5 py-2 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 transition-all cursor-pointer"
            >
              GitHub Accounts
            </button>
            <button
              onClick={() => onSelectCategory('bank')}
              className="px-3.5 py-2 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 transition-all cursor-pointer"
            >
              Bank &amp; Crypto Accounts
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 border-t border-slate-100">
          <button
            onClick={onNavigateHome}
            className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </button>

          <a
            href={`https://t.me/${SITE_CONFIG.telegramUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4 text-sky-400" />
            <span>Ask Support on Telegram</span>
          </a>
        </div>
      </div>
    </div>
  );
};
