"use client";

import { useState } from "react";
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
  textarea = false,
  required = false,
  rows = 4,
}: {
  name: string;
  label: string;
  defaultValue?: unknown;
  textarea?: boolean;
  required?: boolean;
  rows?: number;
}) {
  const [active, setActive] = useState<Locale>("mn");

  const field =
    "w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100";

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
      {/* All three inputs always exist (one visible) so FormData includes every locale. */}
      {locales.map((l) => {
        const value =
          defaultValue && typeof defaultValue === "object"
            ? pick(
                { [l]: (defaultValue as Record<string, unknown>)[l] },
                l,
              )
            : "";
        return (
          <div key={l} className={active === l ? "block" : "hidden"}>
            {textarea ? (
              <textarea
                name={`${name}.${l}`}
                defaultValue={value}
                rows={rows}
                required={required && l === "mn"}
                className={field}
              />
            ) : (
              <input
                name={`${name}.${l}`}
                defaultValue={value}
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
