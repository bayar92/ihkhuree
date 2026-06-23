"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

function Lightbox({
  images,
  alt,
  initialIndex,
  onClose,
}: {
  images: string[];
  alt: string;
  initialIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(initialIndex);

  useEffect(() => {
    setIndex(initialIndex);
  }, [initialIndex]);

  const prev = useCallback(
    () => setIndex((i) => (i - 1 + images.length) % images.length),
    [images.length],
  );
  const next = useCallback(
    () => setIndex((i) => (i + 1) % images.length),
    [images.length],
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Зураг слайдер"
    >
      <span className="absolute left-1/2 top-5 -translate-x-1/2 text-sm font-medium text-white/80">
        {index + 1} / {images.length}
      </span>

      <button
        type="button"
        onClick={onClose}
        aria-label="Хаах"
        className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
      >
        <X className="h-6 w-6" />
      </button>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Өмнөх"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white transition hover:bg-white/20 sm:left-6"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Дараах"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white transition hover:bg-white/20 sm:right-6"
          >
            <ChevronRight className="h-7 w-7" />
          </button>
        </>
      )}

      <div
        className="relative h-[88vh] w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[index]}
          alt={`${alt} — ${index + 1}`}
          className="absolute inset-0 h-full w-full rounded-md object-contain shadow-2xl"
        />
      </div>
    </div>
  );
}

export function NewsImageGallery({
  images,
  alt,
  children,
}: {
  images: string[];
  alt: string;
  children?: ReactNode;
}) {
  const [open, setOpen] = useState<number | null>(null);

  if (images.length === 0) {
    return children ? <>{children}</> : null;
  }

  const hero = images[0];
  const rest = images.slice(1);

  return (
    <>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => setOpen(0)}
          className="group relative -mt-2 block w-full overflow-hidden rounded-xl shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          aria-label="Зураг томруулж харах"
        >
          <div className="relative aspect-[16/9] w-full bg-neutral-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={hero}
              alt={alt}
              className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
            />
          </div>
          <span className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/45 px-2.5 py-1 text-xs font-medium text-white opacity-0 transition group-hover:opacity-100">
            <ZoomIn className="h-3.5 w-3.5" />
            {images.length > 1 ? `${images.length} зураг` : "Томруулах"}
          </span>
        </button>
      </div>

      {children}

      {rest.length > 0 && (
        <div className="mx-auto mt-10 grid max-w-3xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:px-8">
          {rest.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setOpen(i + 1)}
              className="group overflow-hidden rounded-xl shadow-sm ring-1 ring-neutral-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              aria-label={`${alt} — ${i + 2}`}
            >
              <div className="relative aspect-[4/3] w-full bg-neutral-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`${alt} — ${i + 2}`}
                  className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
            </button>
          ))}
        </div>
      )}

      {open !== null && (
        <Lightbox
          images={images}
          alt={alt}
          initialIndex={open}
          onClose={() => setOpen(null)}
        />
      )}
    </>
  );
}
