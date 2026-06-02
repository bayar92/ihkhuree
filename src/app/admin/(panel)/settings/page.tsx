import { prisma } from "@/lib/prisma";
import { saveContactSettings } from "../../actions";
import { LocalizedField } from "@/components/admin/LocalizedField";
import { AdminHeader, Card, PrimaryButton, SavedBanner } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

const input =
  "w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100";

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const setting = await prisma.setting.findUnique({ where: { key: "contact" } });
  const contact = (setting?.value ?? {}) as Record<string, unknown>;
  const social = (contact.social ?? {}) as Record<string, string>;

  return (
    <div>
      <AdminHeader
        title="Тохиргоо"
        description="Холбоо барих мэдээлэл (footer болон холбоо барих хуудсанд харагдана)."
      />
      <SavedBanner show={!!saved} />
      <Card>
        <form action={saveContactSettings} className="space-y-5">
          <LocalizedField name="address" label="Хаяг" defaultValue={contact.address} textarea rows={2} />
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                Утас
              </label>
              <input
                name="phone"
                defaultValue={typeof contact.phone === "string" ? contact.phone : ""}
                className={input}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                Имэйл
              </label>
              <input
                name="email"
                type="email"
                defaultValue={typeof contact.email === "string" ? contact.email : ""}
                className={input}
              />
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                Facebook URL
              </label>
              <input name="facebook" defaultValue={social.facebook ?? ""} placeholder="https://facebook.com/..." className={input} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                LinkedIn URL
              </label>
              <input name="linkedin" defaultValue={social.linkedin ?? ""} placeholder="https://linkedin.com/..." className={input} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                YouTube URL
              </label>
              <input name="youtube" defaultValue={social.youtube ?? ""} placeholder="https://youtube.com/..." className={input} />
            </div>
          </div>
          <PrimaryButton>Хадгалах</PrimaryButton>
        </form>
      </Card>
    </div>
  );
}
