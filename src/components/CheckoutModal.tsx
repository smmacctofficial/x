import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  ShieldCheck,
  Send,
  PhoneCall,
  Sparkles,
  Lock,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, CryptoWallet, OrderSubmission } from '../types';
import { SITE_CONFIG, CRYPTO_WALLETS } from '../data/siteConfig';
import { BrandIcon } from './BrandIcon';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  discountAmount: number;
  onOrderSuccess: (order: OrderSubmission) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  discountAmount,
  onOrderSuccess,
}) => {
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoWallet>(
    CRYPTO_WALLETS.find((w) => w.symbol.includes('USDT')) || CRYPTO_WALLETS[0]
  );
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerTelegram, setCustomerTelegram] = useState('');
  const [customerWhatsApp, setCustomerWhatsApp] = useState('');
  const [transactionHash, setTransactionHash] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderSubmission | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(selectedCrypto.address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!customerEmail.trim() && !customerTelegram.trim() && !customerWhatsApp.trim()) {
      setFormError('Please provide at least one contact method (Email, Telegram, or WhatsApp) for account delivery.');
      return;
    }

    if (!transactionHash.trim()) {
      setFormError('Please enter your Transaction ID (TXID) / Hash or Payment Proof reference.');
      return;
    }

    setIsSubmitting(true);

    const generatedOrderId = `BMA-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder: OrderSubmission = {
      orderId: generatedOrderId,
      items: [...cartItems],
      totalAmount: finalTotal,
      customerEmail: customerEmail.trim(),
      customerTelegram: customerTelegram.trim(),
      customerWhatsApp: customerWhatsApp.trim(),
      paymentCrypto: `${selectedCrypto.name} (${selectedCrypto.symbol})`,
      transactionHash: transactionHash.trim(),
      notes: orderNotes.trim(),
      status: 'Pending Verification',
      createdAt: new Date().toISOString(),
    };

    // Save to local storage for local reference
    try {
      const existingOrders = JSON.parse(localStorage.getItem('bma_orders') || '[]');
      existingOrders.unshift(newOrder);
      localStorage.setItem('bma_orders', JSON.stringify(existingOrders));
    } catch {
      // ignore
    }

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setCompletedOrder(newOrder);
      onOrderSuccess(newOrder);
    }, 800);
  };

  // Telegram receipt sender link
  const makeTelegramReceiptLink = (order: OrderSubmission) => {
    const text = encodeURIComponent(
      `Hello! I just submitted order #${order.orderId} on BuyMailAccounts.com:\n` +
        `• Amount: $${order.totalAmount} via ${order.paymentCrypto}\n` +
        `• TXID / Hash: ${order.transactionHash}\n` +
        `• Email: ${order.customerEmail || 'N/A'}\n` +
        `• Items: ` +
        order.items.map((i) => `${i.serviceTitle} (${i.tierName}) x${i.quantity}`).join(', ') +
        `\nPlease verify and deliver credentials.`
    );
    return `https://t.me/${SITE_CONFIG.telegramUsername}?text=${text}`;
  };

  // WhatsApp receipt sender link
  const makeWhatsAppReceiptLink = (order: OrderSubmission) => {
    const text = encodeURIComponent(
      `Hello! I just submitted order #${order.orderId} on BuyMailAccounts.com:\n` +
        `• Amount: $${order.totalAmount} via ${order.paymentCrypto}\n` +
        `• TXID / Hash: ${order.transactionHash}\n` +
        `• Email: ${order.customerEmail || 'N/A'}\n` +
        `• Items: ` +
        order.items.map((i) => `${i.serviceTitle} (${i.tierName}) x${i.quantity}`).join(', ') +
        `\nPlease verify and deliver credentials.`
    );
    return `https://wa.me/${SITE_CONFIG.whatsappCleanNumber}?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl text-slate-900 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-slate-900">
                {completedOrder ? 'Order Confirmed!' : 'Crypto Payment Checkout'}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {completedOrder
                  ? `Order Reference: ${completedOrder.orderId}`
                  : `Secure instant payment with zero additional transaction fees`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {completedOrder ? (
          /* Order Confirmation View */
          <div className="p-6 sm:p-8 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200 shadow-xs">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                PAYMENT PROOF SUBMITTED
              </span>
              <h4 className="text-2xl font-black text-slate-900">Order #{completedOrder.orderId}</h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                Thank you! Your transaction details have been registered. To expedite instant delivery (10-30 mins), please send your TXID to our Telegram or WhatsApp team:
              </p>
            </div>

            {/* Quick Summary Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left text-xs space-y-2 max-w-lg mx-auto">
              <div className="flex justify-between">
                <span className="text-slate-500">Total Amount:</span>
                <span className="text-slate-900 font-black text-sm text-indigo-600">${completedOrder.totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment Crypto:</span>
                <span className="text-slate-900 font-semibold">{completedOrder.paymentCrypto}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Transaction ID:</span>
                <span className="text-slate-800 font-mono truncate max-w-[200px]">{completedOrder.transactionHash}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Items Ordered:</span>
                <span className="text-slate-900 font-medium">
                  {completedOrder.items.map((i) => `${i.serviceTitle} (${i.quantity})`).join(', ')}
                </span>
              </div>
            </div>

            {/* 1-Click Fast Delivery Notification Buttons */}
            <div className="space-y-2.5 max-w-md mx-auto pt-2">
              <a
                href={makeTelegramReceiptLink(completedOrder)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm rounded-xl shadow-md shadow-sky-500/20 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Send Receipt on Telegram (@{SITE_CONFIG.telegramUsername})</span>
              </a>

              <a
                href={makeWhatsAppReceiptLink(completedOrder)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md shadow-emerald-600/20 transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Send Receipt on WhatsApp ({SITE_CONFIG.whatsappNumber})</span>
              </a>
            </div>

            <div className="pt-2">
              <button
                onClick={onClose}
                className="text-xs text-slate-500 hover:text-slate-800 font-medium underline cursor-pointer"
              >
                Return to Store
              </button>
            </div>
          </div>
        ) : (
          /* Payment Form View */
          <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
            {/* Step 1: Select Crypto Coin */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                1. Select Crypto Payment Currency:
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {CRYPTO_WALLETS.map((crypto) => {
                  const isSelected = selectedCrypto.symbol === crypto.symbol;
                  return (
                    <button
                      key={crypto.symbol}
                      type="button"
                      onClick={() => setSelectedCrypto(crypto)}
                      className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-50 border-indigo-500 text-indigo-950 shadow-xs font-bold'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
                      }`}
                    >
                      <BrandIcon name={crypto.icon} className="w-6 h-6" />
                      <span className="text-xs font-bold">{crypto.symbol}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Wallet Address Display & QR Code Box */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-500 font-medium">Send Payment To ({selectedCrypto.network}):</span>
                  <p className="text-xs font-bold text-slate-900">{selectedCrypto.name} Address</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 font-medium">Amount Due:</span>
                  <span className="block text-lg font-black text-indigo-600">${finalTotal} USD</span>
                </div>
              </div>

              {/* Address Box with Copy Button */}
              <div className="flex items-center gap-2 p-2.5 bg-white border border-slate-200 rounded-xl shadow-2xs">
                <span className="font-mono text-xs text-indigo-900 font-bold select-all break-all flex-1">
                  {selectedCrypto.address}
                </span>
                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className={`p-2 rounded-lg text-xs font-bold transition-all shrink-0 flex items-center gap-1 cursor-pointer ${
                    copiedAddress
                      ? 'bg-emerald-600 text-white'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  }`}
                  title="Copy Wallet Address"
                >
                  {copiedAddress ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span className="hidden sm:inline">{copiedAddress ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <p className="text-[11px] text-slate-600 flex items-center gap-1 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Send any amount equal to <strong className="text-slate-900 font-bold">${finalTotal} USD</strong> to this address.</span>
              </p>
            </div>

            {/* Step 3: Customer Details & TXID Form */}
            <form onSubmit={handleSubmitOrder} className="space-y-4">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                2. Enter Delivery Contact &amp; Transaction Proof:
              </label>

              {formError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2 font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-700 font-bold block mb-1">
                    Your Email Address <span className="text-indigo-600">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600/20"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-700 font-bold block mb-1">
                    Telegram Username (Optional / Recommended)
                  </label>
                  <input
                    type="text"
                    value={customerTelegram}
                    onChange={(e) => setCustomerTelegram(e.target.value)}
                    placeholder="@YourUsername"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-700 font-bold block mb-1">
                    WhatsApp Number (Optional)
                  </label>
                  <input
                    type="text"
                    value={customerWhatsApp}
                    onChange={(e) => setCustomerWhatsApp(e.target.value)}
                    placeholder="+1 234 567 8900"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600/20"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-700 font-bold block mb-1">
                    Transaction ID / TXID Hash <span className="text-indigo-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={transactionHash}
                    onChange={(e) => setTransactionHash(e.target.value)}
                    placeholder="Enter blockchain TXID or Hash"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm font-mono text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600/20"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-700 font-bold block mb-1">
                  Custom Notes / Account Preferences (Optional)
                </label>
                <textarea
                  rows={2}
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="e.g. Please provide USA IP accounts with recovery email in CSV format."
                  className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600/20"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm rounded-xl shadow-md shadow-indigo-600/20 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Verifying Payment...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Submit Payment Proof &amp; Finalize Order &bull; ${finalTotal}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
