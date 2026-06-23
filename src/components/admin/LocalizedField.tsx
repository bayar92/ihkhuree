"use client";

import { useEffect, useState } from "react";
import { locales, type Locale } from "@/i18n/routing";
import { pick } from "@/lib/i18n";

const localeLabels: Record<Locale, string> = {
  mn: "Монгол",
  en: "English",
  ja: "日本語",
};

export function LocalizedField({
  name,
  label,
  defaultValue,
  values,
  onChange,
  viewLocale,
  textarea = false,
  required = false,
  rows = 4,
}: {
  name: string;
  label: string;
  defaultValue?: unknown;
  values?: Record<Locale, string>;
  onChange?: (locale: Locale, value: string) => void;
  viewLocale?: Locale;
  textarea?: boolean;
  required?: boolean;
  rows?: number;
}) {
  const [active, setActive] = useState<Locale>("mn");
  const controlled = values != null && onChange != null;

  useEffect(() => {
    if (viewLocale) setActive(viewLocale);
  }, [viewLocale]);

  const field =
    "w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100";

  function valueFor(locale: Locale): string {
    if (controlled) return values[locale] ?? "";
    if (defaultValue && typeof defaultValue === "object") {
      return pick({ [locale]: (defaultValue as Record<string, unknown>)[locale] }, locale);
    }
    return "";
  }

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label className="text-sm font-medium text-neutral-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="flex gap-1 rounded-md bg-neutral-100 p-0.5">
          {locales.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setActive(l)}
              className={`rounded px-2 py-0.5 text-xs font-medium transition ${
                active === l
                  ? "bg-white text-brand-700 shadow-sm"
                  : "text-neutral-500 hover:text-neutral-700"
              }`}
            >
              {localeLabels[l]}
            </button>
          ))}
        </div>
      </div>
      {locales.map((l) => {
        const value = valueFor(l);
        return (
          <div key={l} className={active === l ? "block" : "hidden"}>
            {textarea ? (
              <textarea
                name={`${name}.${l}`}
                value={controlled ? value : undefined}
                defaultValue={controlled ? undefined : value}
                onChange={
                  controlled ? (e) => onChange(l, e.target.value) : undefined
                }
                rows={rows}
                required={required && l === "mn"}
                className={field}
              />
            ) : (
              <input
                name={`${name}.${l}`}
                value={controlled ? value : undefined}
                defaultValue={controlled ? undefined : value}
                onChange={
                  controlled ? (e) => onChange(l, e.target.value) : undefined
                }
                required={required && l === "mn"}
                className={field}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
