import type { ReactNode } from "react";

// Root layout simply forwards children. The real <html>/<body> shells live in
// app/[locale]/layout.tsx (public site) and app/admin/layout.tsx (dashboard),
// which lets us keep the admin area outside of the localized routing.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
