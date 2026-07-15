# Deployment Guide: GitHub Pages

This guide explains how to export this AppStudio platform, connect it to GitHub, and automatically deploy it to GitHub Pages using GitHub Actions.

## Step 1: Export the Project and Push to GitHub

1. In Google AI Studio, open the **Settings menu** (the gear icon, usually in the top right or bottom left) and select **Export as ZIP** (or Export to GitHub if available).
2. Extract the ZIP file to a folder on your computer.
3. Open your terminal, navigate to the extracted folder, and initialize a Git repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit from AI Studio"
   ```
4. Go to [GitHub](https://github.com/new) and create a new repository.
5. Link your local repository to GitHub and push your code:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
   git branch -M main
   git push -u origin main
   ```

## Step 2: Configure `next.config.ts` for Static Export

GitHub Pages is a static hosting service, so Next.js needs to be configured to output static HTML/CSS/JS. 

Before you push your changes (or directly in GitHub), make sure you update your `next.config.ts` file to include `output: 'export'` and `images: { unoptimized: true }`:

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Required for GitHub Pages static export
  output: 'export',
  
  // Next.js Image Optimization doesn't work on standard static exports without a custom loader.
  // We must disable it to allow images to load correctly on GitHub Pages.
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  
  // IMPORTANT: If you are NOT using a custom domain and your URL looks like
  // https://username.github.io/repo-name/, uncomment the line below and change 'repo-name':
  // basePath: '/repo-name',
};

export default nextConfig;
```

## Step 3: Configure GitHub Actions for Automated Deployment

Instead of manually building and uploading, we will use a GitHub Action to automatically build and deploy your site every time you push to the `main` branch.

1. In your project root, create a new folder path: `.github/workflows/`.
2. Inside that folder, create a file named `deploy.yml`.
3. Add the following standard Next.js deployment configuration to the file:

```yaml
name: Deploy Next.js site to Pages

on:
  # Runs on pushes targeting the default branch
  push:
    branches: ["main"]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow only one concurrent deployment
concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  # Build job
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Detect package manager
        id: detect-package-manager
        run: |
          if [ -f "${{ github.workspace }}/yarn.lock" ]; then
            echo "manager=yarn" >> $GITHUB_OUTPUT
            echo "command=install" >> $GITHUB_OUTPUT
            echo "runner=yarn" >> $GITHUB_OUTPUT
            exit 0
          elif [ -f "${{ github.workspace }}/package.json" ]; then
            echo "manager=npm" >> $GITHUB_OUTPUT
            echo "command=install" >> $GITHUB_OUTPUT
            echo "runner=npx --no-install" >> $GITHUB_OUTPUT
            exit 0
          else
            echo "Unable to determine package manager"
            exit 1
          fi
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
      - name: Setup Pages
        uses: actions/configure-pages@v5
        with:
          # Automatically inject basePath in your next.config.js and disable server-side image optimization
          static_site_generator: next
      - name: Restore cache
        uses: actions/cache@v4
        with:
          path: |
            .next/cache
          key: ${{ runner.os }}-nextjs-${{ hashFiles('**/package-lock.json', '**/yarn.lock') }}-${{ hashFiles('**.[jt]s', '**.[jt]sx') }}
          restore-keys: |
            ${{ runner.os }}-nextjs-${{ hashFiles('**/package-lock.json', '**/yarn.lock') }}-
      - name: Install dependencies
        run: ${{ steps.detect-package-manager.outputs.manager }} ${{ steps.detect-package-manager.outputs.command }}
      - name: Build with Next.js
        run: ${{ steps.detect-package-manager.outputs.runner }} next build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  # Deployment job
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## Step 4: Enable GitHub Pages in your Repository

1. Go to your repository on GitHub.
2. Click on **Settings** > **Pages** (in the left sidebar).
3. Under **Build and deployment**, find the **Source** dropdown.
4. Change it from "Deploy from a branch" to **GitHub Actions**.
5. *Optional*: If you have a custom domain, scroll down to **Custom domain** and enter it (e.g., `apps.yourcompany.com`). Make sure to also set up the `CNAME` or `A` records with your DNS provider.

Once configured, your site will automatically deploy every time you push changes to the `main` branch. You can watch the deployment progress in the **Actions** tab on your GitHub repository!
