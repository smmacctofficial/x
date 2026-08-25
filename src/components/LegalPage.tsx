import React, { useEffect } from 'react';
import {
  ShieldCheck,
  FileText,
  RefreshCw,
  Lock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Send
} from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';
import { SeoHead } from './SeoHead';

export type LegalPolicyType = 'privacy' | 'terms' | 'refund';

interface LegalPageProps {
  policyType: LegalPolicyType;
  onSelectPolicy: (policyType: LegalPolicyType) => void;
  onNavigateHome: () => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({
  policyType,
  onSelectPolicy,
  onNavigateHome
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [policyType]);

  const policies = {
    privacy: {
      title: 'Privacy Policy & Data Protection',
      seoTitle: 'Privacy Policy | BuyMailAccounts.com Data Security & GDPR Compliance',
      description: 'Review the BuyMailAccounts.com privacy policy. Learn how we handle customer data, zero-logging crypto transactions, and user privacy protection.',
      canonicalUrl: 'https://buymailaccounts.com/#privacy-policy',
      content: (
        <div className="space-y-6 text-slate-700 text-sm leading-relaxed">
          <p>
            <strong>Last Updated: August 2026</strong>. At BuyMailAccounts.com, we are strictly committed to protecting the privacy, confidentiality, and data sovereignty of our customers and visitors.
          </p>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">1. Information Collection &amp; Zero-Logging Principle</h2>
            <p>
              We adhere to minimal data retention standards. When you browse our catalog or checkout using cryptocurrency (BTC, LTC, ETH, USDT, SOL), we do not collect personal financial information, banking credentials, or unnecessary telemetry. Information provided during Telegram/WhatsApp order fulfillment is utilized exclusively for delivering your digital credentials and honoring your 48-hour replacement warranty.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">2. Utilization of Data</h2>
            <p>
              Any contact details provided (such as an email address or messaging handle) are strictly used for:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Transmitting order deliverables (account credential packages, backup tokens).</li>
              <li>Providing technical assistance, replacement support, and warranty fulfillment.</li>
              <li>Preventing automated denial-of-service abuse against our infrastructure.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">3. Non-Disclosure to Third Parties</h2>
            <p>
              BuyMailAccounts.com never sells, rents, leases, or trades customer contact information or order records with third-party marketing brokers or advertising networks.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">4. Cookies &amp; Local Storage</h2>
            <p>
              Our web application utilizes basic client-side state storage strictly for preserving active cart contents and user UI preferences (such as selected currency or category filters). We do not deploy invasive cross-site tracking pixels.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">5. Contact Data Protection Officer</h2>
            <p>
              If you have any questions regarding our data practices or wish to request data purge after order delivery, contact our privacy team at <a href={`mailto:${SITE_CONFIG.supportEmail}`} className="text-indigo-600 underline font-semibold">{SITE_CONFIG.supportEmail}</a> or via Telegram @{SITE_CONFIG.telegramUsername}.
            </p>
          </section>
        </div>
      )
    },
    terms: {
      title: 'Terms of Service & Acceptable Use Policy',
      seoTitle: 'Terms of Service | BuyMailAccounts.com User Agreement',
      description: 'Read the official Terms of Service for BuyMailAccounts.com. Understand buyer obligations, acceptable use guidelines, delivery timelines, and liability limitations.',
      canonicalUrl: 'https://buymailaccounts.com/#terms',
      content: (
        <div className="space-y-6 text-slate-700 text-sm leading-relaxed">
          <p>
            <strong>Last Updated: August 2026</strong>. By accessing BuyMailAccounts.com or purchasing any digital assets from our platform, you agree to be bound by these Terms of Service.
          </p>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">1. Nature of Digital Goods Delivered</h2>
            <p>
              BuyMailAccounts.com provides authentic, phone-verified (PVA) and aged digital account infrastructure (Gmail, GitHub, Banking, Social Media) designed for digital marketing, software development, continuous integration, and brand outreach. Upon delivery, the customer is granted full administrative ownership of the credentials.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">2. Acceptable Use Policy</h2>
            <p>
              Customers agree not to utilize delivered accounts for illegal cyber activities, malware distribution, phishing, or activities violating local and international cybersecurity laws. Customers are solely responsible for compliance with relevant platform terms and legal guidelines.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">3. Delivery Timelines &amp; Format</h2>
            <p>
              Standard orders are delivered within 10 to 30 minutes following blockchain payment confirmation. Large bulk orders (&gt; 500 accounts) may require up to 2 to 4 hours for manual quality verification and export.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">4. Limitation of Liability</h2>
            <p>
              BuyMailAccounts.com provides a 48-hour login warranty for all delivered accounts. Once credentials are successfully verified and handed over, BuyMailAccounts.com is not liable for subsequent account suspensions caused by aggressive non-compliant automation, improper proxy rotation, or violation of third-party platform algorithms.
            </p>
          </section>
        </div>
      )
    },
    refund: {
      title: '48-Hour Replacement & Refund Policy',
      seoTitle: '48-Hour Replacement Guarantee & Refund Policy | BuyMailAccounts.com',
      description: 'Comprehensive 48-Hour Replacement Guarantee policy at BuyMailAccounts.com. Fast replacement for invalid credentials or login discrepancies.',
      canonicalUrl: 'https://buymailaccounts.com/#refund-policy',
      content: (
        <div className="space-y-6 text-slate-700 text-sm leading-relaxed">
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-emerald-900">100% Unconditional 48-Hour Warranty</h3>
              <p className="text-xs text-emerald-700 mt-0.5">
                Every single account purchased through BuyMailAccounts.com is protected by our immediate replacement guarantee if reported within 48 hours of delivery.
              </p>
            </div>
          </div>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">1. Eligible Replacement Scenarios</h2>
            <p>
              We will replace your account immediately and without questions under any of the following initial conditions:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Invalid username or password upon initial delivery.</li>
              <li>Account already disabled or restricted prior to first customer login.</li>
              <li>Recovery email password mismatch or missing backup codes.</li>
              <li>Initial unexpected phone verification checkpoint during first login on a matching country proxy.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">2. How to Request an Instant Replacement</h2>
            <p>
              To initiate a replacement request within the 48-hour window:
            </p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Contact our support team on Telegram (<strong>@{SITE_CONFIG.telegramUsername}</strong>) or WhatsApp (<strong>{SITE_CONFIG.whatsappDisplay}</strong>).</li>
              <li>Provide your order reference number / transaction hash.</li>
              <li>Provide the specific email / account username with a screenshot of the login prompt.</li>
              <li>Our dispatch agent will issue a brand-new verified replacement within 15 minutes.</li>
            </ol>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">3. Monetary Refunds</h2>
            <p>
              Because digital credentials are unrecoverable assets once dispatched, our standard resolution is an immediate replacement from our pristine backup inventory. If our team is temporarily out of stock for your specific category and cannot replace the item within 12 hours, a full 100% refund will be issued to your cryptocurrency wallet address.
            </p>
          </section>
        </div>
      )
    }
  };

  const current = policies[policyType];

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 pb-20">
      <SeoHead
        title={`${current.seoTitle}`}
        description={current.description}
        canonicalUrl={current.canonicalUrl}
        keywords={[
          'buymailaccounts legal',
          'email accounts refund policy',
          'terms of service',
          'privacy policy',
          '48 hour replacement guarantee'
        ]}
      />

      {/* Header */}
      <div className="bg-white border-b border-slate-200 py-12 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5" />
            <span>Compliance, Legal &amp; Guarantee Policies</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {current.title}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Our transparent policies are designed to protect your investments, guarantee high service delivery standards, and provide clear operational guidelines.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8">
        {/* Policy Tab Switcher */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <button
            onClick={() => onSelectPolicy('refund')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              policyType === 'refund'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>48-Hour Replacement Policy</span>
          </button>

          <button
            onClick={() => onSelectPolicy('privacy')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              policyType === 'privacy'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Privacy Policy (GDPR)</span>
          </button>

          <button
            onClick={() => onSelectPolicy('terms')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              policyType === 'terms'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Terms of Service</span>
          </button>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs">
          {current.content}
        </div>

        {/* Support Callout */}
        <div className="p-6 rounded-2xl bg-indigo-50 border border-indigo-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm font-bold text-slate-900">Need immediate warranty assistance?</h4>
            <p className="text-xs text-slate-600">Our Telegram dispatch engineers process replacements in under 15 minutes.</p>
          </div>
          <a
            href={`https://t.me/${SITE_CONFIG.telegramUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Message @{SITE_CONFIG.telegramUsername}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
