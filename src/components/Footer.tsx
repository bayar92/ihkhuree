import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { BrandLogo } from "./BrandLogo";
import { NewsletterForm } from "./NewsletterForm";
import { prisma, safe } from "@/lib/prisma";
import { pick } from "@/lib/i18n";
import type { Locale } from "@/i18n/routing";
import { MapPin, Phone, Mail } from "lucide-react";
import { FaYoutube, FaLinkedin, FaFacebook } from "react-icons/fa";

const links = [
  { href: "/about", key: "about" },
  { href: "/membership", key: "membership" },
  { href: "/services", key: "services" },
  { href: "/news", key: "news" },
  { href: "/events", key: "events" },
  { href: "/contact", key: "contact" },
] as const;

export async function Footer() {
  const t = await getTranslations();
  const locale = (await getLocale()) as Locale;
  const setting = await safe(
    prisma.setting.findUnique({ where: { key: "contact" } }),
    null,
  );
  const contact = (setting?.value ?? {}) as Record<string, unknown>;
  const social = (contact.social ?? {}) as Record<string, string>;

  return (
    <footer className="relative overflow-hidden bg-brand-800 text-white">
      {/* Watermark emblem */}
      <div
        className="pointer-events-none absolute -left-28 top-1/2 hidden -translate-y-1/2 opacity-[0.06] lg:block"
        aria-hidden
      >
        <BrandLogo size={460} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-[0.5fr_1fr_1fr_1fr]">
          <div className="hidden lg:block" />

          {/* Quick links */}
          <div className="lg:border-l lg:border-white/10 lg:pl-10">
            <h3 className="font-serif text-lg font-semibold uppercase tracking-wide text-white">
              {t("footer.quickLinks")}
            </h3>
            <ul className="mt-6 space-y-3 text-brand-100">
              {links.map((l) => (
                <li key={l.key}>
                  <Link
                    href={l.href}
                    className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-white"
                  >
                    {t(`nav.${l.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:border-l lg:border-white/10 lg:pl-10">
            <h3 className="font-serif text-lg font-semibold uppercase tracking-wide text-white">
              {t("footer.contactUs")}
            </h3>
            <div className="mt-6 space-y-5 text-brand-100">
              {pick(contact.address, locale) && (
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-200" strokeWidth={1.5} />
                  <p className="leading-relaxed">{pick(contact.address, locale)}</p>
                </div>
              )}
              {typeof contact.phone === "string" && contact.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 shrink-0 text-brand-200" strokeWidth={1.5} />
                  <a href={`tel:${contact.phone}`} className="transition hover:text-white">
                    {contact.phone}
                  </a>
                </div>
              )}
              {typeof contact.email === "string" && contact.email && (
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 shrink-0 text-brand-200" strokeWidth={1.5} />
                  <a href={`mailto:${contact.email}`} className="transition hover:text-white">
                    {contact.email}
                  </a>
                </div>
              )}
            </div>

            <div className="mt-7 flex items-center gap-5">
              <a
                href={social.facebook || "#"}
                aria-label="Facebook"
                className="text-brand-100 transition hover:-translate-y-0.5 hover:text-white"
              >
                <FaFacebook className="h-6 w-6" />
              </a>
              <a
                href={social.linkedin || "#"}
                aria-label="LinkedIn"
                className="text-brand-100 transition hover:-translate-y-0.5 hover:text-white"
              >
                <FaLinkedin className="h-6 w-6" />
              </a>
              <a
                href={social.youtube || "#"}
                aria-label="YouTube"
                className="text-brand-100 transition hover:-translate-y-0.5 hover:text-white"
              >
                <FaYoutube className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:border-l lg:border-white/10 lg:pl-10">
            <h3 className="font-serif text-lg font-semibold uppercase tracking-wide text-white">
              {t("footer.newsletter")}
            </h3>
            <p className="mt-6 leading-relaxed text-brand-100">
              {t("footer.newsletterText")}
            </p>
            <div className="mt-7">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-brand-200 sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} Ikh Khuree International Business
            Cooperation Association. {t("footer.rights")}
          </p>
          <div className="flex items-center gap-5">
            <a href="#" className="transition hover:text-white">
              {t("footer.privacy")}
            </a>
            <span className="h-4 w-px bg-white/20" />
            <a href="#" className="transition hover:text-white">
              {t("footer.terms")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
