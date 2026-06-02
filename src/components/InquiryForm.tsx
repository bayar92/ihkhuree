"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export function InquiryForm({
  type,
  successMessage,
}: {
  type: "contact" | "join";
  successMessage: string;
}) {
  const t = useTranslations();
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(
    "idle",
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, type }),
      });
      if (!res.ok) throw new Error();
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-green-800">
        {successMessage}
      </div>
    );
  }

  const field =
    "w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">
            {t("contact.name")} *
          </label>
          <input name="name" required className={field} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">
            {t("contact.email")} *
          </label>
          <input name="email" type="email" required className={field} />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-neutral-700">
          {t("contact.company")}
        </label>
        <input name="company" className={field} />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-neutral-700">
          {t("contact.message")} *
        </label>
        <textarea name="message" required rows={5} className={field} />
      </div>
      {status === "error" && (
        <p className="text-sm text-red-600">{t("contact.error")}</p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-md bg-brand-600 px-7 py-3 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-brand-700 disabled:opacity-60"
      >
        {status === "sending" ? t("common.submitting") : t("common.send")}
      </button>
    </form>
  );
}
