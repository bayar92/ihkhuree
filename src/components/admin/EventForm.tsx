import type { Event } from "@prisma/client";
import { saveEvent } from "@/app/admin/actions";
import { LocalizedField } from "./LocalizedField";
import { Card, PrimaryButton } from "./ui";

const input =
  "w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100";

function toDateTimeInput(d?: Date | null) {
  if (!d) return "";
  const date = new Date(d);
  // Convert to local datetime-local format (YYYY-MM-DDTHH:mm)
  const off = date.getTimezoneOffset();
  return new Date(date.getTime() - off * 60000).toISOString().slice(0, 16);
}

export function EventForm({ event }: { event?: Event }) {
  return (
    <Card>
      <form action={saveEvent} className="space-y-5">
        <input type="hidden" name="id" defaultValue={event?.id ?? ""} />
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-neutral-700">
              Эхлэх огноо/цаг
            </label>
            <input
              name="startsAt"
              type="datetime-local"
              defaultValue={toDateTimeInput(event?.startsAt)}
              required
              className={input}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-neutral-700">
              Дуусах огноо/цаг (заавал биш)
            </label>
            <input
              name="endsAt"
              type="datetime-local"
              defaultValue={toDateTimeInput(event?.endsAt)}
              className={input}
            />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-neutral-700">
            Slug (URL)
          </label>
          <input
            name="slug"
            defaultValue={event?.slug ?? ""}
            placeholder="хоосон бол автоматаар үүснэ"
            className={input}
          />
        </div>
        <LocalizedField name="title" label="Гарчиг" defaultValue={event?.title} required />
        <LocalizedField name="location" label="Байршил" defaultValue={event?.location} />
        <LocalizedField name="description" label="Тайлбар" defaultValue={event?.description} textarea />
        <div>
          <label className="mb-1.5 block text-sm font-medium text-neutral-700">
            Зургийн URL (заавал биш)
          </label>
          <input name="image" defaultValue={event?.image ?? ""} placeholder="https://..." className={input} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-neutral-700">
            Холбоос URL (дарахад нээгдэх, заавал биш)
          </label>
          <input name="link" defaultValue={event?.link ?? ""} placeholder="https://..." className={input} />
        </div>
        <label className="flex items-center gap-2 text-sm text-neutral-700">
          <input
            type="checkbox"
            name="published"
            defaultChecked={event?.published ?? true}
            className="h-4 w-4 rounded border-neutral-300"
          />
          Нийтлэх
        </label>
        <PrimaryButton>Хадгалах</PrimaryButton>
      </form>
    </Card>
  );
}
