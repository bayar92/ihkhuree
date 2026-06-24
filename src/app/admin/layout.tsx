import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notoSansJP } from "@/lib/fonts";
import "../globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Admin — Ikh Khuree",
  robots: { index: false, follow: false },
  icons: { icon: [{ url: "/logo.png", type: "image/png" }] },
};

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="mn" className={`${inter.variable} ${notoSansJP.variable}`}>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-neutral-100 text-neutral-800"
      >
        {children}
      </body>
    </html>
  );
}
