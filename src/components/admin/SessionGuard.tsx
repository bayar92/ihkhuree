"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";

/** Key kept in sessionStorage, which is cleared when the tab/browser closes. */
export const ADMIN_ALIVE_KEY = "ikh.admin.alive";

/**
 * Forces a fresh login whenever the admin is opened in a new browser/tab
 * session. The login page sets `ADMIN_ALIVE_KEY` in sessionStorage; if it is
 * missing here it means the tab/browser was closed and reopened, so we clear
 * the auth cookie and send the user back to the login screen.
 */
export function SessionGuard() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(ADMIN_ALIVE_KEY)) return;
    void signOut({ redirectTo: "/admin/login" });
  }, []);

  return null;
}
