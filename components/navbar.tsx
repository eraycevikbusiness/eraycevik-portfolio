"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useLang, useT, type Locale } from "@/lib/i18n";
import { localeNames } from "@/lib/i18n/config";

function Flag({ code, className = "h-3.5 w-5" }: { code: Locale; className?: string }) {
  const cls = `${className} rounded-[3px] ring-1 ring-white/15 overflow-hidden block shrink-0`;
  if (code === "de") return (
    <svg viewBox="0 0 30 18" className={cls}>
      <rect width="30" height="6" fill="#000" />
      <rect y="6" width="30" height="6" fill="#DD0000" />
      <rect y="12" width="30" height="6" fill="#FFCE00" />
    </svg>
  );
  if (code === "en") return (
    <svg viewBox="0 0 60 30" className={cls} preserveAspectRatio="xMidYMid slice">
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="3" />
    </svg>
  );
  if (code === "tr") return (
    <svg viewBox="0 0 30 20" className={cls}>
      <rect width="30" height="20" fill="#E30A17" />
      <circle cx="11" cy="10" r="4.5" fill="#fff" />
      <circle cx="12.4" cy="10" r="3.6" fill="#E30A17" />
      <polygon points="17.5,10 14.7,10.95 16.45,8.6 16.45,11.4 14.7,9.05" fill="#fff" />
    </svg>
  );
  return null;
}

function LanguageSwitcher() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-label="Sprache wählen"
        aria-expanded={open}
        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/60 py-1.5 pl-2 pr-2.5 text-[12px] font-medium tracking-tight text-white/85 backdrop-blur-xl transition hover:border-white/25 hover:text-white"
      >
        <Flag code={lang} />
        <span className="font-mono text-[11px]">{localeNames[lang].code}</span>
        <svg className={`h-3 w-3 text-white/40 transition-transform ${open ? "rotate-180" : ""}`} viewBox="0 0 12 12" fill="none">
          <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="lang-menu"
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.16, ease: [0.2, 0.7, 0.2, 1] }}
            className="absolute right-0 z-50 mt-2 w-48 origin-top-right overflow-hidden rounded-xl border border-white/10 bg-[#0f0f10]/90 p-1 backdrop-blur-2xl shadow-[0_24px_60px_-15px_rgba(0,0,0,0.85)]"
            role="menu"
          >
            <div className="border-b border-white/5 px-3 py-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">// language</span>
            </div>
            {(Object.entries(localeNames) as [Locale, { code: string; name: string }][]).map(([code, info]) => {
              const isActive = lang === code;
              return (
                <button
                  key={code}
                  onClick={() => { setLang(code); setOpen(false); }}
                  role="menuitem"
                  className={`flex w-full items-center gap-3 rounded-lg px-2.5 py-2.5 text-left transition ${isActive ? "bg-white/[0.07]" : "hover:bg-white/[0.04]"}`}
                >
                  <Flag code={code} className="h-4 w-6" />
                  <div className="flex-1">
                    <div className={`text-[13px] font-medium tracking-tight ${isActive ? "text-white" : "text-white/85"}`}>{info.name}</div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">{info.code}</div>
                  </div>
                  {isActive && (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-[#a78bfa]">
                      <path d="M2 7.5L5.5 11L12 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navbar() {
  const t = useT();
  const { lang } = useLang();
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const base = `/${lang}`;

  const navItems = [
    { id: "about",      label: t.nav.about,      num: "01" },
    { id: "stack",      label: t.nav.stack,       num: "02" },
    { id: "projects",   label: t.nav.projects,    num: "03" },
    { id: "experience", label: t.nav.experience,  num: "04" },
    { id: "contact",    label: t.nav.contact,     num: "05" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    ["hero", "about", "stack", "projects", "experience", "contact"].forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.2, 0.7, 0.2, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-500 md:px-10 ${scrolled ? "py-3" : "py-5"}`}>
          {/* Brand */}
          <a href={`${base}#hero`} className="flex items-center gap-3">
            <div className="relative">
              <div className="grid h-9 w-9 place-items-center rounded-lg border border-white/15 bg-black font-mono text-[12px] font-semibold tracking-tight">
                <span>EK</span>
              </div>
              <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]" />
            </div>
            <div className="hidden flex-col gap-1.5 md:flex">
              <span className="text-[13px] font-medium tracking-tight">Eray Kaan Cevik</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">developer / .net &amp; web</span>
            </div>
          </a>

          {/* Center pill nav (desktop) */}
          <nav className={`hidden items-center gap-1 rounded-full border border-white/10 bg-black/60 p-1 backdrop-blur-xl transition-all md:flex ${scrolled ? "shadow-[0_8px_30px_-10px_rgba(167,139,250,0.25)]" : ""}`}>
            {navItems.map(item => {
              const isActive = active === item.id;
              return (
                <a
                  key={item.id}
                  href={`${base}#${item.id}`}
                  className={`group relative rounded-full px-3.5 py-1.5 text-[13px] tracking-tight transition-colors ${isActive ? "bg-white/10 text-white" : "text-white/55 hover:text-white/85"}`}
                >
                  <span className="relative flex items-center gap-1.5">
                    <span className="font-mono text-[10px] text-white/40">{item.num}</span>
                    <span>{item.label}</span>
                  </span>
                </a>
              );
            })}
          </nav>

          {/* Right: language + CTA */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <div className="hidden md:block">
              <a
                href={`${base}#contact`}
                className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white px-4 py-2 text-[13px] font-medium text-black transition hover:bg-white/90"
              >
                {t.nav.cta}
                <span className="grid h-5 w-5 place-items-center rounded-full bg-black text-white transition-transform group-hover:translate-x-0.5">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6h8m0 0L6.5 2.5M10 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMenuOpen(o => !o)}
              className="grid h-9 w-9 place-items-center rounded-lg border border-white/15 md:hidden"
              aria-label="Menu"
            >
              <div className="space-y-1">
                <span className={`block h-px w-4 bg-white transition ${menuOpen ? "translate-y-[3px] rotate-45" : ""}`} />
                <span className={`block h-px w-4 bg-white transition ${menuOpen ? "-translate-y-[3px] -rotate-45" : ""}`} />
              </div>
            </button>
          </div>
        </div>

        <div className={`h-px w-full beam transition-opacity duration-500 ${scrolled ? "opacity-60" : "opacity-0"}`} />
      </motion.header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-sheet"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-xl md:hidden"
            onClick={() => setMenuOpen(false)}
          >
            <motion.nav
              key="mobile-sheet-nav"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="mt-20 flex flex-col gap-1 px-6"
              onClick={e => e.stopPropagation()}
            >
              {navItems.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={`${base}#${item.id}`}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="flex items-center justify-between border-b border-white/10 py-5 text-2xl font-medium tracking-tight"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-white/40">{item.num}</span>
                    {item.label}
                  </span>
                  <span className="text-white/30">→</span>
                </motion.a>
              ))}
              <a
                href={`${base}#contact`}
                onClick={() => setMenuOpen(false)}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-base font-medium text-black"
              >
                {t.nav.cta}
              </a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
