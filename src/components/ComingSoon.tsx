import { BrandLogo } from "@/components/BrandLogo";
import { ComingSoonCountdown } from "@/components/ComingSoonCountdown";

export function ComingSoon() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-brand-950 via-brand-800 to-brand-600">
      <div
        className="hero-lines pointer-events-none absolute inset-0 opacity-20"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-brand-400/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-24 h-[28rem] w-[28rem] rounded-full bg-brand-300/15 blur-3xl"
        aria-hidden
      />

      <div className="relative flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center">
        <div className="mb-8 rounded-full bg-white/10 p-5 shadow-2xl shadow-brand-950/30 ring-1 ring-white/20 backdrop-blur-sm">
          <BrandLogo size={112} priority className="drop-shadow-md" />
        </div>

        <h1 className="font-serif text-4xl font-bold tracking-wide text-white sm:text-5xl md:text-6xl">
          Тун удахгүй
        </h1>
        <p className="mt-4 max-w-sm text-base leading-relaxed text-brand-100/90 sm:text-lg">
          Их Хүрээ олон улсын бизнесийн хамтын ажиллагааны холбоо
        </p>

        <ComingSoonCountdown />

        <div
          className="mt-10 h-px w-24 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          aria-hidden
        />
      </div>
    </div>
  );
}
