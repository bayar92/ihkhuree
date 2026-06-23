import type { Locale } from "@/i18n/routing";

const LOCALE_TAG: Record<Locale, string> = {
  mn: "mn-MN",
  en: "en-US",
  ja: "ja-JP",
};

/** Format dates with a fixed UTC timezone so SSR and hydration match. */
export function formatDate(
  value: Date | string,
  locale: Locale,
  options: Intl.DateTimeFormatOptions,
): string {
  const date = typeof value === "string" ? new Date(value) : value;
  return date.toLocaleDateString(LOCALE_TAG[locale], {
    timeZone: "UTC",
    ...options,
  });
}

export function utcParts(date: Date) {
  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth(),
    day: date.getUTCDate(),
  };
}
