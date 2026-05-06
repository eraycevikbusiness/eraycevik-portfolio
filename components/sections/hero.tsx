"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { BackgroundBeams, GridBackground } from "@/components/ui/background-beams";
import { Meteors } from "@/components/ui/meteors";
import { MovingBorder } from "@/components/ui/moving-border";
import { useLanguage } from "@/lib/i18n";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
};
const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 15 } },
};

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const { t } = useLanguage();

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <GridBackground />
      <BackgroundBeams />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-150 h-150 rounded-full bg-violet-600/5 blur-[120px]" />
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 w-full max-w-6xl mx-auto px-6">
        <motion.div variants={container} initial="hidden" animate="show" className="text-center">

          <motion.div variants={item} className="inline-flex items-center gap-2 mb-8">
            <div className="relative">
              <span className="absolute inset-0 rounded-full bg-violet-500/20 animate-ping" />
              <span className="relative block w-2 h-2 rounded-full bg-violet-400" />
            </div>
            <span className="text-sm text-violet-300/80 font-mono tracking-widest uppercase">
              {t.hero.badge}
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-[clamp(3rem,10vw,8rem)] font-black leading-[0.9] tracking-tight mb-8 select-none"
          >
            <span className="block text-white">Eray Kaan</span>
            <span className="block relative">
              <span
                className="bg-linear-to-r from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent"
                style={{ WebkitBackgroundClip: "text" }}
              >
                Cevik
              </span>
              <motion.span
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-px bg-linear-to-r from-transparent via-violet-500 to-transparent"
                initial={{ width: 0 }}
                animate={{ width: "60%" }}
                transition={{ delay: 1.2, duration: 1 }}
              />
            </span>
          </motion.h1>

          <motion.p variants={item} className="text-[clamp(1rem,2.5vw,1.4rem)] text-neutral-400 font-light mb-4 tracking-wide">
            <span className="font-mono text-violet-400">&lt;</span>
            {" "}Developer · Open Source · .NET & Web{" "}
            <span className="font-mono text-violet-400">/&gt;</span>
          </motion.p>

          <motion.p variants={item} className="text-neutral-500 max-w-xl mx-auto mb-12 text-lg leading-relaxed">
            {t.hero.subtitle}
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <MovingBorder duration={3000} borderRadius="0.75rem" containerClassName="h-12">
              <a href="#projects" className="flex items-center gap-2 px-6 py-2 text-sm font-semibold text-white">
                {t.hero.viewProjects} <ArrowRight size={16} />
              </a>
            </MovingBorder>
            <a
              href="#contact"
              className="flex items-center gap-2 px-6 h-12 rounded-xl border border-white/10 text-sm font-semibold text-neutral-300 hover:text-white hover:border-white/30 transition-all duration-300"
            >
              {t.hero.getInTouch}
            </a>
          </motion.div>

          <motion.div variants={item} className="flex items-center justify-center gap-6">
            {[
              { icon: <GithubIcon size={18} />, href: "https://github.com", label: "GitHub" },
              { icon: <LinkedinIcon size={18} />, href: "https://linkedin.com", label: "LinkedIn" },
              { icon: <Mail size={18} />, href: "mailto:eray.kaan.private07@gmail.com", label: "Mail" },
            ].map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-neutral-500 hover:text-white transition-colors duration-200"
              >
                <span className="group-hover:text-violet-400 transition-colors">{icon}</span>
                <span className="text-xs font-mono tracking-wider">{label}</span>
              </a>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-mono text-neutral-600 tracking-widest">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-10 bg-linear-to-b from-neutral-600 to-transparent"
        />
      </motion.div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Meteors number={15} />
      </div>
    </section>
  );
}
