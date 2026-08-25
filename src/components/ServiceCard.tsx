import React, { useState } from 'react';
import { ArrowRight, ShoppingCart, Check, Star, Zap, ShieldCheck } from 'lucide-react';
import { ServiceItem } from '../types';
import { BrandIcon } from './BrandIcon';

interface ServiceCardProps {
  service: ServiceItem;
  onSelectService: (serviceId: string) => void;
  onAddToCart: (service: ServiceItem, tierId: string) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onSelectService,
  onAddToCart,
}) => {
  const [selectedTierId, setSelectedTierId] = useState<string>(
    service.pricingTiers.find((t) => t.popular)?.id || service.pricingTiers[0]?.id || ''
  );
  const [addedAnimation, setAddedAnimation] = useState(false);

  const selectedTier = service.pricingTiers.find((t) => t.id === selectedTierId) || service.pricingTiers[0];

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedTier) {
      onAddToCart(service, selectedTier.id);
      setAddedAnimation(true);
      setTimeout(() => setAddedAnimation(false), 1500);
    }
  };

  return (
    <div
      onClick={() => onSelectService(service.id)}
      className="group relative bg-white hover:bg-slate-50/60 border border-slate-200 hover:border-indigo-400 rounded-2xl p-5 transition-all duration-200 flex flex-col justify-between hover:shadow-lg hover:shadow-indigo-100/50 cursor-pointer shadow-xs"
    >
      <div>
        {/* Header: Icon, Category Badge & Stock */}
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center p-2.5 shadow-2xs group-hover:scale-105 transition-transform">
            <BrandIcon name={service.iconType} className="w-full h-full object-contain" />
          </div>

          <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase tracking-wider">
              {service.categoryName}
            </span>
            <div className="flex items-center gap-1 text-[11px] text-amber-600 font-semibold">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              <span>{service.rating}</span>
              <span className="text-slate-400">({service.reviewsCount})</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1 mb-1.5">
          {service.title}
        </h3>

        {/* Short Tagline / Hook */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4 font-normal">
          {service.shortTagline}
        </p>

        {/* Key Features (Top 3) */}
        <div className="space-y-1.5 mb-4 pb-4 border-b border-slate-100">
          {service.features.slice(0, 3).map((feat, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="truncate">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        {/* Tier Selector Chips */}
        <div className="mb-3 space-y-1.5" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span>Select Package:</span>
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <Zap className="w-3 h-3 text-emerald-600" /> {service.deliveryTime}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-24 overflow-y-auto pr-0.5">
            {service.pricingTiers.slice(0, 3).map((tier) => {
              const isSelected = selectedTierId === tier.id;
              return (
                <button
                  key={tier.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTierId(tier.id);
                  }}
                  className={`p-1.5 rounded-lg text-left text-[11px] transition-all flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-50 border border-indigo-500 text-indigo-900 font-bold shadow-2xs'
                      : 'bg-slate-50 border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <span className="truncate block text-[10px] text-slate-500 font-medium">{tier.name.split(' ')[0]} {tier.name.split(' ')[1] || ''}</span>
                  <span className="text-indigo-600 font-extrabold">${tier.price}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Pricing Summary & Action Buttons */}
        <div className="pt-2.5 flex items-center justify-between gap-2 border-t border-slate-100">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">Total</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-extrabold text-slate-900">${selectedTier?.price || service.startingPrice}</span>
              {selectedTier?.unitPrice && (
                <span className="text-[10px] text-slate-500 font-medium">({selectedTier.unitPrice})</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={handleAdd}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                addedAnimation
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-600/20'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectService(service.id);
              }}
              className="p-2 text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
              title="View full details and SEO guide"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
