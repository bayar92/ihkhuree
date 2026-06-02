import type { News } from "@prisma/client";
import { saveNews } from "@/app/admin/actions";
import { LocalizedField } from "./LocalizedField";
import { Card, PrimaryButton } from "./ui";

const input =
  "w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100";

function toDateInput(d?: Date | null) {
  if (!d) return "";
  return new Date(d).toISOString().slice(0, 10);
}

export function NewsForm({ news }: { news?: News }) {
  return (
    <Card>
      <form action={saveNews} className="space-y-5">
        <input type="hidden" name="id" defaultValue={news?.id ?? ""} />
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-neutral-700">
              Slug (URL)
            </label>
            <input
              name="slug"
              defaultValue={news?.slug ?? ""}
              placeholder="хоосон бол автоматаар үүснэ"
              className={input}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-neutral-700">
              Огноо
            </label>
            <input
              name="publishedAt"
              type="date"
              defaultValue={toDateInput(news?.publishedAt) || new Date().toISOString().slice(0, 10)}
              className={input}
            />
          </div>
        </div>
        <LocalizedField name="title" label="Гарчиг" defaultValue={news?.title} required />
        <LocalizedField name="excerpt" label="Товч агуулга" defaultValue={news?.excerpt} textarea rows={2} />
        <LocalizedField name="content" label="Үндсэн агуулга" defaultValue={news?.content} textarea rows={8} />
        <div>
          <label className="mb-1.5 block text-sm font-medium text-neutral-700">
            Нүүр зургийн URL (заавал биш)
          </label>
          <input
            name="coverImage"
            defaultValue={news?.coverImage ?? ""}
            placeholder="https://..."
            className={input}
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-neutral-700">
          <input
            type="checkbox"
            name="published"
            defaultChecked={news?.published ?? true}
            className="h-4 w-4 rounded border-neutral-300"
          />
          Нийтлэх
        </label>
        <PrimaryButton>Хадгалах</PrimaryButton>
      </form>
    </Card>
  );
}
