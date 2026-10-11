"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/dal";
import { parseTopics } from "@/lib/member-schema";
import {
  deriveMatchStatus,
  directoryEntrySchema,
  type Answer,
} from "@/lib/connection-schema";
import { syncRequestStatus } from "@/lib/connections";

function refresh(requestId?: string) {
  revalidatePath("/admin/connections");
  if (requestId) revalidatePath(`/admin/connections/${requestId}`);
  revalidatePath("/[locale]/account/connections", "page");
}

// ---------------- Requests ----------------
/** Staff-controlled states only; proposed/connected follow the matches. */
export async function setRequestStatus(formData: FormData) {
  await requireStaff();
  const id = String(formData.get("requestId") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !["submitted", "in_review", "closed"].includes(status)) return;

  await prisma.$transaction(async (tx) => {
    await tx.connectionRequest.update({ where: { id }, data: { status } });
    if (status === "closed") {
      await tx.match.updateMany({
        where: { requestId: id, status: "proposed" },
        data: { status: "withdrawn" },
      });
    } else {
      await syncRequestStatus(tx, id);
    }
  });
  refresh(id);
}

export async function saveStaffNote(formData: FormData) {
  await requireStaff();
  const id = String(formData.get("requestId") ?? "");
  if (!id) return;
  const note = String(formData.get("staffNote") ?? "").trim().slice(0, 2000);
  await prisma.connectionRequest.update({
    where: { id },
    data: { staffNote: note || null },
  });
  refresh(id);
}

// ---------------- Matches ----------------
/** target is "m:<userId>" (a member) or "e:<entryId>" (expert / organization). */
export async function addMatch(formData: FormData) {
  await requireStaff();
  const requestId = String(formData.get("requestId") ?? "");
  const target = String(formData.get("target") ?? "");
  const introNote = String(formData.get("introNote") ?? "").trim().slice(0, 1000);
  const back = `/admin/connections/${requestId}`;

  const request = await prisma.connectionRequest.findUnique({
    where: { id: requestId },
    select: { id: true, requesterId: true, status: true },
  });
  if (!request || request.status === "closed") redirect(back);

  const [kind, targetId] = target.split(":");
  const data: Prisma.MatchUncheckedCreateInput = {
    requestId,
    introNote: introNote || null,
  };

  if (kind === "m" && targetId) {
    if (targetId === request.requesterId) redirect(`${back}?error=self`);
    const member = await prisma.user.findFirst({
      where: { id: targetId, role: "member", status: "approved" },
      select: { id: true },
    });
    if (!member) redirect(`${back}?error=target`);
    data.targetMemberId = member.id;
  } else if (kind === "e" && targetId) {
    const entry = await prisma.directoryEntry.findFirst({
      where: { id: targetId, active: true },
      select: { id: true },
    });
    if (!entry) redirect(`${back}?error=target`);
    data.targetEntryId = entry.id;
  } else {
    redirect(`${back}?error=target`);
  }

  try {
    await prisma.$transaction(async (tx) => {
      await tx.match.create({ data });
      await syncRequestStatus(tx, requestId);
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      redirect(`${back}?error=duplicate`);
    }
    throw error;
  }
  refresh(requestId);
  redirect(back);
}

export async function withdrawMatch(formData: FormData) {
  await requireStaff();
  const matchId = String(formData.get("matchId") ?? "");
  if (!matchId) return;

  let requestId: string | undefined;
  await prisma.$transaction(async (tx) => {
    const match = await tx.match.findUnique({ where: { id: matchId } });
    if (!match || match.status !== "proposed") return;
    requestId = match.requestId;
    await tx.match.update({ where: { id: matchId }, data: { status: "withdrawn" } });
    await syncRequestStatus(tx, match.requestId);
  });
  refresh(requestId);
}

/**
 * Directory entries (experts/organizations) have no login, so staff record
 * their answer after contacting them. Members answer for themselves instead.
 */
export async function recordEntryResponse(formData: FormData) {
  await requireStaff();
  const matchId = String(formData.get("matchId") ?? "");
  const answer = String(formData.get("answer") ?? "");
  if (!matchId || (answer !== "accepted" && answer !== "declined")) return;

  let requestId: string | undefined;
  await prisma.$transaction(async (tx) => {
    const match = await tx.match.findUnique({ where: { id: matchId } });
    // Only directory-entry targets, and only while the match is still open.
    if (!match || !match.targetEntryId || match.status !== "proposed") return;
    requestId = match.requestId;
    await tx.match.update({
      where: { id: matchId },
      data: {
        targetResponse: answer,
        status: deriveMatchStatus(
          match.requesterResponse as Answer,
          answer as Answer,
        ),
      },
    });
    await syncRequestStatus(tx, match.requestId);
  });
  refresh(requestId);
}

// ---------------- Directory (experts / organizations) ----------------
export async function saveDirectoryEntry(formData: FormData) {
  await requireStaff();
  const id = String(formData.get("id") ?? "");

  const parsed = directoryEntrySchema.safeParse({
    kind: formData.get("kind"),
    name: formData.get("name"),
    organization: String(formData.get("organization") ?? "") || undefined,
    title: String(formData.get("title") ?? "") || undefined,
    contactEmail: String(formData.get("contactEmail") ?? ""),
    contactPhone: String(formData.get("contactPhone") ?? "") || undefined,
    notes: String(formData.get("notes") ?? "") || undefined,
  });
  if (!parsed.success) {
    redirect(`/admin/directory/${id || "new"}?error=invalid`);
  }

  const data = {
    ...parsed.data,
    contactEmail: parsed.data.contactEmail || null,
    expertise: parseTopics(formData.get("expertise"), 15),
    active: formData.get("active") === "on",
  };
  if (id) {
    await prisma.directoryEntry.update({ where: { id }, data });
  } else {
    await prisma.directoryEntry.create({ data });
  }
  revalidatePath("/admin/directory");
  redirect("/admin/directory?saved=1");
}

export async function deleteDirectoryEntry(formData: FormData) {
  await requireStaff();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const used = await prisma.match.count({ where: { targetEntryId: id } });
  if (used > 0) {
    // Keep history intact: hide it from new matches instead of deleting.
    await prisma.directoryEntry.update({ where: { id }, data: { active: false } });
  } else {
    await prisma.directoryEntry.delete({ where: { id } });
  }
  revalidatePath("/admin/directory");
  redirect("/admin/directory");
}
