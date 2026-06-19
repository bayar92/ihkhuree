"use client";

import { useState } from "react";
import { locales, type Locale } from "@/i18n/routing";
import { EditorForm, Section } from "./fields";

type Tree = Record<string, Record<string, string>>;
export type AllMessages = Record<Locale, Tree>;

const nsLabels: Record<string, string> = {
  nav: "Цэс / Лого",
  common: "Нийтлэг товч",
  home: "Нүүр хуудас",
  contact: "Холбоо барих",
  join: "Элсэх",
  footer: "Хөл",
  admin: "Админ",
};

const localeLabels: Record<Locale, string> = {
  mn: "Монгол",
  en: "English",
  ja: "日本語",
};

export function TranslationsEditor({ initial }: { initial: AllMessages }) {
  const [m, setM] = useState<AllMessages>(initial);

  // Namespaces and keys are derived from the Mongolian tree (the source of truth).
  const namespaces = Object.keys(m.mn ?? {});

  function update(locale: Locale, ns: string, key: string, value: string) {
    setM((prev) => {
      const next = structuredClone(prev);
      next[locale] = next[locale] ?? {};
      next[locale][ns] = next[locale][ns] ?? {};
      next[locale][ns][key] = value;
      return next;
    });
  }

  return (
    <EditorForm contentKey="ui" value={m}>
      {namespaces.map((ns) => {
        const keys = Object.keys(m.mn[ns] ?? {});
        return (
          <Section key={ns} title={nsLabels[ns] ?? ns}>
            {keys.map((key) => (
              <div key={key} className="rounded-lg border border-neutral-200 p-4">
                <p className="mb-2 font-mono text-xs text-neutral-500">
                  {ns}.{key}
                </p>
                <div className="space-y-2">
                  {locales.map((l) => (
                    <div key={l} className="flex items-center gap-3">
                      <span className="w-20 shrink-0 text-xs font-medium text-neutral-500">
                        {localeLabels[l]}
                      </span>
                      <input
                        value={m[l]?.[ns]?.[key] ?? ""}
                        onChange={(e) => update(l, ns, key, e.target.value)}
                        className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </Section>
        );
      })}
    </EditorForm>
  );
}
