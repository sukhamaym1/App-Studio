# AppStudio - Official Product Website Platform

This repository contains the source code for the centralized Official Product Website Platform. 

Built with **Next.js 15 (App Router)**, **Tailwind CSS**, and **TypeScript**, it is designed to be highly scalable, modular, and easy to maintain.

## 🚀 Architecture Overview

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Components**: Radix UI Primitives + Custom Tailwind Components
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Theming**: next-themes (Dark/Light mode)

## 📁 Folder Structure

```
├── app/                  # Next.js App Router pages and layouts
│   ├── apps/             # Application listing and detail pages
│   ├── blog/             # Blog index and post pages
│   ├── downloads/        # Download center
│   ├── legal/            # Privacy policy, terms, etc.
│   └── support/          # Support and contact pages
├── components/           # Reusable UI components
│   ├── layout/           # Navbar, Footer
│   └── ui/               # Buttons, Cards
├── lib/                  # Utilities and Data
│   └── data/             # Centralized data sources (apps.ts, blog.ts)
└── public/               # Static assets (images, icons, manifest)
```

## 🛠️ How to Add a New Application

The website is data-driven. You do **not** need to create new pages or write HTML/React code to add a new application.

1. Open `lib/data/apps.ts`.
2. Add a new object to the `appsData` array following the `AppData` interface.

```typescript
{
  id: 'new-app-id',
  slug: 'new-app-url-slug',
  name: 'New App Name',
  tagline: 'Short catchy phrase',
  description: 'Detailed description of the application...',
  category: 'Productivity',
  version: '1.0.0',
  releaseDate: '2026-08-01',
  platforms: ['Android', 'Web'],
  logo: '/images/apps/new-app/logo.png', // Or remote URL
  screenshots: [
    '/images/apps/new-app/screen1.png',
  ],
  features: ['Feature 1', 'Feature 2'],
  whatsNew: 'Initial release!',
  links: [
    { type: 'playstore', url: 'https://play.google.com/...' },
    { type: 'apk', url: 'https://github.com/...' }
  ],
  systemRequirements: { os: 'Android 8.0+', storage: '20 MB' },
  isFeatured: true,
  isPopular: false
}
```
3. The app will automatically appear on the Home page (if featured/popular), the `/apps` catalog, the Download center, and generate its own dedicated page at `/apps/new-app-url-slug`.

## 📝 How to Publish a Blog Post

1. Open `lib/data/blog.ts`.
2. Add a new object to the `blogPosts` array. Content supports basic Markdown-like structure (or HTML).

## 🌐 GitHub Pages Deployment

To deploy this Next.js application to GitHub Pages:

1. Update `next.config.ts` to enable static exports:
   ```typescript
   const nextConfig = {
     output: 'export',
     images: { unoptimized: true } // Required for GitHub Pages
   }
   ```
2. Create a `.github/workflows/deploy.yml` file to use GitHub Actions for deployment (standard Next.js export workflow).
3. Push to `main`. The Action will build and deploy the static site to the `gh-pages` branch.

## 🔗 Custom Domain Configuration

1. In your domain registrar (e.g., Namecheap, Google Domains), add an `A` record pointing to GitHub's IPs, or a `CNAME` pointing to `yourusername.github.io`.
2. In your GitHub Repository Settings > Pages, enter your custom domain (e.g., `apps.yourdomain.com`).
3. GitHub will automatically provision an SSL certificate (HTTPS) for your domain.
