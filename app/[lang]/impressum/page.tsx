import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";

type ImpressumContent = {
  title: string;
  back: string;
  rows: [string, string][];
  disclaimer: string;
};

const content: Record<Locale, ImpressumContent> = {
  de: {
    title: "Impressum",
    back: "← Zurück",
    rows: [
      ["Betreiber", "Eray Kaan Cevik"],
      ["Standort", "Zürich, Schweiz"],
      ["E-Mail", "eray.cevik.business@gmail.com"],
      ["Art", "Privates, nicht-kommerzielles Portfolio"],
    ],
    disclaimer: "Für die Richtigkeit verlinkter externer Inhalte wird keine Haftung übernommen.",
  },
  en: {
    title: "Legal Notice",
    back: "← Back",
    rows: [
      ["Operator", "Eray Kaan Cevik"],
      ["Location", "Zurich, Switzerland"],
      ["Email", "eray.cevik.business@gmail.com"],
      ["Type", "Private, non-commercial portfolio"],
    ],
    disclaimer: "No liability is accepted for the accuracy of linked external content.",
  },
  tr: {
    title: "Künye",
    back: "← Geri",
    rows: [
      ["Operatör", "Eray Kaan Cevik"],
      ["Konum", "Zürih, İsviçre"],
      ["E-posta", "eray.cevik.business@gmail.com"],
      ["Tür", "Özel, ticari olmayan portföy"],
    ],
    disclaimer: "Bağlantılı harici içeriklerin doğruluğu için sorumluluk kabul edilmez.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return { title: content[lang].title };
}

export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const c = content[lang];

  return (
    <main className="mx-auto max-w-2xl px-6 pb-28 pt-36 md:px-10">
      <Link
        href={`/${lang}#hero`}
        className="mb-12 inline-flex font-mono text-[11px] uppercase tracking-[0.22em] text-white/40 transition hover:text-white/70"
      >
        {c.back}
      </Link>
      <h1 className="mb-10 text-4xl font-medium tracking-tight">{c.title}</h1>
      <div className="divide-y divide-white/8 rounded-2xl border border-white/10 bg-ink-100/40">
        {c.rows.map(([label, value]) => (
          <div key={label} className="flex gap-6 px-6 py-4">
            <span className="w-28 shrink-0 font-mono text-[11px] uppercase tracking-[0.18em] text-white/35">{label}</span>
            <span className="text-[14px] text-white/75">{value}</span>
          </div>
        ))}
      </div>
      <p className="mt-8 text-[13px] leading-relaxed text-white/35">{c.disclaimer}</p>
      <p className="mt-12 font-mono text-[11px] text-white/20">© 2026 Eray Kaan Cevik</p>
    </main>
  );
}
