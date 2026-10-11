import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminHeader, Card, PrimaryButton } from "@/components/admin/ui";
import { deleteDirectoryEntry, saveDirectoryEntry } from "../../../connection-actions";

export const dynamic = "force-dynamic";

const input =
  "w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100";

function F({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-neutral-700">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-neutral-500">{hint}</span>}
    </label>
  );
}

export default async function DirectoryEditPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const [{ id }, { error }] = await Promise.all([params, searchParams]);
  const isNew = id === "new";
  const entry = isNew ? null : await prisma.directoryEntry.findUnique({ where: { id } });
  if (!isNew && !entry) notFound();

  return (
    <div className="max-w-2xl space-y-5">
      <Link href="/admin/directory" className="text-sm text-neutral-500 hover:text-brand-700">
        ← Лавлах
      </Link>
      <AdminHeader title={isNew ? "Шинэ бүртгэл" : entry!.name} />
      {error && (
        <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
          Мэдээллээ шалгана уу (нэр, и-мэйлийн формат).
        </p>
      )}
      <Card>
        <form action={saveDirectoryEntry} className="space-y-4">
          <input type="hidden" name="id" value={entry?.id ?? ""} />
          <F label="Төрөл">
            <select name="kind" defaultValue={entry?.kind ?? "expert"} className={input}>
              <option value="expert">Мэргэжилтэн</option>
              <option value="organization">Байгууллага</option>
            </select>
          </F>
          <F label="Нэр">
            <input name="name" required defaultValue={entry?.name} className={input} />
          </F>
          <div className="grid gap-4 sm:grid-cols-2">
            <F label="Байгууллага">
              <input name="organization" defaultValue={entry?.organization ?? ""} className={input} />
            </F>
            <F label="Албан тушаал">
              <input name="title" defaultValue={entry?.title ?? ""} className={input} />
            </F>
            <F label="И-мэйл">
              <input name="contactEmail" type="email" defaultValue={entry?.contactEmail ?? ""} className={input} />
            </F>
            <F label="Утас">
              <input name="contactPhone" defaultValue={entry?.contactPhone ?? ""} className={input} />
            </F>
          </div>
          <F label="Чиглэл" hint="Таслалаар тусгаарлана уу">
            <input name="expertise" defaultValue={entry?.expertise.join(", ") ?? ""} className={input} />
          </F>
          <F label="Дотоод тэмдэглэл" hint="Гишүүдэд харагдахгүй">
            <textarea name="notes" rows={3} defaultValue={entry?.notes ?? ""} className={input} />
          </F>
          <label className="flex items-center gap-2 text-sm text-neutral-700">
            <input type="checkbox" name="active" defaultChecked={entry?.active ?? true} />
            Идэвхтэй (шинэ холболтод санал болгож болно)
          </label>
          <PrimaryButton>Хадгалах</PrimaryButton>
        </form>
      </Card>
      {entry && (
        <form action={deleteDirectoryEntry}>
          <input type="hidden" name="id" value={entry.id} />
          <button className="text-sm text-red-600 underline">
            Устгах (холболттой бол зөвхөн идэвхгүй болгоно)
          </button>
        </form>
      )}
    </div>
  );
}
