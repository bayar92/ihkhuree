import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - API routes
  // - admin routes (not localized)
  // - Next.js internals and static files
  matcher: ["/((?!api|admin|_next|_vercel|.*\\..*).*)"],
};
