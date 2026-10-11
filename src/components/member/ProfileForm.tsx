"use client";

import { useActionState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { updateProfile } from "@/app/member-actions";
import type { MemberFormState } from "@/lib/member-schema";
import { Field, FormAlert, SubmitButton, inputClass } from "./fields";

export type ProfileValues = {
  organization: string;
  position: string;
  country: string;
  phone: string;
  about: string;
  offers: string;
  seeks: string;
};

export function ProfileForm({ initial }: { initial: ProfileValues }) {
  const t = useTranslations("member");
  const locale = useLocale();
  const [state, action, pending] = useActionState<MemberFormState, FormData>(
    updateProfile,
    {},
  );

  // React resets uncontrolled inputs after an action, so refill from the
  // submitted values to keep what the member just typed.
  const v = { ...initial, ...state.values };
  const invalid = (name: string) => state.fields?.includes(name);

  return (
    <form action={action} className="space-y-5">
      <input type="hidden" name="locale" value={locale} />
      {state.error && (
        <FormAlert tone="error">{t(`errors.${state.error}`)}</FormAlert>
      )}
      {state.ok && <FormAlert tone="success">{t("account.saved")}</FormAlert>}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("register.organization")} required>
          <input
            name="organization"
            required
            defaultValue={v.organization}
            className={inputClass(invalid("organization"))}
          />
        </Field>
        <Field label={t("register.position")}>
          <input
            name="position"
            defaultValue={v.position}
            className={inputClass(invalid("position"))}
          />
        </Field>
        <Field label={t("register.country")}>
          <input
            name="country"
            defaultValue={v.country}
            className={inputClass(invalid("country"))}
          />
        </Field>
        <Field label={t("account.phone")} hint={t("account.phoneNote")}>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            defaultValue={v.phone}
            className={inputClass(invalid("phone"))}
          />
        </Field>
      </div>

      <Field label={t("account.about")}>
        <textarea
          name="about"
          rows={4}
          maxLength={2000}
          defaultValue={v.about}
          className={inputClass(invalid("about"))}
        />
      </Field>
      <Field label={t("account.offers")} hint={t("account.offersHint")}>
        <input name="offers" defaultValue={v.offers} className={inputClass()} />
      </Field>
      <Field label={t("account.seeks")} hint={t("account.seeksHint")}>
        <input name="seeks" defaultValue={v.seeks} className={inputClass()} />
      </Field>

      <SubmitButton
        pending={pending}
        label={t("account.save")}
        pendingLabel={t("account.saving")}
      />
    </form>
  );
}
