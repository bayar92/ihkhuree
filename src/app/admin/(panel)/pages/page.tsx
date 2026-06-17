import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { pick } from "@/lib/i18n";
import { AdminHeader } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

const knownPages = [
  { key: "about", label: "Бидний тухай" },
  { key: "membership", label: "Гишүүнчлэл" },
  { key: "services", label: "Зөвлөх үйлчилгээ" },
  { key: "contact", label: "Холбоо барих" },
];

export default async function PagesListPage() {
  const pages = await prisma.page.findMany();
  const byKey = new Map(pages.map((p) => [p.key, p]));

  return (
    <div>
      <AdminHeader
        title="Хуудаснууд"
        description="Статик хуудаснуудын агуулгыг засах."
      />
      <div className="space-y-3">
        {knownPages.map((kp) => {
          const p = byKey.get(kp.key);
          return (
            <Link
              key={kp.key}
              href={`/admin/pages/${kp.key}`}
              className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white px-5 py-4 shadow-sm transition hover:border-brand-300"
            >
              <div>
                <p className="font-medium text-neutral-900">{kp.label}</p>
                <p className="text-xs text-neutral-400">
                  /{kp.key}
                  {p ? ` · ${pick(p.title, "mn")}` : " · хоосон"}
                </p>
              </div>
              <span className="text-brand-500">→</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
