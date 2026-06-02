"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { BrandLogo } from "./BrandLogo";
import { LanguageSwitcher } from "./LanguageSwitcher";

const links = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/membership", key: "membership" },
  { href: "/services", key: "services" },
  { href: "/news", key: "news" },
  { href: "/events", key: "events" },
  { href: "/contact", key: "contact" },
] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <BrandLogo size={46} priority />
          <span className="leading-tight">
            <span className="block font-serif text-xl font-semibold tracking-wide text-brand-700">
              Ikh Khuree
            </span>
            <span className="block text-[11px] text-neutral-500">
              international business cooperation association
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex">
          {links.map((l) => {
            const active = isActive(l.href);
            return (
              <Link
                key={l.key}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`group relative whitespace-nowrap px-2.5 py-2 text-[13px] font-medium uppercase transition-colors ${
                  active ? "text-brand-700" : "text-neutral-600 hover:text-brand-700"
                }`}
              >
                {t(l.key)}
                <span
                  className={`pointer-events-none absolute inset-x-2.5 bottom-1 h-0.5 origin-left rounded-full bg-brand-600 transition-transform duration-300 ease-out ${
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Link
            href="/join"
            className="hidden rounded-full border border-brand-600 px-5 py-2 text-sm font-semibold text-brand-700 transition hover:bg-brand-600 hover:text-white sm:inline-block"
          >
            {t("join")}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="rounded-md p-2 text-brand-700 xl:hidden"
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-neutral-100 bg-white xl:hidden">
          <div className="mx-auto max-w-7xl space-y-1 px-4 py-3">
            {links.map((l) => (
              <Link
                key={l.key}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`block rounded-md px-3 py-2 text-sm font-medium uppercase ${
                  isActive(l.href)
                    ? "bg-brand-50 text-brand-700"
                    : "text-neutral-700 hover:bg-neutral-50"
                }`}
              >
                {t(l.key)}
              </Link>
            ))}
            <Link
              href="/join"
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-full bg-brand-600 px-4 py-2 text-center text-sm font-semibold text-white"
            >
              {t("join")}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
