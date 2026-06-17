import { getTranslations, setRequestLocale } from "next-intl/server";
import { MapPin, Phone, Mail } from "lucide-react";
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
  const address = pick(contact.address, locale);

  return (
    <>
      <PageHeader title={t("contact.title")} />
      <section className="bg-gradient-to-b from-brand-50/30 to-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-5 lg:gap-12 lg:px-8">
          <div className="space-y-4 lg:col-span-2">
            {address && (
              <div className="flex gap-4 rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50">
                  <MapPin className="h-5 w-5 text-brand-600" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                    {t("footer.contactUs")}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-700">{address}</p>
                </div>
              </div>
            )}
            {typeof contact.phone === "string" && contact.phone && (
              <div className="flex gap-4 rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50">
                  <Phone className="h-5 w-5 text-brand-600" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                    {locale === "mn" ? "Утас" : locale === "ja" ? "電話" : "Phone"}
                  </h3>
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    className="mt-2 block text-sm font-medium text-neutral-800 transition hover:text-brand-600"
                  >
                    {contact.phone}
                  </a>
                </div>
              </div>
            )}
            {typeof contact.email === "string" && contact.email && (
              <div className="flex gap-4 rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50">
                  <Mail className="h-5 w-5 text-brand-600" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                    {locale === "mn" ? "И-мэйл" : locale === "ja" ? "メール" : "Email"}
                  </h3>
                  <a
                    href={`mailto:${contact.email}`}
                    className="mt-2 block text-sm font-medium text-brand-600 transition hover:underline"
                  >
                    {contact.email}
                  </a>
                </div>
              </div>
            )}
          </div>
          <div className="rounded-2xl border border-neutral-200/80 bg-white p-8 shadow-sm lg:col-span-3">
            <InquiryForm type="contact" successMessage={t("contact.success")} />
          </div>
        </div>
      </section>
    </>
  );
}
