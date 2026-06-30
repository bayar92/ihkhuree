/** When coming-soon mode was enabled (Ulaanbaatar, UTC+8). Update when re-enabling. */
export const COMING_SOON_START = "2026-06-30T13:23:42+08:00";

export const COMING_SOON_HOURS = 48;

export const COMING_SOON_DEADLINE =
  Date.parse(COMING_SOON_START) + COMING_SOON_HOURS * 60 * 60 * 1000;
