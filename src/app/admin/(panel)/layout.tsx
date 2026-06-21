import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { logout } from "../actions";
import { Sidebar } from "@/components/admin/Sidebar";
import { SessionGuard } from "@/components/admin/SessionGuard";
import { BrandLogo } from "@/components/BrandLogo";

export default async function PanelLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  return (
    <div className="flex min-h-screen">
      <SessionGuard />
      <aside className="flex w-64 shrink-0 flex-col border-r border-neutral-200 bg-white">
        <div className="flex items-center gap-2 border-b border-neutral-100 px-5 py-4">
          <BrandLogo size={36} />
          <div className="leading-tight">
            <p className="font-serif text-base font-semibold text-brand-700">
              Ikh Khuree
            </p>
            <p className="text-[11px] text-neutral-400">Admin</p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          <Sidebar />
        </div>
        <div className="border-t border-neutral-100 p-3">
          <p className="px-3 pb-2 text-xs text-neutral-400">
            {session.user.email}
          </p>
          <div className="flex gap-2">
            <a
              href="/"
              target="_blank"
              className="flex-1 rounded-lg border border-neutral-300 px-3 py-2 text-center text-xs font-medium text-neutral-600 transition hover:bg-neutral-50"
            >
              Сайт үзэх
            </a>
            <form action={logout} className="flex-1">
              <button className="w-full rounded-lg border border-red-200 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50">
                Гарах
              </button>
            </form>
          </div>
        </div>
      </aside>
      <main className="flex-1 overflow-x-hidden">
        <div className="mx-auto max-w-4xl px-6 py-8">{children}</div>
      </main>
    </div>
  );
}
