"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Send } from "lucide-react";

export function NewsletterForm() {
  const t = useTranslations("footer");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(
    "idle",
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = String(new FormData(form).get("email") ?? "");
    setStatus("sending");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: "Newsletter",
          message: "Newsletter subscription",
          type: "newsletter",
        }),
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
      <p className="rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-sm text-white">
        {t("subscribed")}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative">
      <input
        name="email"
        type="email"
        required
        placeholder={t("emailPlaceholder")}
        className="w-full rounded-lg border border-white/25 bg-transparent py-3 pl-4 pr-12 text-sm text-white placeholder:text-brand-200 outline-none transition focus:border-white/60"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        aria-label="Subscribe"
        className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md p-2 text-white transition hover:bg-white/10 disabled:opacity-50"
      >
        <Send className="h-4 w-4" strokeWidth={1.75} />
      </button>
    </form>
  );
}
