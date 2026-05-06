"use client";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface MeteorProps {
  number?: number;
}

export function Meteors({ number = 20 }: MeteorProps) {
  const [meteorStyles, setMeteorStyles] = useState<
    Array<{ top: string; left: string; animationDelay: string; animationDuration: string }>
  >([]);

  useEffect(() => {
    const styles = Array.from({ length: number }, () => ({
      top: Math.floor(Math.random() * 100) + "%",
      left: Math.floor(Math.random() * 100) + "%",
      animationDelay: Math.random() * 0.6 + 0.2 + "s",
      animationDuration: Math.floor(Math.random() * 8 + 2) + "s",
    }));
    setMeteorStyles(styles);
  }, [number]);

  return (
    <>
      {meteorStyles.map((style, idx) => (
        <span
          key={idx}
          className={cn(
            "pointer-events-none absolute left-1/2 top-1/2 h-0.5 w-0.5 rotate-[215deg] animate-[meteor_linear_infinite] rounded-full bg-slate-500 shadow-[0_0_0_1px_#ffffff10]"
          )}
          style={{
            top: style.top,
            left: style.left,
            animationDelay: style.animationDelay,
            animationDuration: style.animationDuration,
          }}
        >
          <div className="pointer-events-none absolute top-1/2 -z-10 h-px w-[50px] -translate-y-1/2 bg-gradient-to-r from-slate-500 to-transparent" />
        </span>
      ))}
    </>
  );
}
