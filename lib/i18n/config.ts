export const locales = ["de", "en", "tr"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "de";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export const localeNames: Record<Locale, { code: string; name: string }> = {
  de: { code: "DE", name: "Deutsch" },
  en: { code: "EN", name: "English" },
  tr: { code: "TR", name: "Türkçe" },
};

export const ogLocaleMap: Record<Locale, string> = {
  de: "de_CH",
  en: "en_US",
  tr: "tr_TR",
};
