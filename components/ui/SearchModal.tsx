"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, AppWindow } from "lucide-react";
import { appsData } from "@/lib/data/apps";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Lock body scroll and focus input when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Small timeout to ensure input is mounted before focusing
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = "unset";
      setSearchQuery(""); // clear search on close
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const filteredApps = appsData.filter(
    (app) =>
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed left-[50%] top-[10%] md:top-[15%] z-[101] w-[95%] max-w-xl -translate-x-[50%] rounded-2xl border border-border/50 bg-card p-0 shadow-2xl overflow-hidden"
          >
            <div className="flex items-center border-b border-border/50 px-4 py-3">
              <Search className="w-5 h-5 text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search applications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none px-4 text-foreground placeholder:text-muted-foreground"
              />
              <button
                onClick={onClose}
                className="p-1.5 rounded-md hover:bg-muted text-muted-foreground transition-colors"
                aria-label="Close search"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              {searchQuery.length > 0 && filteredApps.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  No applications found for &quot;{searchQuery}&quot;.
                </div>
              ) : (
                <div className="flex flex-col gap-1">
                  <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {searchQuery ? "Search Results" : "All Applications"}
                  </div>
                  {filteredApps.map((app) => (
                    <button
                      key={app.id}
                      onClick={() => {
                        onClose();
                        router.push(`/apps/${app.slug}`);
                      }}
                      className="flex items-center gap-4 w-full text-left p-3 rounded-xl hover:bg-muted/60 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20 group-hover:scale-105 transition-transform">
                         <AppWindow className="w-5 h-5" />
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <div className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
                          {app.name}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {app.category} • {app.platforms.join(', ')}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="border-t border-border/50 p-3 bg-muted/20 text-xs text-muted-foreground flex justify-between items-center hidden md:flex">
                <span>Navigate with <kbd className="px-1.5 py-0.5 rounded-md bg-muted border border-border/50 text-[10px] uppercase font-sans">Tab</kbd></span>
                <span>Press <kbd className="px-1.5 py-0.5 rounded-md bg-muted border border-border/50 text-[10px] uppercase font-sans">ESC</kbd> to close</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
