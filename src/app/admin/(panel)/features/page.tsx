import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { pick } from "@/lib/i18n";
import { deleteFeature } from "../../actions";
import { AdminHeader, LinkButton } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default async function FeaturesListPage() {
  const features = await prisma.feature.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <AdminHeader
        title="Үнэт зүйлс"
        description="Нүүр хуудасны 4 онцлох карт."
        action={<LinkButton href="/admin/features/new">+ Нэмэх</LinkButton>}
      />
      <div className="space-y-3">
        {features.map((f) => (
          <div
            key={f.id}
            className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white px-5 py-4 shadow-sm"
          >
            <div>
              <p className="font-medium text-neutral-900">{pick(f.title, "mn")}</p>
              <p className="text-xs text-neutral-400">
                {f.icon} · эрэмбэ {f.order}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={`/admin/features/${f.id}`}
                className="text-sm font-medium text-brand-600 hover:underline"
              >
                Засах
              </Link>
              <form action={deleteFeature}>
                <input type="hidden" name="id" value={f.id} />
                <button className="text-sm font-medium text-red-600 hover:underline">
                  Устгах
                </button>
              </form>
            </div>
          </div>
        ))}
        {features.length === 0 && (
          <p className="text-sm text-neutral-500">Одоогоор бичлэг алга.</p>
        )}
      </div>
    </div>
  );
}
