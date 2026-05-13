"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { useT } from "@/lib/i18n";

/* ── Simple Icons brand icon loader ── */
const TECH: Record<string, { slug: string; color: string }> = {
  "C#":               { slug: "csharp",             color: "#9B4F96" },
  ".NET Framework":   { slug: "dotnet",             color: "#512BD4" },
  "Blazor":           { slug: "blazor",             color: "#5C2D91" },
  "Avalonia":         { slug: "avaloniaui",         color: "#A579FF" },
  "Rust":             { slug: "rust",               color: "#DEA584" },
  "WPF":              { slug: "dotnet",             color: "#5C2D91" },
  "ASP.NET Core":     { slug: "dotnet",             color: "#512BD4" },
  "Razor":            { slug: "dotnet",             color: "#512BD4" },
  "Entity Framework": { slug: "nuget",              color: "#68217A" },
  "NuGet":            { slug: "nuget",              color: "#004880" },
  "TypeScript":       { slug: "typescript",         color: "#3178C6" },
  "JavaScript":       { slug: "javascript",         color: "#F7DF1E" },
  "React":            { slug: "react",              color: "#61DAFB" },
  "React Native":     { slug: "react",              color: "#61DAFB" },
  "Next.js":          { slug: "nextdotjs",          color: "var(--ek-fg)" },
  "Expo":             { slug: "expo",               color: "var(--ek-fg)" },
  "Tailwind CSS":     { slug: "tailwindcss",        color: "#06B6D4" },
  "HTML":             { slug: "html5",              color: "#E34F26" },
  "CSS":              { slug: "css3",               color: "#1572B6" },
  "Node.js":          { slug: "nodedotjs",          color: "#5FA04E" },
  "Claude AI":        { slug: "anthropic",          color: "#D97757" },
  "Git":              { slug: "git",                color: "#F05032" },
  "GitHub":           { slug: "github",             color: "var(--ek-fg)" },
  "GitHub Actions":   { slug: "githubactions",      color: "#2088FF" },
  "MongoDB":          { slug: "mongodb",            color: "#47A248" },
  "SQL":              { slug: "mysql",              color: "#F29111" },
  "Canva":            { slug: "canva",              color: "#00C4CC" },
  "Docker":           { slug: "docker",             color: "#2496ED" },
  "SQL Server":       { slug: "microsoftsqlserver", color: "#CC2927" },
  "Rider":            { slug: "rider",              color: "#C90F5E" },
};

const iconCache = new Map<string, Promise<string | null>>();

function fetchIcon(slug: string): Promise<string | null> {
  if (iconCache.has(slug)) return iconCache.get(slug)!;
  const p = fetch(`https://cdn.jsdelivr.net/npm/simple-icons@11.14.0/icons/${slug}.svg`)
    .then(r => r.ok ? r.text() : null)
    .catch(() => null);
  iconCache.set(slug, p);
  return p;
}

function TechIcon({ name, size = 14 }: { name: string; size?: number }) {
  const t = TECH[name];
  const [svg, setSvg] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    if (!t) return;
    fetchIcon(t.slug).then(raw => {
      if (!alive || !raw) return;
      const cleaned = raw
        .replace(/<svg([^>]*)>/, '<svg$1 fill="currentColor">')
        .replace(/fill="(?!currentColor)[^"]*"/g, 'fill="currentColor"');
      setSvg(cleaned);
    });
    return () => { alive = false; };
  }, [t?.slug]);

  if (!t) return <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-white/35" aria-hidden />;

  const glow = t.color.startsWith("var(")
    ? `color-mix(in srgb, ${t.color} 40%, transparent)`
    : `${t.color}66`;

  return (
    <span
      className="inline-grid shrink-0 place-items-center"
      style={{ width: size, height: size, color: t.color, filter: `drop-shadow(0 0 6px ${glow})` }}
      aria-hidden
      dangerouslySetInnerHTML={svg ? { __html: svg } : undefined}
    >
      {svg ? null : <span className="block h-1.5 w-1.5 rounded-full" style={{ background: t.color }} />}
    </span>
  );
}

/* ── Marquee ──
   Row 0: daily — what I work with every day at Galaxus & on MudForge.
   Row 1: working with — touch regularly, not daily.
   Row 2: currently learning — actively growing into. */
const stackRows = [
  ["C#", ".NET Framework", "Blazor", "Razor", "ASP.NET Core", "Entity Framework", "NuGet", "Git", "GitHub", "SQL Server", "Rider"],
  ["TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Docker", "GitHub Actions", "Claude AI", "MongoDB", "Canva"],
  ["Rust", "React", "React Native", "Next.js", "Expo", "Avalonia", "WPF", "Node.js", "SQL"],
];

