"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { registerMember } from "@/app/member-actions";
import {
  MEMBERSHIP_TYPES,
  type MemberFormState,
  type MembershipType,
} from "@/lib/member-schema";
import { Field, FormAlert, SubmitButton, inputClass } from "./fields";

const initialState: MemberFormState = {};

export function RegisterForm({ defaultType }: { defaultType: MembershipType }) {
  const t = useTranslations("member");
  const [state, action, pending] = useActionState(registerMember, initialState);

  if (state.ok) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
        <h2 className="font-serif text-2xl font-bold text-green-900">
          {t("register.successTitle")}
        </h2>
        <p className="mt-3 text-green-800">{t("register.successText")}</p>
      </div>
    );
  }

  const v = state.values ?? {};
  const invalid = (name: string) => state.fields?.includes(name);

  return (
    <form action={action} className="space-y-5" noValidate>
      {state.error && (
        <FormAlert tone="error">{t(`errors.${state.error}`)}</FormAlert>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("register.name")} required>
          <input
            name="name"
            required
            autoComplete="name"
            defaultValue={v.name}
            aria-invalid={invalid("name")}
            className={inputClass(invalid("name"))}
          />
        </Field>
        <Field label={t("register.email")} required>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            defaultValue={v.email}
            aria-invalid={invalid("email")}
            className={inputClass(invalid("email"))}
          />
        </Field>
      </div>

      <Field
        label={t("register.password")}
        hint={t("register.passwordHint")}
        required
      >
        <input
          name="password"
          type="password"
          required
          minLength={8}
          maxLength={72}
          autoComplete="new-password"
          aria-invalid={invalid("password")}
          className={inputClass(invalid("password"))}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("register.organization")} required>
          <input
            name="organization"
            required
            autoComplete="organization"
            defaultValue={v.organization}
            aria-invalid={invalid("organization")}
            className={inputClass(invalid("organization"))}
          />
        </Field>
        <Field label={t("register.position")}>
          <input
            name="position"
            autoComplete="organization-title"
            defaultValue={v.position}
            className={inputClass(invalid("position"))}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("register.country")}>
          <input
            name="country"
            autoComplete="country-name"
            defaultValue={v.country}
            className={inputClass(invalid("country"))}
          />
        </Field>
        <Field label={t("register.type")}>
          <select
            name="membershipType"
            defaultValue={v.membershipType ?? defaultType}
            className={inputClass(invalid("membershipType"))}
          >
            {MEMBERSHIP_TYPES.map((type) => (
              <option key={type} value={type}>
                {t(`types.${type}`)}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label={t("register.note")}>
        <textarea
          name="note"
          rows={4}
          maxLength={1000}
          defaultValue={v.note}
          placeholder={t("register.notePlaceholder")}
          className={inputClass(invalid("note"))}
        />
      </Field>

      {/* Honeypot: hidden from people, irresistible to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <SubmitButton
          pending={pending}
          label={t("register.submit")}
          pendingLabel={t("register.submitting")}
        />
        <Link href="/login" className="text-sm font-medium text-brand-600 hover:underline">
          {t("register.haveAccount")}
        </Link>
      </div>
    </form>
  );
}
