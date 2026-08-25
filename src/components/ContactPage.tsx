import React, { useState } from 'react';
import {
  Send,
  PhoneCall,
  Mail,
  Clock,
  CheckCircle2,
  HelpCircle,
  MessageSquare,
  ShieldCheck,
  Zap,
  Sparkles
} from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';
import { SeoHead } from './SeoHead';

interface ContactPageProps {
  onNavigateToFaq?: () => void;
  onNavigateHome?: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigateToFaq, onNavigateHome }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    serviceInterest: 'USA Gmail Accounts',
    quantity: '5 - 20',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const telegramOrderMsg = encodeURIComponent(
    `Hello BuyMailAccounts Support! My name is ${formData.name || 'a customer'}. I am interested in ordering: ${formData.serviceInterest} (Qty: ${formData.quantity}). Notes: ${formData.message || 'Please send payment and delivery info.'}`
  );
  const directTelegramFormLink = `https://t.me/${SITE_CONFIG.telegramUsername}?text=${telegramOrderMsg}`;

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Customer Support | BuyMailAccounts.com',
    description: 'Get in touch with BuyMailAccounts.com 24/7 customer support via Telegram, WhatsApp, or email for instant orders and replacement requests.',
    url: 'https://buymailaccounts.com/#contact',
    mainEntity: {
      '@type': 'Organization',
      name: 'BuyMailAccounts.com',
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: SITE_CONFIG.supportEmail,
          telephone: SITE_CONFIG.whatsappDisplay,
          availableLanguage: ['English', 'Spanish', 'German', 'Bengali'],
          contactOption: 'TollFree',
          hoursAvailable: 'Mo-Su 00:00-24:00'
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 pb-20">
      <SeoHead
        title="Contact Us & 24/7 Support Desk | BuyMailAccounts.com"
        description="Need assistance, custom bulk quote, or replacement warranty support? Contact BuyMailAccounts.com 24/7 via Telegram @SmmAcct or WhatsApp +1 (312) 678-0720."
        canonicalUrl="https://buymailaccounts.com/#contact"
        keywords={[
          'contact buymailaccounts',
          'buymailaccounts telegram',
          'buymailaccounts whatsapp',
          'customer support email accounts',
          'custom bulk order accounts'
        ]}
        schemaJson={schemaJson}
      />

      {/* Header */}
      <div className="bg-white border-b border-slate-200 py-12 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Support Desk Live 24/7/365</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            We’re Here to Help You Scale
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Have questions about account stock, custom enterprise orders, or warranty replacements? Reach out to our technical support team through your preferred channel.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        {/* Contact Channel Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Telegram Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 border border-sky-200 flex items-center justify-center">
                <Send className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Fastest Response (&lt; 10 mins)</span>
                <h3 className="text-xl font-extrabold text-slate-900">Telegram Direct Chat</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Connect directly with our senior dispatch engineers for immediate order confirmations, payment address confirmations, and custom requests.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <span className="text-xs text-slate-400 block font-medium">Handle:</span>
              <span className="text-sm font-bold text-slate-900">@{SITE_CONFIG.telegramUsername}</span>
              <a
                href={`https://t.me/${SITE_CONFIG.telegramUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 w-full flex items-center justify-center gap-2 py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Open Telegram Chat</span>
              </a>
            </div>
          </div>

          {/* WhatsApp Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center">
                <PhoneCall className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Direct Messaging</span>
                <h3 className="text-xl font-extrabold text-slate-900">WhatsApp Business</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Ideal for order inquiries, invoice requests, and bulk order discounts directly to your mobile device.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <span className="text-xs text-slate-400 block font-medium">Phone / WhatsApp:</span>
              <span className="text-sm font-bold text-slate-900">{SITE_CONFIG.whatsappDisplay}</span>
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappCleanNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Open WhatsApp Chat</span>
              </a>
            </div>
          </div>

          {/* Email Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-200 flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Enterprise &amp; Invoicing</span>
                <h3 className="text-xl font-extrabold text-slate-900">Email Support Desk</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Send formal proposals, B2B wholesale contracts, and account replacement requests with screenshot attachments.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <span className="text-xs text-slate-400 block font-medium">Official Inbox:</span>
              <span className="text-sm font-bold text-slate-900 truncate block">{SITE_CONFIG.supportEmail}</span>
              <a
                href={`mailto:${SITE_CONFIG.supportEmail}`}
                className="mt-3 w-full flex items-center justify-center gap-2 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition-all"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Send Email</span>
              </a>
            </div>
          </div>
        </div>

        {/* Custom Order & Inquiry Form */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs">
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Send a Custom Inquiry or Bulk Quote Request
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Fill in your details below. For ultra-fast dispatch, submit and click the direct Telegram button.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold text-slate-900">Inquiry Received Successfully!</h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Our team has recorded your request. For instant 5-minute confirmation, open your pre-filled inquiry in Telegram below:
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={directTelegramFormLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send directly to Telegram Support</span>
                  </a>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-3 bg-white border border-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-50"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Your Name / Handle</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex (Agency Lead)"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-indigo-600"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Your Contact Email / Telegram</label>
                    <input
                      type="text"
                      required
                      placeholder="alex@company.com or @alex_tg"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-indigo-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Service Required</label>
                    <select
                      value={formData.serviceInterest}
                      onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-indigo-600 bg-white"
                    >
                      <option value="USA Gmail Accounts">USA Gmail Accounts (PVA / Aged)</option>
                      <option value="Aged Gmail for Google Ads">Aged Gmail for Google Ads</option>
                      <option value="GitHub Accounts with Commits">GitHub Accounts with Commits</option>
                      <option value="Verified PayPal Account">Verified PayPal (Personal/Business)</option>
                      <option value="Verified Cash App BTC">Verified Cash App BTC</option>
                      <option value="Outlook & Hotmail Bulk">Outlook &amp; Hotmail Bulk</option>
                      <option value="Google Voice Accounts">Google Voice Accounts</option>
                      <option value="Other Custom Service">Other Custom Service</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Estimated Quantity</label>
                    <select
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-indigo-600 bg-white"
                    >
                      <option value="1 - 5 Accounts">1 - 5 Accounts (Starter)</option>
                      <option value="5 - 20 Accounts">5 - 20 Accounts (Standard)</option>
                      <option value="50 - 100 Accounts">50 - 100 Accounts (Bulk)</option>
                      <option value="500+ Accounts">500+ Accounts (Enterprise Wholesale)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Project Details / Specific Notes</label>
                  <textarea
                    rows={4}
                    placeholder="Provide any specific requirements (e.g. specific creation year, recovery mail format, custom proxy requirements)..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-indigo-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm rounded-xl shadow-md transition-all cursor-pointer"
                >
                  Submit Inquiry to Support
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
