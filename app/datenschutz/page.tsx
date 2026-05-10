"use client";
import { useLang } from "@/lib/i18n";
import Link from "next/link";

type Lang = "de" | "en" | "tr";

const content: Record<Lang, {
  title: string; back: string; updated: string;
  sections: { heading: string; items: string[] }[];
  rights_heading: string; rights: string[];
  contact_note: string;
}> = {
  de: {
    title: "Datenschutz",
    back: "← Zurück",
    updated: "Stand: Mai 2026 · revDSG / DSGVO",
    sections: [
      {
        heading: "Verantwortlicher",
        items: ["Eray Kaan Cevik, Zürich, Schweiz", "eray.cevik.business@gmail.com"],
      },
      {
        heading: "Erhobene Daten",
        items: [
          "Kontaktformular: Name, E-Mail, Nachricht — wird per Gmail an mein Postfach weitergeleitet, keine weitere Speicherung.",
          "Server-Logs: Vercel (Hoster) protokolliert automatisch IP-Adresse, Browser und Aufrufzeit — ausserhalb meiner Kontrolle.",
          "Icons-CDN: jsDelivr überträgt beim Laden der Icons deine IP-Adresse.",
          "Schriftarten werden lokal ausgeliefert (next/font) — keine Anfragen an Google Fonts.",
        ],
      },
      {
        heading: "Cookies & lokaler Speicher",
        items: [
          "contact_sent (Cookie, httpOnly, 1 Stunde): technisches Rate-Limit nach Formular-Absenden, enthält keinen personenbezogenen Daten.",
          "portfolio_lang (localStorage): speichert deine Sprachauswahl lokal im Browser, wird nicht übertragen.",
        ],
      },
      {
        heading: "Kein Tracking",
        items: ["Keine Analytics, keine Werbe-Cookies, kein Session-Tracking."],
      },
      {
        heading: "Drittanbieter",
        items: [
          "Vercel Inc. (USA) — Hosting · vercel.com/legal/privacy-policy",
          "Google LLC (USA) — E-Mail-Versand · policies.google.com/privacy",
          "jsDelivr / Prospect One (EU) — CDN · jsdelivr.com/terms/privacy-policy-jsdelivr-net",
          "Datenübermittlungen in die USA erfolgen auf Basis der EU-Standardvertragsklauseln (Art. 46 DSGVO / Art. 16 Abs. 2 lit. d revDSG).",
        ],
      },
    ],
    rights_heading: "Deine Rechte (revDSG / DSGVO)",
    rights: ["Auskunft", "Berichtigung", "Löschung", "Widerspruch", "Beschwerde beim EDÖB"],
    contact_note: "Anfragen: eray.cevik.business@gmail.com",
  },

  en: {
    title: "Privacy Policy",
    back: "← Back",
    updated: "Last updated: May 2026 · revFADP / GDPR",
    sections: [
      {
        heading: "Controller",
        items: ["Eray Kaan Cevik, Zurich, Switzerland", "eray.cevik.business@gmail.com"],
      },
      {
        heading: "Data collected",
        items: [
          "Contact form: name, email, message — forwarded via Gmail to my inbox, no further storage.",
          "Server logs: Vercel (host) automatically logs IP address, browser and request time — outside my control.",
          "Icons CDN: jsDelivr receives your IP address when loading icons.",
          "Fonts are served locally (next/font) — no requests to Google Fonts.",
        ],
      },
      {
        heading: "Cookies & local storage",
        items: [
          "contact_sent (cookie, httpOnly, 1 hour): technical rate limit after form submission, contains no personal data.",
          "portfolio_lang (localStorage): stores your language preference locally in your browser, never transmitted.",
        ],
      },
      {
        heading: "No tracking",
        items: ["No analytics, no advertising cookies, no session tracking."],
      },
      {
        heading: "Third-party providers",
        items: [
          "Vercel Inc. (USA) — Hosting · vercel.com/legal/privacy-policy",
          "Google LLC (USA) — Email delivery · policies.google.com/privacy",
          "jsDelivr / Prospect One (EU) — CDN · jsdelivr.com/terms/privacy-policy-jsdelivr-net",
          "Data transfers to the USA are based on EU Standard Contractual Clauses (Art. 46 GDPR / Art. 16 para. 2 lit. d revFADP).",
        ],
      },
    ],
    rights_heading: "Your rights (revFADP / GDPR)",
    rights: ["Access", "Rectification", "Erasure", "Objection", "Complaint to FDPIC"],
    contact_note: "Requests: eray.cevik.business@gmail.com",
  },

  tr: {
    title: "Gizlilik Politikası",
    back: "← Geri",
    updated: "Son güncelleme: Mayıs 2026 · revFADP / GDPR",
    sections: [
      {
        heading: "Veri Sorumlusu",
        items: ["Eray Kaan Cevik, Zürih, İsviçre", "eray.cevik.business@gmail.com"],
      },
      {
        heading: "Toplanan veriler",
        items: [
          "İletişim formu: ad, e-posta, mesaj — Gmail aracılığıyla gelen kutuma iletilir, başka depolama yapılmaz.",
          "Sunucu günlükleri: Vercel (barındırıcı) otomatik olarak IP adresi, tarayıcı ve istek zamanını kaydeder — kontrolüm dışında.",
          "İkon CDN'i: jsDelivr, ikonlar yüklenirken IP adresinizi alır.",
          "Yazı tipleri yerel olarak sunulur (next/font) — Google Fonts'a istek gönderilmez.",
        ],
      },
      {
        heading: "Çerezler ve yerel depolama",
        items: [
          "contact_sent (çerez, httpOnly, 1 saat): form gönderimi sonrası teknik hız sınırı, kişisel veri içermez.",
          "portfolio_lang (localStorage): dil tercihini tarayıcınızda yerel olarak saklar, iletilmez.",
        ],
      },
      {
        heading: "Takip yok",
        items: ["Analitik yok, reklam çerezi yok, oturum takibi yok."],
      },
      {
        heading: "Üçüncü taraf sağlayıcılar",
        items: [
          "Vercel Inc. (ABD) — Barındırma · vercel.com/legal/privacy-policy",
          "Google LLC (ABD) — E-posta gönderimi · policies.google.com/privacy",
          "jsDelivr / Prospect One (AB) — CDN · jsdelivr.com/terms/privacy-policy-jsdelivr-net",
          "ABD'ye veri aktarımları AB Standart Sözleşme Maddeleri temelinde gerçekleştirilir (GDPR Md. 46 / revFADP Md. 16 fıkra 2 harf d).",
        ],
      },
    ],
    rights_heading: "Haklarınız (revFADP / GDPR)",
    rights: ["Erişim", "Düzeltme", "Silme", "İtiraz", "FDPIC'e şikayet"],
    contact_note: "Talepler: eray.cevik.business@gmail.com",
  },
};

