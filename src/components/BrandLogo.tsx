import Image from "next/image";

/** The official Ikh Khuree seal (`public/logo.png`, transparent circular PNG). */
export function BrandLogo({
  size,
  className = "",
  priority = false,
}: {
  /** Fixed pixel size. Omit to control dimensions via `className` (responsive). */
  size?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <span
      className={`relative inline-block shrink-0 ${className}`}
      style={size ? { width: size, height: size } : undefined}
    >
      <Image
        src="/logo.png"
        alt="Ikh Khuree"
        fill
        sizes={size ? `${size}px` : "320px"}
        className="object-contain"
        priority={priority}
      />
    </span>
  );
}
