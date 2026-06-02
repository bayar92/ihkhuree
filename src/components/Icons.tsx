import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export function GlobeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" />
    </svg>
  );
}

export function UsersIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <circle cx="16.5" cy="9" r="2.5" />
      <path d="M15 19a5 5 0 0 1 5.5-4.9" />
    </svg>
  );
}

export function HandshakeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 12l3-3 4 1 2-2 2 2 4-1 3 3" />
      <path d="M12 10l-2.5 2.5a1.4 1.4 0 0 0 2 2l.5-.5.7.7a1.4 1.4 0 0 0 2-2l1-1" />
      <path d="M3 12v3h2M21 12v3h-2" />
    </svg>
  );
}

export function GrowthIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 19V5M4 19h16" />
      <path d="M7 16v-3M11 16V9M15 16v-5M19 16V7" />
      <path d="M14 5h5v5" />
      <path d="M19 5l-7 7-3-3-4 4" />
    </svg>
  );
}

export function TradeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 20V8l5-3 5 3v12M4 20h16M14 20V10l5 2v8" />
      <path d="M7 11h.01M7 14h.01M11 11h.01M11 14h.01" />
    </svg>
  );
}

export function InnovationIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9 18h6M10 21h4" />
      <path d="M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.4 1 2.5h6c0-1.1.3-1.8 1-2.5A6 6 0 0 0 12 3Z" />
    </svg>
  );
}

export function LeafIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 19c0-8 6-13 14-13 0 8-5 14-13 14-1 0-2-.4-2.5-1Z" />
      <path d="M5 19c2.5-4 6-6.5 10-8" />
    </svg>
  );
}

export function EducationIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 9l9-4 9 4-9 4-9-4Z" />
      <path d="M7 11v4c0 1.1 2.2 2 5 2s5-.9 5-2v-4M21 9v5" />
    </svg>
  );
}

export function ExchangeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="8" cy="8" r="3" />
      <circle cx="16" cy="14" r="3" />
      <path d="M3 18a5 5 0 0 1 6-4.9M21 8a5 5 0 0 0-6 .9" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export const featureIcons = {
  globe: GlobeIcon,
  users: UsersIcon,
  handshake: HandshakeIcon,
  growth: GrowthIcon,
} as const;

export const focusIcons = {
  trade: TradeIcon,
  innovation: InnovationIcon,
  sustainability: LeafIcon,
  education: EducationIcon,
  exchange: ExchangeIcon,
} as const;

export type FeatureIconKey = keyof typeof featureIcons;
export type FocusIconKey = keyof typeof focusIcons;
