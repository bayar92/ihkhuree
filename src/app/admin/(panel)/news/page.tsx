import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { pick } from "@/lib/i18n";
import { deleteNews } from "../../actions";
import { AdminHeader, LinkButton } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default async function NewsListPage() {
  const news = await prisma.news.findMany({ orderBy: { publishedAt: "desc" } });

  return (
    <div>
      <AdminHeader
        title="Мэдээ"
        action={<LinkButton href="/admin/news/new">+ Мэдээ нэмэх</LinkButton>}
      />
      <div className="space-y-3">
        {news.map((n) => (
          <div
            key={n.id}
            className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white px-5 py-4 shadow-sm"
          >
            <div>
              <p className="font-medium text-neutral-900">{pick(n.title, "mn")}</p>
              <p className="text-xs text-neutral-400">
                {new Date(n.publishedAt).toLocaleDateString("mn")} ·{" "}
                {n.published ? (
                  <span className="text-green-600">Нийтлэгдсэн</span>
                ) : (
                  <span className="text-amber-600">Ноорог</span>
                )}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={`/admin/news/${n.id}`}
                className="text-sm font-medium text-brand-600 hover:underline"
              >
                Засах
              </Link>
              <form action={deleteNews}>
                <input type="hidden" name="id" value={n.id} />
                <button className="text-sm font-medium text-red-600 hover:underline">
                  Устгах
                </button>
              </form>
            </div>
          </div>
        ))}
        {news.length === 0 && (
          <p className="text-sm text-neutral-500">Одоогоор мэдээ алга.</p>
        )}
      </div>
    </div>
  );
}
