import { notFound } from "next/navigation";
import { prisma, safe } from "@/lib/prisma";
import { pick } from "@/lib/i18n";
import type { Locale } from "@/i18n/routing";
import { PageHeader } from "./PageHeader";

type Block = { heading?: unknown; text?: unknown };

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
      <section className="bg-white">
        <div className="mx-auto max-w-3xl space-y-10 px-4 py-14 sm:px-6 lg:px-8">
          {blocks.map((b, i) => (
            <div key={i}>
              {pick(b.heading, locale) && (
                <h2 className="mb-3 font-serif text-2xl font-bold text-brand-700">
                  {pick(b.heading, locale)}
                </h2>
              )}
              {pick(b.text, locale) && (
                <p className="whitespace-pre-line leading-relaxed text-neutral-700">
                  {pick(b.text, locale)}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
