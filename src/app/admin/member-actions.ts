"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/dal";

const NEXT_STATUS = {
  approve: "approved",
  reject: "rejected",
  reopen: "pending",
} as const;

/**
 * Staff decision on a member application. Only touches users with role
 * "member", so this can never change an admin/staff account.
 */
export async function setMemberStatus(formData: FormData) {
  await requireStaff();

  const id = String(formData.get("id") ?? "");
  const action = String(formData.get("action") ?? "") as keyof typeof NEXT_STATUS;
  const status = NEXT_STATUS[action];
  if (!id || !status) return;

  await prisma.user.updateMany({
    where: { id, role: "member" },
    data: { status },
  });
  revalidatePath("/admin/members");
}
