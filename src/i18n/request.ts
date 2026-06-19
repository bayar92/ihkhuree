import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
import { prisma, safe } from "@/lib/prisma";
import { deepMerge } from "@/lib/content";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const fileMessages = (await import(`../messages/${locale}.json`)).default;

  // Merge any admin-edited UI string overrides (stored under the `ui` key,
  // shaped as { mn: {...}, en: {...}, ja: {...} }) on top of the file defaults.
  const row = await safe(
    prisma.siteContent.findUnique({ where: { key: "ui" } }),
    null,
  );
  const overrides = row?.value as Record<string, unknown> | undefined;
  const localeOverride = overrides?.[locale];
  const messages = localeOverride
    ? deepMerge(fileMessages, localeOverride)
    : fileMessages;

  return { locale, messages };
});
