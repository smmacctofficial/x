import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Zap,
  CheckCircle2,
  ShoppingCart,
  Send,
  PhoneCall,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Star,
  RefreshCw,
  Lock,
  Layers,
  Sparkles,
  HelpCircle,
  Clock,
  Coins,
  ExternalLink,
  BookOpen,
  Key,
  Link as LinkIcon,
  Tag,
  Check,
  Cpu,
  AlertTriangle
} from 'lucide-react';
import { ServiceItem } from '../types';
import { SITE_CONFIG } from '../data/siteConfig';
import { getServiceByIdOrSlug } from '../data/servicesData';
import { BrandIcon } from './BrandIcon';
import { ServiceCard } from './ServiceCard';

interface ServiceDetailPageProps {
  service: ServiceItem;
  onBack: () => void;
  onSelectService: (serviceId: string) => void;
  onAddToCart: (service: ServiceItem, tierId: string) => void;
  onDirectCryptoCheckout: (service: ServiceItem, tierId: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  service,
  onBack,
  onSelectService,
  onAddToCart,
  onDirectCryptoCheckout,
}) => {
  const [selectedTierId, setSelectedTierId] = useState<string>(
    service.pricingTiers.find((t) => t.popular)?.id || service.pricingTiers[0]?.id || ''
  );
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [addedToast, setAddedToast] = useState(false);

  // Scroll to top on mount or when service changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedTierId(service.pricingTiers.find((t) => t.popular)?.id || service.pricingTiers[0]?.id || '');
    setOpenFaqIndex(0);
  }, [service.id]);

  const selectedTier = service.pricingTiers.find((t) => t.id === selectedTierId) || service.pricingTiers[0];

  const handleAddToCart = () => {
    if (selectedTier) {
      onAddToCart(service, selectedTier.id);
      setAddedToast(true);
      setTimeout(() => setAddedToast(false), 2000);
    }
  };

  const relatedServices = service.relatedServiceIds
    .map((id) => getServiceByIdOrSlug(id))
    .filter((s): s is ServiceItem => !!s);

  // Telegram order prefill text
  const telegramOrderMsg = encodeURIComponent(
    `Hello! I want to order "${service.title}" - Package: ${selectedTier.name} ($${selectedTier.price}) on BuyMailAccounts.com. Please confirm payment details.`
  );
  const telegramDirectLink = `https://t.me/${SITE_CONFIG.telegramUsername}?text=${telegramOrderMsg}`;

  // WhatsApp order prefill text
  const whatsappOrderMsg = encodeURIComponent(
    `Hello! I want to order "${service.title}" - Package: ${selectedTier.name} ($${selectedTier.price}) on BuyMailAccounts.com. Please assist me.`
  );
  const whatsappDirectLink = `https://wa.me/${SITE_CONFIG.whatsappCleanNumber}?text=${whatsappOrderMsg}`;

  // JSON-LD Schema for rich snippet SEO
  const jsonLdSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        name: service.title,
        description: service.seoDescription,
        category: service.categoryName,
        brand: {
          '@type': 'Brand',
          name: 'BuyMailAccounts.com',
        },
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'USD',
          lowPrice: service.startingPrice,
          highPrice: Math.max(...service.pricingTiers.map((t) => t.price)),
          offerCount: service.pricingTiers.length,
          availability: 'https://schema.org/InStock',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: service.rating,
          reviewCount: service.reviewsCount,
          bestRating: '5',
          worstRating: '1',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: service.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://buymailaccounts.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: service.categoryName,
            item: `https://buymailaccounts.com/category/${service.category}`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: service.title,
            item: `https://buymailaccounts.com/service/${service.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 pb-20">
      {/* Inject Structured Data Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      {/* Toast Notification */}
      {addedToast && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-sm font-bold">Added {selectedTier.name} to Cart!</span>
        </div>
      )}

      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-slate-200 py-3.5 px-4 sm:px-6 lg:px-8 sticky top-16 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-slate-500 overflow-x-auto whitespace-nowrap font-medium">
            <button
              onClick={onBack}
              className="flex items-center gap-1 text-slate-600 hover:text-indigo-600 transition-colors font-semibold cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Services</span>
            </button>
            <span>/</span>
            <span className="text-indigo-600 font-bold">{service.categoryName}</span>
            <span>/</span>
            <span className="text-slate-800 font-medium truncate max-w-xs">{service.title}</span>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-emerald-700 font-semibold">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>24/7 Instant Delivery &bull; Replacement Guarantee</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">
        {/* Top Hero Grid: Product Header, Pricing, & Action Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (7 cols): Title, Brand Logo, SEO Intro, Features */}
          <div className="lg:col-span-7 space-y-6">
            {/* Title & Brand Icon */}
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 p-3 shadow-md shadow-slate-200/50 flex items-center justify-center shrink-0">
                <BrandIcon name={service.iconType} className="w-full h-full object-contain" />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase tracking-wider">
                    {service.categoryName}
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                    <Zap className="w-3 h-3 text-emerald-600" /> {service.stockStatus}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-amber-600 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{service.rating} / 5.0</span>
                    <span className="text-slate-400">({service.reviewsCount} verified reviews)</span>
                  </div>
                </div>

                <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  {service.title}
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 font-medium">{service.shortTagline}</p>
              </div>
            </div>

            {/* SEO Focus Keyword Badges */}
            <div className="p-3.5 rounded-xl bg-slate-100/80 border border-slate-200 flex flex-wrap items-center gap-2 text-xs">
              <div className="flex items-center gap-1 font-bold text-slate-700 mr-1">
                <Tag className="w-3.5 h-3.5 text-indigo-600" />
                <span>Target Keywords:</span>
              </div>
              {service.primaryKeyword && (
                <span className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-bold text-[11px] shadow-2xs">
                  {service.primaryKeyword}
                </span>
              )}
              {service.metaKeywords.slice(0, 5).map((kw, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-white text-slate-700 border border-slate-200 text-[11px] font-medium"
                >
                  #{kw}
                </span>
              ))}
            </div>

            {/* Service SEO Friendly Description */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-xs">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>Executive Summary &amp; Authentication Quality</span>
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {service.seoDescription}
              </p>
            </div>

            {/* Core Features Checkmark Grid */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Guaranteed Account Specifications:</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {service.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 shadow-2xs"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-snug font-medium">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Replacement Guarantee Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-50 via-white to-sky-50 border border-indigo-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">48-Hour Unconditional Replacement Policy</h4>
                  <p className="text-xs text-slate-600">
                    If any account credentials encounter invalid login or security flags upon delivery, our Telegram &amp; WhatsApp live desk will replace it instantly.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Interactive Pricing Tier Selector & Buy Options */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 shadow-xl shadow-slate-200/70 space-y-6 sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wider font-bold block">Select Tier</span>
                <h3 className="text-base font-bold text-slate-900">Packages &amp; Volume Pricing</h3>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-slate-900">${selectedTier.price}</span>
                {selectedTier.unitPrice && (
                  <span className="block text-[11px] text-emerald-700 font-bold">{selectedTier.unitPrice}</span>
                )}
              </div>
            </div>

            {/* Pricing Tiers Radios */}
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {service.pricingTiers.map((tier) => {
                const isSelected = selectedTierId === tier.id;
                return (
                  <div
                    key={tier.id}
                    onClick={() => setSelectedTierId(tier.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-indigo-50/80 border-indigo-500 text-indigo-950 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-slate-400'
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm font-bold text-slate-900">{tier.name}</span>
                          {tier.badge && (
                            <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 border border-amber-300">
                              {tier.badge}
                            </span>
                          )}
                        </div>
                        {tier.notes && <p className="text-[11px] text-slate-500 font-medium">{tier.notes}</p>}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-base font-extrabold text-slate-900">${tier.price}</span>
                      {tier.unitPrice && <span className="block text-[10px] text-slate-500 font-medium">{tier.unitPrice}</span>}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm rounded-xl shadow-md shadow-indigo-600/20 transition-all cursor-pointer transform active:scale-[0.99]"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add Selected Package to Cart &bull; ${selectedTier.price}</span>
              </button>

              {/* Direct Crypto Checkout Button */}
              <button
                onClick={() => onDirectCryptoCheckout(service, selectedTier.id)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl border border-slate-800 transition-all cursor-pointer shadow-xs"
              >
                <Coins className="w-4 h-4 text-amber-400" />
                <span>Instant Crypto Checkout (BTC/LTC/ETH/USDT/SOL)</span>
              </button>

              {/* Direct Instant Contact Buttons */}
              <div className="pt-2">
                <p className="text-[11px] text-slate-500 text-center mb-2 font-semibold">Or order directly via instant chat:</p>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={telegramDirectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 rounded-xl text-xs font-bold transition-all text-center"
                  >
                    <Send className="w-3.5 h-3.5 text-sky-600" />
                    <span>Telegram Order</span>
                  </a>

                  <a
                    href={whatsappDirectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold transition-all text-center"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp Order</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Delivery & Security Metrics */}
            <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-600 space-y-1.5 font-medium">
              <div className="flex items-center justify-between">
                <span>Dispatch Speed:</span>
                <span className="text-slate-900 font-semibold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-indigo-600" /> {service.deliveryTime}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Delivery Format:</span>
                <span className="text-slate-800 font-mono text-[10px] bg-slate-100 px-1.5 py-0.5 rounded">Credentials / Token / CSV</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Support Desk:</span>
                <span className="text-sky-700 font-bold">Telegram @{SITE_CONFIG.telegramUsername}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Long SEO Content Section (1,000 to 2,000+ Words) */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 space-y-10 shadow-xs">
          <div className="border-b border-slate-200 pb-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
              <BookOpen className="w-4 h-4" />
              <span>Comprehensive 2026 In-Depth Authority Guide &bull; 1,500+ Words</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              In-Depth Guide &amp; Operational Blueprint: {service.title}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Architectural insights, anti-fingerprint warmup schedules, technical deliverability frameworks, and deployment best practices.
            </p>
          </div>

          {/* Table of Contents Box */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>Table of Contents &bull; Guide Navigation</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
              <a href="#section-overview" className="p-2 rounded-lg bg-white border border-slate-200 hover:border-indigo-400 text-slate-700 hover:text-indigo-600 font-medium transition-colors">
                1. Market Dynamics &amp; Architecture
              </a>
              <a href="#section-why-choose" className="p-2 rounded-lg bg-white border border-slate-200 hover:border-indigo-400 text-slate-700 hover:text-indigo-600 font-medium transition-colors">
                2. Why Choose Our Verified Accounts
              </a>
              <a href="#section-use-cases" className="p-2 rounded-lg bg-white border border-slate-200 hover:border-indigo-400 text-slate-700 hover:text-indigo-600 font-medium transition-colors">
                3. High-ROI Business Use Cases
              </a>
              <a href="#section-technical" className="p-2 rounded-lg bg-white border border-slate-200 hover:border-indigo-400 text-slate-700 hover:text-indigo-600 font-medium transition-colors">
                4. Technical Protocols &amp; Specifications
              </a>
              <a href="#section-comparison" className="p-2 rounded-lg bg-white border border-slate-200 hover:border-indigo-400 text-slate-700 hover:text-indigo-600 font-medium transition-colors">
                5. Quality Benchmarks vs Cheap Bots
              </a>
              <a href="#section-setup-protocol" className="p-2 rounded-lg bg-white border border-slate-200 hover:border-indigo-400 text-slate-700 hover:text-indigo-600 font-medium transition-colors">
                6. Step-by-Step Login &amp; Initialization
              </a>
              <a href="#section-anti-ban" className="p-2 rounded-lg bg-white border border-slate-200 hover:border-indigo-400 text-slate-700 hover:text-indigo-600 font-medium transition-colors">
                7. Anti-Ban, Proxy &amp; Warmup Guidelines
              </a>
              <a href="#section-external-citations" className="p-2 rounded-lg bg-white border border-slate-200 hover:border-indigo-400 text-slate-700 hover:text-indigo-600 font-medium transition-colors">
                8. Authoritative References &amp; Standards
              </a>
              <a href="#section-faqs" className="p-2 rounded-lg bg-white border border-slate-200 hover:border-indigo-400 text-slate-700 hover:text-indigo-600 font-medium transition-colors">
                9. Detailed Service FAQs (8-10 Q&amp;As)
              </a>
            </div>
          </div>

          {/* Article Section 1: Overview */}
          <div id="section-overview" className="space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-indigo-700 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">1</span>
              <span>1. Technical Architecture &amp; Ecosystem Dynamics of {service.title}</span>
            </h3>
            <div className="prose prose-slate max-w-none text-sm text-slate-700 leading-relaxed space-y-3 font-normal">
              <p>{service.longContent.overview}</p>
              <p>
                In modern web infrastructures, security firewalls analyze hundreds of telemetry vectors including IP reputation, residential Autonomous System Numbers (ASN), browser TLS fingerprinting (JA3/JA4 signatures), and behavioral canvas hashing. Sourcing authentic accounts with pristine historical reputation is the single most critical factor determining your operational deliverability, account longevity, and campaign ROI.
              </p>
            </div>
          </div>

          {/* Article Section 2: Why Buy */}
          <div id="section-why-choose" className="space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-indigo-700 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">2</span>
              <span>2. Why Choose BuyMailAccounts.com for {service.title}?</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {service.longContent.whyBuy.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Article Section 3: Recommended Use Cases */}
          <div id="section-use-cases" className="space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-indigo-700 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">3</span>
              <span>3. Enterprise &amp; High-ROI Operational Use Cases</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.longContent.useCases.map((useCase, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs text-xs sm:text-sm text-slate-700">
                  <div className="flex items-center gap-2 font-bold text-indigo-700 mb-1.5">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Application Scenario {idx + 1}</span>
                  </div>
                  <p className="leading-relaxed">{useCase}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Article Section 4: Technical Deep Dive */}
          <div id="section-technical" className="space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-indigo-700 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">4</span>
              <span>4. Technical Specifications &amp; Infrastructure Parameters</span>
            </h3>
            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white space-y-4 shadow-md">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-indigo-300">
                <Cpu className="w-4 h-4 text-indigo-400" />
                <span>System Configuration &bull; Direct Compliance Engine</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-white/10 border border-white/10">
                  <span className="text-indigo-200 block text-[11px] font-semibold mb-1">Network Registration:</span>
                  <span className="font-mono text-emerald-300 font-bold">Residential ISP Clean ASN</span>
                </div>
                <div className="p-3 rounded-xl bg-white/10 border border-white/10">
                  <span className="text-indigo-200 block text-[11px] font-semibold mb-1">Authentication Layer:</span>
                  <span className="font-mono text-emerald-300 font-bold">PVA / Physical Carrier SIM</span>
                </div>
                <div className="p-3 rounded-xl bg-white/10 border border-white/10">
                  <span className="text-indigo-200 block text-[11px] font-semibold mb-1">Security Protocols:</span>
                  <span className="font-mono text-emerald-300 font-bold">2FA / Recovery Email Synced</span>
                </div>
              </div>
              {service.longContent.technicalDetails && service.longContent.technicalDetails.length > 0 && (
                <div className="space-y-3 pt-2">
                  {service.longContent.technicalDetails.map((td, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs">
                      <h4 className="font-bold text-indigo-200 mb-1">{td.heading}</h4>
                      <p className="text-slate-300 leading-relaxed">{td.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Comparison Table */}
          {service.longContent.comparisonPoints && (
            <div id="section-comparison" className="space-y-4">
              <h3 className="text-lg sm:text-xl font-bold text-indigo-700 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">5</span>
                <span>5. Quality Standards: BuyMailAccounts.com vs Cheap Automated Bots</span>
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                  <thead className="bg-slate-100 text-slate-800 uppercase tracking-wider text-[11px] font-bold">
                    <tr>
                      <th className="p-3.5 border-b border-slate-200">Security &amp; Quality Vector</th>
                      <th className="p-3.5 border-b border-slate-200 text-indigo-700 font-extrabold bg-indigo-50/50">BuyMailAccounts.com</th>
                      <th className="p-3.5 border-b border-slate-200 text-rose-600">Cheap Public Bot Resellers</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {service.longContent.comparisonPoints.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80">
                        <td className="p-3.5 font-bold text-slate-900">{row.label}</td>
                        <td className="p-3.5 text-emerald-700 font-semibold bg-emerald-50/30 flex items-center gap-1.5">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{row.ourService}</span>
                        </td>
                        <td className="p-3.5 text-rose-600 font-medium">{row.cheapBots}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Article Section 6: Setup & Login Guide */}
          <div id="section-setup-protocol" className="space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-indigo-700 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">6</span>
              <span>6. Step-by-Step Onboarding &amp; Login Protocol</span>
            </h3>
            <ol className="space-y-3">
              {service.longContent.setupGuide.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700">
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-xs">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed font-medium">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Article Section 7: Security & Longevity Tips */}
          <div id="section-anti-ban" className="space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-indigo-700 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">7</span>
              <span>7. Anti-Ban, Proxy Rotation &amp; Account Longevity Framework</span>
            </h3>
            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
              <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Strict Operational Safety Instructions</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {service.longContent.securityTips.map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-800 font-medium p-2 rounded-lg bg-white/80 border border-amber-100">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 shrink-0" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Article Section 8: External Authority Citations */}
          <div id="section-external-citations" className="space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-indigo-700 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">8</span>
              <span>8. Technical Standards &amp; Authoritative Industry References</span>
            </h3>
            <p className="text-xs text-slate-600">
              For enterprise security compliance and deliverability audits, consult the official documentation and RFC internet specifications:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {service.externalLinks && service.externalLinks.length > 0 ? (
                service.externalLinks.map((ext, idx) => (
                  <a
                    key={idx}
                    href={ext.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/40 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold text-indigo-700 group-hover:text-indigo-900 mb-1">
                        <span>{ext.title}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-indigo-500" />
                      </div>
                      <p className="text-[11px] text-slate-600">{ext.reason}</p>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-2 font-mono">{ext.authority}</span>
                  </a>
                ))
              ) : (
                <>
                  <a
                    href="https://support.google.com/mail/answer/81126"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-indigo-400 text-xs text-slate-700 flex items-center justify-between"
                  >
                    <div>
                      <strong className="block text-indigo-700">Google Email Sender Guidelines</strong>
                      <span className="text-[11px] text-slate-500">SPF, DKIM, and DMARC rules</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                  <a
                    href="https://docs.github.com/en/authentication"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-indigo-400 text-xs text-slate-700 flex items-center justify-between"
                  >
                    <div>
                      <strong className="block text-indigo-700">GitHub Authentication Protocols</strong>
                      <span className="text-[11px] text-slate-500">SSH &amp; Personal Access Tokens</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                  <a
                    href="https://www.ietf.org/rfc/rfc5322.txt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-indigo-400 text-xs text-slate-700 flex items-center justify-between"
                  >
                    <div>
                      <strong className="block text-indigo-700">IETF RFC 5322 Standard</strong>
                      <span className="text-[11px] text-slate-500">Internet Message Format Specifications</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Internal Links Hub */}
          <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-sm text-slate-700 space-y-3">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <LinkIcon className="w-4 h-4 text-indigo-600" />
              <span>Internal Service Cross-Links &amp; Complementary Solutions:</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">{service.longContent.summary}</p>
            <div className="flex flex-wrap gap-2 pt-1">
              {service.relatedServiceIds.map((relId) => {
                const rel = getServiceByIdOrSlug(relId);
                if (!rel) return null;
                return (
                  <button
                    key={rel.id}
                    onClick={() => onSelectService(rel.id)}
                    className="px-3 py-1.5 rounded-lg bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-600 hover:text-white transition-all text-xs font-semibold shadow-2xs cursor-pointer"
                  >
                    &rarr; {rel.title} (${rel.startingPrice})
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* 8 to 10 FAQs Accordion */}
        <section id="section-faqs" className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 space-y-6 shadow-xs">
          <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
                <HelpCircle className="w-6 h-6 text-indigo-600" />
                <span>Frequently Asked Questions ({service.faqs.length} Dedicated FAQs)</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Detailed answers regarding delivery speed, verification methods, replacement warranty, and technical setup.
              </p>
            </div>
            <div className="text-xs text-indigo-700 font-bold bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-200 self-start sm:self-auto">
              Live Telegram &bull; WhatsApp Support 24/7
            </div>
          </div>

          <div className="space-y-3">
            {service.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-slate-50/70 overflow-hidden transition-all shadow-2xs"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-indigo-600 transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-mono font-black shrink-0">
                        {idx + 1}
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
                    <div className="px-5 sm:px-6 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/80 pt-3.5 bg-white">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Related Services Grid */}
        {relatedServices.length > 0 && (
          <section className="space-y-6 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Complementary Verified Services</h2>
                <p className="text-xs text-slate-500">Popular accounts frequently ordered alongside {service.title}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedServices.map((rel) => (
                <ServiceCard
                  key={rel.id}
                  service={rel}
                  onSelectService={onSelectService}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

