"use client";
import { useT } from "@/lib/i18n";

export function Footer() {
  const t = useT();

  return (
    <footer className="relative border-t border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-10 md:flex-row md:items-center md:px-10">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-lg border border-white/15 bg-black font-mono text-[12px] font-semibold tracking-tight">EK</div>
          <div className="text-sm text-white/60">© 2026 Eray Kaan Cevik</div>
        </div>
        <div className="flex flex-wrap items-center gap-5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
          <a href="/#hero" className="ulink">{t.footer.top}</a>
          <a href="/#projects" className="ulink">{t.footer.proj}</a>
          <a href="/#contact" className="ulink">{t.footer.cont}</a>
          <span className="h-3 w-px bg-white/15" aria-hidden />
          <a href="/impressum" className="ulink">{t.footer.impr}</a>
          <a href="/datenschutz" className="ulink">{t.footer.priv}</a>
        </div>
      </div>
      <div className="overflow-hidden border-t border-white/5 mask-fade-x">
        <div className="select-none whitespace-nowrap py-4 text-center font-serif text-[18vw] italic leading-none tracking-tighter text-white/4 md:text-[12vw]">
          Eray Kaan Cevik · Eray Kaan Cevik
        </div>
      </div>
    </footer>
  );
}
