import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  name: z.string().min(1).max(200).default("—"),
  email: z.string().email(),
  company: z.string().max(200).optional().or(z.literal("")),
  message: z.string().max(5000).default(""),
  type: z.enum(["contact", "join", "newsletter"]).default("contact"),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 422 });
  }

  const { name, email, company, message, type } = parsed.data;
  await prisma.inquiry.create({
    data: { name, email, company: company || null, message, type },
  });

  return NextResponse.json({ ok: true });
}
