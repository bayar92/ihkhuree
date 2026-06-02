import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Admin — Ikh Khuree",
  robots: { index: false, follow: false },
  icons: { icon: [{ url: "/logo.jpg", type: "image/jpeg" }] },
};

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="mn" className={inter.variable}>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-neutral-100 text-neutral-800"
      >
        {children}
      </body>
    </html>
  );
}
