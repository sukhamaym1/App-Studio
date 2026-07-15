import Link from "next/link";
import { Smartphone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background pt-16 pb-8">
      <div className="container mx-auto max-w-7xl px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div className="space-y-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-primary text-primary-foreground p-1.5 rounded-xl">
              <Smartphone className="w-5 h-5" />
            </div>
            <span className="font-space font-bold text-xl tracking-tight">
              AppStudio
            </span>
          </Link>
          <p className="text-muted-foreground text-sm max-w-xs">
            Crafting beautiful, robust, and useful software applications for your everyday needs.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-4 text-foreground">Applications</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/apps/money-counter" className="text-muted-foreground hover:text-foreground transition-colors">Money Counter</Link></li>
            <li><Link href="/apps/pdf-tools" className="text-muted-foreground hover:text-foreground transition-colors">PDF Tools</Link></li>
            <li><Link href="/apps/emi-calculator" className="text-muted-foreground hover:text-foreground transition-colors">EMI Calculator</Link></li>
            <li><Link href="/apps" className="text-muted-foreground hover:text-foreground transition-colors">View All Apps</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4 text-foreground">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Blog & News</Link></li>
            <li><Link href="/downloads" className="text-muted-foreground hover:text-foreground transition-colors">Download Center</Link></li>
            <li><Link href="/support" className="text-muted-foreground hover:text-foreground transition-colors">Support & FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4 text-foreground">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/legal/privacy-policy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
            <li><Link href="/legal/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms & Conditions</Link></li>
            <li><Link href="/legal/cookie-policy" className="text-muted-foreground hover:text-foreground transition-colors">Cookie Policy</Link></li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center gap-4">
        <p>© {new Date().getFullYear()} AppStudio Software. All rights reserved.</p>
        <p className="text-xs opacity-75">Built with Next.js, ready for GitHub Pages.</p>
      </div>
    </footer>
  );
}