export default function DatenschutzPage() {
  const { lang } = useLang();
  const c = content[lang as Lang];

  return (
    <main className="mx-auto max-w-2xl px-6 pb-28 pt-36 md:px-10">
      <Link href="/#hero" className="mb-12 inline-flex font-mono text-[11px] uppercase tracking-[0.22em] text-white/40 transition hover:text-white/70">
        {c.back}
      </Link>
      <h1 className="mb-10 text-4xl font-medium tracking-tight">{c.title}</h1>

      <div className="space-y-8">
        {c.sections.map((s, i) => (
          <div key={i}>
            <h2 className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">{s.heading}</h2>
            <ul className="space-y-1.5">
              {s.items.map((item, j) => (
                <li key={j} className="flex gap-3 text-[14px] leading-relaxed text-white/65">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/20" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h2 className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">{c.rights_heading}</h2>
          <div className="flex flex-wrap gap-2">
            {c.rights.map((r, i) => (
              <span key={i} className="rounded-full border border-white/10 bg-white/3 px-3 py-1 font-mono text-[11px] text-white/55">{r}</span>
            ))}
          </div>
          <p className="mt-4 text-[14px] text-white/50">{c.contact_note}</p>
        </div>
      </div>

      <div className="mt-14 flex items-center justify-between border-t border-white/8 pt-6">
        <p className="font-mono text-[11px] text-white/20">{c.updated}</p>
        <Link href="/impressum" className="font-mono text-[11px] text-white/25 transition hover:text-white/50">
          {lang === "de" ? "Impressum" : lang === "en" ? "Legal Notice" : "Künye"} →
        </Link>
      </div>
    </main>
  );
}
