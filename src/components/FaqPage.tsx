import React, { useState, useMemo } from 'react';
import {
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Zap,
  Coins,
  Send,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';
import { SeoHead } from './SeoHead';

interface FaqPageProps {
  onNavigateHome: () => void;
}

interface FaqItem {
  id: string;
  category: 'general' | 'delivery' | 'warranty' | 'payments' | 'proxies';
  categoryLabel: string;
  question: string;
  answer: string;
}

const GLOBAL_FAQS: FaqItem[] = [
  {
    id: 'f1',
    category: 'general',
    categoryLabel: 'General & Services',
    question: 'What types of accounts do you offer at BuyMailAccounts.com?',
    answer: 'We provide over 35+ verified digital account services across four main categories: 1) USA PVA & Aged Gmail Accounts (Google Ads, Cold Email, Reviews); 2) GitHub Accounts (Aged, Commits, Followers, Student Developer Pack, Legion/Authena); 3) Bank & Crypto Accounts (Verified PayPal, Cash App BTC, Chase, Relay Bank, Kraken, RedotPay); 4) Other & Social Media Accounts (Outlook, Hotmail, Google Voice, Edu Mail, Facebook, LinkedIn, WhatsApp, Telegram).'
  },
  {
    id: 'f2',
    category: 'general',
    categoryLabel: 'General & Services',
    question: 'Are your accounts created using bots or real physical devices?',
    answer: 'All our premium accounts are handcrafted using real physical cellular SIM cards (T-Mobile, AT&T, Verizon) and authentic consumer residential ISP connections. We never use cheap datacenter proxies or recycled VoIP numbers, guaranteeing maximum longevity and 99.4% login stability.'
  },
  {
    id: 'f3',
    category: 'delivery',
    categoryLabel: 'Delivery & Formats',
    question: 'How fast will I receive my order after payment?',
    answer: 'Our average delivery speed is 10 to 30 minutes. Once your crypto or direct transaction is confirmed, our automated and manual dispatch team transmits the credentials directly via your preferred channel (Instant on-screen / Telegram / WhatsApp / Email).'
  },
  {
    id: 'f4',
    category: 'delivery',
    categoryLabel: 'Delivery & Formats',
    question: 'What format are the credentials delivered in?',
    answer: 'Accounts are delivered in standardized, copy-paste and CSV ready formats: "Email : Password : RecoveryEmail" (and where applicable, 2FA backup codes, phone numbers, or account tokens). For bank/PayPal accounts, full KYC documentation packs and virtual card details are included.'
  },
  {
    id: 'f5',
    category: 'warranty',
    categoryLabel: 'Security & Warranty',
    question: 'What is your 48-Hour Replacement Guarantee policy?',
    answer: 'Every purchase includes an unconditional 48-hour warranty. If any credential fails login, exhibits unexpected password errors, or requires impossible phone verification during your initial setup, our Telegram and WhatsApp support staff will provide an immediate replacement with zero hassle.'
  },
  {
    id: 'f6',
    category: 'warranty',
    categoryLabel: 'Security & Warranty',
    question: 'Can I change the password, recovery email, and 2FA after receiving the accounts?',
    answer: 'Yes! You receive 100% full administrative ownership of both the service account and the associated recovery email. We recommend updating recovery passwords and enabling 2FA after your initial login inspection.'
  },
  {
    id: 'f7',
    category: 'payments',
    categoryLabel: 'Payment Methods & Crypto',
    question: 'Which payment methods do you accept?',
    answer: 'We accept Bitcoin (BTC), Litecoin (LTC), Ethereum (ETH), USDT (TRC-20, ERC-20, BEP-20), Solana (SOL), and major cryptocurrencies for instant checkout. We also accommodate direct peer-to-peer payments and bank transfers via our Telegram and WhatsApp support desk.'
  },
  {
    id: 'f8',
    category: 'payments',
    categoryLabel: 'Payment Methods & Crypto',
    question: 'Is crypto payment safe and anonymous?',
    answer: 'Yes. Crypto checkout requires zero invasive personal data, offers near-instant blockchain confirmation, and features the lowest network transaction fees.'
  },
  {
    id: 'f9',
    category: 'proxies',
    categoryLabel: 'Proxies & Anti-Detect Browsers',
    question: 'Do I need to use proxies and anti-detect browsers when logging into accounts?',
    answer: 'For long-term account health and multi-account scaling, we strongly advise using anti-detect browsers like AdsPower, Dolphin{anty}, or Multilogin paired with clean static residential proxies matching the geographic origin of the account (e.g. US residential IP for USA Gmail accounts).'
  },
  {
    id: 'f10',
    category: 'proxies',
    categoryLabel: 'Proxies & Anti-Detect Browsers',
    question: 'How many accounts can I safely use per proxy IP?',
    answer: 'For high-tier banking and primary email assets, we recommend 1 dedicated static residential IP per account. For secondary outreach and social accounts, you can safely host up to 2-3 accounts per residential IP.'
  }
];

export const FaqPage: React.FC<FaqPageProps> = ({ onNavigateHome }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openFaqIds, setOpenFaqIds] = useState<Record<string, boolean>>({ f1: true, f3: true, f5: true });

  const toggleFaq = (id: string) => {
    setOpenFaqIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredFaqs = useMemo(() => {
    return GLOBAL_FAQS.filter((faq) => {
      const matchesCat = selectedCategory === 'all' || faq.category === selectedCategory;
      const cleanQ = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !cleanQ ||
        faq.question.toLowerCase().includes(cleanQ) ||
        faq.answer.toLowerCase().includes(cleanQ) ||
        faq.categoryLabel.toLowerCase().includes(cleanQ);
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: GLOBAL_FAQS.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer
      }
    }))
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 pb-20">
      <SeoHead
        title="Frequently Asked Questions (FAQ) | BuyMailAccounts.com"
        description="Find answers to all your questions about buying USA Gmails, developer GitHub accounts, verified PayPal/banking accounts, delivery speed, and 48-hour warranty."
        canonicalUrl="https://buymailaccounts.com/#faq"
        keywords={[
          'buymailaccounts faq',
          'email accounts delivery speed',
          '48 hour replacement warranty',
          'crypto payment email accounts',
          'antidetect browser gmail proxies'
        ]}
        schemaJson={schemaJson}
      />

      {/* Header */}
      <div className="bg-white border-b border-slate-200 py-12 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Knowledge Base &amp; Help Desk</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about our verified account inventory, dispatch workflows, security guarantees, and proxy setup.
          </p>

          {/* Search Box */}
          <div className="max-w-md mx-auto relative pt-2">
            <Search className="w-5 h-5 absolute left-3.5 top-5.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search questions (e.g. delivery, warranty, proxy, crypto)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-indigo-600 focus:bg-white transition-all shadow-xs"
            />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8">
        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {[
            { id: 'all', label: 'All Questions' },
            { id: 'general', label: 'General & Services' },
            { id: 'delivery', label: 'Delivery & Formats' },
            { id: 'warranty', label: 'Security & Warranty' },
            { id: 'payments', label: 'Payments & Crypto' },
            { id: 'proxies', label: 'Proxies & Browsers' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-2">
              <HelpCircle className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm font-bold text-slate-700">No matching questions found</p>
              <p className="text-xs text-slate-500">Try adjusting your search terms or contact support directly on Telegram.</p>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = !!openFaqIds[faq.id];
              return (
                <div
                  key={faq.id}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all shadow-2xs hover:border-slate-300"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-indigo-600 transition-colors cursor-pointer"
                  >
                    <span className="flex items-start gap-3">
                      <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100 shrink-0 mt-0.5">
                        Q{idx + 1}
                      </span>
                      <span>{faq.question}</span>
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-indigo-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/50">
                      <p>{faq.answer}</p>
                      <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-400">
                        <span className="font-semibold text-slate-500">Category:</span>
                        <span>{faq.categoryLabel}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Support Direct Banner */}
        <div className="p-8 rounded-3xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-extrabold text-slate-900">Still have unanswered questions?</h3>
            <p className="text-xs sm:text-sm text-slate-500">Our customer support engineers are online 24/7 on Telegram &amp; WhatsApp.</p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`https://t.me/${SITE_CONFIG.telegramUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Ask on Telegram</span>
            </a>

            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappCleanNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
