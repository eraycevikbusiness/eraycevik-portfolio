"use client";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage, type Language } from "@/lib/i18n";

const LANGS: { code: Language; flag: string; label: string }[] = [
  { code: "de", flag: "https://flagcdn.com/ch.svg", label: "Deutsch" },
  { code: "en", flag: "https://flagcdn.com/us.svg", label: "English" },
];

function Flag({ src, size = 20 }: { src: string; size?: number }) {
  return (
    <img
      src={src}
      width={size}
      height={Math.round(size * 0.67)}
      alt=""
      className="rounded-sm object-cover"
      style={{ width: size, height: Math.round(size * 0.67) }}
    />
  );
}

function LangDropdown() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LANGS.find((l) => l.code === language)!;

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex items-center gap-1.5 px-3 h-9 rounded-lg border text-sm transition-all duration-200 select-none",
          open
            ? "border-violet-500/50 bg-white/4 text-white"
            : "border-white/10 text-neutral-400 hover:border-violet-500/40 hover:text-white"
        )}
      >
        <Flag src={current.flag} size={20} />
        <span className="font-mono text-xs">{current.code.toUpperCase()}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={13} className="text-neutral-500" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-36 rounded-xl border border-white/10 bg-[#0d0d0d] backdrop-blur-xl overflow-hidden shadow-xl shadow-black/50"
          >
            {LANGS.map((lang) => (
              <button
                key={lang.code}
                onClick={() => { setLanguage(lang.code); setOpen(false); }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-150",
                  language === lang.code
                    ? "text-white bg-violet-500/15"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                )}
              >
                <Flag src={lang.flag} size={18} />
                <span className="font-mono text-xs">{lang.label}</span>
                {language === lang.code && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-400" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const { language, setLanguage, t } = useLanguage();

  useMotionValueEvent(scrollY, "change", (val) => {
    setScrolled(val > 50);
  });

  const links = [
    { href: "#about", label: t.nav.about },
    { href: "#skills", label: t.nav.skills },
    { href: "#projects", label: t.nav.projects },
    { href: "#experience", label: t.nav.experience },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500",
          scrolled ? "bg-black/80 backdrop-blur-xl border-b border-white/6" : "bg-transparent"
        )}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="font-mono font-bold text-lg text-white tracking-tight">
            <span className="text-violet-400">{"<"}</span>EK<span className="text-violet-400">{" />"}</span>
          </a>

          <ul className="hidden md:flex items-center gap-8">
            {links.map(({ href, label }) => (
              <li key={href}>
                <a href={href} className="text-sm text-neutral-500 hover:text-white transition-colors duration-200 font-medium">
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-3">
            <LangDropdown />
            <a
              href="#contact"
              className="flex items-center gap-2 px-5 h-9 rounded-lg border border-white/10 text-xs font-semibold text-neutral-300 hover:text-white hover:border-violet-500/50 transition-all duration-200"
            >
              {t.nav.hireMe}
            </a>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden flex flex-col gap-1.5 p-2" aria-label="Menu">
            <motion.span animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} className="block w-6 h-0.5 bg-white origin-center" />
            <motion.span animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} className="block w-6 h-0.5 bg-white" />
            <motion.span animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} className="block w-6 h-0.5 bg-white origin-center" />
          </button>
        </div>
      </motion.nav>

      <motion.div
        initial={false}
        animate={menuOpen ? { opacity: 1, pointerEvents: "auto" } : { opacity: 0, pointerEvents: "none" }}
        className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
      >
        {links.map(({ href, label }, i) => (
          <motion.a
            key={href}
            href={href}
            onClick={() => setMenuOpen(false)}
            initial={false}
            animate={menuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: i * 0.07 }}
            className="text-3xl font-bold text-white hover:text-violet-400 transition-colors"
          >
            {label}
          </motion.a>
        ))}
        <div className="flex gap-3 mt-4">
          {LANGS.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-mono transition-all duration-200",
                language === lang.code
                  ? "border-violet-500/50 text-white bg-violet-500/15"
                  : "border-white/10 text-neutral-400 hover:border-white/30"
              )}
            >
              <Flag src={lang.flag} size={22} />
              {lang.code.toUpperCase()}
            </button>
          ))}
        </div>
      </motion.div>
    </>
  );
}
