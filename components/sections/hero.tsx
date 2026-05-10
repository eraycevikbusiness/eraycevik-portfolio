"use client";
import { useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { useT, useLang } from "@/lib/i18n";

function Spotlight({ className = "", fill = "white" }: { className?: string; fill?: string }) {
  return (
    <svg
      className={`pointer-events-none absolute opacity-60 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
    >
      <g filter="url(#spot-blur)">
        <ellipse
          cx="1924.71" cy="273.501" rx="1924.71" ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill={fill}
          fillOpacity="0.21"
        />
      </g>
      <defs>
        <filter id="spot-blur" x="0.860352" y="0.838989" width="3785.16" height="2840.26" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="151" result="effect1_foregroundBlur" />
        </filter>
      </defs>
    </svg>
  );
}

function BackgroundBeams({ className = "" }: { className?: string }) {
  const paths = [
    "M-300 -200 C 0 100, 200 200, 600 100 S 1200 -200, 1600 100",
    "M-300 -100 C 0 200, 200 300, 600 200 S 1200 -100, 1600 200",
    "M-300 0   C 0 300, 200 400, 600 300 S 1200 0,    1600 300",
    "M-300 100 C 0 400, 200 500, 600 400 S 1200 100,  1600 400",
    "M-300 200 C 0 500, 200 600, 600 500 S 1200 200,  1600 500",
    "M-300 300 C 0 600, 200 700, 600 600 S 1200 300,  1600 700",
    "M-300 400 C 0 700, 200 800, 600 700 S 1200 400,  1600 700",
    "M-300 500 C 0 800, 200 900, 600 800 S 1200 500,  1600 800",
  ];
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1300 800" preserveAspectRatio="none">
        <defs>
          <linearGradient id="beam-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0" />
            <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#e879f9" stopOpacity="0" />
          </linearGradient>
        </defs>
        {paths.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke="url(#beam-grad)"
            strokeWidth="0.6"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.8 }}
            transition={{ duration: 4 + i * 0.3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: i * 0.2 }}
          />
        ))}
      </svg>
    </div>
  );
}

function Meteors({ count = 14 }: { count?: number }) {
  const meteors = useMemo(() => Array.from({ length: count }).map((_, i) => ({
    id: i,
    top: (i * 37 + 11) % 100,
    left: (i * 61 + 23) % 100,
    delay: (i * 1.3) % 6,
    duration: 4 + (i * 0.7) % 6,
  })), [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {meteors.map(m => (
        <span
          key={m.id}
          className="absolute h-px w-30 rotate-215"
          style={{
            top: `${m.top}%`,
            left: `${m.left}%`,
            background: "linear-gradient(90deg, white, transparent)",
            animation: `meteor ${m.duration}s linear ${m.delay}s infinite`,
            opacity: 0.6,
          }}
        />
      ))}
    </div>
  );
}

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const t = useT();
  const { lang } = useLang();

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section
      id="hero"
      ref={ref}
      onMouseMove={onMove}
      className="relative isolate flex min-h-svh items-center overflow-hidden bg-black noise"
    >
      <div className="absolute inset-0 bg-grid mask-radial-fade opacity-50" />
      <Spotlight className="-top-40 left-0 h-[170%] w-[120%] md:left-60" fill="#a78bfa" />
      <Spotlight className="-top-40 -right-40 h-[140%] w-full" fill="#e879f9" />
      <BackgroundBeams className="opacity-40" />
      <Meteors count={14} />
      <div className="spotlight pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 90% 60% at 50% 100%, rgba(0,0,0,0.9), transparent 60%)" }} />

      <div className="relative mx-auto w-full max-w-7xl px-6 pt-32 pb-20 md:px-10">
        <motion.div
          key={`pill-${lang}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/3 py-1.5 pl-1.5 pr-4 backdrop-blur"
        >
          <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-300">
            {t.hero.status}
          </span>
          <span className="text-[12px] text-white/70">{t.hero.role}</span>
        </motion.div>

        <motion.p
          key={`eyebrow-${lang}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mb-6 font-mono text-[11px] uppercase tracking-[0.32em] text-white/45"
        >
          &lt;<span style={{ color: "#a78bfa" }}>{t.hero.eyebrow1}</span> · <span style={{ color: "#e879f9" }}>{t.hero.eyebrow2}</span> · <span style={{ color: "#67e8f9" }}>{t.hero.eyebrow3}</span>&nbsp;/&gt;
        </motion.p>

        <h1 className="text-[clamp(40px,7.5vw,128px)] font-medium leading-[0.94] tracking-tighter">
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
              className="inline-block text-white"
            >
              Eray Kaan
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, delay: 0.42, ease: [0.2, 0.7, 0.2, 1] }}
              className="inline-block bg-linear-to-br from-white via-white to-white/45 bg-clip-text text-transparent"
            >
              Cevik.
            </motion.span>
          </span>
        </h1>

        <motion.p
          key={`sub-${lang}`}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 max-w-xl text-balance text-base text-white/55 md:text-lg"
        >
          {t.hero.sub}
        </motion.p>

        <motion.div
          key={`cta-${lang}`}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.95 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <a href="#projects" className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90">
            {t.hero.cta1}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-0.5">
              <path d="M2 7h10m0 0L8 3m4 4l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </a>
          <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/3 px-5 py-3 text-sm font-medium text-white/85 backdrop-blur transition hover:bg-white/10">
            {t.hero.cta2}
          </a>

          <div className="ml-1 flex items-center gap-1">
            {[
              {
                label: "GitHub", href: "https://github.com/Eray594",
                icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2c-3.34.73-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.77-1.34-1.77-1.1-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.66-.3-5.47-1.34-5.47-5.97 0-1.32.47-2.4 1.24-3.24-.13-.3-.54-1.53.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.88.12 3.18.77.84 1.23 1.92 1.23 3.24 0 4.65-2.81 5.66-5.49 5.96.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58A12 12 0 0 0 12 .5Z" /></svg>,
              },
              {
                label: "LinkedIn", href: "https://linkedin.com/in/eraykaan",
                icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v14H.22V8zM8.5 8h4.37v1.92h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.47 3.04 5.47 7v7.46h-4.55v-6.62c0-1.58-.03-3.6-2.2-3.6-2.2 0-2.54 1.71-2.54 3.49V22H8.5V8z" /></svg>,
              },
              {
                label: "Mail", href: "#contact",
                icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 7 9-7" /></svg>,
              },
            ].map(s => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white/70 transition hover:border-white/30 hover:bg-white/5 hover:text-white"
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </motion.div>

        <div className="mt-20 flex items-end justify-between md:mt-28">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.32em] text-white/40"
          >
            <span className="relative flex h-7 w-4 items-start justify-center rounded-full border border-white/20">
              <motion.span
                initial={{ y: 2 }}
                animate={{ y: 14 }}
                transition={{ duration: 1.4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                className="mt-1 h-1.5 w-0.5 rounded-full bg-white/60"
              />
            </span>
            {t.hero.scroll}
          </motion.div>
          <motion.div
            key={`meta-${lang}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="hidden items-center gap-6 font-mono text-[10px] uppercase tracking-[0.32em] text-white/40 md:flex"
          >
            <span>{t.hero.meta[0]}</span>
            <span className="h-px w-8 bg-white/15" />
            <span>{t.hero.meta[1]}</span>
            <span className="h-px w-8 bg-white/15" />
            <span>{t.hero.meta[2]}</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
