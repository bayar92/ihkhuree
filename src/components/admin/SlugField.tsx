"use client";

import { useEffect, useRef, useState } from "react";
import { previewAutoSlug } from "@/lib/slug";

const input =
  "w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-600 outline-none";

function readTitle(form: HTMLFormElement) {
  const get = (name: string) =>
    (form.querySelector(`[name="${name}"]`) as HTMLInputElement | null)?.value ??
    "";

  return {
    en: get("title.en"),
    mn: get("title.mn"),
    ja: get("title.ja"),
  };
}

export function SlugField({
  initialSlug,
  fallback,
}: {
  initialSlug?: string;
  fallback: "news" | "event";
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const suffixRef = useRef(Date.now().toString(36).slice(-5));
  const isNew = !initialSlug;
  const [value, setValue] = useState(initialSlug ?? `${fallback}-${suffixRef.current}`);

  useEffect(() => {
    if (!isNew) return;

    const form = inputRef.current?.closest("form");
    if (!form) return;

    function update() {
      setValue(
        previewAutoSlug(readTitle(form!), fallback, suffixRef.current),
      );
    }

    form.addEventListener("input", update);
    update();
    return () => form.removeEventListener("input", update);
  }, [fallback, isNew]);

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-neutral-700">
        Slug (URL)
      </label>
      <input
        ref={inputRef}
        readOnly
        value={value}
        className={input}
        aria-readonly="true"
      />
      <p className="mt-1 text-xs text-neutral-500">
        {isNew
          ? "Гарчгаас эхний 2–3 үг автоматаар үүснэ (EN → MN → JA)."
          : "Хадгалсан URL. Өөрчлөх боломжгүй."}
      </p>
    </div>
  );
}
