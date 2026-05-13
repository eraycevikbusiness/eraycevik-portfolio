"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useT } from "@/lib/i18n";

const projectsMeta = [
  { chips: ["Desktop App", "SQLite", "macOS", "Windows", "Linux", "Claude AI"],        accent: "from-orange-500/40 via-amber-500/20", glyph: "PW", featured: true,  href: "https://www.prowtein.app/" },
  { chips: ["C#", ".NET", "Blazor WebAssembly", "MudBlazor", "NuGet", "localStorage"], accent: "from-violet-500/40 via-fuchsia-500/20", glyph: "MF", featured: true,  href: "https://github.com/Eray594/MudForge" },
  { chips: ["C#", ".NET", "SQL Server", "Git", "Agile"],                               accent: "from-cyan-500/30 via-blue-500/10",    glyph: "DG", featured: false, href: "https://www.galaxus.ch/" },
  { chips: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS", "i18n"],         accent: "from-emerald-500/25 via-teal-500/10", glyph: "PF", featured: false, href: "#hero" },
];

function ProjectCard({ p, index }: { p: ReturnType<typeof useT>["projects"]["items"][0] & typeof projectsMeta[0]; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const isExternal = p.href.startsWith("http");

  return (
    <motion.a
      ref={ref}
      href={p.href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
      className={`group relative block overflow-hidden rounded-3xl border border-white/10 bg-ink-100/50 card-hover ${p.featured ? "md:col-span-2" : ""}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(500px circle at var(--mx,50%) var(--my,50%), rgba(167,139,250,0.18), transparent 40%)" }}
      />

      {/* Card header */}
      <div className={`relative h-56 overflow-hidden border-b border-white/10 bg-linear-to-br ${p.accent} to-transparent`}>
        <div className="absolute inset-0 bg-grid opacity-30 mask-radial-soft" />
        <div className="absolute inset-0 bg-dot opacity-20" />
        <div className="absolute -right-2 -bottom-4 select-none font-serif text-[180px] leading-none tracking-tighter text-white/10 italic">
          {p.glyph}
        </div>
        <div className="absolute left-5 top-5 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 light:bg-emerald-600 shadow-[0_0_10px_rgba(52,211,153,0.7)]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">{p.tag}</span>
        </div>
        <div className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-black/40 backdrop-blur transition group-hover:border-white/40 group-hover:bg-white/10">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
            <path d="M3 11L11 3M11 3H5M11 3v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <div className="relative p-7">
        <h3 className="text-3xl font-medium tracking-tight md:text-4xl">{p.title}</h3>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/60">{p.desc}</p>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {p.chips.map((c, i) => (
            <span key={i} className="rounded-md border border-white/10 bg-white/3 px-2 py-1 font-mono text-[10px] tracking-tight text-white/70">{c}</span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-6 border-t border-white/10 pt-5">
          {p.metrics.map((m, i) => (
            <div key={i}>
              <div className="font-serif text-2xl tracking-tight">{m[0]}</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">{m[1]}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.a>
  );
}

export function ProjectsSection() {
  const t = useT().projects;
  const items = t.items.map((it, i) => ({ ...it, ...projectsMeta[i] }));

  return (
    <section id="projects" className="relative mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-36">
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
      </div>

      <div className="mb-10 flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">{t.featured}</span>
        <a href="#contact" className="ulink font-mono text-[11px] uppercase tracking-[0.2em] text-white/70">{t.all}</a>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {items.map((p, i) => <ProjectCard key={p.title + i} p={p} index={i} />)}
      </div>
    </section>
  );
}
