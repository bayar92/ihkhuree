import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { pick } from "@/lib/i18n";
import { deleteFocusArea } from "../../actions";
import { AdminHeader, LinkButton } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default async function FocusAreasListPage() {
  const areas = await prisma.focusArea.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <AdminHeader
        title="Үйл ажиллагааны чиглэл"
        description="Нүүр хуудасны доод хэсгийн цэнхэр зурвас."
        action={<LinkButton href="/admin/focus-areas/new">+ Нэмэх</LinkButton>}
      />
      <div className="space-y-3">
        {areas.map((a) => (
          <div
            key={a.id}
            className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white px-5 py-4 shadow-sm"
          >
            <div>
              <p className="font-medium text-neutral-900">{pick(a.label, "mn")}</p>
              <p className="text-xs text-neutral-400">
                {a.icon} · эрэмбэ {a.order}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={`/admin/focus-areas/${a.id}`}
                className="text-sm font-medium text-brand-600 hover:underline"
              >
                Засах
              </Link>
              <form action={deleteFocusArea}>
                <input type="hidden" name="id" value={a.id} />
                <button className="text-sm font-medium text-red-600 hover:underline">
                  Устгах
                </button>
              </form>
            </div>
          </div>
        ))}
        {areas.length === 0 && (
          <p className="text-sm text-neutral-500">Одоогоор бичлэг алга.</p>
        )}
      </div>
    </div>
  );
}
