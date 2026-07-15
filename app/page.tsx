import { appsData } from "@/lib/data/apps";
import { AppCard } from "@/components/ui/AppCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Box, Zap, Shield, Rocket } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const featuredApps = appsData.filter(app => app.isFeatured);
  const popularApps = appsData.filter(app => app.isPopular);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pt-24 pb-32 sm:pt-32 sm:pb-40">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
        
        <div className="container mx-auto max-w-7xl px-4 relative z-10 text-center">
          <div className="inline-flex items-center rounded-full border border-border/50 bg-muted/50 px-3 py-1 text-sm mb-8 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
            Building tools for the future
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-space font-bold tracking-tight text-foreground max-w-4xl mx-auto mb-6">
            Software built for <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
              productivity & scale.
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Discover our suite of premium applications designed to simplify your workflows, manage your finances, and boost your daily productivity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" asChild className="w-full sm:w-auto rounded-full px-8">
              <Link href="/apps">Explore Applications</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto rounded-full px-8 bg-background/50 backdrop-blur-sm">
              <Link href="/downloads">Download Center</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Applications */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-space font-bold mb-4">Featured Products</h2>
              <p className="text-muted-foreground max-w-2xl">Our most powerful and widely used applications across all platforms.</p>
            </div>
            <Button variant="ghost" className="hidden md:flex" asChild>
              <Link href="/apps">View all apps <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {featuredApps.map(app => (
              <AppCard key={app.id} app={app} featured />
            ))}
          </div>
          
          <Button variant="outline" className="w-full mt-8 md:hidden" asChild>
            <Link href="/apps">View all apps</Link>
          </Button>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 border-y border-border/40 bg-background">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-space font-bold mb-6">Why Choose Our Apps?</h2>
            <p className="text-muted-foreground text-lg">We focus on building reliable, fast, and privacy-respecting software that gets the job done without unnecessary bloat.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Zap, title: "Lightning Fast", desc: "Optimized for performance on all devices, old and new." },
              { icon: Shield, title: "Privacy First", desc: "Your data stays on your device. We respect your privacy." },
              { icon: Box, title: "Offline Ready", desc: "Most of our core tools work perfectly without an internet connection." },
              { icon: Rocket, title: "Continuous Updates", desc: "Regular feature additions and bug fixes based on user feedback." },
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 rounded-2xl bg-muted/20 border border-border/30">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Apps Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-space font-bold mb-4">Trending Now</h2>
            <p className="text-muted-foreground">Applications currently loved by our community.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularApps.map(app => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5"></div>
        <div className="container mx-auto max-w-5xl px-4 relative z-10 text-center bg-card border border-border/50 rounded-3xl p-12 shadow-xl">
          <h2 className="text-3xl md:text-5xl font-space font-bold mb-6">Ready to upgrade your workflow?</h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join thousands of users who rely on our tools every day. Start exploring our application ecosystem.
          </p>
          <Button size="lg" className="rounded-full px-10 h-14 text-lg" asChild>
            <Link href="/downloads">Get Started Today</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
