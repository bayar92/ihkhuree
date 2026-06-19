"use client";

import { useEffect, useState } from "react";

// Member country codes, matching the "Member country reach" list.
const MEMBER_CODES = ["jp", "tw", "us", "sg", "it", "ae", "kr"] as const;

const INTERVAL_MS = 2200;

/**
 * Shows a single member-country flag that cycles through the list one by one
 * with a soft fade. Sits beside the fixed Mongolian flag in the navbar.
 */
export function CyclingFlag() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      // Fade out, swap source, fade back in.
      setVisible(false);
      const swap = setTimeout(() => {
        setIndex((i) => (i + 1) % MEMBER_CODES.length);
        setVisible(true);
      }, 300);
      return () => clearTimeout(swap);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  const code = MEMBER_CODES[index];

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://flagcdn.com/w160/${code}.png`}
      alt={`Member country: ${code.toUpperCase()}`}
      width={24}
      height={16}
      className={`h-4 w-auto rounded-[2px] transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
