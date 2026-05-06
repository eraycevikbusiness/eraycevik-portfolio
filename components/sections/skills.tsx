"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Layers, Server, Database, Wrench, Monitor } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import {
  SiDotnet, SiBlazor, SiRust, SiNuget, SiSharp,
  SiTypescript, SiJavascript, SiReact, SiNextdotjs, SiExpo,
  SiTailwindcss, SiHtml5, SiCss, SiNodedotjs,
  SiAnthropic, SiGit, SiGithub, SiGithubactions,
  SiMongodb, SiCanva, SiDocker, SiMysql, SiRider,
} from "react-icons/si";

const techRow1 = ["C#", ".NET Framework", "Blazor", "Avalonia", "Rust", "WPF", "ASP.NET Core", "Razor", "Entity Framework", "NuGet"];
const techRow2 = ["TypeScript", "JavaScript", "React", "React Native", "Next.js", "Expo", "Tailwind CSS", "HTML", "CSS", "Node.js"];
const techRow3 = ["KI Claude", "Git", "GitHub", "MongoDB", "SQL", "Canva", "GitHub Actions", "Docker", "SQL Server", "Rider"];

type SkillDef = { icon: React.ReactElement; color: string };

const SKILL_MAP: Record<string, SkillDef> = {
  "C#":               { icon: <SiSharp />,          color: "#512BD4" },
  ".NET Framework":   { icon: <SiDotnet />,         color: "#512BD4" },
  "Blazor":           { icon: <SiBlazor />,          color: "#512BD4" },
  "Avalonia":         { icon: <Monitor size={14} />, color: "#8B5CF6" },
  "Rust":             { icon: <SiRust />,            color: "#CE4A00" },
  "WPF":              { icon: <SiDotnet />,          color: "#512BD4" },
  "ASP.NET Core":     { icon: <SiDotnet />,          color: "#512BD4" },
  "Razor":            { icon: <SiDotnet />,          color: "#512BD4" },
  "Entity Framework": { icon: <SiDotnet />,          color: "#512BD4" },
  "NuGet":            { icon: <SiNuget />,           color: "#004880" },
  "TypeScript":       { icon: <SiTypescript />,      color: "#3178C6" },
  "JavaScript":       { icon: <SiJavascript />,      color: "#F7DF1E" },
  "React":            { icon: <SiReact />,           color: "#61DAFB" },
  "React Native":     { icon: <SiReact />,           color: "#61DAFB" },
  "Next.js":          { icon: <SiNextdotjs />,       color: "#AAAAAA" },
  "Expo":             { icon: <SiExpo />,            color: "#AAAAAA" },
  "Tailwind CSS":     { icon: <SiTailwindcss />,     color: "#06B6D4" },
  "HTML":             { icon: <SiHtml5 />,           color: "#E34F26" },
  "CSS":              { icon: <SiCss />,             color: "#264DE4" },
  "Node.js":          { icon: <SiNodedotjs />,       color: "#339933" },
  "KI Claude":        { icon: <SiAnthropic />,       color: "#D97757" },
  "Git":              { icon: <SiGit />,             color: "#F05032" },
  "GitHub":           { icon: <SiGithub />,          color: "#AAAAAA" },
  "GitHub Actions":   { icon: <SiGithubactions />,   color: "#2088FF" },
  "MongoDB":          { icon: <SiMongodb />,         color: "#47A248" },
  "SQL":              { icon: <Database size={14} />, color: "#336791" },
  "Canva":            { icon: <SiCanva />,           color: "#00C4CC" },
  "Docker":           { icon: <SiDocker />,          color: "#2496ED" },
  "SQL Server":       { icon: <SiMysql />,           color: "#4479A1" },
  "Rider":            { icon: <SiRider />,           color: "#FF318C" },
};

const bentoIcons = [<Layers size={16} key="l" />, <Server size={16} key="s" />, <Database size={16} key="d" />, <Wrench size={16} key="w" />];
const bentoClassNames = ["md:col-span-2", "md:col-span-1", "md:col-span-1", "md:col-span-2"];

function TechBadge({ name }: { name: string }) {
  const skill = SKILL_MAP[name];
  return (
    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/3 text-neutral-300 text-sm font-mono whitespace-nowrap hover:border-violet-500/40 hover:text-violet-300 transition-all duration-200">
      {skill && (
        <span className="text-sm leading-none shrink-0" style={{ color: skill.color }}>
          {skill.icon}
        </span>
      )}
      {name}
    </span>
  );
}

function InfiniteRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="relative flex overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-linear-to-r from-black to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-linear-to-l from-black to-transparent pointer-events-none" />
      <motion.div
        animate={{ x: reverse ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex gap-4 shrink-0"
      >
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <TechBadge key={i} name={item} />
        ))}
      </motion.div>
    </div>
  );
}

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

export function SkillsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { t } = useLanguage();

  const bentoItems = t.skills.bento.map((item, i) => ({
    ...item,
    icon: bentoIcons[i],
    className: bentoClassNames[i],
    header: i === 0 ? (
      <div className="flex gap-2 mb-4 flex-wrap">
        {["C#", "Blazor", "Razor", "Avalonia", "WPF"].map(tech => (
          <span key={tech} className="px-2 py-1 bg-violet-500/10 border border-violet-500/20 rounded-md text-violet-300 text-xs font-mono">{tech}</span>
        ))}
      </div>
    ) : i === 1 ? (
      <div className="h-16 flex items-center justify-center gap-3">
        {["🦀", "TS", "⚛"].map(tech => (
          <div key={tech} className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-300 text-sm font-bold font-mono">{tech}</div>
        ))}
      </div>
    ) : i === 2 ? (
      <div className="h-16 flex items-center justify-center gap-3">
        {["AI", "SCR"].map(tech => (
          <div key={tech} className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-300 text-xs font-bold font-mono">{tech}</div>
        ))}
      </div>
    ) : (
      <div className="h-14 flex items-center gap-3">
        <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-linear-to-r from-violet-500 to-blue-500 rounded-full"
            initial={{ width: "0%" }}
            whileInView={{ width: "78%" }}
            transition={{ duration: 1.5, delay: 0.3 }}
          />
        </div>
        <span className="text-neutral-400 text-xs font-mono">{t.skills.alwaysLearning}</span>
      </div>
    ),
  }));

  return (
    <section id="skills" ref={ref} className="relative py-32 bg-black overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-200 h-50 rounded-full bg-violet-600/4 blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div variants={containerVariants} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <motion.p variants={itemVariants} className="font-mono text-violet-400 text-sm tracking-widest uppercase mb-4">
            {t.skills.label}
          </motion.p>

          <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            {t.skills.title1}<br />
            <span className="bg-linear-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent" style={{ WebkitBackgroundClip: "text" }}>
              {t.skills.title2}
            </span>
          </motion.h2>

          <motion.p variants={itemVariants} className="text-neutral-500 text-lg mb-20 max-w-xl">
            {t.skills.subtitle}
          </motion.p>

          <motion.div variants={itemVariants} className="space-y-4 mb-20 -mx-6">
            <InfiniteRow items={techRow1} />
            <InfiniteRow items={techRow2} reverse />
            <InfiniteRow items={techRow3} />
          </motion.div>

          <motion.div variants={itemVariants}>
            <BentoGrid>
              {bentoItems.map((item) => <BentoGridItem key={item.title} {...item} />)}
            </BentoGrid>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
