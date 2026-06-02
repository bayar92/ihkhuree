import { defineRouting } from "next-intl/routing";

export const locales = ["mn", "en", "ja"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "mn",
  localePrefix: "always",
});
