import { Noto_Sans_JP } from "next/font/google";

/** Japanese glyph fallback — shared by public site and admin. */
export const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});
