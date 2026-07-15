import { blogPosts } from "@/lib/data/blog";
import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Updates",
  description: "Read the latest news, updates, and tutorials about our applications.",
};

export default function BlogPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-16 sm:py-24">
      <div className="mb-16">
        <h1 className="text-4xl sm:text-5xl font-space font-bold tracking-tight mb-6">Blog & Updates</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Stay up to date with the latest product releases, company news, and tutorials.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogPosts.map(post => (
          <article key={post.id} className="group flex flex-col bg-card border border-border/50 rounded-3xl overflow-hidden hover:shadow-md transition-shadow">
            {post.image && (
              <Link href={`/blog/${post.slug}`} className="relative h-64 overflow-hidden bg-muted">
                <Image 
                  src={post.image} 
                  alt={post.title} 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </Link>
            )}
            <div className="p-8 flex flex-col flex-1">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  {post.category}
                </span>
                <div className="flex items-center text-muted-foreground text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(post.date).toLocaleDateString()}
                </div>
              </div>
              <Link href={`/blog/${post.slug}`} className="block group-hover:text-primary transition-colors">
                <h2 className="text-2xl font-space font-bold mb-4 line-clamp-2">{post.title}</h2>
              </Link>
              <p className="text-muted-foreground line-clamp-3 mb-6 flex-1">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-border/40">
                <span className="text-sm font-medium">{post.author}</span>
                <Link href={`/blog/${post.slug}`} className="text-sm font-medium text-primary hover:underline">
                  Read more →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
