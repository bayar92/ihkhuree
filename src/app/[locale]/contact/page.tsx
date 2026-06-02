import { getTranslations, setRequestLocale } from "next-intl/server";
import { prisma, safe } from "@/lib/prisma";
import { pick } from "@/lib/i18n";
import type { Locale } from "@/i18n/routing";
import { PageHeader } from "@/components/PageHeader";
import { InquiryForm } from "@/components/InquiryForm";

export const dynamic = "force-dynamic";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  setRequestLocale(rawLocale);
  const locale = rawLocale as Locale;
  const t = await getTranslations();

  const setting = await safe(
    prisma.setting.findUnique({ where: { key: "contact" } }),
    null,
  );
  const contact = (setting?.value ?? {}) as Record<string, unknown>;

  return (
    <>
      <PageHeader title={t("contact.title")} />
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="space-y-6">
            {pick(contact.address, locale) && (
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-600">
                  {t("footer.contactUs")}
                </h3>
                <p className="mt-2 text-neutral-700">{pick(contact.address, locale)}</p>
              </div>
            )}
            {typeof contact.phone === "string" && contact.phone && (
              <p className="text-neutral-700">
                <span className="font-medium">Tel:</span> {contact.phone}
              </p>
            )}
            {typeof contact.email === "string" && contact.email && (
              <p className="text-neutral-700">
                <span className="font-medium">Email:</span>{" "}
                <a href={`mailto:${contact.email}`} className="text-brand-600 hover:underline">
                  {contact.email}
                </a>
              </p>
            )}
          </div>
          <div>
            <InquiryForm type="contact" successMessage={t("contact.success")} />
          </div>
        </div>
      </section>
    </>
  );
}
