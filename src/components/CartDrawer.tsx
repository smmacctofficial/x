import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Send, PhoneCall, Tag } from 'lucide-react';
import { CartItem } from '../types';
import { SITE_CONFIG } from '../data/siteConfig';
import { BrandIcon } from './BrandIcon';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (serviceId: string, tierId: string, quantity: number) => void;
  onRemoveItem: (serviceId: string, tierId: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: (discountAmount: number, couponCode?: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [couponMessage, setCouponMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === 'WELCOME10') {
      const discount = Math.round(subtotal * 0.1);
      setAppliedDiscount(discount);
      setCouponMessage('10% Welcome Discount Applied!');
    } else if (code === 'CRYPTO5') {
      const discount = Math.round(subtotal * 0.05);
      setAppliedDiscount(discount);
      setCouponMessage('5% Crypto Discount Applied!');
    } else if (code === 'BULK20' && subtotal >= 100) {
      const discount = 20;
      setAppliedDiscount(discount);
      setCouponMessage('$20 Bulk Discount Applied!');
    } else {
      setAppliedDiscount(0);
      setCouponMessage('Invalid code. Try: WELCOME10 or CRYPTO5');
    }
  };

  const finalTotal = Math.max(0, subtotal - appliedDiscount);

  // Telegram cart message
  const telegramSummary = encodeURIComponent(
    `Hello! I want to order my cart on BuyMailAccounts.com:\n` +
      cartItems.map((i) => `• ${i.serviceTitle} (${i.tierName}) x${i.quantity} = $${i.price * i.quantity}`).join('\n') +
      `\nTotal: $${finalTotal}\nPlease provide payment confirmation.`
  );
  const telegramCartLink = `https://t.me/${SITE_CONFIG.telegramUsername}?text=${telegramSummary}`;

  // WhatsApp cart message
  const whatsappSummary = encodeURIComponent(
    `Hello! I want to order my cart on BuyMailAccounts.com:\n` +
      cartItems.map((i) => `• ${i.serviceTitle} (${i.tierName}) x${i.quantity} = $${i.price * i.quantity}`).join('\n') +
      `\nTotal: $${finalTotal}\nPlease confirm order.`
  );
  const whatsappCartLink = `https://wa.me/${SITE_CONFIG.whatsappCleanNumber}?text=${whatsappSummary}`;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-slate-200 text-slate-900 flex flex-col justify-between shadow-2xl">
          {/* Cart Header */}
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900">Your Shopping Cart</h3>
                <p className="text-xs text-slate-500 font-medium">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} selected
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items Scroll Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {cartItems.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-slate-900">Your cart is empty</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Browse our verified USA Gmail, PVA, Aged GitHub, and bank accounts to get started.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-xs"
                >
                  Explore Services
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={`${item.serviceId}-${item.tierId}`}
                  className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 p-1 flex items-center justify-center shrink-0">
                        <BrandIcon name={item.iconType} className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1">
                          {item.serviceTitle}
                        </h4>
                        <p className="text-[11px] text-indigo-700 font-bold">{item.tierName}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.serviceId, item.tierId)}
                      className="text-slate-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-xs">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-0.5 shadow-2xs">
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.serviceId, item.tierId, Math.max(1, item.quantity - 1))
                        }
                        className="w-6 h-6 rounded flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center font-bold text-slate-900 text-xs">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.serviceId, item.tierId, item.quantity + 1)}
                        className="w-6 h-6 rounded flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-extrabold text-slate-900">${item.price * item.quantity}</span>
                      <span className="block text-[10px] text-slate-500 font-medium">${item.price} each</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer: Discounts, Total, Checkout */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-4">
              {/* Coupon Form */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Promo code (e.g. WELCOME10)"
                      className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 uppercase focus:outline-none focus:border-indigo-600 shadow-2xs font-semibold"
                    />
                  </div>
                  <button
                    onClick={handleApplyCoupon}
                    className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-xs font-bold text-slate-800 rounded-xl transition-all cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {couponMessage && (
                  <p
                    className={`text-[11px] font-bold ${
                      appliedDiscount > 0 ? 'text-emerald-700' : 'text-rose-600'
                    }`}
                  >
                    {couponMessage}
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600 pt-1 font-medium">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-slate-900 font-bold">${subtotal}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Discount</span>
                    <span>-${appliedDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-700">
                  <span>Estimated Delivery Time</span>
                  <span className="text-emerald-700 font-bold">10-30 Mins (Instant)</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Amount</span>
                  <span className="text-xl text-indigo-600 font-black">${finalTotal}</span>
                </div>
              </div>

              {/* Checkout Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => onProceedToCheckout(appliedDiscount, couponCode)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm rounded-xl shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
                >
                  <span>Proceed to Crypto Checkout &bull; ${finalTotal}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={telegramCartLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2 px-3 bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 rounded-xl text-xs font-bold transition-all text-center"
                  >
                    <Send className="w-3.5 h-3.5 text-sky-600" />
                    <span>Telegram Cart</span>
                  </a>

                  <a
                    href={whatsappCartLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold transition-all text-center"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp Cart</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
