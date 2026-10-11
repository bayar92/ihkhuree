import { getTranslations, setRequestLocale } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { requireMember } from "@/lib/dal";
import { cancelRequest, respondToMatch } from "@/app/connection-actions";
import { PageHeader } from "@/components/PageHeader";
import { RequestForm } from "@/components/member/RequestForm";

export const dynamic = "force-dynamic";

const STATUS_TONE: Record<string, string> = {
  submitted: "bg-neutral-100 text-neutral-700",
  in_review: "bg-amber-50 text-amber-800",
  proposed: "bg-brand-50 text-brand-800",
  connected: "bg-green-50 text-green-800",
  closed: "bg-neutral-100 text-neutral-500",
  declined: "bg-red-50 text-red-700",
  withdrawn: "bg-neutral-100 text-neutral-500",
};

function Badge({ status, label }: { status: string; label: string }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_TONE[status] ?? ""}`}
    >
      {label}
    </span>
  );
}

export default async function ConnectionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const user = await requireMember(locale);
  const t = await getTranslations("member");

  // Only expose what the other side needs to decide: name, organization and
  // the topic. Contact details are never selected here.
  const [mine, incoming] = await Promise.all([
    prisma.connectionRequest.findMany({
      where: { requesterId: user.id },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        kind: true,
        topic: true,
        details: true,
        status: true,
        createdAt: true,
        matches: {
          orderBy: { createdAt: "asc" },
          select: {
            id: true,
            status: true,
            introNote: true,
            requesterResponse: true,
            targetMember: {
              select: { name: true, profile: { select: { organization: true } } },
            },
            targetEntry: {
              select: { kind: true, name: true, organization: true, title: true },
            },
          },
        },
      },
    }),
    prisma.match.findMany({
      where: { targetMemberId: user.id, status: { in: ["proposed", "connected"] } },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        status: true,
        introNote: true,
        targetResponse: true,
        request: {
          select: {
            kind: true,
            topic: true,
            details: true,
            requester: {
              select: { name: true, profile: { select: { organization: true } } },
            },
          },
        },
      },
    }),
  ]);

  return (
    <>
      <PageHeader title={t("connections.title")} intro={t("connections.intro")} />
      <section className="bg-white">
        <div className="mx-auto max-w-2xl space-y-12 px-4 py-14 sm:px-6 lg:px-8">
          {incoming.length > 0 && (
            <div>
              <h2 className="mb-1 font-serif text-2xl font-bold text-brand-700">
                {t("connections.incoming")}
              </h2>
              <p className="mb-4 text-sm text-neutral-600">
                {t("connections.incomingIntro")}
              </p>
              <div className="space-y-3">
                {incoming.map((m) => (
                  <div
                    key={m.id}
                    className="rounded-xl border border-neutral-200 bg-neutral-50 p-5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <p className="font-semibold text-neutral-900">
                        {m.request.topic}
                      </p>
                      <Badge
                        status={m.status}
                        label={t(`connections.matchStatus.${m.status}`)}
                      />
                    </div>
                    <p className="mt-1 text-sm text-neutral-500">
                      {t("connections.from")}: {m.request.requester.name}
                      {m.request.requester.profile?.organization &&
                        ` · ${m.request.requester.profile.organization}`}
                    </p>
                    <p className="mt-3 whitespace-pre-line text-sm text-neutral-700">
                      {m.request.details}
                    </p>
                    {m.introNote && (
                      <p className="mt-3 rounded-lg bg-white px-3 py-2 text-sm text-neutral-700">
                        <span className="font-medium">{t("connections.why")}: </span>
                        {m.introNote}
                      </p>
                    )}
                    {m.status === "connected" ? (
                      <p className="mt-3 text-sm text-green-800">
                        {t("connections.connectedNote")}
                      </p>
                    ) : m.targetResponse === "accepted" ? (
                      <p className="mt-3 text-sm text-neutral-500">
                        {t("connections.youAccepted")}
                      </p>
                    ) : (
                      <AnswerButtons
                        matchId={m.id}
                        locale={locale}
                        accept={t("connections.accept")}
                        decline={t("connections.decline")}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h2 className="mb-4 font-serif text-2xl font-bold text-brand-700">
              {t("connections.newTitle")}
            </h2>
            <RequestForm />
          </div>

          <div>
            <h2 className="mb-4 font-serif text-2xl font-bold text-brand-700">
              {t("connections.mine")}
            </h2>
            {mine.length === 0 && (
              <p className="text-sm text-neutral-500">{t("connections.empty")}</p>
            )}
            <div className="space-y-3">
              {mine.map((r) => (
                <div
                  key={r.id}
                  className="rounded-xl border border-neutral-200 p-5 shadow-sm"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-neutral-900">{r.topic}</p>
                      <p className="text-xs text-neutral-400">
                        {t(`connections.kinds.${r.kind}`)} ·{" "}
                        {r.createdAt.toLocaleDateString(locale)}
                      </p>
                    </div>
                    <Badge
                      status={r.status}
                      label={t(`connections.status.${r.status}`)}
                    />
                  </div>
                  <p className="mt-3 whitespace-pre-line text-sm text-neutral-700">
                    {r.details}
                  </p>

                  {r.matches.length > 0 && (
                    <ul className="mt-4 space-y-3 border-t border-neutral-100 pt-4">
                      {r.matches.map((m) => {
                        const name = m.targetMember?.name ?? m.targetEntry?.name;
                        const org =
                          m.targetMember?.profile?.organization ??
                          m.targetEntry?.organization;
                        return (
                          <li key={m.id} className="text-sm">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <p>
                                <span className="text-neutral-400">
                                  {t("connections.proposedTo")}:{" "}
                                </span>
                                <span className="font-medium text-neutral-900">
                                  {name}
                                </span>
                                {org && (
                                  <span className="text-neutral-500"> · {org}</span>
                                )}
                                {m.targetEntry && (
                                  <span className="text-neutral-400">
                                    {" "}
                                    ({t(`connections.${m.targetEntry.kind}`)})
                                  </span>
                                )}
                              </p>
                              <Badge
                                status={m.status}
                                label={t(`connections.matchStatus.${m.status}`)}
                              />
                            </div>
                            {m.introNote && (
                              <p className="mt-1 text-neutral-600">{m.introNote}</p>
                            )}
                            {m.status === "connected" && (
                              <p className="mt-1 text-green-800">
                                {t("connections.connectedNote")}
                              </p>
                            )}
                            {m.status === "proposed" &&
                              (m.requesterResponse === "accepted" ? (
                                <p className="mt-1 text-neutral-500">
                                  {t("connections.youAccepted")}
                                </p>
                              ) : (
                                <AnswerButtons
                                  matchId={m.id}
                                  locale={locale}
                                  accept={t("connections.accept")}
                                  decline={t("connections.decline")}
                                />
                              ))}
                          </li>
                        );
                      })}
                    </ul>
                  )}

                  {["submitted", "in_review", "proposed"].includes(r.status) && (
                    <form action={cancelRequest} className="mt-4">
                      <input type="hidden" name="locale" value={locale} />
                      <input type="hidden" name="requestId" value={r.id} />
                      <button className="text-sm text-neutral-500 underline hover:text-red-600">
                        {t("connections.cancel")}
                      </button>
                    </form>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function AnswerButtons({
  matchId,
  locale,
  accept,
  decline,
}: {
  matchId: string;
  locale: string;
  accept: string;
  decline: string;
}) {
  return (
    <form action={respondToMatch} className="mt-3 flex gap-2">
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="matchId" value={matchId} />
      <button
        name="answer"
        value="accepted"
        className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-700"
      >
        {accept}
      </button>
      <button
        name="answer"
        value="declined"
        className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
      >
        {decline}
      </button>
    </form>
  );
}
