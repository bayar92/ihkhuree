"use client";

import { useState } from "react";

const input =
  "w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100";

/**
 * Manages the list of in-article image URLs. Each row submits an `images`
 * field, so the server action can read them with `formData.getAll("images")`.
 */
export function NewsImagesField({ initial }: { initial: string[] }) {
  const [images, setImages] = useState<string[]>(
    initial.length ? initial : [],
  );

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label className="text-sm font-medium text-neutral-700">
          Мэдээн доторх зургууд (заавал биш)
        </label>
        <button
          type="button"
          onClick={() => setImages((a) => [...a, ""])}
          className="rounded-lg border border-dashed border-neutral-300 px-3 py-1.5 text-sm font-medium text-brand-600 transition hover:bg-brand-50"
        >
          + Зураг нэмэх
        </button>
      </div>
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
                placeholder="/image.jpg эсвэл https://..."
                onChange={(e) =>
                  setImages((a) =>
                    a.map((v, idx) => (idx === i ? e.target.value : v)),
                  )
                }
                className={input}
              />
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
    </div>
  );
}
