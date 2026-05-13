"use client";
import { createContext, useContext, useCallback, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { locales, type Locale, isLocale } from "./config";
import type { Dictionary } from "./dict.de";

interface LangCtxValue {
  lang: Locale;
  t: Dictionary;
  setLang: (l: Locale) => void;
}

const LangCtx = createContext<LangCtxValue | null>(null);

export function LanguageProvider({
  lang,
  dict,
  children,
}: {
  lang: Locale;
  dict: Dictionary;
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const setLang = useCallback(
    (next: Locale) => {
      if (next === lang) return;
      const segments = pathname.split("/").filter(Boolean);
      if (segments.length > 0 && isLocale(segments[0])) {
        segments[0] = next;
      } else {
        segments.unshift(next);
      }
      const hash = typeof window !== "undefined" ? window.location.hash : "";
      router.push("/" + segments.join("/") + hash);
    },
    [lang, pathname, router]
  );

  return (
    <LangCtx.Provider value={{ lang, t: dict, setLang }}>
      {children}
    </LangCtx.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangCtx);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}

export function useT() {
  return useLang().t;
}

export { locales };
export type { Locale };
