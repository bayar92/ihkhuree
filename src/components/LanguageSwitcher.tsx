"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { locales, type Locale } from "@/i18n/routing";

const labels: Record<Locale, string> = {
  mn: "МН",
  en: "EN",
  ja: "日本語",
};

const fullLabels: Record<Locale, string> = {
  mn: "Монгол",
  en: "English",
  ja: "日本語",
};

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function switchTo(next: Locale) {
    setOpen(false);
    // @ts-expect-error -- params are forwarded as-is for dynamic segments
    router.replace({ pathname, params }, { locale: next });
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 rounded-md px-2 py-1.5 text-sm font-medium text-brand-700 transition hover:bg-brand-50"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {labels[locale]}
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`transition ${open ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-1 w-32 overflow-hidden rounded-lg border border-neutral-200 bg-white py-1 shadow-lg"
        >
          {locales.map((l) => (
            <li key={l}>
              <button
                type="button"
                onClick={() => switchTo(l)}
                className={`block w-full px-3 py-2 text-left text-sm transition hover:bg-brand-50 ${
                  l === locale ? "font-semibold text-brand-700" : "text-neutral-700"
                }`}
              >
                {fullLabels[l]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
