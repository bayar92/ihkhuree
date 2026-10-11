import { prisma } from "@/lib/prisma";
import { AdminHeader, LinkButton, SavedBanner } from "@/components/admin/ui";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function DirectoryPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const entries = await prisma.directoryEntry.findMany({
    orderBy: [{ active: "desc" }, { name: "asc" }],
  });

  return (
    <div>
      <AdminHeader
        title="Мэргэжилтний лавлах"
        description="Нэвтрэх эрхгүй мэргэжилтэн, түнш байгууллагууд. Холбоо барих мэдээлэл зөвхөн ажилтанд харагдана."
        action={<LinkButton href="/admin/directory/new">+ Нэмэх</LinkButton>}
      />
      <SavedBanner show={saved === "1"} />
      <div className="space-y-3">
        {entries.map((e) => (
          <Link
            key={e.id}
            href={`/admin/directory/${e.id}`}
            className={`block rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:border-brand-300 ${e.active ? "" : "opacity-60"}`}
          >
            <p className="font-semibold text-neutral-900">
              {e.name}{" "}
              <span className="text-xs font-normal text-neutral-400">
                {e.kind === "organization" ? "байгууллага" : "мэргэжилтэн"}
                {!e.active && " · идэвхгүй"}
              </span>
            </p>
            <p className="text-sm text-neutral-500">
              {[e.title, e.organization].filter(Boolean).join(" · ") || "—"}
            </p>
            {e.expertise.length > 0 && (
              <p className="mt-1 text-xs text-brand-700">{e.expertise.join(", ")}</p>
            )}
          </Link>
        ))}
        {entries.length === 0 && (
          <p className="rounded-xl border border-dashed border-neutral-300 p-8 text-center text-sm text-neutral-500">
            Одоогоор бүртгэл алга.
          </p>
        )}
      </div>
    </div>
  );
}
