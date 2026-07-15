"use client";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const phrases = [
  "productivity & scale.",
  "creative freedom.",
  "effortless design.",
  "modern workflows.",
  "your daily life."
];

function Typewriter() {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting && text === currentPhrase) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      } else {
        setText(currentPhrase.substring(0, text.length + (isDeleting ? -1 : 1)));
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60 relative">
      {text}
      <span className="absolute -right-[12px] top-0 bottom-0 w-[4px] bg-primary animate-pulse" />
    </span>
  );
}

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section 
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1200 }}
      className="relative overflow-hidden bg-background pt-24 pb-32 sm:pt-32 sm:pb-40 cursor-default"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
      
      <motion.div 
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="container mx-auto max-w-7xl px-4 relative z-10 text-center flex flex-col items-center justify-center"
      >
        <motion.div 
          style={{ transform: "translateZ(60px)" }}
          className="inline-flex items-center rounded-full border border-border/50 bg-muted/50 px-3 py-1 text-sm mb-8 backdrop-blur-sm shadow-xl"
        >
          <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
          Building tools for the future
        </motion.div>
        
        <motion.h1 
          style={{ transform: "translateZ(100px)" }}
          className="text-4xl sm:text-6xl md:text-7xl font-space font-bold tracking-tight text-foreground max-w-4xl mx-auto mb-6 min-h-[140px] sm:min-h-[160px] md:min-h-[220px]"
        >
          Software built for <br className="hidden sm:block" />
          <Typewriter />
        </motion.h1>
        
        <motion.p 
          style={{ transform: "translateZ(50px)" }}
          className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          Discover our suite of premium applications designed to simplify your workflows, manage your finances, and boost your daily productivity.
        </motion.p>
        
        <motion.div 
          style={{ transform: "translateZ(80px)" }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button size="lg" asChild className="w-full sm:w-auto rounded-full px-8 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow">
            <Link href="/apps">Explore Applications</Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="w-full sm:w-auto rounded-full px-8 bg-background/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
            <Link href="/downloads">Download Center</Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
