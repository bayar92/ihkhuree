"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireMember } from "@/lib/dal";
import { routing, type Locale } from "@/i18n/routing";
import { failedFields } from "@/lib/member-schema";
import {
  MAX_OPEN_REQUESTS,
  createRequestSchema,
  deriveMatchStatus,
  type Answer,
  type ConnectionFormState,
} from "@/lib/connection-schema";
import { syncRequestStatus } from "@/lib/connections";

function pickLocale(raw: FormDataEntryValue | null): Locale {
  return routing.locales.find((l) => l === raw) ?? routing.defaultLocale;
}

function refresh(locale: string) {
  revalidatePath(`/${locale}/account/connections`);
  revalidatePath("/admin/connections");
}

// ---------------- Create a request ----------------
export async function createRequest(
  _prev: ConnectionFormState,
  formData: FormData,
): Promise<ConnectionFormState> {
  const locale = pickLocale(formData.get("locale"));
  const user = await requireMember(locale);

  const values = {
    kind: String(formData.get("kind") ?? ""),
    topic: String(formData.get("topic") ?? ""),
    details: String(formData.get("details") ?? ""),
  };
  const parsed = createRequestSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "invalid", fields: failedFields(parsed.error), values };
  }

  // Keep the staff queue manageable: cap how many open requests one member has.
  const open = await prisma.connectionRequest.count({
    where: {
      requesterId: user.id,
      status: { in: ["submitted", "in_review", "proposed"] },
    },
  });
  if (open >= MAX_OPEN_REQUESTS) return { error: "limit", values };

  try {
    await prisma.connectionRequest.create({
      data: { requesterId: user.id, ...parsed.data },
    });
  } catch (error) {
    console.error("[request] failed:", (error as Error).message);
    return { error: "server", values };
  }

  refresh(locale);
  return { ok: true };
}

// ---------------- Answer a proposed match ----------------
/**
 * Called by whichever side the signed-in member is: the requester accepting or
 * declining the person staff proposed, or the proposed member answering the
 * request. Members can only answer for themselves, once, while it is proposed.
 */
export async function respondToMatch(formData: FormData) {
  const locale = pickLocale(formData.get("locale"));
  const user = await requireMember(locale);

  const matchId = String(formData.get("matchId") ?? "");
  const answer = String(formData.get("answer") ?? "");
  if (!matchId || (answer !== "accepted" && answer !== "declined")) return;

  await prisma.$transaction(async (tx) => {
    const match = await tx.match.findUnique({
      where: { id: matchId },
      include: { request: { select: { requesterId: true, status: true } } },
    });
    if (!match || match.status !== "proposed") return;

    const isRequester = match.request.requesterId === user.id;
    const isTarget = match.targetMemberId === user.id;
    if (!isRequester && !isTarget) return; // not your match

    const field = isRequester ? "requesterResponse" : "targetResponse";
    if (match[field] !== "pending") return; // already answered

    const requesterResponse = (
      isRequester ? answer : match.requesterResponse
    ) as Answer;
    const targetResponse = (isTarget ? answer : match.targetResponse) as Answer;

    await tx.match.update({
      where: { id: matchId },
      data: {
        [field]: answer,
        status: deriveMatchStatus(requesterResponse, targetResponse),
      },
    });
    await syncRequestStatus(tx, match.requestId);
  });

  refresh(locale);
}

// ---------------- Cancel your own request ----------------
export async function cancelRequest(formData: FormData) {
  const locale = pickLocale(formData.get("locale"));
  const user = await requireMember(locale);
  const id = String(formData.get("requestId") ?? "");
  if (!id) return;

  await prisma.$transaction(async (tx) => {
    // Only the owner, and not once it is already connected/closed.
    const closed = await tx.connectionRequest.updateMany({
      where: {
        id,
        requesterId: user.id,
        status: { in: ["submitted", "in_review", "proposed"] },
      },
      data: { status: "closed" },
    });
    if (closed.count === 0) return;
    await tx.match.updateMany({
      where: { requestId: id, status: "proposed" },
      data: { status: "withdrawn" },
    });
  });

  refresh(locale);
}
