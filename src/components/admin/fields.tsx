"use client";

import { useState, type ReactNode } from "react";
import { locales, type Locale } from "@/i18n/routing";
import { saveContent } from "@/app/admin/actions";

export type L = Record<Locale, string>;

const localeLabels: Record<Locale, string> = {
  mn: "Монгол",
  en: "English",
  ja: "日本語",
};

const inputClass =
  "w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100";

function LabelRow({
  label,
  children,
}: {
  label?: string;
  children?: ReactNode;
}) {
  if (!label && !children) return null;
  return (
    <div className="mb-1.5 flex items-center justify-between gap-2">
      {label ? (
        <label className="text-sm font-medium text-neutral-700">{label}</label>
      ) : (
        <span />
      )}
      {children}
    </div>
  );
}

/** A controlled localized (mn/en/ja) text field with locale tabs. */
export function LocalizedInput({
  label,
  value,
  onChange,
  textarea = false,
  rows = 3,
}: {
  label?: string;
  value: L | undefined;
  onChange: (next: L) => void;
  textarea?: boolean;
  rows?: number;
}) {
  const [active, setActive] = useState<Locale>("mn");
  const v: L = value ?? { mn: "", en: "", ja: "" };

  return (
    <div>
      <LabelRow label={label}>
        <div className="flex gap-1 rounded-md bg-neutral-100 p-0.5">
          {locales.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setActive(l)}
              className={`rounded px-2 py-0.5 text-xs font-medium transition ${
                active === l
                  ? "bg-white text-brand-700 shadow-sm"
                  : "text-neutral-500 hover:text-neutral-700"
              }`}
            >
              {localeLabels[l]}
            </button>
          ))}
        </div>
      </LabelRow>
      {locales.map((l) =>
        active === l ? (
          textarea ? (
            <textarea
              key={l}
              value={v[l] ?? ""}
              rows={rows}
              onChange={(e) => onChange({ ...v, [l]: e.target.value } as L)}
              className={inputClass}
            />
          ) : (
            <input
              key={l}
              value={v[l] ?? ""}
              onChange={(e) => onChange({ ...v, [l]: e.target.value } as L)}
              className={inputClass}
            />
          )
        ) : null,
      )}
    </div>
  );
}

/** A controlled single-value text input. */
export function PlainInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label?: string;
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <LabelRow label={label} />
      <input
        value={value ?? ""}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      />
    </div>
  );
}

/** A controlled image-path input with a small preview. */
export function ImageInput({
  label,
  value,
  onChange,
}: {
  label?: string;
  value: string;
  onChange: (next: string) => void;
}) {
  return (
    <div>
      <LabelRow label={label} />
      <div className="flex items-center gap-3">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={value}
            alt=""
            className="h-12 w-12 shrink-0 rounded-lg border border-neutral-200 object-cover"
          />
        ) : (
          <div className="h-12 w-12 shrink-0 rounded-lg border border-dashed border-neutral-300 bg-neutral-50" />
        )}
        <input
          value={value ?? ""}
          placeholder="/image.jpg"
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        />
      </div>
    </div>
  );
}

/** A controlled select for a fixed set of icon keys. */
export function IconSelect({
  label,
  value,
  options,
  onChange,
}: {
  label?: string;
  value: string;
  options: string[];
  onChange: (next: string) => void;
}) {
  return (
    <div>
      <LabelRow label={label} />
      <select
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

/** Header row for a repeatable array item with a remove button. */
export function ItemHeader({
  title,
  onRemove,
  onMoveUp,
  onMoveDown,
}: {
  title: string;
  onRemove?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <span className="text-sm font-semibold text-neutral-500">{title}</span>
      <div className="flex items-center gap-3 text-sm">
        {onMoveUp && (
          <button
            type="button"
            onClick={onMoveUp}
            className="text-neutral-500 hover:text-brand-600"
            aria-label="Дээш"
          >
            ↑
          </button>
        )}
        {onMoveDown && (
          <button
            type="button"
            onClick={onMoveDown}
            className="text-neutral-500 hover:text-brand-600"
            aria-label="Доош"
          >
            ↓
          </button>
        )}
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="font-medium text-red-600 hover:underline"
          >
            Устгах
          </button>
        )}
      </div>
    </div>
  );
}

/** A labelled subsection card used to group fields in editors. */
export function Section({
  title,
  children,
  action,
}: {
  title: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-base font-bold text-neutral-900">{title}</h2>
        {action}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

export function AddButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-lg border border-dashed border-neutral-300 px-3 py-1.5 text-sm font-medium text-brand-600 transition hover:bg-brand-50"
    >
      {children}
    </button>
  );
}

/**
 * Wraps an editor's fields in a form that posts the full content object as JSON
 * to the `saveContent` server action. The visible fields are controlled by
 * React state; only the hidden `key`/`data` inputs are submitted.
 */
export function EditorForm({
  contentKey,
  value,
  children,
}: {
  contentKey: string;
  value: unknown;
  children: ReactNode;
}) {
  return (
    <form action={saveContent} className="space-y-5 pb-20">
      <input type="hidden" name="key" value={contentKey} />
      <input type="hidden" name="data" value={JSON.stringify(value)} />
      {children}
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
