"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function GlowingStarsBackgroundCard({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const [mouseEntered, setMouseEntered] = useState(false);

  return (
    <div
      onMouseEnter={() => setMouseEntered(true)}
      onMouseLeave={() => setMouseEntered(false)}
      className={cn(
        "relative rounded-2xl border border-white/[0.08] bg-[#0a0a0a] p-6 overflow-hidden",
        className
      )}
    >
      <div className="flex flex-row items-center justify-center">
        <Illustration mouseEntered={mouseEntered} />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function GlowingStarsDescription({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <p className={cn("text-sm text-neutral-400 max-w-[16rem]", className)}>
      {children}
    </p>
  );
}

export function GlowingStarsTitle({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <h2 className={cn("text-2xl font-bold text-white", className)}>{children}</h2>
  );
}

export const Illustration = ({ mouseEntered }: { mouseEntered: boolean }) => {
  const stars = 108;
  const columns = 18;
  const [glowingStars, setGlowingStars] = useState<number[]>([]);
  const highlightedStars = useRef<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      highlightedStars.current = Array.from({ length: 5 }, () =>
        Math.floor(Math.random() * stars)
      );
      setGlowingStars([...highlightedStars.current]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="h-48 p-1 w-full"
      style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: "1px" }}
    >
      {[...Array(stars)].map((_, starIdx) => {
        const isGlowing = glowingStars.includes(starIdx);
        const delay = (starIdx % 10) * 0.1;
        const staticDelay = starIdx * 0.01;
        return (
          <div key={`star-${starIdx}`} className="relative flex items-center justify-center">
            <AnimatePresence mode="wait">
              {mouseEntered && (
                <motion.div
                  key={`glow-${starIdx}`}
                  initial={{ scale: 1 }}
                  animate={{ scale: isGlowing ? [1, 1.2, 2.5, 2.2, 1.5] : 1, background: isGlowing ? "#fff" : "#666" }}
                  transition={{ duration: 2, ease: "easeInOut", delay: staticDelay }}
                  exit={{ scale: 1, background: "#666" }}
                  className="rounded-full h-[1px] w-[1px] bg-[#666] relative z-20"
                />
              )}
            </AnimatePresence>
            <AnimatePresence mode="wait">
              {isGlowing && mouseEntered && (
                <motion.div
                  key={`glow-effect-${starIdx}`}
                  animate={{ opacity: [1, 0], scale: [1, 2] }}
                  transition={{ duration: 0.5, ease: "easeInOut", delay }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="absolute left-1/2 -translate-x-1/2 z-10 h-[4px] w-[4px] rounded-full bg-violet-500 blur-[1px]"
                />
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
