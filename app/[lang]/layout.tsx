import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { LanguageProvider } from "@/lib/i18n";
import { isLocale, locales, ogLocaleMap, defaultLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { ThemeProvider, themeInitScript } from "@/lib/theme";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument",
});

const SITE_URL = "https://eraycevik.com";

export const dynamicParams = false;

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);

  const path = `/${lang}`;
  const languageAlternates: Record<string, string> = {
    "x-default": `${SITE_URL}/${defaultLocale}`,
  };
  for (const l of locales) {
    languageAlternates[l] = `${SITE_URL}/${l}`;
  }

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: dict.meta.title,
      template: dict.meta.titleTemplate,
    },
    description: dict.meta.description,
    applicationName: "Eray Kaan Cevik",
    authors: [{ name: "Eray Kaan Cevik", url: SITE_URL }],
    creator: "Eray Kaan Cevik",
    category: "technology",
    keywords: [
      "Eray Kaan Cevik",
      "Portfolio",
      "Developer",
      ".NET",
      "Blazor",
      "MudForge",
      "Galaxus",
      "Schweiz",
      "Zürich",
      "Full Stack",
    ],
    alternates: {
      canonical: SITE_URL + path,
      languages: languageAlternates,
    },
    openGraph: {
      type: "website",
      siteName: "Eray Kaan Cevik",
      title: dict.meta.title,
      description: dict.meta.description,
      url: SITE_URL + path,
      locale: ogLocaleMap[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => ogLocaleMap[l]),
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  return (
    <html lang={lang} suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen bg-bg text-fg">
        <ThemeProvider>
          <LanguageProvider lang={lang as Locale} dict={dict}>
            <div
              className="pointer-events-none fixed inset-x-0 top-0 z-1 h-[60vh] opacity-60"
              style={{ background: "radial-gradient(ellipse 60% 100% at 50% 0%, var(--ek-radial-top), transparent 60%)" }}
            />
            <Navbar />
            {children}
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
