"use client";
import { motion } from "framer-motion";
import { useT } from "@/lib/i18n";

const tags = ["C#", "Rust", "Blazor", "Razor", "Avalonia UI", "WPF", "Claude AI", "TypeScript"];

export function AboutSection() {
  const t = useT();
  const a = t.about;

  return (
    <section id="about" className="relative mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-36">
      {/* Section header */}
      <div className="mb-14 md:mb-20 flex flex-col gap-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <span className="h-px w-10 bg-white/20" />
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">{a.eyebrow}</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
          className="max-w-4xl text-5xl font-medium tracking-tight text-white md:text-7xl"
        >
          {a.title1} <span className="font-serif italic text-white/70">{a.title2}</span>
        </motion.h2>
      </div>

      <div className="grid gap-12 md:grid-cols-12">
        {/* Bio */}
        <div className="md:col-span-7 space-y-6 text-[17px] leading-relaxed text-white/70">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            {a.p1_pre}<span className="text-white">{a.p1_name}</span>{a.p1_mid}<span className="text-white">{a.p1_org}</span>{a.p1_post}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {a.p2_pre}<span className="text-white">{a.p2_age}</span>{a.p2_mid}<span className="text-white">{a.p2_proj}</span>{a.p2_post}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {a.p3}
          </motion.p>

          <div className="flex flex-wrap gap-2 pt-4">
            {tags.map((label, i) => (
              <motion.span
                key={label}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="chip"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent-violet/80" />
                {label}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Stats grid */}
        <div className="md:col-span-5">
          <div className="grid grid-cols-2 gap-3">
            {a.stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-ink-100/60 p-6"
              >
                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent-violet/10 blur-2xl transition group-hover:bg-accent-violet/25" />
                <div className="font-serif text-5xl tracking-tight md:text-6xl">{s[0]}</div>
                <div className="mt-3 text-sm text-white/70">{s[1]}</div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">{s[2]}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
