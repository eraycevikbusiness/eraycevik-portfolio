"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";

const experienceCompanies = ["Digitec Galaxus AG", "MudForge (Eigenprojekt)", "Eigeninitiative"] as const;
const experienceTech = [
  ["C#", ".NET", "SQL Server", "Git", "Agile / Scrum"],
  ["C#", ".NET", "Blazor WebAssembly", "MudBlazor", "NuGet", "GitHub Actions"],
  ["JavaScript", "C#", "HTML", "CSS", "Git"],
];
const experienceColors = ["violet", "blue", "emerald"] as const;

const colorMap = {
  violet: { dot: "border-violet-500 shadow-violet-500/30", inner: "bg-violet-500", tag: "bg-violet-500/10 text-violet-300 border-violet-500/20", line: "bg-violet-500/40" },
  blue:   { dot: "border-blue-500 shadow-blue-500/30",     inner: "bg-blue-500",   tag: "bg-blue-500/10 text-blue-300 border-blue-500/20",         line: "bg-blue-500/40" },
  emerald:{ dot: "border-emerald-500 shadow-emerald-500/30",inner: "bg-emerald-500",tag: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20", line: "bg-emerald-500/40" },
};

function ExperienceItem({ index, isLast }: { index: number; isLast: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { t } = useLanguage();
  const exp = t.experience.items[index];
  const colors = colorMap[experienceColors[index]];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="flex gap-8 relative"
    >
      {!isLast && (
        <div className="absolute left-4.25 top-12 bottom-0 w-px">
          <motion.div
            className={cn("w-full h-full", colors.line)}
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1, delay: index * 0.15 + 0.3 }}
            style={{ transformOrigin: "top" }}
          />
        </div>
      )}

      <div className="shrink-0 mt-1">
        <div className={cn("w-9 h-9 rounded-full border-2 flex items-center justify-center shadow-lg", colors.dot)}>
          <div className={cn("w-3 h-3 rounded-full", colors.inner)} />
        </div>
      </div>

      <div className="flex-1 pb-16">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <span className={cn("px-3 py-1 rounded-full text-xs font-mono border", colors.tag)}>{exp.period}</span>
          <span className="text-neutral-600 text-xs font-mono">{exp.location}</span>
        </div>

        <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
        <p className="text-violet-400 font-medium text-sm mb-5">{experienceCompanies[index]}</p>

        <ul className="space-y-2.5 mb-6">
          {exp.highlights.map((h, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.15 + 0.4 + i * 0.07 }}
              className="flex items-start gap-3 text-neutral-400 text-sm"
            >
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-neutral-600 shrink-0" />
              {h}
            </motion.li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {experienceTech[index].map((t) => (
            <span key={t} className="px-2.5 py-1 rounded-md bg-white/4 border border-white/8 text-neutral-500 text-xs font-mono">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function ExperienceSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const { t } = useLanguage();

  return (
    <section id="experience" ref={ref} className="relative py-32 bg-black overflow-hidden">
      <div className="absolute top-0 right-0 w-100 h-100 rounded-full bg-violet-600/4 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <p className="font-mono text-violet-400 text-sm tracking-widest uppercase mb-4">{t.experience.label}</p>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-16 leading-tight">
            {t.experience.title1}<br />
            <span className="bg-linear-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent" style={{ WebkitBackgroundClip: "text" }}>
              {t.experience.title2}
            </span>
          </h2>
        </motion.div>

        <div>
          {t.experience.items.map((_, i) => (
            <ExperienceItem key={i} index={i} isLast={i === t.experience.items.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
