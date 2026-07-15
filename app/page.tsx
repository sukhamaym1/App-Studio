import { appsData } from "@/lib/data/apps";
import { AppCard } from "@/components/ui/AppCard";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/ui/HeroSection";
import Link from "next/link";
import { ArrowRight, Box, Zap, Shield, Rocket } from "lucide-react";

export default function Home() {
  const featuredApps = appsData.filter(app => app.isFeatured);
  const popularApps = appsData.filter(app => app.isPopular);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <HeroSection />

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
