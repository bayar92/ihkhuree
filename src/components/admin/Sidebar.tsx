"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/admin", label: "Хяналтын самбар", exact: true },
  { href: "/admin/hero", label: "Нүүр баннер" },
  { href: "/admin/home", label: "Нүүр хуудас" },
  { href: "/admin/features", label: "Үнэт зүйлс" },
  { href: "/admin/focus-areas", label: "Чиглэлүүд" },
  { href: "/admin/about", label: "Бидний тухай" },
  { href: "/admin/membership", label: "Гишүүнчлэл", exact: true },
  { href: "/admin/membership/certificates", label: "Гэрчилгээний зургууд", indent: true },
  { href: "/admin/pages", label: "Бусад хуудас" },
  { href: "/admin/translations", label: "Орчуулга (UI)" },
  { href: "/admin/news", label: "Мэдээ" },
  { href: "/admin/events", label: "Арга хэмжээ" },
  { href: "/admin/inquiries", label: "Хүсэлтүүд" },
  { href: "/admin/settings", label: "Тохиргоо" },
] as const;

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
          className={`block rounded-lg py-2 text-sm font-medium transition ${
            "indent" in it && it.indent ? "pl-6 pr-3" : "px-3"
          } ${
            isActive(it.href, "exact" in it ? it.exact : undefined)
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
