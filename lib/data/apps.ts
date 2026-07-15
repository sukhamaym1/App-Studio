export interface AppLink {
  type: 'playstore' | 'apk' | 'github' | 'web';
  url: string;
}

export interface AppData {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  version: string;
  releaseDate: string;
  platforms: string[];
  logo: string; // URL or path
  screenshots: string[];
  features: string[];
  whatsNew: string;
  links: AppLink[];
  systemRequirements: {
    os: string;
    storage: string;
    ram?: string;
  };
  isFeatured?: boolean;
  isPopular?: boolean;
}

export const appsData: AppData[] = [
  {
    id: 'money-counter',
    slug: 'money-counter',
    name: 'Money Counter & Cash Calculator',
    tagline: 'Easily calculate and manage your cash.',
    description: 'A powerful, easy-to-use tool for counting currency notes and coins. Ideal for retail business owners, cashiers, and anyone who needs to quickly tally cash amounts at the end of the day. Features history tracking, multi-currency support (upcoming), and printable reports.',
    category: 'Finance',
    version: '1.2.0',
    releaseDate: '2025-10-15',
    platforms: ['Android', 'Web'],
    logo: 'https://picsum.photos/seed/money/200/200',
    screenshots: [
      'https://picsum.photos/seed/money-1/400/800',
      'https://picsum.photos/seed/money-2/400/800',
      'https://picsum.photos/seed/money-3/400/800'
    ],
    features: [
      'Fast and accurate cash tallying',
      'Save calculation history',
      'Share results via WhatsApp or Email',
      'Clean, ad-free interface',
      'Works completely offline'
    ],
    whatsNew: 'Added support for new currency notes. Improved performance and bug fixes.',
    links: [
      { type: 'playstore', url: '#' },
      { type: 'apk', url: '#' },
      { type: 'web', url: '#' }
    ],
    systemRequirements: {
      os: 'Android 6.0 and up, Modern Web Browser',
      storage: '15 MB',
      ram: '1 GB'
    },
    isFeatured: true,
    isPopular: true
  },
  {
    id: 'pdf-tools',
    slug: 'pdf-tools',
    name: 'PDF Tools Pro',
    tagline: 'Merge, split, and compress PDFs on the go.',
    description: 'The ultimate utility for all your PDF needs. Merge multiple documents, split large files, compress for email sharing, and convert images to PDF instantly without requiring an internet connection.',
    category: 'Productivity',
    version: '2.0.1',
    releaseDate: '2026-02-10',
    platforms: ['Android', 'Windows'],
    logo: 'https://picsum.photos/seed/pdf/200/200',
    screenshots: [
      'https://picsum.photos/seed/pdf-1/400/800',
      'https://picsum.photos/seed/pdf-2/400/800'
    ],
    features: [
      'Merge and Split PDFs',
      'Compress PDF file size',
      'Image to PDF conversion',
      'Password protect documents',
      'Extract text from PDF'
    ],
    whatsNew: 'Added OCR support for extracting text from scanned PDFs. UI improvements.',
    links: [
      { type: 'playstore', url: '#' },
      { type: 'apk', url: '#' }
    ],
    systemRequirements: {
      os: 'Android 8.0 and up',
      storage: '30 MB',
      ram: '2 GB'
    },
    isFeatured: true,
    isPopular: false
  },
  {
    id: 'emi-calculator',
    slug: 'emi-calculator',
    name: 'EMI Calculator',
    tagline: 'Plan your loans and mortgages with precision.',
    description: 'Calculate your Equated Monthly Installments (EMI) for home loans, car loans, and personal loans. View detailed amortization schedules and compare different loan options to make informed financial decisions.',
    category: 'Finance',
    version: '1.0.5',
    releaseDate: '2026-05-20',
    platforms: ['Android', 'Web'],
    logo: 'https://picsum.photos/seed/emi/200/200',
    screenshots: [
      'https://picsum.photos/seed/emi-1/400/800'
    ],
    features: [
      'Quick EMI calculation',
      'Amortization schedule generation',
      'Loan comparison tool',
      'Interest rate charts',
      'Export to PDF'
    ],
    whatsNew: 'Initial release. Enjoy fast and accurate EMI calculations.',
    links: [
      { type: 'playstore', url: '#' },
      { type: 'web', url: '#' }
    ],
    systemRequirements: {
      os: 'Android 5.0 and up',
      storage: '10 MB'
    },
    isFeatured: false,
    isPopular: true
  }
];

export function getAppBySlug(slug: string): AppData | undefined {
  return appsData.find(app => app.slug === slug);
}
