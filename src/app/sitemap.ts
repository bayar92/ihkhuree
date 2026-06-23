import type { MetadataRoute } from "next";
import { locales, routing } from "@/i18n/routing";
import { prisma, safe } from "@/lib/prisma";
import { getSiteUrl } from "@/lib/site-url";

const STATIC_PATHS = [
  "",
  "/about",
  "/membership",
  "/services",
  "/contact",
  "/news",
  "/events",
  "/join",
] as const;

function localizedUrl(locale: string, path: string) {
  const base = getSiteUrl();
  return path ? `${base}/${locale}${path}` : `${base}/${locale}`;
}

function localizedEntry(
  path: string,
  options?: {
    lastModified?: Date;
    changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority?: number;
  },
): MetadataRoute.Sitemap[number] {
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedUrl(locale, path)]),
  );

  return {
    url: localizedUrl(routing.defaultLocale, path),
    lastModified: options?.lastModified,
    changeFrequency: options?.changeFrequency,
    priority: options?.priority,
    alternates: { languages },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = STATIC_PATHS.map((path) =>
    localizedEntry(path, {
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority: path === "" ? 1 : 0.8,
    }),
  );

  const news = await safe(
    prisma.news.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
      orderBy: { publishedAt: "desc" },
    }),
    [],
  );

  const newsEntries = news.map((item) =>
    localizedEntry(`/news/${item.slug}`, {
      lastModified: item.updatedAt,
      changeFrequency: "weekly",
      priority: 0.7,
    }),
  );

  return [...staticEntries, ...newsEntries];
}
