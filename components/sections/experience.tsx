"use client";
import { motion } from "framer-motion";
import { useT } from "@/lib/i18n";

const expMeta = [
  { chips: ["C#", ".NET", "SQL Server", "Git", "Agile / Scrum"], accentClass: "bg-accent-violet" },
  { chips: ["C#", ".NET", "Blazor WebAssembly", "MudBlazor", "NuGet", "GitHub Actions"], accentClass: "bg-accent-fuchsia" },
  { chips: ["Python", "C#", "Discord.net", "Git", "MongoDB", ".NET"], accentClass: "bg-accent-cyan" },
];

export function ExperienceSection() {
  const t = useT().experience;
  const items = t.items.map((it, i) => ({ ...it, ...expMeta[i] }));

  return (
    <section id="experience" className="relative mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-36 bg-linear-to-b from-black via-ink-50/30 to-black">
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
          {t.title1}{t.title2 ? " " : ""}{t.title2 ? <span className="font-serif italic text-white/70">{t.title2}</span> : null}
        </motion.h2>
      </div>

      <div className="relative">
        <div className="absolute left-4.5 top-2 bottom-2 w-px bg-linear-to-b from-white/0 via-white/15 to-white/0 md:left-1/2 md:-translate-x-1/2" />

        <div className="space-y-12 md:space-y-20">
          {items.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.05 }}
              className={`relative grid gap-6 md:grid-cols-2 md:gap-16 ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}
            >
              <div className="absolute left-3 top-1.5 z-10 h-3.5 w-3.5 rounded-full border-2 border-black md:left-1/2 md:-translate-x-1/2">
                <span className={`block h-full w-full rounded-full ${e.accentClass} shadow-[0_0_18px_rgba(167,139,250,0.6)]`} />
              </div>

              <div className={`pl-10 md:pl-0 ${i % 2 === 1 ? "md:pl-16" : "md:pr-16 md:text-right"}`}>
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/45">{e.range}</div>
                <div className="mt-1 text-sm text-white/55">{e.where}</div>
              </div>

              <div className={`pl-10 md:pl-0 ${i % 2 === 1 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                <h3 className="text-2xl font-medium tracking-tight md:text-3xl">{e.role}</h3>
                <div className="mt-1 text-base text-white/60">{e.org}</div>

                <ul className={`mt-5 space-y-2.5 text-[14.5px] leading-relaxed text-white/65 ${i % 2 === 1 ? "md:text-right" : ""}`}>
                  {e.bullets.map((b, j) => (
                    <li key={j} className={`flex gap-3 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                      <span className={`mt-2 h-1 w-1 shrink-0 rounded-full ${e.accentClass} opacity-80`} />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className={`mt-5 flex flex-wrap gap-1.5 ${i % 2 === 1 ? "md:justify-end" : ""}`}>
                  {e.chips.map((c, j) => (
                    <span key={j} className="rounded-md border border-white/10 bg-white/3 px-2 py-1 font-mono text-[10px] tracking-tight text-white/70">{c}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
