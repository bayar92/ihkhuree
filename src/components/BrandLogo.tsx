import Image from "next/image";

/**
 * The official Ikh Khuree seal. Place the image at `public/logo.jpg`.
 * Rendered inside a circular mask so any square/black background in the
 * source image is clipped away (the seal itself is circular).
 */
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
      className={`relative inline-block shrink-0 overflow-hidden rounded-full ${className}`}
      style={size ? { width: size, height: size } : undefined}
    >
      <Image
        src="/logo.jpg"
        alt="Ikh Khuree"
        fill
        sizes={size ? `${size}px` : "320px"}
        className="object-cover"
        priority={priority}
      />
    </span>
  );
}
