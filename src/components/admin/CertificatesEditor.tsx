"use client";

import { useRef, useState, type DragEvent } from "react";
import {
  ChevronDown,
  ChevronUp,
  ImagePlus,
  Link2,
  Trash2,
  Upload,
} from "lucide-react";
import type { MembershipContent } from "@/content/defaults";
import { saveCertificates, uploadImage } from "@/app/admin/actions";
import { LocalizedInput, Section } from "./fields";

const ACCEPT = "image/jpeg,image/png,image/webp,image/gif";

function moveItem<T>(arr: T[], from: number, to: number) {
  if (to < 0 || to >= arr.length) return arr;
  const next = [...arr];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

export function CertificatesEditor({ initial }: { initial: MembershipContent }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const replaceIndexRef = useRef<number | null>(null);
  const [certificates, setCertificates] = useState(
    initial.certificates.filter(Boolean),
  );
  const [sectionLabel, setSectionLabel] = useState(initial.labels.certificates);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");
  const [urlDraft, setUrlDraft] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);

  async function uploadFiles(files: FileList | File[], replaceAt?: number) {
    const list = Array.from(files).filter((f) => f.size > 0);
    if (!list.length) return;

    setUploading(true);
    setError("");
    try {
      const uploadOne = async (file: File) => {
        const fd = new FormData();
        fd.set("file", file);
        fd.set("category", "certificates");
        return uploadImage(fd);
      };

      if (replaceAt !== undefined) {
        const url = await uploadOne(list[0]);
        setCertificates((prev) =>
          prev.map((item, i) => (i === replaceAt ? url : item)),
        );
        return;
      }

      const urls = await Promise.all(list.map(uploadOne));
      setCertificates((prev) => [...prev, ...urls]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload амжилтгүй.");
    } finally {
      setUploading(false);
      replaceIndexRef.current = null;
    }
  }

  function pickFiles(replaceAt?: number) {
    replaceIndexRef.current = replaceAt ?? null;
    fileRef.current?.click();
  }

  function onFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files?.length) {
      const replaceAt = replaceIndexRef.current;
      uploadFiles(files, replaceAt ?? undefined);
    }
    e.target.value = "";
  }

  function onDrop(e: DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith("image/"),
    );
    if (files.length) uploadFiles(files);
  }

  function removeAt(index: number) {
    setCertificates((prev) => prev.filter((_, i) => i !== index));
  }

  function moveUp(index: number) {
    setCertificates((prev) => moveItem(prev, index, index - 1));
  }

  function moveDown(index: number) {
    setCertificates((prev) => moveItem(prev, index, index + 1));
  }

  function addUrl() {
    const url = urlDraft.trim();
    if (!url) return;
    setCertificates((prev) => [...prev, url]);
    setUrlDraft("");
    setShowUrlInput(false);
  }

  const payload = {
    certificates: certificates.filter(Boolean),
    sectionLabel,
  };

  return (
    <form action={saveCertificates} className="space-y-5 pb-20">
      <input type="hidden" name="data" value={JSON.stringify(payload)} />

      <Section title="Хэсгийн гарчиг">
        <LocalizedInput
          label="Гэрчилгээний хэсгийн нэр (сайт дээр харагдах)"
          value={sectionLabel}
          onChange={setSectionLabel}
        />
      </Section>

      <Section title="Гэрчилгээний зургууд">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-neutral-500">
            Нийт{" "}
            <span className="font-semibold text-neutral-800">
              {certificates.length}
            </span>{" "}
            зураг
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setShowUrlInput((v) => !v)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-300 px-3 py-1.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
            >
              <Link2 className="h-4 w-4" />
              URL-ээр нэмэх
            </button>
            <button
              type="button"
              onClick={() => pickFiles()}
              disabled={uploading}
              className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:opacity-50"
            >
              <Upload className="h-4 w-4" />
              {uploading ? "Оруулж байна..." : "Зураг upload"}
            </button>
          </div>
        </div>

        {showUrlInput && (
          <div className="mb-4 flex gap-2">
            <input
              value={urlDraft}
              onChange={(e) => setUrlDraft(e.target.value)}
              placeholder="/certificates/cert-01.jpg"
              className="flex-1 rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addUrl();
                }
              }}
            />
            <button
              type="button"
              onClick={addUrl}
              className="rounded-lg border border-brand-600 px-4 py-2 text-sm font-medium text-brand-700 hover:bg-brand-50"
            >
              Нэмэх
            </button>
          </div>
        )}

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          onClick={() => !uploading && pickFiles()}
          className={`mb-6 cursor-pointer rounded-xl border-2 border-dashed px-6 py-8 text-center transition ${
            dragOver
              ? "border-brand-500 bg-brand-50"
              : "border-neutral-300 bg-neutral-50 hover:border-brand-400 hover:bg-brand-50/50"
          } ${uploading ? "pointer-events-none opacity-60" : ""}`}
        >
          <ImagePlus className="mx-auto h-8 w-8 text-brand-500" />
          <p className="mt-2 text-sm font-medium text-neutral-700">
            Зураг чирж оруулах эсвэл дарж сонгох
          </p>
          <p className="mt-1 text-xs text-neutral-500">
            Олон зураг нэг дор сонгож болно · JPG, PNG, WebP, GIF · 5MB хүртэл
          </p>
        </div>

        <input
          ref={fileRef}
          type="file"
          accept={ACCEPT}
          multiple
          className="hidden"
          onChange={onFileInput}
        />

        {error && (
          <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        {certificates.length === 0 ? (
          <p className="text-center text-sm text-neutral-400">
            Одоогоор зураг байхгүй байна.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {certificates.map((src, i) => (
              <div
                key={`${src}-${i}`}
                className="group relative overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm"
              >
                <div className="relative flex h-44 items-center justify-center bg-neutral-50 p-2 sm:h-48">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`Гэрчилгээ ${i + 1}`}
                    className="max-h-full max-w-full object-contain"
                  />

                  <div className="absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-black/50 to-transparent p-2 opacity-0 transition group-hover:opacity-100">
                    <span className="rounded bg-black/40 px-1.5 py-0.5 text-xs font-medium text-white">
                      #{i + 1}
                    </span>
                    <div className="flex gap-0.5">
                      <button
                        type="button"
                        onClick={() => moveUp(i)}
                        disabled={i === 0}
                        className="rounded bg-black/40 p-1 text-white hover:bg-black/60 disabled:opacity-30"
                        aria-label="Дээш"
                      >
                        <ChevronUp className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveDown(i)}
                        disabled={i === certificates.length - 1}
                        className="rounded bg-black/40 p-1 text-white hover:bg-black/60 disabled:opacity-30"
                        aria-label="Доош"
                      >
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 flex justify-center gap-2 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 transition group-hover:opacity-100">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        pickFiles(i);
                      }}
                      className="rounded-md bg-white/90 px-2 py-1 text-xs font-medium text-neutral-800 hover:bg-white"
                    >
                      Солих
                    </button>
                    <button
                      type="button"
                      onClick={() => removeAt(i)}
                      className="inline-flex items-center gap-1 rounded-md bg-red-600/90 px-2 py-1 text-xs font-medium text-white hover:bg-red-600"
                    >
                      <Trash2 className="h-3 w-3" />
                      Устгах
                    </button>
                  </div>
                </div>

                <p
                  className="truncate px-2 py-1.5 text-[10px] text-neutral-400"
                  title={src}
                >
                  {src.split("/").pop()}
                </p>
              </div>
            ))}

            <button
              type="button"
              onClick={() => pickFiles()}
              disabled={uploading}
              className="flex h-44 flex-col items-center justify-center rounded-xl border-2 border-dashed border-neutral-300 bg-neutral-50 text-neutral-500 transition hover:border-brand-400 hover:bg-brand-50/50 hover:text-brand-600 disabled:opacity-50 sm:h-48"
            >
              <ImagePlus className="h-7 w-7" />
              <span className="mt-2 text-xs font-medium">+ Нэмэх</span>
            </button>
          </div>
        )}
      </Section>

      <div className="sticky bottom-4 flex justify-end">
        <button
          type="submit"
          className="rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-brand-700"
        >
          Хадгалах
        </button>
      </div>
    </form>
  );
}
