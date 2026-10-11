import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminHeader } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

const REQUEST_STATUS_LABEL: Record<string, string> = {
  submitted: "Шинэ",
  in_review: "Хянаж байна",
  proposed: "Санал болгосон",
  connected: "Холбогдсон",
  closed: "Хаагдсан",
};

const KIND_LABEL: Record<string, string> = {
  member: "Гишүүн",
  expert: "Мэргэжилтэн",
  partner: "Түнш байгууллага",
  learning: "Суралцах / зөвлөгөө",
};

const TABS = [
  { key: "open", label: "Нээлттэй", statuses: ["submitted", "in_review", "proposed"] },
  { key: "connected", label: "Холбогдсон", statuses: ["connected"] },
  { key: "closed", label: "Хаагдсан", statuses: ["closed"] },
] as const;

export default async function ConnectionsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab: raw } = await searchParams;
  const tab = TABS.find((t) => t.key === raw) ?? TABS[0];

  const [requests, counts] = await Promise.all([
    prisma.connectionRequest.findMany({
      where: { status: { in: [...tab.statuses] } },
      orderBy: { createdAt: tab.key === "open" ? "asc" : "desc" },
      include: {
        requester: { select: { name: true, profile: { select: { organization: true } } } },
        _count: { select: { matches: true } },
      },
    }),
    prisma.connectionRequest.groupBy({ by: ["status"], _count: true }),
  ]);
  const countOf = (statuses: readonly string[]) =>
    counts.filter((c) => statuses.includes(c.status)).reduce((n, c) => n + c._count, 0);

  return (
    <div>
      <AdminHeader
        title="Холболтын хүсэлтүүд"
        description="Гишүүдийн илгээсэн хүсэлтийг хянаж, тохирох гишүүн, мэргэжилтэн эсвэл байгууллагатай холбоно."
        action={
          <Link
            href="/admin/directory"
            className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
          >
            Мэргэжилтний лавлах
          </Link>
        }
      />

      <div className="mb-5 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <Link
            key={t.key}
            href={`/admin/connections?tab=${t.key}`}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              tab.key === t.key
                ? "bg-brand-600 text-white"
                : "border border-neutral-300 bg-white text-neutral-600 hover:bg-neutral-50"
            }`}
          >
            {t.label} ({countOf(t.statuses)})
          </Link>
        ))}
      </div>

      <div className="space-y-3">
        {requests.map((r) => (
          <Link
            key={r.id}
            href={`/admin/connections/${r.id}`}
            className="block rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:border-brand-300"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-neutral-900">{r.topic}</p>
                <p className="text-sm text-neutral-500">
                  {r.requester.name}
                  {r.requester.profile?.organization &&
                    ` · ${r.requester.profile.organization}`}
                </p>
              </div>
              <div className="text-right text-xs text-neutral-400">
                <p>{new Date(r.createdAt).toLocaleString("mn")}</p>
                <p className="mt-1 font-medium text-brand-700">
                  {REQUEST_STATUS_LABEL[r.status]} · {KIND_LABEL[r.kind]}
                  {r._count.matches > 0 && ` · ${r._count.matches} санал`}
                </p>
              </div>
            </div>
          </Link>
        ))}
        {requests.length === 0 && (
          <p className="rounded-xl border border-dashed border-neutral-300 p-8 text-center text-sm text-neutral-500">
            Хүсэлт алга.
          </p>
        )}
      </div>
    </div>
  );
}