function StackPill({ label }: { label: string }) {
  return (
    <span className="group/pill inline-flex shrink-0 items-center gap-2.5 rounded-xl border border-white/10 bg-ink-100/70 px-4 py-2.5 font-mono text-[12px] tracking-tight text-white/85 backdrop-blur transition hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/5">
      <TechIcon name={label} size={14} />
      {label}
    </span>
  );
}

function MarqueeRow({ labels, direction }: { labels: string[]; direction: "left" | "right" }) {
  const animName = direction === "left" ? "marquee-l" : "marquee-r";
  return (
    <div className="group relative overflow-hidden mask-fade-x">
      <div className="flex w-max" style={{ animation: `${animName} 45s linear infinite` }}>
        <div className="flex shrink-0 gap-3 pr-3">{labels.map((x, i) => <StackPill key={i} label={x} />)}</div>
        <div className="flex shrink-0 gap-3 pr-3" aria-hidden>{labels.map((x, i) => <StackPill key={i} label={x} />)}</div>
      </div>
    </div>
  );
}

/* ── Animated bento visuals ── */
function NetVisual() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-violet-500/15 blur-3xl" />
      <svg className="absolute right-4 top-4 h-44 w-44" viewBox="0 0 100 100" fill="none">
        {[0, 1, 2, 3].map(i => (
          <motion.circle
            key={i} cx="50" cy="50" r={20 + i * 10}
            stroke="url(#net-grad)" strokeWidth="0.6" fill="none"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: [0, 0.7, 0], scale: [0.6, 1, 1.15] }}
            transition={{ duration: 3.6, delay: i * 0.4, repeat: Infinity, ease: "easeOut" }}
          />
        ))}
        <defs>
          <linearGradient id="net-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#e879f9" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

const RUST_SPOKES = Array.from({ length: 12 }, (_, i) => {
  const a = (i / 12) * Math.PI * 2;
  return {
    x1: parseFloat((50 + Math.cos(a) * 32).toFixed(4)),
    y1: parseFloat((50 + Math.sin(a) * 32).toFixed(4)),
    x2: parseFloat((50 + Math.cos(a) * 42).toFixed(4)),
    y2: parseFloat((50 + Math.sin(a) * 42).toFixed(4)),
  };
});

function RustVisual() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-fuchsia-500/15 blur-3xl" />
      <motion.svg
        className="absolute right-2 top-2 h-40 w-40 text-fuchsia-300/40"
        viewBox="0 0 100 100" fill="none"
        animate={{ rotate: 360 }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
      >
        {RUST_SPOKES.map((s, i) => (
          <line
            key={i}
            x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2}
            stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"
          />
        ))}
        <circle cx="50" cy="50" r="22" stroke="currentColor" strokeWidth="0.8" fill="none" />
        <circle cx="50" cy="50" r="6" fill="currentColor" fillOpacity="0.4" />
      </motion.svg>
    </div>
  );
}

function AIVisual() {
  const dots = useMemo(() => Array.from({ length: 14 }, (_, i) => ({
    x: (i * 47 + 5) % 90 + 5,
    y: (i * 31 + 5) % 90 + 5,
    d: 2 + (i * 0.7) % 3,
    delay: (i * 0.4) % 4,
    dur: 3 + (i * 0.5) % 4,
  })), []);
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-cyan-400/15 blur-3xl" />
      <svg className="absolute right-3 top-3 h-40 w-40" viewBox="0 0 100 100">
        {dots.map((d, i) => (
          <motion.circle
            key={i} cx={d.x} cy={d.y} r={0.8} fill="#67e8f9"
            animate={{ opacity: [0, 1, 0], r: [0.4, d.d * 0.6, 0.4] }}
            transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "78px 22px" }}
        >
          {[0, 60, 120].map(r => (
            <line key={r} x1="78" y1="14" x2="78" y2="30" stroke="#67e8f9" strokeWidth="1.6" strokeLinecap="round" transform={`rotate(${r} 78 22)`} />
          ))}
        </motion.g>
      </svg>
    </div>
  );
}

