import { getAppBySlug, appsData } from "@/lib/data/apps";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Download, CheckCircle2, Monitor, Smartphone, Github, Play, ArrowLeft } from "lucide-react";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = await params;
  const app = getAppBySlug(p.slug);
  if (!app) return { title: 'App Not Found' };
  
  return {
    title: app.name,
    description: app.description,
  };
}

export async function generateStaticParams() {
  return appsData.map((app) => ({
    slug: app.slug,
  }));
}

export default async function AppDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = await params;
  const app = getAppBySlug(p.slug);
  
  if (!app) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-background pb-24">
      {/* App Hero */}
      <section className="bg-muted/20 border-b border-border/40 pt-12 pb-16">
        <div className="container mx-auto max-w-5xl px-4">
          <Link href="/apps" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to applications
          </Link>
          
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
            <div className="relative w-32 h-32 md:w-48 md:h-48 shrink-0 rounded-3xl overflow-hidden shadow-xl border border-border/10 bg-background">
              <Image 
                src={app.logo} 
                alt={`${app.name} logo`} 
                fill 
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  {app.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm font-medium border border-border/50">
                  Version {app.version}
                </span>
                <div className="flex items-center gap-2 text-muted-foreground ml-auto">
                  {app.platforms.includes('Android') && <Smartphone className="w-5 h-5" />}
                  {app.platforms.includes('Windows') && <Monitor className="w-5 h-5" />}
                  {app.platforms.includes('Web') && <span className="font-medium text-sm">Web</span>}
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-space font-bold mb-4">{app.name}</h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl">
                {app.tagline}
              </p>
              
              <div className="flex flex-wrap gap-4">
                {app.links.find(l => l.type === 'playstore') && (
                  <Button size="lg" className="rounded-xl font-medium" asChild>
                    <Link href={app.links.find(l => l.type === 'playstore')?.url || '#'}>
                      <Play className="w-5 h-5 mr-2" /> Google Play
                    </Link>
                  </Button>
                )}
                {app.links.find(l => l.type === 'apk') && (
                  <Button size="lg" variant="outline" className="rounded-xl font-medium" asChild>
                    <Link href={app.links.find(l => l.type === 'apk')?.url || '#'}>
                      <Download className="w-5 h-5 mr-2" /> Download APK
                    </Link>
                  </Button>
                )}
                {app.links.find(l => l.type === 'github') && (
                  <Button size="lg" variant="ghost" className="rounded-xl font-medium" asChild>
                    <Link href={app.links.find(l => l.type === 'github')?.url || '#'}>
                      <Github className="w-5 h-5 mr-2" /> Source Code
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-5xl px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-16">
          {/* Description */}
          <section>
            <h2 className="text-2xl font-bold mb-6">About this app</h2>
            <div className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground text-lg leading-relaxed">
              <p>{app.description}</p>
            </div>
          </section>

          {/* Screenshots */}
          {app.screenshots.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6">Screenshots</h2>
              <div className="flex overflow-x-auto pb-8 gap-6 snap-x">
                {app.screenshots.map((src, idx) => (
                  <div key={idx} className="relative w-64 h-[500px] shrink-0 snap-center rounded-2xl overflow-hidden shadow-lg border border-border/50">
                    <Image 
                      src={src} 
                      alt={`Screenshot ${idx + 1}`} 
                      fill 
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Features */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Key Features</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {app.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border/50">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="font-medium text-card-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* What's New */}
          <section className="p-8 rounded-2xl bg-primary/5 border border-primary/10">
            <h2 className="text-2xl font-bold mb-4">What's New in {app.version}</h2>
            <p className="text-muted-foreground leading-relaxed">{app.whatsNew}</p>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-8">
          <div className="p-6 rounded-2xl border border-border/50 bg-card space-y-6">
            <h3 className="font-bold text-lg">Information</h3>
            
            <div className="space-y-4 text-sm">
              <div className="flex flex-col gap-1 pb-4 border-b border-border/50">
                <span className="text-muted-foreground">Version</span>
                <span className="font-medium">{app.version}</span>
              </div>
              <div className="flex flex-col gap-1 pb-4 border-b border-border/50">
                <span className="text-muted-foreground">Updated</span>
                <span className="font-medium">{new Date(app.releaseDate).toLocaleDateString()}</span>
              </div>
              <div className="flex flex-col gap-1 pb-4 border-b border-border/50">
                <span className="text-muted-foreground">Category</span>
                <span className="font-medium">{app.category}</span>
              </div>
              <div className="flex flex-col gap-1 pb-4 border-b border-border/50">
                <span className="text-muted-foreground">Requirements</span>
                <span className="font-medium">{app.systemRequirements.os}</span>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <Link href="/support" className="text-sm text-primary hover:underline block">Report an issue</Link>
              <Link href="/legal/privacy-policy" className="text-sm text-primary hover:underline block">Privacy Policy</Link>
              <Link href="/legal/terms" className="text-sm text-primary hover:underline block">Terms of Service</Link>
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}
