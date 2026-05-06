"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SpotlightCard } from "@/components/ui/spotlight";
import { Code2, Zap, Globe, Coffee } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const statIcons = [<Zap size={20} key="zap" />, <Globe size={20} key="globe" />, <Code2 size={20} key="code" />, <Coffee size={20} key="coffee" />];
const statValues = ["19", "EFZ", "MIT", "∞"];

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 80, damping: 16 } },
};

export function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();
  const { p1, p2, p3, stats } = t.about;

  return (
    <section id="about" ref={ref} className="relative py-32 bg-black overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-125 h-125 rounded-full bg-blue-600/5 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div variants={containerVariants} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <motion.p variants={itemVariants} className="font-mono text-violet-400 text-sm tracking-widest uppercase mb-4">
            {t.about.label}
          </motion.p>

          <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl font-black text-white mb-16 leading-tight">
            {t.about.title1}<br />
            <span className="bg-linear-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent" style={{ WebkitBackgroundClip: "text" }}>
              {t.about.title2}
            </span>
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div variants={itemVariants} className="space-y-6">
              <p className="text-neutral-300 text-lg leading-relaxed">
                {p1.pre}<span className="text-white font-semibold">Eray Kaan Cevik</span>
                {p1.mid1}<span className="text-violet-400 font-semibold">{p1.role}</span>
                {p1.mid2}<span className="text-white font-semibold">Digitec Galaxus</span>
                {p1.post}
              </p>
              <p className="text-neutral-400 text-base leading-relaxed">
                {p2.pre}<span className="text-violet-300 font-medium">MudForge</span>{p2.post}
              </p>
              <p className="text-neutral-500 text-base leading-relaxed">{p3}</p>

              <div className="pt-4 flex flex-wrap gap-3">
                {["C#", "Rust", "Blazor", "Razor", "Avalonia UI", "WPF", "Claude AI", "Scrum"].map((tech) => (
                  <span key={tech} className="px-3 py-1.5 rounded-lg border border-white/10 text-neutral-400 text-sm font-mono hover:border-violet-500/50 hover:text-violet-300 transition-colors duration-200">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div variants={containerVariants} className="grid grid-cols-2 gap-4">
              {stats.map((label, i) => (
                <motion.div key={label} variants={itemVariants}>
                  <SpotlightCard className="p-6 h-full group cursor-default">
                    <div className="text-violet-400/60 group-hover:text-violet-400 transition-colors mb-3">{statIcons[i]}</div>
                    <div className="text-4xl font-black text-white mb-1">{statValues[i]}</div>
                    <div className="text-sm text-neutral-500">{label}</div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
