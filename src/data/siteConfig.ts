import { CryptoWallet } from '../types';

export const SITE_CONFIG = {
  domain: 'BuyMailAccounts.com',
  brandName: 'BuyMailAccounts',
  tagline: 'Premium Verified Email, GitHub, Bank & Social Media Accounts Marketplace',
  telegramUsername: 'SmmAcct',
  telegramLink: 'https://t.me/SmmAcct',
  whatsappNumber: '+1 (312) 678-0720',
  whatsappCleanNumber: '13126780720',
  whatsappDisplay: '+1 (312) 678-0720',
  whatsappLink: 'https://wa.me/13126780720',
  supportEmail: 'smmacctofficial@gmail.com',
  workingHours: '24/7 Instant Support & Delivery',
  guaranteeHours: '48 Hours Replacement Warranty',
};

export const CRYPTO_WALLETS: CryptoWallet[] = [
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    network: 'Bitcoin Core (Mainnet)',
    address: '12a6fNaGq2hutbvDXsaTEGL91HRE8UsUuG',
    icon: 'btc',
    color: '#F7931A',
  },
  {
    name: 'Litecoin',
    symbol: 'LTC',
    network: 'Litecoin Mainnet (Low Fee & Fast)',
    address: 'LQaZiBG2kJ5EPBJxb3WbgXK9wHZAcWzSFh',
    icon: 'ltc',
    color: '#345D9D',
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    network: 'ERC-20 (Ethereum Mainnet)',
    address: '0xa3e28c3c9492d0cc13271739ef02f53a7f0af1fb',
    icon: 'eth',
    color: '#627EEA',
  },
  {
    name: 'Tether USD',
    symbol: 'USDT (TRC20)',
    network: 'TRON TRC-20 (Lowest Fees)',
    address: 'TBexpvCXg9LzCmPceJifSzPvmGMri18XCz',
    icon: 'usdt',
    color: '#26A17B',
  },
  {
    name: 'Solana',
    symbol: 'SOL',
    network: 'Solana Mainnet (Instant)',
    address: 'GwTaDn3QqDUVB3fsbPK7qQySaK2fsZYbS4ERzwTMTYGV',
    icon: 'sol',
    color: '#9945FF',
  },
];
