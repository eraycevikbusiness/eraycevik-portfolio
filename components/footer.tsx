"use client";
import { useLanguage } from "@/lib/i18n";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-white/6 py-8 text-center">
      <p className="text-neutral-600 text-sm font-mono">{t.footer}</p>
    </footer>
  );
}
