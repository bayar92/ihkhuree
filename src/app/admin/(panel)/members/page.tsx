import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { setMemberStatus } from "../../member-actions";
import { AdminHeader } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

const TABS = [
  { status: "pending", label: "Хүлээгдэж буй" },
  { status: "approved", label: "Баталгаажсан" },
  { status: "rejected", label: "Татгалзсан" },
] as const;

const TYPE_LABEL: Record<string, string> = {
  corporate: "Корпорат",
  premium: "Премиум",
  associate: "Гишүүн",
  student: "Оюутан",
};

// Which buttons to offer for each current status.
const ACTIONS: Record<string, { action: string; label: string; tone: string }[]> = {
  pending: [
    { action: "approve", label: "Баталгаажуулах", tone: "bg-brand-600 text-white hover:bg-brand-700" },
    { action: "reject", label: "Татгалзах", tone: "border border-red-200 text-red-600 hover:bg-red-50" },
  ],
  approved: [
    { action: "reject", label: "Эрх хаах", tone: "border border-red-200 text-red-600 hover:bg-red-50" },
  ],
  rejected: [
    { action: "approve", label: "Баталгаажуулах", tone: "bg-brand-600 text-white hover:bg-brand-700" },
    { action: "reopen", label: "Хүлээгдэж буйд буцаах", tone: "border border-neutral-300 text-neutral-700 hover:bg-neutral-50" },
  ],
};

export default async function MembersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status: raw } = await searchParams;
  const status = TABS.find((t) => t.status === raw)?.status ?? "pending";

  const [members, counts] = await Promise.all([
    prisma.user.findMany({
      where: { role: "member", status },
      include: { profile: true },
      orderBy: { createdAt: status === "pending" ? "asc" : "desc" },
    }),
    prisma.user.groupBy({
      by: ["status"],
      where: { role: "member" },
      _count: true,
    }),
  ]);
  const countOf = (s: string) => counts.find((c) => c.status === s)?._count ?? 0;

  return (
    <div>
      <AdminHeader
        title="Гишүүдийн бүртгэл"
        description="Вэбээр бүртгүүлсэн гишүүдийг хянаж баталгаажуулна. Баталгаажсан гишүүн л нэвтэрч чадна."
      />

      <div className="mb-5 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <Link
            key={t.status}
            href={`/admin/members?status=${t.status}`}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              status === t.status
                ? "bg-brand-600 text-white"
                : "border border-neutral-300 bg-white text-neutral-600 hover:bg-neutral-50"
            }`}
          >
            {t.label} ({countOf(t.status)})
          </Link>
        ))}
      </div>

      <div className="space-y-3">
        {members.map((m) => (
          <div
            key={m.id}
            className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-semibold text-neutral-900">{m.name}</p>
                <p className="text-sm text-neutral-500">{m.email}</p>
              </div>
              <span className="text-xs text-neutral-400">
                {new Date(m.createdAt).toLocaleString("mn")}
              </span>
            </div>

            <dl className="mt-3 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
              <div className="flex gap-2">
                <dt className="text-neutral-400">Байгууллага:</dt>
                <dd className="text-neutral-800">{m.profile?.organization ?? "—"}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-neutral-400">Албан тушаал:</dt>
                <dd className="text-neutral-800">{m.profile?.position ?? "—"}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-neutral-400">Улс/бүс нутаг:</dt>
                <dd className="text-neutral-800">{m.profile?.country ?? "—"}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-neutral-400">Төрөл:</dt>
                <dd className="text-neutral-800">
                  {TYPE_LABEL[m.profile?.membershipType ?? ""] ?? "—"}
                </dd>
              </div>
            </dl>

            {m.profile?.applicationNote && (
              <p className="mt-3 whitespace-pre-line rounded-lg bg-neutral-50 px-3 py-2 text-sm text-neutral-700">
                {m.profile.applicationNote}
              </p>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              {ACTIONS[m.status]?.map((a) => (
                <form key={a.action} action={setMemberStatus}>
                  <input type="hidden" name="id" value={m.id} />
                  <input type="hidden" name="action" value={a.action} />
                  <button
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition ${a.tone}`}
                  >
                    {a.label}
                  </button>
                </form>
              ))}
            </div>
          </div>
        ))}
        {members.length === 0 && (
          <p className="text-sm text-neutral-500">Энэ жагсаалт хоосон байна.</p>
        )}
      </div>
    </div>
  );
}
