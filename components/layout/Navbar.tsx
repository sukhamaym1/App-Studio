"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Moon, Sun, Menu, X, Smartphone, Search } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SearchModal } from "@/components/ui/SearchModal";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Apps", href: "/apps" },
  { name: "Downloads", href: "/downloads" },
  { name: "Blog", href: "/blog" },
  { name: "Support", href: "/support" },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-7xl px-4 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-primary text-primary-foreground p-1.5 rounded-xl">
              <Smartphone className="w-5 h-5" />
            </div>
            <span className="font-space font-bold text-xl tracking-tight hidden sm:inline-block">
              AppStudio
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === link.href ? "text-foreground" : "text-foreground/60"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="hidden md:flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 hover:bg-muted border border-border/50 rounded-full px-4 py-1.5 transition-colors"
            aria-label="Search applications"
          >
            <Search className="w-4 h-4" />
            <span>Search...</span>
            <kbd className="hidden lg:inline-flex ml-2 px-1.5 py-0.5 rounded-md bg-background border border-border text-[10px] font-sans font-semibold">
              ⌘K
            </kbd>
          </button>
          
          <button
            onClick={() => setIsSearchOpen(true)}
            className="md:hidden p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground"
            aria-label="Search applications"
          >
            <Search className="w-5 h-5" />
          </button>

          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-muted transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
               <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-b border-border/40 bg-background"
          >
            <nav className="flex flex-col p-4 space-y-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "text-lg font-medium p-2 rounded-lg transition-colors hover:bg-muted",
                    pathname === link.href ? "bg-muted text-foreground" : "text-foreground/60"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}