function OssVisual() {
  const lines = [[10, 70], [10, 45], [10, 80], [10, 55], [10, 65], [10, 50], [10, 72], [10, 40]];
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -right-12 -bottom-12 h-72 w-md rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:block">
        <svg width="220" height="120" viewBox="0 0 220 120" className="opacity-90">
          <defs>
            <linearGradient id="oss-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#34d399" stopOpacity="0" />
              <stop offset="50%" stopColor="#34d399" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
            </linearGradient>
          </defs>
          {lines.map(([x, w], i) => (
            <motion.rect
              key={i} x={x} y={i * 14 + 6} height="3" rx="1.5"
              fill="rgba(255,255,255,0.08)"
              initial={{ width: 0 }}
              animate={{ width: w + (i % 2 ? 30 : 0) }}
              transition={{ duration: 1.4, delay: 0.1 * i, ease: "easeOut" }}
            />
          ))}
          <g stroke="rgba(52,211,153,0.6)" strokeWidth="1.4" fill="none">
            <path d="M150 12 V108" />
            <path d="M150 30 Q 165 30 165 45 V 96 Q 165 108 175 108" />
            <path d="M150 60 Q 185 60 185 78 V 96 Q 185 108 195 108" />
          </g>
          {[12, 30, 45, 60, 78, 108].map((y, i) => (
            <motion.circle
              key={i}
              cx={i === 1 ? 150 : i === 2 ? 165 : i === 3 ? 150 : i === 4 ? 185 : i === 5 ? 195 : 150}
              cy={y} r="3" fill="#34d399"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.4, delay: i * 0.2, repeat: Infinity }}
            />
          ))}
          <motion.rect
            x="0" y="0" width="220" height="2" fill="url(#oss-line)"
            initial={{ y: 0 }}
            animate={{ y: 118 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </div>
    </div>
  );
}

function BentoCard({
  title, desc, badges, accentClass, kicker, visual, className = "",
}: {
  title: string; desc: string; badges: string[];
  accentClass: string; kicker: string; visual: React.ReactNode; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-ink-100 card-hover min-h-50 ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(400px circle at var(--mx,50%) var(--my,50%), rgba(167,139,250,0.18), transparent 40%)" }}
      />
      {visual}
      <div className="relative flex flex-col p-7">
        <div className="flex flex-wrap gap-1.5">
          {badges.map((b, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/4 px-2 py-1 font-mono text-[10px] tracking-tight text-white/75">
              <TechIcon name={b} size={11} />
              {b}
            </span>
          ))}
        </div>
        <div className="pt-10">
          <div className={`mb-2 font-mono text-[10px] uppercase tracking-[0.22em] ${accentClass}`}>{kicker}</div>
          <h3 className="text-2xl font-medium tracking-tight md:text-3xl">{title}</h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/55">{desc}</p>
        </div>
      </div>
    </div>
  );
}

export function SkillsSection() {
  const t = useT().stack;

  return (
    <section id="stack" className="relative mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-36 bg-linear-to-b from-black via-black to-ink-50/20">
      <div className="mb-14 md:mb-20 flex flex-col gap-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <span className="h-px w-10 bg-white/20" />
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">{t.eyebrow}</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
          className="max-w-4xl text-5xl font-medium tracking-tight text-white md:text-7xl"
        >
          {t.title1} <span className="font-serif italic text-white/70">{t.title2}</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-2xl text-base text-white/55 md:text-lg"
        >
          {t.sub}
        </motion.p>
      </div>

      <div className="space-y-7">
        {stackRows.map((row, i) => (
          <div key={i} className="space-y-2.5">
            <div className="px-1 font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
              {t.rows[i]}
            </div>
            <MarqueeRow labels={row} direction={i % 2 === 0 ? "left" : "right"} />
          </div>
        ))}
      </div>

      <div className="mt-14 grid gap-3 md:grid-cols-6">
        <BentoCard
          className="md:col-span-3 md:row-span-2"
          title={t.cards[0][0]} desc={t.cards[0][1]}
          badges={["C#", "Blazor", "Razor", "Avalonia", "WPF"]}
          accentClass="text-accent-violet" kicker={t.kickers[0]}
          visual={<NetVisual />}
        />
        <BentoCard
          className="md:col-span-3"
          title={t.cards[1][0]} desc={t.cards[1][1]}
          badges={["Rust", "TypeScript", "React"]}
          accentClass="text-accent-fuchsia" kicker={t.kickers[1]}
          visual={<RustVisual />}
        />
        <BentoCard
          className="md:col-span-3"
          title={t.cards[2][0]} desc={t.cards[2][1]}
          badges={["Claude AI"]}
          accentClass="text-accent-cyan" kicker={t.kickers[2]}
          visual={<AIVisual />}
        />
        <BentoCard
          className="md:col-span-6"
          title={t.cards[3][0]} desc={t.cards[3][1]}
          badges={["Git", "GitHub Actions", "Docker", "NuGet"]}
          accentClass="text-emerald-400 light:text-emerald-600" kicker={t.kickers[3]}
          visual={<OssVisual />}
        />
      </div>
    </section>
  );
}
