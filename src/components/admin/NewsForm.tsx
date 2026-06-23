"use client";

import { useRef, useState, type Dispatch, type SetStateAction } from "react";
import type { News } from "@prisma/client";
import { saveNews, translateNewsFields } from "@/app/admin/actions";
import { localizedFromJson } from "@/lib/form";
import type { Locale } from "@/i18n/routing";
import { LocalizedField } from "./LocalizedField";
import { NewsImagesField } from "./NewsImagesField";
import { ImageUploadField } from "./ImageUploadField";
import { SlugField } from "./SlugField";
import { Card, PrimaryButton } from "./ui";

const input =
  "w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100";

function toDateInput(d?: Date | null) {
  if (!d) return "";
  return new Date(d).toISOString().slice(0, 10);
}

function readMnField(form: HTMLFormElement, name: string) {
  const el = form.querySelector(`[name="${name}.mn"]`);
  if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
    return el.value;
  }
  return "";
}

export function NewsForm({ news }: { news?: News }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [title, setTitle] = useState(() => localizedFromJson(news?.title));
  const [excerpt, setExcerpt] = useState(() => localizedFromJson(news?.excerpt));
  const [content, setContent] = useState(() => localizedFromJson(news?.content));
  const [viewLocale, setViewLocale] = useState<Locale>("mn");
  const [translating, setTranslating] = useState(false);
  const [translateError, setTranslateError] = useState<string | null>(null);
  const [translateOk, setTranslateOk] = useState<string | null>(null);

  function setField(
    setter: Dispatch<SetStateAction<Record<Locale, string>>>,
  ) {
    return (locale: Locale, value: string) => {
      setter((prev) => ({ ...prev, [locale]: value }));
      setTranslateOk(null);
    };
  }

  async function handleAutoTranslate() {
    const form = formRef.current;
    if (!form) return;

    const source = {
      title: readMnField(form, "title"),
      excerpt: readMnField(form, "excerpt"),
      content: readMnField(form, "content"),
    };

    setTitle((prev) => ({ ...prev, mn: source.title }));
    setExcerpt((prev) => ({ ...prev, mn: source.excerpt }));
    setContent((prev) => ({ ...prev, mn: source.content }));

    setTranslating(true);
    setTranslateError(null);
    setTranslateOk(null);
    try {
      const result = await translateNewsFields(source);
      setTitle((prev) => ({ ...prev, en: result.en.title, ja: result.ja.title }));
      setExcerpt((prev) => ({
        ...prev,
        en: result.en.excerpt,
        ja: result.ja.excerpt,
      }));
      setContent((prev) => ({
        ...prev,
        en: result.en.content,
        ja: result.ja.content,
      }));
      setViewLocale("en");
      setTranslateOk(
        result.notice ??
          `✓ Гарчиг, товч агуулга, үндсэн агуулга EN/JA-руу орчуулагдлаа (${result.provider === "openai" ? "OpenAI" : "MyMemory"}). Шалгаад хадгална уу.`,
      );
    } catch (error) {
      setTranslateError(
        error instanceof Error ? error.message : "Орчуулга амжилтгүй.",
      );
    } finally {
      setTranslating(false);
    }
  }

  return (
    <Card>
      <form ref={formRef} action={saveNews} className="space-y-5">
        <input type="hidden" name="id" defaultValue={news?.id ?? ""} />
        <div>
          <label className="mb-1.5 block text-sm font-medium text-neutral-700">
            Огноо
          </label>
          <input
            name="publishedAt"
            type="date"
            defaultValue={
              toDateInput(news?.publishedAt) ||
              new Date().toISOString().slice(0, 10)
            }
            className={input}
          />
        </div>

        <LocalizedField
          name="title"
          label="Гарчиг"
          values={title}
          onChange={setField(setTitle)}
          viewLocale={viewLocale}
          required
        />
        <SlugField initialSlug={news?.slug} fallback="news" />
        <LocalizedField
          name="excerpt"
          label="Товч агуулга"
          values={excerpt}
          onChange={setField(setExcerpt)}
          viewLocale={viewLocale}
          textarea
          rows={2}
        />
        <LocalizedField
          name="content"
          label="Үндсэн агуулга"
          values={content}
          onChange={setField(setContent)}
          viewLocale={viewLocale}
          textarea
          rows={8}
        />

        <div className="flex flex-wrap items-center gap-3 rounded-lg border border-brand-100 bg-brand-50/60 px-4 py-3">
          <button
            type="button"
            onClick={handleAutoTranslate}
            disabled={translating}
            className="rounded-lg border border-brand-600 bg-white px-4 py-2 text-sm font-semibold text-brand-700 transition hover:bg-brand-600 hover:text-white disabled:opacity-60"
          >
            {translating ? "Орчуулж байна..." : "Автомат орчуулах (MN → EN, JA)"}
          </button>
          <p className="text-xs text-neutral-600">
            Гарчиг, товч агуулга, үндсэн агуулга — гурвыг монголоос орчуулна.
            Эхлээд MN таб дээр бичээд товч дарна уу.
          </p>
        </div>
        {translateError && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {translateError}
          </p>
        )}
        {translateOk && (
          <p className="rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800">
            {translateOk}
          </p>
        )}

        <ImageUploadField
          name="coverImage"
          label="Нүүр зураг (заавал биш)"
          defaultValue={news?.coverImage ?? ""}
        />
        <NewsImagesField initial={news?.images ?? []} />
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
