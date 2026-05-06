"use client";
import { cn } from "@/lib/utils";

export function BackgroundBeams({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="beam1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(139,92,246,0)" />
            <stop offset="50%" stopColor="rgba(139,92,246,0.3)" />
            <stop offset="100%" stopColor="rgba(139,92,246,0)" />
          </linearGradient>
          <linearGradient id="beam2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(59,130,246,0)" />
            <stop offset="50%" stopColor="rgba(59,130,246,0.2)" />
            <stop offset="100%" stopColor="rgba(59,130,246,0)" />
          </linearGradient>
          <linearGradient id="beam3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(236,72,153,0)" />
            <stop offset="50%" stopColor="rgba(236,72,153,0.15)" />
            <stop offset="100%" stopColor="rgba(236,72,153,0)" />
          </linearGradient>
        </defs>
        <line x1="-100" y1="0" x2="1540" y2="900" stroke="url(#beam1)" strokeWidth="1.5" opacity="0.6">
          <animateTransform attributeName="transform" type="translate" values="-200,0;200,0;-200,0" dur="8s" repeatCount="indefinite" />
        </line>
        <line x1="200" y1="-100" x2="1240" y2="1000" stroke="url(#beam2)" strokeWidth="1" opacity="0.4">
          <animateTransform attributeName="transform" type="translate" values="0,-100;0,100;0,-100" dur="12s" repeatCount="indefinite" />
        </line>
        <line x1="600" y1="-100" x2="840" y2="1000" stroke="url(#beam1)" strokeWidth="0.8" opacity="0.3">
          <animateTransform attributeName="transform" type="translate" values="100,0;-100,0;100,0" dur="10s" repeatCount="indefinite" />
        </line>
        <line x1="-100" y1="300" x2="1540" y2="600" stroke="url(#beam3)" strokeWidth="1" opacity="0.25">
          <animateTransform attributeName="transform" type="translate" values="-150,0;150,0;-150,0" dur="15s" repeatCount="indefinite" />
        </line>
        <circle cx="720" cy="450" r="300" fill="none" stroke="rgba(139,92,246,0.04)" strokeWidth="1" />
        <circle cx="720" cy="450" r="500" fill="none" stroke="rgba(139,92,246,0.03)" strokeWidth="1" />
        <circle cx="720" cy="450" r="700" fill="none" stroke="rgba(139,92,246,0.02)" strokeWidth="1" />
      </svg>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-linear-to-b from-violet-500/0 via-violet-500/10 to-violet-500/0" />
    </div>
  );
}

export function GridBackground({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 pointer-events-none overflow-hidden", className)}>
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/80" />
    </div>
  );
}
