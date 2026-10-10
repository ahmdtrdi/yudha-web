import type { Metadata } from "next";
import { localizedHref, type Locale } from "@/lib/landing-copy";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.yudha.fun").replace(/\/$/, "");

export function createPageMetadata(
  pathname: string,
  locale: Locale,
  copy: { title: string; description: string },
): Metadata {
  const url = localizedHref(pathname, locale);
  return {
    ...copy,
    alternates: {
      canonical: url,
      languages: {
        id: localizedHref(pathname, "id"),
        en: localizedHref(pathname, "en"),
        "x-default": localizedHref(pathname, "id"),
      },
    },
    openGraph: {
      ...copy,
      type: "website",
      siteName: "Yudha",
      url,
      locale: locale === "en" ? "en_US" : "id_ID",
      alternateLocale: locale === "en" ? "id_ID" : "en_US",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Yudha — aptitude practice, PvP duels, and AI mock interviews" }],
    },
    twitter: {
      card: "summary_large_image",
      ...copy,
      images: ["/opengraph-image"],
    },
  };
}
