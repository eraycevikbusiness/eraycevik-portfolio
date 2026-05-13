import "server-only";
import type { Locale } from "./config";
import type { Dictionary } from "./dict.de";

const loaders: Record<Locale, () => Promise<Dictionary>> = {
  de: () => import("./dict.de").then((m) => m.dict),
  en: () => import("./dict.en").then((m) => m.dict),
  tr: () => import("./dict.tr").then((m) => m.dict),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return loaders[locale]();
}
