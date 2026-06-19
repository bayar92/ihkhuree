import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminHeader } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [news, events, inquiries, unhandled] = await Promise.all([
    prisma.news.count(),
    prisma.event.count(),
    prisma.inquiry.count(),
    prisma.inquiry.count({ where: { handled: false } }),
  ]);

  const stats = [
    { label: "Мэдээ", value: news, href: "/admin/news" },
    { label: "Арга хэмжээ", value: events, href: "/admin/events" },
    { label: "Нийт хүсэлт", value: inquiries, href: "/admin/inquiries" },
    { label: "Шинэ хүсэлт", value: unhandled, href: "/admin/inquiries" },
  ];

  return (
    <div>
      <AdminHeader
        title="Хяналтын самбар"
        description="Ikh Khuree сайтын агуулгыг эндээс удирдана."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:border-brand-300 hover:shadow"
          >
            <p className="text-3xl font-bold text-brand-700">{s.value}</p>
            <p className="mt-1 text-sm text-neutral-500">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {[
          { href: "/admin/hero", label: "Нүүр баннер засах" },
          { href: "/admin/home", label: "Нүүр хуудас засах" },
          { href: "/admin/about", label: "Бидний тухай засах" },
          { href: "/admin/membership", label: "Гишүүнчлэл засах" },
          { href: "/admin/translations", label: "Орчуулга засах" },
          { href: "/admin/news", label: "Мэдээ нэмэх" },
        ].map((q) => (
          <Link
            key={q.href}
            href={q.href}
            className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white px-5 py-4 text-sm font-medium text-neutral-700 shadow-sm transition hover:border-brand-300"
          >
            {q.label}
            <span className="text-brand-500">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
