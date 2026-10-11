import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminHeader, Card } from "@/components/admin/ui";
import {
  addMatch,
  recordEntryResponse,
  saveStaffNote,
  setRequestStatus,
  withdrawMatch,
} from "../../../connection-actions";

export const dynamic = "force-dynamic";

const ERRORS: Record<string, string> = {
  self: "Хүсэлт гаргагчийг өөртэй нь холбох боломжгүй.",
  target: "Сонгосон хүн/байгууллага олдсонгүй эсвэл идэвхгүй байна.",
  duplicate: "Энэ хүсэлтэд тухайн хүнийг аль хэдийн санал болгосон байна.",
};
const STATUS: Record<string, string> = {
  submitted: "Шинэ",
  in_review: "Хянаж байна",
  proposed: "Санал болгосон",
  connected: "Холбогдсон",
  closed: "Хаагдсан",
};
const MATCH_STATUS: Record<string, string> = {
  proposed: "Хариу хүлээж байна",
  connected: "Холбогдсон",
  declined: "Татгалзсан",
  withdrawn: "Цуцалсан",
};
const ANSWER: Record<string, string> = {
  pending: "хүлээж байна",
  accepted: "зөвшөөрсөн",
  declined: "татгалзсан",
};

export default async function ConnectionDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const [{ id }, { error }] = await Promise.all([params, searchParams]);

  const request = await prisma.connectionRequest.findUnique({
    where: { id },
    include: {
      requester: { include: { profile: true } },
      matches: {
        orderBy: { createdAt: "asc" },
        include: {
          targetMember: { include: { profile: true } },
          targetEntry: true,
        },
      },
    },
  });
  if (!request) notFound();

  const [members, entries] = await Promise.all([
    prisma.user.findMany({
      where: { role: "member", status: "approved", id: { not: request.requesterId } },
      orderBy: { name: "asc" },
      select: { id: true, name: true, profile: { select: { organization: true, offers: true } } },
    }),
    prisma.directoryEntry.findMany({
      where: { active: true },
      orderBy: { name: "asc" },
      select: { id: true, kind: true, name: true, organization: true, expertise: true },
    }),
  ]);
  const taken = new Set(
    request.matches
      .filter((m) => m.status !== "withdrawn" && m.status !== "declined")
      .map((m) => m.targetMemberId ?? m.targetEntryId),
  );

  const open = request.status !== "closed";
  const seeks = request.requester.profile?.seeks ?? [];

  return (
    <div className="space-y-5">
      <Link href="/admin/connections" className="text-sm text-neutral-500 hover:text-brand-700">
        ← Бүх хүсэлт
      </Link>
      <AdminHeader title={request.topic} description={`Төлөв: ${STATUS[request.status]}`} />
      {error && ERRORS[error] && (
        <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
          {ERRORS[error]}
        </p>
      )}

      <Card>
        <p className="font-semibold text-neutral-900">{request.requester.name}</p>
        <p className="text-sm text-neutral-500">
          {request.requester.email}
          {request.requester.profile?.organization && ` · ${request.requester.profile.organization}`}
        </p>
        <p className="mt-4 whitespace-pre-line text-sm text-neutral-800">{request.details}</p>
        {seeks.length > 0 && (
          <p className="mt-3 text-xs text-neutral-500">
            Профайл дахь хүсэж буй сэдвүүд: {seeks.join(", ")}
          </p>
        )}
      </Card>

      <Card>
        <h2 className="mb-3 font-semibold text-neutral-900">Санал болгосон холболтууд</h2>
        {request.matches.length === 0 && (
          <p className="text-sm text-neutral-500">Одоогоор санал болгоогүй байна.</p>
        )}
        <ul className="space-y-4">
          {request.matches.map((m) => {
            const name = m.targetMember?.name ?? m.targetEntry?.name;
            return (
              <li key={m.id} className="rounded-lg border border-neutral-200 p-4 text-sm">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-neutral-900">
                      {name}{" "}
                      <span className="text-xs font-normal text-neutral-400">
                        {m.targetMember ? "гишүүн" : m.targetEntry?.kind === "organization" ? "байгууллага" : "мэргэжилтэн"}
                      </span>
                    </p>
                    <p className="text-neutral-500">
                      {m.targetMember?.email ?? m.targetEntry?.contactEmail ?? "—"}
                      {m.targetEntry?.contactPhone && ` · ${m.targetEntry.contactPhone}`}
                    </p>
                  </div>
                  <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
                    {MATCH_STATUS[m.status]}
                  </span>
                </div>
                {m.introNote && <p className="mt-2 text-neutral-700">{m.introNote}</p>}
                <p className="mt-2 text-xs text-neutral-500">
                  Хүсэлт гаргагч: {ANSWER[m.requesterResponse]} · Нөгөө тал: {ANSWER[m.targetResponse]}
                </p>

                {m.status === "proposed" && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {m.targetEntryId && m.targetResponse === "pending" && (
                      <form action={recordEntryResponse} className="flex gap-2">
                        <input type="hidden" name="matchId" value={m.id} />
                        <button name="answer" value="accepted" className="rounded-md bg-brand-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-brand-700">
                          Тэд зөвшөөрсөн
                        </button>
                        <button name="answer" value="declined" className="rounded-md border border-neutral-300 px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50">
                          Тэд татгалзсан
                        </button>
                      </form>
                    )}
                    <form action={withdrawMatch}>
                      <input type="hidden" name="matchId" value={m.id} />
                      <button className="rounded-md border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50">
                        Саналыг цуцлах
                      </button>
                    </form>
                  </div>
                )}
                {m.status === "connected" && (
                  <p className="mt-2 text-xs font-medium text-green-800">
                    Хоёр тал зөвшөөрсөн — та хоёрыг танилцуулж холбоо барих мэдээллийг дамжуулна уу.
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </Card>

      {open && (
        <Card>
          <h2 className="mb-3 font-semibold text-neutral-900">Холболт санал болгох</h2>
          <form action={addMatch} className="space-y-3">
            <input type="hidden" name="requestId" value={request.id} />
            <select
              name="target"
              required
              defaultValue=""
              className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-sm"
            >
              <option value="" disabled>Сонгох...</option>
              <optgroup label="Гишүүд">
                {members.filter((u) => !taken.has(u.id)).map((u) => (
                  <option key={u.id} value={`m:${u.id}`}>
                    {u.name}
                    {u.profile?.organization ? ` · ${u.profile.organization}` : ""}
                    {u.profile?.offers.length ? ` — ${u.profile.offers.join(", ")}` : ""}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Мэргэжилтэн / байгууллага">
                {entries.filter((e) => !taken.has(e.id)).map((e) => (
                  <option key={e.id} value={`e:${e.id}`}>
                    {e.name}
                    {e.organization ? ` · ${e.organization}` : ""}
                    {e.expertise.length ? ` — ${e.expertise.join(", ")}` : ""}
                  </option>
                ))}
              </optgroup>
            </select>
            <textarea
              name="introNote"
              rows={3}
              maxLength={1000}
              placeholder="Яагаад тохирох вэ? (хоёр талд харагдана)"
              className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm"
            />
            <button className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">
              Санал болгох
            </button>
          </form>
        </Card>
      )}

      <Card>
        <h2 className="mb-3 font-semibold text-neutral-900">Дотоод тэмдэглэл</h2>
        <form action={saveStaffNote} className="space-y-3">
          <input type="hidden" name="requestId" value={request.id} />
          <textarea
            name="staffNote"
            rows={3}
            maxLength={2000}
            defaultValue={request.staffNote ?? ""}
            placeholder="Гишүүдэд харагдахгүй"
            className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm"
          />
          <button className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
            Хадгалах
          </button>
        </form>

        <form action={setRequestStatus} className="mt-5 flex flex-wrap gap-2 border-t border-neutral-100 pt-4">
          <input type="hidden" name="requestId" value={request.id} />
          {request.status === "submitted" && (
            <button name="status" value="in_review" className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700">
              Хянаж эхлэх
            </button>
          )}
          {request.status !== "closed" ? (
            <button name="status" value="closed" className="rounded-md border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50">
              Хүсэлтийг хаах
            </button>
          ) : (
            <button name="status" value="in_review" className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
              Дахин нээх
            </button>
          )}
        </form>
      </Card>
    </div>
  );
}
