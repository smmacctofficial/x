import React from 'react';

interface BrandIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const BrandIcon: React.FC<BrandIconProps> = ({ name = '', className = 'w-6 h-6' }) => {
  if (!name || typeof name !== 'string') {
    return (
      <div className={`${className} rounded bg-indigo-600 flex items-center justify-center text-white font-bold text-xs`}>
        BM
      </div>
    );
  }
  const iconLower = name.toLowerCase();

  if (iconLower.includes('gmail') || iconLower === 'google') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6Z" fill="#EA4335" />
        <path d="M22 6L12 13L2 6V18H4V8L12 14L20 8V18H22V6Z" fill="#FBBC05" fillOpacity="0.3" />
        <path d="M2 6L12 13L22 6" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 18L9 12M22 18L15 12" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (iconLower.includes('github')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    );
  }

  if (iconLower.includes('paypal')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M7 21L9.5 5H16C18.5 5 20.5 6.5 20.5 9.5C20.5 12.5 18 14.5 15.5 14.5H12L10.5 21H7Z" fill="#003087" />
        <path d="M9 18L11 5H17.5C19.5 5 21 6.5 21 9C21 11.5 19 13.5 16.5 13.5H13.5L12 21H9.5L9 18Z" fill="#0079C1" fillOpacity="0.85" />
      </svg>
    );
  }

  if (iconLower.includes('cash') || iconLower.includes('cashapp')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="6" fill="#00D632" />
        <path d="M13.5 7.5V6H10.5V7.5C8.8 7.8 7.5 9.1 7.5 10.8C7.5 12.7 9 13.5 11 14C12.5 14.4 13.5 14.9 13.5 15.8C13.5 16.6 12.7 17.2 11.5 17.2C10.2 17.2 9.2 16.6 9 15.2H7C7.2 17.5 8.7 18.7 10.5 19V20.5H13.5V19C15.2 18.7 16.5 17.4 16.5 15.7C16.5 13.7 14.9 12.9 13 12.4C11.6 12 10.5 11.5 10.5 10.7C10.5 10 11.2 9.4 12.5 9.4C13.6 9.4 14.5 9.9 14.7 11.2H16.7C16.5 9.1 15.2 7.9 13.5 7.5Z" fill="#FFFFFF" />
      </svg>
    );
  }

  if (iconLower.includes('chase')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#117ACA" />
        <path d="M6 6H18V18H6V6Z" stroke="#FFFFFF" strokeWidth="2.5" strokeLinejoin="miter" />
        <path d="M10 6L14 18M6 14L18 10" stroke="#117ACA" strokeWidth="2" />
      </svg>
    );
  }

  if (iconLower.includes('relay')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="6" fill="#1A3B34" />
        <path d="M7 16L12 7L17 16H13L12 14L11 16H7Z" fill="#12E2A3" />
        <circle cx="12" cy="10.5" r="1.5" fill="#FFFFFF" />
      </svg>
    );
  }

  if (iconLower.includes('kraken')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="6" fill="#5841D8" />
        <path d="M7 8C7 6.5 8.5 5 12 5C15.5 5 17 6.5 17 8V16C17 17.5 15.5 19 14.5 19C13.5 19 13.5 18 13.5 17V10H10.5V17C10.5 18 10.5 19 9.5 19C8.5 19 7 17.5 7 16V8Z" fill="#FFFFFF" />
      </svg>
    );
  }

  if (iconLower.includes('redotpay')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="6" fill="#E50914" />
        <circle cx="9" cy="12" r="4.5" fill="#FFFFFF" />
        <circle cx="15" cy="12" r="4.5" fill="#FFC700" fillOpacity="0.9" />
      </svg>
    );
  }

  if (iconLower.includes('outlook')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#0078D4" />
        <path d="M5 8L13 13L21 8V18C21 18.5 20.5 19 20 19H6C5.5 19 5 18.5 5 18V8Z" fill="#FFFFFF" fillOpacity="0.8" />
        <path d="M5 8C5 7.5 5.5 7 6 7H20C20.5 7 21 7.5 21 8L13 13L5 8Z" fill="#FFFFFF" />
        <circle cx="9" cy="13" r="3" fill="#004578" />
        <text x="7.5" y="15" fill="#FFFFFF" fontSize="6" fontWeight="bold" fontFamily="sans-serif">O</text>
      </svg>
    );
  }

  if (iconLower.includes('hotmail')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#D83B01" />
        <path d="M4 7H20V17H4V7Z" fill="#FFFFFF" fillOpacity="0.2" />
        <path d="M4 7L12 13L20 7" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        <path d="M4 17L9 12M20 17L15 12" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (iconLower.includes('voice') || iconLower.includes('googlevoice')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="6" fill="#34A853" />
        <path d="M7 8.5C7 7.7 7.7 7 8.5 7H15.5C16.3 7 17 7.7 17 8.5V14.5C17 15.3 16.3 16 15.5 16H10L7 19V8.5Z" fill="#FFFFFF" />
        <path d="M9.5 10.5C9.5 9.9 10 9.5 10.5 9.5H13.5C14.1 9.5 14.5 9.9 14.5 10.5V12.5C14.5 13.1 14.1 13.5 13.5 13.5H10.5C10 13.5 9.5 13.1 9.5 12.5V10.5Z" fill="#34A853" />
      </svg>
    );
  }

  if (iconLower.includes('textnow')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="6" fill="#7030A0" />
        <path d="M6 7H18V10H13.5V18H10.5V10H6V7Z" fill="#FFFFFF" />
        <circle cx="16" cy="15" r="2.5" fill="#29B6F6" />
      </svg>
    );
  }

  if (iconLower.includes('edu') || iconLower.includes('edumail')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="6" fill="#1E3A8A" />
        <path d="M12 5L4 9L12 13L20 9L12 5Z" fill="#F59E0B" />
        <path d="M7 11.5V16C7 17.5 9.2 19 12 19C14.8 19 17 17.5 17 16V11.5L12 14L7 11.5Z" fill="#FFFFFF" />
        <path d="M20 9.5V15.5" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (iconLower.includes('talkatone')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="6" fill="#00A859" />
        <path d="M8 8C8 6.9 8.9 6 10 6H14C15.1 6 16 6.9 16 8V16C16 17.1 15.1 18 14 18H10C8.9 18 8 17.1 8 16V8Z" fill="#FFFFFF" />
        <circle cx="12" cy="15.5" r="1" fill="#00A859" />
      </svg>
    );
  }

  if (iconLower.includes('textplus')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="6" fill="#FF5E00" />
        <path d="M6 12H18M12 6V18" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  if (iconLower.includes('facebook')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="#1877F2">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    );
  }

  if (iconLower.includes('instagram')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="6" fill="url(#ig-grad)" />
        <rect x="5.5" y="5.5" width="13" height="13" rx="3.5" stroke="#FFFFFF" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="3" stroke="#FFFFFF" strokeWidth="1.5" />
        <circle cx="15.5" cy="8.5" r="0.75" fill="#FFFFFF" />
        <defs>
          <radialGradient id="ig-grad" cx="20%" cy="105%" r="130%">
            <stop offset="0%" stopColor="#fdf497" />
            <stop offset="25%" stopColor="#fdf497" />
            <stop offset="45%" stopColor="#fd5949" />
            <stop offset="70%" stopColor="#d6249f" />
            <stop offset="90%" stopColor="#285AEB" />
          </radialGradient>
        </defs>
      </svg>
    );
  }

  if (iconLower.includes('twitter')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }

  if (iconLower.includes('linkedin')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="#0A66C2">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    );
  }

  if (iconLower.includes('yelp')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="6" fill="#D32323" />
        <path d="M11 6L13 6L12.5 11L11 11L11 6Z" fill="#FFFFFF" />
        <path d="M15 9L16 10.5L12 12.5L11.5 11.5L15 9Z" fill="#FFFFFF" />
        <path d="M14 16L12.5 17L11 13L12 12.5L14 16Z" fill="#FFFFFF" />
        <path d="M8 15L7 13.5L11 11.5L11.5 12.5L8 15Z" fill="#FFFFFF" />
        <path d="M8 9L9.5 8L11.5 12L10.5 12.5L8 9Z" fill="#FFFFFF" />
      </svg>
    );
  }

  if (iconLower.includes('trustpilot')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="6" fill="#00B67A" />
        <path d="M12 5L14.2 9.5L19 10.2L15.5 13.6L16.3 18.5L12 16.2L7.7 18.5L8.5 13.6L5 10.2L9.8 9.5L12 5Z" fill="#FFFFFF" />
        <path d="M14.2 9.5L12 5V16.2L16.3 18.5L15.5 13.6L19 10.2L14.2 9.5Z" fill="#005128" fillOpacity="0.2" />
      </svg>
    );
  }

  if (iconLower.includes('whatsapp')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="#25D366">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.15C10.57 20.15 9.12 19.75 7.85 19L7.55 18.82L4.43 19.64L5.26 16.59L5.07 16.28C4.24 14.97 3.8 13.46 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.05 20.15ZM16.57 14.41C16.32 14.29 15.1 13.69 14.88 13.61C14.65 13.53 14.49 13.49 14.32 13.73C14.16 13.97 13.68 14.54 13.54 14.7C13.4 14.86 13.25 14.88 13 14.76C12.75 14.64 11.95 14.38 11 13.53C10.26 12.87 9.76 12.06 9.62 11.82C9.48 11.58 9.6 11.45 9.73 11.33C9.84 11.22 9.98 11.04 10.1 10.9C10.22 10.76 10.26 10.66 10.34 10.5C10.42 10.34 10.38 10.2 10.32 10.08C10.26 9.96 9.77 8.76 9.57 8.27C9.37 7.79 9.17 7.86 9.02 7.85C8.88 7.84 8.72 7.84 8.56 7.84C8.4 7.84 8.14 7.9 7.91 8.15C7.69 8.4 7.06 8.99 7.06 10.2C7.06 11.41 7.94 12.58 8.06 12.74C8.18 12.9 9.8 15.39 12.28 16.46C12.87 16.71 13.33 16.87 13.69 16.98C14.28 17.17 14.82 17.14 15.25 17.08C15.73 17.01 16.72 16.48 16.92 15.91C17.12 15.34 17.12 14.86 17.06 14.76C17 14.64 16.82 14.53 16.57 14.41Z" />
      </svg>
    );
  }

  if (iconLower.includes('telegram')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="#229ED9">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
      </svg>
    );
  }

  if (iconLower.includes('btc') || iconLower.includes('bitcoin')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="#F7931A">
        <circle cx="12" cy="12" r="11" fill="#F7931A" />
        <path d="M15.5 10.2C15.8 8.8 14.8 8 13.4 7.6L13.8 6.1L12.9 5.9L12.5 7.4C12.3 7.3 12 7.3 11.8 7.2L12.2 5.7L11.3 5.5L10.9 7C10.7 7 10.5 6.9 10.3 6.9L9.1 6.6L8.8 7.6C8.8 7.6 9.4 7.7 9.4 7.8C9.7 7.9 9.8 8.1 9.7 8.3L8.8 12.1L8.3 14.1C8.2 14.3 8 14.4 7.8 14.3C7.8 14.4 7.2 14.2 7.2 14.2L6.7 15.3L7.9 15.6C8.1 15.7 8.4 15.8 8.6 15.8L8.2 17.4L9.1 17.6L9.5 16.1C9.7 16.2 10 16.2 10.2 16.3L9.8 17.8L10.7 18L11.1 16.5C13 16.8 14.4 16.6 14.9 14.9C15.3 13.5 14.9 12.7 13.8 12.2C14.6 11.9 15.2 11.2 15.5 10.2ZM13.3 13.8C13 15.2 10.8 14.4 10.1 14.2L10.7 11.7C11.4 11.9 13.6 12.4 13.3 13.8ZM13.8 10.1C13.5 11.3 11.6 10.7 11 10.5L11.5 8.4C12.1 8.6 14 9 13.8 10.1Z" fill="#FFFFFF" />
      </svg>
    );
  }

  if (iconLower.includes('usdt') || iconLower.includes('tether')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="#26A17B">
        <circle cx="12" cy="12" r="11" fill="#26A17B" />
        <path d="M13.2 12.7C13.1 12.7 12.6 12.8 12 12.8C11.4 12.8 10.8 12.7 10.7 12.7C8.7 12.6 7.1 12.1 7.1 11.5C7.1 10.9 8.7 10.4 10.7 10.3V12.1C10.9 12.1 11.4 12.2 12 12.2C12.6 12.2 13 12.1 13.2 12.1V10.3C15.2 10.4 16.8 10.9 16.8 11.5C16.8 12.1 15.2 12.6 13.2 12.7ZM13.2 9.8V8.4H17.4V6.5H6.6V8.4H10.7V9.8C8.2 9.9 6.2 10.6 6.2 11.5C6.2 12.3 8.1 13 10.7 13.2V17.5H13.2V13.2C15.8 13 17.7 12.3 17.7 11.5C17.7 10.6 15.7 9.9 13.2 9.8Z" fill="#FFFFFF" />
      </svg>
    );
  }

  if (iconLower.includes('eth') || iconLower.includes('ethereum')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="#627EEA">
        <circle cx="12" cy="12" r="11" fill="#627EEA" />
        <path d="M12 4L6.5 13L12 16.3L17.5 13L12 4Z" fill="#FFFFFF" fillOpacity="0.8" />
        <path d="M12 16.3L6.5 13L12 20L17.5 13L12 16.3Z" fill="#FFFFFF" />
        <path d="M12 4V16.3L17.5 13L12 4Z" fill="#FFFFFF" fillOpacity="0.4" />
      </svg>
    );
  }

  if (iconLower.includes('ltc') || iconLower.includes('litecoin')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="#345D9D">
        <circle cx="12" cy="12" r="11" fill="#345D9D" />
        <path d="M9.5 6H11.5L9.8 13.5H13.5L13 15.5H7.5L9.5 6Z" fill="#FFFFFF" />
        <path d="M8 11.5L12 10L11.5 11.5L7.5 13L8 11.5Z" fill="#FFFFFF" />
      </svg>
    );
  }

  if (iconLower.includes('sol') || iconLower.includes('solana')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="11" fill="#000000" />
        <path d="M7 16.5L8.5 15H17L15.5 16.5H7Z" fill="#00FFA3" />
        <path d="M17 12L15.5 13.5H7L8.5 12H17Z" fill="#00E0FF" />
        <path d="M7 7.5L8.5 9H17L15.5 7.5H7Z" fill="#DC1FFF" />
      </svg>
    );
  }

  // Generic fallback badge icon
  return (
    <div className={`${className} rounded bg-indigo-600 flex items-center justify-center text-white font-bold text-xs`}>
      {name.slice(0, 2).toUpperCase()}
    </div>
  );
};
