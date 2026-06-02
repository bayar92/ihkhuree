import type { Feature } from "@prisma/client";
import { saveFeature } from "@/app/admin/actions";
import { LocalizedField } from "./LocalizedField";
import { Card, PrimaryButton } from "./ui";

const iconOptions = [
  { value: "globe", label: "🌐 Глоб (Mission)" },
  { value: "users", label: "👥 Хүмүүс (Vision)" },
  { value: "handshake", label: "🤝 Гар барих (Membership)" },
  { value: "growth", label: "📈 Өсөлт (Services)" },
];

const input =
  "w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100";

export function FeatureForm({ feature }: { feature?: Feature }) {
  return (
    <Card>
      <form action={saveFeature} className="space-y-5">
        <input type="hidden" name="id" defaultValue={feature?.id ?? ""} />
        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-neutral-700">
              Дүрс тэмдэг
            </label>
            <select name="icon" defaultValue={feature?.icon ?? "globe"} className={input}>
              {iconOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-neutral-700">
              Эрэмбэ
            </label>
            <input
              name="order"
              type="number"
              defaultValue={feature?.order ?? 0}
              className={input}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-neutral-700">
              Холбоос
            </label>
            <input name="href" defaultValue={feature?.href ?? ""} placeholder="/about" className={input} />
          </div>
        </div>
        <LocalizedField name="title" label="Гарчиг" defaultValue={feature?.title} required />
        <LocalizedField name="body" label="Тайлбар" defaultValue={feature?.body} textarea />
        <PrimaryButton>Хадгалах</PrimaryButton>
      </form>
    </Card>
  );
}
