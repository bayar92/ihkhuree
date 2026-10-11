import { getTranslations, setRequestLocale } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { requireMember } from "@/lib/dal";
import { logoutMember } from "@/app/member-actions";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/PageHeader";
import { ProfileForm } from "@/components/member/ProfileForm";

export const dynamic = "force-dynamic";

export default async function AccountPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Redirects to the login page unless an approved member is signed in.
  const user = await requireMember(locale);
  const profile = await prisma.memberProfile.findUnique({
    where: { userId: user.id },
  });
  const t = await getTranslations("member");

  return (
    <>
      <PageHeader
        title={t("account.title")}
        intro={`${t("account.welcome")}, ${user.name}`}
      />
      <section className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-neutral-200 bg-neutral-50 px-5 py-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-neutral-500">
                {t("account.membershipType")}
              </p>
              <p className="font-semibold text-brand-700">
                {t(`types.${profile?.membershipType ?? "associate"}`)}
              </p>
              <p className="mt-1 text-sm text-neutral-500">{user.email}</p>
            </div>
            <form action={logoutMember}>
              <input type="hidden" name="locale" value={locale} />
              <button className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-white">
                {t("account.logout")}
              </button>
            </form>
          </div>

          <Link
            href="/account/connections"
            className="mb-8 block rounded-xl border border-brand-100 bg-brand-50 px-5 py-4 text-sm font-semibold text-brand-800 transition hover:bg-brand-100"
          >
            {t("connections.title")} →
          </Link>

          <h2 className="mb-1 font-serif text-2xl font-bold text-brand-700">
            {t("account.profileTitle")}
          </h2>
          <p className="mb-6 text-sm text-neutral-600">
            {t("account.profileIntro")}
          </p>
          <ProfileForm
            initial={{
              organization: profile?.organization ?? "",
              position: profile?.position ?? "",
              country: profile?.country ?? "",
              phone: profile?.phone ?? "",
              about: profile?.about ?? "",
              offers: (profile?.offers ?? []).join(", "),
              seeks: (profile?.seeks ?? []).join(", "),
            }}
          />
        </div>
      </section>
    </>
  );
}
