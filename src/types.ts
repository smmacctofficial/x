export type CategoryType = 'all' | 'gmail' | 'github' | 'bank' | 'other';

export interface PricingTier {
  id: string;
  name: string;
  quantity: number | string;
  price: number;
  unitPrice?: string;
  badge?: string;
  popular?: boolean;
  notes?: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceInternalLink {
  title: string;
  href: string;
  description: string;
}

export interface ServiceExternalLink {
  title: string;
  url: string;
  authority: string;
  reason: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: 'gmail' | 'github' | 'bank' | 'other';
  categoryName: string;
  iconType: string;
  shortTagline: string;
  startingPrice: number;
  seoDescription: string;
  features: string[];
  pricingTiers: PricingTier[];
  primaryKeyword?: string;
  secondaryKeywords?: string[];
  tableOfContents?: { id: string; title: string }[];
  longContent: {
    overview: string;
    whyBuy: string[];
    useCases: string[];
    setupGuide: string[];
    securityTips: string[];
    comparisonPoints?: { label: string; ourService: string; cheapBots: string }[];
    technicalDetails?: { heading: string; content: string }[];
    summary: string;
  };
  internalLinks?: ServiceInternalLink[];
  externalLinks?: ServiceExternalLink[];
  faqs: ServiceFAQ[];
  relatedServiceIds: string[];
  metaKeywords: string[];
  deliveryTime: string;
  stockStatus: 'In Stock' | 'Instant Delivery' | 'Limited Stock';
  rating: number;
  reviewsCount: number;
}

export interface CartItem {
  serviceId: string;
  serviceTitle: string;
  tierId: string;
  tierName: string;
  quantity: number;
  price: number;
  totalPrice: number;
  iconType: string;
  category: string;
}

export interface CryptoWallet {
  name: string;
  symbol: string;
  network: string;
  address: string;
  memo?: string;
  icon: string;
  color: string;
}

export interface OrderSubmission {
  orderId: string;
  items: CartItem[];
  totalAmount: number;
  customerEmail: string;
  customerTelegram?: string;
  customerWhatsApp?: string;
  paymentCrypto: string;
  transactionHash: string;
  notes?: string;
  status: 'Pending Verification' | 'Processing' | 'Delivered' | 'Contact Needed';
  createdAt: string;
}
