import { getBlogPostBySlug, blogPosts } from "@/lib/data/blog";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowLeft, User } from "lucide-react";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = await params;
  const post = getBlogPostBySlug(p.slug);
  if (!post) return { title: 'Post Not Found' };
  
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = await params;
  const post = getBlogPostBySlug(p.slug);
  
  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-background pb-24">
      {post.image && (
        <div className="w-full h-[40vh] md:h-[60vh] relative bg-muted">
          <Image 
            src={post.image} 
            alt={post.title} 
            fill 
            className="object-cover"
            referrerPolicy="no-referrer"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"></div>
        </div>
      )}
      
      <div className="container mx-auto max-w-3xl px-4 relative -mt-32 z-10">
        <div className="bg-card border border-border/50 rounded-3xl p-8 md:p-12 shadow-xl mb-12">
          <Link href="/blog" className="inline-flex items-center text-sm text-primary hover:underline mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to blog
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium">
              {post.category}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-space font-bold leading-tight mb-8">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-6 text-muted-foreground text-sm py-6 border-y border-border/40">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              {post.author}
            </div>
          </div>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
          {/* Simple markdown rendering simulation - ideally we'd use react-markdown here */}
          <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n\n/g, '</p><p>').replace(/^/, '<p>').replace(/$/, '</p>').replace(/# (.*?)</g, '<h1>$1</h1><').replace(/## (.*?)</g, '<h2>$1</h2><') }} />
        </div>
      </div>
    </article>
  );
}
