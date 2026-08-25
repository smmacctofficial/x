import { ServiceItem, CategoryType } from '../types';
import { gmailServices } from './categories/gmailServices';
import { githubServices } from './categories/githubServices';
import { bankServices } from './categories/bankServices';
import { otherServices } from './categories/otherServices';

export const allServices: ServiceItem[] = [
  ...gmailServices,
  ...githubServices,
  ...bankServices,
  ...otherServices,
];

export const CATEGORIES_META = [
  {
    id: 'all' as CategoryType,
    name: 'All Services',
    count: allServices.length,
    description: 'Browse all 35+ verified email, GitHub, banking, and social accounts',
    icon: 'grid',
  },
  {
    id: 'other' as CategoryType,
    name: 'Other & Social Media',
    count: otherServices.length,
    description: 'Outlook, Hotmail, Google Voice, Edu Mail, Facebook, IG, X, LinkedIn, WhatsApp & Telegram',
    icon: 'other',
  },
  {
    id: 'gmail' as CategoryType,
    name: 'Gmail Accounts',
    count: gmailServices.length,
    description: 'USA PVA, Aged, Google Ads Ready, Review Stick & Fresh Bulk Gmails',
    icon: 'gmail',
  },
  {
    id: 'github' as CategoryType,
    name: 'GitHub Accounts',
    count: githubServices.length,
    description: 'New, Aged, Active, Followers, Commit History, Bulk & LEGION/AUTHENA',
    icon: 'github',
  },
  {
    id: 'bank' as CategoryType,
    name: 'Bank & Crypto',
    count: bankServices.length,
    description: 'Verified PayPal, Cash App BTC, Chase Bank, Relay Bank, Kraken & RedotPay',
    icon: 'bank',
  },
];

export function getServiceByIdOrSlug(idOrSlug: string): ServiceItem | undefined {
  return allServices.find((s) => s.id === idOrSlug || s.slug === idOrSlug);
}

export function getServicesByCategory(category: CategoryType): ServiceItem[] {
  if (category === 'all') return allServices;
  return allServices.filter((s) => s.category === category);
}

export function searchServices(query: string, category: CategoryType = 'all'): ServiceItem[] {
  const cleanQuery = query.toLowerCase().trim();
  let list = category === 'all' ? allServices : allServices.filter((s) => s.category === category);

  if (!cleanQuery) return list;

  return list.filter((s) => {
    return (
      s.title.toLowerCase().includes(cleanQuery) ||
      s.seoDescription.toLowerCase().includes(cleanQuery) ||
      s.categoryName.toLowerCase().includes(cleanQuery) ||
      s.metaKeywords.some((k) => k.toLowerCase().includes(cleanQuery)) ||
      s.features.some((f) => f.toLowerCase().includes(cleanQuery))
    );
  });
}
