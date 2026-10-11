import type { Prisma } from "@prisma/client";
import { deriveRequestStatus } from "@/lib/connection-schema";

type Tx = Prisma.TransactionClient;

/** Re-compute a request's status from its matches (call inside a transaction). */
export async function syncRequestStatus(tx: Tx, requestId: string) {
  const request = await tx.connectionRequest.findUnique({
    where: { id: requestId },
    select: { status: true, matches: { select: { status: true } } },
  });
  if (!request) return;
  const status = deriveRequestStatus(request.status, request.matches);
  if (status !== request.status) {
    await tx.connectionRequest.update({
      where: { id: requestId },
      data: { status },
    });
  }
}
