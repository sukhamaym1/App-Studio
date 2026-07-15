import { appsData } from "@/lib/data/apps";
import { Button } from "@/components/ui/button";
import { Download, Monitor, Smartphone, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download Center",
  description: "Download the latest versions of our applications for Android, Windows, and Web.",
};

export default function DownloadsPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-16 sm:py-24">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Download className="w-8 h-8" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-space font-bold tracking-tight mb-6">Download Center</h1>
        <p className="text-xl text-muted-foreground">
          Get the latest stable releases of our software. Choose your platform and start downloading instantly.
        </p>
      </div>

      <div className="space-y-8">
        {appsData.map(app => {
          const hasDownloads = app.links.some(l => ['playstore', 'apk'].includes(l.type));
          if (!hasDownloads) return null;

          return (
            <div key={app.id} className="flex flex-col md:flex-row p-6 sm:p-8 rounded-3xl border border-border/50 bg-card shadow-sm gap-8 items-start md:items-center">
              <div className="flex items-center gap-6 flex-1">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 bg-muted/30 border border-border/30">
                  <Image src={app.logo} alt={app.name} fill className="object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">{app.name}</h2>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground bg-muted px-2 py-0.5 rounded-md">v{app.version}</span>
                    <span>•</span>
                    <span>{new Date(app.releaseDate).toLocaleDateString()}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      {app.systemRequirements.os}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                {app.links.find(l => l.type === 'playstore') && (
                  <Button className="rounded-xl flex-1 md:flex-none" asChild>
                    <Link href={app.links.find(l => l.type === 'playstore')?.url || '#'}>
                      <Play className="w-4 h-4 mr-2" /> Google Play
                    </Link>
                  </Button>
                )}
                {app.links.find(l => l.type === 'apk') && (
                  <Button variant="outline" className="rounded-xl flex-1 md:flex-none" asChild>
                    <Link href={app.links.find(l => l.type === 'apk')?.url || '#'}>
                      <Download className="w-4 h-4 mr-2" /> Download APK
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-16 p-8 rounded-2xl bg-muted/30 border border-border/50 text-center">
        <h3 className="font-bold text-xl mb-4">Need an older version?</h3>
        <p className="text-muted-foreground mb-6">
          We maintain an archive of previous releases for compatibility purposes. Check our GitHub releases page or contact support.
        </p>
        <Button variant="outline" asChild>
          <Link href="/support">Contact Support</Link>
        </Button>
      </div>
    </div>
  );
}
