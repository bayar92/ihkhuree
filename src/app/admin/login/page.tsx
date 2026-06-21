"use client";

import { useActionState, useEffect } from "react";
import { authenticate } from "../actions";
import { BrandLogo } from "@/components/BrandLogo";
import { ADMIN_ALIVE_KEY } from "@/components/admin/SessionGuard";

export default function LoginPage() {
  const [errorMessage, formAction, pending] = useActionState(
    authenticate,
    undefined,
  );

  // Mark this browser/tab session as active so the panel's SessionGuard keeps
  // the user logged in until the tab/browser is closed.
  useEffect(() => {
    sessionStorage.setItem(ADMIN_ALIVE_KEY, "1");
  }, []);

  const field =
    "w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100";

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
        <div className="mb-6 flex flex-col items-center text-center">
          <BrandLogo size={56} />
          <h1 className="mt-3 font-serif text-xl font-semibold text-brand-700">
            Ikh Khuree
          </h1>
          <p className="text-sm text-neutral-500">Удирдлагын самбар</p>
        </div>
        <form action={formAction} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-700">
              Имэйл
            </label>
            <input
              name="email"
              type="email"
              required
              defaultValue="admin@ikhkhuree.mn"
              className={field}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-700">
              Нууц үг
            </label>
            <input name="password" type="password" required className={field} />
          </div>
          {errorMessage && (
            <p className="text-sm text-red-600">{errorMessage}</p>
          )}
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-lg bg-brand-600 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60"
          >
            {pending ? "Нэвтэрч байна..." : "Нэвтрэх"}
          </button>
        </form>
      </div>
    </div>
  );
}
