import { notFound } from "next/navigation";
import { prisma, safe } from "@/lib/prisma";
import { pick } from "@/lib/i18n";
import type { Locale } from "@/i18n/routing";
import { PageHeader } from "./PageHeader";

type Block = { heading?: unknown; text?: unknown };

function ContentBlock({ heading, text }: { heading: string; text: string }) {
  const lines = text.split("\n").filter((line) => line.trim());
  const isBulletList = lines.every((line) => line.trim().startsWith("•"));

  return (
    <article className="rounded-2xl border border-neutral-200/80 bg-white p-8 shadow-sm">
      {heading && (
        <h2 className="font-serif text-xl font-bold text-brand-700 sm:text-2xl">
          {heading}
        </h2>
      )}
      {isBulletList ? (
        <ul className={`space-y-3 ${heading ? "mt-5" : ""}`}>
          {lines.map((line, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed text-neutral-700">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c8a44d]" />
              <span>{line.replace(/^•\s*/, "")}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p
          className={`whitespace-pre-line text-sm leading-7 text-neutral-700 sm:text-base ${
            heading ? "mt-5" : ""
          }`}
        >
          {text}
        </p>
      )}
    </article>
  );
}

/** Renders a content page stored under the given key in the Page table. */
export async function ContentPage({
  pageKey,
  locale,
}: {
  pageKey: string;
  locale: Locale;
}) {
  const page = await safe(
    prisma.page.findUnique({ where: { key: pageKey } }),
    null,
  );
  if (!page) notFound();

  const blocks = Array.isArray(page.body) ? (page.body as Block[]) : [];

  return (
    <>
      <PageHeader title={pick(page.title, locale)} intro={pick(page.intro, locale)} />
      <section className="bg-gradient-to-b from-brand-50/30 to-white">
        <div className="mx-auto max-w-4xl space-y-6 px-4 py-14 sm:px-6 lg:px-8">
          {blocks.map((b, i) => {
            const heading = pick(b.heading, locale);
            const text = pick(b.text, locale);
            if (!heading && !text) return null;
            return (
              <ContentBlock key={i} heading={heading} text={text} />
            );
          })}
        </div>
      </section>
    </>
  );
}
