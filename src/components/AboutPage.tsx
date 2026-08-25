import React from 'react';
import {
  ShieldCheck,
  Award,
  Users,
  Lock,
  Zap,
  Globe2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Server,
  Headphones,
  Check
} from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';
import { SeoHead } from './SeoHead';

interface AboutPageProps {
  onNavigateHome: () => void;
  onSelectCategory?: (category: any) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigateHome, onSelectCategory }) => {
  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About BuyMailAccounts.com - Enterprise Digital Asset Infrastructure',
    description: 'Learn about BuyMailAccounts.com, our manual account verification protocols, real SIM PVA networks, and commitment to deliverability and security.',
    url: 'https://buymailaccounts.com/#about',
    mainEntity: {
      '@type': 'Organization',
      name: 'BuyMailAccounts.com',
      url: 'https://buymailaccounts.com',
      logo: 'https://buymailaccounts.com/logo.png',
      foundingDate: '2021',
      description: 'Global provider of verified USA Gmail, GitHub, banking, and social accounts.',
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: SITE_CONFIG.supportEmail,
        telephone: SITE_CONFIG.whatsappDisplay,
        availableLanguage: ['English', 'Spanish', 'German', 'Bengali']
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 pb-20">
      <SeoHead
        title="About Us | BuyMailAccounts.com - Verified Email, GitHub & Bank Accounts Provider"
        description="Learn about BuyMailAccounts.com: the trusted provider of aged USA Gmails, developer GitHub accounts, and KYC-verified banking credentials with 48-hour warranty."
        canonicalUrl="https://buymailaccounts.com/#about"
        keywords={[
          'about buymailaccounts',
          'trusted gmail provider',
          'verified github seller',
          'pva accounts company',
          'digital marketing infrastructure'
        ]}
        schemaJson={schemaJson}
      />

      {/* Header Banner */}
      <div className="bg-white border-b border-slate-200 py-12 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Trusted Digital Infrastructure Since 2021</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Empowering Global Marketers &amp; Developers with Verified Assets
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We deliver handcrafted, residential-IP verified Gmail, GitHub, banking, and social media accounts engineered for longevity, inbox deliverability, and developer compliance.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        {/* Core Pillars / Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-xs">
            <span className="block text-3xl sm:text-4xl font-black text-indigo-600 mb-1">50,000+</span>
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Accounts Delivered</span>
            <p className="text-[11px] text-slate-400 mt-1">Across 85+ countries</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-xs">
            <span className="block text-3xl sm:text-4xl font-black text-emerald-600 mb-1">99.4%</span>
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Login Success Rate</span>
            <p className="text-[11px] text-slate-400 mt-1">48-hour replacement warranty</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-xs">
            <span className="block text-3xl sm:text-4xl font-black text-indigo-600 mb-1">10-30m</span>
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Average Dispatch</span>
            <p className="text-[11px] text-slate-400 mt-1">Automated + manual dispatch</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-xs">
            <span className="block text-3xl sm:text-4xl font-black text-emerald-600 mb-1">24/7/365</span>
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Dedicated Support</span>
            <p className="text-[11px] text-slate-400 mt-1">Telegram &amp; WhatsApp</p>
          </div>
        </div>

        {/* Our Mission & Philosophy */}
        <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 space-y-6 shadow-xs">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              <Award className="w-7 h-7 text-indigo-600" />
              <span>Our Story &amp; Engineering Philosophy</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              In modern growth marketing, SaaS operations, and software engineering, digital account verification has become the single biggest friction point. Many low-cost account sellers flood the internet with cheap bot-generated credentials created on flagged datacenter proxies using temporary virtual numbers. These accounts burn within 48 hours, causing massive disruptions to customer campaigns.
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              BuyMailAccounts.com was founded on a simple principle: <strong>Quality Over Volume</strong>. We build and maintain custom registration rigs powered by real, physical cellular SIM cards and clean, dedicated residential ISP connections (AT&amp;T, Verizon, Comcast, Vodafone). Every credential undergoes stringent multi-point automated sanity checks before entering our delivery inventory.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                <Server className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Residential ISP Rig</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Zero datacenter proxies. Every account is registered over authentic consumer residential network ranges with genuine OS &amp; browser fingerprints.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Physical SIM PVA</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Real cellular SIM numbers attached to Tier-1 telecom providers, ensuring that security audits and 2FA recovery prompts are handled seamlessly.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">48-Hour Full Warranty</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We stand behind our quality. If any delivered credential fails login during your initial setup, we replace it immediately via live chat.
              </p>
            </div>
          </div>
        </section>

        {/* Verification Standards & Quality Workflow */}
        <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 space-y-8 shadow-xs">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Our 5-Stage Verification Protocol
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              How we guarantee 99.4% first-time login success across all account categories
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                step: '01',
                title: 'IP & Fingerprint Cleanliness Audit',
                desc: 'Every registration environment is evaluated against 15+ fraud detection databases (IPQualityScore, MaxMind, ScamAnalytics) to guarantee zero blacklisting history.'
              },
              {
                step: '02',
                title: 'Physical Carrier SIM Handshake',
                desc: 'SMS tokens are received directly via physical carrier modems. Carrier metadata registers as Mobile rather than VoIP, establishing permanent high trust scores.'
              },
              {
                step: '03',
                title: 'Recovery Integration & 2FA Configuration',
                desc: 'Secondary recovery emails and App Passwords are configured and tested to allow immediate IMAP/SMTP client sync.'
              },
              {
                step: '04',
                title: 'Controlled Aging & Warm-Up Stage',
                desc: 'Aged account batches are kept active on static residential IPs with natural activity tokens to mature their reputation score.'
              },
              {
                step: '05',
                title: 'Encrypted Vault Storage & Dispatch',
                desc: 'Credentials are securely generated and transmitted in standardized, copy-ready formats (Email:Password:Recovery) with instant delivery.'
              }
            ].map((st, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-base font-black text-indigo-600 font-mono bg-indigo-50 px-3 py-1 rounded-xl border border-indigo-100">
                  {st.step}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{st.title}</h3>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact / Action CTA */}
        <div className="p-8 sm:p-10 rounded-3xl bg-indigo-600 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-indigo-600/20">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-black">Ready to scale your digital operations?</h3>
            <p className="text-sm text-indigo-100 max-w-xl">
              Browse our catalog of 35+ verified email, GitHub, banking, and social accounts with instant delivery and 24/7 support.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="px-6 py-3.5 bg-white text-indigo-700 font-extrabold text-sm rounded-xl hover:bg-indigo-50 transition-all cursor-pointer shadow-md"
            >
              Explore All Services
            </button>
            <a
              href={`https://t.me/${SITE_CONFIG.telegramUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-indigo-700/70 hover:bg-indigo-700 text-white font-extrabold text-sm rounded-xl border border-indigo-400 transition-all"
            >
              Talk to Specialist
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
