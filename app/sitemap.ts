import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/lib/i18n/config";

const SITE_URL = "https://eraycevik.com";

const routes = ["", "/impressum", "/datenschutz"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => {
    const languages = Object.fromEntries(
      locales.map((l) => [l, `${SITE_URL}/${l}${route}`])
    );
    return {
      url: `${SITE_URL}/${defaultLocale}${route}`,
      lastModified,
      changeFrequency: route === "" ? "monthly" : "yearly",
      priority: route === "" ? 1 : 0.3,
      alternates: { languages },
    };
  });
}
