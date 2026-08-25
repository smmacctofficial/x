import React, { useState } from 'react';
import { Send, PhoneCall, MessageCircle, X, ExternalLink } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';

export const FloatingChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded Quick Contact Popover */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white border border-slate-200 rounded-2xl shadow-2xl p-4 transition-all animate-in fade-in slide-in-from-bottom-5 text-slate-900">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <div>
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Live Customer Support</h4>
                <p className="text-[10px] text-slate-500 font-medium">Average response: 2 minutes</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-3 text-xs text-slate-600 space-y-2 font-normal">
            <p>
              Need a custom bulk order, sample testing, or urgent replacement? Chat directly with our verified managers:
            </p>
          </div>

          <div className="space-y-2 pt-1">
            <a
              href={SITE_CONFIG.telegramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between p-2.5 bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 rounded-xl text-xs font-semibold transition-all group"
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-sky-100 flex items-center justify-center text-sky-600">
                  <Send className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-slate-900 font-bold">Telegram Support</p>
                  <p className="text-[10px] text-sky-600 font-mono">@{SITE_CONFIG.telegramUsername}</p>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 text-sky-600" />
            </a>

            <a
              href={SITE_CONFIG.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between p-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-semibold transition-all group"
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-slate-900 font-bold">WhatsApp Direct</p>
                  <p className="text-[10px] text-emerald-600 font-mono">{SITE_CONFIG.whatsappNumber}</p>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 text-emerald-600" />
            </a>
          </div>

          <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-center text-slate-500 font-medium">
            Instant 24/7 Delivery &bull; 48H Replacement Guarantee
          </div>
        </div>
      )}

      {/* Main Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold text-sm rounded-full shadow-xl shadow-indigo-600/30 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </span>
        <MessageCircle className="w-5 h-5" />
        <span className="hidden sm:inline">24/7 Live Chat</span>
      </button>
    </div>
  );
};
