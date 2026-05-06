"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";

const projectTitles = ["MudForge", "Interne Tools", "Portfolio"] as const;
const projectTech = [
  ["C#", ".NET", "Blazor WebAssembly", "MudBlazor", "NuGet", "localStorage"],
  ["C#", ".NET", "SQL Server", "Git", "Agile"],
  ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS", "Claude AI"],
];
const projectColors = ["violet", "blue", "emerald"] as const;
const projectFeatured = [true, false, false];

const colorMap = {
  violet: { tag: "text-violet-400 bg-violet-500/10 border-violet-500/20", glow: "from-violet-500/20", badge: "bg-violet-500/10 border-violet-500/20 text-violet-300" },
  blue:   { tag: "text-blue-400 bg-blue-500/10 border-blue-500/20",       glow: "from-blue-500/20",   badge: "bg-blue-500/10 border-blue-500/20 text-blue-300" },
  emerald:{ tag: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20", glow: "from-emerald-500/20", badge: "bg-emerald-500/10 border-emerald-500/20 text-emerald-300" },
};

function ProjectCard({ index }: { index: number }) {
  const [hovered, setHovered] = useState(false);
  const { t } = useLanguage();
  const item = t.projects.items[index];
  const colors = colorMap[projectColors[index]];
  const featured = projectFeatured[index];

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "group relative rounded-2xl border border-white/8 bg-[#080808] overflow-hidden",
        "hover:border-white/15 transition-all duration-500",
        featured ? "md:col-span-2" : ""
      )}
    >
      <motion.div
        className={cn("absolute inset-0 pointer-events-none bg-linear-to-br to-transparent opacity-0", colors.glow)}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      <div className={cn("relative p-7", featured ? "md:flex md:gap-12" : "")}>
        <div className={featured ? "flex-1" : ""}>
          <div className="flex items-center justify-between mb-5">
            <span className={cn("px-3 py-1 rounded-full text-xs font-semibold border font-mono", colors.tag)}>
              {item.tag}
            </span>
            <div className="flex items-center gap-3">
              <a href="#" aria-label="GitHub" className="text-neutral-600 hover:text-white transition-colors"><GithubIcon size={16} /></a>
              <a href="#" aria-label="Live" className="text-neutral-600 hover:text-white transition-colors"><ExternalLink size={16} /></a>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
            {projectTitles[index]}
            <motion.span animate={{ x: hovered ? 4 : 0, y: hovered ? -4 : 0, opacity: hovered ? 1 : 0 }} transition={{ duration: 0.2 }}>
              <ArrowUpRight size={20} className="text-neutral-500" />
            </motion.span>
          </h3>

          <p className="text-neutral-400 text-sm leading-relaxed mb-6">{item.description}</p>

          <div className="flex flex-wrap gap-2">
            {projectTech[index].map((t) => (
              <span key={t} className={cn("px-2 py-1 rounded-md border text-xs font-mono", colors.badge)}>{t}</span>
            ))}
          </div>
        </div>

        {featured && (
          <div className="flex flex-col justify-center gap-6 mt-8 md:mt-0 md:min-w-40">
            {item.metrics.map((m) => (
              <div key={m.label}>
                <div className="text-3xl font-black text-white">{m.value}</div>
                <div className="text-xs text-neutral-500 mt-1">{m.label}</div>
              </div>
            ))}
          </div>
        )}

        {!featured && (
          <div className="flex gap-8 mt-6 pt-6 border-t border-white/6">
            {item.metrics.map((m) => (
              <div key={m.label}>
                <div className="text-xl font-bold text-white">{m.value}</div>
                <div className="text-xs text-neutral-500">{m.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}

export function ProjectsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const { t } = useLanguage();

  return (
    <section id="projects" ref={ref} className="relative py-32 bg-black overflow-hidden">
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
        <div className="w-150 h-75 rounded-full bg-blue-600/5 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <p className="font-mono text-violet-400 text-sm tracking-widest uppercase mb-4">{t.projects.label}</p>
          <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
            <h2 className="text-5xl md:text-7xl font-black text-white leading-tight">
              {t.projects.title1}<br />
              <span className="bg-linear-to-r from-violet-400 to-emerald-400 bg-clip-text text-transparent" style={{ WebkitBackgroundClip: "text" }}>
                {t.projects.title2}
              </span>
            </h2>
            <a href="#" className="flex items-center gap-2 text-neutral-400 hover:text-white text-sm transition-colors border-b border-neutral-700 hover:border-white pb-1">
              {t.projects.viewAll} <ArrowUpRight size={14} />
            </a>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[0, 1, 2].map((i) => <ProjectCard key={i} index={i} />)}
        </div>
      </div>
    </section>
  );
}
