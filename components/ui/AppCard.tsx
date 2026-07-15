import Image from "next/image";
import Link from "next/link";
import { AppData } from "@/lib/data/apps";
import { Button } from "./button";
import { Download, ArrowRight, Smartphone, Monitor } from "lucide-react";

interface AppCardProps {
  app: AppData;
  featured?: boolean;
}

export function AppCard({ app, featured = false }: AppCardProps) {
  return (
    <div className={`group flex flex-col rounded-2xl border border-border/50 bg-card text-card-foreground shadow-sm hover:shadow-md hover:border-border transition-all duration-300 overflow-hidden ${featured ? 'md:flex-row' : ''}`}>
      <div className={`relative bg-muted/30 flex items-center justify-center p-8 ${featured ? 'md:w-2/5 shrink-0' : 'h-48'}`}>
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-3xl overflow-hidden shadow-lg shadow-black/10 transition-transform duration-300 group-hover:scale-105">
          <Image 
            src={app.logo} 
            alt={`${app.name} logo`} 
            fill 
            className="object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
      <div className="flex flex-col flex-1 p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
            {app.category}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground ml-auto">
            {app.platforms.includes('Android') && <Smartphone className="w-3.5 h-3.5" />}
            {app.platforms.includes('Windows') && <Monitor className="w-3.5 h-3.5" />}
            {app.platforms.includes('Web') && <span className="font-medium">Web</span>}
          </div>
        </div>
        
        <h3 className="text-xl font-space font-bold mb-2 line-clamp-1">{app.name}</h3>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-6 flex-1">
          {app.description}
        </p>
        
        <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border/40">
          <Button asChild className="flex-1 rounded-xl">
            <Link href={`/apps/${app.slug}`}>
              Details
            </Link>
          </Button>
          
          {app.links.some(l => l.type === 'playstore' || l.type === 'apk') && (
            <Button variant="outline" size="icon" asChild className="rounded-xl shrink-0">
              <Link href={`/downloads?app=${app.slug}`} aria-label="Download">
                <Download className="w-4 h-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
