import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ 
      error: 'Direct filesystem saving is disabled in production environments for security. Please use the manual copy-paste fallback.' 
    }, { status: 403 });
  }
  
  try {
    const { type, data } = await req.json();
    
    if (type === 'apps') {
      const content = `// Auto-generated via Admin Panel
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
  logo: string;
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

export const appsData: AppData[] = ${JSON.stringify(data, null, 2)};

export function getAppBySlug(slug: string): AppData | undefined {
  return appsData.find(app => app.slug === slug);
}
`;
      fs.writeFileSync(path.join(process.cwd(), 'lib/data/apps.ts'), content, 'utf8');
    } else if (type === 'blog') {
      const content = `// Auto-generated via Admin Panel
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: 'Update' | 'Tutorial' | 'Announcement' | 'News' | string;
  image?: string;
}

export const blogPosts: BlogPost[] = ${JSON.stringify(data, null, 2)};

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}
`;
      fs.writeFileSync(path.join(process.cwd(), 'lib/data/blog.ts'), content, 'utf8');
    } else {
       return NextResponse.json({ error: 'Invalid data type' }, { status: 400 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
