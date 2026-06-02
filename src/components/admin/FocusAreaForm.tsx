import type { FocusArea } from "@prisma/client";
import { saveFocusArea } from "@/app/admin/actions";
import { LocalizedField } from "./LocalizedField";
import { Card, PrimaryButton } from "./ui";

const iconOptions = [
  { value: "trade", label: "Худалдаа ба хөрөнгө оруулалт" },
  { value: "innovation", label: "Инноваци ба технологи" },
  { value: "sustainability", label: "Тогтвортой байдал" },
  { value: "education", label: "Боловсрол ба чадавхжуулалт" },
  { value: "exchange", label: "Соёлын солилцоо" },
];

const input =
  "w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100";

export function FocusAreaForm({ area }: { area?: FocusArea }) {
  return (
    <Card>
      <form action={saveFocusArea} className="space-y-5">
        <input type="hidden" name="id" defaultValue={area?.id ?? ""} />
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-neutral-700">
              Дүрс тэмдэг
            </label>
            <select name="icon" defaultValue={area?.icon ?? "trade"} className={input}>
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
              defaultValue={area?.order ?? 0}
              className={input}
            />
          </div>
        </div>
        <LocalizedField name="label" label="Нэр" defaultValue={area?.label} required />
        <PrimaryButton>Хадгалах</PrimaryButton>
      </form>
    </Card>
  );
}
