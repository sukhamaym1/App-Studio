export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Markdown or HTML content
  date: string;
  author: string;
  category: 'Update' | 'Tutorial' | 'Announcement' | 'News';
  image?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'money-counter-v1-2-released',
    title: 'Money Counter 1.2.0 Released: New Features & Improvements',
    excerpt: 'We are excited to announce the release of Money Counter version 1.2.0, bringing support for new currency notes and a completely revamped history section.',
    content: `
# Money Counter 1.2.0 is Here!

We've been listening to your feedback, and today we're thrilled to roll out the latest update to our most popular cash management tool.

## What's New?

- **New Currency Notes**: Added support for the latest denominations introduced recently.
- **Improved History**: You can now search and filter your calculation history by date and amount.
- **Dark Mode**: A much-requested feature! Switch to dark mode for comfortable use in low-light environments.
- **Performance Boost**: The app now loads 30% faster on older devices.

Update now from the Play Store or our Download Center!
    `,
    date: '2026-07-10',
    author: 'Product Team',
    category: 'Update',
    image: 'https://picsum.photos/seed/blog-1/800/400'
  },
  {
    id: '2',
    slug: 'welcome-to-our-new-platform',
    title: 'Welcome to Our New Centralized Product Platform',
    excerpt: 'We have completely redesigned our online presence to serve you better. Discover all our apps, tools, and resources in one unified hub.',
    content: `
# A New Home for All Our Apps

Hello everyone! We are incredibly proud to launch our new Official Product Website Platform. 

As our portfolio of applications has grown—from our humble Money Counter to PDF Tools and EMI Calculators—we realized we needed a unified space to showcase our work and provide better support to our users.

## What to Expect

- **Unified Downloads**: Find the latest APKs and web versions of all our tools in the unified Download Center.
- **Better Support**: A dedicated support portal to handle your queries and feature requests.
- **Product Roadmaps**: Stay tuned as we publish what's coming next for your favorite apps.

Thank you for being part of our journey!
    `,
    date: '2026-07-01',
    author: 'Founder',
    category: 'Announcement',
    image: 'https://picsum.photos/seed/blog-2/800/400'
  }
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}
