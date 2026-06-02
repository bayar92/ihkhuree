"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/admin", label: "Хяналтын самбар", exact: true },
  { href: "/admin/hero", label: "Нүүр баннер" },
  { href: "/admin/features", label: "Үнэт зүйлс" },
  { href: "/admin/focus-areas", label: "Чиглэлүүд" },
  { href: "/admin/pages", label: "Хуудаснууд" },
  { href: "/admin/news", label: "Мэдээ" },
  { href: "/admin/events", label: "Арга хэмжээ" },
  { href: "/admin/inquiries", label: "Хүсэлтүүд" },
  { href: "/admin/settings", label: "Тохиргоо" },
];

export function Sidebar() {
  const pathname = usePathname();
  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  return (
    <nav className="space-y-1">
      {items.map((it) => (
        <Link
          key={it.href}
          href={it.href}
          className={`block rounded-lg px-3 py-2 text-sm font-medium transition ${
            isActive(it.href, it.exact)
              ? "bg-brand-600 text-white"
              : "text-neutral-600 hover:bg-neutral-100"
          }`}
        >
          {it.label}
        </Link>
      ))}
    </nav>
  );
}
