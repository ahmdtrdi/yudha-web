import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { localizedHref } from "@/lib/landing-copy";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = ["/", "/about", "/contact"].flatMap((pathname) =>
    (["id", "en"] as const).map((locale) => ({
      url: `${SITE_URL}${localizedHref(pathname, locale)}`,
      alternates: { languages: { id: `${SITE_URL}${localizedHref(pathname, "id")}`, en: `${SITE_URL}${localizedHref(pathname, "en")}` } },
    })),
  );
  return [...entries, { url: `${SITE_URL}/privacy-policy` }];
}
