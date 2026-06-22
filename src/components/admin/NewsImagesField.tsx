"use client";

import { useRef, useState } from "react";
import { uploadNewsImage } from "@/app/admin/actions";

const input =
  "w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100";

/**
 * Manages in-article image URLs with optional file upload per row.
 */
export function NewsImagesField({ initial }: { initial: string[] }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<string[]>(initial.length ? initial : []);
  const [uploading, setUploading] = useState(false);
  const [uploadIndex, setUploadIndex] = useState<number | null>(null);
  const [error, setError] = useState("");

  async function uploadAt(index: number, file: File) {
    setUploading(true);
    setUploadIndex(index);
    setError("");
    const fd = new FormData();
    fd.set("file", file);

    try {
      const url = await uploadNewsImage(fd);
      setImages((a) => a.map((v, i) => (i === index ? url : v)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload амжилтгүй.");
    } finally {
      setUploading(false);
      setUploadIndex(null);
    }
  }

  async function uploadNew(file: File) {
    setUploading(true);
    setUploadIndex(-1);
    setError("");
    const fd = new FormData();
    fd.set("file", file);

    try {
      const url = await uploadNewsImage(fd);
      setImages((a) => [...a, url]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload амжилтгүй.");
    } finally {
      setUploading(false);
      setUploadIndex(null);
    }
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const index = Number(e.target.dataset.index ?? "-1");
    if (index >= 0) uploadAt(index, file);
    else uploadNew(file);
    e.target.value = "";
  }

  function pickFile(index: number) {
    if (!fileRef.current) return;
    fileRef.current.dataset.index = String(index);
    fileRef.current.click();
  }

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label className="text-sm font-medium text-neutral-700">
          Мэдээн доторх зургууд (заавал биш)
        </label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setImages((a) => [...a, ""])}
            className="rounded-lg border border-dashed border-neutral-300 px-3 py-1.5 text-sm font-medium text-brand-600 transition hover:bg-brand-50"
          >
            + URL нэмэх
          </button>
          <button
            type="button"
            onClick={() => pickFile(-1)}
            disabled={uploading}
            className="rounded-lg border border-brand-600 px-3 py-1.5 text-sm font-medium text-brand-700 transition hover:bg-brand-50 disabled:opacity-50"
          >
            {uploading && uploadIndex === -1 ? "Оруулж байна..." : "+ Upload"}
          </button>
        </div>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        data-index="-1"
        onChange={onFileChange}
      />

      {images.length === 0 ? (
        <p className="text-xs text-neutral-400">Одоогоор зураг нэмээгүй байна.</p>
      ) : (
        <div className="space-y-2">
          {images.map((src, i) => (
            <div key={i} className="flex items-center gap-2">
              {src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={src}
                  alt=""
                  className="h-12 w-12 shrink-0 rounded-lg border border-neutral-200 object-cover"
                />
              ) : (
                <div className="h-12 w-12 shrink-0 rounded-lg border border-dashed border-neutral-300 bg-neutral-50" />
              )}
              <input
                name="images"
                value={src}
                placeholder="/uploads/news/... эсвэл https://..."
                onChange={(e) =>
                  setImages((a) =>
                    a.map((v, idx) => (idx === i ? e.target.value : v)),
                  )
                }
                className={input}
              />
              <button
                type="button"
                onClick={() => pickFile(i)}
                disabled={uploading}
                className="shrink-0 rounded-lg border border-neutral-300 px-2 py-1.5 text-xs font-medium text-brand-700 hover:bg-brand-50 disabled:opacity-50"
              >
                {uploading && uploadIndex === i ? "..." : "Upload"}
              </button>
              <button
                type="button"
                onClick={() =>
                  setImages((a) => a.filter((_, idx) => idx !== i))
                }
                className="shrink-0 text-sm font-medium text-red-600 hover:underline"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
