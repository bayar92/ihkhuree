import { prisma } from "@/lib/prisma";
import { toggleInquiry, deleteInquiry } from "../../actions";
import { AdminHeader } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default async function InquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <AdminHeader
        title="Хүсэлтүүд"
        description="Холбоо барих болон элсэх хүсэлтүүд."
      />
      <div className="space-y-3">
        {inquiries.map((q) => (
          <div
            key={q.id}
            className={`rounded-xl border bg-white p-5 shadow-sm ${
              q.handled ? "border-neutral-200 opacity-70" : "border-brand-200"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-neutral-900">{q.name}</span>
                  <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[11px] font-medium text-neutral-500">
                    {q.type === "join" ? "Элсэх" : "Холбоо барих"}
                  </span>
                  {!q.handled && (
                    <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[11px] font-medium text-brand-700">
                      Шинэ
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-sm text-neutral-500">
                  {q.email}
                  {q.company ? ` · ${q.company}` : ""}
                </p>
              </div>
              <span className="text-xs text-neutral-400">
                {new Date(q.createdAt).toLocaleString("mn")}
              </span>
            </div>
            <p className="mt-3 whitespace-pre-line text-sm text-neutral-700">
              {q.message}
            </p>
            <div className="mt-3 flex gap-3">
              <form action={toggleInquiry}>
                <input type="hidden" name="id" value={q.id} />
                <button className="text-sm font-medium text-brand-600 hover:underline">
                  {q.handled ? "Шинэ болгох" : "Шийдвэрлэсэн"}
                </button>
              </form>
              <form action={deleteInquiry}>
                <input type="hidden" name="id" value={q.id} />
                <button className="text-sm font-medium text-red-600 hover:underline">
                  Устгах
                </button>
              </form>
            </div>
          </div>
        ))}
        {inquiries.length === 0 && (
          <p className="text-sm text-neutral-500">Одоогоор хүсэлт алга.</p>
        )}
      </div>
    </div>
  );
}
