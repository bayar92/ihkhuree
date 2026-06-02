import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { pick } from "@/lib/i18n";
import { deleteEvent } from "../../actions";
import { AdminHeader, LinkButton } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default async function EventsListPage() {
  const events = await prisma.event.findMany({ orderBy: { startsAt: "asc" } });

  return (
    <div>
      <AdminHeader
        title="Арга хэмжээ"
        action={<LinkButton href="/admin/events/new">+ Арга хэмжээ нэмэх</LinkButton>}
      />
      <div className="space-y-3">
        {events.map((e) => (
          <div
            key={e.id}
            className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white px-5 py-4 shadow-sm"
          >
            <div>
              <p className="font-medium text-neutral-900">{pick(e.title, "mn")}</p>
              <p className="text-xs text-neutral-400">
                {new Date(e.startsAt).toLocaleString("mn")} ·{" "}
                {e.published ? (
                  <span className="text-green-600">Нийтлэгдсэн</span>
                ) : (
                  <span className="text-amber-600">Ноорог</span>
                )}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={`/admin/events/${e.id}`}
                className="text-sm font-medium text-brand-600 hover:underline"
              >
                Засах
              </Link>
              <form action={deleteEvent}>
                <input type="hidden" name="id" value={e.id} />
                <button className="text-sm font-medium text-red-600 hover:underline">
                  Устгах
                </button>
              </form>
            </div>
          </div>
        ))}
        {events.length === 0 && (
          <p className="text-sm text-neutral-500">Одоогоор арга хэмжээ алга.</p>
        )}
      </div>
    </div>
  );
}
