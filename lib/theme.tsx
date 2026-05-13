"use client";
import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

export type Theme = "dark" | "light";

interface ThemeCtxValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
}

const ThemeCtx = createContext<ThemeCtxValue | null>(null);

const STORAGE_KEY = "theme";

function readInitialTheme(): Theme {
  if (typeof document !== "undefined") {
    const attr = document.documentElement.getAttribute("data-theme");
    if (attr === "light" || attr === "dark") return attr;
  }
  return "dark";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => readInitialTheme());

  // Sync state if the no-flash script set something different (SSR/CSR mismatch protection).
  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme") as Theme | null;
    if (current && current !== theme) setThemeState(current);
  }, [theme]);

  // Follow system changes only when the user hasn't expressed a preference.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = (e: MediaQueryListEvent) => {
      let stored: string | null = null;
      try { stored = localStorage.getItem(STORAGE_KEY); } catch {}
      if (stored === "light" || stored === "dark") return;
      const next: Theme = e.matches ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      setThemeState(next);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    document.documentElement.setAttribute("data-theme", t);
    try { localStorage.setItem(STORAGE_KEY, t); } catch {}
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return (
    <ThemeCtx.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeCtx.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

/* Inline script that runs in <head> before React hydrates, to set
   data-theme on <html> and avoid a flash of wrong theme. */
export const themeInitScript = `(function(){try{var ls=localStorage.getItem('${STORAGE_KEY}');var sys=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';var t=(ls==='light'||ls==='dark')?ls:sys;document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;
