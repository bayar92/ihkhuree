"use client";

import { useRef, useState } from "react";
import { uploadNewsImage } from "@/app/admin/actions";

const input =
  "w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100";

export function ImageUploadField({
  name,
  label,
  defaultValue = "",
  required = false,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  required?: boolean;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState(defaultValue);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");
    const fd = new FormData();
    fd.set("file", file);

    try {
      const next = await uploadNewsImage(fd);
      setUrl(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload амжилтгүй.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-neutral-700">
        {label}
      </label>
      <input type="hidden" name={name} value={url} required={required} />
      <div className="flex flex-wrap items-center gap-2">
        {url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={url}
            alt=""
            className="h-16 w-16 shrink-0 rounded-lg border border-neutral-200 object-cover"
          />
        ) : (
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-dashed border-neutral-300 bg-neutral-50 text-xs text-neutral-400">
            Зураг
          </div>
        )}
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="rounded-lg border border-brand-600 px-3 py-2 text-sm font-medium text-brand-700 transition hover:bg-brand-50 disabled:opacity-50"
        >
          {uploading ? "Оруулж байна..." : "Upload"}
        </button>
        {url && (
          <button
            type="button"
            onClick={() => setUrl("")}
            className="text-sm font-medium text-red-600 hover:underline"
          >
            Устгах
          </button>
        )}
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={onFileChange}
      />
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="/uploads/news/... эсвэл https://..."
        className={`${input} mt-2`}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
